import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { ImageLightbox } from "@/components/ImageLightbox";

import { supabase } from "@/lib/supabaseClient";

interface Program {
  id: number;
  title: string;
  description: string;
  image: string;
  details?: string[];
  color?: string;
}


export default function Programs() {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      const { data } = await supabase.from("programs").select("*");
      setPrograms(data || []);
      setLoading(false);
    };
    fetchPrograms();
  }, []);

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
              Our <span className="gradient-text">Programs & Initiatives</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive programs addressing diverse community needs across Sierra Leone
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-12">Loading programs...</div>
          ) : programs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">No programs found.</div>
          ) : (
            <div className="space-y-12">
              {programs.map((program, index) => (
                <Card
                  key={program.id}
                  className="overflow-hidden border-none shadow-card animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-[2fr,3fr]">
                      <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center items-center">
                        {program.image ? (
                          <img
                            src={program.image}
                            alt={program.title}
                            className="w-full h-56 rounded-lg mb-6 object-cover shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setLightboxImage({ src: program.image!, alt: program.title })}
                          />
                        ) : null}
                        <h3 className="font-heading text-lg font-bold text-center text-foreground px-4">{program.title}</h3>
                      </div>
                      <div className="md:col-span-1 p-8">
                        <p className="text-muted-foreground mb-6 leading-relaxed">{program.description}</p>
                        {/* Optionally render details if present */}
                        {program.details && program.details.length > 0 && (
                          <>
                            <h4 className="font-heading font-semibold text-foreground mb-4">Key Activities:</h4>
                            <ul className="grid sm:grid-cols-2 gap-3">
                              {program.details.map((detail, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Impact CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            See Our Impact in Action
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Discover how our programs are transforming lives and communities across Sierra Leone
            through real stories of change.
          </p>
        </div>
      </section>
    </Layout>
  );
}
