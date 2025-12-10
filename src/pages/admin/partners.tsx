import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

interface Partner {
  id: number;
  name: string;
  type: "Partner" | "Sponsor" | "Affiliate";
  logo: string;
  website?: string;
}

export default function AdminPartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Partner>>({});

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    setLoading(true);
    const { data } = await supabase.from("partners").select("*");
    setPartners(data || []);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (partner: Partner) => {
    setEditId(partner.id);
    setForm(partner);
  };

  const handleDelete = async (id: number) => {
    await supabase.from("partners").delete().eq("id", id);
    fetchPartners();
  };

  const handleSave = async () => {
    if (editId) {
      await supabase.from("partners").update(form).eq("id", editId);
    } else {
      await supabase.from("partners").insert([form]);
    }
    setEditId(null);
    setForm({});
    fetchPartners();
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Manage Partners & Sponsors</h2>
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
          <select
            name="type"
            value={form.type || "Partner"}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          >
            <option value="Partner">Partner</option>
            <option value="Sponsor">Sponsor</option>
            <option value="Affiliate">Affiliate</option>
          </select>
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
            <th className="p-2">Type</th>
            <th className="p-2">Logo</th>
            <th className="p-2">Website</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {partners.map((p) => (
            <tr key={p.id}>
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.type}</td>
              <td className="p-2">
                <img src={p.logo} alt={p.name} className="w-12 h-12 object-cover rounded" />
              </td>
              <td className="p-2">{p.website}</td>
              <td className="p-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(p)} className="mr-2">Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(p.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
