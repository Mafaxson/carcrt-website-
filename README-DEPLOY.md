# CArCRT Website - Ready to Deploy! 🚀

## ⚡ Quick Start (5 Minutes to Launch)

This website is **fully configured** and ready to deploy. Just follow these 3 simple steps:

### Step 1: Set Up Database (Required - 10 minutes)
👉 **[OPEN COMPLETE-SETUP-GUIDE.md](./COMPLETE-SETUP-GUIDE.md)** for detailed instructions

Quick summary:
1. Go to Supabase Dashboard
2. Run the SQL scripts to create tables
3. Create an admin user
4. Set up image storage

### Step 2: Test Locally (Optional)
```bash
npm install
npm run dev
```
Open http://localhost:8080 and test admin login at `/admin/login`

### Step 3: Deploy to Hosting
Choose ONE of these FREE options:

**Vercel (Easiest):**
```bash
npm install -g vercel
vercel
```

**Netlify:**
- Connect GitHub repo at https://netlify.com
- Build: `npm run build`
- Publish: `dist`

**Render:**
- Create Static Site at https://render.com
- Build: `npm run build`
- Publish: `dist`

Don't forget to add environment variables (see setup guide)!

---

## 📋 What's Included

✅ **Complete Frontend** - React + TypeScript + Tailwind CSS  
✅ **Admin Dashboard** - Full content management system  
✅ **Authentication** - Secure Supabase Auth  
✅ **Database Ready** - All tables and sample data provided  
✅ **Image Storage** - Supabase Storage configured  
✅ **Responsive Design** - Works on all devices  
✅ **SEO Optimized** - Meta tags and sitemap ready  

---

## 🎯 Features

### Public Website
- Homepage with featured stories and statistics
- News & Updates section
- Events calendar
- Programs showcase
- Partners & Sponsors
- Leadership team profiles
- Contact forms
- Donation forms
- Volunteer registration

### Admin Panel (Secured)
- Content management for all sections
- View form submissions
- Manage partners and sponsors
- Add/edit news and events
- Update team information
- Real-time statistics dashboard

---

## 🔐 Admin Access

**Login URL:** `your-domain.com/admin/login`

**Create Admin User:** See COMPLETE-SETUP-GUIDE.md Step 2

Default credentials are created during setup.

---

## 📁 Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route pages
│   ├── lib/            # Utilities and Supabase client
│   ├── config/         # Configuration files
│   └── hooks/          # Custom React hooks
├── public/             # Static assets
├── supabase-*.sql     # Database setup scripts
└── COMPLETE-SETUP-GUIDE.md  # Detailed setup instructions
```

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn/ui components
- **Backend:** Supabase (Database + Auth + Storage)
- **Forms:** React Hook Form with Zod validation
- **State:** TanStack Query
- **Routing:** React Router v6

---

## 📝 Content Management

### Option 1: Supabase Dashboard (Easy)
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click "Table Editor"
4. Edit any table directly

### Option 2: Admin Panel (In Development)
The admin panel at `/admin` provides a user-friendly interface for content management.

---

## 🚀 Deployment Checklist

Before deploying, make sure you've completed:

- [ ] Run Supabase SQL scripts (COMPLETE-SETUP-GUIDE.md)
- [ ] Created admin user in Supabase Auth
- [ ] Set up storage bucket for images
- [ ] Tested admin login locally
- [ ] Added environment variables to hosting platform
- [ ] Updated any hardcoded URLs (if necessary)

---

## 🆘 Need Help?

### Common Issues

**❓ Admin login doesn't work**
- Make sure you created the user in Supabase Authentication
- Check that `.env` file has correct Supabase credentials

**❓ No data showing on website**
- Verify SQL scripts ran successfully in Supabase
- Check browser console for errors (F12)

**❓ Images not loading**
- Ensure storage bucket is set to PUBLIC
- Upload images to Supabase Storage
- Check image paths start with `/uploads/`

**❓ Forms not submitting**
- Check RLS policies on submissions table
- Verify browser console for errors

### Documentation Files
- `COMPLETE-SETUP-GUIDE.md` - Full setup instructions
- `SUPABASE_SETUP_GUIDE.md` - Database configuration
- `VERIFY_SETUP.sql` - Database verification script

---

## 📧 Support

For issues or questions:
1. Check the setup guides first
2. Review browser console errors (F12)
3. Check Supabase dashboard logs
4. Contact CArCRT technical team

---

## 📜 License

Copyright © 2025 CArCRT (Community Alliance for Rehabilitation and Conflict Resolution Transformation)

---

## 🎉 You're All Set!

Your CArCRT website is production-ready. Follow the COMPLETE-SETUP-GUIDE.md to set up your database, then deploy to your chosen platform.

**Estimated total setup time: 15-20 minutes**

Good luck with your launch! 🚀
