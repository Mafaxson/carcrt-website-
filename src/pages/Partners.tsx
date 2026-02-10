import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, Handshake, ArrowRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { getImageUrl } from "@/lib/imageUtils";
import { useNavigate } from "react-router-dom";

const partners = [
  {
    id: 1,
    name: "Restoring AgriSolution Enterprises",
    description:
      "Restoring AgriSolution Enterprises is a social-impact agribusiness committed to transforming rural livelihoods through sustainable agriculture, value chain development, and climate-smart innovations. Operating in Sierra Leone, the enterprise aims to increase food security, generate employment, and empower smallholder farmers particularly women and youth through integrated services and market access. Restoring AgriSolution Enterprises is a dynamic agri-business established in 2021 in Nongowa chiefdom. As a locally rooted enterprise, it is committed to cultivating crops and providing training on Agri business for women and youths with a strategic focus on rice, cassava, potato, Vegetables and maize farming. Restoring AgriSolution Enterprises concentrates on improving production, processing, and marketing. Despite facing significant hurdles including poor road infrastructure, pest infestations, erratic weather patterns, and the high cost of equipment the enterprise continues to apply innovative and climate-smart farming techniques to drive impact and resilience. At the heart of Restoring AgriSolution Enterprise's mission is a deep concern for food insecurity among vulnerable populations. Over 80% of children from low-income households lack access to nutritious, high-quality food, leading to widespread malnutrition, illness, and preventable deaths. Alarmingly, 70% of these children's parents are unemployed or underpaid youth and single mothers, whose limited livelihood options further compound the crisis. Through its work, RestoringAgriSolution Enterprises seeks not only to produce food, but to nurture hope, restore dignity, and empower communities especially youth and women by creating inclusive agricultural opportunities and contributing to a healthier, more food-secure Sierra Leone.",
    focus: "Agriculture, Food Security, Youth & Women Empowerment",
    logo: "/logos/restoring-agrisolution.png",
    type: "affiliate",
    gallery: [
      { image: "/gallery/restoring-agri-1.jpg", caption: "Training session" },
      { image: "/gallery/restoring-agri-2.jpg", caption: "Harvest day" },
      { image: "/gallery/restoring-agri-3.jpg", caption: "Community outreach" },
    ],
  },
  { id: 2, name: "Sierra Leone Red Cross", logo: "/logos/sierra-leone-red-cross.png", type: "partner" },
  { id: 3, name: "Cross of Christ Association Sierra Leone", logo: "/logos/cross-of-christ.png", type: "partner" },
  { id: 4, name: "Widows Empowerment SL", logo: "/logos/widows-empowerment.png", type: "partner" },
  { id: 5, name: "Helping Hands Foundation", logo: "/logos/helping-hands.png", type: "partner" },
  { id: 6, name: "AfrikSpark Tech Solutions", logo: "/logos/afrikspark.png", type: "partner", website: "https://afrikspark.com" },
  { id: 7, name: "Trading Organic", logo: "/logos/trading-organic.png", type: "sponsor" },
];

export default function Partners() {
  const navigate = useNavigate();
  const affiliate = partners.find((p) => p.type === "affiliate");
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
      {/* Restoring AgriSolution Enterprises Section (Affiliate Partner) */}
      {affiliate && (
        <section className="section-padding bg-background">
          <div className="container-custom">
            <SectionHeader
              title={affiliate.name}
              subtitle="Community-based organization we're supporting to drive transformation"
            />
            <div className="flex flex-col md:flex-row gap-8 items-center mb-4">
              {affiliate.logo ? (
                <img
                  src={affiliate.logo.startsWith("http") ? affiliate.logo : getImageUrl(affiliate.logo)}
                  alt={affiliate.name + " logo"}
                  className="w-32 h-32 object-cover rounded-full border mb-4 md:mb-0"
                />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center bg-muted rounded-full border mb-4 md:mb-0">
                  <span className="text-xs text-muted-foreground text-center">No Logo</span>
                </div>
              )}
              <div className="flex-1">
                <div className="inline-block px-3 py-1 mb-2 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                  Affiliate Partner
                </div>
                <p className="mb-2 text-muted-foreground line-clamp-4">{affiliate.description}</p>
                <div className="text-sm text-muted-foreground mb-1">
                  <b>Focus:</b> {affiliate.focus}
                </div>
                <Button className="mt-3" onClick={() => navigate("/partners/restoring-agrisolution-enterprises")}>
                  View Details
                </Button>
                
              </div>
            </div>
          </div>
        </section>
      )}
      {/* Partners Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeader
            title="Our Partners"
            subtitle="Organizations we collaborate with to achieve our mission"
          />
          {partners.filter((p) => p.type === "partner").length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {partners.filter((p) => p.type === "partner").map((partner) => (
                <Card key={partner.id} className="card-hover border-none shadow-card animate-fade-up overflow-hidden">
                  <CardContent className="flex items-center gap-4 p-6">
                    {partner.logo ? (
                      <img
                        src={partner.logo.startsWith("http") ? partner.logo : getImageUrl(partner.logo)}
                        alt={partner.name + " logo"}
                        className="w-20 h-20 object-cover rounded-full border"
                      />
                    ) : (
                      <div className="w-20 h-20 flex items-center justify-center bg-muted rounded-full border">
                        <span className="text-xs text-muted-foreground text-center">No Logo</span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-lg mb-1">{partner.name}</h3>
                      {partner.website && partner.website !== "No website" && (
                        <a
                          href={partner.website}
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
          {partners.filter((p) => p.type === "sponsor").length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {partners.filter((p) => p.type === "sponsor").map((sponsor) => (
                <Card key={sponsor.id} className="card-hover border-none shadow-card animate-fade-up overflow-hidden">
                  <CardContent className="flex items-center gap-4 p-6">
                    {sponsor.logo ? (
                      <img
                        src={sponsor.logo.startsWith("http") ? sponsor.logo : getImageUrl(sponsor.logo)}
                        alt={sponsor.name + " logo"}
                        className="w-20 h-20 object-cover rounded-full border"
                      />
                    ) : (
                      <div className="w-20 h-20 flex items-center justify-center bg-muted rounded-full border">
                        <span className="text-xs text-muted-foreground text-center">No Logo</span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-lg mb-1">{sponsor.name}</h3>
                      {sponsor.website && sponsor.website !== "no sit" && (
                        <a
                          href={sponsor.website}
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
    </Layout>
  );
}
