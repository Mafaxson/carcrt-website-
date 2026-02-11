import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const payload = {
      name: name || null,
      email: email || null,
      message: message || null,
    };

    try {
      const { error } = await supabase.from("contacts").insert([payload]);
      if (error) throw error;
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setError(err.message || "Failed to submit contact form.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium">Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full" />
      </div>
      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">Message sent successfully.</div>}
      <button disabled={loading} type="submit" className="px-4 py-2 bg-blue-600 text-white">
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
