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

  return <BookmarkList bookmarks={bookmarks} />;
}
