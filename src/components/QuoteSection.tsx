import React, { useState } from 'react';
import { Phone, Mail, Send, CheckCircle2, AlertCircle, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../data/secData';
import { QuoteFormData } from '../types';
import { ScrollReveal } from './ScrollReveal';

interface QuoteSectionProps {
  preselectedService?: string;
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({ preselectedService }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    phone: '',
    email: '',
    suburb: '',
    serviceId: preselectedService || 'residential',
    propertyType: 'Residential Home',
    projectStage: 'Ready to build / Need work soon',
    details: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{ referenceNumber: string } | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof QuoteFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      // Clean phone string to digits
      const cleaned = formData.phone.replace(/[\s\-()]/g, '');
      if (cleaned.length < 8 || !/^[0-9+]+$/.test(cleaned)) {
        newErrors.phone = 'Please enter a valid phone number (e.g. 0451 102 588)';
      }
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.suburb.trim()) {
      newErrors.suburb = 'Sydney suburb or postcode is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate reliable submission process & store in localStorage
    setTimeout(() => {
      const referenceNumber = `SEC-${Math.floor(100000 + Math.random() * 900000)}`;
      
      try {
        const existing = JSON.parse(localStorage.getItem('sec_quote_enquiries') || '[]');
        existing.push({
          ...formData,
          referenceNumber,
          submittedAt: new Date().toISOString(),
        });
        localStorage.setItem('sec_quote_enquiries', JSON.stringify(existing));
      } catch (err) {
        console.error('Failed to store quote in localStorage', err);
      }

      setIsSubmitting(false);
      setSubmissionSuccess({ referenceNumber });
    }, 700);
  };

  const handleReset = () => {
    setSubmissionSuccess(null);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      suburb: '',
      serviceId: 'residential',
      propertyType: 'Residential Home',
      projectStage: 'Ready to build / Need work soon',
      details: '',
    });
    setErrors({});
  };

  return (
    <section id="contact" className="py-24 bg-[#08090C] border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info (5 cols) */}
          <ScrollReveal className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-[#F20AA9] uppercase tracking-wider">
                Direct Contact & Quote Enquiries
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Let’s Discuss Your Electrical Project
              </h2>
              <p className="text-base text-[#9E9EB0] leading-relaxed">
                Whether you need architectural lighting for a duplex build, an urgent switchboard upgrade, or power for a new renovation, we are ready to assist.
              </p>
            </div>

            {/* Direct Phone Card */}
            <div className="p-6 rounded-2xl bg-[#14151A] border border-white/10 flex flex-col gap-4">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Speak Directly with an Electrician
              </span>
              
              <a
                href={COMPANY_INFO.phoneTel}
                className="flex items-center gap-3 text-2xl font-black text-white hover:text-[#F20AA9] transition-colors tabular-nums"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F20AA9] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#F20AA9]/30">
                  <Phone className="w-6 h-6" />
                </div>
                <span>{COMPANY_INFO.phone}</span>
              </a>

              <p className="text-xs text-[#9E9EB0] leading-relaxed">
                Available Monday to Saturday for consultations and estimates. 24/7 on-call emergency response across Sydney.
              </p>
            </div>

            {/* Trust and SLA points */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#14151A]/60 border border-white/5">
                <Clock className="w-4 h-4 text-[#F20AA9] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Prompt Response</span>
                  <span className="text-xs text-[#9E9EB0]">We return enquiries quickly with transparent upfront pricing.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#14151A]/60 border border-white/5">
                <ShieldCheck className="w-4 h-4 text-[#F20AA9] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">AS/NZS 3000 & CCEW Certified</span>
                  <span className="text-xs text-[#9E9EB0]">Fully compliant documentation provided for all installations.</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Quote Form / Confirmation (7 cols) */}
          <ScrollReveal delay={0.12} className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#14151A] border border-white/15 shadow-2xl">
              {submissionSuccess ? (
                /* Success Confirmation State */
                <div className="flex flex-col items-center text-center py-8 gap-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono font-bold text-[#F20AA9] uppercase tracking-wider">
                      Reference #{submissionSuccess.referenceNumber}
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      Quote Request Received
                    </h3>
                    <p className="text-sm text-[#C8C8D4] max-w-md leading-relaxed">
                      Thank you for contacting Sydney Electrical Corp. Jimmy and the team will review your project details and contact you shortly.
                    </p>
                  </div>

                  <div className="w-full p-4 rounded-xl bg-[#08090C] border border-white/10 text-left flex flex-col gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#9E9EB0]">Service:</span>
                      <span className="text-white font-medium capitalize">{formData.serviceId.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9E9EB0]">Location:</span>
                      <span className="text-white font-medium">{formData.suburb}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9E9EB0]">Contact Phone:</span>
                      <span className="text-white font-medium">{formData.phone}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2 w-full">
                    <a
                      href={COMPANY_INFO.phoneTel}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#F20AA9] hover:bg-[#D60894] text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-[#F20AA9]/25"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Now ({COMPANY_INFO.phone})</span>
                    </a>

                    <button
                      onClick={handleReset}
                      type="button"
                      className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Form */
                <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="text-xl font-bold text-white">
                      Request a Project Quote
                    </h3>
                    <span className="text-xs text-[#9E9EB0]">
                      No obligation · Direct trade advice
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="fullName" className="text-xs font-semibold text-[#C8C8D4]">
                        Full Name <span className="text-[#F20AA9]">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. David Miller"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border text-white text-sm focus:outline-none transition-colors ${
                          errors.fullName ? 'border-red-500' : 'border-white/15 focus:border-[#F20AA9]'
                        }`}
                      />
                      {errors.fullName && (
                        <span className="text-[11px] text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.fullName}</span>
                        </span>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-xs font-semibold text-[#C8C8D4]">
                        Phone Number <span className="text-[#F20AA9]">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0451 102 588"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border text-white text-sm focus:outline-none transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-white/15 focus:border-[#F20AA9]'
                        }`}
                      />
                      {errors.phone && (
                        <span className="text-[11px] text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.phone}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email (Optional) */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-semibold text-[#C8C8D4]">
                        Email Address <span className="text-xs text-[#9E9EB0] font-normal">(Optional)</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="david@example.com.au"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border text-white text-sm focus:outline-none transition-colors ${
                          errors.email ? 'border-red-500' : 'border-white/15 focus:border-[#F20AA9]'
                        }`}
                      />
                      {errors.email && (
                        <span className="text-[11px] text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </span>
                      )}
                    </div>

                    {/* Suburb / Postcode */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="suburb" className="text-xs font-semibold text-[#C8C8D4]">
                        Sydney Suburb or Postcode <span className="text-[#F20AA9]">*</span>
                      </label>
                      <input
                        id="suburb"
                        type="text"
                        value={formData.suburb}
                        onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                        placeholder="e.g. Gymea, Cronulla, Bondi"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border text-white text-sm focus:outline-none transition-colors ${
                          errors.suburb ? 'border-red-500' : 'border-white/15 focus:border-[#F20AA9]'
                        }`}
                      />
                      {errors.suburb && (
                        <span className="text-[11px] text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.suburb}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Service Needed Dropdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="serviceId" className="text-xs font-semibold text-[#C8C8D4]">
                        Primary Service Needed
                      </label>
                      <select
                        id="serviceId"
                        value={formData.serviceId}
                        onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white text-sm focus:outline-none focus:border-[#F20AA9]"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="propertyType" className="text-xs font-semibold text-[#C8C8D4]">
                        Property / Project Type
                      </label>
                      <select
                        id="propertyType"
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white text-sm focus:outline-none focus:border-[#F20AA9]"
                      >
                        <option value="Residential Home">Residential Home</option>
                        <option value="Duplex / Townhouse Build">Duplex / Townhouse Build</option>
                        <option value="Home Renovation / Extension">Home Renovation / Extension</option>
                        <option value="Apartment / Strata">Apartment / Strata</option>
                        <option value="Commercial / Retail Fitout">Commercial / Retail Fitout</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="details" className="text-xs font-semibold text-[#C8C8D4]">
                      Project Scope & Timeline Details
                    </label>
                    <textarea
                      id="details"
                      rows={3}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Briefly describe what you need (e.g. installing curved LED island pendant, switchboard RCD upgrade, roughing in a new duplex, etc.)..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#08090C] border border-white/15 text-white text-sm focus:outline-none focus:border-[#F20AA9]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-[#9E9EB0]">
                      Your details are kept strictly private.
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#F20AA9] hover:bg-[#D60894] active:scale-[0.98] text-white font-bold text-sm transition-all shadow-md shadow-[#F20AA9]/25 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Sending Request...</span>
                      ) : (
                        <>
                          <span>Submit Quote Request</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
