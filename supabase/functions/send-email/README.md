# send-email Edge Function

This Edge Function fetches a newly-inserted row from one of the allowed tables (contacts, volunteers, donations) using the project `service_role` key and sends a notification email via SendGrid or SMTP.

Required secrets (set these via `supabase secrets set KEY="value" --project-ref <project-ref>`):

- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service_role key (keep secret).
- `SENDGRID_API_KEY` — (optional) If present, SendGrid will be used to send emails.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — (optional) SMTP settings used when SendGrid is not provided.
- `FROM_EMAIL` — optional, default `no-reply@yourdomain.org`.
- `NOTIFY_EMAIL` — address that receives the notification, default `info@carcrt.org`.

How it works:

- Frontend inserts a row using the anon key (RLS must allow INSERT).
- Frontend calls this Edge Function with `{ table: "contacts", id: "<inserted-row-id>" }`.
- The function fetches the created row server-side using `SUPABASE_SERVICE_ROLE_KEY` and sends an email.

Deploy & secrets example (from project root):

1. Ensure the Supabase CLI is installed and you are logged in (`supabase login`).
2. Deploy the function:
   `supabase functions deploy send-email --project-ref <project-ref>`
3. Set secrets (example):
   `supabase secrets set SUPABASE_SERVICE_ROLE_KEY="<service-role>" --project-ref <project-ref>`
   `supabase secrets set SENDGRID_API_KEY="<sendgrid-key>" --project-ref <project-ref>`

After deploy, copy the function URL and set your frontend env variable `VITE_SEND_EMAIL_FUNCTION_URL` to that URL.
