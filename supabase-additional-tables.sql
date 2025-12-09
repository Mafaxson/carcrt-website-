-- Additional tables needed for complete CArCRT website functionality
-- Run this after the initial schema to add missing tables

-- Awards table
CREATE TABLE IF NOT EXISTS awards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  image TEXT,
  year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  image TEXT,
  year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  organization TEXT,
  quote TEXT NOT NULL,
  image TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Stats table (for homepage statistics)
CREATE TABLE IF NOT EXISTS stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  label TEXT,
  icon TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Featured stories table (for homepage)
CREATE TABLE IF NOT EXISTS featured_stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  image TEXT,
  category TEXT,
  link TEXT,
  order_index INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_stories ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view awards" ON awards FOR SELECT USING (true);
CREATE POLICY "Public can view certificates" ON certificates FOR SELECT USING (true);
CREATE POLICY "Public can view testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public can view stats" ON stats FOR SELECT USING (true);
CREATE POLICY "Public can view featured stories" ON featured_stories FOR SELECT USING (true);

-- Insert default stats
INSERT INTO stats (key, value, label, icon) VALUES
  ('members', '5000+', 'Community Members', 'users'),
  ('projects', '15', 'Active Projects', 'briefcase'),
  ('districts', '1+', 'Districts Reached', 'map-pin'),
  ('impact', '95%', 'Success Rate', 'trending-up')
ON CONFLICT (key) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_awards_date ON awards(date DESC);
CREATE INDEX IF NOT EXISTS idx_certificates_date ON certificates(date DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_featured_stories_active ON featured_stories(active, order_index) WHERE active = true;

COMMENT ON TABLE awards IS 'Organizational awards and recognitions';
COMMENT ON TABLE certificates IS 'Professional certificates and achievements';
COMMENT ON TABLE testimonials IS 'User testimonials and success stories';
COMMENT ON TABLE stats IS 'Homepage statistics and key metrics';
COMMENT ON TABLE featured_stories IS 'Featured stories displayed on homepage';
