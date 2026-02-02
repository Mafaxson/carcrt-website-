import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

const CATEGORIES = [
  'All',
  'Announcements',
  'Programs',
  'Impact',
  'Partnership',
  'Events',
];

interface NewsItem {
  id: string;
  title: string;
  content: string;
  image_url: string;
  video_url: string;
  link: string;
  category: string;
  created_at: string;
}

export default function AdminNewsUpdates() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [video_url, setVideoUrl] = useState('');
  const [link, setLink] = useState('');
  const [category, setCategory] = useState('Announcements');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    setLoading(true);
    const { data, error } = await supabase.from('news_updates').select('*').order('created_at', { ascending: false });
    if (error) setError(error.message);
    else setNews(data || []);
    setLoading(false);
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    let image_url = '';
    if (imageFile) {
      const { data: uploadData, error: uploadError } = await supabase.storage.from('news-images').upload(`news/${Date.now()}-${imageFile.name}`, imageFile);
      if (uploadError) {
        setError(uploadError.message);
        setSaving(false);
        return;
      }
      image_url = uploadData?.path ? supabase.storage.from('news-images').getPublicUrl(uploadData.path).data.publicUrl : '';
    }
    const { error: insertError } = await supabase.from('news_updates').insert({ title, content, image_url, video_url, link, category });
    if (insertError) setError(insertError.message);
    else {
      setSuccess('News/Update posted!');
      setTitle('');
      setContent('');
      setImageFile(null);
      setVideoUrl('');
      setLink('');
      setCategory('Announcements');
      fetchNews();
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Delete this news/update?')) return;
    const { error } = await supabase.from('news_updates').delete().eq('id', id);
    if (error) setError(error.message);
    else fetchNews();
  }

  async function handleEdit(id: string, field: keyof NewsItem, value: string) {
    const { error } = await supabase.from('news_updates').update({ [field]: value }).eq('id', id);
    if (error) setError(error.message);
    else fetchNews();
  }

  const filteredNews = filter === 'All' ? news : news.filter(n => n.category === filter);

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">News & Updates</h2>
      <form onSubmit={handleAdd} className="space-y-2 mb-6">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required className="input" />
        <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} className="input" />
        <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="input" />
        <input type="url" placeholder="Video Link (YouTube, etc)" value={video_url} onChange={e => setVideoUrl(e.target.value)} className="input" />
        <input type="url" placeholder="External Link" value={link} onChange={e => setLink(e.target.value)} className="input" />
        <select value={category} onChange={e => setCategory(e.target.value)} required className="input">
          {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Post News/Update'}</button>
      </form>
      <div className="flex gap-2 mb-4">
        {CATEGORIES.map(c => (
          <button key={c} className={`btn ${filter === c ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      {loading ? <div>Loading...</div> : (
        <ul className="space-y-2">
          {filteredNews.map(item => (
            <li key={item.id} className="flex flex-col md:flex-row gap-4 p-2 border rounded">
              {item.image_url && <img src={item.image_url} alt={item.title} className="w-16 h-16 object-cover" />}
              <input type="text" value={item.title} onChange={e => handleEdit(item.id, 'title', e.target.value)} className="input w-32" />
              <textarea value={item.content} onChange={e => handleEdit(item.id, 'content', e.target.value)} className="input w-48" />
              <input type="url" value={item.video_url || ''} onChange={e => handleEdit(item.id, 'video_url', e.target.value)} className="input w-32" placeholder="Video URL" />
              <input type="url" value={item.link || ''} onChange={e => handleEdit(item.id, 'link', e.target.value)} className="input w-32" placeholder="Link" />
              <select value={item.category} onChange={e => handleEdit(item.id, 'category', e.target.value)} className="input">
                {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <button className="btn btn-danger ml-auto" onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
