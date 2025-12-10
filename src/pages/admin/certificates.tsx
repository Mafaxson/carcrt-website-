import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

interface Certificate {
  id: number;
  title: string;
  description: string;
  date: string;
}

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Certificate>>({});

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    setLoading(true);
    const { data } = await supabase.from("certificates").select("*");
    setCertificates(data || []);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (certificate: Certificate) => {
    setEditId(certificate.id);
    setForm(certificate);
  };

  const handleDelete = async (id: number) => {
    await supabase.from("certificates").delete().eq("id", id);
    fetchCertificates();
  };

  const handleSave = async () => {
    if (editId) {
      await supabase.from("certificates").update(form).eq("id", editId);
    } else {
      await supabase.from("certificates").insert([form]);
    }
    setEditId(null);
    setForm({});
    fetchCertificates();
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Manage Certificates</h2>
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
            name="description"
            placeholder="Description"
            value={form.description || ""}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          />
          <input
            type="date"
            name="date"
            placeholder="Date"
            value={form.date || ""}
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
            <th className="p-2">Description</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((certificate) => (
            <tr key={certificate.id}>
              <td className="p-2">{certificate.title}</td>
              <td className="p-2">{certificate.description}</td>
              <td className="p-2">{certificate.date}</td>
              <td className="p-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(certificate)} className="mr-2">Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(certificate.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
