import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Video, BookOpen, ExternalLink, Users } from "lucide-react";

const resourceCategories = [
  {
    title: "Educational Materials",
    icon: BookOpen,
    resources: [
      {
        name: "Drug Abuse Prevention Guide",
        description: "Comprehensive guide for community leaders on preventing substance abuse among youth",
        type: "PDF",
        size: "2.5 MB",
        downloadUrl: "/resources/drug-prevention-guide.pdf"
      },
      {
        name: "Youth Empowerment Toolkit",
        description: "Tools and strategies for youth development and community engagement",
        type: "PDF",
        size: "1.8 MB",
        downloadUrl: "/resources/youth-empowerment-toolkit.pdf"
      },
      {
        name: "Community Mobilization Manual",
        description: "Step-by-step manual for grassroots community organizing",
        type: "PDF",
        size: "3.2 MB",
        downloadUrl: "/resources/community-mobilization-manual.pdf"
      }
    ]
  },
  {
    title: "Training Videos",
    icon: Video,
    resources: [
      {
        name: "Leadership Development Series",
        description: "5-part video series on effective community leadership",
        type: "Video Playlist",
        duration: "2 hours",
        viewUrl: "https://www.youtube.com"
      },
      {
        name: "Drug Prevention Workshop",
        description: "Recording of our flagship drug prevention training",
        type: "Video",
        duration: "45 min",
        viewUrl: "https://www.youtube.com"
      }
    ]
  },
  {
    title: "Reports & Publications",
    icon: FileText,
    resources: [
      {
        name: "2024 Annual Impact Report",
        description: "Our comprehensive impact assessment for 2024",
        type: "PDF",
        size: "5.1 MB",
        downloadUrl: "/resources/2024-impact-report.pdf"
      },
      {
        name: "Community Needs Assessment",
        description: "Research findings on community challenges and opportunities",
        type: "PDF",
        size: "2.9 MB",
        downloadUrl: "/resources/needs-assessment.pdf"
      },
      {
        name: "Best Practices Guide",
        description: "Proven strategies for community development in Sierra Leone",
        type: "PDF",
        size: "1.5 MB",
        downloadUrl: "/resources/best-practices.pdf"
      }
    ]
  },
  {
    title: "Partner Resources",
    icon: Users,
    resources: [
      {
        name: "Partnership Agreement Template",
        description: "Standard template for organizational partnerships",
        type: "DOCX",
        size: "150 KB",
        downloadUrl: "/resources/partnership-template.docx"
      },
      {
        name: "Grant Application Guide",
        description: "How to apply for CArCRT program grants",
        type: "PDF",
        size: "890 KB",
        downloadUrl: "/resources/grant-application-guide.pdf"
      },
      {
        name: "Monitoring & Evaluation Framework",
        description: "M&E tools for tracking program outcomes",
        type: "XLSX",
        size: "420 KB",
        downloadUrl: "/resources/me-framework.xlsx"
      }
    ]
  }
];

export default function Resources() {
  const handleDownload = (url: string, name: string) => {
    // In production, this would trigger actual file download
    console.log(`Downloading ${name} from ${url}`);
    // You would implement actual download logic here
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Resource <span className="gradient-text">Library</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Access educational materials, training resources, reports, and tools to support
              community development and youth empowerment across Sierra Leone.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-12">
            {resourceCategories.map((category, index) => (
              <div key={category.title} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">{category.title}</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.resources.map((resource, i) => (
                    <Card key={i} className="card-hover border-none shadow-card">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="px-2 py-1 bg-primary/10 rounded text-xs font-medium text-primary">
                              {resource.type}
                            </div>
                          </div>
                          {resource.size && (
                            <span className="text-xs text-muted-foreground">{resource.size}</span>
                          )}
                          {resource.duration && (
                            <span className="text-xs text-muted-foreground">{resource.duration}</span>
                          )}
                        </div>

                        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                          {resource.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {resource.description}
                        </p>

                        {resource.downloadUrl && (
                          <Button
                            onClick={() => handleDownload(resource.downloadUrl!, resource.name)}
                            className="w-full"
                            variant="outline"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                        {resource.viewUrl && (
                          <Button
                            onClick={() => window.open(resource.viewUrl, '_blank')}
                            className="w-full"
                            variant="outline"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Watch Now
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <Card className="border-none shadow-card">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                Need Additional Resources?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Can't find what you're looking for? Contact our team to request specific materials
                or discuss custom training opportunities for your organization.
              </p>
              <Button size="lg" className="btn-primary" onClick={() => window.location.href = '/contact'}>
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
