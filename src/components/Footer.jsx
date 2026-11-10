import React from 'react';
import { 
  Instagram, Facebook, Youtube, Mail, Phone, MapPin, 
  ShieldCheck, Heart, ArrowUp, Lock, RefreshCw, Truck 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer = ({ onOpenPolicy }) => {
  const { setCurrentView, setSelectedCategory } = useShop();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setCurrentView('shop');
    scrollToTop();
  };

  const handleNavClick = (view) => {
    setCurrentView(view);
    scrollToTop();
  };

  return (
    <footer className="bg-gradient-to-b from-ivory-100 to-[#F5ECE2] border-t border-champagne-300 text-espresso-800 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-champagne-300/70">
          
          {/* Column 1: Brand & Logo */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Logo and Brand Name */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-gold to-champagne-200 shadow-md">
                <img 
                  src="/logo.png" 
                  alt="KS FASHION Official Logo"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => { e.target.src = '/logo-circle.png'; }}
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-espresso-900 group-hover:text-champagne-600 transition-colors">
                  KS <span className="text-champagne-600 font-light">FASHION</span>
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-espresso-700 font-medium font-serif italic block">
                  Elegance in Every Thread.
                </span>
              </div>
            </div>

            {/* Brand Description */}
            <p className="text-xs text-espresso-600 leading-relaxed max-w-sm">
              At KS FASHION, we believe fashion is more than just clothing. It is a reflection of your personality, confidence, and individuality. Bringing together modern trends, timeless elegance, and everyday comfort.
            </p>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-espresso-700 uppercase tracking-wider block mb-2 font-serif">
                Connect With Our Atelier
              </span>
              <div className="flex space-x-3">
                <a
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white border border-champagne-300 flex items-center justify-center text-espresso-700 hover:text-white hover:bg-gradient-to-tr hover:from-amber-600 hover:to-rose-600 transition-all shadow-xs"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white border border-champagne-300 flex items-center justify-center text-espresso-700 hover:text-white hover:bg-blue-600 transition-all shadow-xs"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white border border-champagne-300 flex items-center justify-center text-espresso-700 hover:text-white hover:bg-red-600 transition-all shadow-xs"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-espresso-900 tracking-wider uppercase border-b border-champagne-200 pb-1.5">
              Quick Links
            </h4>
            <ul className="space-y-2 text-espresso-600 font-medium">
              <li>
                <button onClick={() => handleNavClick('home')} className="hover:text-champagne-600 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('shop')} className="hover:text-champagne-600 transition-colors">
                  Shop All Collections
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('shop')} className="hover:text-champagne-600 transition-colors">
                  New Arrivals 2026
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('about')} className="hover:text-champagne-600 transition-colors">
                  Our Story & Weavers
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('wishlist')} className="hover:text-champagne-600 transition-colors">
                  My Wishlist
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('admin')} className="text-champagne-600 hover:text-espresso-900 transition-colors">
                  Atelier Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Shop Categories */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-espresso-900 tracking-wider uppercase border-b border-champagne-200 pb-1.5">
              Shop Categories
            </h4>
            <ul className="space-y-2 text-espresso-600 font-medium">
              <li>
                <button onClick={() => handleCategoryClick('sarees')} className="hover:text-champagne-600 transition-colors">
                  Pure Silk Sarees
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('ethnic-wear')} className="hover:text-champagne-600 transition-colors">
                  Ethnic Lehengas
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('kurtis')} className="hover:text-champagne-600 transition-colors">
                  Chikankari Kurtis
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('western-wear')} className="hover:text-champagne-600 transition-colors">
                  Western Blazers & Sets
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('party-wear')} className="hover:text-champagne-600 transition-colors">
                  Party Wear Gowns
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('handbags')} className="hover:text-champagne-600 transition-colors">
                  Artisanal Handbags
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Support & Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-espresso-900 tracking-wider uppercase border-b border-champagne-200 pb-1.5">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-espresso-600">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-champagne-600 flex-shrink-0 mt-0.5" />
                <span>KS FASHION Studio, Jubilee Hills, Hyderabad 500033, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-champagne-600 flex-shrink-0" />
                <span>+91 98765 43210 (10 AM - 8 PM)</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-champagne-600 flex-shrink-0" />
                <span>concierge@ksfashion.in</span>
              </li>
              <li className="pt-2">
                <button 
                  onClick={() => handleNavClick('contact')}
                  className="text-xs text-champagne-600 hover:text-espresso-900 font-semibold underline underline-offset-2"
                >
                  Contact Concierge Desk &rarr;
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Security & Payment Badges Bar */}
        <div className="py-6 border-b border-champagne-300/60 flex flex-wrap items-center justify-between gap-4 text-espresso-600">
          <div className="flex items-center space-x-6 text-[11px] font-medium">
            <div className="flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-gold" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-gold" />
              <span>7-Day Easy Returns</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Truck className="w-3.5 h-3.5 text-gold" />
              <span>Free Delivery Above ₹999</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-[10px] text-espresso-500 font-mono">
            <span>ACCEPTED: UPI • VISA • MASTERCARD • RUPAY • NETBANKING • COD</span>
          </div>
        </div>

        {/* Copyright & Legal Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-espresso-500 space-y-4 sm:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} <strong>KS FASHION</strong>. All Rights Reserved. Crafted with elegance for women worldwide.
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => onOpenPolicy?.('privacy')}
              className="hover:text-espresso-900 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenPolicy?.('terms')}
              className="hover:text-espresso-900 transition-colors"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenPolicy?.('refund')}
              className="hover:text-espresso-900 transition-colors"
            >
              Return & Refund Policy
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="w-7 h-7 rounded-full bg-champagne-200/60 hover:bg-champagne-300 flex items-center justify-center text-espresso-800 transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

