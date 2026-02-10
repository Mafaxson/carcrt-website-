-- Supabase SQL for events table
create table events (
  id text primary key,
  title text not null,
  location text,
  description text,
  status text,
  registrationLink text,
  image text,
  dateFrom date,
  dateTo date,
  registrationNote text,
  applicationPdf text
);

-- Example insert (repeat for each event)
-- insert into events (id, title, location, description, status, registrationLink, image, dateFrom, dateTo, registrationNote, applicationPdf) values (...);
