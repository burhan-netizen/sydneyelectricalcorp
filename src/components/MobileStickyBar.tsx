import React from 'react';
import { Phone, FileText } from 'lucide-react';
import { COMPANY_INFO } from '../data/secData';

interface MobileStickyBarProps {
  onOpenQuoteModal: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenQuoteModal }) => {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-sec-dark/95 backdrop-blur-md border-t border-white/10 px-3 py-2 shadow-2xl"
      style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom, 8px))' }}
      aria-label="Mobile quick actions"
    >
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
        {/* Direct Call Button */}
        <a
          href={COMPANY_INFO.phoneTel}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs tracking-wide transition-colors active:scale-[0.98]"
          aria-label={`Call Sydney Electrical Corp on ${COMPANY_INFO.phone}`}
        >
          <Phone className="w-3.5 h-3.5 text-sec-pink" />
          <span>Call 0451 102 588</span>
        </a>

        {/* Request Quote Button */}
        <button
          type="button"
          onClick={onOpenQuoteModal}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-sec-pink hover:bg-sec-pink/90 text-white font-bold text-xs tracking-wide transition-all shadow-md shadow-sec-pink/20 active:scale-[0.98] cursor-pointer"
          aria-label="Open Quote Request modal"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Get a Quote</span>
        </button>
      </div>
    </div>
  );
};
