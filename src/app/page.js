import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Aurora gradient background */}
      <section className="aurora-bg relative flex min-h-screen flex-col items-center justify-center px-4 py-32">
        {/* Extra floating blur elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div 
            className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl"
            style={{ animation: 'float 6s ease-in-out infinite' }}
          />
          <div 
            className="absolute right-1/4 bottom-1/3 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl"
            style={{ animation: 'float 8s ease-in-out infinite', animationDelay: '2s' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* Overline */}
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
            Bookmark Manager
          </p>

          {/* Display Heading with italic emphasis */}
          <h1 className="text-4xl font-extrabold leading-none tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Save your <em className="not-italic font-extrabold text-indigo-300">favorite</em>
            <br />
            links <em className="italic font-light text-indigo-200">effortlessly</em>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-indigo-100/80">
            A simple, fast bookmark manager with real-time sync across all your devices. 
            Private, secure, and always accessible.
          </p>

          {/* Feature badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Real-time sync
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Private & secure
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Lightning fast
            </span>
          </div>

          {/* CTA */}
          <div className="mt-12">
            <LoginButton />
          </div>

          {/* Small note */}
          <p className="mt-6 text-sm text-indigo-200/60">
            Sign in with Google to get started — it's free
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-indigo-200/40">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <svg className="h-5 w-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-4 py-24">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-indigo-600">
              Features
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Everything you need to <em className="italic font-normal">organize</em>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-500">
              Simple yet powerful features designed for the way you browse.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <div className="card-hover rounded-xl border border-neutral-100 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">Quick Add</h3>
              <p className="mt-2 text-sm text-neutral-500">
                Add bookmarks instantly with just a URL and title. No clutter, no complexity.
              </p>
            </div>

            {/* Card 2 */}
            <div className="card-hover rounded-xl border border-neutral-100 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">Real-time Sync</h3>
              <p className="mt-2 text-sm text-neutral-500">
                Changes sync instantly across all your devices and browser tabs.
              </p>
            </div>

            {/* Card 3 */}
            <div className="card-hover rounded-xl border border-neutral-100 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">Private by Default</h3>
              <p className="mt-2 text-sm text-neutral-500">
                Your bookmarks are private. Only you can see and access them.
              </p>
            </div>

            {/* Card 4 */}
            <div className="card-hover rounded-xl border border-neutral-100 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">Blazing Fast</h3>
              <p className="mt-2 text-sm text-neutral-500">
                Built with modern tech for instant loading and smooth interactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="aurora-bg relative px-4 py-24">
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to get <em className="italic font-normal">started</em>?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-indigo-100/80">
            Join now and start organizing your bookmarks in seconds.
          </p>
          <div className="mt-8">
            <LoginButton />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <span className="font-semibold text-white">Smart Bookmarks</span>
            </div>
            <p className="text-sm text-neutral-500">
              © 2026 Smart Bookmarks. Built with Next.js & Supabase.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
