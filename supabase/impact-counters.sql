-- Table for homepage impact counters
create table if not exists impact_counters (
  id serial primary key,
  community_members integer not null default 0,
  projects_implemented integer not null default 0,
  districts_engaged integer not null default 0
);

insert into impact_counters (community_members, projects_implemented, districts_engaged)
values (0, 0, 0)
on conflict do nothing;
