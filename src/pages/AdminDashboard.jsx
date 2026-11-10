import React, { useState } from 'react';
import { 
  Crown, DollarSign, Package, Users, Plus, Trash2, 
  Edit3, Check, ArrowLeft, RefreshCw, Star, Tag, Eye 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AdminDashboard = () => {
  const { 
    products, 
    addProduct, 
    updateProductStock, 
    deleteProduct, 
    orders, 
    categories, 
    setCurrentView 
  } = useShop();

  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'orders' | 'customers'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form state
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'sarees',
    categoryName: 'Sarees',
    originalPrice: 7999,
    discountPrice: 4999,
    discountPercent: 38,
    stock: 10,
    fabric: 'Pure Handloom Silk',
    description: 'Exquisite new addition to the KS collection with intricate gold zari detailing.',
    images: ['https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85'],
    sizes: ['Free Size', 'S', 'M', 'L'],
    colors: [{ name: 'Royal Gold', hex: '#D4AF37' }],
    badges: ['New In', 'Handcrafted'],
    is360: true
  });

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const cat = categories.find(c => c.id === newProd.category);
    addProduct({
      ...newProd,
      categoryName: cat ? cat.name : 'Sarees',
      discountPercent: Math.round(((newProd.originalPrice - newProd.discountPrice) / newProd.originalPrice) * 100)
    });
    setIsAddModalOpen(false);
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 184500;

  return (
    <div className="bg-ivory-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-champagne-300 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-gold mb-1">
              <Crown className="w-4 h-4" />
              <span className="text-xs font-serif font-bold uppercase tracking-widest text-espresso-900">
                KS FASHION EXECUTIVE ATELIER CONTROL
              </span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-espresso-900">
              Admin & Inventory Portal
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2.5 bg-espresso-900 hover:bg-champagne-600 text-white rounded-xl text-xs font-serif font-bold tracking-wider uppercase transition-colors flex items-center space-x-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4 text-gold" />
              <span>Add New Product</span>
            </button>
            <button
              onClick={() => setCurrentView('home')}
              className="px-4 py-2.5 bg-white border border-champagne-300 text-espresso-800 rounded-xl text-xs font-medium hover:bg-champagne-100 transition-colors"
            >
              View Live Storefront
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-champagne-300 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-espresso-400 tracking-wider">Gross Sales Revenue</span>
            <h3 className="font-serif text-2xl font-bold text-espresso-900 mt-1">₹{totalRevenue.toLocaleString('en-IN')}</h3>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-1">↑ +24.8% vs last cycle</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-champagne-300 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-espresso-400 tracking-wider">Customer Orders</span>
            <h3 className="font-serif text-2xl font-bold text-espresso-900 mt-1">{orders.length + 84}</h3>
            <span className="text-[11px] text-champagne-600 font-semibold block mt-1">99.4% On-Time Dispatch</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-champagne-300 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-espresso-400 tracking-wider">Active Inventory</span>
            <h3 className="font-serif text-2xl font-bold text-espresso-900 mt-1">{products.length} Designs</h3>
            <span className="text-[11px] text-espresso-500 font-semibold block mt-1">Across 10 Categories</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-champagne-300 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-espresso-400 tracking-wider">Average Order Value</span>
            <h3 className="font-serif text-2xl font-bold text-espresso-900 mt-1">₹5,420</h3>
            <span className="text-[11px] text-gold font-semibold block mt-1">Luxury Silk Mark Tier</span>
          </div>
        </div>

        {/* Tabs: Inventory / Orders / Customers */}
        <div className="flex border-b border-champagne-200 space-x-6 text-xs font-serif font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 ${activeTab === 'inventory' ? 'text-espresso-900 border-b-2 border-gold' : 'text-espresso-400'}`}
          >
            Product Catalog & Stock ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 ${activeTab === 'orders' ? 'text-espresso-900 border-b-2 border-gold' : 'text-espresso-400'}`}
          >
            Client Orders ({orders.length})
          </button>
        </div>

        {/* Tab 1: Product Inventory Table */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-3xl border border-champagne-300 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-champagne-200 flex justify-between items-center text-xs">
              <span className="font-bold text-espresso-800">All Catalog Products</span>
              <span className="text-espresso-500">Live stock updates persist automatically in your browser</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-champagne-100 text-espresso-900 font-bold uppercase tracking-wider border-b border-champagne-200">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock Level</th>
                    <th className="p-4">360 View</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-champagne-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-ivory-50">
                      <td className="p-4 flex items-center space-x-3">
                        <img src={p.images[0]} alt={p.name} className="w-12 h-14 object-cover rounded-lg border border-champagne-200" />
                        <div>
                          <p className="font-semibold text-espresso-900">{p.name}</p>
                          <span className="text-[10px] text-espresso-400 font-mono">ID: {p.id}</span>
                        </div>
                      </td>
                      <td className="p-4 font-serif">{p.categoryName}</td>
                      <td className="p-4">
                        <strong className="text-espresso-900">₹{p.discountPrice.toLocaleString('en-IN')}</strong>
                        <span className="text-[10px] text-espresso-400 block line-through">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            min="0"
                            max="999"
                            value={p.stock}
                            onChange={(e) => updateProductStock(p.id, Number(e.target.value))}
                            className="w-16 bg-ivory-100 border border-champagne-300 rounded-lg p-1.5 text-center font-bold"
                          />
                          <span className="text-[11px] text-espresso-500">units</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {p.is360 ? (
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] font-bold">Enabled</span>
                        ) : (
                          <span className="text-espresso-400 text-[10px]">Standard</span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-2 text-espresso-400 hover:text-rose-600 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Orders List */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-champagne-300 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-champagne-200 text-xs font-bold text-espresso-800">
              Client Orders & Dispatch Registry
            </div>
            <div className="divide-y divide-champagne-100">
              {orders.map((o) => (
                <div key={o.id} className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                  <div>
                    <div className="flex items-center space-x-2">
                      <strong className="font-mono text-espresso-900">{o.id}</strong>
                      <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        {o.status}
                      </span>
                    </div>
                    <p className="text-espresso-500 mt-1">{o.date} • {o.items.length} items • {o.address}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-base font-bold text-espresso-900 block">₹{o.total.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-champagne-600 font-mono">{o.trackingNumber}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Add New Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-champagne-300 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-xl font-bold text-espresso-900">Add New Fashion Piece</h3>
            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  placeholder="e.g. Royal Banarasi Zari Silk Saree"
                  className="w-full bg-ivory-100 border border-champagne-300 rounded-xl p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                    className="w-full bg-ivory-100 border border-champagne-300 rounded-xl p-2.5"
                  >
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Stock Units</label>
                  <input
                    type="number"
                    value={newProd.stock}
                    onChange={(e) => setNewProd({ ...newProd, stock: Number(e.target.value) })}
                    className="w-full bg-ivory-100 border border-champagne-300 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={newProd.originalPrice}
                    onChange={(e) => setNewProd({ ...newProd, originalPrice: Number(e.target.value) })}
                    className="w-full bg-ivory-100 border border-champagne-300 rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Discount Price (₹)</label>
                  <input
                    type="number"
                    value={newProd.discountPrice}
                    onChange={(e) => setNewProd({ ...newProd, discountPrice: Number(e.target.value) })}
                    className="w-full bg-ivory-100 border border-champagne-300 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={newProd.images[0]}
                  onChange={(e) => setNewProd({ ...newProd, images: [e.target.value] })}
                  className="w-full bg-ivory-100 border border-champagne-300 rounded-xl p-2.5"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-espresso-900 text-white rounded-xl font-bold font-serif"
                >
                  Create Creation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

