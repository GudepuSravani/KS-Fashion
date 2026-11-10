import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, CreditCard, Smartphone, Building, 
  Banknote, ArrowLeft, Check, Sparkles, CheckCircle2, 
  Truck, ArrowRight, Printer, PackageCheck 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CheckoutPage = () => {
  const { 
    cart, 
    cartSubtotal, 
    shippingFee, 
    couponDiscount, 
    finalTotal, 
    placeOrder, 
    setCurrentView,
    user 
  } = useShop();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user ? user.name : 'Priya Sharma',
    phone: user ? user.phone : '+91 98765 43210',
    email: user ? user.email : 'priya@example.com',
    address: 'Plot 42, Jubilee Hills, Road No. 36',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500033'
  });

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'cod'
  const [upiApp, setUpiApp] = useState('gpay');
  const [cardInfo, setCardInfo] = useState({
    number: '•••• •••• •••• 4289',
    name: 'PRIYA SHARMA',
    expiry: '09/29',
    cvv: '•••'
  });
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrderSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const placed = await placeOrder(
        shippingInfo, 
        paymentMethod === 'upi' ? `UPI (${upiApp.toUpperCase()})` : paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'cod' ? 'Cash on Delivery' : 'Net Banking'
      );
      setConfirmedOrder(placed);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If order was just placed, display celebratory confirmation view
  if (confirmedOrder) {
    return (
      <div className="bg-ivory-50 min-h-screen py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border-2 border-gold/40 shadow-luxury-lg text-center space-y-6 animate-fade-in">
          
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-serif font-bold tracking-widest text-champagne-600 block">
              ROYAL ATELIER DISPATCH CONFIRMED
            </span>
            <h1 className="font-serif text-3xl font-bold text-espresso-900">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-espresso-600">
              Your bespoke fashion selection is being hand-inspected and packed in our signature KS burgundy satin box.
            </p>
          </div>

          <div className="bg-ivory-100 rounded-2xl p-6 border border-champagne-300 text-left space-y-3 text-xs">
            <div className="flex justify-between border-b border-champagne-200 pb-2">
              <span className="text-espresso-500">Order Reference:</span>
              <strong className="font-mono text-espresso-900">{confirmedOrder.id}</strong>
            </div>
            <div className="flex justify-between border-b border-champagne-200 pb-2">
              <span className="text-espresso-500">Tracking Number:</span>
              <strong className="font-mono text-champagne-600">{confirmedOrder.trackingNumber}</strong>
            </div>
            <div className="flex justify-between border-b border-champagne-200 pb-2">
              <span className="text-espresso-500">Delivery Address:</span>
              <span className="font-medium text-espresso-800 text-right max-w-xs">{confirmedOrder.address}</span>
            </div>
            <div className="flex justify-between pt-1 text-sm font-bold">
              <span>Total Paid ({confirmedOrder.paymentMethod}):</span>
              <span className="font-serif text-base text-espresso-900">₹{confirmedOrder.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={() => window.print()}
              className="flex-1 py-3 bg-white border border-champagne-300 text-espresso-900 rounded-xl text-xs font-bold font-serif hover:bg-champagne-100 transition-colors flex items-center justify-center space-x-2"
            >
              <Printer className="w-4 h-4 text-champagne-600" />
              <span>PRINT ROYAL RECEIPT</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('profile');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex-1 py-3 bg-espresso-900 text-white rounded-xl text-xs font-bold font-serif hover:bg-champagne-600 transition-colors"
            >
              TRACK IN MY ACCOUNT
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-champagne-200">
          <div>
            <h1 className="font-serif text-3xl font-bold text-espresso-900">Secure Luxury Checkout</h1>
            <p className="text-xs text-espresso-600 mt-1">256-bit bank encrypted transactional security</p>
          </div>
          <button
            onClick={() => setCurrentView('cart')}
            className="flex items-center space-x-1.5 text-xs text-champagne-600 hover:text-espresso-900 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Bag</span>
          </button>
        </div>

        <form onSubmit={handlePlaceOrderSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Form: Shipping Details & Payment Options */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Customer & Shipping Address */}
            <div className="bg-white rounded-3xl border border-champagne-300 p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center space-x-2 pb-3 border-b border-champagne-200">
                <div className="w-7 h-7 rounded-full bg-champagne-100 text-champagne-600 flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <h3 className="font-serif text-lg font-bold text-espresso-900">
                  Shipping & Delivery Address
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-espresso-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={shippingInfo.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-ivory-100 border border-champagne-300 rounded-xl p-3 text-espresso-900 focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-espresso-700 mb-1">Phone Number *</label>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                    className="w-full bg-ivory-100 border border-champagne-300 rounded-xl p-3 text-espresso-900 focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-espresso-700 mb-1">Email Address (for order tracking & invoice) *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    className="w-full bg-ivory-100 border border-champagne-300 rounded-xl p-3 text-espresso-900 focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-espresso-700 mb-1">Street Address, Villa/Flat No., Landmark *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    className="w-full bg-ivory-100 border border-champagne-300 rounded-xl p-3 text-espresso-900 focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-espresso-700 mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    className="w-full bg-ivory-100 border border-champagne-300 rounded-xl p-3 text-espresso-900 focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-espresso-700 mb-1">State *</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={shippingInfo.state}
                      onChange={handleInputChange}
                      className="w-full bg-ivory-100 border border-champagne-300 rounded-xl p-3 text-espresso-900 focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-espresso-700 mb-1">PIN Code *</label>
                    <input
                      type="text"
                      name="pincode"
                      maxLength={6}
                      required
                      value={shippingInfo.pincode}
                      onChange={handleInputChange}
                      className="w-full bg-ivory-100 border border-champagne-300 rounded-xl p-3 text-espresso-900 focus:outline-none focus:ring-1 focus:ring-gold font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Payment Method Selection */}
            <div className="bg-white rounded-3xl border border-champagne-300 p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center space-x-2 pb-3 border-b border-champagne-200">
                <div className="w-7 h-7 rounded-full bg-champagne-100 text-champagne-600 flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <h3 className="font-serif text-lg font-bold text-espresso-900">
                  Select Payment Method
                </h3>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-gold bg-champagne-100 font-bold text-espresso-900 shadow-sm'
                      : 'border-champagne-200 bg-white text-espresso-600 hover:border-champagne-400'
                  }`}
                >
                  <Smartphone className="w-5 h-5 mx-auto mb-1.5 text-champagne-600" />
                  <span>UPI Instant</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'card'
                      ? 'border-gold bg-champagne-100 font-bold text-espresso-900 shadow-sm'
                      : 'border-champagne-200 bg-white text-espresso-600 hover:border-champagne-400'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1.5 text-champagne-600" />
                  <span>Credit / Debit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-gold bg-champagne-100 font-bold text-espresso-900 shadow-sm'
                      : 'border-champagne-200 bg-white text-espresso-600 hover:border-champagne-400'
                  }`}
                >
                  <Building className="w-5 h-5 mx-auto mb-1.5 text-champagne-600" />
                  <span>Net Banking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-gold bg-champagne-100 font-bold text-espresso-900 shadow-sm'
                      : 'border-champagne-200 bg-white text-espresso-600 hover:border-champagne-400'
                  }`}
                >
                  <Banknote className="w-5 h-5 mx-auto mb-1.5 text-champagne-600" />
                  <span>Cash on Delivery</span>
                </button>
              </div>

              {/* Sub-form for chosen method */}
              <div className="p-4 bg-ivory-100 rounded-2xl border border-champagne-200 text-xs">
                {paymentMethod === 'upi' && (
                  <div className="space-y-3">
                    <span className="font-semibold text-espresso-800 block">Choose Your Preferred UPI Application:</span>
                    <div className="flex flex-wrap gap-3">
                      {['Google Pay', 'PhonePe', 'Paytm', 'Cred UPI'].map(app => (
                        <button
                          key={app}
                          type="button"
                          onClick={() => setUpiApp(app.toLowerCase())}
                          className={`px-4 py-2 rounded-xl border text-xs font-semibold ${
                            upiApp === app.toLowerCase() ? 'bg-white border-gold text-espresso-900 font-bold shadow-xs' : 'bg-ivory-50 border-champagne-300'
                          }`}
                        >
                          {app}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-espresso-500">
                      QR code and payment intent will be triggered upon clicking "Confirm & Pay".
                    </p>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <span className="font-semibold text-espresso-800 block">Secure Card Processing (Visa, Mastercard, RuPay, Amex)</span>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <label className="text-[11px] font-semibold text-espresso-600">Card Number</label>
                        <input
                          type="text"
                          value={cardInfo.number}
                          onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                          className="w-full bg-white border border-champagne-300 rounded-xl p-2.5 font-mono text-xs mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-espresso-600">Valid Thru (MM/YY)</label>
                        <input
                          type="text"
                          value={cardInfo.expiry}
                          onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                          className="w-full bg-white border border-champagne-300 rounded-xl p-2.5 font-mono text-xs mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-espresso-600">CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                          className="w-full bg-white border border-champagne-300 rounded-xl p-2.5 font-mono text-xs mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-2">
                    <span className="font-semibold text-espresso-800">Select Bank:</span>
                    <select className="w-full bg-white border border-champagne-300 rounded-xl p-2.5 text-xs text-espresso-900">
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>State Bank of India (SBI)</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="space-y-1">
                    <p className="font-semibold text-espresso-800">Cash on Delivery Available</p>
                    <p className="text-[11px] text-espresso-600">
                      Please keep the exact cash of <strong>₹{finalTotal.toLocaleString('en-IN')}</strong> ready at the time of delivery.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Right Summary Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-champagne-300 p-6 shadow-luxury space-y-5 sticky top-28">
              <h3 className="font-serif text-lg font-bold text-espresso-900 pb-3 border-b border-champagne-200">
                Order Review ({cart.length} items)
              </h3>

              {/* Items Mini List */}
              <div className="max-h-60 overflow-y-auto divide-y divide-champagne-100 pr-1 space-y-2">
                {cart.map((item) => (
                  <div key={item.itemKey} className="flex items-center space-x-3 pt-2 text-xs">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-12 h-14 object-cover rounded-lg border border-champagne-200 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-espresso-900 truncate">{item.product.name}</p>
                      <span className="text-[11px] text-espresso-500">Qty: {item.quantity} • {item.size}</span>
                      <p className="font-serif font-bold text-espresso-900 mt-0.5">₹{(item.product.discountPrice * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div className="space-y-2 text-xs text-espresso-600 border-t border-champagne-200 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-espresso-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount</span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Express Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-espresso-900 pt-3 border-t border-champagne-200">
                  <span>Total Payable</span>
                  <span className="font-serif text-xl">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Complete Order Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-espresso-900 hover:bg-champagne-600 text-white rounded-2xl font-serif text-xs font-bold tracking-widest uppercase transition-all shadow-luxury hover:shadow-glow-gold flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>AUTHORIZING ROYAL DISPATCH...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-gold" />
                    <span>CONFIRM & PLACE ORDER</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-espresso-500 text-center flex items-center justify-center space-x-1.5 pt-1">
                <ShieldCheck className="w-4 h-4 text-champagne-600" />
                <span>KS Guarantee & 7-Day Easy Returns</span>
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};

