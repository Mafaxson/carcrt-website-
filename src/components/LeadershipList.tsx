import React, { useEffect, useState } from 'react';
import leadershipData from '@/../data/leadership.json';
import { Card } from './ui/card';

interface Leader {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
}

const LeadershipList: React.FC = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);

  useEffect(() => {
    setLeaders(leadershipData as Leader[]);
  }, []);

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
