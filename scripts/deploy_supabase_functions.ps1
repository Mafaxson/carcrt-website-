<#
PowerShell helper to deploy the send-email Edge Function and set required secrets.

Usage: run this in PowerShell (may need to run as user who has supabase CLI installed):
  .\scripts\deploy_supabase_functions.ps1

If the Supabase CLI is not found, the script will open the GitHub releases page so you can download the Windows binary.
#>

# Check for supabase CLI
$supabaseCmd = Get-Command supabase -ErrorAction SilentlyContinue
if (-not $supabaseCmd) {
    Write-Host "Supabase CLI not found. Opening releases page in your browser..."
    Start-Process "https://github.com/supabase/cli/releases/latest"
    Write-Host "Download the Windows binary, extract supabase.exe and add its folder to your PATH. Then re-run this script."
    exit 1
}

Write-Host "Supabase CLI found: $($supabaseCmd.Path)"

$projectRef = Read-Host "Enter your Supabase project ref (leave blank to omit --project-ref)"
$prArg = ""
if ($projectRef -ne "") { $prArg = "--project-ref $projectRef" }

Write-Host "Will deploy function 'send-email' $prArg"

$doDeploy = Read-Host "Proceed to deploy now? (y/n)"
if ($doDeploy -ne 'y') { Write-Host "Aborted by user."; exit 0 }

Write-Host "Deploying function..."
supabase functions deploy send-email $prArg

Write-Host "Function deployment finished (check output above)."

Write-Host "Now we'll configure secrets used by the function. Provide values or leave empty to skip."

$serviceRole = Read-Host "SUPABASE_SERVICE_ROLE_KEY (REQUIRED to fetch rows server-side)"
if ($serviceRole -ne "") {
    supabase secrets set SUPABASE_SERVICE_ROLE_KEY="$serviceRole" $prArg
}

$sendgrid = Read-Host "SENDGRID_API_KEY (optional)"
if ($sendgrid -ne "") { supabase secrets set SENDGRID_API_KEY="$sendgrid" $prArg }

$smtpHost = Read-Host "SMTP_HOST (optional)"
if ($smtpHost -ne "") {
    $smtpPort = Read-Host "SMTP_PORT (default 587)"
    $smtpUser = Read-Host "SMTP_USER"
    $smtpPass = Read-Host "SMTP_PASS"
    supabase secrets set SMTP_HOST="$smtpHost" $prArg
    if ($smtpPort -ne "") { supabase secrets set SMTP_PORT="$smtpPort" $prArg }
    if ($smtpUser -ne "") { supabase secrets set SMTP_USER="$smtpUser" $prArg }
    if ($smtpPass -ne "") { supabase secrets set SMTP_PASS="$smtpPass" $prArg }
}

$fromEmail = Read-Host "FROM_EMAIL (optional, default no-reply@yourdomain.org)"
if ($fromEmail -ne "") { supabase secrets set FROM_EMAIL="$fromEmail" $prArg }

$notifyEmail = Read-Host "NOTIFY_EMAIL (optional, default info@carcrt.org)"
if ($notifyEmail -ne "") { supabase secrets set NOTIFY_EMAIL="$notifyEmail" $prArg }

Write-Host "Secrets set. If you added secrets after deploying, redeploy the function to pick them up (optional)."

Write-Host "To finish:
- Open the Supabase dashboard and view the deployed function URL, or copy it from the deploy output above.
- Set `VITE_SEND_EMAIL_FUNCTION_URL` in your local .env.local to the function URL and restart your dev server.
"

Write-Host "Done."
