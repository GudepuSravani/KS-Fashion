import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactPage = () => {
  const { showToast } = useShop();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bridal & Bespoke Fitting Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been received by the KS Atelier concierge!');
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-serif font-bold tracking-widest text-champagne-600 uppercase">
            ATELIER CONCIERGE & SUPPORT
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-espresso-900 tracking-tight">
            Connect with KS FASHION
          </h1>
          <p className="text-sm text-espresso-600">
            Whether inquiring about custom saree drapes, bridal appointments, or tracking your order, our stylists are delighted to assist.
          </p>
        </div>

        {/* Contact Grid: Details + Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Studio & Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl border border-champagne-300 p-8 shadow-luxury space-y-6">
              <h3 className="font-serif text-xl font-bold text-espresso-900 pb-3 border-b border-champagne-200">
                Flagship Studio & Atelier
              </h3>

              <div className="space-y-4 text-xs text-espresso-700">
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-full bg-champagne-100 text-champagne-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block font-serif text-sm text-espresso-900">KS FASHION Studio</strong>
                    <p className="mt-0.5 text-espresso-600">Villa 14, Royal Palm Residences, Road No. 36, Jubilee Hills, Hyderabad 500033, India</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-full bg-champagne-100 text-champagne-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block font-serif text-sm text-espresso-900">Concierge Desk</strong>
                    <p className="mt-0.5 text-espresso-600 font-mono">+91 98765 43210 (Toll Free)</p>
                    <p className="text-[11px] text-espresso-400">WhatsApp styling support available</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-full bg-champagne-100 text-champagne-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block font-serif text-sm text-espresso-900">Email Correspondence</strong>
                    <p className="mt-0.5 text-espresso-600">concierge@ksfashion.in</p>
                    <p className="text-[11px] text-espresso-400">Guaranteed response within 4 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-full bg-champagne-100 text-champagne-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block font-serif text-sm text-espresso-900">Atelier Hours</strong>
                    <p className="mt-0.5 text-espresso-600">Monday to Saturday: 10:00 AM – 8:00 PM IST</p>
                    <p className="text-[11px] text-espresso-400">Sunday: Closed for artisan weaver care</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-champagne-300 p-8 sm:p-10 shadow-luxury">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-espresso-900">
                    Thank You, {form.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-espresso-600 max-w-sm mx-auto">
                    Our lead stylist has received your note regarding "{form.subject}" and will connect with you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', phone: '', subject: 'Bridal & Bespoke Fitting Inquiry', message: '' });
                    }}
                    className="px-6 py-2.5 bg-espresso-900 text-white rounded-full text-xs font-serif font-bold uppercase tracking-wider"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-espresso-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Radhika Roy"
                        className="w-full bg-ivory-100 border border-champagne-300 rounded-xl p-3 text-espresso-900 focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-espresso-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="radhika@example.com"
                        className="w-full bg-ivory-100 border border-champagne-300 rounded-xl p-3 text-espresso-900 focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-espresso-700 mb-1">Mobile / WhatsApp Number</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-ivory-100 border border-champagne-300 rounded-xl p-3 text-espresso-900 focus:outline-none focus:ring-1 focus:ring-gold font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-espresso-700 mb-1">Inquiry Topic</label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full bg-ivory-100 border border-champagne-300 rounded-xl p-3 text-espresso-900 focus:outline-none focus:ring-1 focus:ring-gold"
                      >
                        <option>Bridal & Bespoke Fitting Inquiry</option>
                        <option>Order Tracking & Courier Delivery</option>
                        <option>Return & Exchange Assistance</option>
                        <option>Size & Styling Consultation</option>
                        <option>Corporate & Bulk Gifting</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-espresso-700 mb-1">How may our stylists assist you? *</label>
                    <textarea
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Share your requirements, event dates, or styling preferences..."
                      className="w-full bg-ivory-100 border border-champagne-300 rounded-xl p-3 text-espresso-900 focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-espresso-900 hover:bg-champagne-600 text-white rounded-xl font-serif text-xs font-bold tracking-widest uppercase transition-all shadow-luxury hover:shadow-glow-gold flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4 text-gold" />
                    <span>TRANSMIT MESSAGE TO ATELIER</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

