import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';

// Components
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedCategories } from './components/FeaturedCategories';
import { NewArrivals } from './components/NewArrivals';
import { TrendingCollections } from './components/TrendingCollections';
import { BestSellers } from './components/BestSellers';
import { SpecialOffers } from './components/SpecialOffers';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CustomerReviews } from './components/CustomerReviews';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';

// Modals & Drawers
import { CartDrawer } from './components/CartDrawer';
import { Product360ViewerModal } from './components/Product360ViewerModal';
import { QuickViewModal } from './components/QuickViewModal';
import { AuthModal } from './components/AuthModal';
import { PolicyModals } from './components/PolicyModals';

// Pages
import { ShopPage } from './pages/ShopPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { WishlistPage } from './pages/WishlistPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';

const MainLayout = () => {
  const { currentView, toast, user } = useShop();
  const [activePolicy, setActivePolicy] = useState(null);

  // FULL STANDALONE SECURITY GATEWAY: If user is not authenticated OR viewing the login page, render ONLY LoginPage (Zero Navbar, Zero AnnouncementBar, Zero Footer)
  if (!user || currentView === 'login') {
    return (
      <div className="min-h-screen flex flex-col bg-ivory-100 text-espresso-900 font-sans antialiased">
        <main className="flex-1 flex flex-col justify-center">
          <LoginPage />
        </main>
        {/* Toast Notification Banner */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-espresso-900/95 text-white px-5 py-3.5 rounded-2xl shadow-luxury-lg border border-gold/40 flex items-center space-x-3 backdrop-blur-md animate-slide-up">
            <div className="w-2.5 h-2.5 rounded-full bg-gold animate-ping flex-shrink-0" />
            <p className="text-xs font-medium tracking-wide">{toast.message}</p>
          </div>
        )}
      </div>
    );
  }

  // Once authenticated (signed in or registered), render the complete store
  return (
    <div className="min-h-screen flex flex-col bg-ivory-100 text-espresso-900 font-sans antialiased">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Luxury Navigation */}
      <Navbar />

      {/* Dynamic View Switcher */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HeroSection />
            <FeaturedCategories />
            <NewArrivals />
            <TrendingCollections />
            <BestSellers />
            <SpecialOffers />
            <AboutSection />
            <WhyChooseUs />
            <CustomerReviews />
            <NewsletterSection />
          </>
        )}

        {currentView === 'shop' && <ShopPage />}
        {currentView === 'product-detail' && <ProductDetailsPage />}
        {currentView === 'cart' && <CartPage />}
        {currentView === 'checkout' && <CheckoutPage />}
        {currentView === 'wishlist' && <WishlistPage />}
        {currentView === 'profile' && <UserProfilePage />}
        {currentView === 'admin' && <AdminDashboard />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'contact' && <ContactPage />}
      </main>

      {/* Global Footer */}
      <Footer onOpenPolicy={(policy) => setActivePolicy(policy)} />

      {/* Modals & Slide-out Panels */}
      <CartDrawer />
      <Product360ViewerModal />
      <QuickViewModal />
      <AuthModal />
      <PolicyModals activePolicy={activePolicy} onClose={() => setActivePolicy(null)} />

      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-espresso-900/95 text-white px-5 py-3.5 rounded-2xl shadow-luxury-lg border border-gold/40 flex items-center space-x-3 backdrop-blur-md animate-slide-up">
          <div className="w-2.5 h-2.5 rounded-full bg-gold animate-ping flex-shrink-0" />
          <p className="text-xs font-medium tracking-wide">{toast.message}</p>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}

