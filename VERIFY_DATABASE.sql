-- ====================================
-- VERIFICATION SCRIPT
-- ====================================
-- Run this AFTER running ADD_PLACEHOLDER_IMAGES.sql
-- to verify everything is set up correctly
-- ====================================

-- 1. COUNT ALL RECORDS
SELECT 
  'SUMMARY' as check_type,
  '✅ Database Populated' as status;

SELECT 'Partners' as table_name, COUNT(*) as total_records FROM partners;
SELECT 'Leadership' as table_name, COUNT(*) as total_records FROM leadership;
SELECT 'News' as table_name, COUNT(*) as total_records FROM news;
SELECT 'Events' as table_name, COUNT(*) as total_records FROM events;
SELECT 'Gallery' as table_name, COUNT(*) as total_records FROM gallery;
SELECT 'Stats' as table_name, COUNT(*) as total_records FROM stats;
SELECT 'Awards' as table_name, COUNT(*) as total_records FROM awards;

-- Expected Results:
-- Partners: 7 (6 original + 1 Restoring AgriSolution)
-- Leadership: 9
-- News: 7
-- Events: 4
-- Gallery: 8
-- Stats: 6
-- Awards: 3

-- ====================================

-- 2. CHECK IMAGE COVERAGE
SELECT 
  '✅ Images Check' as check_type;

SELECT 
  'Partners' as table_name,
  COUNT(*) as total,
  COUNT(logo) as with_images,
  ROUND(COUNT(logo)::numeric / COUNT(*) * 100, 0) || '%' as coverage
FROM partners;

SELECT 
  'Leadership' as table_name,
  COUNT(*) as total,
  COUNT(photo) as with_images,
  ROUND(COUNT(photo)::numeric / COUNT(*) * 100, 0) || '%' as coverage
FROM leadership;

SELECT 
  'News' as table_name,
  COUNT(*) as total,
  COUNT(image) as with_images,
  ROUND(COUNT(image)::numeric / COUNT(*) * 100, 0) || '%' as coverage
FROM news;

SELECT 
  'Events' as table_name,
  COUNT(*) as total,
  COUNT(image) as with_images,
  ROUND(COUNT(image)::numeric / COUNT(*) * 100, 0) || '%' as coverage
FROM events;

-- Expected: 100% coverage for all tables

-- ====================================

-- 3. VERIFY RESTORING AGRISOLUTION
SELECT 
  '✅ Restoring AgriSolution Check' as check_type;

SELECT 
  name,
  type,
  CASE 
    WHEN logo IS NOT NULL THEN '✅ Has Logo'
    ELSE '❌ Missing Logo'
  END as logo_status,
  CASE 
    WHEN description IS NOT NULL THEN '✅ Has Description'
    ELSE '❌ Missing Description'
  END as description_status
FROM partners 
WHERE name LIKE '%Restoring%' OR name LIKE '%AgriSolution%';

-- Expected: 1 row with both ✅ statuses

-- ====================================

-- 4. SAMPLE DATA PREVIEW
SELECT 
  '✅ Sample Data Preview' as check_type;

-- Show first 3 partners
SELECT name, type, LEFT(logo, 50) || '...' as logo_preview 
FROM partners 
LIMIT 3;

-- Show first 3 leadership
SELECT name, position, LEFT(photo, 50) || '...' as photo_preview 
FROM leadership 
LIMIT 3;

-- Show first 3 news
SELECT title, LEFT(image, 50) || '...' as image_preview 
FROM news 
LIMIT 3;

-- ====================================

-- 5. FINAL STATUS
SELECT 
  '🎉 FINAL STATUS' as check_type;

SELECT 
  CASE 
    WHEN (SELECT COUNT(*) FROM partners) >= 7 
     AND (SELECT COUNT(*) FROM leadership) >= 9
     AND (SELECT COUNT(*) FROM news) >= 7
     AND (SELECT COUNT(*) FROM events) >= 4
     AND (SELECT COUNT(logo) FROM partners WHERE logo IS NOT NULL) >= 7
     AND (SELECT COUNT(photo) FROM leadership WHERE photo IS NOT NULL) >= 9
     AND (SELECT COUNT(image) FROM news WHERE image IS NOT NULL) >= 7
     AND (SELECT COUNT(image) FROM events WHERE image IS NOT NULL) >= 4
    THEN '✅ ALL CHECKS PASSED - Website Ready!'
    ELSE '❌ Some checks failed - Review above'
  END as overall_status;

-- ====================================
-- If you see "✅ ALL CHECKS PASSED", your database is ready!
-- Visit your Vercel site to see the results!
-- ====================================
