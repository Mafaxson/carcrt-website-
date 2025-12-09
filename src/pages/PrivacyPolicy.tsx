import { Layout } from "@/components/layout/Layout";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-8">
              Privacy Policy
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-6">
                Last updated: November 2024
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                1. Introduction
              </h2>
              <p className="text-muted-foreground mb-6">
                The Coalition for Community Resilience and Transformation (CArCRT) is committed to
                protecting your privacy. This Privacy Policy explains how we collect, use, disclose,
                and safeguard your information when you visit our website or engage with our services.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                2. Information We Collect
              </h2>
              <p className="text-muted-foreground mb-4">We may collect the following types of information:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6">
                <li>Personal information (name, email address, phone number) when you contact us or make donations</li>
                <li>Usage data and analytics about how you interact with our website</li>
                <li>Information you provide through forms and surveys</li>
                <li>Communication preferences</li>
              </ul>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-muted-foreground mb-4">We use your information to:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6">
                <li>Respond to your inquiries and provide support</li>
                <li>Process donations and send receipts</li>
                <li>Send newsletters and updates (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                4. Cookies and Tracking
              </h2>
              <p className="text-muted-foreground mb-6">
                We use cookies and similar tracking technologies to enhance your experience on our
                website. You can control cookie preferences through your browser settings.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                5. Third-Party Services
              </h2>
              <p className="text-muted-foreground mb-6">
                We may use third-party services for analytics, payment processing, and communication.
                These services have their own privacy policies governing the use of your information.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                6. Data Protection
              </h2>
              <p className="text-muted-foreground mb-6">
                We implement appropriate security measures to protect your personal information.
                However, no method of transmission over the internet is 100% secure.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                7. Your Rights
              </h2>
              <p className="text-muted-foreground mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                8. Contact Us
              </h2>
              <p className="text-muted-foreground mb-6">
                If you have questions about this Privacy Policy, please contact us at:
                <br />
                Email: info@carcrt.org
                <br />
                Address: 12 Kandeh Street, Kenema, Sierra Leone
                <br />
                Phone: +232 765 9305
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
