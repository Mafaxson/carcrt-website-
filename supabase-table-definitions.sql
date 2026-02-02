-- Table for all form submissions
create table if not exists form_submissions (
  id uuid primary key default uuid_generate_v4(),
  form_type text not null,
  fields jsonb not null,
  submitted_at timestamptz default now(),
  email text
);

-- Table for dynamic content sections
create table if not exists dynamic_content (
  id uuid primary key default uuid_generate_v4(),
  section text not null, -- e.g. 'ways_to_get_involved', 'volunteer_areas'
  content jsonb not null,
  updated_at timestamptz default now()
);

-- Table for news/blog/updates
create table if not exists news (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  body text not null,
  published_at timestamptz default now(),
  image_url text
);

-- Table for events
create table if not exists events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  event_date timestamptz not null,
  location text,
  image_url text
);
