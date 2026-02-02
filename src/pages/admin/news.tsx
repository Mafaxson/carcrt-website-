import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

import { News } from '@/types/supabase';

interface NewsItem extends News {
  excerpt?: string;
  category?: string | string[];
  link?: string;
  videoUrl?: string;
  featured?: boolean;
}

export default function AdminNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
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

  const handleDelete = async (id: string) => {
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
        <h3 className="font-semibold mb-2">Add / Edit News</h3>
        <div className="flex gap-2 mb-2 flex-wrap">
          <input type="text" name="title" placeholder="Title" value={form.title || ""} onChange={handleChange} className="border rounded px-2 py-1" />
          <input type="text" name="body" placeholder="Body/Content" value={form.body || ""} onChange={handleChange} className="border rounded px-2 py-1 w-64" />
          <input type="text" name="excerpt" placeholder="Excerpt" value={form.excerpt || ""} onChange={handleChange} className="border rounded px-2 py-1 w-48" />
          <input type="text" name="category" placeholder="Category (comma separated)" value={form.category || ""} onChange={handleChange} className="border rounded px-2 py-1 w-48" />
          <input type="text" name="image_url" placeholder="Image URL" value={form.image_url || ""} onChange={handleChange} className="border rounded px-2 py-1 w-48" />
          <input type="text" name="videoUrl" placeholder="Video URL" value={form.videoUrl || ""} onChange={handleChange} className="border rounded px-2 py-1 w-48" />
          <input type="text" name="link" placeholder="External Link" value={form.link || ""} onChange={handleChange} className="border rounded px-2 py-1 w-48" />
          <input type="datetime-local" name="published_at" placeholder="Published At" value={form.published_at || ""} onChange={handleChange} className="border rounded px-2 py-1 w-48" />
          <Button onClick={handleSave}>{editId ? "Update" : "Add"}</Button>
        </div>
      </div>
      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Title</th>
            <th className="p-2">Body</th>
            <th className="p-2">Excerpt</th>
            <th className="p-2">Category</th>
            <th className="p-2">Image</th>
            <th className="p-2">Video</th>
            <th className="p-2">Link</th>
            <th className="p-2">Published At</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
            <tr key={item.id}>
              <td className="p-2">{item.title}</td>
              <td className="p-2">{item.body}</td>
              <td className="p-2">{item.excerpt}</td>
              <td className="p-2">{Array.isArray(item.category) ? item.category.join(', ') : item.category}</td>
              <td className="p-2">{item.image_url && <img src={item.image_url} alt="" className="w-16 h-10 object-cover" />}</td>
              <td className="p-2">{item.videoUrl && <a href={item.videoUrl} target="_blank" rel="noopener noreferrer">Video</a>}</td>
              <td className="p-2">{item.link && <a href={item.link} target="_blank" rel="noopener noreferrer">Link</a>}</td>
              <td className="p-2">{item.published_at && new Date(item.published_at).toLocaleString()}</td>
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
