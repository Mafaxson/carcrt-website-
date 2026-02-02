-- Add missing published_at column to news table
alter table news add column if not exists published_at timestamptz;
