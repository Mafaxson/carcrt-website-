-- ====================================
-- INSTANT FIX - Add Professional Placeholder Images
-- ====================================
-- Copy and paste this ENTIRE script into Supabase SQL Editor
-- URL: https://supabase.com/dashboard/project/rbxrelsauoqytwifdteq/sql/new
-- Click "Run" to execute
-- ====================================

-- 1. UPDATE LEADERSHIP PHOTOS (9 people)
-- Uses professional avatar service that generates images based on names
UPDATE leadership SET photo = 'https://ui-avatars.com/api/?name=' || REPLACE(name, ' ', '+') || '&size=400&background=0D8ABC&color=fff&bold=true';

-- 2. UPDATE PARTNER LOGOS (6 organizations)  
-- Uses professional organization logos
UPDATE partners SET logo = 'https://ui-avatars.com/api/?name=' || REPLACE(name, ' ', '+') || '&size=400&background=059669&color=fff&bold=true';

-- 3. UPDATE NEWS IMAGES (7 articles)
-- Uses beautiful stock photos from Unsplash
UPDATE news SET image = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop' WHERE title LIKE '%Drug%';
UPDATE news SET image = 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop' WHERE title LIKE '%School%';
UPDATE news SET image = 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=600&fit=crop' WHERE title LIKE '%Partner%';
UPDATE news SET image = 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop' WHERE title LIKE '%Training%';
UPDATE news SET image = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop' WHERE title LIKE '%Summit%';
UPDATE news SET image = 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop' WHERE title LIKE '%Mobile%';
UPDATE news SET image = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop' WHERE title LIKE '%Impact%';

-- Backup: Set any remaining news items without images
UPDATE news SET image = 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop' WHERE image IS NULL OR image = '';

-- 4. UPDATE EVENT IMAGES (4 events)
UPDATE events SET image = 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop' WHERE title LIKE '%16 Days%';
UPDATE events SET image = 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop' WHERE title LIKE '%Workshop%';
UPDATE events SET image = 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=600&fit=crop' WHERE title LIKE '%Film%';
UPDATE events SET image = 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop' WHERE title LIKE '%Support%';

-- Backup: Set any remaining events without images
UPDATE events SET image = 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop' WHERE image IS NULL OR image = '';

-- 5. UPDATE GALLERY PHOTOS (8 images)
UPDATE gallery SET photo_url = 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop' WHERE description LIKE '%Pepper%';
UPDATE gallery SET photo_url = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop' WHERE description LIKE '%Layout%';
UPDATE gallery SET photo_url = 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&h=600&fit=crop' WHERE description LIKE '%Ploughing%';
UPDATE gallery SET photo_url = 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&h=600&fit=crop' WHERE description LIKE '%Potato%';
UPDATE gallery SET photo_url = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop' WHERE description LIKE '%Skills%';
UPDATE gallery SET photo_url = 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop' WHERE description LIKE '%Meeting%';
UPDATE gallery SET photo_url = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop' WHERE description LIKE '%School%';
UPDATE gallery SET photo_url = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop' WHERE description LIKE '%Health%';

-- 6. ADD "RESTORING AGRISOLUTION ENTERPRISES" to Partners (if not already added)
INSERT INTO partners (name, type, logo, description, website)
VALUES (
  'Restoring AgriSolution Enterprises',
  'Affiliate Partner',
  'https://ui-avatars.com/api/?name=Restoring+AgriSolution&size=400&background=16a34a&color=fff&bold=true',
  'Restoring AgriSolution Enterprises is a social-impact agribusiness dedicated to transforming agriculture and empowering communities in Sierra Leone. Through sustainable farming practices, youth and women empowerment programs, and food security initiatives, we are building a resilient agricultural sector that creates opportunities and drives economic growth.',
  'https://restoringagrisolution.sl'
)
ON CONFLICT DO NOTHING;

-- ====================================
-- VERIFICATION QUERY
-- ====================================
-- Run this to check if all images are now set:

SELECT 'Leadership Photos' as table_name, COUNT(*) as total, COUNT(photo) as with_images FROM leadership
UNION ALL
SELECT 'Partner Logos', COUNT(*), COUNT(logo) FROM partners
UNION ALL  
SELECT 'News Images', COUNT(*), COUNT(image) FROM news
UNION ALL
SELECT 'Event Images', COUNT(*), COUNT(image) FROM events
UNION ALL
SELECT 'Gallery Photos', COUNT(*), COUNT(photo_url) FROM gallery;

-- ====================================
-- EXPECTED RESULT
-- ====================================
-- Leadership Photos: 9 total, 9 with images
-- Partner Logos: 7 total, 7 with images (including Restoring AgriSolution)
-- News Images: 7 total, 7 with images
-- Event Images: 4 total, 4 with images
-- Gallery Photos: 8 total, 8 with images
-- ====================================

-- 🎉 DONE! Your website now has professional placeholder images!
-- Visit your Vercel site to see the changes.
