import React, { useState } from 'react';
import { 
  ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, 
  Tag, Truck, ShieldCheck, Sparkles, Check 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartPage = () => {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    cartSubtotal, 
    cartOriginalTotal, 
    productSavings,
    shippingFee, 
    isFreeShipping, 
    freeShippingProgress, 
    amountNeededForFreeShip,
    finalTotal,
    couponCode, 
    appliedCoupon, 
    couponDiscount, 
    couponError, 
    applyCoupon, 
    removeCoupon,
    setCurrentView 
  } = useShop();

  const [inputCoupon, setInputCoupon] = useState('');

  if (cart.length === 0) {
    return (
      <div className="bg-ivory-50 min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-champagne-300 shadow-luxury text-center space-y-5">
          <div className="w-20 h-20 rounded-full bg-champagne-100 flex items-center justify-center mx-auto text-champagne-600">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-espresso-900">Your Shopping Bag is Empty</h2>
          <p className="text-xs text-espresso-600 leading-relaxed">
            Discover our curated handloom silks, chikankari kurtis, and contemporary designer western wear.
          </p>
          <button
            onClick={() => setCurrentView('shop')}
            className="w-full py-3.5 bg-espresso-900 hover:bg-champagne-600 text-white rounded-full font-serif text-xs font-bold uppercase tracking-widest transition-all shadow-luxury"
          >
            EXPLORE KS COLLECTIONS
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
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-900">Shopping Bag</h1>
            <p className="text-xs text-espresso-600 mt-1">Review your selected luxury pieces before secure checkout</p>
          </div>
          <button
            onClick={() => setCurrentView('shop')}
            className="flex items-center space-x-1.5 text-xs text-champagne-600 hover:text-espresso-900 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Browsing</span>
          </button>
        </div>

        {/* Free Shipping Alert Banner */}
        <div className="bg-white rounded-2xl p-4 border border-champagne-300 shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-xs font-semibold text-espresso-800">
            <div className="w-8 h-8 rounded-full bg-champagne-100 text-champagne-600 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              {isFreeShipping ? (
                <span className="text-emerald-700 font-bold block">✓ You qualify for Free Insured Express Shipping!</span>
              ) : (
                <span>Add <strong>₹{amountNeededForFreeShip.toLocaleString('en-IN')}</strong> more to unlock <strong>Complimentary Free Shipping</strong> (Orders &gt; ₹999)</span>
              )}
            </div>
          </div>
          <div className="w-full sm:w-48">
            <div className="h-2 bg-champagne-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gold rounded-full transition-all duration-500" 
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Grid Layout: Cart Items Table + Order Summary Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div 
                key={item.itemKey}
                className="bg-white rounded-2xl border border-champagne-300 p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-24 h-32 object-cover rounded-xl border border-champagne-200 flex-shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-champagne-600 font-serif">
                    {item.product.categoryName}
                  </span>
                  <h3 className="font-serif text-base font-semibold text-espresso-900 leading-snug">
                    {item.product.name}
                  </h3>
                  <div className="flex items-center space-x-3 text-xs text-espresso-500 pt-1">
                    <span>Size: <strong className="text-espresso-800">{item.size}</strong></span>
                    <span>•</span>
                    <span>Color: <strong className="text-espresso-800">{item.color.name}</strong></span>
                  </div>

                  <div className="flex items-baseline space-x-2 pt-2">
                    <span className="font-serif text-lg font-bold text-espresso-900">
                      ₹{(item.product.discountPrice * item.quantity).toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-espresso-400 line-through">
                      ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Quantity and Remove */}
                <div className="flex items-center space-x-4 self-end sm:self-center">
                  <div className="flex items-center space-x-2 bg-champagne-100 rounded-xl p-1 border border-champagne-200">
                    <button
                      onClick={() => updateQuantity(item.itemKey, -1)}
                      className="w-7 h-7 rounded-lg bg-white flex items-center justify-center hover:bg-champagne-200 text-espresso-800"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-sm font-bold text-espresso-900 px-2">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.itemKey, 1)}
                      className="w-7 h-7 rounded-lg bg-white flex items-center justify-center hover:bg-champagne-200 text-espresso-800"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.itemKey)}
                    className="p-2 text-espresso-400 hover:text-rose-600 transition-colors"
                    title="Remove from bag"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={clearCart}
                className="text-xs text-espresso-500 hover:text-rose-600 underline"
              >
                Clear entire bag
              </button>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-champagne-300 p-6 shadow-luxury space-y-5">
              <h3 className="font-serif text-lg font-bold text-espresso-900 pb-3 border-b border-champagne-200">
                Order Summary
              </h3>

              {/* Coupon input */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-espresso-700">Promo or Gift Code</span>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                    <div>
                      <span className="font-bold">{couponCode}</span>
                      <p className="text-[10px] text-emerald-600">{appliedCoupon.label}</p>
                    </div>
                    <button onClick={removeCoupon} className="text-rose-600 font-bold hover:underline">
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
                      placeholder="e.g. LUXURY15"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="flex-1 bg-ivory-100 border border-champagne-300 rounded-xl px-3 py-2 text-xs uppercase font-mono focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-espresso-900 text-white rounded-xl text-xs font-bold hover:bg-champagne-600"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[10px] text-rose-600">{couponError}</p>}
              </div>

              {/* Breakdown */}
              <div className="space-y-2.5 text-xs text-espresso-600 border-t border-champagne-200 pt-3">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-bold text-espresso-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Savings</span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-espresso-900 pt-3 border-t border-champagne-200">
                  <span>Total Amount</span>
                  <span className="font-serif text-xl">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setCurrentView('checkout');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-4 bg-espresso-900 hover:bg-champagne-600 text-white rounded-2xl font-serif text-xs font-bold tracking-widest uppercase transition-all shadow-luxury hover:shadow-glow-gold flex items-center justify-center space-x-2"
              >
                <span>PROCEED TO SECURE CHECKOUT</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </button>

              <div className="text-[11px] text-espresso-500 text-center flex items-center justify-center space-x-1.5 pt-1">
                <ShieldCheck className="w-4 h-4 text-champagne-600" />
                <span>256-Bit Encrypted Payments</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

