// Minimal CommonJS Express server with unified /api/email endpoint
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const MAIN_EMAIL = 'info@carcrt.org';

app.post('/api/email', async (req, res) => {
  try {
    const { type, data } = req.body;
    let subject = '';
    let html = '';

    if (type === 'donation') {
      subject = 'New Donation Submission';
      html = `
        <h2>Donation Form Submission</h2>
        <p><strong>Full Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Amount (USD):</strong> ${data.amount}</p>
        <p><strong>Donation Frequency:</strong> ${data.frequency}</p>
        <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
        <p><strong>Message:</strong> ${data.message || 'N/A'}</p>
      `;
    } else if (type === 'volunteer') {
      subject = 'New Volunteer Submission';
      html = `
        <h2>Volunteer / Get Involved Form Submission</h2>
        <p><strong>Full Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Area of Interest:</strong> ${data.areaOfInterest}</p>
        <p><strong>Skills and Expertise:</strong> ${data.skills}</p>
        <p><strong>Previous Experience:</strong> ${data.experience}</p>
        <p><strong>Reason for Volunteering:</strong> ${data.reason}</p>
      `;
    } else if (type === 'contact') {
      subject = 'New Contact Submission';
      html = `
        <h2>Contact Form Submission</h2>
        <p><strong>Full Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong> ${data.message}</p>
      `;
    } else {
      return res.status(400).json({ success: false, message: 'Invalid form type.' });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: MAIN_EMAIL,
      subject,
      html,
    });
    res.json({ success: true, message: 'Email sent successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send email.', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
