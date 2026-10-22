import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/secData';

interface HeaderProps {
  onOpenQuoteModal: (preselectedService?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuoteModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#our-work' },
    { label: 'Videos', href: '#videos' },
    { label: 'About', href: '#about' },
    { label: 'Service Areas', href: '#service-areas' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 h-20 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#08090C]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40'
            : 'bg-[#08090C] border-b border-white/[0.08]'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          {/* Zone 1: SEC Brand Wordmark + Authoritative Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F20AA9] rounded-lg p-1 -ml-1"
            aria-label="Sydney Electrical Corp Homepage"
          >
            <div className="h-11 w-11 rounded-lg bg-black border border-white/15 flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={COMPANY_INFO.logoSrc}
                alt="SEC - Sydney Electrical Corp"
                className="h-full w-full object-contain p-0.5"
                width={44}
                height={44}
                loading="eager"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap leading-tight group-hover:text-white/95">
                Sydney Electrical <span className="text-[#F20AA9]">Corp</span>
              </span>
              <span className="text-[11px] text-[#9E9EB0] tracking-wider uppercase font-medium whitespace-nowrap hidden sm:block">
                Licensed Electrical Contractors · Sydney
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (single-line, clean typography) */}
          <nav
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#C8C8D4]"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#F20AA9] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform whitespace-nowrap focus-visible:outline-none focus-visible:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Direct Phone Link & Primary CTA Button */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Click-to-call direct phone link */}
            <a
              href={COMPANY_INFO.phoneTel}
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F20AA9] whitespace-nowrap"
              title="Call Sydney Electrical Corp directly"
            >
              <span className="w-8 h-8 rounded-full bg-[#1C1E26] border border-white/10 flex items-center justify-center text-[#F20AA9]">
                <Phone className="w-3.5 h-3.5" />
              </span>
              <span className="tracking-wide">{COMPANY_INFO.phone}</span>
            </a>

            {/* Primary Action Button */}
            <button
              onClick={() => onOpenQuoteModal()}
              type="button"
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#F20AA9] hover:bg-[#D60894] active:scale-[0.98] transition-all rounded-lg shadow-sm shadow-[#F20AA9]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090C] focus-visible:ring-[#F20AA9] whitespace-nowrap cursor-pointer"
            >
              <span>Request a Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F20AA9]"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden bg-black/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        >
          <div
            className="absolute top-20 left-0 right-0 bg-[#14151A] border-b border-white/10 p-6 shadow-2xl flex flex-col gap-5 max-h-[calc(100vh-80px)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#9E9EB0] uppercase tracking-wider px-2">Navigation</span>
              <nav className="flex flex-col divide-y divide-white/5">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="py-3 px-3 text-base font-medium text-white hover:text-[#F20AA9] hover:bg-white/5 rounded-md transition-colors flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-white/40" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Mobile Contact Quick Actions */}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
              <a
                href={COMPANY_INFO.phoneTel}
                className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-lg bg-[#1C1E26] border border-white/15 text-white font-semibold text-sm hover:border-[#F20AA9] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#F20AA9]" />
                <span>Call {COMPANY_INFO.phone}</span>
              </a>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                type="button"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-[#F20AA9] text-white font-bold text-sm hover:bg-[#D60894] transition-colors shadow-md shadow-[#F20AA9]/25 cursor-pointer"
              >
                <span>Request a Detailed Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center text-xs text-[#9E9EB0] pt-2">
              Serving Sutherland Shire, Eastern Suburbs & Greater Sydney
            </div>
          </div>
        </div>
      )}
    </>
  );
};
