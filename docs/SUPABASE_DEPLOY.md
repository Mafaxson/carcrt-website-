# Deploying Supabase Edge Function and configuring frontend

This file collects the steps you need to finish deploying the `send-email` Edge Function and wiring it into the frontend.

1) Install Supabase CLI on Windows

- Recommended: download the official Windows binary from the GitHub releases page:
  https://github.com/supabase/cli/releases/latest
- Extract `supabase.exe` and add its folder to your `PATH` so you can run `supabase` from PowerShell.

2) (Optional) Use the included helper script

- Run `.\scripts\deploy_supabase_functions.ps1` in PowerShell. The script will:
  - Check for `supabase` CLI and open the releases page if missing.
  - Prompt for your project ref (optional), deploy the `send-email` function, and set secrets.

3) Required SQL (RLS)

- Apply the RLS policies in `supabase/sql/rls-policies.sql` in the Supabase SQL editor (Project → SQL Editor) as a project owner.

4) Set function secrets

- Secrets required by the function (do not store in the repo):
  - `SUPABASE_SERVICE_ROLE_KEY` (required)
  - `SENDGRID_API_KEY` or SMTP credentials `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
  - `FROM_EMAIL` (optional)
  - `NOTIFY_EMAIL` (optional)

- You can set secrets with the Supabase CLI:
  `supabase secrets set SUPABASE_SERVICE_ROLE_KEY="<value>" --project-ref <project-ref>`

5) Deploy function

- `supabase functions deploy send-email --project-ref <project-ref>`

6) Wire frontend

- After deploy, find the function URL in the deploy output or in the Supabase dashboard and set the frontend environment variable in `.env.local`:
  `VITE_SEND_EMAIL_FUNCTION_URL=https://<region>.functions.supabase.co/send-email`
- Restart your dev server.

7) Test

- Use the included test page `/testforms` locally to submit each form. Verify rows appear in Supabase and emails are received.
