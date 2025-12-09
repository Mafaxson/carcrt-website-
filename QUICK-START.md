# Quick Start Guide - CArCRT Website

## 🚀 How to Run Your Website Locally

### Every Time You Want to Start the Website:

**Step 1: Open TWO PowerShell terminals**

**Terminal 1 - Backend Server:**
```powershell
cd "c:\Users\pc\Downloads\carcrt-main\carcrt-main"
node server.js
```
Wait until you see: `Server running on http://localhost:3001`

**Terminal 2 - Frontend Server:**
```powershell
cd "c:\Users\pc\Downloads\carcrt-main\carcrt-main"
npm run dev
```
Wait until you see: `Local: http://localhost:8080/`

**Step 3: Open your browser**
- Website: http://localhost:8080
- Admin Dashboard: http://localhost:8080/admin

---

## 🔐 Admin Dashboard Access

**URL:** http://localhost:8080/admin  
**Password:** `carcrt_admin_2025`

### What You Can Do in Admin Dashboard:

#### 1️⃣ Stats Tab
- Change "Community Members Reached" (currently 5,000+)
- Change "Projects Implemented" (currently 15)
- Change "Districts Engaged" (currently 1+)
- Click "Update Stats" to save

#### 2️⃣ Partners Tab
- Add new partners or sponsors
- Upload their logos
- Add website links
- Delete partners you don't need

#### 3️⃣ Featured Tab
- Add featured impact stories
- Select category (Health, Education, Sustainability)
- Add quotes from beneficiaries

#### 4️⃣ Voice Tab
- Add testimonials from community members
- Simple quote + author name

#### 5️⃣ Stories Tab
- See all stories people submit on your website
- Approve good stories to show them publicly
- Delete spam or inappropriate stories

#### 6️⃣ News Tab
- Add news articles about your organization
- Upload images for each article
- Choose category (General, Programs, Events, Announcements)
- Set publication date

#### 7️⃣ Events Tab
- Add upcoming events
- Upload event photos
- Set status: Upcoming, Ongoing, Past, or Closed
- Events automatically update status based on date

#### 8️⃣ Leadership Tab
- Add your leadership team members (like CEO Saffa Andrew Koroma)
- Upload their photos
- Write their bios and roles
- Edit or delete leaders

#### 9️⃣ Coordinators Tab
- Add field coordinators
- Assign them to regions
- Upload photos and bios

🔟 Interns Tab
- Add internship program participants
- Show departments/fields they work in
- Upload photos

1️⃣1️⃣ Pages Tab
- Edit homepage hero text
- Update About page content
- Edit Contact information

---

## ✅ What's Already Set Up For You

✔️ Homepage with updated stats (5,000+, 15, 1+)  
✔️ Child Sponsorship Program added to focus areas  
✔️ Leadership page with CEO Saffa Andrew Koroma  
✔️ Internship application link ("Apply for Internship" button)  
✔️ Field Coordinators section removed (as you requested)  
✔️ Story submission form where people can share their stories  
✔️ All mock/fake data removed from news and events  
✔️ Admin dashboard with full control over everything  

---

## 📝 How to Update Content

### To Change Homepage Stats:
1. Go to http://localhost:8080/admin
2. Enter password: `carcrt_admin_2025`
3. Click "Stats" tab
4. Type new numbers in the boxes
5. Click "Update Stats"
6. Refresh your homepage to see changes

### To Add a News Article:
1. Admin Dashboard → "News" tab
2. Fill in title, category, excerpt, content, date
3. Click "Choose File" to upload an image
4. Click "Add News"

### To Add a Leadership Member:
1. Admin Dashboard → "Leadership" tab
2. Fill in name, role, and bio
3. Upload their photo
4. Click "Add Leader"

### To Edit a Leadership Member's Photo:
1. Admin Dashboard → "Leadership" tab
2. Find the person in the list
3. Click "Edit"
4. Choose new photo file
5. Update any other information
6. Click "Update"

---

## ⚠️ Important Notes

### Changes Don't Show Immediately?
- After making changes in admin, **refresh your browser** on the public website
- Stats update automatically
- For other content, you may need to refresh the page

### Submitted Stories Need Approval:
- When someone submits a story on your website, it goes to the "Stories" tab in admin
- You must click "Approve" for it to show publicly
- This prevents spam and inappropriate content

### Photos:
- All uploaded photos are saved in: `public/uploads/` folder
- Supported formats: JPG, PNG, GIF
- Keep photos under 5MB for best performance

---

## 🔧 Troubleshooting

### Website Won't Load?
1. Make sure BOTH terminals are running (backend AND frontend)
2. Check that you see "Server running on http://localhost:3001" in Terminal 1
3. Check that you see "Local: http://localhost:8080/" in Terminal 2

### "Cannot connect to server" Error?
- The backend server (Terminal 1) is not running
- Start it with: `cd "c:\Users\pc\Downloads\carcrt-main\carcrt-main" ; node server.js`

### Admin Login Not Working?
- Password is: `carcrt_admin_2025` (exactly, no spaces)
- Make sure backend server is running
- Clear your browser cache and try again

### Photo Upload Not Working?
- Check file size (should be under 10MB)
- Use only image files (JPG, PNG, GIF)
- Make sure backend server is running

### Port Already in Use?
If you see "Port 3001 already in use" or "Port 8080 already in use":
```powershell
Get-Process node | Stop-Process -Force
```
Then restart both servers.

---

## 📧 Email Notifications (Coming Soon)

Currently, when someone submits a story, the information is saved but you won't get an email yet.

**To enable emails, you'll need:**
1. A Gmail account (or other email service)
2. An "App Password" from Google
3. Update the code to send actual emails (see PRODUCTION-CHECKLIST.md)

For now, you can check the "Stories" tab in admin dashboard to see new submissions.

---

## 🌐 Next Steps: Hosting Your Website Online

Your website currently only works on your computer. To make it available to everyone:

### Recommended Path:
1. **Frontend Hosting:** Vercel (FREE) - https://vercel.com
2. **Backend Hosting:** Railway (FREE tier available) - https://railway.app
3. **Domain:** Get a .com or .org domain (around $10-15/year)

### What You'll Need:
- Create accounts on Vercel and Railway
- Upload your code to GitHub (we can help with this)
- Connect your GitHub to Vercel/Railway
- Add your domain

**Full instructions are in DEPLOYMENT.md file**

---

## 📞 Getting Help

**Files to Check:**
- `DEPLOYMENT.md` - Full deployment guide with step-by-step instructions
- `PRODUCTION-CHECKLIST.md` - Everything needed before going live
- `README.md` - Technical documentation

**Common Tasks:**
- Want to add more content? → Use Admin Dashboard
- Want to change the design? → We can help modify the code
- Want to host online? → Follow DEPLOYMENT.md
- Something broken? → Check Troubleshooting section above

---

## 🎯 Summary

**Your website is ready to use locally!**

✅ Both servers running  
✅ Admin dashboard working  
✅ Real stats showing (5,000+, 15, 1+)  
✅ CEO added to leadership  
✅ Child Sponsorship Program visible  
✅ No fake/mock data  
✅ Ready for content population  

**What to do now:**
1. Keep both terminals running
2. Open http://localhost:8080/admin
3. Start adding your real content (news, events, partners, photos)
4. Test everything works
5. When ready, follow DEPLOYMENT.md to host online

**Remember:** Don't close the two PowerShell terminals while you want the website to be accessible!

---

**Need to stop the website?**
Just close both PowerShell terminals, or press `Ctrl+C` in each terminal.

**Need to start again later?**
Just run the two commands again (Terminal 1: `node server.js`, Terminal 2: `npm run dev`)

---

Good luck with your website! 🎉
