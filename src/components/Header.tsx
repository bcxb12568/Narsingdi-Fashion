import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Store, 
  Truck, 
  Menu, 
  X,
  Lock,
  Layers,
  Sparkles,
  MessageSquareQuote,
  BookOpen
} from 'lucide-react';
import { StoreSettings } from '../types';

export type AppPage = 'home' | 'products' | 'heritage' | 'reviews';

interface HeaderProps {
  settings: StoreSettings;
  activePage: AppPage;
  onNavigatePage: (page: AppPage) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenTrackOrder: () => void;
  onOpenSearch: () => void;
  onSelectCategory: (cat: string) => void;
  currentView: 'store' | 'admin';
  onExitAdmin: () => void;
  onOpenAdminLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  activePage,
  onNavigatePage,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenTrackOrder,
  onOpenSearch,
  onSelectCategory,
  currentView,
  onExitAdmin,
  onOpenAdminLogin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-stone-200">
      {/* Main Header Bar: Slim & Compact (চিকন ও স্লিম) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-13 sm:h-15 flex items-center justify-between">
        
        {/* Zone 1: Compact Brand Wordmark with Golden Frame */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button 
            onClick={() => {
              if (currentView === 'admin') onExitAdmin();
              onNavigatePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 sm:gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-8 h-8 sm:w-9.5 sm:h-9.5 rounded-lg overflow-hidden border border-amber-600/80 bg-stone-900 shadow-2xs group-hover:border-amber-500 transition-colors shrink-0">
              <img 
                src={settings.logoUrl || "/logo.jpg"} 
                alt={`${settings.storeName || 'Narsingdi Fashion'} Logo`} 
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0">
              <span className="font-serif-brand text-xs sm:text-base font-bold tracking-tight text-stone-900 leading-tight block truncate">
                NARSINGDI FASHION
              </span>
              <p className="hidden md:block text-[9.5px] text-amber-800/80 font-medium tracking-wide leading-none mt-0.5">
                ঐতিহ্যবাহী তাঁত ও আধুনিক ফ্যাশন
              </p>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (পৃষ্ঠাভিত্তিক পরিষ্কার মেনু) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium text-stone-700">
          <button 
            onClick={() => {
              if (currentView === 'admin') onExitAdmin();
              onNavigatePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`transition-colors cursor-pointer ${
              activePage === 'home' && currentView !== 'admin'
                ? 'text-amber-800 font-bold'
                : 'hover:text-amber-700'
            }`}
          >
            হোম
          </button>

          <button 
            onClick={() => {
              if (currentView === 'admin') onExitAdmin();
              onNavigatePage('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`transition-colors cursor-pointer ${
              activePage === 'products' && currentView !== 'admin'
                ? 'text-amber-800 font-bold border-b-2 border-amber-700 pb-0.5'
                : 'hover:text-amber-700'
            }`}
          >
            পোশাক কালেকশন
          </button>

          <button 
            onClick={() => {
              if (currentView === 'admin') onExitAdmin();
              onNavigatePage('products');
              onSelectCategory('wholesale');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-amber-800 font-semibold hover:text-amber-900 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-amber-700" />
            <span>পাইকারি লট</span>
            <span className="text-[9px] bg-amber-100 text-amber-900 px-1 py-0.2 rounded font-mono">লট/বাল্ক</span>
          </button>

          <button 
            onClick={() => {
              if (currentView === 'admin') onExitAdmin();
              onNavigatePage('heritage');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`transition-colors cursor-pointer ${
              activePage === 'heritage' && currentView !== 'admin'
                ? 'text-amber-800 font-bold border-b-2 border-amber-700 pb-0.5'
                : 'hover:text-amber-700'
            }`}
          >
            ঐতিহ্য ও পরিচিতি
          </button>

          <button 
            onClick={() => {
              if (currentView === 'admin') onExitAdmin();
              onNavigatePage('reviews');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`transition-colors cursor-pointer ${
              activePage === 'reviews' && currentView !== 'admin'
                ? 'text-amber-800 font-bold border-b-2 border-amber-700 pb-0.5'
                : 'hover:text-amber-700'
            }`}
          >
            গ্রাহক রিভিউ
          </button>
        </nav>

        {/* Zone 3: Actions (Search, Wishlist, Cart & Admin Switch if logged in) */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search Button */}
          <button 
            onClick={onOpenSearch}
            className="p-1.5 sm:p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
            title="খুঁজুন (Search)"
            aria-label="Search"
          >
            <Search className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
          </button>

          {/* Wishlist Button */}
          <button 
            onClick={onOpenWishlist}
            className="relative p-1.5 sm:p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
            title="উইশলিস্ট (Wishlist)"
            aria-label="Wishlist"
          >
            <Heart className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button 
            onClick={onOpenCart}
            className="relative p-1.5 sm:p-2 text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
            title="শপিং ব্যাগ (Cart)"
            aria-label="Cart"
          >
            <ShoppingBag className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-amber-700 text-white text-[10px] font-bold flex items-center justify-center shadow-2xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* If currently in Admin view, show button to return to store */}
          {currentView === 'admin' && (
            <button
              onClick={onExitAdmin}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 text-xs font-bold rounded-md transition-all shadow-xs cursor-pointer bg-amber-700 text-white hover:bg-amber-800"
              title="গ্রাহক শোরুমে ফিরুন"
            >
              <Store className="w-3.5 h-3.5 text-amber-200 shrink-0" />
              <span>← শোরুম</span>
            </button>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-stone-700 hover:bg-stone-100 rounded-md cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#FAF9F5] px-4 pt-3 pb-5 space-y-3">
          <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-amber-600 bg-stone-900 shrink-0 shadow-2xs">
              <img src={settings.logoUrl || "/logo.jpg"} alt="Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <div className="font-serif-brand text-xs font-bold text-stone-900 leading-tight">NARSINGDI FASHION</div>
              <div className="text-[10px] text-amber-800">ঐতিহ্যবাহী তাঁত ও আধুনিক ফ্যাশন</div>
            </div>
          </div>

          <div className="space-y-1 text-sm font-medium text-stone-800">
            <button
              onClick={() => {
                if (currentView === 'admin') onExitAdmin();
                onNavigatePage('home');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`block w-full text-left py-2.5 px-3 rounded-lg ${
                activePage === 'home' && currentView !== 'admin' ? 'bg-amber-100 text-amber-900 font-bold' : 'hover:bg-stone-100'
              }`}
            >
              হোম (Home)
            </button>

            <button
              onClick={() => {
                if (currentView === 'admin') onExitAdmin();
                onNavigatePage('products');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`block w-full text-left py-2.5 px-3 rounded-lg ${
                activePage === 'products' && currentView !== 'admin' ? 'bg-amber-100 text-amber-900 font-bold' : 'hover:bg-stone-100'
              }`}
            >
              🛍️ শুধুমাত্র পোশাক কালেকশন (Shop)
            </button>

            <button
              onClick={() => {
                if (currentView === 'admin') onExitAdmin();
                onNavigatePage('products');
                onSelectCategory('wholesale');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="block w-full text-left py-2.5 px-3 rounded-lg bg-amber-50 text-amber-900 font-semibold flex items-center justify-between"
            >
              <span>📦 পাইকারি লট ও বাল্ক অর্ডার</span>
              <span className="text-[10px] bg-amber-200 text-amber-950 px-1.5 py-0.5 rounded font-mono">লট রেট</span>
            </button>

            <button
              onClick={() => {
                if (currentView === 'admin') onExitAdmin();
                onNavigatePage('heritage');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`block w-full text-left py-2.5 px-3 rounded-lg ${
                activePage === 'heritage' && currentView !== 'admin' ? 'bg-amber-100 text-amber-900 font-bold' : 'hover:bg-stone-100'
              }`}
            >
              📜 নরসিংদীর ঐতিহ্য ও পরিচিতি
            </button>

            <button
              onClick={() => {
                if (currentView === 'admin') onExitAdmin();
                onNavigatePage('reviews');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`block w-full text-left py-2.5 px-3 rounded-lg ${
                activePage === 'reviews' && currentView !== 'admin' ? 'bg-amber-100 text-amber-900 font-bold' : 'hover:bg-stone-100'
              }`}
            >
              ⭐ গ্রাহক রিভিউ ও মতামত
            </button>

            <button
              onClick={() => {
                onOpenTrackOrder();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2.5 px-3 rounded-lg hover:bg-stone-100 text-stone-700 flex items-center gap-2"
            >
              <Truck className="w-4 h-4 text-amber-700" />
              <span>অর্ডার ট্র্যাকিং (Track Order)</span>
            </button>
          </div>

          {/* Discreet Admin Login at the bottom of mobile menu */}
          <div className="pt-3 border-t border-stone-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminLogin();
              }}
              className="w-full py-2 px-3 text-[11px] text-stone-500 hover:text-stone-800 flex items-center justify-center gap-1.5 rounded-md hover:bg-stone-100 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-stone-400" />
              <span>স্টাফ / গোপন অ্যাডমিন লগইন</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
