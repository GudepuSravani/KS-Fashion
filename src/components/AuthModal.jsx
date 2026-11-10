import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AuthModal = () => {
  const { isAuthOpen, setIsAuthOpen, authMode, setAuthMode, login, register, showToast } = useShop();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (authMode === 'login') {
      setIsLoading(true);
      try {
        const res = await login(email, password);
        if (!res.success) {
          setErrorMsg(res.error);
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
      setIsLoading(true);
      try {
        const res = await register(name || 'Customer', email, password, confirmPassword, phone);
        if (!res.success) {
          setErrorMsg(res.error);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-champagne-300/80 p-6 sm:p-8 space-y-4"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-4 right-4 text-espresso-400 hover:text-espresso-900 p-2 rounded-full hover:bg-champagne-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Official Brand Logo */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-gold to-champagne-200 mx-auto shadow-md">
            <img 
              src="/logo.png" 
              alt="KS FASHION Official Logo"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => { e.target.src = '/logo-circle.png'; }}
            />
          </div>
          <h2 className="font-serif text-2xl font-bold text-espresso-900 tracking-tight">
            KS <span className="text-burgundy font-light">FASHION</span>
          </h2>
          <p className="text-xs text-espresso-600 font-serif italic">
            "Elegance in Every Thread."
          </p>
        </div>

        {errorMsg && (
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-medium flex items-center space-x-2">
            <Lock className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Tab Toggle: Sign In / Create Account */}
        <div className="flex border-b border-champagne-200 text-xs font-serif font-bold uppercase tracking-wider">
          <button
            onClick={() => { setAuthMode('login'); setErrorMsg(''); }}
            className={`flex-1 pb-2.5 transition-colors ${
              authMode === 'login' ? 'border-b-2 border-burgundy text-burgundy font-extrabold' : 'text-espresso-400'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setAuthMode('register'); setErrorMsg(''); }}
            className={`flex-1 pb-2.5 transition-colors ${
              authMode === 'register' ? 'border-b-2 border-burgundy text-burgundy font-extrabold' : 'text-espresso-400'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form with Exclusive Authorized Validation */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {authMode === 'register' && (
            <div>
              <label className="block font-semibold text-espresso-800 mb-1">User Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. sweety"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-ivory-50 border border-champagne-300 rounded-xl py-2.5 pl-10 pr-3 text-espresso-900 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy"
                />
                <User className="w-4 h-4 text-burgundy/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <div>
            <label className="block font-semibold text-espresso-800 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="e.g. sravani2@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-ivory-50 border border-champagne-300 rounded-xl py-2.5 pl-10 pr-3 text-espresso-900 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy font-mono"
              />
              <Mail className="w-4 h-4 text-burgundy/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {authMode === 'register' && (
            <div>
              <label className="block font-semibold text-espresso-800 mb-1">Mobile Number</label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="e.g. 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-ivory-50 border border-champagne-300 rounded-xl py-2.5 pl-10 pr-3 text-espresso-900 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy font-mono"
                />
                <Phone className="w-4 h-4 text-burgundy/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-semibold text-espresso-800">Password</label>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-ivory-50 border border-champagne-300 rounded-xl py-2.5 pl-10 pr-3 text-espresso-900 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy"
              />
              <Lock className="w-4 h-4 text-burgundy/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {authMode === 'register' && (
            <div>
              <label className="block font-semibold text-espresso-800 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-ivory-50 border border-champagne-300 rounded-xl py-2.5 pl-10 pr-3 text-espresso-900 focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy"
                />
                <Lock className="w-4 h-4 text-burgundy/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-burgundy hover:bg-burgundy-dark text-white rounded-xl font-serif text-xs font-bold tracking-widest uppercase transition-all shadow-md flex items-center justify-center space-x-2"
          >
            <span>{authMode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}</span>
            <ArrowRight className="w-4 h-4 text-gold" />
          </button>
        </form>

        <div className="text-center pt-1 text-[11px] text-espresso-500 font-serif border-t border-champagne-200">
          <span>🔒 Exclusively Authorized Client Access</span>
        </div>
      </div>
    </div>
  );
};
