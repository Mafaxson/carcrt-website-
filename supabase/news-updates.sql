-- Table for News & Updates
create table if not exists news_updates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text,
  image_url text,
  video_url text,
  link text,
  category text not null,
  created_at timestamp with time zone default now()
);
