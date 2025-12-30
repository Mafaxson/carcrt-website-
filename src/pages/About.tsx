
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Target, Globe, Handshake } from "lucide-react";
import LeadershipList from "@/components/LeadershipList";
import CoordinatorsList from "@/components/CoordinatorsList";
import InternGroupsList from "@/components/InternGroupsList";

const highlights = [
  {
    icon: Users,
    title: "Community-Rooted",
    description: "Based in Kenema, deeply connected to local communities",
  },
  {
    icon: Target,
    title: "Strategic Interventions",
    description: "Evidence-based programs that create lasting impact",
  },
  {
    icon: Globe,
    title: "Nationally Engaged",
    description: "Working within 5 districts in Sierra Leone",
  },
  {
    icon: Handshake,
    title: "Multisectoral Collaboration",
    description: "Partnering with civil society, government, and development organizations",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              About <span className="gradient-text">CArCRT</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Coalition for Community Resilience and Transformation
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">Our Leadership</h2>
          <p className="text-lg text-muted-foreground mb-8 text-center">Meet the dedicated team driving community transformation across Sierra Leone</p>
          <LeadershipList />
        </div>
      </section>

      {/* What We Do Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <SectionHeader
            title="What We Do"
            subtitle="Our comprehensive approach to community development"
          />

          <div className="max-w-4xl mx-auto">
                      <div className="space-y-6">
                        <div className="bg-background rounded-2xl p-8 shadow-card animate-fade-up">
                          <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                            Strategic Community Interventions
                          </h3>
                          <p className="text-muted-foreground">
                            We design and implement programs that address the root causes of community
                            challenges, from drug abuse prevention to climate change adaptation. Our
                            interventions are evidence-based and tailored to local contexts.
                          </p>
                        </div>

                        <div className="bg-background rounded-2xl p-8 shadow-card animate-fade-up delay-100">
                          <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                            Capacity Building & Empowerment
                          </h3>
                          <p className="text-muted-foreground">
                            We invest in developing local leadership, providing training and resources
                            that enable community members to lead their own development initiatives and
                            create sustainable change.
                          </p>
                        </div>

                        <div className="bg-background rounded-2xl p-8 shadow-card animate-fade-up delay-200">
                          <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                            Advocacy & Policy Engagement
                          </h3>
                          <p className="text-muted-foreground">
                            We amplify community voices in policy discussions, advocating for inclusive
                            policies that support resilient and equitable development across Sierra Leone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* CTA Section */}
                <section className="section-padding bg-primary text-primary-foreground">
                  <div className="container-custom text-center">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                      Want to Learn More?
                    </h2>
                    <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                      Discover our leadership team, explore our programs, or get in touch to learn how
                      you can be part of our mission.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Link to="/leadership">
                        <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                          Meet Our Team
                        </Button>
                      </Link>
                      <Link to="/contact">
                        <Button
                          size="lg"
                          variant="outline"
                          className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                        >
                          Contact Us
                        </Button>
                      </Link>
                    </div>
                  </div>
                </section>
    </Layout>
  );
}
