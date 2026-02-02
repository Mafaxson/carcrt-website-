-- Table for Impact Stories (with approval)
create table if not exists impact_stories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  submitted_by text,
  approved boolean not null default false,
  created_at timestamp with time zone default now()
);
