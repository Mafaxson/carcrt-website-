import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  category: string;
  featured: boolean;
}

export default function AdminNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<NewsItem>>({ featured: false });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    const { data } = await supabase.from("news").select("*");
    setNews(data || []);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleEdit = (item: NewsItem) => {
    setEditId(item.id);
    setForm(item);
  };

  const handleDelete = async (id: number) => {
    await supabase.from("news").delete().eq("id", id);
    fetchNews();
  };

  const handleSave = async () => {
    if (editId) {
      await supabase.from("news").update(form).eq("id", editId);
    } else {
      await supabase.from("news").insert([form]);
    }
    setEditId(null);
    setForm({ featured: false });
    fetchNews();
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Manage News & Updates</h2>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Add New</h3>
        <div className="flex gap-2 mb-2 flex-wrap">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title || ""}
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
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category || ""}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          />
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured || false}
              onChange={handleChange}
            />
            Featured
          </label>
          <input
            type="text"
            name="content"
            placeholder="Content"
            value={form.content || ""}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-64"
          />
          <Button onClick={handleSave}>{editId ? "Update" : "Add"}</Button>
        </div>
      </div>
      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Title</th>
            <th className="p-2">Date</th>
            <th className="p-2">Category</th>
            <th className="p-2">Featured</th>
            <th className="p-2">Content</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
            <tr key={item.id}>
              <td className="p-2">{item.title}</td>
              <td className="p-2">{item.date}</td>
              <td className="p-2">{item.category}</td>
              <td className="p-2">{item.featured ? "Yes" : "No"}</td>
              <td className="p-2">{item.content}</td>
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
