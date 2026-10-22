import React from 'react';
import { Phone, Instagram, MapPin, Clock, ShieldCheck, Award, ArrowUp } from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../data/secData';

interface FooterProps {
  onOpenQuoteModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuoteModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white border-t border-white/10 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Column (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <img
                src={COMPANY_INFO.logoSrc}
                alt="Sydney Electrical Corp Logo"
                className="w-11 h-11 rounded-lg border border-white/15 object-contain bg-black p-0.5"
                loading="lazy"
              />
              <div>
                <span className="font-extrabold text-lg tracking-tight block text-white leading-none">
                  SYDNEY ELECTRICAL CORP
                </span>
                <span className="text-xs text-sec-pink font-semibold tracking-wider uppercase mt-1 block">
                  Licensed Electrical Contractors · NSW
                </span>
              </div>
            </div>

            <p className="text-sec-muted text-sm leading-relaxed max-w-sm">
              Premium residential, architectural lighting, and commercial electrical solutions across Greater Sydney and the Sutherland Shire. Built on punctuality, pristine on-site finish, and Australian safety standards.
            </p>

            {/* Certifications badges */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 text-xs text-sec-muted">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Fully Licensed Electricians &amp; Insured</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-sec-muted">
                <Award className="w-4 h-4 text-sec-pink shrink-0" />
                <span>AS/NZS 3000 Wiring Rules &amp; CCEW Certified</span>
              </div>
            </div>

            {/* Social Link */}
            <div className="pt-2">
              <a
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-colors"
                aria-label="Follow Sydney Electrical Corp on Instagram"
              >
                <Instagram className="w-4 h-4 text-sec-pink" />
                <span>{COMPANY_INFO.instagram}</span>
              </a>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm text-sec-muted">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="hover:text-sec-pink transition-colors line-clamp-1"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm text-sec-muted">
              <li>
                <a href="#services" className="hover:text-sec-pink transition-colors">
                  All Services
                </a>
              </li>
              <li>
                <a href="#videos" className="hover:text-sec-pink transition-colors">
                  On-Site Videos &amp; Walkthroughs
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-sec-pink transition-colors">
                  Recent Work &amp; Duplexes
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-sec-pink transition-colors">
                  About Jimmy &amp; SEC
                </a>
              </li>
              <li>
                <a href="#service-areas" className="hover:text-sec-pink transition-colors">
                  Service Suburbs
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-sec-pink transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#quote" className="hover:text-sec-pink transition-colors">
                  Request a Free Quote
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Direct Contact</h4>
            <div className="space-y-3.5 text-sm">
              <a
                href={COMPANY_INFO.phoneTel}
                className="flex items-start gap-2.5 text-white hover:text-sec-pink transition-colors group"
              >
                <Phone className="w-4 h-4 text-sec-pink shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-bold block">{COMPANY_INFO.phone}</span>
                  <span className="text-xs text-sec-muted">Direct to lead electrician Jimmy</span>
                </div>
              </a>

              <div className="flex items-start gap-2.5 text-sec-muted">
                <MapPin className="w-4 h-4 text-sec-pink shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.location}</span>
              </div>

              <div className="flex items-start gap-2.5 text-sec-muted">
                <Clock className="w-4 h-4 text-sec-pink shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">
                  Mon – Sat: 7:00am – 5:30pm<br />
                  24/7 Emergency Response
                </span>
              </div>

              {onOpenQuoteModal && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenQuoteModal}
                    className="w-full text-center px-4 py-2.5 rounded-lg bg-sec-pink hover:bg-sec-pink/90 text-white font-semibold text-xs tracking-wide transition-all shadow-md shadow-sec-pink/20 cursor-pointer"
                  >
                    Quick Quote Enquiry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sec-muted">
          <div>
            © {new Date().getFullYear()} Sydney Electrical Corp (SEC). All rights reserved. NSW Electrical Contractor.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-white/60">AS/NZS 3000 Standard Compliant</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-sec-muted hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-sec-pink" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
