-- Add missing event_date column to events table
alter table events add column if not exists event_date timestamptz;
