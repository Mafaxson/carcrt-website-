-- Supabase SQL for partners table
create table partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  type text, -- 'partner', 'affiliate', or 'sponsor'
  focus text,
  website text,
  logo text
);
