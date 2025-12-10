import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

interface Program {
  id: number;
  title: string;
  description: string;
  image: string;
}

export default function AdminPrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Program>>({});

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    setLoading(true);
    const { data } = await supabase.from("programs").select("*");
    setPrograms(data || []);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (program: Program) => {
    setEditId(program.id);
    setForm(program);
  };

  const handleDelete = async (id: number) => {
    await supabase.from("programs").delete().eq("id", id);
    fetchPrograms();
  };

  const handleSave = async () => {
    if (editId) {
      await supabase.from("programs").update(form).eq("id", editId);
    } else {
      await supabase.from("programs").insert([form]);
    }
    setEditId(null);
    setForm({});
    fetchPrograms();
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Manage Programs</h2>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Add New</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title || ""}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image || ""}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description || ""}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          />
          <Button onClick={handleSave}>{editId ? "Update" : "Add"}</Button>
        </div>
      </div>
      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Title</th>
            <th className="p-2">Image</th>
            <th className="p-2">Description</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program) => (
            <tr key={program.id}>
              <td className="p-2">{program.title}</td>
              <td className="p-2">
                <img src={program.image} alt={program.title} className="w-16 h-16 object-cover rounded" />
              </td>
              <td className="p-2">{program.description}</td>
              <td className="p-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(program)} className="mr-2">Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(program.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
