import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface ImpactStory {
  id: string;
  title: string;
  description: string;
  image_url: string;
  submitted_by: string;
  approved: boolean;
  created_at: string;
}

export default function AdminImpactStories() {
  const [stories, setStories] = useState<ImpactStory[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchStories();
  }, []);

  async function fetchStories() {
    setLoading(true);
    const { data, error } = await supabase.from('impact_stories').select('*').order('created_at', { ascending: false });
    if (error) setError(error.message);
    else setStories(data || []);
    setLoading(false);
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    let image_url = '';
    if (imageFile) {
      const { data: uploadData, error: uploadError } = await supabase.storage.from('impact-stories').upload(`stories/${Date.now()}-${imageFile.name}`, imageFile);
      if (uploadError) {
        setError(uploadError.message);
        setSaving(false);
        return;
      }
      image_url = uploadData?.path ? supabase.storage.from('impact-stories').getPublicUrl(uploadData.path).data.publicUrl : '';
    }
    const { error: insertError } = await supabase.from('impact_stories').insert({ title, description, image_url, approved: true });
    if (insertError) setError(insertError.message);
    else {
      setSuccess('Impact story added!');
      setTitle('');
      setDescription('');
      setImageFile(null);
      fetchStories();
    }
    setSaving(false);
  }

  async function handleApprove(id: string) {
    const { error } = await supabase.from('impact_stories').update({ approved: true }).eq('id', id);
    if (error) setError(error.message);
    else fetchStories();
  }

  async function handleReject(id: string) {
    if (!window.confirm('Reject/delete this story?')) return;
    const { error } = await supabase.from('impact_stories').delete().eq('id', id);
    if (error) setError(error.message);
    else fetchStories();
  }

  async function handleEdit(id: string, field: keyof ImpactStory, value: string) {
    const { error } = await supabase.from('impact_stories').update({ [field]: value }).eq('id', id);
    if (error) setError(error.message);
    else fetchStories();
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Impact Stories (Approval System)</h2>
      <form onSubmit={handleAdd} className="space-y-2 mb-6">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required className="input" />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="input" />
        <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="input" />
        <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Add Story'}</button>
      </form>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      {loading ? <div>Loading...</div> : (
        <ul className="space-y-2">
          {stories.map(story => (
            <li key={story.id} className={`flex flex-col md:flex-row gap-4 p-2 border rounded ${!story.approved ? 'bg-yellow-50' : ''}`}>
              {story.image_url && <img src={story.image_url} alt={story.title} className="w-16 h-16 object-cover" />}
              <input type="text" value={story.title} onChange={e => handleEdit(story.id, 'title', e.target.value)} className="input w-32" />
              <textarea value={story.description} onChange={e => handleEdit(story.id, 'description', e.target.value)} className="input w-48" />
              <div className="flex gap-2 items-center">
                {!story.approved && <button className="btn btn-success" onClick={() => handleApprove(story.id)}>Approve</button>}
                <button className="btn btn-danger" onClick={() => handleReject(story.id)}>{story.approved ? 'Delete' : 'Reject'}</button>
              </div>
              <div className="text-xs text-gray-500">{story.approved ? 'Approved' : 'Pending'}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
