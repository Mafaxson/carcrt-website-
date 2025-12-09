# 🎯 Quick Command Reference

## Development Commands

```bash
# Start development server
npm run dev
# Opens at: http://localhost:8080

# Check if ready to deploy
npm run check

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Common Tasks

### Test the website locally
```bash
npm run dev
# Visit: http://localhost:8080
```

### Test admin login
```bash
# Make sure dev server is running, then visit:
# http://localhost:8080/admin/login
```

### Check deployment readiness
```bash
npm run check
```

### Build for production
```bash
npm run build
# Output: dist/ folder
```

## Deployment Commands

### Deploy to Vercel
```bash
# Option 1: Using Vercel CLI
npm install -g vercel
vercel

# Option 2: Using Git
git add .
git commit -m "Ready to deploy"
git push origin main
# Then import on vercel.com
```

### Deploy to Netlify
```bash
# Option 1: Using Netlify CLI
npm install -g netlify-cli
netlify deploy --prod

# Option 2: Using Git
git add .
git commit -m "Ready to deploy"
git push origin main
# Then import on netlify.com
```

## Supabase Management

### Access your Supabase project
```
Dashboard: https://supabase.com/dashboard/project/rbxrelsauoqytwifdteq
```

### Quick database operations
```sql
-- View all partners
SELECT * FROM partners;

-- View all news
SELECT * FROM news ORDER BY date DESC;

-- View all events
SELECT * FROM events ORDER BY date DESC;

-- View form submissions
SELECT * FROM submissions ORDER BY created_at DESC;

-- View stats
SELECT * FROM stats;
```

## File Locations

```
Important configuration:
├── .env                          # Environment variables
├── src/config/supabase.ts        # Supabase config
├── src/lib/supabaseClient.ts     # Supabase client
├── src/components/ProtectedRoute.tsx  # Route protection
├── src/pages/AdminLogin.tsx      # Login page
└── src/pages/AdminDashboardNew.tsx    # Admin dashboard

Database setup:
├── supabase-additional-tables.sql     # Table schemas
├── supabase-data-complete.sql         # Sample data
└── VERIFY_SETUP.sql                   # Verification script

Documentation:
├── START-HERE.md                 # Start here!
├── WHAT-I-DID-FOR-YOU.md        # What's been done
├── COMPLETE-SETUP-GUIDE.md      # Detailed setup
├── README-DEPLOY.md             # Deployment guide
└── CHECKLIST.txt                # Visual checklist
```

## Environment Variables

### Local Development (.env file)
```bash
VITE_SUPABASE_URL=https://rbxrelsauoqytwifdteq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJieHJlbHNhdW9xeXR3aWZkdGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMDU0OTcsImV4cCI6MjA4MDc4MTQ5N30.9qcJ2LYjIKzk2RFaMNw2ECNCjBMBkRCPah6kabW9QXY
```

### Production Deployment
Add the same variables to your hosting platform's environment settings.

## Troubleshooting Commands

### Check for build errors
```bash
npm run build
```

### Clear node modules and reinstall
```bash
rm -rf node_modules
npm install
```

### Check for package updates
```bash
npm outdated
```

### View package version
```bash
npm list @supabase/supabase-js
npm list react
npm list vite
```

## Git Commands (if using version control)

```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub
git push origin main

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main
```

## Testing URLs

### Local Development
```
Homepage:        http://localhost:8080
Admin Login:     http://localhost:8080/admin/login
Admin Dashboard: http://localhost:8080/admin-new
News:            http://localhost:8080/news
Events:          http://localhost:8080/events
Contact:         http://localhost:8080/contact
```

### Production (after deployment)
```
Replace with your actual domain:
Homepage:        https://your-domain.com
Admin Login:     https://your-domain.com/admin/login
Admin Dashboard: https://your-domain.com/admin-new
```

## Quick Fixes

### Website not loading?
```bash
# Stop the server (Ctrl+C)
# Clear cache and restart
npm run dev
```

### Admin can't log in?
```
1. Check Supabase → Authentication → Users
2. Verify user exists
3. Try password reset in Supabase
```

### No data showing?
```
1. Go to Supabase → SQL Editor
2. Run: SELECT * FROM news;
3. If empty, run supabase-data-complete.sql
```

### Images not loading?
```
1. Go to Supabase → Storage
2. Check "uploads" bucket exists
3. Verify bucket is PUBLIC
4. Upload test image
```

## Useful Supabase Queries

```sql
-- Count all records
SELECT 
  'partners' as table, COUNT(*) FROM partners
UNION ALL
SELECT 'news', COUNT(*) FROM news
UNION ALL
SELECT 'events', COUNT(*) FROM events
UNION ALL
SELECT 'leadership', COUNT(*) FROM leadership;

-- Recent submissions
SELECT type, created_at, data 
FROM submissions 
ORDER BY created_at DESC 
LIMIT 10;

-- Update a news article
UPDATE news 
SET title = 'New Title', content = 'New content...'
WHERE id = 'article-id-here';

-- Delete old submissions
DELETE FROM submissions 
WHERE created_at < NOW() - INTERVAL '30 days';
```

## Performance Check

```bash
# Check bundle size
npm run build
# Look at dist/ folder size

# Analyze bundle
npm install -g source-map-explorer
npm run build
source-map-explorer dist/assets/*.js
```

## Security Check

```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Check outdated packages
npm outdated
```

---

## 🆘 Need Help?

1. **Read the guides:**
   - START-HERE.md
   - COMPLETE-SETUP-GUIDE.md

2. **Check the browser console:**
   - Press F12
   - Look for red errors

3. **Verify Supabase setup:**
   - Run VERIFY_SETUP.sql

4. **Run deployment check:**
   ```bash
   npm run check
   ```

---

**Quick Support Checklist:**
- [ ] Checked browser console (F12)
- [ ] Ran `npm run check`
- [ ] Verified Supabase connection
- [ ] Checked environment variables
- [ ] Read error messages carefully
- [ ] Consulted documentation

---

Made with ❤️ for CArCRT
