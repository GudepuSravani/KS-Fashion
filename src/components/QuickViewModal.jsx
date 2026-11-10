import React, { useState } from 'react';
import { X, ShoppingBag, Heart, Star, ArrowRight, RotateCw, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const QuickViewModal = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setSelectedProduct, 
    setCurrentView,
    open360Viewer 
  } = useShop();

  const [selectedSize, setSelectedSize] = useState('Standard');
  const [selectedColor, setSelectedColor] = useState(null);

  // Synchronize size and color when product changes
  React.useEffect(() => {
    if (quickViewProduct) {
      if (quickViewProduct.sizes && quickViewProduct.sizes.length > 0) {
        setSelectedSize(quickViewProduct.sizes[0]);
      }
      if (quickViewProduct.colors && quickViewProduct.colors.length > 0) {
        setSelectedColor(quickViewProduct.colors[0]);
      }
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isFavorite = isInWishlist(quickViewProduct.id);

  const handleFullDetails = () => {
    setSelectedProduct(quickViewProduct);
    setQuickViewProduct(null);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-gold/40 flex flex-col md:flex-row max-h-[90vh]"
      >
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 text-espresso-800 flex items-center justify-center shadow-md hover:bg-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 aspect-[3/4] bg-champagne-100/50 relative">
          <img
            src={quickViewProduct.images[0]}
            alt={quickViewProduct.name}
            className="w-full h-full object-cover"
          />
          {quickViewProduct.is360 && (
            <button
              onClick={() => {
                setQuickViewProduct(null);
                open360Viewer(quickViewProduct);
              }}
              className="absolute bottom-3 left-3 bg-espresso-900 text-gold text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center space-x-1 shadow-md"
            >
              <RotateCw className="w-3 h-3 animate-spin-slow" />
              <span>360° SPIN</span>
            </button>
          )}
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-champagne-600 font-serif">
              {quickViewProduct.categoryName}
            </span>
            <h3 className="font-serif text-lg font-bold text-espresso-900 leading-snug">
              {quickViewProduct.name}
            </h3>

            <div className="flex items-center space-x-1 text-gold text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-gold" />
              <span>{quickViewProduct.rating}</span>
              <span className="text-espresso-400 font-normal">({quickViewProduct.reviewCount} reviews)</span>
            </div>

            <div className="flex items-baseline space-x-2 pt-1">
              <span className="font-serif text-xl font-bold text-espresso-900">
                ₹{quickViewProduct.discountPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-espresso-400 line-through">
                ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold text-blush-500">
                {quickViewProduct.discountPercent}% OFF
              </span>
            </div>

            <p className="text-xs text-espresso-600 line-clamp-2 leading-relaxed pt-1">
              {quickViewProduct.description}
            </p>

            {/* Sizes */}
            {quickViewProduct.sizes && (
              <div className="space-y-1 pt-2">
                <span className="text-[10px] font-semibold text-espresso-500 uppercase">Available Sizes:</span>
                <div className="flex flex-wrap gap-1.5">
                  {quickViewProduct.sizes.map((sz, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSize(sz)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                        selectedSize === sz
                          ? 'border-gold bg-champagne-200 text-espresso-900 font-bold'
                          : 'border-champagne-300 text-espresso-700'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                addToCart(quickViewProduct, selectedSize, selectedColor, 1);
                setQuickViewProduct(null);
              }}
              className="w-full py-3 bg-espresso-900 hover:bg-champagne-600 text-white rounded-xl font-serif text-xs font-bold tracking-widest uppercase transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4 text-gold" />
              <span>ADD TO SHOPPING BAG</span>
            </button>

            <button
              onClick={handleFullDetails}
              className="w-full py-2.5 bg-ivory-100 hover:bg-champagne-100 text-espresso-800 rounded-xl font-serif text-xs font-bold transition-all text-center flex items-center justify-center space-x-1 border border-champagne-200"
            >
              <span>View Full Details & Fabric Care</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

