import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage = () => {
  const { wishlist, products, setCurrentView, addToCart } = useShop();

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  if (savedProducts.length === 0) {
    return (
      <div className="bg-ivory-50 min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-champagne-300 shadow-luxury text-center space-y-5">
          <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mx-auto text-rose-500">
            <Heart className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-espresso-900">Your Wishlist is Empty</h2>
          <p className="text-xs text-espresso-600 leading-relaxed">
            Save your favorite handcrafted sarees, gowns, and accessories to revisit them anytime.
          </p>
          <button
            onClick={() => setCurrentView('shop')}
            className="w-full py-3.5 bg-espresso-900 hover:bg-champagne-600 text-white rounded-full font-serif text-xs font-bold uppercase tracking-widest transition-all shadow-luxury"
          >
            DISCOVER CREATIONS
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-champagne-200">
          <div>
            <div className="flex items-center space-x-2 text-rose-500 mb-1">
              <Heart className="w-4 h-4 fill-rose-500" />
              <span className="text-xs font-serif font-bold uppercase tracking-widest text-champagne-600">
                CURATED WARDROBE
              </span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-espresso-900">
              My Saved Wishlist ({savedProducts.length})
            </h1>
          </div>

          <button
            onClick={() => setCurrentView('shop')}
            className="flex items-center space-x-1.5 text-xs text-champagne-600 hover:text-espresso-900 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Wishlist Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {savedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
};

