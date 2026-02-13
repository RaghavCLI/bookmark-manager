"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { BookmarkList } from "./bookmark-list";

export function RealtimeBookmarkList({ initialBookmarks, userId }) {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  
  // Create a stable supabase client instance
  const supabase = useMemo(() => createClient(), []);

  // Sync with server when initialBookmarks changes (after server action revalidation)
  useEffect(() => {
    setBookmarks(initialBookmarks);
  }, [initialBookmarks]);

  useEffect(() => {
    // Set up realtime subscription
    const channel = supabase
      .channel(`bookmarks-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          // Add new bookmark to the top of the list (avoid duplicates)
          setBookmarks((current) => {
            const exists = current.some((b) => b.id === payload.new.id);
            if (exists) return current;
            return [payload.new, ...current];
          });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          // Remove deleted bookmark from the list
          setBookmarks((current) =>
            current.filter((bookmark) => bookmark.id !== payload.old.id)
          );
        }
      )
      .subscribe((status) => {
        console.log("Realtime subscription status:", status);
      });

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, userId]);

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
        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
          {bookmarks.length} {bookmarks.length === 1 ? "item" : "items"}
        </span>
      </div>
      <BookmarkList bookmarks={bookmarks} />
    </div>
  );
}
