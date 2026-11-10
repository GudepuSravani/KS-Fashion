import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

export const NewArrivals = () => {
  const { products, setCurrentView, setSelectedCategory } = useShop();

  const [activeFilter, setActiveFilter] = useState('all');

  // Filter products marked as new arrival or fresh additions
  const newArrivalsList = products.filter(p => p.isNewArrival || p.isTrending);

  const filterTabs = [
    { id: 'all', label: 'All New In' },
    { id: 'sarees', label: 'Silk Sarees' },
    { id: 'ethnic-wear', label: 'Ethnic & Festive' },
    { id: 'western-wear', label: 'Western Atelier' },
    { id: 'kurtis', label: 'Chikankari' }
  ];

  const displayedProducts = activeFilter === 'all'
    ? newArrivalsList
    : newArrivalsList.filter(p => p.category === activeFilter);

  return (
    <section className="py-16 bg-gradient-to-b from-ivory-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-champagne-200">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 text-champagne-600 font-serif text-xs uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>HANDPICKED FOR THE MODERN MUSE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-900 tracking-tight">
              Fresh Styles, Just for You
            </h2>
            <p className="text-sm text-espresso-600 max-w-xl">
              Immerse yourself in newly arrived couture, woven silks, and modern silhouettes crafted to elevate your presence.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 mt-4 md:mt-0 scrollbar-none">
            {filterTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                  activeFilter === tab.id
                    ? 'bg-espresso-900 text-white shadow-sm'
                    : 'bg-champagne-100/70 text-espresso-700 hover:bg-champagne-200/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-white hover:bg-champagne-100 text-espresso-900 border border-champagne-300 hover:border-gold font-serif text-xs font-bold uppercase tracking-widest shadow-sm hover:shadow-luxury transition-all duration-300 group"
          >
            <span>DISCOVER ALL NEW ARRIVALS</span>
            <ArrowRight className="w-4 h-4 text-champagne-600 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

