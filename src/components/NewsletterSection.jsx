import React, { useState } from 'react';
import { Mail, Sparkles, Check, ArrowRight, Gift } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const NewsletterSection = () => {
  const { showToast, applyCoupon } = useShop();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      applyCoupon('FIRST10');
      showToast('Welcome to KS FASHION! Code FIRST10 has been automatically unlocked.');
    } else {
      showToast('Please enter a valid email address.', 'info');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-ivory-100 via-champagne-100/70 to-ivory-100 border-t border-champagne-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <div className="inline-flex items-center space-x-2 bg-white/80 border border-gold/40 px-4 py-1 rounded-full shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
          <span className="text-[11px] font-serif font-bold uppercase tracking-widest text-espresso-900">
            THE PRIVILEGE CIRCLE
          </span>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-espresso-900 tracking-tight">
            Stay in Style with KS FASHION
          </h2>
          <p className="text-sm sm:text-base text-espresso-600 max-w-xl mx-auto leading-relaxed">
            Subscribe to receive updates about new collections, exclusive offers, and the latest fashion trends.
          </p>
        </div>

        {isSubscribed ? (
          <div className="bg-white p-6 rounded-3xl border border-gold/50 shadow-luxury max-w-md mx-auto space-y-2 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-base font-bold text-espresso-900">
              Welcome to the KS Family!
            </h4>
            <p className="text-xs text-espresso-600">
              Your welcome voucher code <strong className="text-gold font-bold">FIRST10</strong> is now applied to your session for 10% off.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white border border-champagne-300 rounded-full py-3.5 pl-11 pr-4 text-xs sm:text-sm text-espresso-900 placeholder-espresso-400 focus:outline-none focus:ring-2 focus:ring-gold/60 shadow-inner"
              />
              <Mail className="w-4 h-4 text-champagne-500 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="px-7 py-3.5 bg-espresso-900 hover:bg-champagne-600 text-white rounded-full font-serif text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-luxury hover:shadow-glow-gold flex items-center justify-center space-x-2"
            >
              <span>SUBSCRIBE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <div className="flex items-center justify-center space-x-4 text-xs text-espresso-500 pt-2">
          <span className="flex items-center space-x-1">
            <Gift className="w-3.5 h-3.5 text-champagne-600" />
            <span>Instant 10% Welcome Gift</span>
          </span>
          <span>•</span>
          <span>Zero Spam, Unsubscribe Anytime</span>
        </div>

      </div>
    </section>
  );
};

