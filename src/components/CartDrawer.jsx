import React, { useState } from 'react';
import { 
  X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, 
  Sparkles, ShieldCheck, Tag, Check, Truck 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer = () => {
  const { 
    isCartOpen, setIsCartOpen, 
    cart, updateQuantity, removeFromCart, clearCart,
    cartSubtotal, cartOriginalTotal, productSavings,
    shippingFee, isFreeShipping, freeShippingProgress, amountNeededForFreeShip,
    finalTotal,
    couponCode, appliedCoupon, couponDiscount, couponError, applyCoupon, removeCoupon,
    setCurrentView
  } = useShop();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewCartPage = () => {
    setIsCartOpen(false);
    setCurrentView('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-espresso-950/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-ivory-100 shadow-2xl flex flex-col border-l border-champagne-300">
          
          {/* Header */}
          <div className="p-5 border-b border-champagne-300/80 bg-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-champagne-600" />
              <h3 className="font-serif text-lg font-bold text-espresso-900">
                Your Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-champagne-100 text-espresso-700 hover:text-espresso-950 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-5 py-3.5 bg-champagne-100/60 border-b border-champagne-300/60">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="flex items-center space-x-1.5 text-espresso-800">
                <Truck className="w-3.5 h-3.5 text-champagne-600" />
                {isFreeShipping ? (
                  <span className="text-emerald-700 font-bold">You've unlocked Complimentary Express Delivery!</span>
                ) : (
                  <span>Add ₹{amountNeededForFreeShip.toLocaleString('en-IN')} more for <strong>FREE Shipping</strong></span>
                )}
              </span>
              <span className="text-champagne-600 font-bold">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-champagne-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-gold to-champagne-500 rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-champagne-200/50 flex items-center justify-center text-champagne-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-espresso-900">Your bag is empty</h4>
                  <p className="text-xs text-espresso-500 mt-1 max-w-xs">
                    Explore our regal saree and couture collections to begin your signature KS look.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentView('shop');
                  }}
                  className="px-6 py-2.5 bg-espresso-900 text-white rounded-full font-serif text-xs font-bold uppercase tracking-wider hover:bg-champagne-600 transition-colors shadow-sm"
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.itemKey}
                  className="bg-white p-3.5 rounded-2xl border border-champagne-200 shadow-sm flex space-x-3.5 relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-xl border border-champagne-100 flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-xs sm:text-sm font-semibold text-espresso-900 line-clamp-1 pr-4">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.itemKey)}
                          className="text-espresso-400 hover:text-rose-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-espresso-500 mt-0.5 space-x-2">
                        <span>Size: <strong className="text-espresso-800">{item.size}</strong></span>
                        <span>•</span>
                        <span>{item.color?.name}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Price */}
                      <div className="flex items-baseline space-x-1.5">
                        <span className="font-serif text-sm font-bold text-espresso-900">
                          ₹{(item.product.discountPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-espresso-400 line-through">
                          ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Quantity Controller */}
                      <div className="flex items-center space-x-2 bg-champagne-100/60 rounded-lg p-1 border border-champagne-200">
                        <button
                          onClick={() => updateQuantity(item.itemKey, -1)}
                          className="w-5 h-5 rounded bg-white text-espresso-800 flex items-center justify-center hover:bg-champagne-200 transition-colors text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold text-espresso-900 px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.itemKey, 1)}
                          className="w-5 h-5 rounded bg-white text-espresso-800 flex items-center justify-center hover:bg-champagne-200 transition-colors text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Calculations & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-champagne-300 space-y-3.5">
              
              {/* Coupon input */}
              <div className="space-y-1">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-2 rounded-xl">
                    <span className="flex items-center space-x-1.5 font-semibold">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{couponCode} applied ({appliedCoupon.label})</span>
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      applyCoupon(inputCoupon);
                      setInputCoupon('');
                    }}
                    className="flex space-x-2"
                  >
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. LUXURY15)"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="flex-1 bg-ivory-100 border border-champagne-300 rounded-xl px-3 py-2 text-xs text-espresso-900 uppercase font-mono placeholder:normal-case placeholder:font-sans focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-champagne-200 hover:bg-champagne-300 text-espresso-900 text-xs font-bold rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[10px] text-rose-600 font-medium pl-1">{couponError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-espresso-600 pt-1">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-espresso-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Insured Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-espresso-900 pt-2 border-t border-champagne-200">
                  <span>Grand Total</span>
                  <span className="font-serif text-lg">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 bg-espresso-900 hover:bg-champagne-600 text-white rounded-xl font-serif text-xs font-bold tracking-widest uppercase transition-all shadow-luxury hover:shadow-glow-gold flex items-center justify-center space-x-2"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4 text-gold" />
                </button>

                <div className="flex items-center justify-between text-[11px] text-espresso-500 pt-1 px-1">
                  <button 
                    onClick={handleViewCartPage}
                    className="hover:text-champagne-600 underline font-medium"
                  >
                    View Detailed Cart Page
                  </button>
                  <button 
                    onClick={clearCart}
                    className="hover:text-rose-600 transition-colors"
                  >
                    Clear Bag
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

