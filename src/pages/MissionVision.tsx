import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart, Users, Lightbulb, Shield, Leaf, Star } from "lucide-react";

const coreValues = [
  {
    icon: Heart,
    title: "Equity & Inclusion",
    description: "Ensuring equal opportunities and access for all community members regardless of background.",
  },
  {
    icon: Users,
    title: "Collaboration & Partnership",
    description: "Working together with diverse stakeholders to achieve shared goals and lasting impact.",
  },
  {
    icon: Shield,
    title: "Resilience & Adaptability",
    description: "Building communities that can withstand challenges and adapt to changing circumstances.",
  },
  {
    icon: Lightbulb,
    title: "Innovation & Transformation",
    description: "Embracing new approaches and creative solutions to address complex community challenges.",
  },
  {
    icon: Star,
    title: "Integrity & Accountability",
    description: "Maintaining the highest standards of transparency and responsibility in all our work.",
  },
  {
    icon: Leaf,
    title: "Sustainability & Stewardship",
    description: "Protecting resources and ensuring our impact endures for future generations.",
  },
  {
    icon: Target,
    title: "Empowerment & Leadership",
    description: "Nurturing local leadership and enabling communities to lead their own development.",
  },
];

export default function MissionVision() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Mission, Vision & <span className="gradient-text">Core Values</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              The guiding principles that drive our work and define who we are
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-primary rounded-3xl p-8 md:p-12 text-primary-foreground animate-fade-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-primary-foreground/10 rounded-2xl">
                  <Target className="h-10 w-10" />
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg text-primary-foreground/90 leading-relaxed">
                The Coalition for Community Resilience and Transformation is dedicated to empowering
                communities to thrive in the face of change. We unite diverse voices, resources,
                and innovations to build resilience, foster equity, and drive sustainable transformation.
              </p>
              <p className="text-lg text-primary-foreground/90 leading-relaxed mt-4">
                Through collaboration, advocacy, and action, we strengthen local capacity, nurture
                inclusive leadership, and create pathways toward social, economic, and environmental
                well-being. Our mission is to ensure that every community has the tools, support,
                and opportunities to adapt, recover, and flourish—today and for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-accent rounded-3xl p-8 md:p-12 text-accent-foreground animate-fade-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-accent-foreground/10 rounded-2xl">
                  <Eye className="h-10 w-10" />
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold">Our Vision</h2>
              </div>
              <p className="text-2xl md:text-3xl font-heading font-semibold text-accent-foreground">
                "Building resilient communities, transforming futures."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            title="Our Core Values"
            subtitle="The principles that guide every decision we make and every action we take"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {coreValues.map((value, index) => (
              <Card
                key={index}
                className="card-hover border-none shadow-card animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6">
                  <div className={`inline-flex p-3 rounded-xl mb-4 ${
                    index % 3 === 0 ? "bg-carcrt-light-blue text-primary" :
                    index % 3 === 1 ? "bg-carcrt-light-pink text-accent" :
                    "bg-carcrt-light-gold text-secondary"
                  }`}>
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
