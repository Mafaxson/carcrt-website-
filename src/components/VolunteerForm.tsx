import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function VolunteerForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interests, setInterests] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const payload = {
      full_name: fullName || null,
      email: email || null,
      phone: phone || null,
      interests: interests || null,
    };

    try {
      const { data, error } = await supabase.from("volunteers").insert([payload]).select();
      if (error) throw error;
      const inserted = data && data[0];
      if (!inserted || !inserted.id) throw new Error("Inserted record not returned");

      const functionUrl = import.meta.env.VITE_SEND_EMAIL_FUNCTION_URL as string;
      if (!functionUrl) throw new Error("Missing VITE_SEND_EMAIL_FUNCTION_URL environment variable");

      const fnRes = await fetch(functionUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: "volunteers", id: inserted.id }),
      });
      if (!fnRes.ok) {
        const text = await fnRes.text();
        throw new Error(`Email function error: ${text}`);
      }

      setSuccess(true);
      setFullName("");
      setEmail("");
      setPhone("");
      setInterests("");
    } catch (err: any) {
      setError(err.message || "Failed to submit volunteer application.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Full name</label>
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium">Interests / Skills</label>
        <textarea value={interests} onChange={(e) => setInterests(e.target.value)} className="w-full" />
      </div>
      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">Application submitted successfully.</div>}
      <button disabled={loading} type="submit" className="px-4 py-2 bg-blue-600 text-white">
        {loading ? "Submitting..." : "Apply to Volunteer"}
      </button>
    </form>
  );
}
