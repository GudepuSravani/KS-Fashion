import React, { useState } from 'react';
import { 
  Heart, ShoppingBag, RotateCw, Star, ShieldCheck, 
  Truck, RefreshCw, Ruler, Check, ArrowLeft, Share2, 
  HelpCircle, ChevronRight, Sparkles 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailsPage = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    setCurrentView, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    open360Viewer,
    products,
    showToast
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Standard');
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'fabric' | 'reviews' | 'guarantee'
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);

  // Sync size and color when selectedProduct updates
  React.useEffect(() => {
    if (selectedProduct) {
      if (selectedProduct.sizes && selectedProduct.sizes.length > 0) {
        setSelectedSize(selectedProduct.sizes[0]);
      }
      if (selectedProduct.colors && selectedProduct.colors.length > 0) {
        setSelectedColor(selectedProduct.colors[0]);
      }
      setActiveImageIndex(0);
    }
  }, [selectedProduct]);

  if (!selectedProduct) {
    return (
      <div className="py-20 text-center">
        <p>No product selected.</p>
        <button 
          onClick={() => setCurrentView('shop')}
          className="mt-4 px-6 py-2 bg-espresso-900 text-white rounded-full text-xs"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const isFavorite = isInWishlist(selectedProduct.id);

  const images = selectedProduct.images || [selectedProduct.image];

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus({
        available: true,
        date: 'Thursday, 5th Nov',
        type: 'Free Express Air Dispatch'
      });
    } else {
      setPincodeStatus({
        available: false,
        message: 'Please enter a valid 6-digit Indian PIN code'
      });
    }
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedSize, selectedColor, quantity);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${selectedProduct.name} | KS FASHION`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  // Related items in same category
  const relatedProducts = products
    .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 4);

  return (
    <div className="bg-ivory-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-champagne-200">
          <button
            onClick={() => setCurrentView('shop')}
            className="flex items-center space-x-1.5 text-xs text-espresso-600 hover:text-champagne-600 font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Collections</span>
          </button>

          <div className="flex items-center space-x-3 text-xs text-espresso-500">
            <span>SKU: {selectedProduct.id.toUpperCase()}</span>
            <span>•</span>
            <button
              onClick={handleShare}
              className="flex items-center space-x-1 hover:text-champagne-600 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Image Gallery & 360 Spin */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Primary Main Image Frame */}
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-white border border-champagne-300 shadow-luxury group">
              <img
                src={images[activeImageIndex]}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* 360 Button Overlay if available */}
              {selectedProduct.is360 && (
                <button
                  onClick={() => open360Viewer(selectedProduct)}
                  className="absolute bottom-5 right-5 bg-espresso-900/90 hover:bg-espresso-900 text-gold hover:text-white px-4 py-2.5 rounded-full text-xs font-bold font-serif flex items-center space-x-2 shadow-luxury backdrop-blur-md transition-all transform hover:scale-105"
                >
                  <RotateCw className="w-4 h-4 animate-spin-slow" />
                  <span>LAUNCH 360° ATELIER VIEW</span>
                </button>
              )}

              {/* Discount Badge */}
              <div className="absolute top-5 left-5 bg-blush-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {selectedProduct.discountPercent}% OFF
              </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-none">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    onMouseEnter={() => setActiveImageIndex(idx)}
                    className={`w-20 h-24 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImageIndex === idx 
                        ? 'border-gold shadow-md scale-105' 
                        : 'border-champagne-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Angle thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Right Column: Product Purchasing Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Category & Ratings */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-serif font-bold tracking-widest text-champagne-600">
                  {selectedProduct.categoryName}
                </span>
                <div className="flex items-center space-x-1.5 text-xs">
                  <div className="flex items-center text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <span className="font-bold text-espresso-900">{selectedProduct.rating}</span>
                  <span className="text-espresso-400">({selectedProduct.reviewCount} Connoisseur Reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-900 tracking-tight leading-snug">
                {selectedProduct.name}
              </h1>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-white border border-champagne-300/80 shadow-sm space-y-1">
              <div className="flex items-baseline space-x-3">
                <span className="font-serif text-3xl font-bold text-espresso-900">
                  ₹{selectedProduct.discountPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-espresso-400 line-through">
                  ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Save ₹{(selectedProduct.originalPrice - selectedProduct.discountPrice).toLocaleString('en-IN')} ({selectedProduct.discountPercent}% OFF)
                </span>
              </div>
              <p className="text-[11px] text-espresso-500">
                Inclusive of all taxes. Free insured dispatch on orders above ₹999.
              </p>
            </div>

            {/* Color Swatches */}
            {selectedProduct.colors && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-espresso-900">
                    Color: <strong className="text-champagne-600">{selectedColor?.name}</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-2.5">
                  {selectedProduct.colors.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(c)}
                      className={`w-8 h-8 rounded-full border-2 p-0.5 transition-all ${
                        selectedColor?.name === c.name ? 'border-gold scale-110 shadow-sm' : 'border-transparent'
                      }`}
                    >
                      <span 
                        className="block w-full h-full rounded-full shadow-inner border border-black/10" 
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {selectedProduct.sizes && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-espresso-900">
                    Select Size: <strong className="text-champagne-600">{selectedSize}</strong>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="flex items-center space-x-1 text-champagne-600 hover:text-espresso-900 underline text-[11px]"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>View Atelier Size Guide</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedProduct.sizes.map((sz, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        selectedSize === sz
                          ? 'border-gold bg-champagne-200 text-espresso-900 font-bold shadow-sm'
                          : 'border-champagne-300 bg-white text-espresso-700 hover:border-champagne-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-3 bg-white border border-champagne-300 rounded-xl px-3 py-2">
                  <span className="text-xs text-espresso-500 font-medium">Qty:</span>
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="text-xs font-bold px-2 py-0.5 hover:bg-champagne-100 rounded"
                  >
                    -
                  </button>
                  <span className="font-mono text-xs font-bold text-espresso-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="text-xs font-bold px-2 py-0.5 hover:bg-champagne-100 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center space-x-2 text-xs font-semibold transition-all ${
                    isFavorite 
                      ? 'border-rose-400 bg-rose-50 text-rose-600' 
                      : 'border-champagne-300 bg-white hover:bg-champagne-50 text-espresso-800'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{isFavorite ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>

              {/* Add to Bag and Buy Now */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => addToCart(selectedProduct, selectedSize, selectedColor, quantity)}
                  className="w-full py-4 bg-white hover:bg-champagne-100 text-espresso-900 border-2 border-espresso-900 rounded-2xl font-serif text-xs font-bold tracking-widest uppercase transition-all shadow-sm flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4 text-champagne-600" />
                  <span>ADD TO CART</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-4 bg-espresso-900 hover:bg-champagne-600 text-white rounded-2xl font-serif text-xs font-bold tracking-widest uppercase transition-all shadow-luxury hover:shadow-glow-gold flex items-center justify-center space-x-2"
                >
                  <span>BUY NOW</span>
                  <ChevronRight className="w-4 h-4 text-gold" />
                </button>
              </div>
            </div>

            {/* Pincode Delivery Estimator */}
            <div className="p-4 rounded-2xl bg-white border border-champagne-200 space-y-2">
              <span className="text-xs font-semibold text-espresso-900 flex items-center space-x-1.5">
                <Truck className="w-4 h-4 text-champagne-600" />
                <span>Delivery & Atelier Dispatch Check</span>
              </span>
              <form onSubmit={handleCheckPincode} className="flex space-x-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="flex-1 bg-ivory-100 border border-champagne-300 rounded-xl px-3 py-2 text-xs text-espresso-900 focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-espresso-900 text-white rounded-xl text-xs font-bold hover:bg-champagne-600 transition-colors"
                >
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <p className={`text-xs ${pincodeStatus.available ? 'text-emerald-700' : 'text-rose-600'} font-medium`}>
                  {pincodeStatus.available ? `✓ Guaranteed Delivery by ${pincodeStatus.date} (${pincodeStatus.type})` : pincodeStatus.message}
                </p>
              )}
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-espresso-700">
              <div className="flex items-center space-x-2 bg-ivory-100 p-2.5 rounded-xl border border-champagne-200">
                <ShieldCheck className="w-4 h-4 text-champagne-600 flex-shrink-0" />
                <span>100% Authentic Silk Mark</span>
              </div>
              <div className="flex items-center space-x-2 bg-ivory-100 p-2.5 rounded-xl border border-champagne-200">
                <RefreshCw className="w-4 h-4 text-champagne-600 flex-shrink-0" />
                <span>7-Day Return Guarantee</span>
              </div>
            </div>

          </div>

        </div>

        {/* Detailed Tabs: Description, Fabric & Care, Reviews, Authenticity */}
        <div className="mt-16 bg-white rounded-3xl border border-champagne-300 p-6 sm:p-10 shadow-sm">
          <div className="flex border-b border-champagne-200 overflow-x-auto space-x-8 pb-4">
            {[
              { id: 'details', label: 'Description & Craft' },
              { id: 'fabric', label: 'Fabric & Wash Care' },
              { id: 'reviews', label: `Customer Reviews (${selectedProduct.reviewCount})` },
              { id: 'guarantee', label: 'KS Brand Guarantee' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-serif text-sm font-bold uppercase tracking-wider pb-2 relative whitespace-nowrap transition-colors ${
                  activeTab === tab.id ? 'text-espresso-900' : 'text-espresso-400 hover:text-espresso-700'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          <div className="py-6 text-sm text-espresso-700 leading-relaxed">
            {activeTab === 'details' && (
              <div className="space-y-4">
                <p>{selectedProduct.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-ivory-100 rounded-2xl border border-champagne-200">
                    <h5 className="font-bold text-xs uppercase text-espresso-900 mb-1">Stylist Notes</h5>
                    <p className="text-xs text-espresso-600">Pair this silhouette with antique temple jewellery and gold block heels for celebratory evening poise.</p>
                  </div>
                  <div className="p-4 bg-ivory-100 rounded-2xl border border-champagne-200">
                    <h5 className="font-bold text-xs uppercase text-espresso-900 mb-1">Atelier Origin</h5>
                    <p className="text-xs text-espresso-600">Hand-woven in exclusive artisan clusters and finished with signature KS golden tags.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'fabric' && (
              <div className="space-y-3">
                <p><strong>Primary Composition:</strong> {selectedProduct.fabric || '100% Mulberry Handloom Silk'}</p>
                <p><strong>Wash Care:</strong> {selectedProduct.care || 'Specialist dry clean only. Wrap in breathable muslin cloth.'}</p>
                <p><strong>Weave Technique:</strong> Authentic shuttle loom weaving with certified zari borders.</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-champagne-50 rounded-2xl border border-champagne-200">
                  <div className="text-center border-r border-champagne-300 pr-6">
                    <span className="font-serif text-3xl font-bold text-espresso-900 block">{selectedProduct.rating}</span>
                    <div className="flex text-gold justify-center">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />)}
                    </div>
                    <span className="text-[10px] text-espresso-500 mt-1 block">Overall Rating</span>
                  </div>
                  <p className="text-xs text-espresso-600 italic">
                    "Every customer confirms the fabric sheen and hand-feel are far superior in person. Truly an heirloom garment!"
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'guarantee' && (
              <div className="space-y-3">
                <h4 className="font-serif text-base font-bold text-espresso-900">The KS FASHION Luxury Commitment</h4>
                <p>Every single creation delivered by KS FASHION undergoes a 4-step quality audit ensuring stitch integrity, gold zari purity, and flawless packaging in satin dustbags.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 space-y-8">
            <div className="flex items-center justify-between pb-3 border-b border-champagne-200">
              <h3 className="font-serif text-2xl font-bold text-espresso-900">
                You May Also Love
              </h3>
              <button 
                onClick={() => setCurrentView('shop')}
                className="text-xs font-serif font-bold text-champagne-600 hover:text-espresso-900"
              >
                VIEW FULL ATELIER &rarr;
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-champagne-300 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-champagne-200">
              <h3 className="font-serif text-lg font-bold text-espresso-900">KS Atelier Size Chart (Inches)</h3>
              <button onClick={() => setIsSizeGuideOpen(false)}>
                <Check className="w-5 h-5 text-espresso-600" />
              </button>
            </div>
            <table className="w-full text-xs text-center border-collapse">
              <thead>
                <tr className="bg-champagne-100 text-espresso-900 font-bold">
                  <th className="p-2 border">Size</th>
                  <th className="p-2 border">Bust</th>
                  <th className="p-2 border">Waist</th>
                  <th className="p-2 border">Hip</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2 border font-bold">XS</td><td className="p-2 border">32</td><td className="p-2 border">26</td><td className="p-2 border">36</td></tr>
                <tr><td className="p-2 border font-bold">S</td><td className="p-2 border">34</td><td className="p-2 border">28</td><td className="p-2 border">38</td></tr>
                <tr><td className="p-2 border font-bold">M</td><td className="p-2 border">36</td><td className="p-2 border">30</td><td className="p-2 border">40</td></tr>
                <tr><td className="p-2 border font-bold">L</td><td className="p-2 border">38</td><td className="p-2 border">32</td><td className="p-2 border">42</td></tr>
                <tr><td className="p-2 border font-bold">XL</td><td className="p-2 border">40</td><td className="p-2 border">34</td><td className="p-2 border">44</td></tr>
              </tbody>
            </table>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="w-full py-2.5 bg-espresso-900 text-white rounded-xl text-xs font-bold font-serif"
            >
              CLOSE GUIDE
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

