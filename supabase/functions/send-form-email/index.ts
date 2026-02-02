// Supabase Edge Function for sending email notifications on form submission
// Place this in supabase/functions/send-form-email/index.ts
import { serve } from 'std/server';

// Use a third-party email service (e.g., Resend, SendGrid, Mailgun, etc.)
// This example uses Resend (https://resend.com/)
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const TO_EMAIL = 'info@carcrt.org';

serve(async (req) => {
  try {
    const { form_type, fields, submitted_at, email } = await req.json();
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'no-reply@carcrt.org',
        to: TO_EMAIL,
        subject: `New ${form_type} submission`,
        html: `<h2>New ${form_type} Submission</h2><pre>${JSON.stringify(fields, null, 2)}</pre><p>Submitted at: ${submitted_at}</p><p>From: ${email || 'N/A'}</p>`
      })
    });
    if (!response.ok) throw new Error('Failed to send email');
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
});
