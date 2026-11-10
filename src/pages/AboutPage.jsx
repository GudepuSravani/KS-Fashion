import React from 'react';
import { Crown, Sparkles, Award, Scissors, HeartHandshake, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { AboutSection } from '../components/AboutSection';
import { WhyChooseUs } from '../components/WhyChooseUs';

export const AboutPage = () => {
  const { setCurrentView } = useShop();

  return (
    <div className="bg-ivory-50 min-h-screen py-10 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Hero Banner for About */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
          <div className="inline-flex items-center space-x-2 bg-champagne-200/80 border border-gold/40 px-4 py-1 rounded-full">
            <Crown className="w-4 h-4 text-gold" />
            <span className="text-xs font-serif font-bold uppercase tracking-widest text-espresso-900">
              HERITAGE & COUTURE EXCELLENCE
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-espresso-900 tracking-tight leading-tight">
            The Story Behind KS FASHION
          </h1>

          <p className="text-base text-espresso-700 leading-relaxed font-serif italic">
            "Elegance in Every Thread."
          </p>
        </div>

        {/* Core Requested Brand Story Section */}
        <AboutSection />

        {/* Behind the Loom Photo Grid */}
        <div className="bg-white rounded-3xl border border-champagne-300 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-900">
              Artisan Guilds of Varanasi & Kanchipuram
            </h3>
            <p className="text-xs sm:text-sm text-espresso-600">
              Each KS saree requires up to 240 hours of handloom dedication by master weavers whose families have passed down ancient shuttle-loom traditions for over five centuries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden shadow-sm aspect-[4/3] group relative">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85"
                alt="Silk Zari Weaving"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <span className="text-xs font-serif text-white font-bold">Pure Zari Brocade Weaving</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-sm aspect-[4/3] group relative">
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85"
                alt="Lucknowi Chikankari"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <span className="text-xs font-serif text-white font-bold">Chikankari Needlecraft</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-sm aspect-[4/3] group relative">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85"
                alt="Tailored Modern Western"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <span className="text-xs font-serif text-white font-bold">Precision Pattern Drafting</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <WhyChooseUs />

        {/* CTA */}
        <div className="text-center py-8">
          <button
            onClick={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-espresso-900 hover:bg-champagne-600 text-white rounded-full font-serif text-xs font-bold tracking-widest uppercase transition-all shadow-luxury hover:shadow-glow-gold"
          >
            EXPLORE KS COLLECTIONS &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};

