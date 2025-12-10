import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

interface Leader {
  id: number;
  name: string;
  title: string;
  bio: string;
  photo: string;
  type: "Leadership" | "Team" | "Intern";
}

export default function AdminLeadership() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Leader>>({ type: "Leadership" });

  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    setLoading(true);
    const { data } = await supabase.from("leadership").select("*");
    setLeaders(data || []);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (leader: Leader) => {
    setEditId(leader.id);
    setForm(leader);
  };

  const handleDelete = async (id: number) => {
    await supabase.from("leadership").delete().eq("id", id);
    fetchLeaders();
  };

  const handleSave = async () => {
    if (editId) {
      await supabase.from("leadership").update(form).eq("id", editId);
    } else {
      await supabase.from("leadership").insert([form]);
    }
    setEditId(null);
    setForm({ type: "Leadership" });
    fetchLeaders();
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Manage Leadership, Team & Interns</h2>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Add New</h3>
        <div className="flex gap-2 mb-2 flex-wrap">
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
            name="title"
            placeholder="Title/Role"
            value={form.title || ""}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            value={form.photo || ""}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          />
          <select
            name="type"
            value={form.type || "Leadership"}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          >
            <option value="Leadership">Leadership</option>
            <option value="Team">Team</option>
            <option value="Intern">Intern</option>
          </select>
          <input
            type="text"
            name="bio"
            placeholder="Short Bio"
            value={form.bio || ""}
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
            <th className="p-2">Title</th>
            <th className="p-2">Photo</th>
            <th className="p-2">Type</th>
            <th className="p-2">Bio</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((leader) => (
            <tr key={leader.id}>
              <td className="p-2">{leader.name}</td>
              <td className="p-2">{leader.title}</td>
              <td className="p-2">
                <img src={leader.photo} alt={leader.name} className="w-12 h-12 object-cover rounded" />
              </td>
              <td className="p-2">{leader.type}</td>
              <td className="p-2">{leader.bio}</td>
              <td className="p-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(leader)} className="mr-2">Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(leader.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
