import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';

interface Leader {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  category?: string;
}

const LeadershipList: React.FC = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/leadership.json")
      .then((res) => res.json())
      .then((data) => {
        setLeaders(data.filter((item: Leader) => item.category === "Leadership"));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-8 text-muted-foreground">Loading leadership team...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!leaders.length) return <div className="text-center py-8 text-muted-foreground">No leadership team data found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {leaders.map((leader) => (
        <Card key={leader.id} className="flex flex-col items-center p-4 shadow-lg">
          <img
            src={leader.photo}
            alt={leader.name}
            className="w-32 h-32 object-cover rounded-full mb-4 border-2 border-primary"
            loading="lazy"
          />
          <h3 className="text-lg font-bold text-center">{leader.name}</h3>
          <p className="text-primary-600 text-sm font-medium text-center mb-2">{leader.role}</p>
          <p className="text-gray-600 text-center text-sm">{leader.bio}</p>
        </Card>
      ))}
    </div>
  );
};

export default LeadershipList;
