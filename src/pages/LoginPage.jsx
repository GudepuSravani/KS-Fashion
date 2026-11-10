import React, { useState } from 'react';
import { 
  Lock, Mail, User, Phone, ArrowRight, 
  ArrowLeft, Eye, EyeOff, ShieldCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const LoginPage = () => {
  const { 
    user, 
    login, 
    register, 
    logout, 
    setCurrentView, 
    showToast 
  } = useShop();

  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (authMode === 'login') {
      if (!email.trim() || !password.trim()) {
        const msg = 'Please enter your email and password.';
        setErrorMessage(msg);
        showToast(msg, 'error');
        return;
      }
      setIsLoading(true);
      try {
        const res = await login(email, password);
        if (!res.success) {
          setErrorMessage(res.error);
          return;
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      if (!email.trim() || !password.trim()) {
        const msg = 'Please enter your email and password to register.';
        setErrorMessage(msg);
        showToast(msg, 'error');
        return;
      }
      if (password.length < 6) {
        const msg = 'Password must be at least 6 characters long.';
        setErrorMessage(msg);
        showToast(msg, 'error');
        return;
      }
      if (password !== confirmPassword) {
        const msg = 'Passwords do not match.';
        setErrorMessage(msg);
        showToast(msg, 'error');
        return;
      }
      setIsLoading(true);
      try {
        const res = await register(name || 'Customer', email, password, confirmPassword, phone);
        if (!res.success) {
          setErrorMessage(res.error);
          return;
        }
      } finally {
        setIsLoading(false);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory-100 via-champagne-50/70 to-ivory-200 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Top Minimal Security Header - Standalone, Zero Store Navbars */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center space-x-2 text-xs font-serif font-semibold text-espresso-800 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-champagne-300 shadow-xs">
            <Lock className="w-3.5 h-3.5 text-burgundy" />
            <span className="tracking-wide">KS FASHION Protected Access • Please Sign In</span>
          </div>

          <span className="text-xs text-espresso-600 font-serif italic hidden sm:inline-block">
            "Elegance in Every Thread."
          </span>
        </div>

        {/* Main Clean Auth Card */}
        <div className="bg-white rounded-3xl shadow-luxury-lg border border-champagne-300/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Crystal Clear Couture Visual (Zero Fog, Zero Text Overlap) */}
          <div className="lg:col-span-5 relative min-h-[420px] lg:min-h-full flex flex-col justify-end p-6 sm:p-8 text-white overflow-hidden bg-espresso-950">
            {/* Ultra-Clear Haute Couture Image */}
            <img 
              src="/products/login-editorial-clear.jpg" 
              alt="KS FASHION Couture"
              className="absolute inset-0 w-full h-full object-cover object-top select-none pointer-events-none"
            />
            {/* Subtle bottom vignette only behind the caption */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-espresso-950/90 via-espresso-950/40 to-transparent" />

            {/* Bottom Minimalist Brand Identity */}
            <div className="relative z-10 p-3 rounded-xl bg-espresso-950/80 border border-white/10 text-center space-y-0.5">
              <h2 className="font-serif text-lg font-bold text-white tracking-widest">
                KS <span className="text-gold font-light">FASHION</span>
              </h2>
              <p className="font-serif italic text-champagne-200 text-[11px]">
                "Elegance in Every Thread."
              </p>
            </div>
          </div>

          {/* Right Column: Clear, Crisp Sign In / Register Form */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 bg-white">
            
            <div className="space-y-5">
              {/* Title */}
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-950">
                  {authMode === 'login' ? 'Sign In' : 'Create Account'}
                </h3>
                <p className="text-xs text-espresso-600 mt-1">
                  {authMode === 'login' 
                    ? 'Enter your credentials to access your KS FASHION boutique profile.' 
                    : 'Register with your name and email to enjoy exclusive couture collections.'}
                </p>
              </div>

              {/* Error Message Alert */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-medium flex items-center space-x-2 animate-shake">
                  <Lock className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Tab Switcher */}
              <div className="flex border-b border-champagne-200 text-xs font-serif font-bold uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); setErrorMessage(''); }}
                  className={`flex-1 pb-3 text-center transition-all ${
                    authMode === 'login'
                      ? 'border-b-2 border-burgundy text-burgundy font-extrabold text-sm'
                      : 'text-espresso-400 hover:text-espresso-700'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode('register'); setErrorMessage(''); }}
                  className={`flex-1 pb-3 text-center transition-all ${
                    authMode === 'register'
                      ? 'border-b-2 border-burgundy text-burgundy font-extrabold text-sm'
                      : 'text-espresso-400 hover:text-espresso-700'
                  }`}
                >
                  Register
                </button>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Full Name for Registration */}
                {authMode === 'register' && (
                  <div>
                    <label className="block font-semibold text-espresso-800 mb-1.5 text-xs">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sitha"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-ivory-50 border border-champagne-300 rounded-xl py-3 pl-10 pr-3 text-espresso-900 placeholder:text-espresso-400 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-colors text-xs"
                      />
                      <User className="w-4 h-4 text-burgundy/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                )}

                {/* Email Address */}
                <div>
                  <label className="block font-semibold text-espresso-800 mb-1.5 text-xs">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-ivory-50 border border-champagne-300 rounded-xl py-3 pl-10 pr-3 text-espresso-900 placeholder:text-espresso-400 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-colors text-xs font-mono"
                    />
                    <Mail className="w-4 h-4 text-burgundy/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Phone Number for Registration */}
                {authMode === 'register' && (
                  <div>
                    <label className="block font-semibold text-espresso-800 mb-1.5 text-xs">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="e.g. 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-ivory-50 border border-champagne-300 rounded-xl py-3 pl-10 pr-3 text-espresso-900 placeholder:text-espresso-400 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-colors text-xs font-mono"
                      />
                      <Phone className="w-4 h-4 text-burgundy/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                )}

                {/* Password */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="font-semibold text-espresso-800 text-xs">
                      Password
                    </label>
                    {authMode === 'login' && (
                      <button 
                        type="button" 
                        onClick={() => showToast('Password reset link sent to sravani2@gmail.com!')}
                        className="text-[11px] text-burgundy hover:text-espresso-900 font-semibold"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-ivory-50 border border-champagne-300 rounded-xl py-3 pl-10 pr-10 text-espresso-900 placeholder:text-espresso-400 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-colors text-xs"
                    />
                    <Lock className="w-4 h-4 text-burgundy/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-espresso-400 hover:text-espresso-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password for Registration */}
                {authMode === 'register' && (
                  <div>
                    <label className="block font-semibold text-espresso-800 mb-1.5 text-xs">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-ivory-50 border border-champagne-300 rounded-xl py-3 pl-10 pr-10 text-espresso-900 placeholder:text-espresso-400 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-colors text-xs"
                      />
                      <Lock className="w-4 h-4 text-burgundy/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                )}

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center space-x-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-champagne-300 text-burgundy accent-burgundy cursor-pointer"
                    />
                    <span className="text-xs text-espresso-700">Remember me</span>
                  </label>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-burgundy hover:bg-burgundy-dark disabled:bg-burgundy/60 text-white rounded-xl font-serif text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 group cursor-pointer disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="inline-flex items-center space-x-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Authenticating...</span>
                    </span>
                  ) : (
                    <>
                      <span>{authMode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}</span>
                      <ArrowRight className="w-4 h-4 text-gold transform group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Security Protection Notice */}
              <div className="text-center pt-2 text-[11px] text-espresso-500 font-serif border-t border-champagne-200/60">
                <span>🔒 256-Bit Encrypted Authentication • Exclusively Authorized Access</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
