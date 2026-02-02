-- Table for Applications (Get Involved / Volunteer)
create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text,
  file_url text,
  submitted_at timestamp with time zone default now()
);
