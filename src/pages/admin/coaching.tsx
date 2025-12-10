import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

interface CoachingPartner {
  id: number;
  name: string;
  logo: string;
  website?: string;
}

export default function AdminCoachingPartners() {
  const [coachingPartners, setCoachingPartners] = useState<CoachingPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<CoachingPartner>>({});

  useEffect(() => {
    fetchCoachingPartners();
  }, []);

  const fetchCoachingPartners = async () => {
    setLoading(true);
    const { data } = await supabase.from("coaching_partners").select("*");
    setCoachingPartners(data || []);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (cp: CoachingPartner) => {
    setEditId(cp.id);
    setForm(cp);
  };

  const handleDelete = async (id: number) => {
    await supabase.from("coaching_partners").delete().eq("id", id);
    fetchCoachingPartners();
  };

  const handleSave = async () => {
    if (editId) {
      await supabase.from("coaching_partners").update(form).eq("id", editId);
    } else {
      await supabase.from("coaching_partners").insert([form]);
    }
    setEditId(null);
    setForm({});
    fetchCoachingPartners();
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Manage Coaching Partners</h2>
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
          {coachingPartners.map((cp) => (
            <tr key={cp.id}>
              <td className="p-2">{cp.name}</td>
              <td className="p-2">
                <img src={cp.logo} alt={cp.name} className="w-12 h-12 object-cover rounded" />
              </td>
              <td className="p-2">{cp.website}</td>
              <td className="p-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(cp)} className="mr-2">Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(cp.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
