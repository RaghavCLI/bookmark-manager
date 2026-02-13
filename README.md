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

## License

MIT

## Author

Created by [RaghavCLI](https://github.com/RaghavCLI)
