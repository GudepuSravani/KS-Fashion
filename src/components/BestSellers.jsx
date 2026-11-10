import React from 'react';
import { Heart, Star, Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

export const BestSellers = () => {
  const { products, setCurrentView, setSelectedCategory } = useShop();

  const bestSellerProducts = products.filter(p => p.isBestSeller);

  return (
    <section className="py-16 bg-white border-t border-champagne-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-champagne-200">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 text-champagne-600 font-serif text-xs uppercase tracking-widest font-bold">
              <Star className="w-3.5 h-3.5 fill-gold text-gold" />
              <span>THE HALLMARK OF EXCELLENCE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-900 tracking-tight">
              Our Most Loved Styles
            </h2>
            <p className="text-sm text-espresso-600 max-w-xl">
              Cherished creations reviewed and revered by royal connoisseurs and fashion mavens across India.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hidden md:inline-flex items-center space-x-2 text-xs font-serif font-bold uppercase tracking-wider text-champagne-600 hover:text-espresso-900 transition-colors"
          >
            <span>VIEW ALL BESTSELLERS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestSellerProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

