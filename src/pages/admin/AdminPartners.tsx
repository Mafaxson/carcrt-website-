import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Partner {
  id: string;
  name: string;
  website: string;
  logo_url: string;
}

export default function AdminPartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchPartners();
  }, []);

  async function fetchPartners() {
    setLoading(true);
    const { data, error } = await supabase.from('partners').select('*').order('created_at', { ascending: false });
    if (error) setError(error.message);
    else setPartners(data || []);
    setLoading(false);
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    let logo_url = '';
    if (logoFile) {
      const { data: uploadData, error: uploadError } = await supabase.storage.from('partner-logos').upload(`logos/${Date.now()}-${logoFile.name}`, logoFile);
      if (uploadError) {
        setError(uploadError.message);
        setSaving(false);
        return;
      }
      logo_url = uploadData?.path ? supabase.storage.from('partner-logos').getPublicUrl(uploadData.path).data.publicUrl : '';
    }
    const { error: insertError } = await supabase.from('partners').insert({ name, website, logo_url });
    if (insertError) setError(insertError.message);
    else {
      setSuccess('Partner added!');
      setName('');
      setWebsite('');
      setLogoFile(null);
      fetchPartners();
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Delete this partner?')) return;
    const { error } = await supabase.from('partners').delete().eq('id', id);
    if (error) setError(error.message);
    else fetchPartners();
  }

  async function handleEdit(id: string, field: keyof Partner, value: string) {
    const { error } = await supabase.from('partners').update({ [field]: value }).eq('id', id);
    if (error) setError(error.message);
    else fetchPartners();
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Partners & Sponsors</h2>
      <form onSubmit={handleAdd} className="space-y-2 mb-6">
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required className="input" />
        <input type="url" placeholder="Website" value={website} onChange={e => setWebsite(e.target.value)} className="input" />
        <input type="file" accept="image/*" onChange={e => setLogoFile(e.target.files?.[0] || null)} className="input" />
        <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Add Partner'}</button>
      </form>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      {loading ? <div>Loading...</div> : (
        <ul className="space-y-2">
          {partners.map(partner => (
            <li key={partner.id} className="flex items-center gap-4 p-2 border rounded">
              {partner.logo_url && <img src={partner.logo_url} alt={partner.name} className="w-12 h-12 object-contain" />}
              <input type="text" value={partner.name} onChange={e => handleEdit(partner.id, 'name', e.target.value)} className="input w-32" />
              <input type="url" value={partner.website} onChange={e => handleEdit(partner.id, 'website', e.target.value)} className="input w-48" />
              <button className="btn btn-danger ml-auto" onClick={() => handleDelete(partner.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
