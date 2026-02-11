import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DonationForm() {
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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
      const { error } = await supabase.from("donations").insert([payload]);
      if (error) throw error;
      setSuccess(true);
      setDonorName("");
      setEmail("");
      setAmount("");
      setMessage("");
    } catch (err: any) {
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
    </form>
  );
}
