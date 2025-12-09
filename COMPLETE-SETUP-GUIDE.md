# CArCRT Website - Complete Supabase Setup Guide

## 🎯 Quick Start - Do This Now!

Follow these steps IN ORDER to get your website fully functional and ready to host:

---

## Step 1: Set Up Supabase Database (10 minutes)

### 1.1 Access Your Supabase Project
1. Go to: https://supabase.com/dashboard/project/rbxrelsauoqytwifdteq
2. Log in with your Supabase account

### 1.2 Run SQL Scripts to Create Tables

**Go to SQL Editor:**
1. Click "SQL Editor" in the left sidebar
2. Click "New Query"

**Run Script 1 - Create Additional Tables:**
1. Copy the entire content from `supabase-additional-tables.sql`
2. Paste into the SQL Editor
3. Click "Run" (or press Ctrl+Enter)
4. Wait for "Success. No rows returned" message

**Run Script 2 - Insert Sample Data:**
1. Create another new query
2. Copy the entire content from `supabase-data-complete.sql`
3. Paste into the SQL Editor
4. Click "Run"
5. Wait for confirmation

---

## Step 2: Create Admin User for Login (5 minutes)

### 2.1 Create Your Admin Account

**Go to Authentication:**
1. Click "Authentication" in the left sidebar
2. Click "Users" tab
3. Click "Add user" → "Create new user"
4. Enter:
   - **Email:** `admin@carcrt.org` (or your preferred admin email)
   - **Password:** Create a strong password (save it securely!)
   - **Auto Confirm User:** Check this box
5. Click "Create user"

**IMPORTANT:** Save your admin credentials somewhere safe!
- Email: _________________
- Password: _________________

---

## Step 3: Set Up Storage for Images (5 minutes)

### 3.1 Create Storage Bucket

1. Click "Storage" in the left sidebar
2. Click "New bucket"
3. Fill in:
   - **Name:** `uploads`
   - **Public bucket:** Toggle ON (very important!)
4. Click "Create bucket"

### 3.2 Configure Bucket Policies

The bucket should be automatically public, but to verify:
1. Click on the `uploads` bucket
2. Click "Policies" tab
3. Ensure you see a policy allowing public access

### 3.3 Upload Placeholder Images (Optional)

If you don't have real images yet:
1. Click on the `uploads` bucket
2. Click "Upload file"
3. Upload some placeholder images
4. The URLs will be: `https://rbxrelsauoqytwifdteq.supabase.co/storage/v1/object/public/uploads/your-image.jpg`

---

## Step 4: Enable Row Level Security Policies (3 minutes)

### 4.1 Check Tables Have RLS Enabled

**For each table, ensure public read access:**

Go to: Table Editor → Select each table → Click "RLS" button

Tables to check:
- partners
- news
- events
- leadership  
- gallery
- submissions
- awards
- certificates
- testimonials
- stats
- featured_stories

**Enable Read Policy for Each:**
```sql
-- Run this for any table that needs it
CREATE POLICY "Allow public read access" ON table_name
FOR SELECT USING (true);
```

**For submissions table (write access for contact forms):**
```sql
CREATE POLICY "Allow public insert" ON submissions
FOR INSERT WITH CHECK (true);
```

---

## Step 5: Test Your Setup (2 minutes)

### 5.1 Test Admin Login

1. Open your website: `http://localhost:8080`
2. Go to: `http://localhost:8080/admin/login`
3. Enter the admin credentials you created in Step 2
4. You should see the Admin Dashboard

### 5.2 Verify Data is Loading

1. Visit your homepage
2. Check that you see:
   - Partner logos
   - News articles
   - Events
   - Statistics
3. If you see "No data" - go back and verify Step 1 was completed

---

## Step 6: Ready to Deploy! 🚀

Your website is now fully functional with:
- ✅ Supabase backend configured
- ✅ Admin authentication working
- ✅ Database tables created and populated
- ✅ Image storage ready
- ✅ All CRUD operations functional

### Next Steps for Hosting:

Choose your hosting platform:

**Option A: Vercel (Recommended - FREE)**
1. Go to https://vercel.com
2. Import your GitHub repository
3. Add environment variables:
   ```
   VITE_SUPABASE_URL=https://rbxrelsauoqytwifdteq.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJieHJlbHNhdW9xeXR3aWZkdGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMDU0OTcsImV4cCI6MjA4MDc4MTQ5N30.9qcJ2LYjIKzk2RFaMNw2ECNCjBMBkRCPah6kabW9QXY
   ```
4. Click "Deploy"

**Option B: Netlify (FREE)**
1. Go to https://netlify.com
2. Import your repository
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add the same environment variables
6. Click "Deploy"

**Option C: Render (FREE)**
1. Go to https://render.com
2. Create new "Static Site"
3. Connect repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add environment variables
7. Click "Create Static Site"

---

## 🔐 Security Notes

### What's Secure:
- ✅ Admin login uses Supabase Authentication (encrypted)
- ✅ Row Level Security policies protect data
- ✅ Anon key is safe to expose (has limited permissions)
- ✅ Real passwords never stored in code

### What to Keep Secret:
- ❌ Your admin email/password
- ❌ Supabase service role key (never use this in frontend)
- ❌ Database direct connection strings

---

## 📊 Managing Content After Deployment

### Quick Content Management:

**Method 1: Supabase Dashboard (Easy)**
1. Go to: https://supabase.com/dashboard/project/rbxrelsauoqytwifdteq
2. Click "Table Editor"
3. Select the table you want to edit
4. Click any row to edit, or click "Insert" to add new

**Method 2: SQL Editor (Advanced)**
```sql
-- Add a news article
INSERT INTO news (title, category, excerpt, content, date, image)
VALUES (
  'New Article Title',
  ARRAY['Programs'],
  'Short description...',
  'Full article content...',
  '2025-12-09',
  '/uploads/article-image.jpg'
);

-- Add an event
INSERT INTO events (title, description, date, location, time, status)
VALUES (
  'Workshop Title',
  'Event description...',
  '2025-12-15',
  'Freetown, Sierra Leone',
  '10:00 AM - 3:00 PM',
  'upcoming'
);
```

---

## 🆘 Troubleshooting

### Issue: Can't log in to admin panel
**Solution:** 
1. Go to Supabase → Authentication → Users
2. Verify user exists
3. Click "..." → Send password reset email
4. Or delete user and create again

### Issue: No data showing on website
**Solution:**
1. Check if SQL scripts ran successfully
2. Go to Table Editor and manually check if data exists
3. Check browser console for errors (F12)
4. Verify RLS policies allow public read

### Issue: Images not loading
**Solution:**
1. Verify storage bucket is PUBLIC
2. Check image paths start with `/uploads/`
3. Upload images to Supabase Storage
4. Full URL should be: `https://rbxrelsauoqytwifdteq.supabase.co/storage/v1/object/public/uploads/filename.jpg`

### Issue: Form submissions not saving
**Solution:**
1. Check submissions table has insert policy
2. Run: `CREATE POLICY "Allow public insert" ON submissions FOR INSERT WITH CHECK (true);`
3. Check browser console for errors

---

## 📝 Admin Credentials for Reference

**Supabase Project:**
- URL: https://rbxrelsauoqytwifdteq.supabase.co
- Dashboard: https://supabase.com/dashboard/project/rbxrelsauoqytwifdteq

**Admin Login:**
- URL: https://your-domain.com/admin/login
- Email: (the one you created in Step 2)
- Password: (the one you set in Step 2)

**Tables in Database:**
- partners - Partner organizations
- news - News and updates
- events - Events and programs
- leadership - Team members
- gallery - Photo gallery
- submissions - Contact/volunteer/donation forms
- awards - Achievements
- certificates - Certifications
- testimonials - User testimonials
- stats - Homepage statistics
- featured_stories - Featured content

---

## ✅ Pre-Deployment Checklist

- [ ] Supabase tables created (Step 1)
- [ ] Sample data inserted (Step 1)
- [ ] Admin user created (Step 2)
- [ ] Storage bucket created and public (Step 3)
- [ ] RLS policies configured (Step 4)
- [ ] Admin login tested locally (Step 5)
- [ ] Data visible on website (Step 5)
- [ ] Environment variables ready for hosting (Step 6)
- [ ] Hosting platform chosen (Step 6)

**Once all boxes are checked, you're ready to deploy! 🎉**

