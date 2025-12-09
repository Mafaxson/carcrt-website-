-- =====================================================
-- SUPABASE SETUP VERIFICATION SCRIPT
-- Run this to check if your database is properly set up
-- =====================================================

-- 1. CHECK IF ALL TABLES EXIST
SELECT 
  'Tables Check' as check_type,
  CASE 
    WHEN COUNT(*) >= 11 THEN '✅ PASS - All tables exist'
    ELSE '❌ FAIL - Missing tables'
  END as status,
  COUNT(*) as table_count,
  STRING_AGG(table_name, ', ') as tables
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
  AND table_name IN (
    'partners', 'news', 'events', 'leadership', 'gallery',
    'submissions', 'awards', 'certificates', 'testimonials',
    'stats', 'featured_stories'
  );

-- 2. CHECK DATA COUNT IN EACH TABLE
SELECT 'partners' as table_name, COUNT(*) as row_count FROM partners
UNION ALL
SELECT 'news', COUNT(*) FROM news
UNION ALL
SELECT 'events', COUNT(*) FROM events
UNION ALL
SELECT 'leadership', COUNT(*) FROM leadership
UNION ALL
SELECT 'gallery', COUNT(*) FROM gallery
UNION ALL
SELECT 'submissions', COUNT(*) FROM submissions
UNION ALL
SELECT 'awards', COUNT(*) FROM awards
UNION ALL
SELECT 'certificates', COUNT(*) FROM certificates
UNION ALL
SELECT 'testimonials', COUNT(*) FROM testimonials
UNION ALL
SELECT 'stats', COUNT(*) FROM stats
UNION ALL
SELECT 'featured_stories', COUNT(*) FROM featured_stories
ORDER BY table_name;

-- 3. CHECK ROW LEVEL SECURITY STATUS
SELECT
  schemaname,
  tablename,
  CASE 
    WHEN rowsecurity THEN '✅ RLS Enabled'
    ELSE '⚠️ RLS Disabled'
  END as rls_status
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'partners', 'news', 'events', 'leadership', 'gallery',
    'submissions', 'awards', 'certificates', 'testimonials',
    'stats', 'featured_stories'
  )
ORDER BY tablename;

-- 4. CHECK POLICIES FOR PUBLIC ACCESS
SELECT
  tablename,
  policyname,
  CASE 
    WHEN cmd = 'SELECT' THEN '✅ Read Access'
    WHEN cmd = 'INSERT' THEN '✅ Write Access'
    WHEN cmd = 'UPDATE' THEN '✅ Update Access'
    WHEN cmd = 'DELETE' THEN '✅ Delete Access'
    ELSE cmd
  END as policy_type
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 5. SAMPLE DATA CHECK - Show first few rows from key tables
SELECT '=== PARTNERS ===' as info;
SELECT name, type, created_at FROM partners LIMIT 3;

SELECT '=== NEWS ===' as info;
SELECT title, category, date FROM news ORDER BY date DESC LIMIT 3;

SELECT '=== EVENTS ===' as info;
SELECT title, date, status FROM events ORDER BY date DESC LIMIT 3;

SELECT '=== LEADERSHIP ===' as info;
SELECT name, title, category FROM leadership LIMIT 3;

SELECT '=== STATS ===' as info;
SELECT key, value, label FROM stats;

-- =====================================================
-- INTERPRETATION GUIDE
-- =====================================================
-- 
-- ✅ PASS - Everything is working correctly
-- ⚠️ WARNING - May need attention but not critical
-- ❌ FAIL - Critical issue, needs fixing
--
-- Expected Results:
-- - Tables Check: 11 tables
-- - RLS Status: All enabled
-- - At least SELECT policies for each table
-- - Data counts: partners (6), news (7), events (4), leadership (9)
--
-- =====================================================
