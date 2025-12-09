-- ============================================
-- CARCRT WEBSITE - COMPLETE TABLE SCHEMAS
-- Run this FIRST before inserting data
-- ============================================

-- ============================================
-- PARTNERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'partner',
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================
-- LEADERSHIP TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS leadership (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  photo TEXT,
  bio TEXT,
  email TEXT,
  phone TEXT,
  category TEXT DEFAULT 'Leadership',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================
-- NEWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  excerpt TEXT,
  content TEXT,
  date DATE NOT NULL,
  image TEXT,
  author TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================
-- EVENTS TABLE
-- ============================================
-- ============================================
-- POPULATE PARTNERS DATA
-- ============================================

INSERT INTO partners (id, name, logo, description, type, website, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Sierra Leone Red Cross Society', '/uploads/partner-redcross.jpg', 'Leading humanitarian organization providing emergency response and community health services across Sierra Leone', 'partner', 'https://www.ifrc.org', NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'Cross of Christ Foundation', '/uploads/partner-crossofchrist.jpg', 'Faith-based organization supporting youth development and education programs', 'partner', NULL, NOW()),
('550e8400-e29b-41d4-a716-446655440003', 'Widows Empowerment Organization', '/uploads/partner-widows.jpg', 'Dedicated to empowering widows through skills training and economic opportunities', 'partner', NULL, NOW()),
('550e8400-e29b-41d4-a716-446655440004', 'Helping Hands Community', '/uploads/partner-helpinghands.jpg', 'Community-based organization focused on youth rehabilitation and support', 'partner', NULL, NOW()),
('550e8400-e29b-41d4-a716-446655440005', 'Trading Organic Sierra Leone', '/uploads/partner-trading.jpg', 'Promoting sustainable agriculture and organic farming practices', 'sponsor', NULL, NOW()),
('550e8400-e29b-41d4-a716-446655440006', 'AfrikSpark Technology Hub', '/uploads/partner-afrikspark.jpg', 'Technology and innovation hub supporting digital skills development', 'sponsor', 'https://www.afrikspark.com', NOW())
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  logo = EXCLUDED.logo,
  description = EXCLUDED.description,
  type = EXCLUDED.type,
  website = EXCLUDED.website;

-- ============================================
-- POPULATE LEADERSHIP DATA
-- ============================================

INSERT INTO leadership (id, name, title, photo, bio, email, phone, category, created_at) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'Rev. Dr. Joseph Kamara', 'Chief Executive Officer', '/uploads/leader-ceo.jpg', 'Visionary leader with over 20 years of experience in community development and youth empowerment across Sierra Leone', 'ceo@carcrt.org', '+232-76-123456', 'Leadership', NOW()),
('650e8400-e29b-41d4-a716-446655440002', 'Mrs. Fatmata Sesay', 'Director of Programs', '/uploads/leader-programs.jpg', 'Expert in program management and community mobilization with focus on youth rehabilitation', 'programs@carcrt.org', '+232-76-123457', 'Leadership', NOW()),
('650e8400-e29b-41d4-a716-446655440003', 'Mr. Mohamed Bangura', 'Director of Operations', '/uploads/leader-operations.jpg', 'Operations specialist ensuring efficient delivery of community programs', 'operations@carcrt.org', '+232-76-123458', 'Leadership', NOW()),
('650e8400-e29b-41d4-a716-446655440004', 'Ms. Aminata Koroma', 'Western Area Coordinator', '/uploads/coordinator-western.jpg', 'Regional coordinator managing programs in Western Area Urban and Rural districts', 'western@carcrt.org', '+232-76-123459', 'Coordinator', NOW()),
('650e8400-e29b-41d4-a716-446655440005', 'Mr. Ibrahim Turay', 'Eastern Region Coordinator', '/uploads/coordinator-eastern.jpg', 'Leading community engagement initiatives in Eastern Sierra Leone', 'eastern@carcrt.org', '+232-76-123460', 'Coordinator', NOW()),
('650e8400-e29b-41d4-a716-446655440006', 'Ms. Hawa Kamara', 'Youth Programs Representative', '/uploads/rep-youth.jpg', 'Youth advocate working directly with community youth groups', 'youth@carcrt.org', '+232-76-123461', 'Representative', NOW()),
('650e8400-e29b-41d4-a716-446655440007', 'Mr. Alpha Jalloh', 'Community Outreach Intern', '/uploads/intern-outreach.jpg', 'Supporting community outreach and engagement activities', 'intern1@carcrt.org', '+232-76-123462', 'Representative', NOW()),
('650e8400-e29b-41d4-a716-446655440008', 'Ms. Mariatu Conteh', 'M&E Intern', '/uploads/intern-me.jpg', 'Assisting with monitoring, evaluation, and data collection', 'intern2@carcrt.org', '+232-76-123463', 'Representative', NOW()),
('650e8400-e29b-41d4-a716-446655440009', 'Mr. Samuel Williams', 'Communications Intern', '/uploads/intern-comms.jpg', 'Managing social media and community communications', 'intern3@carcrt.org', '+232-76-123464', 'Representative', NOW())
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  title = EXCLUDED.title,
  photo = EXCLUDED.photo,
  bio = EXCLUDED.bio,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  category = EXCLUDED.category;

-- ============================================
-- POPULATE NEWS ARTICLES
-- ============================================

INSERT INTO news (id, title, category, excerpt, content, date, image, author, created_at) VALUES
('750e8400-e29b-41d4-a716-446655440001', 'CArCRT Launches Major Drug Abuse Prevention Campaign', 'Programs', 'New initiative aims to reach 5,000 youth across Western Area with evidence-based prevention programs', 'CArCRT is proud to announce the launch of our comprehensive drug abuse prevention campaign targeting youth in Western Area Urban and Rural districts. This initiative, funded by our partners, will provide education, counseling, and support services to over 5,000 young people over the next 12 months.

The campaign includes school-based workshops, community outreach programs, peer education training, and establishment of safe spaces for youth. We are working closely with schools, community leaders, and local organizations to ensure maximum impact.

"This is a critical issue affecting our communities," said Rev. Dr. Joseph Kamara, CEO of CArCRT. "By investing in prevention and early intervention, we can help our youth make healthy choices and build brighter futures."', '2025-12-01', '/uploads/news-drug-campaign.jpg', 'CArCRT Communications', NOW()),
('750e8400-e29b-41d4-a716-446655440002', 'School Sponsorship Program Helps 50 Children Return to Class', 'Impact', 'CArCRT education support enables vulnerable children to continue their studies', 'Through our education sponsorship program, CArCRT has successfully enrolled 50 children from vulnerable families back into school for the 2025 academic year. The program provides school fees, uniforms, learning materials, and ongoing mentorship.

Many of these children had dropped out due to financial constraints or family challenges. Now, they have the opportunity to complete their education and pursue their dreams. The program also includes family support services to ensure sustainable outcomes.

Parents and guardians have expressed deep gratitude for this support, which is transforming not just individual lives but entire families and communities.', '2025-11-28', '/uploads/news-education.jpg', 'Programs Team', NOW()),
('750e8400-e29b-41d4-a716-446655440003', 'Partnership with Correctional Services for Youth Rehabilitation', 'Partnerships', 'New collaboration aims to support young offenders with skills training and reintegration support', 'CArCRT has formalized a partnership with the Sierra Leone Correctional Service to provide comprehensive rehabilitation and reintegration support for young offenders. The program includes vocational skills training, counseling, and post-release follow-up.

This initiative recognizes that many young people in the justice system need support, not just punishment. By providing skills and opportunities, we can break cycles of crime and help young people become productive members of society.

The partnership will initially focus on the Western Area, with plans to expand to other regions based on results and funding availability.', '2025-11-25', '/uploads/news-partnership.jpg', 'Leadership Team', NOW()),
('750e8400-e29b-41d4-a716-446655440004', 'Community Leaders Training Graduates 30 Participants', 'Programs', 'Leadership development program equips community members with skills to drive local change', 'Thirty community leaders from across Western Area have successfully completed our intensive Leadership Development Training program. The three-month course covered topics including community mobilization, project management, conflict resolution, and resource mobilization.

Graduates are now better equipped to lead development initiatives in their communities and serve as agents of positive change. Several participants have already begun implementing community projects based on their training.

"This training has transformed how I approach community work," shared one graduate. "I now have the tools and confidence to make real impact."', '2025-11-20', '/uploads/news-training.jpg', 'Programs Team', NOW()),
('750e8400-e29b-41d4-a716-446655440005', 'CArCRT Hosts Annual Community Impact Summit', 'Events', 'Stakeholders gather to review progress and plan for 2026', 'Our Annual Community Impact Summit brought together over 100 stakeholders including partners, community leaders, youth representatives, and government officials. The event provided an opportunity to review our 2025 achievements, share lessons learned, and collaboratively plan for 2026.

Key discussions focused on expanding our geographic reach, strengthening partnerships, and developing sustainable funding strategies. Participants appreciated the transparent reporting and collaborative approach to planning.

The summit concluded with renewed commitments from partners and exciting plans for expanding our impact in the coming year.', '2025-11-15', '/uploads/news-summit.jpg', 'Communications Team', NOW()),
('750e8400-e29b-41d4-a716-446655440006', 'New Mobile App Connects Youth with Opportunities', 'Announcements', 'Technology initiative makes it easier for young people to access programs and services', 'CArCRT has launched a mobile app that connects young people with educational opportunities, job listings, skills training programs, and support services. The app is free to download and works on basic smartphones.

This innovation addresses a key challenge: many youth are unaware of available opportunities. The app provides a centralized platform where they can easily find and apply for programs that match their interests and needs.

"We are excited to leverage technology to expand our reach," said our Director of Operations. "This app will help us connect with more youth and make a bigger impact."', '2025-11-10', '/uploads/news-app.jpg', 'Technology Team', NOW()),
('750e8400-e29b-41d4-a716-446655440007', 'Quarterly Impact Report Shows Significant Progress', 'Reports', 'Third quarter results demonstrate strong program performance and community impact', 'Our Q3 2025 Impact Report shows impressive results across all program areas. Highlights include: 1,200 youth reached through drug prevention programs, 150 families supported with livelihood assistance, 80 young people completing skills training, and 50 children sponsored for education.

Program quality metrics also show high satisfaction rates among participants and strong community engagement. Financial management remains strong with 92% of funds going directly to programs.

We thank our partners, donors, and community members for making this impact possible. Full report available for download on our website.', '2025-11-05', '/uploads/news-report.jpg', 'M&E Team', NOW());

-- ============================================
-- POPULATE EVENTS
-- ============================================

INSERT INTO events (id, title, description, date, location, time, category, image, status, registration_link, application_pdf, created_at) VALUES
('850e8400-e29b-41d4-a716-446655440001', '16 Days of Activism Against Gender-Based Violence', 'Join us for a series of community events, workshops, and awareness campaigns addressing gender-based violence. Activities include school outreach, community dialogues, survivor support services, and a closing march for peace.

This campaign aligns with the international 16 Days of Activism and brings together community members, survivors, advocates, and allies to take a stand against all forms of gender-based violence.', '2025-12-10', 'Multiple locations across Western Area', '9:00 AM - 5:00 PM daily', 'Campaign', '/uploads/event-16days.jpg', 'upcoming', NULL, '/uploads/16days-schedule.pdf', NOW()),
('850e8400-e29b-41d4-a716-446655440002', 'Youth Drug Prevention Workshop Series', 'Interactive workshop series for youth aged 12-25 focusing on drug abuse prevention, healthy decision-making, and peer resistance skills. Sessions include: Understanding Substances, Peer Pressure Resistance, Healthy Alternatives, and Building Self-Esteem.

Workshops use participatory methods including role plays, group discussions, and interactive games. Snacks and certificates provided. Limited spaces available - register early!', '2025-12-15', 'CArCRT Training Center, Freetown', '10:00 AM - 3:00 PM', 'Workshop', '/uploads/event-workshop.jpg', 'upcoming', 'https://forms.gle/drugpreventionworkshop', '/uploads/workshop-application.pdf', NOW()),
('850e8400-e29b-41d4-a716-446655440003', 'Documentary Film Crew Call: Share Your Story', 'CArCRT is partnering with a documentary film team to create a short film about youth empowerment and community transformation in Sierra Leone. We are looking for youth with inspiring stories of overcoming challenges, community leaders making impact, and families transformed through our programs.

Filming dates: December 18-20, 2025. No experience needed - just your authentic story. Selected participants will receive compensation for their time.', '2025-12-18', 'Various community locations', 'Flexible scheduling', 'Media', '/uploads/event-film.jpg', 'upcoming', NULL, '/uploads/film-participation-form.pdf', NOW()),
('850e8400-e29b-41d4-a716-446655440004', 'Post-Rehabilitation Support Group Meeting', 'Monthly support group for individuals who have completed drug rehabilitation programs. This safe space provides ongoing encouragement, accountability, skills building, and community connection to support sustained recovery.

Topics this month: Managing Triggers During Holidays, Building Healthy Relationships, and Planning for 2026. Light refreshments served. All discussions confidential.', '2025-12-20', 'CArCRT Community Center, Wellington', '3:00 PM - 5:00 PM', 'Support Group', '/uploads/event-support.jpg', 'ongoing', NULL, NULL, NOW());

-- ============================================
-- POPULATE GALLERY
-- ============================================

INSERT INTO gallery (id, title, description, image, category, partner_slug, created_at) VALUES
('950e8400-e29b-41d4-a716-446655440001', 'Pepper Farming Project', 'Community members working in pepper farming initiative', '/uploads/gallery-pepper.jpg', 'Agriculture', 'trading-organic', NOW()),
('950e8400-e29b-41d4-a716-446655440002', 'Farm Layout Planning', 'Planning and organizing agricultural plots', '/uploads/gallery-layout.jpg', 'Agriculture', 'trading-organic', NOW()),
('950e8400-e29b-41d4-a716-446655440003', 'Land Ploughing', 'Preparing land for crop planting', '/uploads/gallery-ploughing.jpg', 'Agriculture', 'trading-organic', NOW()),
('950e8400-e29b-41d4-a716-446655440004', 'Potato Garden', 'Potato cultivation project in progress', '/uploads/gallery-potato.jpg', 'Agriculture', 'trading-organic', NOW()),
('950e8400-e29b-41d4-a716-446655440005', 'Youth Skills Training', 'Young people learning vocational skills', '/uploads/gallery-skills.jpg', 'Training', 'helping-hands', NOW()),
('950e8400-e29b-41d4-a716-446655440006', 'Community Meeting', 'Community gathering for project planning', '/uploads/gallery-meeting.jpg', 'Community', 'widows-empowerment', NOW()),
('950e8400-e29b-41d4-a716-446655440007', 'School Support Program', 'Students receiving educational support', '/uploads/gallery-school.jpg', 'Education', 'cross-of-christ', NOW()),
('950e8400-e29b-41d4-a716-446655440008', 'Health Outreach', 'Community health awareness campaign', '/uploads/gallery-health.jpg', 'Health', 'redcross', NOW());

-- ============================================
-- POPULATE STATS
-- ============================================

INSERT INTO stats (key, value, label, icon) VALUES
('members', '5,000+', 'Community Members Reached', 'users'),
('projects', '25', 'Active Programs & Projects', 'briefcase'),
('districts', '3', 'Districts Covered', 'map-pin'),
('impact', '95%', 'Program Success Rate', 'trending-up'),
('volunteers', '150', 'Active Volunteers', 'heart'),
('partners', '12', 'Partner Organizations', 'handshake')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  label = EXCLUDED.label,
  updated_at = NOW();

-- ============================================
-- POPULATE AWARDS
-- ============================================

INSERT INTO awards (title, description, date, image, year) VALUES
('Community Impact Award 2024', 'Recognized by Sierra Leone NGO Consortium for outstanding community development work', '2024-10-15', '/uploads/award-impact.jpg', 2024),
('Youth Empowerment Excellence', 'National Youth Commission award for innovative youth programs', '2024-08-20', '/uploads/award-youth.jpg', 2024),
('Best Practices in Drug Prevention', 'Ministry of Social Welfare recognition for evidence-based prevention programs', '2024-06-10', '/uploads/award-prevention.jpg', 2024);

-- ============================================
-- POPULATE CERTIFICATES
-- ============================================

INSERT INTO certificates (title, description, date, image, year) VALUES
('NGO Registration Certificate', 'Official registration with Corporate Affairs Commission of Sierra Leone', '2020-01-15', '/uploads/cert-registration.jpg', 2020),
('Tax Exemption Certificate', 'National Revenue Authority tax-exempt status for charitable organization', '2020-03-20', '/uploads/cert-tax.jpg', 2020),
('ISO 9001:2015 Quality Management', 'International certification for quality management systems', '2023-05-10', '/uploads/cert-iso.jpg', 2023),
('Child Protection Certification', 'UNICEF certification in child safeguarding and protection', '2023-09-15', '/uploads/cert-child.jpg', 2023);

-- ============================================
-- POPULATE TESTIMONIALS
-- ============================================

INSERT INTO testimonials (name, role, organization, quote, image, featured) VALUES
('Aminata Koroma', 'Program Participant', 'Freetown Youth Group', 'CArCRT changed my life. Through their skills training program, I learned tailoring and now run my own business. I am supporting my family and inspiring other young women.', '/uploads/testimonial-aminata.jpg', true),
('Chief Mohamed Sesay', 'Community Leader', 'Wellington Community', 'The work CArCRT is doing in our community is transformational. They don''t just bring programs - they empower us to create lasting change ourselves.', '/uploads/testimonial-chief.jpg', true),
('Ibrahim Kamara', 'Former Program Participant', 'Now Youth Mentor', 'I was heading down the wrong path with drugs and crime. CArCRT''s rehabilitation program gave me a second chance. Today, I help other young people avoid the mistakes I made.', '/uploads/testimonial-ibrahim.jpg', true);

-- ============================================
-- POPULATE FEATURED STORIES
-- ============================================

INSERT INTO featured_stories (title, excerpt, image, category, link, order_index, active) VALUES
('From Addiction to Advocacy', 'How one young man overcame substance abuse and now mentors others', '/uploads/story-advocacy.jpg', 'Impact', '/impact-stories', 1, true),
('Empowering Widows Through Agriculture', 'Women farmers creating sustainable livelihoods', '/uploads/story-widows.jpg', 'Programs', '/impact-stories', 2, true),
('Building Safer Communities Together', 'Community-led initiatives reducing youth crime', '/uploads/story-safety.jpg', 'Community', '/impact-stories', 3, true);CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  location TEXT,
  time TEXT,
  category TEXT,
  image TEXT,
  status TEXT DEFAULT 'upcoming',
  registration_link TEXT,
  application_pdf TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================
-- GALLERY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT NOT NULL,
  category TEXT,
  partner_slug TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================
-- SUBMISSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  data JSONB NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================
-- AWARDS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS awards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  image TEXT,
  year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================
-- CERTIFICATES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  image TEXT,
  year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================
-- TESTIMONIALS TABLE
-- ============================================
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

-- ============================================
-- STATS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  label TEXT,
  icon TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================
-- FEATURED STORIES TABLE
-- ============================================
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

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE leadership ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_stories ENABLE ROW LEVEL SECURITY;

-- ============================================
-- CREATE POLICIES FOR PUBLIC READ ACCESS
-- ============================================
DO $$ 
BEGIN
  -- Drop existing policies if they exist, then recreate
  DROP POLICY IF EXISTS "Public can view partners" ON partners;
  DROP POLICY IF EXISTS "Public can view leadership" ON leadership;
  DROP POLICY IF EXISTS "Public can view news" ON news;
  DROP POLICY IF EXISTS "Public can view events" ON events;
  DROP POLICY IF EXISTS "Public can view gallery" ON gallery;
  DROP POLICY IF EXISTS "Public can view awards" ON awards;
  DROP POLICY IF EXISTS "Public can view certificates" ON certificates;
  DROP POLICY IF EXISTS "Public can view testimonials" ON testimonials;
  DROP POLICY IF EXISTS "Public can view stats" ON stats;
  DROP POLICY IF EXISTS "Public can view featured stories" ON featured_stories;
  DROP POLICY IF EXISTS "Public can submit" ON submissions;
  DROP POLICY IF EXISTS "Public can view own submissions" ON submissions;
END $$;

CREATE POLICY "Public can view partners" ON partners FOR SELECT USING (true);
CREATE POLICY "Public can view leadership" ON leadership FOR SELECT USING (true);
CREATE POLICY "Public can view news" ON news FOR SELECT USING (true);
CREATE POLICY "Public can view events" ON events FOR SELECT USING (true);
CREATE POLICY "Public can view gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public can view awards" ON awards FOR SELECT USING (true);
CREATE POLICY "Public can view certificates" ON certificates FOR SELECT USING (true);
CREATE POLICY "Public can view testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public can view stats" ON stats FOR SELECT USING (true);
CREATE POLICY "Public can view featured stories" ON featured_stories FOR SELECT USING (true);

-- Allow public to insert submissions (for contact forms)
CREATE POLICY "Public can submit" ON submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view own submissions" ON submissions FOR SELECT USING (true);

-- ============================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_partners_type ON partners(type);
CREATE INDEX IF NOT EXISTS idx_leadership_category ON leadership(category);
CREATE INDEX IF NOT EXISTS idx_news_date ON news(date DESC);
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date DESC);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_partner ON gallery(partner_slug);
CREATE INDEX IF NOT EXISTS idx_submissions_type ON submissions(type);
CREATE INDEX IF NOT EXISTS idx_submissions_created ON submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_awards_date ON awards(date DESC);
CREATE INDEX IF NOT EXISTS idx_certificates_date ON certificates(date DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_featured_stories_active ON featured_stories(active, order_index) WHERE active = true;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '✅ ALL TABLES CREATED SUCCESSFULLY!';
  RAISE NOTICE '';
  RAISE NOTICE 'Tables created:';
  RAISE NOTICE '- partners';
  RAISE NOTICE '- leadership';
  RAISE NOTICE '- news';
  RAISE NOTICE '- events';
  RAISE NOTICE '- gallery';
  RAISE NOTICE '- submissions';
  RAISE NOTICE '- awards';
  RAISE NOTICE '- certificates';
  RAISE NOTICE '- testimonials';
  RAISE NOTICE '- stats';
  RAISE NOTICE '- featured_stories';
  RAISE NOTICE '';
  RAISE NOTICE '✅ Row Level Security enabled';
  RAISE NOTICE '✅ Public read policies created';
  RAISE NOTICE '✅ Indexes created for performance';
  RAISE NOTICE '';
  RAISE NOTICE '🎯 NEXT STEP: Run supabase-data-complete.sql to insert your content';
END $$;
