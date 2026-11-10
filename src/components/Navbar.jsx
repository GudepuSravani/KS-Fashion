import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Heart, ShoppingBag, User, Menu, X, 
  Sparkles, ChevronDown, ArrowRight, ShieldCheck, Crown, LogOut
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Navbar = () => {
  const { 
    currentView, setCurrentView, 
    setSelectedCategory, 
    cart, setIsCartOpen, 
    wishlist, 
    user, logout, setIsAuthOpen, setAuthMode,
    products, setSelectedProduct,
    searchQuery, setSearchQuery
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const [isCollectionsHovered, setIsCollectionsHovered] = useState(false);
  const searchInputRef = useRef(null);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Live matching products for search preview
  const searchResults = localSearch.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(localSearch.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(localSearch.toLowerCase()) ||
        p.description.toLowerCase().includes(localSearch.toLowerCase())
      ).slice(0, 5);

  const handleNavClick = (view, category = 'all') => {
    setSelectedCategory(category);
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const executeSearch = (e) => {
    e?.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      setSelectedCategory('all');
      setCurrentView('shop');
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-ivory-100/95 backdrop-blur-md border-b border-champagne-300/40 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          
          {/* Left: Mobile Menu & KS FASHION Official Brand Logo & Name */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-espresso-800 hover:text-champagne-600 hover:bg-champagne-100/60 transition-colors focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* KS FASHION Official Brand Logo & Name */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-3.5 cursor-pointer group py-1"
            >
              <div className="relative flex-shrink-0">
                <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-gold to-champagne-200 shadow-md group-hover:shadow-glow-gold transition-all duration-300">
                  <img 
                    src="/logo.png" 
                    alt="KS FASHION Official Logo"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      // Fallback to local circle copy if needed
                      e.target.src = '/logo-circle.png';
                    }}
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 bg-burgundy text-white text-[9px] px-1.5 py-0.5 rounded-full font-serif font-bold uppercase tracking-widest border border-gold-light shadow-sm hidden sm:inline-block">
                  LUXE
                </span>
              </div>

              <div className="flex items-center space-x-1.5">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-wider text-espresso-900 group-hover:text-champagne-600 transition-colors">
                  KS <span className="text-champagne-600 font-light">FASHION</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Corner: Navigation Section & Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-espresso-800">
              <button
                onClick={() => handleNavClick('home')}
                className={`hover:text-champagne-600 transition-colors relative py-2 ${
                  currentView === 'home' ? 'text-champagne-600 font-semibold' : ''
                }`}
              >
                Home
                {currentView === 'home' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold rounded-full"></span>
                )}
              </button>

              <button
                onClick={() => handleNavClick('shop', 'all')}
                className={`hover:text-champagne-600 transition-colors relative py-2 ${
                  currentView === 'shop' ? 'text-champagne-600 font-semibold' : ''
                }`}
              >
                Shop
                {currentView === 'shop' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold rounded-full"></span>
                )}
              </button>

              {/* Collections Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsCollectionsHovered(true)}
                onMouseLeave={() => setIsCollectionsHovered(false)}
              >
                <button
                  onClick={() => handleNavClick('shop')}
                  className="hover:text-champagne-600 transition-colors flex items-center space-x-1 py-2"
                >
                  <span>Collections</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {isCollectionsHovered && (
                  <div className="absolute top-full left-0 w-64 bg-ivory-100 border border-champagne-300/60 rounded-xl shadow-luxury-lg py-3 px-2 z-50 animate-slide-up">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-espresso-500 uppercase tracking-wider border-b border-champagne-200">
                      Curated Lines
                    </div>
                    <button
                      onClick={() => handleNavClick('shop', 'sarees')}
                      className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-champagne-100/70 hover:text-espresso-900 transition-colors flex items-center justify-between"
                    >
                      <span>Pure Silk Sarees</span>
                      <span className="text-[10px] text-champagne-600 bg-champagne-200/50 px-2 py-0.5 rounded-full">Heirloom</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('shop', 'ethnic-wear')}
                      className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-champagne-100/70 hover:text-espresso-900 transition-colors flex items-center justify-between"
                    >
                      <span>Bridal & Festive Lehengas</span>
                      <span className="text-[10px] text-rose-500 bg-rose-100/50 px-2 py-0.5 rounded-full">Royal</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('shop', 'western-wear')}
                      className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-champagne-100/70 hover:text-espresso-900 transition-colors flex items-center justify-between"
                    >
                      <span>Parisian Chic Western</span>
                      <span className="text-[10px] text-espresso-600 bg-nude-100 px-2 py-0.5 rounded-full">Modern</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('shop', 'kurtis')}
                      className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-champagne-100/70 hover:text-espresso-900 transition-colors flex items-center justify-between"
                    >
                      <span>Lucknowi Chikankari</span>
                      <span className="text-[10px] text-champagne-600 bg-champagne-200/50 px-2 py-0.5 rounded-full">Artisan</span>
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNavClick('about')}
                className={`hover:text-champagne-600 transition-colors py-2 ${
                  currentView === 'about' ? 'text-champagne-600 font-semibold' : ''
                }`}
              >
                About Us
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className={`hover:text-champagne-600 transition-colors py-2 ${
                  currentView === 'contact' ? 'text-champagne-600 font-semibold' : ''
                }`}
              >
                Contact
              </button>
            </nav>

            {/* Subtle Hairline Divider */}
            <div className="hidden lg:block h-6 w-px bg-champagne-300/80"></div>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2.5 rounded-full text-espresso-800 hover:text-champagne-600 hover:bg-champagne-100/70 transition-colors relative"
              aria-label="Search Collection"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => handleNavClick('wishlist')}
              className="p-2.5 rounded-full text-espresso-800 hover:text-champagne-600 hover:bg-champagne-100/70 transition-colors relative"
              aria-label="View Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute 1 top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account / Profile Icon */}
            <div className="relative group">
              <button
                onClick={() => handleNavClick(user ? 'profile' : 'login')}
                className="p-2.5 rounded-full text-espresso-800 hover:text-champagne-600 hover:bg-champagne-100/70 transition-colors relative flex items-center space-x-1 outline-none"
                aria-label="My Account"
                title={user ? "My Profile & Orders" : "Sign In / Client Portal"}
              >
                {user ? (
                  <div className="w-7 h-7 rounded-full bg-champagne-500 text-white font-serif font-bold text-xs flex items-center justify-center border border-gold shadow-sm">
                    {user.name.charAt(0)}
                  </div>
                ) : (
                  <User className="w-5 h-5" />
                )}
              </button>

              {/* Luxury Account Quick Menu Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-luxury-lg border border-champagne-300 p-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {user ? (
                  <div className="space-y-1 text-xs">
                    <div className="px-3 py-2 border-b border-champagne-200/80 mb-1 bg-champagne-50/50 rounded-xl">
                      <p className="font-serif font-bold text-espresso-900 leading-tight">{user.name}</p>
                      <p className="text-[10px] text-champagne-600 font-mono truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => handleNavClick('profile')}
                      className="w-full text-left px-3 py-2 rounded-xl text-espresso-800 hover:bg-champagne-100 font-medium transition-colors"
                    >
                      Client Profile & Orders
                    </button>
                    <button
                      onClick={() => handleNavClick('admin')}
                      className="w-full text-left px-3 py-2 rounded-xl text-espresso-800 hover:bg-champagne-100 font-medium transition-colors"
                    >
                      Admin Dashboard
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-rose-700 hover:bg-rose-50 font-serif font-bold transition-colors flex items-center justify-between border-t border-champagne-100 mt-1 pt-2"
                    >
                      <span>Sign Out / Lock Store</span>
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="p-1 space-y-1.5 text-xs">
                    <button
                      onClick={() => handleNavClick('login')}
                      className="w-full py-2.5 bg-espresso-900 text-white rounded-xl font-serif font-bold tracking-wider uppercase hover:bg-champagne-600 transition-colors shadow-sm"
                    >
                      Sign In / Register
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Shopping Cart Icon with Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 rounded-full text-espresso-800 hover:text-champagne-600 hover:bg-champagne-100/70 transition-colors relative group"
              aria-label="Open Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-espresso-900 group-hover:text-champagne-600 transition-colors" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-gold to-champagne-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scale">
                    {totalCartCount}
                  </span>
                )}
              </div>
            </button>

            {/* Admin Portal Shortcut */}
            <button
              onClick={() => handleNavClick('admin')}
              className="hidden xl:flex items-center space-x-1 text-[11px] font-semibold text-champagne-600 hover:text-espresso-900 bg-champagne-200/40 hover:bg-champagne-200 px-2.5 py-1.5 rounded-lg border border-champagne-300 transition-all ml-1"
              title="KS Atelier Admin & Order Control"
            >
              <Crown className="w-3.5 h-3.5 text-gold" />
              <span>Admin</span>
            </button>

          </div>
        </div>
      </div>

      {/* Live Search Drawer / Dropdown */}
        {isSearchOpen && (
          <div className="py-4 border-t border-champagne-300/40 animate-slide-up">
            <form onSubmit={executeSearch} className="relative max-w-3xl mx-auto">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search luxury sarees, chikankari kurtis, western blazers, bags..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full bg-white border border-champagne-300/80 rounded-full py-3.5 pl-12 pr-28 text-sm text-espresso-900 placeholder-espresso-400 focus:outline-none focus:ring-2 focus:ring-gold/50 shadow-inner"
              />
              <Search className="w-5 h-5 text-champagne-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                {localSearch && (
                  <button
                    type="button"
                    onClick={() => setLocalSearch('')}
                    className="text-espresso-400 hover:text-espresso-700 p-1 text-xs"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-espresso-900 hover:bg-champagne-600 text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Quick Live Suggestions */}
            {searchResults.length > 0 && (
              <div className="max-w-3xl mx-auto mt-3 bg-white rounded-2xl shadow-luxury-lg border border-champagne-200 p-3">
                <div className="text-xs font-semibold text-espresso-500 uppercase tracking-wider px-3 py-1">
                  Matching KS Creations ({searchResults.length})
                </div>
                <div className="divide-y divide-champagne-100">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedProduct(item);
                        setCurrentView('product-detail');
                        setIsSearchOpen(false);
                      }}
                      className="flex items-center space-x-3 p-2.5 hover:bg-champagne-50 rounded-xl cursor-pointer transition-colors"
                    >
                      <img 
                        src={item.images[0]} 
                        alt={item.name} 
                        className="w-12 h-14 object-cover rounded-lg border border-champagne-200"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-espresso-900">{item.name}</h4>
                        <div className="flex items-center space-x-2 text-xs text-espresso-500 mt-0.5">
                          <span className="text-champagne-600 font-semibold">₹{item.discountPrice.toLocaleString('en-IN')}</span>
                          <span className="line-through text-espresso-400">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                          <span className="text-emerald-700 font-medium">({item.discountPercent}% OFF)</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-champagne-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-ivory-100 border-b border-champagne-300 py-4 px-6 space-y-4 shadow-xl animate-slide-up">
          <div className="flex items-center justify-between pb-3 border-b border-champagne-200">
            <span className="font-serif text-lg font-bold text-espresso-900">Explore KS FASHION</span>
          </div>

          <div className="flex flex-col space-y-3 font-medium text-espresso-800 text-sm">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left py-1.5 hover:text-champagne-600 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop', 'all')}
              className="text-left py-1.5 hover:text-champagne-600 transition-colors"
            >
              Shop All Collections
            </button>
            <button
              onClick={() => handleNavClick('shop', 'sarees')}
              className="text-left py-1.5 hover:text-champagne-600 transition-colors"
            >
              Pure Silk Sarees
            </button>
            <button
              onClick={() => handleNavClick('shop', 'ethnic-wear')}
              className="text-left py-1.5 hover:text-champagne-600 transition-colors"
            >
              Ethnic & Festive Wear
            </button>
            <button
              onClick={() => handleNavClick('shop', 'western-wear')}
              className="text-left py-1.5 hover:text-champagne-600 transition-colors"
            >
              Western & Casual Luxe
            </button>
            <button
              onClick={() => handleNavClick('shop', 'kurtis')}
              className="text-left py-1.5 hover:text-champagne-600 transition-colors"
            >
              Chikankari Kurtis
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-1.5 hover:text-champagne-600 transition-colors"
            >
              About KS Brand
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-1.5 hover:text-champagne-600 transition-colors"
            >
              Contact Concierge
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="text-left py-1.5 text-champagne-600 font-semibold"
            >
              Admin Dashboard
            </button>
          </div>

          <div className="pt-3 border-t border-champagne-200 flex items-center justify-between text-xs text-espresso-700">
            <span>Free Delivery Over ₹999</span>
            <span>Support: +91 98765 43210</span>
          </div>
        </div>
      )}
    </header>
  );
};

