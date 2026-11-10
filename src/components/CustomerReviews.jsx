import React, { useState } from 'react';
import { Star, Quote, CheckCircle2, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export const CustomerReviews = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const prevReview = () => {
    setActiveSlide(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const nextReview = () => {
    setActiveSlide(prev => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section className="py-16 bg-ivory-50 border-t border-champagne-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-1.5 text-champagne-600 font-serif text-xs uppercase tracking-widest font-bold">
            <Star className="w-3.5 h-3.5 fill-gold text-gold" />
            <span>VOICES OF ROYAL CLIENTS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-900 tracking-tight">
            Loved Across India
          </h2>
          <p className="text-sm text-espresso-600">
            Discover why connoisseurs of luxury choose KS FASHION for their most memorable occasions.
          </p>

          {/* Sample Review Demonstration Notice as explicitly required */}
          <div className="inline-block bg-champagne-200/50 border border-champagne-300 px-3 py-1 rounded-full text-[11px] text-espresso-600 italic">
            * Note: Demonstration reviews representative of preview fitting consultations.
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={item.id}
              className={`p-6 rounded-3xl bg-white border border-champagne-300 shadow-luxury hover:shadow-luxury-lg transition-all duration-300 flex flex-col justify-between space-y-4 relative ${
                idx === activeSlide ? 'ring-2 ring-gold/40' : ''
              }`}
            >
              <div className="space-y-3">
                {/* Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-gold">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <Quote className="w-7 h-7 text-champagne-300/80" />
                </div>

                <h4 className="font-serif text-base font-bold text-espresso-900 leading-snug">
                  "{item.title}"
                </h4>

                <p className="text-xs sm:text-sm text-espresso-600 leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              {/* Author & Product Info */}
              <div className="pt-4 border-t border-champagne-100 flex items-center space-x-3.5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-gold/50 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <h5 className="text-xs font-bold text-espresso-900 truncate">{item.name}</h5>
                    {item.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" title="Verified Connoisseur" />
                    )}
                  </div>
                  <p className="text-[10px] text-espresso-500 truncate">{item.role}</p>
                  <span className="text-[10px] text-champagne-600 font-semibold block mt-0.5">
                    Purchased: {item.productName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

