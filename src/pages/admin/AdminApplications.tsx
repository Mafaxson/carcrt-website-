import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  file_url: string;
  submitted_at: string;
}

export default function AdminApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    setLoading(true);
    const { data, error } = await supabase.from('applications').select('*').order('submitted_at', { ascending: false });
    if (error) setError(error.message);
    else setApplications(data || []);
    setLoading(false);
  }

  function handleDownload(file_url: string) {
    if (file_url) {
      window.open(file_url, '_blank');
    }
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Applications Management</h2>
      {error && <div className="text-red-500">{error}</div>}
      {loading ? <div>Loading...</div> : (
        <table className="min-w-full border mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">File</th>
              <th className="p-2 border">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id} className="border-b">
                <td className="p-2 border">{app.name}</td>
                <td className="p-2 border">{app.email}</td>
                <td className="p-2 border">{app.phone}</td>
                <td className="p-2 border">{app.message}</td>
                <td className="p-2 border">
                  {app.file_url ? (
                    <button className="btn btn-secondary" onClick={() => handleDownload(app.file_url)}>Download</button>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="p-2 border">{new Date(app.submitted_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
