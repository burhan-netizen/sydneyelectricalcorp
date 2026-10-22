import React from 'react';
import { ShieldCheck, HardHat, Clock } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const AboutSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Consultation & Electrical Planning',
      description: 'We review your floorplans, lighting layout, and electrical demands to advise on optimal conduit routes, dimmer compatibility, and circuit loading before tools hit the site.',
    },
    {
      step: '02',
      title: 'Framing & Pre-Sheet Rough-In',
      description: 'As seen in our project videos, we run all cabling, wall light drops, pelmet channels, and outdoor feeds methodically before gyprock plastering begins, ensuring clean aesthetics.',
    },
    {
      step: '03',
      title: 'Switchboard & Protection Setup',
      description: 'We assemble and test the main switchboard, incorporating sensitive RCD circuit breakers, surge protection, and dedicated sub-mains for air conditioning and high-load appliances.',
    },
    {
      step: '04',
      title: 'Fit-Off, Testing & CCEW Certification',
      description: 'We install delicate pendants, architectural downlights, and automation modules. Every circuit is tested, certified, and lodged with NSW Fair Trading via a formal CCEW certificate.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#08090C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Real photo & Brand card */}
          <ScrollReveal className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#14151A] shadow-2xl">
              <img
                src="/assets/aistudio/10_419568cb.jpg"
                alt="Electrician Jimmy with Sydney Electrical Corp van and toolkit"
                className="w-full h-[460px] object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#08090C]/90 backdrop-blur-md border border-white/10 flex flex-col gap-1">
                <span className="text-xs font-semibold text-[#F20AA9] uppercase tracking-wider">
                  Hands-On Trade Leadership
                </span>
                <span className="text-sm font-bold text-white">
                  Jimmy & Sydney Electrical Corp
                </span>
                <span className="text-xs text-[#9E9EB0]">
                  Operating across Sutherland Shire and Greater Sydney
                </span>
              </div>
            </div>

            {/* Core trade commitments */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#14151A] border border-white/10 flex flex-col gap-1">
                <ShieldCheck className="w-4 h-4 text-[#F20AA9]" />
                <span className="text-xs font-bold text-white">AS/NZS 3000</span>
                <span className="text-[11px] text-[#9E9EB0]">Strict Australian wiring rules</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#14151A] border border-white/10 flex flex-col gap-1">
                <Clock className="w-4 h-4 text-[#F20AA9]" />
                <span className="text-xs font-bold text-white">Reliable Timing</span>
                <span className="text-[11px] text-[#9E9EB0]">On-site when booked</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Narrative & Values */}
          <ScrollReveal delay={0.12} className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-xs font-bold text-[#F20AA9] uppercase tracking-wider">
              <HardHat className="w-4 h-4" />
              <span>About Sydney Electrical Corp</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Trade Standards You Can Rely On for Every Build
            </h2>

            <div className="flex flex-col gap-4 text-base text-[#C8C8D4] leading-relaxed">
              <p>
                At Sydney Electrical Corp, our philosophy is straightforward: electrical work must be safe, meticulously installed, and executed with absolute respect for your home or project site.
              </p>
              <p>
                Led by Jimmy, our team works closely alongside homeowners, builders, and architects across Sydney. From running conduit around complex skylights and installing hidden LED pelmets to upgrading dated switchboards with modern RCD protection, we pride ourselves on clean communication and dependable delivery.
              </p>
              <p className="text-sm text-[#9E9EB0]">
                We don’t cut corners or hide behind technical jargon. You get direct contact with your electrician, honest pricing, and full compliance documentation upon completion.
              </p>
            </div>

            {/* 4-Stage Methodology */}
            <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Our Project Delivery Process
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {steps.map((s) => (
                  <div key={s.step} className="p-4 rounded-xl bg-[#14151A] border border-white/10 flex flex-col gap-1.5">
                    <span className="text-xs font-mono font-bold text-[#F20AA9]">{s.step}.</span>
                    <h3 className="text-sm font-bold text-white">{s.title}</h3>
                    <p className="text-xs text-[#9E9EB0] leading-relaxed">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
