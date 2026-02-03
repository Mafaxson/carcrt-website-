import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import logo from "@/assets/logo.png";

const quickLinks = [
  { label: "About Us", path: "/about" },
  { label: "Programs", path: "/programs" },
  { label: "Get Involved", path: "/get-involved" },
  { label: "Contact", path: "/contact" },
  { label: "Donate", path: "/donate" },
];

const resourceLinks = [
  { label: "News & Blog", path: "/news" },
  { label: "Events", path: "/events" },
  { label: "Resources", path: "/resources" },
  { label: "Impact Stories", path: "/impact-stories" },
  { label: "Partners", path: "/partners" },
];

const legalLinks = [
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Terms of Use", path: "/terms-of-use" },
  { label: "Accessibility", path: "/accessibility" },
];

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61584466664185", label: "Facebook" },
  { icon: Twitter, href: "https://x.com/carcrt_sl?t=vxSi3-4H0exLpm01POd66w&s=09", label: "Twitter" },
  { icon: Instagram, href: "https://www.instagram.com/carcrt", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/coalition-for-community-resilience-and-transformation-carcrt", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@carcrt?si=6js6D2SRUvkP0vPE", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={logo} alt="CArCRT Logo" className="h-16 w-16 object-contain bg-background rounded-full p-1" />
            </Link>
            <p className="font-heading font-bold text-lg text-primary mb-2">
              Coalition for Community Resilience and Transformation
            </p>
            <p className="text-sm text-background/70 mb-6">
              Building resilient communities, transforming futures across Sierra Leone.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-background/80">12 Kandeh Street, Kenema, Sierra Leone</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:+2327659305" className="text-sm text-background/80 hover:text-primary transition-colors">
                  +232 76 659305
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:info@carcrt.org" className="text-sm text-background/80 hover:text-primary transition-colors">
                  info@carcrt.org
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-primary">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-secondary">Resources</h4>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-background/70 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-accent">Connect With Us</h4>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 bg-background/10 rounded-full hover:bg-primary hover:text-background transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            <h4 className="font-heading font-semibold text-lg mb-4 text-accent">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-background/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/60">
              © {new Date().getFullYear()} CArCRT - Coalition for Community Resilience and Transformation. All rights reserved.
            </p>
            <p className="text-sm text-background/60">
              Empowering communities across Sierra Leone
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
