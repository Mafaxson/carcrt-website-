import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Award, Trophy, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { ImageLightbox } from "@/components/ImageLightbox";
import { supabase } from "@/lib/supabaseClient";
import { getImageUrl } from "@/lib/imageUtils";

interface AwardItem {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

interface Certificate {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

export default function Awards() {
  const [awards, setAwards] = useState<AwardItem[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    fetchAwards();
    fetchCertificates();
  }, []);

  const fetchAwards = async () => {
    try {
      const { data, error } = await supabase
        .from('awards')
        .select('*')
        .order('date', { ascending: false });
      if (data) setAwards(data);
      if (error) console.error('Error fetching awards:', error);
    } catch (error) {
      console.error("Error fetching awards:", error);
    }
  };

  const fetchCertificates = async () => {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('date', { ascending: false });
      if (data) setCertificates(data);
      if (error) console.error('Error fetching certificates:', error);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };
  return (
    <Layout>
      {lightboxImage && (
        <ImageLightbox 
          src={lightboxImage.src} 
          alt={lightboxImage.alt} 
          onClose={() => setLightboxImage(null)} 
        />
      )}
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Awards & <span className="gradient-text">Recognition</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Celebrating our achievements and the recognition of our community impact
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            title="Our Journey of Recognition"
            subtitle="Milestones in our commitment to community transformation"
          />

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary" />

              {/* Timeline Items */}
              {awards.map((award, index) => (
                <div
                  key={award.id}
                  className={`relative flex items-center mb-12 animate-fade-up ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"} pl-20 md:pl-0`}>
                    <div className="bg-card rounded-2xl p-6 shadow-card">
                      <span className="inline-block px-3 py-1 text-sm font-medium text-primary-foreground bg-primary rounded-full mb-3">
                        {new Date(award.date).getFullYear()}
                      </span>
                      {award.image && (
                        <img 
                          src={getImageUrl(award.image)} 
                          alt={award.title}
                          className="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => setLightboxImage({ src: getImageUrl(award.image), alt: award.title })}
                        />
                      )}
                      <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                        {award.title}
                      </h3>
                      <p className="text-muted-foreground mb-2">{award.description}</p>
                      <p className="text-sm text-primary font-medium">{award.date}</p>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg z-10">
                    <Trophy className="h-5 w-5 text-primary-foreground" />
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <SectionHeader
            title="Certificates & Achievements"
            subtitle="Documentation of our recognized contributions"
          />

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {certificates.length > 0 ? (
              certificates.map((cert, i) => (
                <div
                  key={cert.id}
                  className="bg-card rounded-2xl p-8 shadow-card text-center animate-fade-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <img 
                    src={getImageUrl(cert.image)} 
                    alt={cert.title}
                    className="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setLightboxImage({ src: getImageUrl(cert.image), alt: cert.title })}
                  />
                  <h3 className="font-semibold text-foreground mb-2">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{cert.description}</p>
                  <p className="text-xs text-muted-foreground/60">{cert.date}</p>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-muted-foreground py-8">
                No certificates uploaded yet
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Recognition CTA */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-custom text-center">
          <Star className="h-12 w-12 mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Every Recognition Fuels Our Mission
          </h2>
          <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto">
            These awards reflect the dedication of our team, partners, and the communities
            we serve. Together, we continue building resilient futures.
          </p>
        </div>
      </section>
    </Layout>
  );
}
