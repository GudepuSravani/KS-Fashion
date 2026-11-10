import React, { useState } from 'react';
import { 
  User, Package, MapPin, Award, LogOut, ChevronRight, 
  Clock, Truck, CheckCircle2, ShieldCheck, Printer, Heart 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const UserProfilePage = () => {
  const { user, logout, orders, setCurrentView } = useShop();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'addresses' | 'privilege'

  if (!user) {
    return (
      <div className="bg-ivory-50 min-h-[60vh] flex items-center justify-center py-16 px-4">
        <div className="bg-white p-8 rounded-3xl border border-champagne-300 text-center max-w-sm w-full space-y-4 shadow-luxury">
          <User className="w-12 h-12 text-champagne-600 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-espresso-900">Sign in to KS Atelier</h3>
          <p className="text-xs text-espresso-600">Access your saved addresses, track couture orders and claim royal member points.</p>
          <button
            onClick={() => setCurrentView('home')}
            className="w-full py-3 bg-espresso-900 text-white rounded-xl text-xs font-bold font-serif"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Profile Banner Card */}
        <div className="bg-white rounded-3xl border border-champagne-300 p-6 sm:p-8 shadow-luxury flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex items-center space-x-4 z-10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-gold to-champagne-400 text-white font-serif font-bold text-2xl flex items-center justify-center shadow-md border-2 border-white">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif text-2xl font-bold text-espresso-900">{user.name}</h1>
                <span className="bg-champagne-200 text-espresso-900 border border-gold/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-serif">
                  {user.tier || 'Gold Royal Member'}
                </span>
              </div>
              <p className="text-xs text-espresso-500 mt-0.5">{user.email} • {user.phone}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 z-10">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-espresso-400 block tracking-wider">Royalty Points</span>
              <span className="font-serif text-xl font-bold text-gold">{user.points || 1200} pts</span>
            </div>
            <button
              onClick={() => {
                logout();
                setCurrentView('home');
              }}
              className="flex items-center space-x-1.5 px-4 py-2 bg-ivory-100 hover:bg-rose-50 text-espresso-700 hover:text-rose-600 border border-champagne-300 rounded-xl text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-champagne-200 space-x-6 overflow-x-auto text-xs font-serif font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 relative flex items-center space-x-2 transition-colors ${
              activeTab === 'orders' ? 'text-espresso-900 border-b-2 border-gold' : 'text-espresso-400 hover:text-espresso-700'
            }`}
          >
            <Package className="w-4 h-4 text-champagne-600" />
            <span>Orders & Dispatch Tracking ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-3 relative flex items-center space-x-2 transition-colors ${
              activeTab === 'addresses' ? 'text-espresso-900 border-b-2 border-gold' : 'text-espresso-400 hover:text-espresso-700'
            }`}
          >
            <MapPin className="w-4 h-4 text-champagne-600" />
            <span>Saved Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab('privilege')}
            className={`pb-3 relative flex items-center space-x-2 transition-colors ${
              activeTab === 'privilege' ? 'text-espresso-900 border-b-2 border-gold' : 'text-espresso-400 hover:text-espresso-700'
            }`}
          >
            <Award className="w-4 h-4 text-champagne-600" />
            <span>Privilege Perks</span>
          </button>
        </div>

        {/* Tab 1: Orders List with Tracking Stepper */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-3xl border border-champagne-200">
                <p className="text-sm text-espresso-500">No orders placed yet.</p>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="mt-4 px-6 py-2 bg-espresso-900 text-white rounded-full text-xs font-serif font-bold"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              orders.map((ord) => (
                <div key={ord.id} className="bg-white rounded-3xl border border-champagne-300 p-6 sm:p-8 shadow-sm space-y-6">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-champagne-200 gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm font-bold text-espresso-900">{ord.id}</span>
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                          {ord.status}
                        </span>
                      </div>
                      <p className="text-xs text-espresso-500 mt-0.5">Placed on {ord.date} • Paid via {ord.paymentMethod}</p>
                    </div>

                    <div className="flex items-center space-x-3 text-xs">
                      <span className="font-serif text-lg font-bold text-espresso-900">
                        ₹{ord.total.toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => window.print()}
                        className="p-2 border border-champagne-300 rounded-lg hover:bg-champagne-100 text-espresso-700"
                        title="Print Invoice"
                      >
                        <Printer className="w-4 h-4 text-champagne-600" />
                      </button>
                    </div>
                  </div>

                  {/* Delivery Stepper */}
                  <div className="bg-ivory-100 rounded-2xl p-4 border border-champagne-200">
                    <div className="flex justify-between items-center text-xs mb-3">
                      <span className="font-semibold text-espresso-900 flex items-center space-x-1.5">
                        <Truck className="w-4 h-4 text-champagne-600" />
                        <span>Tracking: <strong className="font-mono text-champagne-700">{ord.trackingNumber}</strong></span>
                      </span>
                      <span className="text-[11px] text-espresso-500">Live Courier Updates</span>
                    </div>

                    {/* Stepper bar */}
                    <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-semibold text-espresso-700">
                      <div className="space-y-1">
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-xs font-bold">✓</div>
                        <span>Confirmed</span>
                      </div>
                      <div className="space-y-1">
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-xs font-bold">✓</div>
                        <span>Inspected & Packed</span>
                      </div>
                      <div className="space-y-1">
                        <div className="w-6 h-6 rounded-full bg-gold text-espresso-950 flex items-center justify-center mx-auto text-xs font-bold animate-pulse">3</div>
                        <span className="text-espresso-900 font-bold">In Transit</span>
                      </div>
                      <div className="space-y-1 opacity-50">
                        <div className="w-6 h-6 rounded-full bg-champagne-200 text-espresso-500 flex items-center justify-center mx-auto text-xs font-bold">4</div>
                        <span>Delivered</span>
                      </div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-espresso-400">Order Items</h4>
                    <div className="divide-y divide-champagne-100">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex items-center space-x-4 py-2.5 text-xs">
                          <img src={it.image} alt={it.name} className="w-12 h-16 object-cover rounded-lg border border-champagne-200" />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-semibold text-espresso-900 truncate">{it.name}</h5>
                            <span className="text-espresso-500 text-[11px]">Size: {it.size} • Color: {it.color} • Qty: {it.quantity}</span>
                          </div>
                          <span className="font-serif font-bold text-espresso-900">₹{it.price.toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="bg-white rounded-3xl border border-champagne-300 p-8 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-espresso-900">Default Shipping Address</h3>
            <div className="p-4 rounded-2xl bg-ivory-100 border border-champagne-200 text-xs space-y-1 max-w-md">
              <strong className="text-espresso-900 block font-serif text-sm">{user.name} (Primary Home)</strong>
              <p className="text-espresso-600">{user.address}</p>
              <p className="text-espresso-500 font-mono">Mobile: {user.phone}</p>
            </div>
          </div>
        )}

        {/* Tab 3: Privilege Perks */}
        {activeTab === 'privilege' && (
          <div className="bg-white rounded-3xl border border-champagne-300 p-8 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-espresso-900">KS Gold Royal Member Privileges</h3>
            <ul className="text-xs text-espresso-700 space-y-2 list-disc pl-5">
              <li>Complimentary Express Air Dispatch on all orders regardless of cart total.</li>
              <li>Early 24-hour access to Festive Silk & Bridal Lehengas before public launches.</li>
              <li>Personal fashion concierge styling consultation on WhatsApp.</li>
              <li>Free replacement and door-step tailoring adjustments within 7 days.</li>
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

