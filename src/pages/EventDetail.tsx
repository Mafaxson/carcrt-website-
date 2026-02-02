import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, ExternalLink, Download, Mail } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ImageLightbox } from "@/components/ImageLightbox";
import { supabase } from "@/lib/supabaseClient";
import { getImageUrl } from "@/lib/imageUtils";



const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
        if (error || !data) {
          navigate("/events");
        } else {
          setEvent(data);
        }
      } catch (error) {
        console.error("Error loading event from Supabase:", error);
        navigate("/events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading event...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <Layout>
      {lightboxImage && (
        <ImageLightbox 
          src={lightboxImage.src} 
          alt={lightboxImage.alt} 
          onClose={() => setLightboxImage(null)} 
        />
      )}
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-12">
        <div className="container mx-auto px-4 py-12">
          {/* Back Button */}
          <Link to="/events">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Button>
          </Link>

          {/* Event Header */}
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4">{event.status === "upcoming" ? "Upcoming" : event.status === "ongoing" ? "Ongoing" : "Past Event"}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span className="text-lg">
                  {event.event_date && new Date(event.event_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span className="text-lg">{event.location}</span>
                </div>
              )}
            </div>

            {/* Event Image */}
            {event.image_url && (
              <div className="mb-8 rounded-lg overflow-hidden shadow-lg cursor-pointer" onClick={() => setLightboxImage({ src: getImageUrl(event.image_url), alt: event.title })}>
                <img 
                  src={getImageUrl(event.image_url)}
                  alt={event.title}
                  className="w-full h-auto object-cover max-h-[500px] hover:opacity-90 transition-opacity"
                />
              </div>
            )}

            {/* Description */}
            <div className="prose prose-lg max-w-none mb-8">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed text-lg">
                {event.description}
              </div>
            </div>

            {/* Registration Section */}
            {event.status === "upcoming" && (
              <div className="bg-primary/10 rounded-lg p-6 mb-8">
                {event.applicationPdf ? (
                  <>
                    <h3 className="font-semibold text-xl mb-4 text-center">Application Process</h3>
                    <div className="space-y-4">
                      <div className="bg-card rounded-lg p-4 border">
                        <p className="text-muted-foreground mb-4">
                          Download the application form to register for this event.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <a
                            href={getImageUrl(event.applicationPdf)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex"
                          >
                            <Button size="lg" variant="default" className="gap-2 w-full sm:w-auto">
                              <Download className="h-5 w-5" />
                              Download Application Form
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
                ) : event.registrationLink ? (
                  <div className="text-center">
                    <h3 className="font-semibold text-xl mb-4">Ready to Join Us?</h3>
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="lg" className="gap-2">
                        <ExternalLink className="h-5 w-5" />
                        Register Now
                      </Button>
                    </a>
                  </div>
                ) : null}
              </div>
            )}

            {/* Back Button at Bottom */}
            <div className="mt-12 pt-8 border-t">
              <Link to="/events">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;
