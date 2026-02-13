import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/auth/logout-button";
import { AddBookmarkForm } from "@/components/bookmarks/add-bookmark-form";
import { RealtimeBookmarkList } from "@/components/bookmarks/realtime-bookmark-list";
import { getBookmarks } from "@/lib/actions/bookmarks";

export default async function Dashboard() {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect("/");
  }

  // Fetch initial bookmarks
  const { bookmarks } = await getBookmarks();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation - Glassmorphism style */}
      <header className="glass sticky top-0 z-50 border-b border-neutral-200/50">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-700 shadow-lg shadow-indigo-500/20">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-semibold text-neutral-900">Smart Bookmarks</h1>
              <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
                </span>
                Live
              </div>
            </div>
          </div>
          
          {/* User section */}
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              {user.user_metadata?.avatar_url && (
                <img
                  src={user.user_metadata.avatar_url}
                  alt=""
                  className="h-7 w-7 rounded-full ring-2 ring-white"
                />
              )}
              <span className="text-sm font-medium text-neutral-700">
                {user.user_metadata?.full_name || user.email?.split('@')[0]}
              </span>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        {/* Add Bookmark Section */}
        <section className="mb-16">
          {/* Section Header with Overline */}
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-indigo-600">
              Quick Add
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900">
              Add a new <em className="italic font-normal">bookmark</em>
            </h2>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm sm:p-8">
            <AddBookmarkForm />
          </div>
        </section>

        {/* Bookmarks List Section */}
        <section>
          <RealtimeBookmarkList initialBookmarks={bookmarks} userId={user.id} />
        </section>
      </main>
    </div>
  );
}
