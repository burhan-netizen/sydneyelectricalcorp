import React, { useState } from 'react';
import { MapPin, Search, CheckCircle2, Phone } from 'lucide-react';
import { SYDNEY_REGIONS, COMPANY_INFO } from '../data/secData';
import { ScrollReveal } from './ScrollReveal';

export const ServiceAreaSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleCheckSuburb = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResult(null);
      return;
    }

    const query = searchQuery.trim().toLowerCase();
    const allPopularSuburbs = SYDNEY_REGIONS.flatMap((r) => r.popularSuburbs.map((s) => s.toLowerCase()));
    const isDirectMatch = allPopularSuburbs.some((suburb) => suburb.includes(query) || query.includes(suburb));

    if (isDirectMatch || query.length >= 3) {
      setSearchResult(`Yes! Sydney Electrical Corp provides electrical services to ${searchQuery.trim()} and across all Greater Sydney regions.`);
    } else {
      setSearchResult(`Yes! We cover Greater Sydney, NSW. Call 0451 102 588 to schedule your job.`);
    }
  };

  return (
    <section id="service-areas" className="py-24 bg-[#0E0F14] border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#F20AA9] uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Sydney Service Coverage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Serving Homes & Businesses Across Greater Sydney
            </h2>
            <p className="text-base text-[#9E9EB0] leading-relaxed">
              Based in Sydney, NSW, our vans are frequently on-site across Sutherland Shire, South Sydney, Eastern Suburbs, and metropolitan Sydney.
            </p>
          </div>

          <a
            href={COMPANY_INFO.phoneTel}
            className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#14151A] hover:bg-[#1C1E26] border border-white/15 px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap self-start md:self-auto"
          >
            <Phone className="w-4 h-4 text-[#F20AA9]" />
            <span>Call {COMPANY_INFO.phone}</span>
          </a>
        </ScrollReveal>

        {/* Interactive Suburb Search / Checker */}
        <ScrollReveal delay={0.08} className="mb-12 p-6 rounded-2xl bg-[#14151A] border border-white/10 max-w-2xl">
          <span className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
            Check Service Availability in Your Suburb
          </span>
          <form onSubmit={handleCheckSuburb} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#9E9EB0] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (searchResult) setSearchResult(null);
                }}
                placeholder="Enter your suburb or postcode (e.g. Gymea, Miranda, Bondi)"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white placeholder-[#9E9EB0] text-sm focus:outline-none focus:border-[#F20AA9]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#F20AA9] hover:bg-[#D60894] text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-[#F20AA9]/25 cursor-pointer whitespace-nowrap"
            >
              Check Suburb
            </button>
          </form>

          {searchResult && (
            <div className="mt-4 p-3 rounded-lg bg-[#1C1E26] border border-[#F20AA9]/40 flex items-center gap-2.5 text-xs sm:text-sm text-white">
              <CheckCircle2 className="w-4 h-4 text-[#F20AA9] shrink-0" />
              <span>{searchResult}</span>
            </div>
          )}
        </ScrollReveal>

        {/* Regional Hubs Grid */}
        <ScrollReveal delay={0.15} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SYDNEY_REGIONS.map((region) => (
            <div
              key={region.name}
              className="p-6 rounded-2xl bg-[#14151A] border border-white/10 hover:border-white/20 transition-all flex flex-col gap-3"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F20AA9]" />
                <h3 className="text-base font-bold text-white">{region.name}</h3>
              </div>

              <p className="text-xs text-[#9E9EB0] leading-relaxed">
                {region.description}
              </p>

              <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                {region.popularSuburbs.map((suburb) => (
                  <span
                    key={suburb}
                    className="text-[11px] font-medium text-[#C8C8D4] bg-[#08090C] px-2 py-0.5 rounded border border-white/5"
                  >
                    {suburb}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
};
