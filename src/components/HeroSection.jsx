import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const HeroSection = () => {
  const { setCurrentView, setSelectedCategory } = useShop();

  const slides = [
    {
      id: 1,
      badge: "The Royal Festive Edit 2026",
      tagline: "ELEGANCE IN EVERY THREAD",
      heading: "Discover Your Perfect Style",
      subheading: "Explore the latest fashion collections designed to make every moment special. Discover elegance, comfort, and confidence with KS FASHION.",
      image: "/products/hd/hd-royal-velvet-bridal-lehenga.jpg",
      accentImage: "/products/hd/hd-regal-emerald-kanjeevaram-saree.jpg",
      category: "ethnic-wear",
      offer: "Up to 50% Off Heirloom Silks"
    },
    {
      id: 2,
      badge: "Haute Couture & Parisian Silhouettes",
      tagline: "CONTEMPORARY POISE",
      heading: "Modern Sophistication Redefined",
      subheading: "Impeccably tailored suits, satin slip gowns, and luxurious everyday classics designed for the confident, modern woman.",
      image: "/products/hd/hd-parisian-champagne-satin-evening-gown.jpg",
      accentImage: "/products/hd/hd-modern-pastel-lilac-organza-saree.jpg",
      category: "western-wear",
      offer: "Complimentary Express Shipping"
    },
    {
      id: 3,
      badge: "Artisanal Lucknowi Heritage",
      tagline: "PURE WEAVING MASTERY",
      heading: "Handcrafted Lucknowi Chikankari",
      subheading: "Intricate needlecraft on breathable modal georgette. Experience the sublime grace of handcrafted royalty for timeless poise.",
      image: "/products/hd/hd-kurti-aura-anarkali.jpg",
      accentImage: "/products/hd/hd-kurti-royal-blue.jpg",
      category: "kurtis",
      offer: "Exclusive Limited Edition"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ivory-100 via-champagne-50/60 to-ivory-200 py-8 lg:py-16">
      {/* Subtle background ornamental circles */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-champagne-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blush-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            
            {/* Royal Tag Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-champagne-200/80 via-blush-100 to-champagne-100 border border-gold/40 px-4 py-1.5 rounded-full shadow-sm animate-fade-in">
              <Sparkles className="w-4 h-4 text-champagne-600 animate-spin" />
              <span className="text-xs uppercase font-serif tracking-widest text-espresso-900 font-semibold">
                {slide.badge}
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <span className="block text-xs sm:text-sm font-semibold tracking-[0.25em] text-champagne-600 uppercase font-serif">
                {slide.tagline}
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-espresso-900 tracking-tight leading-[1.12]">
                {slide.heading}
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-espresso-700 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {slide.subheading}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory(slide.category);
                  setCurrentView('shop');
                }}
                className="w-full sm:w-auto px-8 py-4 bg-espresso-900 hover:bg-champagne-600 text-white rounded-full font-serif text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-luxury hover:shadow-glow-gold flex items-center justify-center space-x-2 group"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setCurrentView('shop');
                }}
                className="w-full sm:w-auto px-8 py-4 bg-white/80 hover:bg-champagne-100 text-espresso-900 border border-champagne-300 rounded-full font-serif text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:border-gold shadow-sm flex items-center justify-center space-x-2"
              >
                <span>EXPLORE COLLECTION</span>
              </button>
            </div>

            {/* Trust Highlights / Brand Stats */}
            <div className="pt-6 border-t border-champagne-300/60 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <span className="block font-serif text-2xl font-bold text-espresso-900">50K+</span>
                <span className="text-xs text-espresso-600 font-medium">Bespoke Royals Dressed</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block font-serif text-2xl font-bold text-espresso-900">100%</span>
                <span className="text-xs text-espresso-600 font-medium">Authentic Silk & Zari</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block font-serif text-2xl font-bold text-espresso-900">4.9 ★</span>
                <span className="text-xs text-espresso-600 font-medium">Verified Customer Rating</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Fashion Imagery Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Golden Border Glow Box */}
              <div className="relative rounded-3xl overflow-hidden shadow-luxury-lg border-2 border-gold/40 bg-white p-2">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
                  <img
                    src={slide.image}
                    alt={slide.heading}
                    className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                  {/* Floating Promo Tag */}
                  <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-champagne-300 shadow-luxury flex items-center justify-between z-10">
                    <div className="pr-3">
                      <span className="text-[10px] uppercase font-serif tracking-widest text-champagne-600 font-bold block mb-0.5">
                        KS EXCLUSIVE
                      </span>
                      <h4 className="text-xs sm:text-sm font-serif font-bold text-espresso-900 leading-snug">
                        {slide.offer}
                      </h4>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCategory(slide.category);
                        setCurrentView('shop');
                      }}
                      className="text-xs font-serif font-bold uppercase tracking-wider text-white bg-espresso-900 hover:bg-champagne-600 px-4 py-2 rounded-full transition-all duration-300 shadow-sm flex-shrink-0"
                    >
                      EXPLORE
                    </button>
                  </div>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="absolute top-4 right-4 z-20 flex items-center space-x-1.5 bg-black/50 backdrop-blur-md p-1.5 rounded-full border border-white/20">
                <button
                  onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
                  className="p-1 rounded-full text-white hover:bg-white/20 transition-colors"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex space-x-1 px-1">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentSlide ? 'w-5 bg-gold' : 'w-1.5 bg-white/60'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
                  className="p-1 rounded-full text-white hover:bg-white/20 transition-colors"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

