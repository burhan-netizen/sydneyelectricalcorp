import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, ArrowRight } from 'lucide-react';
import { FAQS, COMPANY_INFO } from '../data/secData';
import { ScrollReveal } from './ScrollReveal';

interface FAQSectionProps {
  onOpenQuoteModal?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenQuoteModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleItem = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-20 bg-sec-dark text-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sec-pink/10 border border-sec-pink/30 text-sec-pink text-xs font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Common Enquiries
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Frequently Asked <span className="text-sec-pink">Questions</span>
          </h2>
          <p className="mt-3 text-sec-muted text-base sm:text-lg">
            Clear, transparent answers about our electrical licensing, quoting process, and on-site coordination.
          </p>
        </ScrollReveal>

        {/* FAQ Accordion */}
        <ScrollReveal delay={0.08} className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-sec-charcoal/80 border-sec-pink/40 shadow-lg shadow-black/40'
                    : 'bg-sec-charcoal/40 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sec-pink"
                >
                  <span className="font-semibold text-base sm:text-lg text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-200 ${
                      isOpen
                        ? 'bg-sec-pink/15 border-sec-pink text-sec-pink rotate-180'
                        : 'bg-white/5 border-white/10 text-sec-muted group-hover:text-white'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sec-muted text-sm sm:text-base leading-relaxed border-t border-white/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </ScrollReveal>

        {/* Direct Contact Banner */}
        <ScrollReveal delay={0.15} className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-sec-charcoal to-black border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold text-white">Have a specific or complex project question?</h3>
            <p className="text-sec-muted text-sm mt-1">
              Talk directly with lead electrician Jimmy for technical advice, plans, or immediate scheduling.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a
              href={COMPANY_INFO.phoneTel}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm transition-colors"
            >
              <Phone className="w-4 h-4 text-sec-pink" />
              <span>Call {COMPANY_INFO.phone}</span>
            </a>
            {onOpenQuoteModal && (
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-sec-pink hover:bg-sec-pink/90 text-white font-semibold text-sm transition-all shadow-md shadow-sec-pink/20 cursor-pointer"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
