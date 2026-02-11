import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY") || "";
const SMTP_HOST = Deno.env.get("SMTP_HOST") || "";
const SMTP_PORT = Deno.env.get("SMTP_PORT") || "";
const SMTP_USER = Deno.env.get("SMTP_USER") || "";
const SMTP_PASS = Deno.env.get("SMTP_PASS") || "";
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "no-reply@yourdomain.org";
const NOTIFY_EMAIL = Deno.env.get("NOTIFY_EMAIL") || "info@carcrt.org";

const allowedTables = ["contacts", "volunteers", "donations"];

async function fetchRecord(table: string, id: string) {
  const url = `${SUPABASE_URL}/rest/v1/${table}?select=*&id=eq.${encodeURIComponent(id)}`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch record from Supabase: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data && data.length ? data[0] : null;
}

function formatEmailFor(table: string, record: any) {
  let subject = `New ${table} submission`;
  let body = JSON.stringify(record, null, 2);

  if (table === "contacts") {
    subject = `New Contact: ${record.name ?? "(no name)"}`;
    body = `Name: ${record.name ?? ""}\nEmail: ${record.email ?? ""}\n\n${record.message ?? ""}`;
  } else if (table === "volunteers") {
    subject = `New Volunteer: ${record.full_name ?? "(no name)"}`;
    body = `Name: ${record.full_name ?? ""}\nEmail: ${record.email ?? ""}\nPhone: ${record.phone ?? ""}\nInterests: ${record.interests ?? ""}`;
  } else if (table === "donations") {
    subject = `New Donation: ${record.donor_name ?? "(no name)"} ($${record.amount ?? "0"})`;
    body = `Name: ${record.donor_name ?? ""}\nEmail: ${record.email ?? ""}\nAmount: ${record.amount ?? ""}\n\n${record.message ?? ""}`;
  }

  return { subject, body };
}

async function sendWithSendGrid(subject: string, body: string) {
  const payload = {
    personalizations: [{ to: [{ email: NOTIFY_EMAIL }] }],
    from: { email: FROM_EMAIL },
    subject,
    content: [{ type: "text/plain", value: body }],
  };

  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`SendGrid error: ${res.status} ${text}`);
  }
}

async function sendWithSMTP(subject: string, body: string) {
  const client = new SmtpClient();
  await client.connect({
    hostname: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    username: SMTP_USER,
    password: SMTP_PASS,
    // secure will be true for port 465
    secure: SMTP_PORT === "465",
  });

  await client.send({
    from: FROM_EMAIL,
    to: NOTIFY_EMAIL,
    subject,
    content: body,
  });

  await client.close();
}

serve(async (req) => {
  try {
    if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

    const { table, id } = await req.json();
    if (!table || !id) return new Response("Missing table or id in request body", { status: 400 });
    if (!allowedTables.includes(table)) return new Response("Table not allowed", { status: 400 });

    // Fetch the inserted record server-side using the service_role key to bypass RLS
    const record = await fetchRecord(table, id);
    if (!record) return new Response("Record not found", { status: 404 });

    const { subject, body } = formatEmailFor(table, record);

    if (SENDGRID_API_KEY) {
      await sendWithSendGrid(subject, body);
    } else if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      await sendWithSMTP(subject, body);
    } else {
      return new Response("No email provider configured on the Edge Function (SENDGRID_API_KEY or SMTP settings required)", { status: 500 });
    }

    return new Response("Email sent", { status: 200 });
  } catch (err) {
    console.error("Error in send-email function:", err);
    return new Response(String(err?.message ?? err), { status: 500 });
  }
});
