import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

interface EventItem {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
}

export default function AdminEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<EventItem>>({});

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    const { data } = await supabase.from("events").select("*");
    setEvents(data || []);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (event: EventItem) => {
    setEditId(event.id);
    setForm(event);
  };

  const handleDelete = async (id: number) => {
    await supabase.from("events").delete().eq("id", id);
    fetchEvents();
  };

  const handleSave = async () => {
    if (editId) {
      await supabase.from("events").update(form).eq("id", editId);
    } else {
      await supabase.from("events").insert([form]);
    }
    setEditId(null);
    setForm({});
    fetchEvents();
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Manage Events</h2>
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
            name="location"
            placeholder="Location"
            value={form.location || ""}
            onChange={handleChange}
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description || ""}
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
            <th className="p-2">Location</th>
            <th className="p-2">Description</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td className="p-2">{event.title}</td>
              <td className="p-2">{event.date}</td>
              <td className="p-2">{event.location}</td>
              <td className="p-2">{event.description}</td>
              <td className="p-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(event)} className="mr-2">Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(event.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
