import React, { useState, useMemo } from 'react';
import { 
  Filter, SlidersHorizontal, ArrowUpDown, X, Search, 
  RotateCcw, Sparkles, Check, ChevronDown 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';

export const ShopPage = () => {
  const { 
    products, 
    categories, 
    selectedCategory, 
    setSelectedCategory,
    searchQuery,
    setSearchQuery 
  } = useShop();

  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-low' | 'price-high' | 'rating'
  const [priceRange, setPriceRange] = useState(25000);
  const [selectedSize, setSelectedSize] = useState('all');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Available Sizes across all products
  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'Free Size'];

  // Helper to match umbrella and specific categories
  const matchesCategory = (product, catId) => {
    if (catId === 'all') return true;
    if (catId === 'ethnic-wear') {
      return product.category === 'ethnic-wear' || product.category === 'sarees' || product.category === 'kurtis';
    }
    if (catId === 'western-wear') {
      return product.category === 'western-wear' || product.category === 'dresses' || product.category === 'tops' || product.category === 'jeans';
    }
    if (catId === 'party-wear') {
      return product.category === 'party-wear' ||
        Boolean(product.badges && product.badges.some(b => /party|cocktail|evening|soiree|luxe/i.test(b))) ||
        /party|cocktail|evening/i.test(product.name || '') ||
        /party|cocktail|evening/i.test(product.description || '');
    }
    if (catId === 'tops') {
      return product.category === 'tops' || product.id.includes('top') || product.id.includes('blouse') || /top|blouse|shirt/i.test(product.name || '');
    }
    if (catId === 'jeans') {
      return product.category === 'jeans' || product.id.includes('jean') || product.id.includes('denim') || /denim|jean|trouser|pant/i.test(product.name || '');
    }
    return product.category === catId;
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (!matchesCategory(p, selectedCategory)) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name?.toLowerCase().includes(query);
        const matchesCat = p.categoryName?.toLowerCase().includes(query);
        const matchesDesc = p.description?.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesDesc) return false;
      }
      // Price filter
      if (p.discountPrice > priceRange) {
        return false;
      }
      // Size filter
      if (selectedSize !== 'all' && p.sizes && !p.sizes.some(s => s.includes(selectedSize))) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.discountPrice - b.discountPrice;
      if (sortBy === 'price-high') return b.discountPrice - a.discountPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [products, selectedCategory, searchQuery, priceRange, selectedSize, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange(25000);
    setSelectedSize('all');
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategory !== 'all' || searchQuery !== '' || priceRange < 25000 || selectedSize !== 'all';

  return (
    <div className="bg-ivory-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center space-x-2 text-xs text-espresso-500 font-medium">
            <span>Home</span>
            <span>/</span>
            <span className="text-champagne-600 font-bold uppercase tracking-wider font-serif">
              {selectedCategory === 'all' ? 'All Collections' : categories.find(c => c.id === selectedCategory)?.name || selectedCategory}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-900 tracking-tight">
                {selectedCategory === 'all' ? 'The Complete KS Collection' : categories.find(c => c.id === selectedCategory)?.name || 'Fashion Gallery'}
              </h1>
              <p className="text-xs sm:text-sm text-espresso-600 mt-1">
                Showing {filteredProducts.length} exquisite handcrafted silhouettes
              </p>
            </div>

            {/* Sort & Mobile Filter Toggle */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2.5 bg-white border border-champagne-300 rounded-xl text-xs font-semibold text-espresso-900 shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4 text-champagne-600" />
                <span>Filters {hasActiveFilters && '•'}</span>
              </button>

              <div className="flex items-center space-x-2 bg-white border border-champagne-300 rounded-xl px-3 py-2 shadow-sm text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-champagne-600" />
                <span className="text-espresso-500 hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-semibold text-espresso-900 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured / Curated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-espresso-500 font-medium">Active filters:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center space-x-1.5 bg-burgundy/10 text-burgundy text-xs px-3 py-1 rounded-full border border-burgundy/30 font-medium">
                  <span>Category: {categories.find(c => c.id === selectedCategory)?.name || selectedCategory}</span>
                  <button onClick={() => setSelectedCategory('all')}>
                    <X className="w-3 h-3 text-burgundy hover:text-espresso-900" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center space-x-1 bg-champagne-200 text-espresso-900 text-xs px-2.5 py-1 rounded-full border border-champagne-300">
                  <span>Search: "{searchQuery}"</span>
                  <button onClick={() => setSearchQuery('')}>
                    <X className="w-3 h-3 text-espresso-600 hover:text-espresso-900" />
                  </button>
                </span>
              )}
              {selectedSize !== 'all' && (
                <span className="inline-flex items-center space-x-1 bg-champagne-200 text-espresso-900 text-xs px-2.5 py-1 rounded-full border border-champagne-300">
                  <span>Size: {selectedSize}</span>
                  <button onClick={() => setSelectedSize('all')}>
                    <X className="w-3 h-3 text-espresso-600 hover:text-espresso-900" />
                  </button>
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-xs text-champagne-600 hover:text-espresso-900 font-semibold underline underline-offset-2 ml-1"
              >
                Reset All
              </button>
            </div>
          )}
        </div>

        {/* Main Grid: Filters Sidebar + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-champagne-300/80 shadow-sm space-y-6 sticky top-28">
              
              <div className="flex items-center justify-between pb-3 border-b border-champagne-200">
                <div className="flex items-center space-x-2 text-espresso-900 font-serif font-bold text-base">
                  <Filter className="w-4 h-4 text-champagne-600" />
                  <span>Refine Wardrobe</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] text-espresso-400 hover:text-rose-600 flex items-center space-x-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Categories Accordion */}
              <div className="space-y-2">
                <h4 className="text-xs font-serif font-bold text-espresso-900 uppercase tracking-wider">
                  Category
                </h4>
                <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                      selectedCategory === 'all'
                        ? 'bg-burgundy text-white font-bold shadow-sm ring-1 ring-gold/40'
                        : 'text-espresso-700 hover:bg-champagne-100 font-medium'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {selectedCategory === 'all' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                      )}
                      <span>All Collections</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md ${
                      selectedCategory === 'all' ? 'bg-white/20 text-white font-bold' : 'text-espresso-500 bg-champagne-100'
                    }`}>
                      {products.length}
                    </span>
                  </button>
                  {categories.map((c) => {
                    const count = products.filter(p => matchesCategory(p, c.id)).length;
                    const isSelected = selectedCategory === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCategory(c.id)}
                        className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-burgundy text-white font-bold shadow-sm ring-1 ring-gold/40'
                            : 'text-espresso-700 hover:bg-champagne-100 font-medium'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                          )}
                          <span>{c.name}</span>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-md ${
                          isSelected ? 'bg-white/20 text-white font-bold' : 'text-espresso-500 bg-champagne-100'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Filter */}
              <div className="space-y-2 pt-4 border-t border-champagne-200">
                <div className="flex justify-between items-center text-xs">
                  <h4 className="font-serif font-bold text-espresso-900 uppercase tracking-wider">
                    Max Price
                  </h4>
                  <span className="font-bold text-champagne-600">₹{priceRange.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="25000"
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-champagne-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-espresso-400">
                  <span>₹2,000</span>
                  <span>₹25,000+</span>
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-2 pt-4 border-t border-champagne-200">
                <h4 className="text-xs font-serif font-bold text-espresso-900 uppercase tracking-wider">
                  Filter by Size
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedSize('all')}
                    className={`text-xs px-3 py-1 rounded-lg border transition-all ${
                      selectedSize === 'all'
                        ? 'border-gold bg-champagne-200 text-espresso-900 font-bold'
                        : 'border-champagne-200 text-espresso-600 hover:border-champagne-400'
                    }`}
                  >
                    All
                  </button>
                  {allSizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`text-xs px-3 py-1 rounded-lg border transition-all ${
                        selectedSize === s
                          ? 'border-gold bg-champagne-200 text-espresso-900 font-bold'
                          : 'border-champagne-200 text-espresso-600 hover:border-champagne-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-champagne-300 shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-full bg-champagne-100 flex items-center justify-center mx-auto text-champagne-500">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-espresso-900">
                  No creations match your active filters
                </h3>
                <p className="text-xs text-espresso-500 max-w-sm mx-auto">
                  Try adjusting your price range, clearing size options, or selecting another category.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-espresso-900 text-white rounded-full font-serif text-xs font-bold uppercase tracking-wider hover:bg-champagne-600 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-full max-w-xs bg-ivory-100 h-full p-6 shadow-2xl overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-champagne-300">
              <h3 className="font-serif text-lg font-bold text-espresso-900">Refine Selection</h3>
              <button onClick={() => setIsMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-espresso-700" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-espresso-900 uppercase">Category</h4>
              <div className="space-y-1">
                <button
                  onClick={() => { setSelectedCategory('all'); setIsMobileFilterOpen(false); }}
                  className={`w-full text-left text-xs p-2.5 rounded-lg flex items-center justify-between ${
                    selectedCategory === 'all' ? 'bg-burgundy text-white font-bold shadow-sm' : 'text-espresso-700 hover:bg-champagne-100'
                  }`}
                >
                  <span>All Collections</span>
                  <span className="text-[10px] opacity-75">{products.length}</span>
                </button>
                {categories.map((c) => {
                  const count = products.filter(p => matchesCategory(p, c.id)).length;
                  const isSelected = selectedCategory === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => { setSelectedCategory(c.id); setIsMobileFilterOpen(false); }}
                      className={`w-full text-left text-xs p-2.5 rounded-lg flex items-center justify-between ${
                        isSelected ? 'bg-burgundy text-white font-bold shadow-sm' : 'text-espresso-700 hover:bg-champagne-100'
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className="text-[10px] opacity-75">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Price */}
            <div className="space-y-2 pt-4 border-t border-champagne-200">
              <div className="flex justify-between text-xs">
                <span className="font-bold">Max Price</span>
                <span className="text-champagne-600 font-bold">₹{priceRange.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="25000"
                step="500"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-champagne-500"
              />
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3 bg-espresso-900 text-white rounded-xl font-serif text-xs font-bold tracking-wider uppercase"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

