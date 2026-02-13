"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { BookmarkList } from "./bookmark-list";

export function RealtimeBookmarkList({ initialBookmarks, userId }) {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [isConnected, setIsConnected] = useState(false);
  
  // Create a stable supabase client instance
  const supabase = useMemo(() => createClient(), []);

  // Sync with server when initialBookmarks changes (after server action revalidation)
  useEffect(() => {
    setBookmarks(initialBookmarks);
  }, [initialBookmarks]);

  // Handle realtime events
  const handleRealtimeEvent = useCallback((payload) => {
    console.log("Realtime event received:", payload.eventType, payload);
    
    // Filter by user_id on client side
    const recordUserId = payload.new?.user_id || payload.old?.user_id;
    if (recordUserId !== userId) {
      console.log("Ignoring event for different user");
      return;
    }

    if (payload.eventType === "INSERT") {
      setBookmarks((current) => {
        const exists = current.some((b) => b.id === payload.new.id);
        if (exists) return current;
        return [payload.new, ...current];
      });
    } else if (payload.eventType === "DELETE") {
      setBookmarks((current) =>
        current.filter((bookmark) => bookmark.id !== payload.old.id)
      );
    }
  }, [userId]);

  useEffect(() => {
    let channel;
    let mounted = true;

    const setupSubscription = async () => {
      // Wait for auth to be ready
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !mounted) {
        console.log("No session found, skipping realtime subscription");
        return;
      }

      console.log("Setting up realtime subscription with auth");

      // Create channel with unique name including timestamp to force new connection
      channel = supabase
        .channel(`bookmarks-${userId}-${Date.now()}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "bookmarks",
          },
          handleRealtimeEvent
        )
        .subscribe((status, err) => {
          console.log("Realtime subscription status:", status, err || "");
          if (mounted) {
            setIsConnected(status === "SUBSCRIBED");
          }
        });
    };

    setupSubscription();

    // Listen for auth changes and resubscribe
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        if (event === "SIGNED_IN" && session) {
          // Resubscribe when user signs in
          if (channel) {
            supabase.removeChannel(channel);
          }
          setupSubscription();
        }
      }
    );

    return () => {
      mounted = false;
      if (channel) {
        supabase.removeChannel(channel);
      }
      authSubscription.unsubscribe();
    };
  }, [supabase, userId, handleRealtimeEvent]);

  return (
    <div>
      {/* Section Header with real-time count */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-indigo-600">
            Your Collection
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900">
            Saved <em className="italic font-normal">bookmarks</em>
          </h2>
        </div>
        <div className="flex items-center gap-3">
          {/* Realtime connection indicator */}
          <span className={`flex items-center gap-1.5 text-xs ${isConnected ? "text-green-600" : "text-neutral-400"}`}>
            <span className={`relative flex h-2 w-2 ${isConnected ? "" : "opacity-50"}`}>
              {isConnected && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex h-2 w-2 rounded-full ${isConnected ? "bg-green-500" : "bg-neutral-400"}`}></span>
            </span>
            {isConnected ? "Live" : "Connecting..."}
          </span>
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
            {bookmarks.length} {bookmarks.length === 1 ? "item" : "items"}
          </span>
        </div>
      </div>
      <BookmarkList bookmarks={bookmarks} />
    </div>
  );
}
