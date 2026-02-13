import { BookmarkItem } from "./bookmark-item";

export function BookmarkList({ bookmarks }) {
  if (!bookmarks || bookmarks.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-neutral-200 bg-white px-6 py-16 text-center">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-50" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-50" />
        </div>

        <div className="relative">
          {/* Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100">
            <svg
              className="h-8 w-8 text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </div>

          {/* Text */}
          <h3 className="mt-6 text-xl font-semibold text-neutral-900">
            No bookmarks yet
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-neutral-500">
            Add your first bookmark using the form above. Your bookmarks will 
            <span className="font-medium text-indigo-600"> sync in real-time </span>
            across all your devices.
          </p>

          {/* Visual hint */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-neutral-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>Add a URL above to get started</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookmarks.map((bookmark, index) => (
        <div
          key={bookmark.id}
          className="animate-slide-up"
          style={{ 
            animationDelay: `${index * 50}ms`,
            animationFillMode: "backwards"
          }}
        >
          <BookmarkItem bookmark={bookmark} />
        </div>
      ))}
    </div>
  );
}
