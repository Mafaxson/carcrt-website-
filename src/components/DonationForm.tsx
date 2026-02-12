import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import DebugPanel from "@/components/DebugPanel";

export default function DonationForm() {
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [debug, setDebug] = useState<any>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const parsedAmount = amount ? parseFloat(amount) : null;

    const payload = {
      donor_name: donorName || null,
      email: email || null,
      amount: parsedAmount,
      message: message || null,
    };

    try {
      const { data, error } = await supabase.from("donations").insert([payload]).select();
      console.log("supabase insert donations result:", { data, error });
      setDebug({ step: "insert", data, error });
      if (error) throw error;
      const inserted = data && data[0];
      if (!inserted || !inserted.id) throw new Error("Inserted record not returned");

      const functionUrl = import.meta.env.VITE_SEND_EMAIL_FUNCTION_URL as string;
      if (!functionUrl) throw new Error("Missing VITE_SEND_EMAIL_FUNCTION_URL environment variable");

      const fnRes = await fetch(functionUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: "donations", id: inserted.id }),
      });
      const fnText = await fnRes.text();
      setDebug((d: any) => ({ ...d, step: "function", status: fnRes.status, body: fnText }));
      if (!fnRes.ok) {
        throw new Error(`Email function error: ${fnText}`);
      }

      setSuccess(true);
      setDonorName("");
      setEmail("");
      setAmount("");
      setMessage("");
    } catch (err: any) {
      console.error("DonationForm error:", err);
      setError(err.message || "Failed to submit donation request.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input value={donorName} onChange={(e) => setDonorName(e.target.value)} className="w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium">Amount (USD)</label>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" step="0.01" className="w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium">Message (optional)</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full" />
      </div>
      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">Donation request submitted successfully.</div>}
      <button disabled={loading} type="submit" className="px-4 py-2 bg-blue-600 text-white">
        {loading ? "Submitting..." : "Submit Donation"}
      </button>
      <DebugPanel data={debug} onClose={() => setDebug(null)} />
    </form>
  );
}
