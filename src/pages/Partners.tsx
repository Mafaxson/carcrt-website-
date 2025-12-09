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

  useEffect(() => {
    const fetchPartners = async () => {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('created_at', { ascending: true });
      if (data) setPartners(data);
      if (error) console.error('Error fetching partners:', error);
    };
    fetchPartners();
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

      {/* Affiliate Partners Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            title="Our Affiliate Partners"
            subtitle="Community-based organizations we're supporting to drive transformation"
          />

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="card-hover border-none shadow-card animate-fade-up overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                    <img
                      src={getImageUrl('/uploads/1764943938537-WhatsApp Image 2025-12-05 at 13.55.47_0022de53.jpg')}
                      alt="Restoring AgriSolution Enterprises"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-xl text-foreground mb-1">
                      Restoring AgriSolution Enterprises
                    </h3>
                    <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      Agriculture, Food Security, Youth & Women Empowerment
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  Restoring AgriSolution Enterprises is a social-impact agribusiness dedicated to transforming agriculture and empowering communities in Sierra Leone...
                </p>

                <div className="flex items-center gap-3">
                  <Link to="/coaching-partners/restoring-agrisolution-enterprises">
                    <Button variant="default" size="sm" className="gap-2">
                      View Details
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <SectionHeader
            title="Our Partners"
            subtitle="Organizations we collaborate with to achieve our mission"
          />

          {partners.filter(p => p.type === 'Partner').length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No partners added yet. Please check back soon.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.filter(p => p.type === 'Partner').map((partner, index) => (
                <Card
                  key={partner.id}
                  className="card-hover border-none shadow-card animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    {partner.logo ? (
                      <div className="w-16 h-16 mb-4 overflow-hidden rounded-xl">
                        <img 
                          src={partner.logo?.startsWith('http') ? partner.logo : getImageUrl(partner.logo)} 
                          alt={partner.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mb-4">
                        <Building2 className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <span className="text-xs font-medium text-primary uppercase tracking-wide">
                      {partner.type}
                    </span>
                    <h3 className="font-heading font-semibold text-lg text-foreground mt-1 mb-2">
                      {partner.name}
                    </h3>
                    {partner.website && (
                      <a 
                        href={partner.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        Visit Website →
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
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

          {partners.filter(p => p.type === 'Sponsor').length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No sponsors added yet. Please check back soon.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.filter(p => p.type === 'Sponsor').map((sponsor, index) => (
                <Card
                  key={sponsor.id}
                  className="card-hover border-none shadow-card animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    {sponsor.logo ? (
                      <div className="w-16 h-16 mb-4 overflow-hidden rounded-xl">
                        <img 
                          src={sponsor.logo?.startsWith('http') ? sponsor.logo : getImageUrl(sponsor.logo)} 
                          alt={sponsor.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mb-4">
                        <Building2 className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <span className="text-xs font-medium text-primary uppercase tracking-wide">
                      {sponsor.type}
                    </span>
                    <h3 className="font-heading font-semibold text-lg text-foreground mt-1 mb-2">
                      {sponsor.name}
                    </h3>
                    {sponsor.website && (
                      <a 
                        href={sponsor.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        Visit Website →
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Partnership CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <Handshake className="h-12 w-12 mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Become a Partner
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join our network of partners and sponsors to create meaningful impact
            in communities across Sierra Leone.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
              Explore Partnership
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
