# Smart Bookmark Manager

A modern, real-time bookmark manager built with Next.js and Supabase. Save your favorite links and access them from any device with instant synchronization.

**Live Demo:** [https://bookmark-manager-ten-lilac.vercel.app](https://bookmark-manager-ten-lilac.vercel.app)

## Features

- **Google OAuth Authentication** - Secure sign-in with your Google account
- **Real-time Sync** - Changes sync instantly across all your devices and browser tabs
- **Private by Default** - Your bookmarks are private; only you can see them
- **Beautiful UI** - Modern, responsive design with smooth animations
- **Fast & Lightweight** - Built with performance in mind

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication:** Supabase Auth with Google OAuth
- **Real-time:** Supabase Realtime
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Deployment:** [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Google Cloud Console account (for OAuth)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RaghavCLI/bookmark-manager.git
   cd bookmark-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Setup

Run the following SQL in your Supabase SQL Editor:

```sql
-- Create bookmarks table
CREATE TABLE bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own bookmarks" ON bookmarks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookmarks" ON bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks" ON bookmarks
  FOR DELETE USING (auth.uid() = user_id);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE bookmarks;

-- Enable full replica identity for realtime deletes
ALTER TABLE bookmarks REPLICA IDENTITY FULL;
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `https://your-project.supabase.co/auth/v1/callback`
6. Copy Client ID and Client Secret to Supabase Auth settings

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com/)
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

### Update Google OAuth

After deployment, add your Vercel URL to Google OAuth authorized redirect URIs.

## Project Structure

```
src/
├── app/
│   ├── auth/callback/    # OAuth callback handler
│   ├── dashboard/        # Protected dashboard page
│   ├── globals.css       # Global styles
│   ├── layout.js         # Root layout
│   └── page.js           # Landing page
├── components/
│   ├── auth/             # Login/Logout buttons
│   └── bookmarks/        # Bookmark CRUD components
└── lib/
    ├── actions/          # Server actions
    └── supabase/         # Supabase client setup
```

## Challenges & Solutions

During the development of this project, I encountered several interesting challenges, particularly around real-time functionality:

### 1. Real-time INSERT Events Not Working

**Problem:** DELETE events were syncing across devices, but INSERT events were inconsistent - sometimes working, sometimes not.

**Cause:** Supabase Realtime server-side filters (`filter: \`user_id=eq.${userId}\``) can be unreliable for INSERT events, especially with UUID columns.

**Solution:** Changed from server-side filtering to client-side filtering:
```javascript
// Instead of filtering on the server
.on("postgres_changes", { 
  event: "INSERT", 
  filter: `user_id=eq.${userId}` // Unreliable
})

// Filter on the client side
.on("postgres_changes", { event: "*", schema: "public", table: "bookmarks" }, (payload) => {
  const recordUserId = payload.new?.user_id || payload.old?.user_id;
  if (recordUserId !== userId) return; // Client-side filter
  // Handle event...
})
```

### 2. Real-time Working Intermittently

**Problem:** Real-time updates worked sometimes but not consistently across different sessions.

**Cause:** The subscription was being created before the authentication session was fully loaded on the client.

**Solution:** Wait for auth session before subscribing and listen for auth state changes:
```javascript
const setupSubscription = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return; // Wait for auth
  // Create subscription...
};

supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN") {
    setupSubscription(); // Resubscribe on auth change
  }
});
```

### 3. Item Count Not Updating in Real-time

**Problem:** When adding a bookmark from one device, it appeared on another device, but the "X items" count badge didn't update.

**Cause:** The count was rendered in a Server Component using server-fetched data, which doesn't update with client-side state changes.

**Solution:** Moved the count badge inside the client component (`RealtimeBookmarkList`) where it has access to the live `bookmarks` state array.

### 4. DELETE Events Missing Data

**Problem:** When deleting bookmarks, the real-time `payload.old` was empty, so the client couldn't identify which bookmark to remove.

**Cause:** By default, PostgreSQL only includes the primary key in the `old` record for DELETE events.

**Solution:** Set the table's replica identity to FULL:
```sql
ALTER TABLE bookmarks REPLICA IDENTITY FULL;
```

### 5. CSS Styles Different in Production

**Problem:** The aurora gradient background and custom styles looked correct locally but broke in the Vercel production build.

**Cause:** The Google Fonts `@import` was placed after the Tailwind import, causing CSS compilation issues.

**Solution:** Moved the font import to the top of the CSS file:
```css
/* Import fonts FIRST */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

/* Then import Tailwind */
@import "tailwindcss";
```

## License

MIT

## Author

Created by [RaghavCLI](https://github.com/RaghavCLI)
