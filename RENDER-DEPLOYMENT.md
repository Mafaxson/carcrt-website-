# Deploy to Render - Step by Step Guide

## Step 1: Prepare Your Code

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/carcrt.git
   git push -u origin main
   ```

## Step 2: Deploy Backend to Render

1. Go to https://render.com and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `carcrt-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** Free
5. Add Environment Variable:
   - Key: `PORT`
   - Value: `3001`
6. Add Disk Storage:
   - **Mount Path:** `/opt/render/project/src/uploads`
   - **Size:** 1 GB
7. Click **"Create Web Service"**
8. **IMPORTANT:** Copy your backend URL (e.g., `https://carcrt-backend.onrender.com`)

## Step 3: Update Frontend Configuration

1. Create `.env.production` file:
   ```
   VITE_API_URL=https://carcrt-backend.onrender.com
   ```
   Replace with your actual backend URL from Step 2

2. Commit and push:
   ```bash
   git add .env.production
   git commit -m "Add production config"
   git push
   ```

## Step 4: Deploy Frontend to Render

1. In Render, click **"New +"** → **"Static Site"**
2. Connect same GitHub repository
3. Configure:
   - **Name:** `carcrt-frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. Click **"Create Static Site"**

## Step 5: Update CORS on Backend

Add this to your `server.js` after line 8:

```javascript
const cors = require('cors');
app.use(cors({
  origin: ['https://YOUR-FRONTEND.onrender.com', 'http://localhost:8080'],
  credentials: true
}));
```

Replace `YOUR-FRONTEND` with your actual frontend URL.

## Important Notes

- Free tier services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- Uploaded files are stored in persistent disk (backend only)
- Database is JSON files in `/data` folder

## Your Live URLs

After deployment:
- **Website:** https://carcrt-frontend.onrender.com
- **Admin:** https://carcrt-frontend.onrender.com/admin
- **Backend API:** https://carcrt-backend.onrender.com

## Alternative: Quick Deploy (One Command)

If you have the Render CLI installed:

```bash
render deploy
```

This uses the `render.yaml` configuration file.
