import React from 'react';
import { Phone, ArrowUpRight, Play, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/secData';

interface HeroProps {
  onOpenQuoteModal: () => void;
  onWatchVideo: (videoId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal, onWatchVideo }) => {
  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Subtle background ambient lighting */}
      <div
        className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#F20AA9]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 -right-48 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Quiet Editorial Kicker (Unboxed text with bullet) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-[#9E9EB0]">
              <span className="w-2 h-2 rounded-full bg-[#F20AA9]" />
              <span className="uppercase tracking-wider">Sydney, NSW · Licensed Electrical Contractors</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-white leading-[1.08] text-balance">
              Electrical Work Done Right.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#F20AA9]">
                Across Sydney.
              </span>
            </h1>

            {/* Concise Supporting Value Proposition */}
            <p className="text-base sm:text-lg text-[#C8C8D4] leading-relaxed max-w-2xl">
              Professional residential and commercial electrical services. We partner with homeowners, builders, and developers for architectural lighting, switchboard upgrades, duplex builds, and smart automation.
            </p>

            {/* Dual CTAs (One primary, one secondary phone link) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenQuoteModal}
                type="button"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-[#F20AA9] hover:bg-[#D60894] active:scale-[0.98] transition-all rounded-lg shadow-lg shadow-[#F20AA9]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090C] focus-visible:ring-[#F20AA9] cursor-pointer"
              >
                <span>Request a Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={COMPANY_INFO.phoneTel}
                className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#14151A] hover:bg-[#1C1E26] border border-white/15 hover:border-white/30 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F20AA9]"
              >
                <Phone className="w-4 h-4 text-[#F20AA9]" />
                <span>Call {COMPANY_INFO.phone}</span>
              </a>
            </div>

            {/* Trust Markers - Quiet, unboxed inline metadata */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-[#9E9EB0]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F20AA9]" />
                <span>NSW Licensed & Insured</span>
              </div>
              <span className="hidden sm:inline text-white/20">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#F20AA9]" />
                <span>AS/NZS 3000 Compliant</span>
              </div>
              <span className="hidden sm:inline text-white/20">·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F20AA9]" />
                <span>CCEW Certification Issued</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Real Company Image & On-Site Proof */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#14151A] shadow-2xl group">
              {/* Jimmy standing at SEC Van image */}
              <img
                src={COMPANY_INFO.heroVanSrc}
                alt="Jimmy from Sydney Electrical Corp with branded SEC service van in Sydney"
                className="w-full h-[420px] sm:h-[480px] lg:h-[520px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
                width={800}
                height={1000}
                loading="eager"
              />

              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/40 to-transparent pointer-events-none" />

              {/* Floating Interactive Video Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#08090C]/90 backdrop-blur-md border border-white/15 flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-[#F20AA9] uppercase tracking-wider">
                    On-Site Project Walkthrough
                  </span>
                  <span className="text-sm font-bold text-white leading-tight">
                    Rough-in Stage with Jimmy
                  </span>
                  <span className="text-xs text-[#9E9EB0] pt-0.5">
                    Wiring, LED pelmets & duplex roughing
                  </span>
                </div>

                <button
                  onClick={() => onWatchVideo('video-rough-in')}
                  type="button"
                  className="w-11 h-11 rounded-full bg-[#F20AA9] hover:bg-[#D60894] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#F20AA9]/30 transition-transform active:scale-95 cursor-pointer"
                  aria-label="Watch Jimmy rough-in walkthrough video"
                  title="Watch project walkthrough video"
                >
                  <Play className="w-4 h-4 fill-white translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Discreet verified badge */}
            <div className="mt-3 flex items-center justify-between px-1 text-xs text-[#9E9EB0]">
              <span>Real SEC Team on Site</span>
              <span className="text-[#C8C8D4] font-medium">Gymea & Sydney Projects</span>
            </div>
          </div>
        </div>

        {/* 4-Column Structural Trust Strip */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[#9E9EB0] uppercase tracking-wider">Telephone</span>
            <a
              href={COMPANY_INFO.phoneTel}
              className="text-base sm:text-lg font-bold text-white hover:text-[#F20AA9] transition-colors tabular-nums"
            >
              {COMPANY_INFO.phone}
            </a>
            <span className="text-xs text-[#9E9EB0]">Direct call to Jimmy</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[#9E9EB0] uppercase tracking-wider">Service Base</span>
            <span className="text-base sm:text-lg font-bold text-white">Sydney, NSW</span>
            <span className="text-xs text-[#9E9EB0]">Sutherland Shire & Greater Sydney</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[#9E9EB0] uppercase tracking-wider">Standards</span>
            <span className="text-base sm:text-lg font-bold text-white">AS/NZS 3000</span>
            <span className="text-xs text-[#9E9EB0]">Full CCEW Compliance Issued</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[#9E9EB0] uppercase tracking-wider">Specialisation</span>
            <span className="text-base sm:text-lg font-bold text-white">Lighting & Power</span>
            <span className="text-xs text-[#9E9EB0]">Duplexes, Switchboards & Homes</span>
          </div>
        </div>
      </div>
    </section>
  );
};
