import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/lib/SupabaseClient";

export default function PartnersAndSponsors() {
  const [partners, setPartners] = useState([]);
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data: partnersData } = await supabase
        .from("partners_and_sponsors")
        .select("name, website_url, logo_url")
        .eq("category", "partner")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      const { data: sponsorsData } = await supabase
        .from("partners_and_sponsors")
        .select("name, website_url, logo_url")
        .eq("category", "sponsor")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      setPartners(partnersData || []);
      setSponsors(sponsorsData || []);
    }
    fetchData();
  }, []);

  return (
    <>
      {/* Partners Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            title="Our Partners"
            subtitle="Organizations we collaborate with to achieve our mission"
          />
          {partners.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {partners.map((partner) => (
                <Card key={partner.name} className="card-hover border-none shadow-card animate-fade-up overflow-hidden">
                  <CardContent className="flex items-center gap-4 p-6">
                    {partner.logo_url ? (
                      <a href={partner.website_url || "#"} target="_blank" rel="noopener noreferrer">
                        <img
                          src={partner.logo_url}
                          alt={partner.name + " logo"}
                          className="w-20 h-20 object-cover rounded-full border"
                        />
                      </a>
                    ) : (
                      <div className="w-20 h-20 flex items-center justify-center bg-muted rounded-full border">
                        <span className="text-xs text-muted-foreground text-center">No Logo</span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-lg mb-1">{partner.name}</h3>
                      {partner.website_url && (
                        <a
                          href={partner.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline text-sm flex items-center gap-1"
                        >
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
          {sponsors.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {sponsors.map((sponsor) => (
                <Card key={sponsor.name} className="card-hover border-none shadow-card animate-fade-up overflow-hidden">
                  <CardContent className="flex items-center gap-4 p-6">
                    {sponsor.logo_url ? (
                      <a href={sponsor.website_url || "#"} target="_blank" rel="noopener noreferrer">
                        <img
                          src={sponsor.logo_url}
                          alt={sponsor.name + " logo"}
                          className="w-20 h-20 object-cover rounded-full border"
                        />
                      </a>
                    ) : (
                      <div className="w-20 h-20 flex items-center justify-center bg-muted rounded-full border">
                        <span className="text-xs text-muted-foreground text-center">No Logo</span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-lg mb-1">{sponsor.name}</h3>
                      {sponsor.website_url && (
                        <a
                          href={sponsor.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline text-sm flex items-center gap-1"
                        >
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
    </>
  );
}
