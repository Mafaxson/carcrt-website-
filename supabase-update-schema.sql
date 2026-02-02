-- Update Supabase news table to match frontend expectations
alter table news add column if not exists body text;
alter table news add column if not exists excerpt text;
alter table news add column if not exists category jsonb;
alter table news add column if not exists link text;
alter table news add column if not exists videoUrl text;

-- Update Supabase events table to match frontend expectations
alter table events add column if not exists dateFrom text;
alter table events add column if not exists dateTo text;
alter table events add column if not exists status text;
alter table events add column if not exists registrationLink text;
alter table events add column if not exists registrationNote text;
alter table events add column if not exists applicationEmail text;
alter table events add column if not exists applicationPdf text;
