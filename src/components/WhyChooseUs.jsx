import React from 'react';
import { 
  Sparkles, Award, TrendingUp, Gem, ShieldCheck, 
  RotateCcw, Truck 
} from 'lucide-react';

export const WhyChooseUs = () => {
  const pillars = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "Heirloom grade pure silk, intricate zardozi, and meticulous multi-point quality inspections."
    },
    {
      icon: TrendingUp,
      title: "Latest Fashion Trends",
      description: "Direct-from-runway modern cuts harmoniously fused with regal Indian silhouettes."
    },
    {
      icon: Gem,
      title: "Affordable Luxury",
      description: "Couture craftsmanship delivered directly to your doorstep at fair, uninflated prices."
    },
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      description: "256-bit bank encrypted checkout with UPI, Credit Cards, Net Banking & Cash on Delivery."
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "Hassle-free 7-day doorstep exchange and return policy with zero questions asked."
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Express air shipping across India with free insured delivery on all orders above ₹999."
    }
  ];

  return (
    <section className="py-16 bg-white border-t border-champagne-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-1.5 text-champagne-600 font-serif text-xs uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>THE KS PROMISE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-900 tracking-tight">
            Why Choose KS FASHION?
          </h2>
          <p className="text-sm text-espresso-600">
            Elevating your wardrobe with unmatched craftsmanship, seamless trust, and attentive customer care.
          </p>
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-ivory-100/70 border border-champagne-300/60 hover:border-gold hover:bg-white hover:shadow-luxury transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-champagne-200/50 group-hover:bg-champagne-500 text-espresso-900 group-hover:text-white flex items-center justify-center transition-colors shadow-xs mb-4">
                  <IconComponent className="w-6 h-6 text-champagne-600 group-hover:text-white" />
                </div>
                <h3 className="font-serif text-base font-bold text-espresso-900 group-hover:text-champagne-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-espresso-600 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

