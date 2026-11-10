import React from 'react';
import { X, ShieldCheck, FileText, RotateCcw } from 'lucide-react';

export const PolicyModals = ({ activePolicy, onClose }) => {
  if (!activePolicy) return null;

  const policies = {
    privacy: {
      title: 'KS FASHION Privacy Policy',
      icon: ShieldCheck,
      content: (
        <div className="space-y-4 text-xs text-espresso-700 leading-relaxed">
          <p>
            At <strong>KS FASHION</strong>, your privacy and trust are paramount. We respect the personal information you share with us and are committed to safeguarding it with bank-grade 256-bit encryption.
          </p>
          <h4 className="font-serif font-bold text-espresso-900 text-sm">1. Information We Collect</h4>
          <p>We collect your name, contact telephone, delivery address, and payment preferences strictly to process and dispatch your luxury couture orders and provide concierge updates.</p>
          <h4 className="font-serif font-bold text-espresso-900 text-sm">2. Non-Disclosure Commitment</h4>
          <p>We do NOT sell, rent, or trade your personal information with any third-party marketing entities. Information is shared only with verified logistics partners (BlueDart, Delhivery) for doorstep delivery.</p>
          <h4 className="font-serif font-bold text-espresso-900 text-sm">3. Security</h4>
          <p>All online payment transactions are processed through certified PCI-DSS compliant payment gateways. We do not store your complete credit card or CVV details on our servers.</p>
        </div>
      )
    },
    terms: {
      title: 'KS FASHION Terms and Conditions',
      icon: FileText,
      content: (
        <div className="space-y-4 text-xs text-espresso-700 leading-relaxed">
          <p>
            Welcome to <strong>KS FASHION</strong>. By accessing or shopping through our platform, you agree to our Terms of Luxury Service and ethical fashion protocols.
          </p>
          <h4 className="font-serif font-bold text-espresso-900 text-sm">1. Handloom & Craft Authenticity</h4>
          <p>All pure silk sarees and handloom garments are certified with official Silk Mark standards. Natural yarn slubs and delicate weave variations are intrinsic marks of authentic handloom craftsmanship.</p>
          <h4 className="font-serif font-bold text-espresso-900 text-sm">2. Orders and Pricing</h4>
          <p>All prices are listed in Indian Rupees (₹ INR) and include applicable GST taxes. Orders are confirmed upon successful authorization or cash on delivery approval.</p>
          <h4 className="font-serif font-bold text-espresso-900 text-sm">3. Intellectual Property</h4>
          <p>The KS FASHION brand name, logo, typography, and original designs are protected intellectual property. Unauthorized reproduction is strictly prohibited.</p>
        </div>
      )
    },
    refund: {
      title: 'KS FASHION Return & Refund Policy',
      icon: RotateCcw,
      content: (
        <div className="space-y-4 text-xs text-espresso-700 leading-relaxed">
          <p>
            We take supreme pride in the fitting and quality of every KS garment. If for any reason you wish to exchange or return your selection, we offer an effortless 7-day guarantee.
          </p>
          <h4 className="font-serif font-bold text-espresso-900 text-sm">1. 7-Day Hassle-Free Window</h4>
          <p>You may initiate an exchange or return within 7 calendar days from the date of confirmed delivery. The product must remain unworn, unaltered, and with original KS tags and satin box packaging intact.</p>
          <h4 className="font-serif font-bold text-espresso-900 text-sm">2. Free Doorstep Reverse Pickup</h4>
          <p>Once initiated through your account or by WhatsApp concierge (+91 98765 43210), our logistics partner will collect the parcel from your doorstep at zero cost.</p>
          <h4 className="font-serif font-bold text-espresso-900 text-sm">3. Rapid Refund Process</h4>
          <p>Refunds are credited to your original payment mode (or UPI for Cash on Delivery orders) within 24–48 hours of inspection at our Hyderabad atelier.</p>
        </div>
      )
    }
  };

  const current = policies[activePolicy];
  if (!current) return null;
  const IconComponent = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-gold/40 p-6 sm:p-8 space-y-5 max-h-[85vh] flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-espresso-400 hover:text-espresso-900 p-2 rounded-full hover:bg-champagne-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 pb-3 border-b border-champagne-200">
          <div className="w-10 h-10 rounded-full bg-champagne-100 text-champagne-600 flex items-center justify-center flex-shrink-0">
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-champagne-600 block">
              KS LEGAL & COMPLIANCE
            </span>
            <h3 className="font-serif text-lg font-bold text-espresso-900">
              {current.title}
            </h3>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2">
          {current.content}
        </div>

        <div className="pt-3 border-t border-champagne-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-espresso-900 text-white rounded-xl font-serif text-xs font-bold uppercase tracking-wider hover:bg-champagne-600 transition-colors"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};

