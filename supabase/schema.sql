-- Supabase Schema for AI Portfolio Website (2026 Edition)

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table
create table if not exists public.profiles (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    role text not null,
    bio text,
    avatar_url text,
    resume_url text,
    email text,
    phone text,
    location text,
    whatsapp_url text,
    calendar_url text,
    github_username text,
    leetcode_username text,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Social Links Table
create table if not exists public.social_links (
    id uuid primary key default uuid_generate_v4(),
    platform text not null,
    url text not null,
    icon text,
    display_order integer default 0
);

-- 3. Projects Table
create table if not exists public.projects (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    category text not null,
    description text not null,
    problem_statement text,
    solution text,
    features text[] default '{}'::text[],
    challenges text,
    future_scope text,
    role text,
    duration text,
    timeline text,
    status text default 'Completed',
    github_url text,
    live_url text,
    views integer default 0,
    likes integer default 0,
    downloads integer default 0,
    display_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Project Images Table
create table if not exists public.project_images (
    id uuid primary key default uuid_generate_v4(),
    project_id uuid references public.projects(id) on delete cascade not null,
    image_url text not null,
    is_hero boolean default false,
    display_order integer default 0
);

-- 5. Project Videos Table
create table if not exists public.project_videos (
    id uuid primary key default uuid_generate_v4(),
    project_id uuid references public.projects(id) on delete cascade not null,
    video_url text not null,
    display_order integer default 0
);

-- 6. Skills Table
create table if not exists public.skills (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    category text not null, -- 'Programming', 'Frontend', 'Backend', 'AI & ML', 'Databases', 'DevOps', etc.
    icon text,
    description text,
    experience_years numeric default 0,
    proficiency integer default 0, -- 0 to 100
    display_order integer default 0
);

-- 7. Experience Table
create table if not exists public.experience (
    id uuid primary key default uuid_generate_v4(),
    company text not null,
    position text not null,
    description text,
    achievements text[] default '{}'::text[],
    start_date date not null,
    end_date date,
    is_current boolean default false,
    logo_url text,
    display_order integer default 0
);

-- 8. Education Table
create table if not exists public.education (
    id uuid primary key default uuid_generate_v4(),
    institution text not null,
    degree text not null,
    field_of_study text,
    grade text,
    achievements text[] default '{}'::text[],
    start_date date not null,
    end_date date,
    logo_url text,
    display_order integer default 0
);

-- 9. Certificates Table
create table if not exists public.certificates (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    issuer text not null,
    credential_id text,
    verification_url text,
    thumbnail_url text,
    issue_date date,
    description text,
    category text,
    views integer default 0,
    display_order integer default 0
);

-- 10. Achievements Table
create table if not exists public.achievements (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    issuer text not null,
    description text,
    date date not null,
    credential_url text,
    display_order integer default 0
);

-- 11. Services Table
create table if not exists public.services (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    description text not null,
    icon text,
    price_range text,
    features text[] default '{}'::text[],
    display_order integer default 0
);

-- 12. Blogs Table
create table if not exists public.blogs (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    slug text unique not null,
    summary text not null,
    content text not null,
    cover_image text,
    is_published boolean default false,
    published_at timestamp with time zone,
    views integer default 0,
    likes integer default 0,
    tags text[] default '{}'::text[],
    category text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 13. Messages Table
create table if not exists public.messages (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    email text not null,
    subject text,
    message text not null,
    is_read boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 14. Settings Table
create table if not exists public.settings (
    key text primary key,
    value jsonb not null
);

-- 15. Visitor Logs Table (Analytics)
create table if not exists public.visitor_logs (
    id uuid primary key default uuid_generate_v4(),
    session_id text,
    ip_hash text,
    country text,
    city text,
    user_agent text,
    page_path text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 16. Downloads Table
create table if not exists public.downloads (
    id uuid primary key default uuid_generate_v4(),
    file_type text not null, -- 'Resume', 'Certificate', etc.
    file_id text, -- link to specific entity if applicable
    file_name text,
    visitor_id text,
    downloaded_at timestamp with time zone default timezone('utc'::text, now()) not null
);


-- ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.social_links enable row level security;
alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.project_videos enable row level security;
alter table public.skills enable row level security;
alter table public.experience enable row level security;
alter table public.education enable row level security;
alter table public.certificates enable row level security;
alter table public.achievements enable row level security;
alter table public.services enable row level security;
alter table public.blogs enable row level security;
alter table public.messages enable row level security;
alter table public.settings enable row level security;
alter table public.visitor_logs enable row level security;
alter table public.downloads enable row level security;

-- Helper policies: Read access for everyone
create policy "Allow public read access on profiles" on public.profiles for select using (true);
create policy "Allow public read access on social_links" on public.social_links for select using (true);
create policy "Allow public read access on projects" on public.projects for select using (true);
create policy "Allow public read access on project_images" on public.project_images for select using (true);
create policy "Allow public read access on project_videos" on public.project_videos for select using (true);
create policy "Allow public read access on skills" on public.skills for select using (true);
create policy "Allow public read access on experience" on public.experience for select using (true);
create policy "Allow public read access on education" on public.education for select using (true);
create policy "Allow public read access on certificates" on public.certificates for select using (true);
create policy "Allow public read access on achievements" on public.achievements for select using (true);
create policy "Allow public read access on services" on public.services for select using (true);
create policy "Allow public read access on blogs" on public.blogs for select using (true);
create policy "Allow public read access on settings" on public.settings for select using (true);

-- Insert policy for public actions (Contact Messages and Visitor Analytics)
create policy "Allow public inserts on messages" on public.messages for insert with check (true);
create policy "Allow public inserts on visitor_logs" on public.visitor_logs for insert with check (true);
create policy "Allow public inserts on downloads" on public.downloads for insert with check (true);

-- Full CRUD policies for Authenticated Admin Users
-- By default, Supabase auth.uid() can be checked or we allow full access to authenticated role
create policy "Allow authenticated admin full access on profiles" on public.profiles for all using (auth.role() = 'authenticated');
create policy "Allow authenticated admin full access on social_links" on public.social_links for all using (auth.role() = 'authenticated');
create policy "Allow authenticated admin full access on projects" on public.projects for all using (auth.role() = 'authenticated');
create policy "Allow authenticated admin full access on project_images" on public.project_images for all using (auth.role() = 'authenticated');
create policy "Allow authenticated admin full access on project_videos" on public.project_videos for all using (auth.role() = 'authenticated');
create policy "Allow authenticated admin full access on skills" on public.skills for all using (auth.role() = 'authenticated');
create policy "Allow authenticated admin full access on experience" on public.experience for all using (auth.role() = 'authenticated');
create policy "Allow authenticated admin full access on education" on public.education for all using (auth.role() = 'authenticated');
create policy "Allow authenticated admin full access on certificates" on public.certificates for all using (auth.role() = 'authenticated');
create policy "Allow authenticated admin full access on achievements" on public.achievements for all using (auth.role() = 'authenticated');
create policy "Allow authenticated admin full access on services" on public.services for all using (auth.role() = 'authenticated');
create policy "Allow authenticated admin full access on blogs" on public.blogs for all using (auth.role() = 'authenticated');
create policy "Allow authenticated admin full access on settings" on public.settings for all using (auth.role() = 'authenticated');
create policy "Allow authenticated admin full access on messages" on public.messages for all using (auth.role() = 'authenticated');
create policy "Allow authenticated admin full access on visitor_logs" on public.visitor_logs for all using (auth.role() = 'authenticated');
create policy "Allow authenticated admin full access on downloads" on public.downloads for all using (auth.role() = 'authenticated');
