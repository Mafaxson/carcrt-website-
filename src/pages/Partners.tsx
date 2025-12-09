import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, Handshake, ArrowRight, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getImageUrl } from "@/lib/imageUtils";

export default function Partners() {
  const [partners, setPartners] = useState([]);
  const [coachingPartners, setCoachingPartners] = useState([]);

  useEffect(() => {
    // Load partners and sponsors from local JSON files
    fetch('/data/partners.json')
      .then((res) => res.json())
      .then((data) => setPartners(data))
      .catch((err) => console.error('Error loading partners.json:', err));
    fetch('/data/coaching-partners.json')
      .then((res) => res.json())
      .then((data) => setCoachingPartners(data))
      .catch((err) => console.error('Error loading coaching-partners.json:', err));
  }, []);
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Partners & <span className="gradient-text">Sponsors</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Working together with organizations committed to community transformation
            </p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            title="Our Partners"
            subtitle="Organizations we collaborate with to achieve our mission"
          />
          {partners && partners.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {partners.filter(p => p.type === 'Partner').map((partner) => (
                <Card key={partner.id} className="card-hover border-none shadow-card animate-fade-up overflow-hidden">
                  <CardContent className="flex items-center gap-4 p-6">
                    <img
                      src={partner.logo}
                      alt={partner.name + ' logo'}
                      className="w-20 h-20 object-cover rounded-full border"
                    />
                    <div>
                      <h3 className="font-bold text-lg mb-1">{partner.name}</h3>
                      {partner.website && partner.website !== 'No website' && (
                        <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm flex items-center gap-1">
                          Website <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No partners added yet. Please check back soon.</p>
          )}
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            title="Our Sponsors"
            subtitle="Organizations providing financial support for our programs"
          />
          {partners && partners.filter(p => p.type === 'Sponsor').length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {partners.filter(p => p.type === 'Sponsor').map((sponsor) => (
                <Card key={sponsor.id} className="card-hover border-none shadow-card animate-fade-up overflow-hidden">
                  <CardContent className="flex items-center gap-4 p-6">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name + ' logo'}
                      className="w-20 h-20 object-cover rounded-full border"
                    />
                    <div>
                      <h3 className="font-bold text-lg mb-1">{sponsor.name}</h3>
                      {sponsor.website && sponsor.website !== 'no sit' && (
                        <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm flex items-center gap-1">
                          Website <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No sponsors added yet. Please check back soon.</p>
          )}
        </div>
      </section>

      {/* Coaching Partners Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            title="Coaching Partners"
            subtitle="Community-based organizations we're supporting to drive transformation"
          />
          {coachingPartners && coachingPartners.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {coachingPartners.map((cp) => (
                <Card key={cp.id} className="card-hover border-none shadow-card animate-fade-up overflow-hidden">
                  <CardContent className="flex items-center gap-4 p-6">
                    <img
                      src={cp.logo}
                      alt={cp.name + ' logo'}
                      className="w-20 h-20 object-cover rounded-full border"
                    />
                    <div>
                      <h3 className="font-bold text-lg mb-1">{cp.name}</h3>
                      {cp.website && (
                        <a href={cp.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm flex items-center gap-1">
                          Website <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No coaching partners added yet. Please check back soon.</p>
          )}
        </div>
      </section>
    </Layout>
  );
}
