import { Layout } from "@/components/layout/Layout";

export default function Accessibility() {
  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-8">
              Accessibility Statement
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-6">
                Last updated: November 2024
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                Our Commitment
              </h2>
              <p className="text-muted-foreground mb-6">
                The Coalition for Community Resilience and Transformation (CArCRT) is committed to
                ensuring digital accessibility for people with disabilities. We are continually
                improving the user experience for everyone and applying the relevant accessibility
                standards.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                Conformance Status
              </h2>
              <p className="text-muted-foreground mb-6">
                We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA
                standards. These guidelines explain how to make web content more accessible for people
                with disabilities and more user-friendly for everyone.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                Accessibility Features
              </h2>
              <p className="text-muted-foreground mb-4">Our website includes the following accessibility features:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6">
                <li><strong>Alternative text:</strong> All images include descriptive alt text</li>
                <li><strong>Keyboard navigation:</strong> The website can be navigated using only a keyboard</li>
                <li><strong>Clear headings:</strong> Content is organized with clear, hierarchical headings</li>
                <li><strong>Color contrast:</strong> Text and background colors meet contrast ratio requirements</li>
                <li><strong>Resizable text:</strong> Text can be resized without loss of content or functionality</li>
                <li><strong>Focus indicators:</strong> Clear visual indicators show which element has keyboard focus</li>
                <li><strong>Form labels:</strong> All form fields have associated labels</li>
                <li><strong>Skip links:</strong> Skip navigation links help users bypass repetitive content</li>
              </ul>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                Assistive Technologies
              </h2>
              <p className="text-muted-foreground mb-6">
                Our website is designed to be compatible with assistive technologies, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6">
                <li>Screen readers (NVDA, JAWS, VoiceOver)</li>
                <li>Screen magnification software</li>
                <li>Speech recognition software</li>
                <li>Alternative keyboards and input devices</li>
              </ul>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                Known Limitations
              </h2>
              <p className="text-muted-foreground mb-6">
                While we strive for accessibility, some content may have limitations. We are actively
                working to address these issues and improve accessibility across all pages.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                Feedback and Contact
              </h2>
              <p className="text-muted-foreground mb-6">
                We welcome your feedback on the accessibility of our website. If you encounter any
                accessibility barriers or have suggestions for improvement, please contact us:
              </p>
              <ul className="list-none text-muted-foreground mb-6">
                <li><strong>Email:</strong> info@carcrt.org</li>
                <li><strong>Phone:</strong> +232 765 9305</li>
                <li><strong>Address:</strong> 12 Kandeh Street, Kenema, Sierra Leone</li>
              </ul>
              <p className="text-muted-foreground mb-6">
                We try to respond to accessibility feedback within 5 business days and will work
                with you to provide the information or service you seek through an alternative
                communication method if needed.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                Continuous Improvement
              </h2>
              <p className="text-muted-foreground mb-6">
                We are committed to continuously improving the accessibility of our website. We
                regularly review our site and implement improvements to ensure all users can
                access our content and services.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
