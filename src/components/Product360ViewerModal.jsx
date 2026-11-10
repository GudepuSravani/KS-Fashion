import React, { useState, useRef, useEffect } from 'react';
import { 
  X, RotateCw, Play, Pause, ZoomIn, ZoomOut, ShoppingBag, 
  Sparkles, Check, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Product360ViewerModal = () => {
  const { is360ModalOpen, setIs360ModalOpen, product360, addToCart } = useShop();

  const [rotationAngle, setRotationAngle] = useState(0); // 0 to 360
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);

  const containerRef = useRef(null);

  // Frame simulation based on product images
  const frames = product360?.images || [];
  const framesLength = frames.length;

  // Map angle (0-360) to frame index - always called unconditionally
  useEffect(() => {
    if (!is360ModalOpen || !product360 || framesLength === 0) return;
    const frameIdx = Math.floor((rotationAngle / 360) * framesLength) % framesLength;
    setActiveFrameIndex(frameIdx);
  }, [rotationAngle, framesLength, is360ModalOpen, product360]);

  // Auto spin loop - always called unconditionally
  useEffect(() => {
    if (!is360ModalOpen || !product360) return;
    let animId;
    if (isAutoSpinning && !isDragging) {
      const step = () => {
        setRotationAngle(prev => (prev + 1) % 360);
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animId);
  }, [isAutoSpinning, isDragging, is360ModalOpen, product360]);

  // Early return only AFTER all hooks are called
  if (!is360ModalOpen || !product360) return null;

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsAutoSpinning(false);
    setStartX(e.clientX || (e.touches && e.touches[0].clientX) || 0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - startX;
    setStartX(clientX);
    
    // Sensitivity: 1px = ~0.8 degrees
    setRotationAngle(prev => {
      let next = prev + (deltaX * 0.8);
      if (next < 0) next += 360;
      if (next >= 360) next -= 360;
      return next;
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const currentImage = frames[activeFrameIndex] || frames[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-ivory-100 rounded-3xl overflow-hidden shadow-2xl border-2 border-gold/40 flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIs360ModalOpen(false)}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-espresso-900 flex items-center justify-center shadow-lg transition-all hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Interactive 360 Viewport */}
        <div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          className="relative flex-1 bg-gradient-to-b from-champagne-100/50 to-ivory-200 flex items-center justify-center p-6 cursor-grab active:cursor-grabbing select-none overflow-hidden min-h-[350px] md:min-h-[500px]"
        >
          {/* Degree Badge */}
          <div className="absolute top-4 left-4 bg-espresso-900/80 backdrop-blur-sm text-gold px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center space-x-1.5 shadow-md">
            <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
            <span>360° ATELIER VIEW • {Math.round(rotationAngle)}°</span>
          </div>

          {/* Interactive Drag Instruction Hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-medium text-espresso-800 shadow-md border border-champagne-300 pointer-events-none flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-gold animate-ping"></span>
            <span>Drag horizontally to spin 360° or use controls below</span>
          </div>

          {/* Product Image Display with Smooth Perspective */}
          <div 
            className="w-full h-full max-w-sm aspect-[3/4] flex items-center justify-center transition-transform duration-75"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={currentImage}
              alt={`${product360.name} 360 frame`}
              className="w-full h-full object-contain filter drop-shadow-2xl pointer-events-none rounded-xl"
            />
          </div>

          {/* Angle Preset Markers */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col space-y-2 z-20">
            {[
              { label: 'Front', deg: 0 },
              { label: 'Right', deg: 90 },
              { label: 'Back', deg: 180 },
              { label: 'Left', deg: 270 }
            ].map((angle, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setRotationAngle(angle.deg);
                  setIsAutoSpinning(false);
                }}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs transition-all ${
                  Math.abs(rotationAngle - angle.deg) < 45 || (angle.deg === 0 && rotationAngle > 315)
                    ? 'bg-gold text-espresso-950 font-extrabold scale-105'
                    : 'bg-white/80 text-espresso-700 hover:bg-white'
                }`}
              >
                {angle.label}
              </button>
            ))}
          </div>

        </div>

        {/* Right Info & Controls Panel */}
        <div className="w-full md:w-80 bg-white p-6 border-t md:border-t-0 md:border-l border-champagne-300 flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-champagne-600 font-serif">
                {product360.categoryName}
              </span>
              <h3 className="font-serif text-xl font-bold text-espresso-900 leading-tight">
                {product360.name}
              </h3>
              <div className="flex items-baseline space-x-2 pt-1">
                <span className="font-serif text-2xl font-bold text-espresso-900">
                  ₹{product360.discountPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-espresso-400 line-through">
                  ₹{product360.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-blush-500">
                  {product360.discountPercent}% OFF
                </span>
              </div>
            </div>

            <div className="p-3 bg-ivory-100 rounded-xl border border-champagne-200 text-xs space-y-1 text-espresso-700">
              <p><strong>Fabric:</strong> {product360.fabric || '100% Pure Woven Silk'}</p>
              <p><strong>Available Sizes:</strong> {product360.sizes ? product360.sizes.join(', ') : 'Free Size'}</p>
              <p><strong>Delivery:</strong> Complimentary Express Insured Dispatch</p>
            </div>

            {/* 360 Spin Slider & Controls */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-semibold text-espresso-700">
                <span>Rotation Slider</span>
                <span className="font-mono text-champagne-600">{Math.round(rotationAngle)}° / 360°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={rotationAngle}
                onChange={(e) => {
                  setRotationAngle(Number(e.target.value));
                  setIsAutoSpinning(false);
                }}
                className="w-full accent-champagne-500 cursor-pointer"
              />

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setIsAutoSpinning(!isAutoSpinning)}
                  className="flex items-center space-x-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border border-champagne-300 hover:bg-champagne-100 transition-colors text-espresso-800"
                >
                  {isAutoSpinning ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-champagne-600" />
                      <span>Pause Auto-Spin</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-champagne-600" />
                      <span>Start Auto-Spin</span>
                    </>
                  )}
                </button>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setZoomLevel(prev => Math.max(1, prev - 0.2))}
                    disabled={zoomLevel <= 1}
                    className="p-1.5 rounded-lg border border-champagne-200 hover:bg-champagne-100 disabled:opacity-40"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5 text-espresso-700" />
                  </button>
                  <button
                    onClick={() => setZoomLevel(prev => Math.min(2, prev + 0.2))}
                    disabled={zoomLevel >= 2}
                    className="p-1.5 rounded-lg border border-champagne-200 hover:bg-champagne-100 disabled:opacity-40"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-espresso-700" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Add to Bag CTA */}
          <div className="space-y-2 pt-4 border-t border-champagne-200">
            <button
              onClick={() => {
                addToCart(product360);
                setIs360ModalOpen(false);
              }}
              className="w-full py-3.5 bg-espresso-900 hover:bg-champagne-600 text-white rounded-xl font-serif text-xs font-bold tracking-widest uppercase transition-all shadow-luxury flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4 text-gold" />
              <span>ADD TO SHOPPING BAG</span>
            </button>
            <p className="text-[10px] text-center text-espresso-400">
              Includes KS Luxury Box & Authenticity Certificate
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

