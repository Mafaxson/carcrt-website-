import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function AdminStats() {
  const [stats, setStats] = useState({
    community_members: 0,
    projects: 0,
    districts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(stats);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("stats").select("*").single();
    if (data) {
      setStats(data);
      setForm(data);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    const { error } = await supabase.from("stats").update(form).eq("id", 1);
    if (!error) {
      setStats(form);
      setEditMode(false);
    }
    setLoading(false);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Edit Stats</h2>
      {editMode ? (
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Community Members Reached</label>
            <input
              type="number"
              name="community_members"
              value={form.community_members}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Projects Implemented</label>
            <input
              type="number"
              name="projects"
              value={form.projects}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Districts Engaged</label>
            <input
              type="number"
              name="districts"
              value={form.districts}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <Button onClick={handleSave} className="w-full">Save</Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <span className="block font-medium">Community Members Reached</span>
            <span className="text-xl">{stats.community_members}</span>
          </div>
          <div>
            <span className="block font-medium">Projects Implemented</span>
            <span className="text-xl">{stats.projects}</span>
          </div>
          <div>
            <span className="block font-medium">Districts Engaged</span>
            <span className="text-xl">{stats.districts}</span>
          </div>
          <Button onClick={() => setEditMode(true)} className="w-full">Edit</Button>
        </div>
      )}
    </div>
  );
}
