import Link from 'next/link';
import { Heart, Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-text-brown text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Practice Info */}
          <div>
            <div className="flex items-center mb-4">
              <Heart className="h-6 w-6 text-primary-beige mr-2" />
              <h3 className="text-xl font-bold">Dr. Amita Shukla</h3>
            </div>
            <p className="text-accent-cream/80 mb-4">
              Gynecologist with 10+ years of experience specializing in High-Risk Pregnancy, 
              Infertility, PCOS/PCOD, Laparoscopy, and Hysteroscopy.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-white hover:text-primary-green transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary-green transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary-green transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary-green transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/high-risk-pregnancy" className="hover:text-primary-green transition-colors">
                  High Risk Pregnancy
                </Link>
              </li>
              <li>
                <Link href="/services/infertility" className="hover:text-primary-green transition-colors">
                  Infertility Treatment
                </Link>
              </li>
              <li>
                <Link href="/services/pcos-pcod" className="hover:text-primary-green transition-colors">
                  PCOS/PCOD Treatment
                </Link>
              </li>
              <li>
                <Link href="/services/laparoscopy" className="hover:text-primary-green transition-colors">
                  Advanced Laparoscopy
                </Link>
              </li>
              <li>
                <Link href="/services/antenatal-care" className="hover:text-primary-green transition-colors">
                  Antenatal Care
                </Link>
              </li>
              <li>
                <Link href="/services/well-women-health" className="hover:text-primary-green transition-colors">
                  Well Women Health
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-primary-green transition-colors">
                  About Dr. Amita
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary-green transition-colors">
                  Health Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-green transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary-green transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-primary-green transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary-green transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 text-primary-beige mr-2 flex-shrink-0" />
                <span>SCT Trust Hospital, A-1/7, Sector-H, Aliganj, Lucknow - 226024</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-primary-beige mr-2 flex-shrink-0" />
                <a href="tel:+918303222222" className="hover:text-primary-green transition-colors">
                  +91 8303222222
                </a>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-primary-beige mr-2 flex-shrink-0" />
                <a href="mailto:amitaobg@gmail.com" className="hover:text-primary-green transition-colors">
                  amitaobg@gmail.com
                </a>
              </li>
              <li className="flex">
                <Clock className="h-5 w-5 text-primary-beige mr-2 flex-shrink-0" />
                <div>
                  <p>Open 24 Hours with emergency and NICU facility</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-accent-cream/20 mt-12 pt-8 text-center text-sm text-accent-cream/70">
          <p>© {new Date().getFullYear()} Dr. Amita Shukla. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;