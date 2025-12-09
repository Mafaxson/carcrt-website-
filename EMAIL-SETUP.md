# Email Notification Setup Guide

## 📧 How to Get Email Notifications for Submissions

Currently, when someone submits a story on your website, it saves to the database but you don't get an email. This guide will help you set up email notifications.

---

## Option 1: Gmail (Easiest - Recommended)

### Step 1: Get a Gmail App Password

1. Go to your Google Account: https://myaccount.google.com
2. Click "Security" on the left
3. Under "How you sign in to Google", click "2-Step Verification"
   - If not enabled, enable it first
4. Scroll down to "App passwords"
5. Click "App passwords"
6. Select "Mail" and "Other (Custom name)"
7. Type "CArCRT Website"
8. Click "Generate"
9. **SAVE THIS PASSWORD** - you'll need it (looks like: "abcd efgh ijkl mnop")

### Step 2: Install Nodemailer

Open PowerShell in your project folder:
```powershell
cd "c:\Users\pc\Downloads\carcrt-main\carcrt-main"
npm install nodemailer
```

### Step 3: Create .env File

Create a new file called `.env` in your project folder with this content:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password-from-step1
ADMIN_EMAIL=your-email@gmail.com
```

**Replace:**
- `your-email@gmail.com` with your actual Gmail address
- `your-app-password-from-step1` with the password you got in Step 1
- Second `your-email@gmail.com` with the email where you want to receive notifications

### Step 4: Update server.js

I'll show you exactly what to add to your `server.js` file:

**At the top of server.js (around line 5), add:**
```javascript
require('dotenv').config();
const nodemailer = require('nodemailer');

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

**Replace the console.log for story submissions (around line 250) with:**
```javascript
// Send email notification
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.ADMIN_EMAIL,
  subject: '📝 New Story Submission - CArCRT Website',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">New Story Submission</h2>
      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Submitted:</strong> ${new Date(timestamp).toLocaleString()}</p>
      </div>
      <div style="background: #fff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h3>Story:</h3>
        <p>${story}</p>
      </div>
      <div style="margin-top: 20px; padding: 15px; background: #dbeafe; border-radius: 8px;">
        <p><strong>What to do next:</strong></p>
        <p>1. Review the submission in your admin dashboard</p>
        <p>2. Approve or delete the story</p>
        <p><a href="http://localhost:8080/admin" style="display: inline-block; background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 10px;">Open Admin Dashboard</a></p>
      </div>
    </div>
  `
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Email error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
```

### Step 5: Install dotenv

```powershell
npm install dotenv
```

### Step 6: Restart Backend Server

1. Stop the backend (press Ctrl+C in the terminal running `node server.js`)
2. Start it again:
```powershell
cd "c:\Users\pc\Downloads\carcrt-main\carcrt-main"
node server.js
```

### Step 7: Test It!

1. Go to http://localhost:8080
2. Scroll down to "Share Your Story" section
3. Fill out the form and submit
4. Check your email - you should receive a notification!

---

## Option 2: Other Email Services

### Outlook/Hotmail
```javascript
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

### Yahoo Mail
```javascript
const transporter = nodemailer.createTransport({
  service: 'yahoo',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

### Custom SMTP (Your organization's email)
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.yourdomain.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

---

## Option 3: Professional Email Service (For Production)

For a live website, consider using:

### SendGrid (Recommended)
- Free tier: 100 emails/day
- Signup: https://sendgrid.com
- Very reliable for production

**Setup:**
```powershell
npm install @sendgrid/mail
```

```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: process.env.ADMIN_EMAIL,
  from: 'noreply@yourdomain.com',
  subject: 'New Story Submission',
  html: `... your email template ...`
};

sgMail.send(msg);
```

### Mailgun
- Free tier: 5,000 emails/month
- Signup: https://mailgun.com

### Amazon SES
- Very cheap ($.10 per 1000 emails)
- Signup: https://aws.amazon.com/ses

---

## 🔔 Adding More Notification Types

You can add email notifications for other forms too!

### Volunteer Application Notification
In the volunteer form submission endpoint, add similar email code:
```javascript
await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: process.env.ADMIN_EMAIL,
  subject: '👋 New Volunteer Application - CArCRT',
  html: `
    <h2>New Volunteer Application</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Interest:</strong> ${interest}</p>
    ...
  `
});
```

### Contact Form Notification
```javascript
await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: process.env.ADMIN_EMAIL,
  subject: '📬 New Contact Form Submission',
  html: `...`
});
```

---

## ⚙️ Advanced Configuration

### Send to Multiple Recipients
```javascript
to: ['admin1@carcrt.org', 'admin2@carcrt.org']
```

### Add CC/BCC
```javascript
{
  from: process.env.EMAIL_USER,
  to: process.env.ADMIN_EMAIL,
  cc: 'coordinator@carcrt.org',
  bcc: 'backup@carcrt.org',
  subject: 'New Submission',
  html: '...'
}
```

### Attach Uploaded Image
```javascript
{
  from: process.env.EMAIL_USER,
  to: process.env.ADMIN_EMAIL,
  subject: 'New Story with Photo',
  html: '...',
  attachments: [{
    filename: 'story-photo.jpg',
    path: imageUrl // path to uploaded file
  }]
}
```

---

## 🐛 Troubleshooting

### "Invalid login" error
- Make sure you're using an **App Password**, not your regular Gmail password
- Enable 2-Step Verification on your Google account first

### "Connection timeout" error
- Check your internet connection
- Your firewall might be blocking port 587
- Try port 465 with `secure: true`

### Emails going to spam
- Add SPF and DKIM records to your domain
- Use a professional email service like SendGrid
- Don't send too many emails at once

### Not receiving emails
- Check spam/junk folder
- Verify EMAIL_USER and ADMIN_EMAIL in .env file
- Check server console for error messages
- Test with: `console.log(process.env.EMAIL_USER)` to verify .env is loaded

---

## 📋 Complete Code Example

Here's a complete working example you can copy:

**In server.js, add this at the top:**
```javascript
require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Function to send story notification
async function sendStoryNotification(storyData) {
  const { name, email, category, story, timestamp } = storyData;
  
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: '📝 New Story Submission - CArCRT Website',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #2563eb;">New Story Submission</h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Submitted:</strong> ${new Date(timestamp).toLocaleString()}</p>
          </div>
          <div style="background: #fff; padding: 20px; border: 1px solid #e5e7eb; margin-top: 20px; border-radius: 8px;">
            <h3>Story:</h3>
            <p>${story}</p>
          </div>
          <div style="margin-top: 20px; text-align: center;">
            <a href="http://localhost:8080/admin" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Review in Admin Dashboard</a>
          </div>
        </div>
      `
    });
    console.log('✅ Email notification sent successfully');
  } catch (error) {
    console.error('❌ Email error:', error.message);
  }
}
```

**In the story submission endpoint (around line 240), replace console.log with:**
```javascript
// Send email notification
await sendStoryNotification({ name, email, category, story, timestamp });
```

**Create .env file in project root:**
```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-app-password-here
ADMIN_EMAIL=where-to-send@gmail.com
```

**Install packages:**
```powershell
npm install nodemailer dotenv
```

**Restart server and test!**

---

## ✅ Checklist

Before going live with email notifications:

- [ ] Gmail App Password created and saved
- [ ] .env file created with correct credentials
- [ ] nodemailer and dotenv installed
- [ ] server.js updated with email code
- [ ] Backend server restarted
- [ ] Test email sent and received successfully
- [ ] Email not in spam folder
- [ ] Admin dashboard link in email works
- [ ] Email template looks good (not broken HTML)

---

## 🎯 Summary

**Quick Setup (5 minutes):**
1. Get Gmail App Password
2. Create .env file with credentials
3. Run: `npm install nodemailer dotenv`
4. Add email code to server.js
5. Restart backend
6. Test!

**For Production:**
- Consider SendGrid or Mailgun
- Use your organization's domain email
- Add proper SPF/DKIM records
- Monitor email delivery rates

---

**Questions?** Check the troubleshooting section or test with a simple email first to verify your setup works!

