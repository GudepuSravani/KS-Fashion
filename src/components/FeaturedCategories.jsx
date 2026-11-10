import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const FeaturedCategories = () => {
  const { categories, setSelectedCategory, setCurrentView } = useShop();

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-white border-y border-champagne-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-champagne-100/70 border border-champagne-300/80 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
            <span className="text-[11px] font-serif font-bold uppercase tracking-widest text-espresso-800">
              Curated Wardrobe Categories
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-900 tracking-tight">
            Explore By Category
          </h2>
          <p className="text-sm text-espresso-600">
            From regal handcrafted sarees to effortless western silhouettes, find perfection tailored for every celebration.
          </p>
        </div>

        {/* 10 Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-ivory-100 border border-champagne-300/60 hover:border-gold shadow-sm hover:shadow-luxury transition-all duration-500 flex flex-col"
            >
              {/* Category Image Box */}
              <div className="relative aspect-[3/4] overflow-hidden bg-champagne-200/40">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                
                {/* Floating Tag */}
                {cat.badge && (
                  <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-espresso-900 px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm border border-champagne-200">
                    {cat.badge}
                  </span>
                )}

                {/* Arrow Icon on Hover */}
                <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-espresso-900 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-sm">
                  <ArrowUpRight className="w-4 h-4 text-gold" />
                </div>

                {/* Bottom Overlay Label for Mobile */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-serif text-sm sm:text-base font-bold drop-shadow-md">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] text-ivory-200 drop-shadow">
                    {cat.itemCount} Designs
                  </span>
                </div>
              </div>

              {/* Bottom Card Summary for Desktop */}
              <div className="p-3 bg-gradient-to-b from-white to-ivory-100 border-t border-champagne-200/60 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-xs font-bold text-espresso-900 group-hover:text-champagne-600 transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-[10px] text-espresso-500 line-clamp-1">{cat.tagline}</p>
                </div>
                <span className="text-[11px] font-semibold text-champagne-600 group-hover:translate-x-0.5 transition-transform">
                  &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

