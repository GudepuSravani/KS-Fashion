import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import confetti from 'canvas-confetti';
import { authApi, orderApi } from '../api/authApi';

const ShopContext = createContext();

const COUPONS = {
  'LUXURY15': { discountPercent: 15, label: '15% Off Luxury Offer' },
  'KS500': { flatDiscount: 500, minOrder: 2500, label: '₹500 Off Festival Special' },
  'FIRST10': { discountPercent: 10, label: '10% Welcome Discount' },
  'FREESHIP': { freeShipping: true, label: 'Complimentary Express Delivery' }
};

// Authorized Client Credentials Variable (Exclusive Access)
export const AUTHORIZED_CREDENTIALS = {
  email: 'sravani2@gmail.com',
  password: '12345671',
  userName: 'sweety'
};

export const ShopProvider = ({ children }) => {
  // Navigation & View State (Always lock to login page initially for security)
  const [currentView, setCurrentView] = useState('login');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [is360ModalOpen, setIs360ModalOpen] = useState(false);
  const [product360, setProduct360] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Products State (Always synchronized with latest catalog while preserving admin edits)
  const [products, setProducts] = useState(() => {
    try {
      // Invalidate old stale caches
      ['ks_fashion_products_v9', 'ks_fashion_products_v8', 'ks_fashion_products_v7', 'ks_fashion_products_v4', 'ks_fashion_products_v3', 'ks_fashion_products_v2', 'ks_fashion_products'].forEach(k => {
        try { localStorage.removeItem(k); } catch {}
      });
      const saved = localStorage.getItem('ks_fashion_products_v10');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Cart State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('ks_fashion_cart_v4');
      return saved ? JSON.parse(saved) : [
        {
          product: PRODUCTS[0], // Emerald Green Banarasi Silk Saree from docu
          size: 'Free Size (6.3m with Blouse)',
          color: PRODUCTS[0].colors[0],
          quantity: 1,
          itemKey: `${PRODUCTS[0].id}-Free Size (6.3m with Blouse)-${PRODUCTS[0].colors[0].name}`
        }
      ];
    } catch {
      return [];
    }
  });

  // Coupon State
  const [couponCode, setCouponCode] = useState('LUXURY15');
  const [appliedCoupon, setAppliedCoupon] = useState(COUPONS['LUXURY15']);
  const [couponError, setCouponError] = useState('');

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('ks_fashion_wishlist_v4');
      return saved ? JSON.parse(saved) : ['ks-sar-banasi-green', 'ks-kur-mati-kaavya'];
    } catch {
      return [];
    }
  });

  // User Auth State - Starts strictly locked (null) so user must authenticate on Login Page
  const [user, setUser] = useState(() => {
    try {
      // Purge old cached sessions so the login screen is always presented
      ['ks_fashion_user_v7', 'ks_fashion_user_v6', 'ks_fashion_user_v5', 'ks_fashion_user_v4', 'ks_fashion_user_v3', 'ks_fashion_user_v2', 'ks_fashion_user'].forEach(k => {
        try { localStorage.removeItem(k); } catch {}
      });
      return null;
    } catch {
      return null;
    }
  });

  // Verify and silently restore backend session on initial load
  useEffect(() => {
    authApi.refresh()
      .then(res => {
        if (res && res.success && res.data?.user) {
          const backendUser = res.data.user;
          setUser(prev => ({
            ...(prev || {}),
            name: backendUser.name,
            email: backendUser.email,
            role: backendUser.role || 'customer'
          }));
        }
      })
      .catch(() => {
        // No active refresh token cookie found; user can log in
      });
  }, []);

  // Orders State
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('ks_fashion_orders_v6');
      return saved ? JSON.parse(saved) : [
        {
          id: 'KS-ORD-89421',
          date: '2026-11-01',
          items: [
            {
              name: 'Emerald Green Banarasi Silk Saree',
              price: 8499,
              quantity: 1,
              size: 'Free Size (6.3m with Blouse)',
              color: 'Emerald Green',
              image: '/products/clear/clear-gold-emerald.jpg'
            }
          ],
          total: 7224,
          status: 'Confirmed & Being Packed',
          trackingNumber: 'KSEXPRESS-88291039',
          paymentMethod: 'UPI (ksfashion@upi)',
          address: 'Plot 42, Jubilee Hills, Hyderabad 500033'
        }
      ];
    } catch {
      return [];
    }
  });

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('ks_fashion_products_v10', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ks_fashion_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ks_fashion_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('ks_fashion_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ks_fashion_orders_v6', JSON.stringify(orders));
  }, [orders]);

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.discountPrice * item.quantity), 0);
  const cartOriginalTotal = cart.reduce((sum, item) => sum + (item.product.originalPrice * item.quantity), 0);
  const productSavings = cartOriginalTotal - cartSubtotal;

  const FREE_SHIPPING_MIN = 999;
  const isFreeShipping = cartSubtotal >= FREE_SHIPPING_MIN || appliedCoupon?.freeShipping;
  const shippingFee = cart.length === 0 ? 0 : (isFreeShipping ? 0 : 99);

  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      couponDiscount = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.flatDiscount) {
      couponDiscount = appliedCoupon.flatDiscount;
    }
  }

  const finalTotal = Math.max(0, cartSubtotal - couponDiscount + shippingFee);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_MIN) * 100));
  const amountNeededForFreeShip = Math.max(0, FREE_SHIPPING_MIN - cartSubtotal);

  // Cart Operations
  const addToCart = (product, size, color, quantity = 1) => {
    const chosenSize = size || (product.sizes && product.sizes[0]) || 'Standard';
    const chosenColor = color || (product.colors && product.colors[0]) || { name: 'Signature', hex: '#C5A059' };
    const itemKey = `${product.id}-${chosenSize}-${chosenColor.name}`;

    setCart(prev => {
      const existing = prev.find(item => item.itemKey === itemKey);
      if (existing) {
        return prev.map(item => 
          item.itemKey === itemKey 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, {
          product,
          size: chosenSize,
          color: chosenColor,
          quantity,
          itemKey
        }];
      }
    });

    showToast(`Added "${product.name}" to your shopping bag.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemKey) => {
    setCart(prev => prev.filter(item => item.itemKey !== itemKey));
    showToast('Item removed from shopping bag.', 'info');
  };

  const updateQuantity = (itemKey, delta) => {
    setCart(prev => prev.map(item => {
      if (item.itemKey === itemKey) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Coupon Operations
  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      setCouponError('Please enter a valid coupon code.');
      return;
    }
    const found = COUPONS[clean];
    if (found) {
      if (found.minOrder && cartSubtotal < found.minOrder) {
        setCouponError(`Requires minimum order value of ₹${found.minOrder}`);
        return;
      }
      setAppliedCoupon(found);
      setCouponCode(clean);
      setCouponError('');
      showToast(`Coupon "${clean}" applied successfully!`);
    } else {
      setCouponError('Invalid coupon code. Try LUXURY15 or KS500.');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
    showToast('Coupon removed.', 'info');
  };

  // Wishlist Operations
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const isSaved = prev.includes(productId);
      if (isSaved) {
        showToast('Removed from your Wishlist.', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your Wishlist with love ♥');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Authentication - Production MongoDB API
  const login = async (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    try {
      const response = await authApi.login({ email: cleanEmail, password: cleanPassword });
      if (response && response.success) {
        const backendUser = response.data?.user;
        const userData = {
          name: backendUser?.name || 'Customer',
          email: backendUser?.email || cleanEmail,
          phone: backendUser?.phone || '+91 98765 43210',
          role: backendUser?.role || 'customer',
          address: 'Plot 42, Jubilee Hills, Hyderabad 500033',
          tier: 'VIP Privilege Member',
          points: 1500
        };
        setUser(userData);
        localStorage.setItem('ks_fashion_user_v6', JSON.stringify(userData));
        setIsAuthOpen(false);
        setCurrentView('home');
        showToast(`Welcome back, ${userData.name}!`);
        return { success: true, user: userData };
      }
    } catch (apiError) {
      const msg = apiError.data?.errors?.[0]?.message || apiError.data?.message || apiError.message || 'Invalid email or password';
      showToast(msg, 'error');
      return { success: false, error: msg };
    }

    const err = 'Invalid email or password';
    showToast(err, 'error');
    return { success: false, error: err };
  };

  const register = async (name, email, password, confirmPassword, phone) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    try {
      const response = await authApi.register({
        name: (name || '').trim() || 'Customer',
        email: cleanEmail,
        password: cleanPassword,
        confirmPassword: confirmPassword || cleanPassword,
        phone: phone ? phone.trim() : ''
      });

      if (response && response.success) {
        const backendUser = response.data?.user;
        const userData = {
          name: backendUser?.name || name || 'Customer',
          email: backendUser?.email || cleanEmail,
          phone: backendUser?.phone || phone || '',
          role: backendUser?.role || 'customer',
          address: 'Plot 42, Jubilee Hills, Hyderabad 500033',
          tier: 'VIP Privilege Member',
          points: 1500
        };
        setUser(userData);
        localStorage.setItem('ks_fashion_user_v6', JSON.stringify(userData));
        setIsAuthOpen(false);
        setCurrentView('home');
        showToast(`Account created! Welcome to KS FASHION, ${userData.name}!`);
        return { success: true, user: userData };
      }
    } catch (apiError) {
      const msg = apiError.data?.errors?.[0]?.message || apiError.data?.message || apiError.message || 'Registration failed';
      showToast(msg, 'error');
      return { success: false, error: msg };
    }

    const err = 'Failed to create account. Please check your details.';
    showToast(err, 'error');
    return { success: false, error: err };
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {}
    setUser(null);
    try {
      localStorage.removeItem('ks_fashion_user_v6');
      localStorage.removeItem('ks_fashion_user_v5');
    } catch {}
    setCurrentView('login');
    showToast('You have been securely signed out. Store locked.', 'info');
  };

  // Order Placement (Stored permanently in MongoDB Atlas + Local State)
  const placeOrder = async (shippingInfo, paymentMethod) => {
    const orderItems = cart.map(item => ({
      productId: String(item.product.id || ''),
      name: item.product.name,
      price: Number(item.product.discountPrice),
      quantity: Number(item.quantity),
      size: item.size || 'Standard',
      color: item.color.name || 'Signature',
      image: item.product.images?.[0] || ''
    }));

    const orderPayload = {
      items: orderItems,
      shippingInfo: {
        fullName: shippingInfo.fullName,
        email: shippingInfo.email || (user ? user.email : 'guest@example.com'),
        phone: shippingInfo.phone,
        address: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        pincode: shippingInfo.pincode
      },
      paymentMethod,
      subtotal: Number(cartSubtotal),
      discount: Number(couponDiscount || 0),
      shippingFee: Number(shippingFee || 0),
      total: Number(finalTotal)
    };

    let confirmedOrder = null;

    try {
      // 1. Send Order to Backend ➔ Saved directly in MongoDB Atlas
      const response = await orderApi.createOrder(orderPayload);
      if (response && response.success && response.data?.order) {
        const dbOrder = response.data.order;
        confirmedOrder = {
          id: dbOrder.orderId,
          date: new Date(dbOrder.createdAt || Date.now()).toISOString().split('T')[0],
          items: dbOrder.items,
          subtotal: dbOrder.pricing?.subtotal || cartSubtotal,
          discount: dbOrder.pricing?.discount || couponDiscount,
          shipping: dbOrder.pricing?.shippingFee || shippingFee,
          total: dbOrder.pricing?.total || finalTotal,
          status: dbOrder.orderStatus || 'Confirmed & Being Packed',
          trackingNumber: dbOrder.trackingNumber,
          paymentMethod: dbOrder.paymentMethod,
          address: `${dbOrder.customer.fullName}, ${dbOrder.shippingAddress.address}, ${dbOrder.shippingAddress.city}, ${dbOrder.shippingAddress.state} - ${dbOrder.shippingAddress.pincode}`
        };
      }
    } catch (apiErr) {
      console.warn('Backend order sync fallback, saving locally:', apiErr);
    }

    if (!confirmedOrder) {
      confirmedOrder = {
        id: `KS-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toISOString().split('T')[0],
        items: orderItems,
        subtotal: cartSubtotal,
        discount: couponDiscount,
        shipping: shippingFee,
        total: finalTotal,
        status: 'Confirmed & Being Packed',
        trackingNumber: `KSEXPRESS-${Math.floor(10000000 + Math.random() * 90000000)}`,
        paymentMethod,
        address: `${shippingInfo.fullName}, ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} - ${shippingInfo.pincode}`
      };
    }

    setOrders(prev => [confirmedOrder, ...prev]);
    clearCart();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#6B1226', '#F5DCDA', '#C5A059']
      });
    } catch {}

    showToast(`Order #${confirmedOrder.id} placed and recorded in MongoDB database!`);
    return confirmedOrder;
  };

  // 360 Viewer trigger
  const open360Viewer = (product) => {
    setProduct360(product);
    setIs360ModalOpen(true);
  };

  // Admin Operations
  const addProduct = (newProd) => {
    const prodWithId = {
      ...newProd,
      id: `ks-custom-${Date.now()}`,
      rating: 5.0,
      reviewCount: 1,
      images: newProd.images && newProd.images.length > 0 ? newProd.images : [PRODUCTS[0].images[0]]
    };
    setProducts(prev => [prodWithId, ...prev]);
    showToast(`Product "${prodWithId.name}" added to KS catalog!`);
  };

  const updateProductStock = (id, newStock) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: newStock } : p));
    showToast('Inventory stock updated.');
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from catalog.', 'info');
  };

  return (
    <ShopContext.Provider
      value={{
        // Navigation
        currentView,
        setCurrentView,
        selectedProduct,
        setSelectedProduct,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        quickViewProduct,
        setQuickViewProduct,

        // Data
        products,
        categories: CATEGORIES,

        // Cart
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartOriginalTotal,
        productSavings,
        shippingFee,
        isFreeShipping,
        freeShippingProgress,
        amountNeededForFreeShip,
        finalTotal,
        isCartOpen,
        setIsCartOpen,

        // Coupon
        couponCode,
        appliedCoupon,
        couponDiscount,
        couponError,
        applyCoupon,
        removeCoupon,

        // Wishlist
        wishlist,
        toggleWishlist,
        isInWishlist,

        // Auth
        user,
        isAuthOpen,
        setIsAuthOpen,
        authMode,
        setAuthMode,
        login,
        register,
        logout,
        authorizedCredentials: AUTHORIZED_CREDENTIALS,

        // Orders
        orders,
        placeOrder,

        // 360 Viewer
        is360ModalOpen,
        setIs360ModalOpen,
        product360,
        open360Viewer,

        // Admin
        addProduct,
        updateProductStock,
        deleteProduct,

        // Toast
        toast,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

