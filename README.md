# Elite AI & Full Stack Developer Portfolio (2026 Edition)

A premium, production-ready, fully responsive personal brand platform built for **Shanmugapriyan**. Designed with the dark luxury aesthetics of Stripe, Vercel, Apple, and Linear, featuring hardware-accelerated animations and an intelligent AI chatbot.

## Tech Stack

- **Framework**: Next.js 15 (App Router, React 19, TypeScript)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, CSS Keyframe Auroras, Project projections
- **Charts**: Recharts (Skills competences & Resume logs)
- **Database / Auth / CMS**: Supabase (PostgreSQL)
- **Forms**: React Hook Form & Zod Validations
- **Icons**: Lucide React
- **Third Party helpers**: QR Code generator, canvas-confetti, dynamic search engines

---

## Key Features

1. **Hybrid Database Architecture**: The platform operates in "Mock Mode" out-of-the-box using built-in offline portfolios data. Once Supabase credentials are added to `.env.local`, it transitions to live PostgreSQL table queries.
2. **Secure Admin Dashboard**: Allows fully featured Create-Read-Update-Delete (CRUD) actions on projects, skills, certificates, and lists incoming contact messages. Allows manual JSON table imports and backups.
3. **Interactive AI Chatbot**: A floating chatbot trained on Shanmugapriyan's skills, qualifications, achievements, and consulting services, answering user queries dynamically.
4. **PDF Resume Platform**: Features a built-in preview sheet, mobile QR link code generator, version history tables, and monthly download analytics.
5. **Modern Visuals**: 3D particle wireframe sphere, code matrix rains, interactive neural connect-the-dots canvas, and mouse spotlights cursor followers.

---

## Installation & Local Development

1. **Clone & install dependencies**:
   ```bash
   npm install
   ```

2. **Initialize dev servers**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to preview. Access the CMS panel at `/admin` (Demo Username: `admin`, Password: `password123` in offline mode).

---

## Database Seeding (Supabase)

To link to a live Supabase cloud database:

1. Create a free project at [Supabase](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Paste the contents of `supabase/schema.sql` (to build tables, indexes, and Row Level Security parameters) and execute.
4. Paste the contents of `supabase/seed.sql` (to populate initial portfolios entries) and execute.
5. Copy `.env.example` to `.env.local` and fill in your Supabase API endpoint values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-sb-public-anon-key
   ```
6. Restart the local dev server. It will automatically load database inputs.

---

## Vercel Deployment

Deploying the portfolio to Vercel takes two steps:

1. Import your repository into [Vercel](https://vercel.com).
2. Set the environment variables `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the Vercel dashboard.
3. Deploy!
