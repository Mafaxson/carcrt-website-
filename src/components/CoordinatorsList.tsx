import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';

interface Coordinator {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  category?: string;
}

const CoordinatorsList: React.FC = () => {
  const [coordinators, setCoordinators] = useState<Coordinator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/leadership.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load coordinators data');
        return res.json();
      })
      .then((json) => {
        setCoordinators(json.filter((c: Coordinator) => c.category === 'Coordinator'));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-8 text-muted-foreground">Loading coordinators...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!coordinators.length) return <div className="text-center py-8 text-muted-foreground">No coordinators found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {coordinators.map((coordinator) => (
        <Card key={coordinator.id} className="flex flex-col items-center p-4 shadow-lg">
          <img
            src={coordinator.photo}
            alt={coordinator.name}
            className="w-32 h-32 object-cover rounded-full mb-4 border-2 border-primary"
            loading="lazy"
          />
          <h3 className="text-lg font-bold text-center">{coordinator.name}</h3>
          <p className="text-primary-600 text-sm font-medium text-center mb-2">{coordinator.role}</p>
          <p className="text-gray-600 text-center text-sm">{coordinator.bio}</p>
        </Card>
      ))}
    </div>
  );
};

export default CoordinatorsList;
