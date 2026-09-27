import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  Sparkles, 
  Users, 
  Star, 
  Settings, 
  Store, 
  LogOut, 
  Menu, 
  X,
  Bell,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';
import { Order, Product, Customer, GoogleReview, StoreSettings, OrderStatus } from '../../types';
import { AdminDashboard } from './AdminDashboard';
import { AdminOrders } from './AdminOrders';
import { AdminProducts } from './AdminProducts';
import { AdminCustomers } from './AdminCustomers';
import { AdminReviews } from './AdminReviews';
import { AdminSettings } from './AdminSettings';
import { InvoiceModal } from './InvoiceModal';

interface AdminLayoutProps {
  orders: Order[];
  products: Product[];
  customers: Customer[];
  reviews: GoogleReview[];
  settings: StoreSettings;
  onExitAdmin: () => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onBookCourier: (orderId: string, provider: 'Steadfast' | 'Pathao') => void;
  onAddProduct: (product: Product) => void;
  onUpdateStock: (productId: string, newStock: number) => void;
  onDeleteProduct: (productId: string) => void;
  onMoveToTop: (productId: string) => void;
  onTogglePin: (productId: string) => void;
  onMoveOrder: (productId: string, direction: 'up' | 'down') => void;
  onUpdateProduct?: (product: Product) => void;
  onToggleReviewApprove: (id: string) => void;
  onAddReviewReply: (id: string, reply: string) => void;
  onDeleteReview: (id: string) => void;
  onAddCustomReview: (review: GoogleReview) => void;
  onUpdateSettings: (newSettings: StoreSettings) => void;
  onDeleteOrder?: (orderId: string) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  orders,
  products,
  customers,
  reviews,
  settings,
  onExitAdmin,
  onUpdateOrderStatus,
  onBookCourier,
  onAddProduct,
  onUpdateStock,
  onDeleteProduct,
  onMoveToTop,
  onTogglePin,
  onMoveOrder,
  onUpdateProduct,
  onToggleReviewApprove,
  onAddReviewReply,
  onDeleteReview,
  onAddCustomReview,
  onUpdateSettings,
  onDeleteOrder
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'customers' | 'reviews' | 'settings'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;

  const navItems = [
    { id: 'dashboard', label: '📊 Dashboard (ড্যাশবোর্ড)', icon: BarChart3, badge: null },
    { id: 'orders', label: '📦 Orders (অর্ডারসমূহ)', icon: Package, badge: pendingOrdersCount > 0 ? pendingOrdersCount : null },
    { id: 'products', label: '👗 Products & Categories', icon: Sparkles, badge: products.length },
    { id: 'customers', label: '👥 Customers (কাস্টমার)', icon: Users, badge: customers.length },
    { id: 'reviews', label: '⭐ Google Reviews & Ratings', icon: Star, badge: reviews.filter(r => !r.isApproved).length > 0 ? 'নতুন' : null },
    { id: 'settings', label: '⚙️ Settings (সেটিংস)', icon: Settings, badge: null },
  ];

  return (
    <div className="min-h-screen bg-[#F5F4F0] flex">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex w-72 bg-[#1C1917] text-stone-200 flex-col shrink-0 border-r border-stone-800">
        
        {/* Brand Area */}
        <div className="p-6 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl overflow-hidden border border-amber-600/80 bg-stone-900 shadow-md flex items-center justify-center shrink-0">
              <img 
                src={settings.logoUrl || "/logo.jpg"} 
                alt="Narsingdi Fashion Logo" 
                className="w-full h-full object-cover object-center" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="font-serif-brand text-lg font-bold text-white tracking-tight leading-tight">
                NARSINGDI FASHION
              </div>
              <div className="text-[10px] text-amber-400 uppercase tracking-widest font-semibold mt-0.5">
                অ্যাডমিন কন্ট্রোল সেন্টার
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-600 text-stone-950 font-bold shadow-xs'
                    : 'text-stone-300 hover:bg-stone-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-stone-950 text-amber-300 font-bold' : 'bg-stone-800 text-amber-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Storefront Exit */}
        <div className="p-4 border-t border-stone-800 space-y-2">
          <div className="flex items-center gap-2 px-2.5 py-1.5 text-[10.5px] text-emerald-400 bg-emerald-950/50 rounded-lg border border-emerald-800/50">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono truncate">Firebase Cloud: Live Sync</span>
          </div>
          <button
            onClick={onExitAdmin}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-amber-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Store className="w-4 h-4" />
            <span>শোরুমে ফিরে যান (Live Store)</span>
          </button>
        </div>

      </aside>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex">
          <div className="w-72 bg-[#1C1917] text-stone-200 flex flex-col h-full p-4">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg overflow-hidden border border-amber-600 bg-stone-900 shrink-0">
                  <img src={settings.logoUrl || "/logo.jpg"} alt="Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <span className="font-serif-brand font-bold text-white text-sm">NARSINGDI FASHION</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-stone-400 cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold ${
                    activeTab === item.id ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge !== null && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-stone-800 text-amber-400 font-mono">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
            <button
              onClick={onExitAdmin}
              className="mt-auto py-3 px-3 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-white" />
              <span>← শোরুমে ফিরে যান (Back to Store)</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-stone-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 text-stone-700 hover:bg-stone-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="text-xs font-semibold text-stone-600 hidden sm:block">
              নরসিংদী তাঁত ও পাইকারি মার্কেট ম্যানেজমেন্ট
            </div>
          </div>

          <div className="flex items-center gap-3">
            {pendingOrdersCount > 0 && (
              <button
                onClick={() => setActiveTab('orders')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-300 rounded-lg text-xs text-amber-900 font-semibold"
              >
                <Bell className="w-3.5 h-3.5 text-amber-700 animate-bounce" />
                <span>{pendingOrdersCount} টি নতুন অর্ডার</span>
              </button>
            )}

            <button
              onClick={onExitAdmin}
              className="px-3 py-1.5 bg-stone-900 hover:bg-amber-700 text-amber-300 hover:text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs border border-amber-500/30"
              title="গ্রাহক শোরুমে ফিরে যান (Back to Store)"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>শোরুমে ফিরে যান</span>
            </button>
          </div>
        </header>

        {/* Mobile Horizontal Sub-Navigation for Instant Tab Switching */}
        <div className="lg:hidden bg-[#1C1917] text-stone-200 px-3 py-2 flex items-center gap-1.5 overflow-x-auto border-b border-stone-800 no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`px-2.5 py-1.5 rounded-md text-[11px] font-semibold whitespace-nowrap flex items-center gap-1 cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-amber-600 text-stone-950 font-bold shadow-xs'
                    : 'text-stone-300 bg-stone-800/70 hover:bg-stone-800'
                }`}
              >
                <span>{item.label.replace(/\(.*?\)/, '').trim()}</span>
                {item.badge !== null && (
                  <span className={`text-[9.5px] px-1 py-0.1 rounded-full font-mono ${
                    isActive ? 'bg-stone-950 text-amber-300 font-bold' : 'bg-stone-900 text-amber-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Page Content Body */}
        <main className="p-4 sm:p-8 flex-1 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <AdminDashboard
              orders={orders}
              products={products}
              customers={customers}
              onNavigateTab={(tab) => setActiveTab(tab as any)}
              onViewInvoice={(ord) => setSelectedInvoiceOrder(ord)}
            />
          )}

          {activeTab === 'orders' && (
            <AdminOrders
              orders={orders}
              onUpdateOrderStatus={onUpdateOrderStatus}
              onBookCourier={onBookCourier}
              onViewInvoice={(ord) => setSelectedInvoiceOrder(ord)}
              onDeleteOrder={onDeleteOrder}
              autoRemoveDelivered={settings.autoRemoveDeliveredOrders ?? true}
              onToggleAutoRemove={(val) => onUpdateSettings({ ...settings, autoRemoveDeliveredOrders: val })}
            />
          )}

          {activeTab === 'products' && (
            <AdminProducts
              products={products}
              onAddProduct={onAddProduct}
              onUpdateStock={onUpdateStock}
              onDeleteProduct={onDeleteProduct}
              onMoveToTop={onMoveToTop}
              onTogglePin={onTogglePin}
              onMoveOrder={onMoveOrder}
              onUpdateProduct={onUpdateProduct}
            />
          )}

          {activeTab === 'customers' && (
            <AdminCustomers
              customers={customers}
              orders={orders}
            />
          )}

          {activeTab === 'reviews' && (
            <AdminReviews
              reviews={reviews}
              onToggleApprove={onToggleReviewApprove}
              onAddReply={onAddReviewReply}
              onDeleteReview={onDeleteReview}
              onAddCustomReview={onAddCustomReview}
            />
          )}

          {activeTab === 'settings' && (
            <AdminSettings
              settings={settings}
              onUpdateSettings={onUpdateSettings}
            />
          )}
        </main>

      </div>

      {/* Invoice Modal */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          order={selectedInvoiceOrder}
          settings={settings}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}

    </div>
  );
};
