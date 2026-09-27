import React from 'react';
import { Home, Shirt, Heart, ShoppingBag, BookOpen, Star } from 'lucide-react';
import { AppPage } from './Header';

interface MobileBottomNavProps {
  activePage: AppPage;
  onNavigatePage: (page: AppPage) => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  cartCount: number;
  wishlistCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activePage,
  onNavigatePage,
  onOpenWishlist,
  onOpenCart,
  cartCount,
  wishlistCount
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF9F5]/98 backdrop-blur-md border-t border-stone-200 px-1 py-1.5 shadow-lg safe-area-bottom">
      <div className="flex items-center justify-around">
        
        {/* 1. Home */}
        <button
          onClick={() => {
            onNavigatePage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors cursor-pointer ${
            activePage === 'home' ? 'text-amber-800 font-bold' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Home className="w-4.5 h-4.5 mb-0.5" />
          <span className="text-[10px] leading-tight">হোম</span>
        </button>

        {/* 2. Products / Collection (শুধুমাত্র পোশাক) */}
        <button
          onClick={() => {
            onNavigatePage('products');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors cursor-pointer ${
            activePage === 'products' ? 'text-amber-800 font-bold' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Shirt className="w-4.5 h-4.5 mb-0.5" />
          <span className="text-[10px] leading-tight">পোশাক</span>
        </button>

        {/* 3. Heritage / Story (ঐতিহ্য ও ইতিহাস) */}
        <button
          onClick={() => {
            onNavigatePage('heritage');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors cursor-pointer ${
            activePage === 'heritage' ? 'text-amber-800 font-bold' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <BookOpen className="w-4.5 h-4.5 mb-0.5" />
          <span className="text-[10px] leading-tight">ঐতিহ্য</span>
        </button>

        {/* 4. Customer Reviews (রিভিউ) */}
        <button
          onClick={() => {
            onNavigatePage('reviews');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors cursor-pointer ${
            activePage === 'reviews' ? 'text-amber-800 font-bold' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Star className="w-4.5 h-4.5 mb-0.5" />
          <span className="text-[10px] leading-tight">রিভিউ</span>
        </button>

        {/* 5. Cart (শপিং ব্যাগ) */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center justify-center py-1 px-2 rounded-lg text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-4.5 h-4.5 mb-0.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-amber-700 text-white rounded-full text-[9px] w-3.5 h-3.5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] leading-tight">ব্যাগ</span>
        </button>

      </div>
    </div>
  );
};
