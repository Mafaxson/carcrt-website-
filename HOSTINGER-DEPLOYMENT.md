# HOSTINGER DEPLOYMENT INSTRUCTIONS

## 🚨 IMPORTANT: Update Your Hostinger Settings

Your site is not showing because Hostinger is configured for the old Express server. Update these settings:

---

## **STEP 1: Update Hostinger Build Configuration**

Go to your Hostinger dashboard → Settings → Build Configuration and change:

### **OPTION A: Static Site (Recommended)**
```
Framework preset: Static Site
Branch: main
Node version: 22.x
Root directory: ./

Build command: npm run build
Publish directory: dist
Install command: npm install

Entry file: LEAVE EMPTY
```

### **OPTION B: Node.js with Express Wrapper**
```
Framework preset: Express (or Node.js)
Branch: main  
Node version: 22.x
Root directory: ./

Entry file: server-production.js
Install command: npm install
Build command: npm run build
Start command: npm start
```

---

## **STEP 2: Click "Save and Redeploy"**

After updating the settings, click the **"Save and Redeploy"** button in Hostinger.

---

## **STEP 3: Wait for Deployment** (2-3 minutes)

Hostinger will:
1. Pull latest code from GitHub
2. Run `npm install`
3. Run `npm run build` (creates `dist` folder)
4. Either serve `dist` as static files OR run `server-production.js`

---

## **STEP 4: Verify Deployment**

Visit https://carcrt.org and check:
- ✅ Homepage loads with partner carousel
- ✅ News page shows 7 articles
- ✅ Events page shows 4 events
- ✅ Leadership page shows 9 team members
- ✅ Resources page loads
- ✅ Contact form works

---

## **Why This Change Was Needed**

### **Before:**
- Hostinger tried to run `server.js` (old 2086-line Express backend)
- Server looked for local JSON files that don't exist in production
- All API calls to `localhost:3001` failed
- Result: Blank website

### **After:**
- Hostinger builds React app with Vite
- Serves static HTML/JS/CSS from `dist` folder
- All data comes from Supabase cloud database
- Result: Fully functional website

---

## **Troubleshooting**

### **If site is still blank:**

1. **Check build logs in Hostinger:**
   - Look for "Build successful" message
   - Check for any errors during `npm run build`

2. **Verify dist folder exists:**
   - After build, Hostinger should show `dist` folder with `index.html`

3. **Check browser console:**
   - Open https://carcrt.org
   - Press F12 → Console tab
   - Look for any JavaScript errors

4. **Verify Supabase connection:**
   - Check that `src/config/supabase.ts` has correct URL and API key
   - Test by visiting https://carcrt.org/news (should show articles)

### **If you see "Cannot GET /" error:**
- Entry file is set to wrong value
- Should be: `server-production.js` OR leave empty for static

### **If you see 404 errors:**
- Publish directory might be wrong
- Should be: `dist`

---

## **Files Modified in This Commit:**

1. ✅ `server-production.js` - New minimal production server
2. ✅ `package.json` - Updated `start` script to use new server
3. ✅ `HOSTINGER-DEPLOYMENT.md` - This file

---

## **Quick Reference**

### **Static Site Deployment (Simplest):**
```bash
Build command: npm run build
Publish directory: dist
Entry file: (leave empty)
```

### **Node.js Deployment (With Express wrapper):**
```bash
Entry file: server-production.js
Build command: npm run build
Start command: npm start
```

---

## **Next Steps After Deployment Works:**

1. Run `supabase-additional-tables.sql` in Supabase Dashboard
2. Populate awards, certificates, testimonials data
3. Migrate images to Supabase Storage
4. Test all forms (contact, donate, volunteer)

---

**Need help?** Check RESTORATION-REPORT.md for complete technical documentation.
