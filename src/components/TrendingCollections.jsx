import React from 'react';
import { ArrowRight, Sparkles, Crown } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { TRENDING_COLLECTIONS } from '../data/products';

export const TrendingCollections = () => {
  const { setSelectedCategory, setCurrentView } = useShop();

  const handleCollectionClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-ivory-100 border-t border-champagne-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-1.5 text-champagne-600 font-serif text-xs uppercase tracking-widest font-bold">
            <Crown className="w-3.5 h-3.5 text-gold" />
            <span>EDITORIAL SPOTLIGHT</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-900 tracking-tight">
            Trending Styles of the Season
          </h2>
          <p className="text-sm text-espresso-600">
            Carefully curated lookbooks capturing celebratory splendor, modern femininity, and timeless royal majesty.
          </p>
        </div>

        {/* 3 Large Editorial Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TRENDING_COLLECTIONS.map((col) => (
            <div
              key={col.id}
              onClick={() => handleCollectionClick(col.category)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-champagne-300 shadow-luxury hover:shadow-luxury-lg transition-all duration-500 flex flex-col relative"
            >
              {/* Image with Gradient Overlay */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/85 via-espresso-950/25 to-transparent"></div>

                {/* Floating Tag */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-espresso-900 border border-champagne-200">
                  {col.tag}
                </div>

                {/* Price Accent Pill */}
                <div className="absolute top-4 right-4 bg-gold/90 text-espresso-950 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider shadow-sm">
                  {col.accent}
                </div>

                {/* Bottom Content Over Image */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight group-hover:text-gold-light transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs text-ivory-200 line-clamp-2 leading-relaxed opacity-90">
                    {col.description}
                  </p>
                  <div className="pt-2 flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-gold-light group-hover:text-white transition-colors">
                    <span>EXPLORE EDIT</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

