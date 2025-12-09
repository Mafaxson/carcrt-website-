-- COMPLETE DATA RESTORATION FOR CARCRT WEBSITE
-- Run this entire script in Supabase SQL Editor to populate all content

-- ============================================
-- STEP 1: ADD MISSING COLUMNS TO EXISTING TABLES
-- ============================================

DO $$ 
BEGIN
  -- Add missing columns to partners table
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'partners' AND column_name = 'description'
  ) THEN
    ALTER TABLE partners ADD COLUMN description TEXT;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'partners' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE partners ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL;
  END IF;

  -- Add missing columns to leadership table
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leadership' AND column_name = 'title'
  ) THEN
    ALTER TABLE leadership ADD COLUMN title TEXT;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leadership' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE leadership ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL;
  END IF;

  -- Add missing columns to news table
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'news' AND column_name = 'author'
  ) THEN
    ALTER TABLE news ADD COLUMN author TEXT;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'news' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE news ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL;
  END IF;

  -- Fix category column type if it's JSON instead of TEXT
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'news' AND column_name = 'category' AND data_type = 'json'
  ) THEN
    ALTER TABLE news ALTER COLUMN category TYPE TEXT USING category::TEXT;
  END IF;
  
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'news' AND column_name = 'category' AND data_type = 'jsonb'
  ) THEN
    ALTER TABLE news ALTER COLUMN category TYPE TEXT USING category::TEXT;
  END IF;

  -- Add missing columns to events table
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'events' AND column_name = 'time'
  ) THEN
    ALTER TABLE events ADD COLUMN time TEXT;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'events' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE events ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL;
  END IF;

  -- Add missing columns to gallery table
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'gallery' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE gallery ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL;
  END IF;

  RAISE NOTICE '✅ Missing columns added successfully!';
END $$;

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
('750e8400-e29b-41d4-a716-446655440001', 'CArCRT Launches Major Drug Abuse Prevention Campaign', 'Programs', 'New initiative aims to reach 5,000 youth across Western Area with evidence-based prevention programs', 'CArCRT is proud to announce the launch of our comprehensive drug abuse prevention campaign targeting youth in Western Area Urban and Rural districts. This initiative, funded by our partners, will provide education, counseling, and support services to over 5,000 young people over the next 12 months.\n\nThe campaign includes school-based workshops, community outreach programs, peer education training, and establishment of safe spaces for youth. We are working closely with schools, community leaders, and local organizations to ensure maximum impact.\n\n"This is a critical issue affecting our communities," said Rev. Dr. Joseph Kamara, CEO of CArCRT. "By investing in prevention and early intervention, we can help our youth make healthy choices and build brighter futures."', '2025-12-01', '/uploads/news-drug-campaign.jpg', 'CArCRT Communications', NOW()),
('750e8400-e29b-41d4-a716-446655440002', 'School Sponsorship Program Helps 50 Children Return to Class', 'Impact', 'CArCRT education support enables vulnerable children to continue their studies', 'Through our education sponsorship program, CArCRT has successfully enrolled 50 children from vulnerable families back into school for the 2025 academic year. The program provides school fees, uniforms, learning materials, and ongoing mentorship.\n\nMany of these children had dropped out due to financial constraints or family challenges. Now, they have the opportunity to complete their education and pursue their dreams. The program also includes family support services to ensure sustainable outcomes.\n\nParents and guardians have expressed deep gratitude for this support, which is transforming not just individual lives but entire families and communities.', '2025-11-28', '/uploads/news-education.jpg', 'Programs Team', NOW()),
('750e8400-e29b-41d4-a716-446655440003', 'Partnership with Correctional Services for Youth Rehabilitation', 'Partnerships', 'New collaboration aims to support young offenders with skills training and reintegration support', 'CArCRT has formalized a partnership with the Sierra Leone Correctional Service to provide comprehensive rehabilitation and reintegration support for young offenders. The program includes vocational skills training, counseling, and post-release follow-up.\n\nThis initiative recognizes that many young people in the justice system need support, not just punishment. By providing skills and opportunities, we can break cycles of crime and help young people become productive members of society.\n\nThe partnership will initially focus on the Western Area, with plans to expand to other regions based on results and funding availability.', '2025-11-25', '/uploads/news-partnership.jpg', 'Leadership Team', NOW()),
('750e8400-e29b-41d4-a716-446655440004', 'Community Leaders Training Graduates 30 Participants', 'Programs', 'Leadership development program equips community members with skills to drive local change', 'Thirty community leaders from across Western Area have successfully completed our intensive Leadership Development Training program. The three-month course covered topics including community mobilization, project management, conflict resolution, and resource mobilization.\n\nGraduates are now better equipped to lead development initiatives in their communities and serve as agents of positive change. Several participants have already begun implementing community projects based on their training.\n\n"This training has transformed how I approach community work," shared one graduate. "I now have the tools and confidence to make real impact."', '2025-11-20', '/uploads/news-training.jpg', 'Programs Team', NOW()),
('750e8400-e29b-41d4-a716-446655440005', 'CArCRT Hosts Annual Community Impact Summit', 'Events', 'Stakeholders gather to review progress and plan for 2026', 'Our Annual Community Impact Summit brought together over 100 stakeholders including partners, community leaders, youth representatives, and government officials. The event provided an opportunity to review our 2025 achievements, share lessons learned, and collaboratively plan for 2026.\n\nKey discussions focused on expanding our geographic reach, strengthening partnerships, and developing sustainable funding strategies. Participants appreciated the transparent reporting and collaborative approach to planning.\n\nThe summit concluded with renewed commitments from partners and exciting plans for expanding our impact in the coming year.', '2025-11-15', '/uploads/news-summit.jpg', 'Communications Team', NOW()),
('750e8400-e29b-41d4-a716-446655440006', 'New Mobile App Connects Youth with Opportunities', 'Announcements', 'Technology initiative makes it easier for young people to access programs and services', 'CArCRT has launched a mobile app that connects young people with educational opportunities, job listings, skills training programs, and support services. The app is free to download and works on basic smartphones.\n\nThis innovation addresses a key challenge: many youth are unaware of available opportunities. The app provides a centralized platform where they can easily find and apply for programs that match their interests and needs.\n\n"We are excited to leverage technology to expand our reach," said our Director of Operations. "This app will help us connect with more youth and make a bigger impact."', '2025-11-10', '/uploads/news-app.jpg', 'Technology Team', NOW()),
('750e8400-e29b-41d4-a716-446655440007', 'Quarterly Impact Report Shows Significant Progress', 'Reports', 'Third quarter results demonstrate strong program performance and community impact', 'Our Q3 2025 Impact Report shows impressive results across all program areas. Highlights include: 1,200 youth reached through drug prevention programs, 150 families supported with livelihood assistance, 80 young people completing skills training, and 50 children sponsored for education.\n\nProgram quality metrics also show high satisfaction rates among participants and strong community engagement. Financial management remains strong with 92% of funds going directly to programs.\n\nWe thank our partners, donors, and community members for making this impact possible. Full report available for download on our website.', '2025-11-05', '/uploads/news-report.jpg', 'M&E Team', NOW());

-- ============================================
-- POPULATE EVENTS
-- ============================================

INSERT INTO events (id, title, description, date, location, time, category, image, status, registration_link, application_pdf, created_at) VALUES
('850e8400-e29b-41d4-a716-446655440001', '16 Days of Activism Against Gender-Based Violence', 'Join us for a series of community events, workshops, and awareness campaigns addressing gender-based violence. Activities include school outreach, community dialogues, survivor support services, and a closing march for peace.\n\nThis campaign aligns with the international 16 Days of Activism and brings together community members, survivors, advocates, and allies to take a stand against all forms of gender-based violence.', '2025-12-10', 'Multiple locations across Western Area', '9:00 AM - 5:00 PM daily', 'Campaign', '/uploads/event-16days.jpg', 'upcoming', NULL, '/uploads/16days-schedule.pdf', NOW()),
('850e8400-e29b-41d4-a716-446655440002', 'Youth Drug Prevention Workshop Series', 'Interactive workshop series for youth aged 12-25 focusing on drug abuse prevention, healthy decision-making, and peer resistance skills. Sessions include: Understanding Substances, Peer Pressure Resistance, Healthy Alternatives, and Building Self-Esteem.\n\nWorkshops use participatory methods including role plays, group discussions, and interactive games. Snacks and certificates provided. Limited spaces available - register early!', '2025-12-15', 'CArCRT Training Center, Freetown', '10:00 AM - 3:00 PM', 'Workshop', '/uploads/event-workshop.jpg', 'upcoming', 'https://forms.gle/drugpreventionworkshop', '/uploads/workshop-application.pdf', NOW()),
('850e8400-e29b-41d4-a716-446655440003', 'Documentary Film Crew Call: Share Your Story', 'CArCRT is partnering with a documentary film team to create a short film about youth empowerment and community transformation in Sierra Leone. We are looking for youth with inspiring stories of overcoming challenges, community leaders making impact, and families transformed through our programs.\n\nFilming dates: December 18-20, 2025. No experience needed - just your authentic story. Selected participants will receive compensation for their time.', '2025-12-18', 'Various community locations', 'Flexible scheduling', 'Media', '/uploads/event-film.jpg', 'upcoming', NULL, '/uploads/film-participation-form.pdf', NOW()),
('850e8400-e29b-41d4-a716-446655440004', 'Post-Rehabilitation Support Group Meeting', 'Monthly support group for individuals who have completed drug rehabilitation programs. This safe space provides ongoing encouragement, accountability, skills building, and community connection to support sustained recovery.\n\nTopics this month: Managing Triggers During Holidays, Building Healthy Relationships, and Planning for 2026. Light refreshments served. All discussions confidential.', '2025-12-20', 'CArCRT Community Center, Wellington', '3:00 PM - 5:00 PM', 'Support Group', '/uploads/event-support.jpg', 'ongoing', NULL, NULL, NOW());

-- ============================================
-- POPULATE GALLERY (Coaching Partners Photos)
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
-- POPULATE STATS (Homepage)
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
-- POPULATE FEATURED STORIES (Homepage)
-- ============================================

INSERT INTO featured_stories (title, excerpt, image, category, link, order_index, active) VALUES
('From Addiction to Advocacy', 'How one young man overcame substance abuse and now mentors others', '/uploads/story-advocacy.jpg', 'Impact', '/impact-stories', 1, true),
('Empowering Widows Through Agriculture', 'Women farmers creating sustainable livelihoods', '/uploads/story-widows.jpg', 'Programs', '/impact-stories', 2, true),
('Building Safer Communities Together', 'Community-led initiatives reducing youth crime', '/uploads/story-safety.jpg', 'Community', '/impact-stories', 3, true);

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ ALL DATA SUCCESSFULLY RESTORED!';
  RAISE NOTICE '📊 Partners: 6 records';
  RAISE NOTICE '👥 Leadership: 9 records';
  RAISE NOTICE '📰 News: 7 articles';
  RAISE NOTICE '📅 Events: 4 events';
  RAISE NOTICE '🖼️ Gallery: 8 photos';
  RAISE NOTICE '📈 Stats: 6 metrics';
  RAISE NOTICE '🏆 Awards: 3 records';
  RAISE NOTICE '📜 Certificates: 4 records';
  RAISE NOTICE '💬 Testimonials: 3 records';
  RAISE NOTICE '⭐ Featured Stories: 3 records';
  RAISE NOTICE '';
  RAISE NOTICE 'Your website now has complete content!';
END $$;
