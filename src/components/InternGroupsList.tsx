import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';

interface InternGroup {
  id: string;
  name: string;
  community?: string;
  bio: string;
  photo: string;
  category?: string;
}

const InternGroupsList: React.FC = () => {
  const [internGroups, setInternGroups] = useState<InternGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/leadership.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load intern groups data');
        return res.json();
      })
      .then((json) => {
        setInternGroups(json.filter((g: InternGroup) => g.category === 'Intern Group'));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-8 text-muted-foreground">Loading intern groups...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!internGroups.length) return <div className="text-center py-8 text-muted-foreground">No intern groups found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {internGroups.map((group) => (
        <Card key={group.id} className="flex flex-col items-center p-4 shadow-lg">
          <img
            src={group.photo}
            alt={group.name}
            className="w-32 h-32 object-cover rounded-full mb-4 border-2 border-primary"
            loading="lazy"
          />
          <h3 className="text-lg font-bold text-center">{group.name}</h3>
          {group.community && <p className="text-primary-600 text-sm font-medium text-center mb-2">{group.community}</p>}
          <p className="text-gray-600 text-center text-sm">{group.bio}</p>
        </Card>
      ))}
    </div>
  );
};

export default InternGroupsList;
