import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Phone, ArrowRight, ShieldCheck, Send } from 'lucide-react';
import { SERVICES, COMPANY_INFO } from '../data/secData';
import { QuoteFormData } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId = 'residential',
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    phone: '',
    email: '',
    suburb: '',
    serviceId: preselectedServiceId,
    propertyType: 'Residential',
    projectStage: 'Ready for quote',
    details: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preselectedServiceId) {
      setFormData(prev => ({ ...prev, serviceId: preselectedServiceId }));
    }
  }, [preselectedServiceId]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your name';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter a contact phone number';
    } else if (formData.phone.replace(/\D/g, '').length < 8) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.suburb.trim()) newErrors.suburb = 'Please enter your Sydney suburb';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const generatedRef = `SEC-${Math.floor(1000 + Math.random() * 9000)}`;
    setRefNumber(generatedRef);

    // Save to localStorage
    try {
      const stored = JSON.parse(localStorage.getItem('sec_quote_requests') || '[]');
      stored.push({
        ref: generatedRef,
        ...formData,
        date: new Date().toISOString(),
      });
      localStorage.setItem('sec_quote_requests', JSON.stringify(stored));
    } catch {
      // ignore localStorage quota errors
    }

    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      suburb: '',
      serviceId: 'residential',
      propertyType: 'Residential',
      projectStage: 'Ready for quote',
      details: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-sec-charcoal rounded-2xl border border-white/15 shadow-2xl p-6 sm:p-8 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={resetAndClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-sec-muted hover:text-white transition-colors cursor-pointer"
          aria-label="Close quote modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold text-sec-pink uppercase tracking-widest">
                Enquiry Received · Reference: {refNumber}
              </span>
              <h3 className="text-2xl font-bold mt-1 text-white">Thank You, {formData.fullName}!</h3>
              <p className="text-sec-muted text-sm mt-2 max-w-md mx-auto">
                Jimmy will review your requirements for {formData.suburb} and get in touch shortly with pricing and timing.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left max-w-md mx-auto text-xs space-y-1.5 text-sec-muted">
              <div><strong className="text-white">Service:</strong> {SERVICES.find(s => s.id === formData.serviceId)?.title || formData.serviceId}</div>
              <div><strong className="text-white">Contact Phone:</strong> {formData.phone}</div>
              <div><strong className="text-white">Property Type:</strong> {formData.propertyType}</div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={COMPANY_INFO.phoneTel}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-sec-pink hover:bg-sec-pink/90 text-white font-semibold text-sm transition-all shadow-md shadow-sec-pink/20"
              >
                <Phone className="w-4 h-4" />
                <span>Call Jimmy Now ({COMPANY_INFO.phone})</span>
              </a>
              <button
                type="button"
                onClick={resetAndClose}
                className="w-full sm:w-auto px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium text-sm transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sec-pink uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4" />
                Direct Electrician Contact
              </div>
              <h2 id="quote-modal-title" className="text-2xl font-extrabold text-white">
                Request a Fast, Itemised Quote
              </h2>
              <p className="text-sec-muted text-xs sm:text-sm mt-1">
                Tell us about your project. Jimmy from SEC will review and provide upfront pricing.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    Your Name <span className="text-sec-pink">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. David Miller"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/15 focus:border-sec-pink focus:outline-none text-white text-sm placeholder:text-sec-muted/50"
                  />
                  {errors.fullName && <p className="text-xs text-rose-400 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    Phone Number <span className="text-sec-pink">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 0412 345 678"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/15 focus:border-sec-pink focus:outline-none text-white text-sm placeholder:text-sec-muted/50"
                  />
                  {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    Sydney Suburb <span className="text-sec-pink">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.suburb}
                    onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                    placeholder="e.g. Gymea, Cronulla, Bondi"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/15 focus:border-sec-pink focus:outline-none text-white text-sm placeholder:text-sec-muted/50"
                  />
                  {errors.suburb && <p className="text-xs text-rose-400 mt-1">{errors.suburb}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/15 focus:border-sec-pink focus:outline-none text-white text-sm placeholder:text-sec-muted/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    Service Required
                  </label>
                  <select
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/15 focus:border-sec-pink focus:outline-none text-white text-sm"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id} className="bg-sec-dark text-white">
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1">
                    Property Type
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/15 focus:border-sec-pink focus:outline-none text-white text-sm"
                  >
                    <option value="Residential">Residential Home / Villa</option>
                    <option value="Duplex Build">Duplex / Multi-Dwelling</option>
                    <option value="Apartment">Apartment / Unit</option>
                    <option value="Commercial">Commercial / Retail Office</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Project Notes or Work Description
                </label>
                <textarea
                  rows={3}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="e.g. Installing curved LED pendant over kitchen island, upgrading switchboard, or rough-in timing..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/15 focus:border-sec-pink focus:outline-none text-white text-sm placeholder:text-sec-muted/50 resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3 px-6 rounded-lg bg-sec-pink hover:bg-sec-pink/90 text-white font-bold text-sm transition-all shadow-lg shadow-sec-pink/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Quote Request</span>
                </button>
                <a
                  href={COMPANY_INFO.phoneTel}
                  className="w-full sm:w-auto py-3 px-5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-sec-pink" />
                  <span>Call {COMPANY_INFO.phone}</span>
                </a>
              </div>

              <p className="text-[11px] text-center text-sec-muted pt-1">
                Strict privacy. We never share your details. Upfront quotes with zero obligation.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
