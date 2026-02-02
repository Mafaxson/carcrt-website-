-- Table for Agribusiness Enterprise Gallery (Our Work in Action)
create table if not exists agribusiness_gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  created_at timestamp with time zone default now()
);
