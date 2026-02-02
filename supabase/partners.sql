-- Table for partners & sponsors
create table if not exists partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  website text,
  logo_url text,
  created_at timestamp with time zone default now()
);
