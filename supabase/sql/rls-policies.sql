-- RLS policies for frontend inserts (anon role)
-- Run this in the Supabase SQL editor as a project owner or via psql

-- Contacts table
ALTER TABLE IF EXISTS public.contacts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "allow_anon_insert_contacts" ON public.contacts;
CREATE POLICY "allow_anon_insert_contacts" ON public.contacts
  FOR INSERT
  TO anon
  USING (true)
  WITH CHECK (true);

-- Volunteers table
ALTER TABLE IF EXISTS public.volunteers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "allow_anon_insert_volunteers" ON public.volunteers;
CREATE POLICY "allow_anon_insert_volunteers" ON public.volunteers
  FOR INSERT
  TO anon
  USING (true)
  WITH CHECK (true);

-- Donations table
ALTER TABLE IF EXISTS public.donations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "allow_anon_insert_donations" ON public.donations;
CREATE POLICY "allow_anon_insert_donations" ON public.donations
  FOR INSERT
  TO anon
  USING (true)
  WITH CHECK (true);

-- Note: Adjust policies if you need additional checks (e.g. rate limits).
