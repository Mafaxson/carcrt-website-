import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

interface GalleryItem {
  id: number;
  title: string;
  image_url: string;
  description?: string;
}

export default function AdminGallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<GalleryItem>>({});

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    const { data } = await supabase.from("gallery").select("*");
    setGallery(data || []);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (item: GalleryItem) => {
    setEditId(item.id);
    setForm(item);
  };

  const handleDelete = async (id: number) => {
    await supabase.from("gallery").delete().eq("id", id);
    fetchGallery();
  };

  const handleSave = async () => {
    if (editId) {
      await supabase.from("gallery").update(form).eq("id", editId);
    } else {
      await supabase.from("gallery").insert([form]);
    }
    setEditId(null);
    setForm({});
    fetchGallery();
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Manage Gallery</h2>
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
            name="image_url"
            placeholder="Image URL"
            value={form.image_url || ""}
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
          {gallery.map((item) => (
            <tr key={item.id}>
              <td className="p-2">{item.title}</td>
              <td className="p-2">
                <img src={item.image_url} alt={item.title} className="w-16 h-16 object-cover rounded" />
              </td>
              <td className="p-2">{item.description}</td>
              <td className="p-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(item)} className="mr-2">Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
