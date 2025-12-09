# 🎯 SIMPLE 3-STEP DEPLOYMENT

## YOU ONLY NEED TO DO 3 THINGS:

---

## STEP 1️⃣: Fill Database with Content (5 minutes)

### What to do:
1. Go here: https://supabase.com/dashboard/project/rbxrelsauoqytwifdteq
2. Click "SQL Editor" (in the left menu)
3. Click "New Query" button

### First Script:
4. Open file: `supabase-additional-tables.sql` (in your Downloads folder)
5. Copy EVERYTHING in the file (Ctrl+A, then Ctrl+C)
6. Paste it into Supabase (Ctrl+V)
7. Click the green "Run" button
8. Wait for "Success" message ✅

### Second Script:
9. Click "New Query" button again
10. Open file: `supabase-data-complete.sql` (in your Downloads folder)
11. Copy EVERYTHING in the file (Ctrl+A, then Ctrl+C)
12. Paste it into Supabase (Ctrl+V)
13. Click the green "Run" button
14. Wait for "Success" message ✅

**DONE!** Database now has all your partners, news, events, photos.

---

## STEP 2️⃣: Fix Hostinger Website Settings (2 minutes)

### What to do:
1. Go here: https://hpanel.hostinger.com
2. Login to your Hostinger account
3. Click on your website "carcrt.org"
4. Click "Manage" button

### Find and Change These Two Things:

**THING 1 - Entry file:**
- Find the box labeled "Entry file"
- Delete what's there (probably says `server.js`)
- Type this instead: `server-production.js`

**THING 2 - Build command:**
- Find the box labeled "Build command"
- Type this: `npm run build`

5. Click "Save" button
6. Wait 3-4 minutes (don't close the page)

**DONE!** Website is now live at carcrt.org

---

## STEP 3️⃣: Login to Admin (30 seconds)

### What to do:
1. Go here: https://carcrt.org/admin-new
2. Type this email: `admin@carcrt.org`
3. Type this password: `CArCRT2025Admin!`
4. Click "Login"

**DONE!** You can now see your website statistics.

---

## ✅ CHECK IF IT WORKS:

After 3-4 minutes, visit: https://carcrt.org

**You should see:**
- ✅ Partner carousel on homepage (6 partners)
- ✅ Click "News" → Shows 7 articles (not "No news available")
- ✅ Click "Events" → Shows 4 events (not "No events available")
- ✅ Click "Partners" → Shows 6 organizations (not "No partners added yet")

**If you see content = IT WORKS!** 🎉

---

## 🔑 SAVE THESE CREDENTIALS:

**Website Admin:**
```
URL: https://carcrt.org/admin-new
Email: admin@carcrt.org
Password: CArCRT2025Admin!
```

**Supabase (to add content later):**
```
URL: https://supabase.com/dashboard/project/rbxrelsauoqytwifdteq
Use your Supabase account email/password
```

---

## 📝 HOW TO ADD NEW CONTENT (After deployment):

### Add a News Article:
1. Go to Supabase Dashboard
2. Click "Table Editor"
3. Click "news" table
4. Click "Insert" → "Insert row"
5. Fill in: title, category, excerpt, content, date, image
6. Click "Save"
7. Refresh carcrt.org - article appears instantly!

### Add an Event:
1. Same steps but use "events" table
2. Fill in: title, description, date_from, date_to, location
3. Click "Save"

### Add a Partner:
1. Same steps but use "partners" table
2. Fill in: name, description, logo, website
3. Click "Save"

**No coding needed!** Everything managed in Supabase.

---

## 🆘 TROUBLESHOOTING:

**Website still shows "No content available":**
- Wait 5 more minutes (sometimes deployment is slow)
- Press Ctrl+Shift+Delete and clear browser cache
- Try opening in Incognito/Private mode

**Can't find Hostinger settings:**
- Look for "Advanced" section
- Look for "Node.js settings"
- The settings are under "Framework: Express"

**Admin won't login:**
- Make sure URL is `/admin-new` (not `/admin`)
- Copy-paste the email and password exactly
- Try Incognito/Private mode

**Need help?**
- All files are in: `c:\Users\pc\Downloads\carcrt-main\carcrt-main`
- Check `COMPLETE-DEPLOYMENT-GUIDE.md` for detailed instructions
- Check Supabase "Table Editor" to verify data exists

---

## 🎉 THAT'S ALL!

Just 3 simple steps:
1. ✅ Run 2 SQL scripts (adds content)
2. ✅ Change 2 Hostinger settings (makes site live)
3. ✅ Login to admin (manage site)

**Total time: ~10 minutes**

Your website will be fully working! 🚀
