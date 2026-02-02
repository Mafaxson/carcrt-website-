// src/lib/sendEmail.ts
// Sends an email notification for form submissions using Resend API (or similar)
// Usage: await sendEmail({ to, subject, html })

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  // Replace with your email API endpoint or use fetch to your deployed Edge Function
  const endpoint = 'https://api.resend.com/emails'; // Example: Resend API
  const apiKey = import.meta.env.VITE_RESEND_API_KEY;
  if (!apiKey) throw new Error('Missing email API key');
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'no-reply@carcrt.org',
      to,
      subject,
      html,
    }),
  });
  if (!res.ok) throw new Error('Failed to send email');
  return res.json();
}
