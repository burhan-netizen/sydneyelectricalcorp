import React, { useState } from 'react';
import { ArrowUpRight, Check, Zap } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { SERVICES } from '../data/secData';
import { ScrollReveal } from './ScrollReveal';

interface ServicesSectionProps {
  onOpenQuoteModal: (serviceId?: string) => void;
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      delay: Math.min(custom * 0.06, 0.3),
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenQuoteModal }) => {
  const [filter, setFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'All Services' },
    { id: 'residential', label: 'Residential & Duplex' },
    { id: 'lighting', label: 'Architectural Lighting' },
    { id: 'switchboard', label: 'Switchboards & Safety' },
    { id: 'commercial', label: 'Commercial' },
  ];

  const filteredServices = SERVICES.filter((service) => {
    if (filter === 'all') return true;
    if (filter === 'residential') return service.category === 'residential' || service.id === 'renovations-new-builds';
    if (filter === 'lighting') return service.category === 'lighting' || service.category === 'automation';
    if (filter === 'switchboard') return service.category === 'switchboard';
    if (filter === 'commercial') return service.category === 'commercial';
    return true;
  });

  return (
    <section id="services" className="py-24 bg-[#08090C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#F20AA9] uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Comprehensive Electrical Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Electrical Services Built on Quality & Compliance
            </h2>
            <p className="text-base text-[#9E9EB0] leading-relaxed">
              Every job is executed to strict AS/NZS 3000 standards. From bespoke residential lighting installations to three-phase commercial distribution, explore our core capabilities below.
            </p>
          </div>

          {/* Interactive Filter Control */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#14151A] rounded-xl border border-white/10 overflow-x-auto max-w-full">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                type="button"
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#F20AA9] text-white shadow-md shadow-[#F20AA9]/25'
                    : 'text-[#9E9EB0] hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Services Bento Grid with Framer Motion Layout & Entrance Animations */}
        <motion.div
          layout="position"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              const isFeatured = index === 0 || service.id === 'lighting-design';
              return (
                <motion.div
                  layout="position"
                  key={service.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  exit="exit"
                  whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
                  className={`flex flex-col rounded-2xl bg-[#14151A] border border-white/10 hover:border-white/20 transition-colors duration-200 overflow-hidden group ${
                    isFeatured ? 'md:col-span-2 lg:col-span-1 bg-gradient-to-b from-[#181A22] to-[#14151A]' : ''
                  }`}
                >
                  {/* Service Image / Preview banner */}
                  {service.imageSrc && (
                    <div className="relative h-48 w-full overflow-hidden bg-black/40">
                      <img
                        src={service.imageSrc}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#14151A] via-[#14151A]/40 to-transparent" />
                      <div className="absolute top-3 left-3 bg-[#08090C]/85 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#9E9EB0]">
                        {service.tag}
                      </div>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between gap-5">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono text-[#F20AA9] font-bold">
                          {String(index + 1).padStart(2, '0')}.
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-[#F20AA9] transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-sm text-[#C8C8D4] leading-relaxed">
                        {service.summary}
                      </p>

                      {/* Features checklist */}
                      <ul className="mt-2 flex flex-col gap-2 pt-3 border-t border-white/5">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-xs text-[#9E9EB0] leading-tight">
                            <Check className="w-3.5 h-3.5 text-[#F20AA9] shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Card Action Button */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={() => onOpenQuoteModal(service.id)}
                        type="button"
                        className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-[#F20AA9] transition-colors group/btn cursor-pointer"
                      >
                        <span>Enquire About This Service</span>
                        <ArrowUpRight className="w-4 h-4 text-[#F20AA9] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
