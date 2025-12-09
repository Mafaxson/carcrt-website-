import { Layout } from "@/components/layout/Layout";

export default function TermsOfUse() {
  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-8">
              Terms of Use
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-6">
                Last updated: November 2024
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground mb-6">
                By accessing and using this website, you accept and agree to be bound by these Terms
                of Use. If you do not agree to these terms, please do not use our website.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                2. Website Usage
              </h2>
              <p className="text-muted-foreground mb-4">You agree to use this website only for lawful purposes and in a way that:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6">
                <li>Does not infringe the rights of others</li>
                <li>Does not restrict or inhibit anyone's use of the website</li>
                <li>Does not transmit harmful content or malware</li>
                <li>Complies with all applicable laws and regulations</li>
              </ul>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                3. Intellectual Property
              </h2>
              <p className="text-muted-foreground mb-6">
                All content on this website, including text, graphics, logos, images, and software,
                is the property of CArCRT or its content suppliers and is protected by Sierra Leone
                and international copyright laws. You may not reproduce, distribute, or create
                derivative works without our express written permission.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                4. User Content
              </h2>
              <p className="text-muted-foreground mb-6">
                Any content you submit through our website (such as form submissions or comments)
                remains your property, but you grant CArCRT a non-exclusive license to use, display,
                and distribute such content in connection with our mission and activities.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                5. Donations
              </h2>
              <p className="text-muted-foreground mb-6">
                All donations made through this website are voluntary and non-refundable. Donation
                receipts will be provided for tax purposes where applicable. CArCRT reserves the
                right to use donations for programs that best serve our mission.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                6. Disclaimer of Warranties
              </h2>
              <p className="text-muted-foreground mb-6">
                This website is provided "as is" without any warranties, expressed or implied.
                CArCRT does not warrant that the website will be uninterrupted, error-free, or
                free of viruses or other harmful components.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                7. Limitation of Liability
              </h2>
              <p className="text-muted-foreground mb-6">
                CArCRT shall not be liable for any direct, indirect, incidental, consequential,
                or punitive damages arising from your use of or inability to use this website.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                8. Links to Third-Party Sites
              </h2>
              <p className="text-muted-foreground mb-6">
                Our website may contain links to third-party websites. These links are provided
                for convenience only, and CArCRT is not responsible for the content or practices
                of linked sites.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                9. Governing Law
              </h2>
              <p className="text-muted-foreground mb-6">
                These Terms of Use shall be governed by and construed in accordance with the laws
                of the Republic of Sierra Leone. Any disputes arising from these terms shall be
                subject to the exclusive jurisdiction of the courts of Sierra Leone.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                10. Changes to Terms
              </h2>
              <p className="text-muted-foreground mb-6">
                CArCRT reserves the right to modify these Terms of Use at any time. Changes will
                be posted on this page with an updated revision date.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
                11. Contact Information
              </h2>
              <p className="text-muted-foreground mb-6">
                For questions about these Terms of Use, please contact us at:
                <br />
                Email: info@carcrt.org
                <br />
                Address: 12 Kandeh Street, Kenema, Sierra Leone
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
