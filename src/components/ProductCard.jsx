import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, RotateCw, Star, Check, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductCard = ({ product }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setSelectedProduct, 
    setCurrentView,
    open360Viewer,
    setQuickViewProduct
  } = useShop();

  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard'
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isFavorite = isInWishlist(product.id);
  const hasMultipleImages = product.images && product.images.length > 1;

  const handleCardClick = () => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor, 1);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handle360Click = (e) => {
    e.stopPropagation();
    open360Viewer(product);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group cursor-pointer bg-white rounded-2xl border border-champagne-300/60 hover:border-gold/80 overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-500 flex flex-col relative select-none outline-none focus:outline-none"
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 pointer-events-none select-none">
        {product.discountPercent > 0 && (
          <span className="bg-blush-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm tracking-wide uppercase select-none">
            {product.discountPercent}% OFF
          </span>
        )}
        {product.badges && product.badges.map((b, idx) => (
          <span 
            key={idx} 
            className="bg-ivory-100/90 backdrop-blur-md text-espresso-800 border border-champagne-300 text-[9px] font-serif font-bold px-2 py-0.5 rounded-full shadow-sm tracking-widest uppercase select-none"
          >
            {b}
          </span>
        ))}
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          className="w-8 h-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-md shadow-md flex items-center justify-center text-espresso-700 hover:text-rose-500 hover:scale-110 active:scale-90 transition-all outline-none focus:outline-none"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* 360-Degree Viewer Trigger */}
        {product.is360 && (
          <button
            type="button"
            onClick={handle360Click}
            title="Interactive 360° View"
            className="w-8 h-8 rounded-full bg-gold/90 hover:bg-gold text-espresso-950 shadow-md flex items-center justify-center hover:scale-110 active:scale-90 transition-all outline-none focus:outline-none"
          >
            <RotateCw className="w-4 h-4 animate-spin-slow" />
          </button>
        )}
      </div>

      {/* Product Image Container with Clean Natural Brightness (No dark overlay) */}
      <div className="relative aspect-[3/4] overflow-hidden bg-champagne-100/50 select-none">
        {/* Primary Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          draggable="false"
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108 will-change-transform select-none pointer-events-none"
          loading="lazy"
        />

        {/* Secondary Image (Smooth Cross-Fade on Hover if available) */}
        {hasMultipleImages && (
          <img
            src={product.images[1]}
            alt={`${product.name} - Alternate View`}
            draggable="false"
            className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out opacity-0 group-hover:opacity-100 group-hover:scale-108 will-change-transform pointer-events-none select-none"
            loading="lazy"
          />
        )}

        {/* Slide-up Quick View Button on Image Hover */}
        <div className="absolute inset-x-3 bottom-3 z-20 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out pointer-events-auto">
          <button
            type="button"
            onClick={handleQuickView}
            className="w-full py-2.5 px-3 bg-white/95 hover:bg-espresso-900 text-espresso-900 hover:text-white backdrop-blur-md rounded-xl text-xs font-serif font-bold tracking-wider uppercase flex items-center justify-center space-x-2 shadow-luxury border border-champagne-300 hover:border-espresso-900 transition-all duration-300 outline-none focus:outline-none"
          >
            <Eye className="w-3.5 h-3.5 text-champagne-600 group-hover:text-gold" />
            <span>Quick View</span>
          </button>
        </div>

        {/* 360 Pill Indicator */}
        {product.is360 && (
          <div className="absolute top-3 right-12 z-20 bg-espresso-900/80 backdrop-blur-sm text-gold text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 shadow-sm pointer-events-none select-none">
            <RotateCw className="w-3 h-3 animate-spin-slow" />
            <span>360°</span>
          </div>
        )}

        {/* Stock warning if low */}
        {product.stock <= 5 && (
          <div className="absolute bottom-3 left-3 z-10 bg-burgundy/85 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full pointer-events-none group-hover:opacity-0 transition-opacity select-none">
            Only {product.stock} left
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white select-none">
        
        <div>
          {/* Category & Star Rating */}
          <div className="flex items-center justify-between text-xs text-espresso-500 mb-1">
            <span className="uppercase tracking-wider font-medium text-[11px] text-champagne-600 font-serif">
              {product.categoryName}
            </span>
            <div className="flex items-center space-x-1 text-gold font-bold">
              <Star className="w-3.5 h-3.5 fill-gold text-gold" />
              <span>{product.rating}</span>
              <span className="text-espresso-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-sm sm:text-base font-semibold text-espresso-900 group-hover:text-champagne-600 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Pricing */}
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-base sm:text-lg font-bold text-espresso-900 font-serif">
              ₹{product.discountPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-xs sm:text-sm text-espresso-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-semibold text-blush-500">
              Save ₹{(product.originalPrice - product.discountPrice).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Size Selection Chips */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="space-y-1" onClick={(e) => e.stopPropagation()}>
            <span className="text-[10px] font-semibold text-espresso-400 uppercase tracking-wider block">
              Size:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((sz, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`text-[11px] px-2 py-0.5 rounded-md border transition-all ${
                    selectedSize === sz
                      ? 'border-gold bg-champagne-100 text-espresso-900 font-bold shadow-xs'
                      : 'border-champagne-200 text-espresso-600 hover:border-champagne-400'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons: Add to Bag & Buy Now */}
        <div className="grid grid-cols-2 gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={handleAddToCart}
            className={`py-2 px-2 rounded-xl font-serif text-[11px] font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-1 shadow-xs ${
              addedAnimation
                ? 'bg-emerald-700 text-white'
                : 'bg-ivory-100 hover:bg-champagne-100 text-espresso-900 border border-champagne-300'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-champagne-600" />
                <span>ADD TO BAG</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleBuyNow}
            className="py-2 px-2 bg-burgundy hover:bg-espresso-900 text-white rounded-xl font-serif text-[11px] font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-1 shadow-sm hover:shadow-luxury"
          >
            <span>BUY NOW</span>
            <ChevronRight className="w-3.5 h-3.5 text-gold" />
          </button>
        </div>

      </div>
    </div>
  );
};
