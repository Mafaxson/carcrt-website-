import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

import { Event } from '@/types/supabase';

interface EventItem extends Event {
  dateFrom?: string;
  dateTo?: string;
  status?: string;
  registrationLink?: string;
  registrationNote?: string;
  applicationEmail?: string;
  applicationPdf?: string;
}

export default function AdminEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
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

  const handleDelete = async (id: string) => {
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
        <h3 className="font-semibold mb-2">Add / Edit Event</h3>
        <div className="flex gap-2 mb-2 flex-wrap">
          <input type="text" name="title" placeholder="Title" value={form.title || ""} onChange={handleChange} className="border rounded px-2 py-1" />
          <input type="text" name="description" placeholder="Description" value={form.description || ""} onChange={handleChange} className="border rounded px-2 py-1 w-64" />
          <input type="datetime-local" name="event_date" placeholder="Event Date" value={form.event_date || ""} onChange={handleChange} className="border rounded px-2 py-1 w-48" />
          <input type="text" name="location" placeholder="Location" value={form.location || ""} onChange={handleChange} className="border rounded px-2 py-1 w-48" />
          <input type="text" name="image_url" placeholder="Image URL" value={form.image_url || ""} onChange={handleChange} className="border rounded px-2 py-1 w-48" />
          <input type="text" name="dateFrom" placeholder="Date From" value={form.dateFrom || ""} onChange={handleChange} className="border rounded px-2 py-1 w-48" />
          <input type="text" name="dateTo" placeholder="Date To" value={form.dateTo || ""} onChange={handleChange} className="border rounded px-2 py-1 w-48" />
          <input type="text" name="status" placeholder="Status" value={form.status || ""} onChange={handleChange} className="border rounded px-2 py-1 w-48" />
          <input type="text" name="registrationLink" placeholder="Registration Link" value={form.registrationLink || ""} onChange={handleChange} className="border rounded px-2 py-1 w-48" />
          <input type="text" name="registrationNote" placeholder="Registration Note" value={form.registrationNote || ""} onChange={handleChange} className="border rounded px-2 py-1 w-48" />
          <input type="text" name="applicationEmail" placeholder="Application Email" value={form.applicationEmail || ""} onChange={handleChange} className="border rounded px-2 py-1 w-48" />
          <input type="text" name="applicationPdf" placeholder="Application PDF URL" value={form.applicationPdf || ""} onChange={handleChange} className="border rounded px-2 py-1 w-48" />
          <Button onClick={handleSave}>{editId ? "Update" : "Add"}</Button>
        </div>
      </div>
      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Title</th>
            <th className="p-2">Description</th>
            <th className="p-2">Event Date</th>
            <th className="p-2">Location</th>
            <th className="p-2">Image</th>
            <th className="p-2">Date From</th>
            <th className="p-2">Date To</th>
            <th className="p-2">Status</th>
            <th className="p-2">Registration Link</th>
            <th className="p-2">Registration Note</th>
            <th className="p-2">Application Email</th>
            <th className="p-2">Application PDF</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td className="p-2">{event.title}</td>
              <td className="p-2">{event.description}</td>
              <td className="p-2">{event.event_date && new Date(event.event_date).toLocaleString()}</td>
              <td className="p-2">{event.location}</td>
              <td className="p-2">{event.image_url && <img src={event.image_url} alt="" className="w-16 h-10 object-cover" />}</td>
              <td className="p-2">{event.dateFrom}</td>
              <td className="p-2">{event.dateTo}</td>
              <td className="p-2">{event.status}</td>
              <td className="p-2">{event.registrationLink && <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">Link</a>}</td>
              <td className="p-2">{event.registrationNote}</td>
              <td className="p-2">{event.applicationEmail}</td>
              <td className="p-2">{event.applicationPdf && <a href={event.applicationPdf} target="_blank" rel="noopener noreferrer">PDF</a>}</td>
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
