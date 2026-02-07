import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";

interface Leader {
  id: string;
  name: string;
  title: string;
  year?: string;
  category: string;
}

export default function Leadership() {
  const [leadershipTeam, setLeadershipTeam] = useState<Leader[]>([]);
  const [coordinators, setCoordinators] = useState<Leader[]>([]);
  const [internships, setInternships] = useState<Leader[]>([]);

  useEffect(() => {
    const fetchLeadership = async () => {
      const { data, error } = await supabase
        .from("leadership")
        .select("*");

      if (error) {
        console.error("Supabase Leadership Fetch Exception:", error);
        return;
      }

      setLeadershipTeam((data || []).filter((item: Leader) => item.category === "Leadership Team"));
      setCoordinators((data || []).filter((item: Leader) => item.category === "Coordinator"));
      setInternships((data || []).filter((item: Leader) => item.category === "Internship"));
    };

    fetchLeadership();
  }, []);

  return (
    <div>
      <section>
        <h2>Leadership Team</h2>
        {leadershipTeam.length > 0 ? (
          leadershipTeam.map(item => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.title}</p>
            </div>
          ))
        ) : (
          <p>No leadership team data found.</p>
        )}
      </section>

      <section>
        <h2>Meet Our Coordinators</h2>
        {coordinators.length > 0 ? (
          coordinators.map(item => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.title}</p>
            </div>
          ))
        ) : (
          <p>No coordinators found.</p>
        )}
      </section>

      <section>
        <h2>Internship Cohorts</h2>
        {internships.length > 0 ? (
          internships.map(item => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.year}</p>
            </div>
          ))
        ) : (
          <p>No intern groups found.</p>
        )}
      </section>
    </div>
  );
}
