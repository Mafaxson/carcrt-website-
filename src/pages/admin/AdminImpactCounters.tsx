import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AdminImpactCounters() {
  const [counters, setCounters] = useState({
    community_members: 0,
    projects_implemented: 0,
    districts_engaged: 0,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function fetchCounters() {
      setLoading(true);
      const { data, error } = await supabase
        .from('impact_counters')
        .select('*')
        .single();
      if (error) setError(error.message);
      else if (data) setCounters(data);
      setLoading(false);
    }
    fetchCounters();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    const { error } = await supabase
      .from('impact_counters')
      .update(counters)
      .eq('id', 1);
    if (error) setError(error.message);
    else setSuccess('Counters updated!');
    setSaving(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCounters({ ...counters, [e.target.name]: Number(e.target.value) });
  }

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSave} className="max-w-md space-y-4">
      <h2 className="text-lg font-bold mb-2">Homepage Impact Counters</h2>
      <div>
        <label>Community Members Reached</label>
        <input type="number" name="community_members" value={counters.community_members} onChange={handleChange} className="input" />
      </div>
      <div>
        <label>Projects Implemented</label>
        <input type="number" name="projects_implemented" value={counters.projects_implemented} onChange={handleChange} className="input" />
      </div>
      <div>
        <label>Districts Engaged</label>
        <input type="number" name="districts_engaged" value={counters.districts_engaged} onChange={handleChange} className="input" />
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
    </form>
  );
}
