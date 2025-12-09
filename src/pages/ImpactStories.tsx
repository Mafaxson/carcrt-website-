import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { ShareStoryForm } from "@/components/ShareStoryForm";

export interface SubmittedStory {
  id: string;
  name: string;
  email: string;
  story: string;
  category: string;
  imagePreview: string;
  timestamp: Date;
}

const stories = [
  {
    title: "From Risk to Resilience: Youth Transformation in Kenema",
    category: "Drug Abuse Prevention",
    summary: "A powerful story of a recovering youth who became a peer educator, now helping others overcome substance abuse challenges.",
    quote: "CArCRT gave me a second chance. Now I help others find their path to recovery and purpose.",
    author: "Youth Peer Educator, Kenema",
    image: "bg-gradient-to-br from-primary to-primary/70",
  },
  {
    title: "Women Farmers Leading Climate Adaptation",
    category: "Food Security & Women Empowerment",
    summary: "How our agriculture and livelihood empowerment programs have transformed women into community leaders in sustainable farming.",
    quote: "I learned new farming techniques that doubled my harvest. Now I train other women in my village.",
    author: "Women's Cooperative Leader, Eastern Province",
    image: "bg-gradient-to-br from-secondary to-secondary/70",
  },
  {
    title: "Clean Water, Healthy Communities",
    category: "WASH",
    summary: "The impact of our WASH projects in reducing waterborne diseases and improving community health outcomes.",
    quote: "Before the water point, our children were always sick. Now they're healthy and attending school regularly.",
    author: "Community Health Worker",
    image: "bg-gradient-to-br from-accent to-accent/70",
  },
];

const testimonials = [
  {
    quote: "CArCRT's programs have transformed our community. The youth are now engaged in productive activities instead of substance abuse.",
    author: "Community Chief, Kenema District",
  },
  {
    quote: "The training I received has given me the skills to support my family and contribute to my community.",
    author: "Program Beneficiary",
  },
  {
    quote: "Working with CArCRT has shown us what true community partnership looks like.",
    author: "Development Partner Representative",
  },
];

export default function ImpactStories() {
  const [submittedStories, setSubmittedStories] = useState<SubmittedStory[]>([]);

  // Fetch stories from backend
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data, error } = await supabase
          .from('submissions')
          .select('*')
          .eq('type', 'story')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });
        
        if (data) {
          const approvedStories = data.map((story: any) => ({
            id: story.id,
            name: story.data?.name || 'Anonymous',
            email: story.data?.email || '',
            story: story.data?.story || '',
            category: story.data?.category || 'General',
            imagePreview: story.data?.imageUrl || '',
            timestamp: new Date(story.created_at),
            }));
          setSubmittedStories(approvedStories);
        }
      } catch (error) {
        console.error("Failed to fetch stories:", error);
      }
    };

    fetchStories();
  }, []);

  const handleStorySubmit = (story: SubmittedStory) => {
    // Add to local state for immediate display
    setSubmittedStories((prev) => [story, ...prev]);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              <span className="gradient-text">Impact Stories</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Real stories of transformation and resilience from communities across Sierra Leone
            </p>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            title="Featured Stories"
            subtitle="Discover how our programs are making a difference"
          />

          <div className="grid gap-8">
            {stories.map((story, index) => (
              <Card
                key={index}
                className="overflow-hidden border-none shadow-card animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    <div className={`${story.image} p-8 md:p-12 text-primary-foreground min-h-[300px] flex flex-col justify-end`}>
                      <span className="text-sm font-medium opacity-80 mb-2">{story.category}</span>
                      <h3 className="font-heading text-2xl font-bold">{story.title}</h3>
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <p className="text-muted-foreground mb-6">{story.summary}</p>
                      <blockquote className="border-l-4 border-primary pl-4 mb-4">
                        <p className="text-foreground italic">"{story.quote}"</p>
                      </blockquote>
                      <p className="text-sm text-muted-foreground">— {story.author}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <SectionHeader
            title="Voices from the Community"
            subtitle="Hear what our beneficiaries and partners have to say"
          />

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="card-hover border-none shadow-card animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary/30 mb-4" />
                  <p className="text-foreground italic mb-4">"{testimonial.quote}"</p>
                  <p className="text-sm text-muted-foreground">— {testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Shared Stories */}
      {submittedStories.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-custom">
            <SectionHeader
              title="Recently Shared Stories"
              subtitle="Stories just shared by our community members"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {submittedStories.map((story) => (
                <Card
                  key={story.id}
                  className="overflow-hidden border-none shadow-card card-hover animate-fade-up h-full flex flex-col"
                >
                  <CardContent className="p-0 flex flex-col h-full">
                    {story.imagePreview && (
                      <img
                        src={story.imagePreview}
                        alt={story.name}
                        className="w-full h-72 object-cover object-center flex-shrink-0"
                      />
                    )}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                          {story.category}
                        </span>
                        <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                          {story.name}'s Story
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-4">
                          {story.story}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Shared {new Date(story.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Share Your Story Form */}
      <ShareStoryForm onStorySubmit={handleStorySubmit} />
    </Layout>
  );
}
