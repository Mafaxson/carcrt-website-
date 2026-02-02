// src/lib/sendEmail.ts
// Sends an email notification for form submissions using Resend API (or similar)
// Usage: await sendEmail({ to, subject, html })

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  // Use backend API endpoint for email (Nodemailer)
  const endpoint = '/api/send-email';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to,
      subject,
      html,
    }),
  });
  if (!res.ok) throw new Error('Failed to send email');
  return res.json();
}
