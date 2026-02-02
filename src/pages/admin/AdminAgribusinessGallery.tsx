import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
}

export default function AdminAgribusinessGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchGallery();
  }, []);

  async function fetchGallery() {
    setLoading(true);
    const { data, error } = await supabase.from('agribusiness_gallery').select('*').order('created_at', { ascending: false });
    if (error) setError(error.message);
    else setItems(data || []);
    setLoading(false);
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    let image_url = '';
    if (imageFile) {
      const { data: uploadData, error: uploadError } = await supabase.storage.from('agribusiness-gallery').upload(`gallery/${Date.now()}-${imageFile.name}`, imageFile);
      if (uploadError) {
        setError(uploadError.message);
        setSaving(false);
        return;
      }
      image_url = uploadData?.path ? supabase.storage.from('agribusiness-gallery').getPublicUrl(uploadData.path).data.publicUrl : '';
    }
    const { error: insertError } = await supabase.from('agribusiness_gallery').insert({ title, description, image_url });
    if (insertError) setError(insertError.message);
    else {
      setSuccess('Gallery item added!');
      setTitle('');
      setDescription('');
      setImageFile(null);
      fetchGallery();
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Delete this gallery item?')) return;
    const { error } = await supabase.from('agribusiness_gallery').delete().eq('id', id);
    if (error) setError(error.message);
    else fetchGallery();
  }

  async function handleEdit(id: string, field: keyof GalleryItem, value: string) {
    const { error } = await supabase.from('agribusiness_gallery').update({ [field]: value }).eq('id', id);
    if (error) setError(error.message);
    else fetchGallery();
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Our Work in Action (Gallery)</h2>
      <form onSubmit={handleAdd} className="space-y-2 mb-6">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required className="input" />
        <textarea placeholder="Short Description" value={description} onChange={e => setDescription(e.target.value)} className="input" />
        <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="input" />
        <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Add Gallery Item'}</button>
      </form>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      {loading ? <div>Loading...</div> : (
        <ul className="space-y-2">
          {items.map(item => (
            <li key={item.id} className="flex items-center gap-4 p-2 border rounded">
              {item.image_url && <img src={item.image_url} alt={item.title} className="w-16 h-16 object-cover" />}
              <input type="text" value={item.title} onChange={e => handleEdit(item.id, 'title', e.target.value)} className="input w-32" />
              <textarea value={item.description} onChange={e => handleEdit(item.id, 'description', e.target.value)} className="input w-48" />
              <button className="btn btn-danger ml-auto" onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
