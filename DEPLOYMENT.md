# CArCRT Website - Full Stack Application

## Overview
CArCRT (Community Advocacy for Resilient Community Transformation) website with full admin dashboard for content management.

## Features
- ✅ Complete admin dashboard with authentication
- ✅ Dynamic content management (Home, About, Programs, Stories, News, Events, Contact)
- ✅ Leadership team, coordinators, and internship management
- ✅ Image upload support for all content types
- ✅ Real-time updates when admin makes changes
- ✅ Story submission with admin approval workflow
- ✅ Email notifications for form submissions (console logs)
- ✅ Responsive design with Tailwind CSS

## Tech Stack
**Frontend:**
- React 18.3.1
- TypeScript
- Vite 5.4.19
- Tailwind CSS
- shadcn/ui components
- React Router

**Backend:**
- Node.js
- Express.js 4.18.2
- Multer (file uploads)
- JSON file-based database

## Local Development

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Navigate to project directory
cd carcrt-main

# Install dependencies
npm install

# Start backend server (Terminal 1)
node server.js

# Start frontend dev server (Terminal 2)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:8080
- Backend API: http://localhost:3001
- Admin Dashboard: http://localhost:8080/admin

### Admin Access
- Password: `carcrt_admin_2025`

## Admin Dashboard Features

### Stats Tab
- Edit Community Members Reached
- Edit Projects Implemented
- Edit Districts Engaged

### Partners Tab
- Add/Delete partners and sponsors
- Upload logos

### Featured Tab
- Manage featured impact stories

### Voice Tab
- Manage testimonials

### Stories Tab
- Approve/Delete user-submitted stories
- View all submissions

### News Tab
- Add news articles with categories
- Upload images
- Set publication dates

### Events Tab
- Manage events with status (upcoming/ongoing/past/closed)
- Upload event images
- Auto-status management

### Leadership Tab
- Add/Edit/Delete leadership team members
- Upload photos
- Edit bios and roles

### Coordinators Tab
- Manage field coordinators
- Regional assignments

### Interns Tab
- Manage internship program participants
- Department/field assignments

### Pages Tab
- Edit Home page hero text
- Edit About page content
- Edit Contact information

## Deployment to Production

### Option 1: Vercel + MongoDB Atlas (Recommended)

#### Frontend Deployment (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
vercel

# Set environment variables in Vercel dashboard
VITE_API_URL=https://your-backend-url.com
```

#### Backend Deployment
**You'll need to:**
1. Convert JSON database to MongoDB or PostgreSQL
2. Deploy backend to:
   - Railway.app
   - Render.com
   - Heroku
   - DigitalOcean App Platform

### Option 2: Traditional Hosting (cPanel/Shared Hosting)

#### Backend Setup
1. Upload entire project to server
2. Install Node.js on your hosting (if supported)
3. Run: `npm install --production`
4. Start server: `node server.js` or use PM2
5. Configure reverse proxy (Apache/Nginx)

#### Frontend Build
```bash
npm run build
# Upload dist/ folder to public_html
```

### Option 3: VPS (Digital Ocean, AWS EC2, Linode)

```bash
# SSH into your server
ssh root@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
npm install -g pm2

# Upload project files
# Navigate to project directory

# Install dependencies
npm install --production

# Start backend with PM2
pm2 start server.js --name carcrt-backend

# Build frontend
npm run build

# Serve with Nginx
sudo apt-get install nginx
# Configure Nginx to serve dist/ folder and proxy /api to backend
```

### Environment Variables for Production

Create `.env` file:
```env
PORT=3001
ADMIN_PASSWORD=your_secure_password_here
NODE_ENV=production
```

Update `server.js` to use environment variables:
```javascript
const PORT = process.env.PORT || 3001;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "carcrt_admin_2025";
```

### Database Migration (For Production)

Convert JSON files to proper database:

**MongoDB Example:**
```javascript
// Install: npm install mongodb mongoose

const mongoose = require('mongoose');

// Replace JSON read/write with MongoDB operations
const StorySchema = new mongoose.Schema({
  name: String,
  email: String,
  story: String,
  category: String,
  imageUrl: String,
  approved: Boolean,
  timestamp: Date
});

const Story = mongoose.model('Story', StorySchema);
```

### Email Configuration (Production)

Install nodemailer:
```bash
npm install nodemailer
```

Add to `server.js`:
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// In story submission endpoint
transporter.sendMail({
  from: 'noreply@carcrt.org',
  to: 'admin@carcrt.org',
  subject: 'New Story Submission',
  html: `<p>New story from ${name}</p>`
});
```

### SSL Certificate (HTTPS)

For production, enable HTTPS:
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## File Structure
```
carcrt-main/
├── public/
│   ├── uploads/          # Uploaded images
│   └── favicon.png
├── src/
│   ├── components/
│   │   ├── AdminDashboard.tsx
│   │   ├── ShareStoryForm.tsx
│   │   └── layout/
│   └── pages/
│       ├── Index.tsx
│       ├── Admin.tsx
│       ├── Leadership.tsx
│       └── ...
├── data/                 # JSON database files
│   ├── stories.json
│   ├── stats.json
│   ├── partners.json
│   ├── events.json
│   ├── news.json
│   └── ...
├── server.js            # Express backend
└── package.json
```

## API Endpoints

### Public Endpoints
- GET `/api/stats` - Homepage statistics
- GET `/api/partners` - Partners & sponsors
- GET `/api/featured-stories` - Featured stories
- GET `/api/testimonials` - Testimonials
- GET `/api/stories` - Approved stories
- GET `/api/news` - News articles
- GET `/api/events` - Events
- GET `/api/leadership` - Leadership team
- GET `/api/coordinators` - Field coordinators
- GET `/api/representatives` - Interns
- POST `/api/stories` - Submit story

### Admin Endpoints (Password Protected)
- PUT `/api/admin/stats` - Update stats
- POST/DELETE `/api/admin/partners/:id` - Manage partners
- POST/PUT/DELETE `/api/admin/leadership/:id` - Manage leadership
- POST/PUT/DELETE `/api/admin/coordinators/:id` - Manage coordinators
- POST/PUT/DELETE `/api/admin/representatives/:id` - Manage interns
- POST/DELETE `/api/admin/news/:id` - Manage news
- POST/PUT/DELETE `/api/admin/events/:id` - Manage events
- PUT `/api/admin/stories/:id/approve` - Approve stories
- DELETE `/api/admin/stories/:id` - Delete stories

## Security Notes

**Before deploying to production:**
1. Change admin password in server.js
2. Add rate limiting (express-rate-limit)
3. Add input validation (express-validator)
4. Enable CORS only for your domain
5. Use environment variables for sensitive data
6. Implement proper authentication (JWT tokens)
7. Add HTTPS
8. Sanitize user inputs
9. Add file upload size limits
10. Use proper database instead of JSON files

## Support
For issues or questions, contact: info@carcrt.org

## License
© 2025 CArCRT. All rights reserved.
