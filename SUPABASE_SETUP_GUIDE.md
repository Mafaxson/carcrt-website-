# Supabase Image Storage Setup Guide

## ✅ Current Status
- ✅ Database has all data (6 partners, 9 leadership, 7 news, 4 events, 8 gallery photos)
- ✅ Code updated to use Supabase Storage URLs
- ❌ Images not yet uploaded to Supabase Storage

## 🚀 Quick Fix - Upload Images to Supabase Storage

### Step 1: Create Storage Bucket (2 minutes)

1. Go to: https://supabase.com/dashboard/project/rbxrelsauoqytwifdteq/storage/buckets
2. Click "**New bucket**"
3. Name: `uploads`
4. **IMPORTANT**: Make it **PUBLIC** (toggle ON "Public bucket")
5. Click "**Create bucket**"

### Step 2: Upload Images (5 minutes)

1. Click on the `uploads` bucket you just created
2. Click "**Upload files**" button
3. Upload ALL these images from your computer:

**Leadership Photos** (9 images):
- CEO photo
- Director photos (3)
- Program Coordinator photos (2)  
- Youth Coordinator photo
- Finance Coordinator photo
- Intern photos (2)

**Partner Logos** (6 images):
- Sierra Leone Red Cross logo
- Cross of Christ logo
- Widows Empowerment logo
- Helping Hands logo
- Trading Organic logo
- AfrikSpark logo

**News Images** (7 images):
- Drug campaign photo
- School sponsorship photo
- Partnership announcement photo
- Training session photo
- Summit photo
- Mobile app screenshot
- Impact report cover

**Event Images** (4 images):
- 16 Days Activism photo
- Workshop photo
- Film crew photo
- Support group photo

**Gallery Photos** (8 images):
- Pepper farming photo
- Layout photo
- Ploughing photo
- Potato farming photo
- Skills training photo
- Meeting photo
- School photo
- Health outreach photo

### Step 3: Get Image URLs (3 minutes)

After uploading, each image will have a URL like:
```
https://rbxrelsauoqytwifdteq.supabase.co/storage/v1/object/public/uploads/filename.jpg
```

### Step 4: Update Database Image Paths (5 minutes)

Go to: https://supabase.com/dashboard/project/rbxrelsauoqytwifdteq/editor

Run this SQL to update the paths (replace `filename.jpg` with your actual filenames):

```sql
-- Update Leadership Photos
UPDATE leadership SET photo = '/uploads/ceo-photo.jpg' WHERE position = 'Chief Executive Officer';
UPDATE leadership SET photo = '/uploads/director1.jpg' WHERE position LIKE '%Director%' AND name = 'FirstDirectorName';
-- Continue for all 9 leadership members...

-- Update Partner Logos  
UPDATE partners SET logo = '/uploads/slrcs-logo.jpg' WHERE name = 'Sierra Leone Red Cross Society';
UPDATE partners SET logo = '/uploads/cross-of-christ-logo.jpg' WHERE name = 'Cross of Christ';
-- Continue for all 6 partners...

-- Update News Images
UPDATE news SET image = '/uploads/drug-campaign.jpg' WHERE title LIKE '%Drug%';
-- Continue for all 7 news items...

-- Update Event Images
UPDATE events SET image = '/uploads/16-days-activism.jpg' WHERE title LIKE '%16 Days%';
-- Continue for all 4 events...
```

## 🎯 Alternative: Use Placeholder Images (TEMPORARY FIX - 1 minute)

If you don't have the original images right now, I can update the code to use placeholder images temporarily:

```sql
-- Use placeholder images until real ones are uploaded
UPDATE leadership SET photo = 'https://ui-avatars.com/api/?name=' || REPLACE(name, ' ', '+') || '&size=200';
UPDATE partners SET logo = 'https://ui-avatars.com/api/?name=' || REPLACE(name, ' ', '+') || '&size=200';
UPDATE news SET image = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800';
UPDATE events SET image = 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800';
```

Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/rbxrelsauoqytwifdteq/sql/new

## ✅ Verification

After uploading images:

1. Visit your Vercel site
2. Check:
   - ✅ Partners page shows 6 partners with logos
   - ✅ Leadership page shows 9 people with photos
   - ✅ News page shows 7 articles with images
   - ✅ Events page shows 4 events with photos
   - ✅ Home page carousel shows partner logos

## 📞 Need Help?

If you don't have the original images, let me know and I'll:
1. Set up placeholder images (professional UI avatars)
2. Or provide exact SQL to match generic stock photos to each entry

Choose whichever is easier for you!
