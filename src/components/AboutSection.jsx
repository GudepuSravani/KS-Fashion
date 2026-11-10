import React from 'react';
import { Sparkles, Crown, Award, Scissors, HeartHandshake } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section className="py-20 bg-ivory-50 border-t border-champagne-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Imagery Montage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md">
              
              {/* Primary Image with Clean Contained Atelier Badge */}
              <div className="relative rounded-3xl overflow-hidden shadow-luxury-lg border border-champagne-300">
                <img
                  src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85"
                  alt="KS FASHION Master Silk Craftsmanship"
                  className="w-full h-[450px] object-cover"
                />

                {/* Contained Atelier Badge */}
                <div className="hidden sm:block absolute bottom-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-champagne-300 shadow-luxury max-w-[210px]">
                  <div className="flex items-center space-x-1.5 text-gold mb-1">
                    <Crown className="w-4 h-4" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-espresso-900 font-serif">
                      ROYAL ATELIER
                    </span>
                  </div>
                  <p className="text-xs font-serif text-espresso-800 italic leading-snug">
                    "Elegance in Every Thread."
                  </p>
                  <span className="text-[10px] text-champagne-600 font-semibold block mt-1">
                    100% Certified Mulberry Silks
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Brand Story & Pillars */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center space-x-2 bg-champagne-100/70 border border-champagne-300 px-3.5 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
              <span className="text-[11px] font-serif font-bold uppercase tracking-widest text-espresso-800">
                OUR PHILOSOPHY & HERITAGE
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-espresso-900 tracking-tight leading-tight">
              About KS FASHION
            </h2>

            {/* Official Requested Description */}
            <blockquote className="border-l-2 border-gold pl-4 py-1 text-base sm:text-lg text-espresso-800 font-serif italic leading-relaxed bg-champagne-50/50 rounded-r-xl">
              "At KS FASHION, we believe fashion is more than just clothing. It is a reflection of your personality, confidence, and individuality. Our collections bring together modern trends, timeless elegance, and everyday comfort. We are dedicated to helping every woman express her unique style with confidence."
            </blockquote>

            <p className="text-sm text-espresso-600 leading-relaxed">
              Born from a passion for exquisite textiles and contemporary Indian aesthetics, KS FASHION curates attire for women who cherish the quiet confidence of quality. From handloom master weavers in Varanasi and Kanchipuram to precision-cut modern western ensembles, every silhouette is tailored to perfection.
            </p>

            {/* Feature Mini Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-white p-4 rounded-2xl border border-champagne-200 shadow-sm">
                <Award className="w-6 h-6 text-champagne-600 mb-2" />
                <h4 className="font-serif text-sm font-bold text-espresso-900">Master Craftsmanship</h4>
                <p className="text-[11px] text-espresso-500 mt-1">Direct partnerships with generational handloom artisans across India.</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-champagne-200 shadow-sm">
                <Scissors className="w-6 h-6 text-champagne-600 mb-2" />
                <h4 className="font-serif text-sm font-bold text-espresso-900">Bespoke Fit</h4>
                <p className="text-[11px] text-espresso-500 mt-1">Designed with precision grading for sublime comfort and flattering lines.</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-champagne-200 shadow-sm">
                <HeartHandshake className="w-6 h-6 text-champagne-600 mb-2" />
                <h4 className="font-serif text-sm font-bold text-espresso-900">Conscious Luxury</h4>
                <p className="text-[11px] text-espresso-500 mt-1">Ethical textiles, zero compromise on pure silks and sustainable packaging.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

