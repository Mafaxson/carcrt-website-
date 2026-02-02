-- Table for Events
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  video_url text,
  status text not null default 'Upcoming', -- Upcoming, Ongoing, Past
  start_date date,
  end_date date,
  created_at timestamp with time zone default now()
);
