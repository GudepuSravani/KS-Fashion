import React, { useState, useEffect } from 'react';
import { Sparkles, Truck, Tag, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AnnouncementBar = () => {
  const { setCurrentView, setSelectedCategory } = useShop();

  const announcements = [
    {
      icon: Sparkles,
      text: "Welcome to KS FASHION – Discover Your Signature Style",
      highlight: "Explore New Season",
      action: () => setCurrentView('shop')
    },
    {
      icon: Truck,
      text: "Free Shipping on Orders Above ₹999 across India",
      highlight: "Shop Now",
      action: () => {
        setSelectedCategory('all');
        setCurrentView('shop');
      }
    },
    {
      icon: Tag,
      text: "Grand Festive Edit – Up to 50% OFF with code LUXURY15",
      highlight: "Claim Offer",
      action: () => setCurrentView('shop')
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const current = announcements[currentIndex];
  const IconComponent = current.icon;

  return (
    <div className="bg-gradient-to-r from-champagne-100 via-ivory-200 to-champagne-100 border-b border-champagne-300/40 text-espresso-800 text-xs py-2 px-4 transition-all duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center space-x-2 text-champagne-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
          <span>Official KS Luxury Atelier</span>
        </div>

        <div className="flex-1 flex items-center justify-center space-x-2 text-center overflow-hidden">
          <IconComponent className="w-3.5 h-3.5 text-champagne-600 flex-shrink-0 animate-bounce" />
          <p className="font-medium tracking-wide">
            {current.text}
          </p>
          <button
            onClick={current.action}
            className="hidden sm:inline-flex items-center text-champagne-600 hover:text-espresso-900 font-semibold underline underline-offset-2 ml-2 transition-colors"
          >
            {current.highlight}
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-4 text-[11px] text-espresso-700">
          <span>Concierge: +91 98765 43210</span>
          <span className="text-champagne-400">|</span>
          <button 
            onClick={() => setCurrentView('contact')}
            className="hover:text-gold font-medium transition-colors"
          >
            Bespoke Assistance
          </button>
        </div>
      </div>
    </div>
  );
};

