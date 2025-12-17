import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

interface AffiliatePartner {
  id: number;
  name: string;
  logo: string;
  website?: string;
}

export default function AdminAffiliates() {
  const [affiliates, setAffiliates] = useState<AffiliatePartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<AffiliatePartner>>({});

  useEffect(() => {
    fetchAffiliates();
  }, []);

  const fetchAffiliates = async () => {
    setLoading(true);
    const { data } = await supabase.from("affiliates").select("*");
    setAffiliates(data || []);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (ap: AffiliatePartner) => {
    setEditId(ap.id);
    setForm(ap);
  };

  const handleDelete = async (id: number) => {
    await supabase.from("affiliates").delete().eq("id", id);
    fetchAffiliates();
  };

  const handleSave = async () => {
    if (editId) {
      await supabase.from("affiliates").update(form).eq("id", editId);
    } else {
      await supabase.from("affiliates").insert([form]);
    }
    setEditId(null);
    setForm({});
    fetchAffiliates();
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Manage Affiliate Partners</h2>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Add New</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name || ""}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            name="logo"
            placeholder="Logo URL"
            value={form.logo || ""}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            name="website"
            placeholder="Website"
            value={form.website || ""}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          />
          <Button onClick={handleSave}>{editId ? "Update" : "Add"}</Button>
        </div>
      </div>
      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Logo</th>
            <th className="p-2">Website</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {affiliates.map((ap) => (
            <tr key={ap.id}>
              <td className="p-2">{ap.name}</td>
              <td className="p-2">
                <img src={ap.logo} alt={ap.name} className="w-12 h-12 object-cover rounded" />
              </td>
              <td className="p-2">{ap.website}</td>
              <td className="p-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(ap)} className="mr-2">Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(ap.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

