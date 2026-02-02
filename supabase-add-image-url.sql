-- Add missing image_url columns to news and events tables
alter table news add column if not exists image_url text;
alter table events add column if not exists image_url text;
