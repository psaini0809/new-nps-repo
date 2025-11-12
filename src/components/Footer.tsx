import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { useContactInfo } from "@/api/contactApi";

const Footer = () => {
  // Fetch contact data from backend
  const { data: contact, isLoading, isError } = useContactInfo();

  // Default fallback if data isn’t yet loaded
  const phone = contact?.phone || "+91 98765 43210";
  const email = contact?.email || "info@npsestates.com";
  const address =
    contact?.address || "207, SL Tower, Commercial Belt, Alpha 1, Greater Noida";

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold">
              <span className="text-gold">NPS</span>
            </h3>
            <p className="text-sm text-primary-foreground/80">
              Your trusted partner in finding premium properties across Noida,
              Greater Noida, and Yamuna Expressway.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-gold transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-gold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="hover:text-gold transition-colors"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  className="hover:text-gold transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/testimonials"
                  className="hover:text-gold transition-colors"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-gold transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-gold">Our Projects</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/projects/noida"
                  className="hover:text-gold transition-colors"
                >
                  Noida Properties
                </Link>
              </li>
              <li>
                <Link
                  to="/projects/greater-noida"
                  className="hover:text-gold transition-colors"
                >
                  Greater Noida
                </Link>
              </li>
              <li>
                <Link
                  to="/projects/yamuna"
                  className="hover:text-gold transition-colors"
                >
                  Yamuna Expressway
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-gold">Contact Us</h4>

            {isError ? (
              <p className="text-sm text-red-400">Failed to load contact info.</p>
            ) : isLoading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : (
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-2">
                  <MapPin className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-primary-foreground/80">{address}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-gold flex-shrink-0" />
                  <a
                    href={`tel:${phone}`}
                    className="hover:text-gold transition-colors"
                  >
                    {phone}
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-gold flex-shrink-0" />
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-gold transition-colors"
                  >
                    {email}
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
