import React, { useState, useEffect } from 'react';
import { Tag, Sparkles, ArrowRight, Clock, Copy, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SpecialOffers = () => {
  const { setCurrentView, setSelectedCategory, applyCoupon, showToast } = useShop();

  const [copied, setCopied] = useState(false);

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 36,
    seconds: 42
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    applyCoupon('LUXURY15');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 bg-ivory-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Luxury Promotion Card */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FAF3EC] via-[#FDF8F3] to-[#F7EBE1] border-2 border-gold/40 shadow-luxury-lg p-8 sm:p-12 lg:p-16">
          
          {/* Subtle gold ornamentation corner curves */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-gold/15 to-transparent rounded-bl-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blush-200/25 to-transparent rounded-tr-full pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-5 text-center lg:text-left">
              
              <div className="inline-flex items-center space-x-2 bg-champagne-200/80 border border-gold/50 px-3.5 py-1 rounded-full shadow-xs">
                <Tag className="w-3.5 h-3.5 text-champagne-600" />
                <span className="text-[11px] font-serif font-bold uppercase tracking-widest text-espresso-900">
                  LIMITED TIME PRIVILEGE
                </span>
              </div>

              <div className="space-y-2">
                <span className="block font-serif text-lg sm:text-xl text-champagne-600 font-semibold italic">
                  Upgrade Your Wardrobe
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-espresso-900 tracking-tight leading-tight">
                  Discover Exclusive Fashion Deals – Up to 50% OFF
                </h2>
              </div>

              <p className="text-sm sm:text-base text-espresso-700 max-w-xl font-normal leading-relaxed">
                Indulge in handcrafted silk sarees, embellished lehengas, and tailored couture with complimentary express shipping on all orders over ₹999.
              </p>

              {/* Countdown Clocks */}
              <div className="flex items-center justify-center lg:justify-start space-x-3 pt-2">
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-espresso-600 mr-2">
                  <Clock className="w-4 h-4 text-champagne-600" />
                  <span>Offer Ends In:</span>
                </div>
                <div className="flex space-x-2">
                  <div className="bg-white border border-champagne-300 rounded-xl px-3 py-1.5 shadow-sm text-center min-w-[50px]">
                    <span className="font-serif text-lg font-bold text-espresso-900 block leading-none">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-espresso-500">Hours</span>
                  </div>
                  <div className="bg-white border border-champagne-300 rounded-xl px-3 py-1.5 shadow-sm text-center min-w-[50px]">
                    <span className="font-serif text-lg font-bold text-espresso-900 block leading-none">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-espresso-500">Mins</span>
                  </div>
                  <div className="bg-white border border-champagne-300 rounded-xl px-3 py-1.5 shadow-sm text-center min-w-[50px]">
                    <span className="font-serif text-lg font-bold text-espresso-900 block leading-none">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-espresso-500">Secs</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setCurrentView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 bg-espresso-900 hover:bg-champagne-600 text-white rounded-full font-serif text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-luxury hover:shadow-glow-gold flex items-center justify-center space-x-2 group"
                >
                  <span>SHOP THE SALE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Coupon Code Pill */}
                <button
                  onClick={handleCopyCode}
                  className="w-full sm:w-auto px-5 py-3 bg-white/90 hover:bg-white border border-champagne-300 hover:border-gold rounded-full text-xs font-mono font-bold text-espresso-800 transition-all flex items-center justify-center space-x-2 shadow-sm"
                  title="Click to apply coupon code"
                >
                  <span>CODE: <strong className="text-champagne-600">LUXURY15</strong></span>
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-espresso-500" />
                  )}
                </button>
              </div>

            </div>

            {/* Right Fashion Model Vignette */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden border-2 border-white shadow-luxury-lg rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=85"
                  alt="Exclusive Fashion Deals"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-center bg-white/90 backdrop-blur-md py-2 px-3 rounded-xl border border-champagne-200">
                  <span className="font-serif text-xs font-bold text-espresso-900 block">Stardust Gala Collection</span>
                  <span className="text-[10px] text-champagne-600 font-semibold">Flat 45% Off Preview</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

