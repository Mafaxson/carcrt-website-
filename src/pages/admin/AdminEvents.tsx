import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

const STATUS_OPTIONS = ['Upcoming', 'Ongoing', 'Past'];

interface EventItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  video_url: string;
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

export default function AdminEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [video_url, setVideoUrl] = useState('');
  const [status, setStatus] = useState('Upcoming');
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);
    const { data, error } = await supabase.from('events').select('*').order('created_at', { ascending: false });
    if (error) setError(error.message);
    else setEvents(data || []);
    setLoading(false);
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    let image_url = '';
    if (imageFile) {
      const { data: uploadData, error: uploadError } = await supabase.storage.from('event-images').upload(`events/${Date.now()}-${imageFile.name}`, imageFile);
      if (uploadError) {
        setError(uploadError.message);
        setSaving(false);
        return;
      }
      image_url = uploadData?.path ? supabase.storage.from('event-images').getPublicUrl(uploadData.path).data.publicUrl : '';
    }
    const { error: insertError } = await supabase.from('events').insert({ title, description, image_url, video_url, status, start_date, end_date });
    if (insertError) setError(insertError.message);
    else {
      setSuccess('Event added!');
      setTitle('');
      setDescription('');
      setImageFile(null);
      setVideoUrl('');
      setStatus('Upcoming');
      setStartDate('');
      setEndDate('');
      fetchEvents();
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Delete this event?')) return;
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) setError(error.message);
    else fetchEvents();
  }

  async function handleEdit(id: string, field: keyof EventItem, value: string) {
    const { error } = await supabase.from('events').update({ [field]: value }).eq('id', id);
    if (error) setError(error.message);
    else fetchEvents();
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Events Management</h2>
      <form onSubmit={handleAdd} className="space-y-2 mb-6">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required className="input" />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="input" />
        <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="input" />
        <input type="url" placeholder="Video Link (YouTube, etc)" value={video_url} onChange={e => setVideoUrl(e.target.value)} className="input" />
        <select value={status} onChange={e => setStatus(e.target.value)} className="input">
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <input type="date" value={start_date} onChange={e => setStartDate(e.target.value)} className="input" />
        <input type="date" value={end_date} onChange={e => setEndDate(e.target.value)} className="input" />
        <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Add Event'}</button>
      </form>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      {loading ? <div>Loading...</div> : (
        <ul className="space-y-2">
          {events.map(event => (
            <li key={event.id} className="flex flex-col md:flex-row gap-4 p-2 border rounded">
              {event.image_url && <img src={event.image_url} alt={event.title} className="w-16 h-16 object-cover" />}
              <input type="text" value={event.title} onChange={e => handleEdit(event.id, 'title', e.target.value)} className="input w-32" />
              <textarea value={event.description} onChange={e => handleEdit(event.id, 'description', e.target.value)} className="input w-48" />
              <input type="url" value={event.video_url || ''} onChange={e => handleEdit(event.id, 'video_url', e.target.value)} className="input w-32" placeholder="Video URL" />
              <select value={event.status} onChange={e => handleEdit(event.id, 'status', e.target.value)} className="input">
                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <input type="date" value={event.start_date || ''} onChange={e => handleEdit(event.id, 'start_date', e.target.value)} className="input w-32" />
              <input type="date" value={event.end_date || ''} onChange={e => handleEdit(event.id, 'end_date', e.target.value)} className="input w-32" />
              <button className="btn btn-danger ml-auto" onClick={() => handleDelete(event.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
