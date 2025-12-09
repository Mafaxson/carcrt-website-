# Quick Start - Hosting on Render.com

## Option 1: Simple Deployment (Recommended for Beginners)

### Step 1: Create GitHub Repository
1. Go to https://github.com and create a new repository called `carcrt-website`
2. Don't add README, .gitignore, or license (you already have these)

### Step 2: Push Your Code to GitHub
Open PowerShell in your project folder and run:

```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/carcrt-website.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 3: Deploy Backend on Render

1. Go to https://render.com and sign up (use your GitHub account)
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect GitHub"** and select your `carcrt-website` repository
4. Fill in:
   - **Name:** `carcrt-backend`
   - **Root Directory:** Leave empty
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free
5. Click **"Advanced"** and add:
   - **Add Disk:**
     - Name: `uploads`
     - Mount Path: `/opt/render/project/src/uploads`
     - Size: 1 GB
6. Click **"Create Web Service"**
7. Wait for deployment (takes 2-5 minutes)
8. **COPY YOUR BACKEND URL** - it will look like: `https://carcrt-backend-XXXX.onrender.com`

### Step 4: Update Your Frontend Code

You need to replace all `http://localhost:3001` with your new backend URL.

I can help you do this automatically. Just tell me your backend URL from Step 3.

### Step 5: Deploy Frontend on Render

1. In Render, click **"New +"** → **"Static Site"**
2. Select your `carcrt-website` repository
3. Fill in:
   - **Name:** `carcrt-website`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. Click **"Create Static Site"**
5. Wait for deployment (takes 2-5 minutes)

### Step 6: Done! 🎉

Your site is live at: `https://carcrt-website.onrender.com`
Admin panel: `https://carcrt-website.onrender.com/admin`

---

## Option 2: One-Click Deploy

1. Create a Render account
2. Click this button: [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)
3. Connect your GitHub repository
4. Follow the prompts

---

## Need Help?

Just tell me when you've completed Step 3 and give me your backend URL. I'll automatically update all the code for you!
