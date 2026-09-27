import React, { useState } from 'react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { Search, Sparkles, Filter, PackageOpen, ArrowLeft } from 'lucide-react';

interface ProductShowcaseProps {
  products: Product[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, isWholesale: boolean) => void;
  onDirectOrder: (product: Product, isWholesale: boolean) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  onQuickView,
  onAddToCart,
  onDirectOrder,
  wishlistIds,
  onToggleWishlist
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [wholesaleMode, setWholesaleMode] = useState(false);

  const categories: { id: string; label: string; countSuffix?: string }[] = [
    { id: 'all', label: 'সব পোশাক (All)' },
    { id: 'jamdani-saree', label: 'জামদানি ও সুতি শাড়ি' },
    { id: 'three-piece', label: 'প্রিমিয়াম থ্রি-পিস ও আনস্টিচড' },
    { id: 'panjabi', label: 'পুরুষদের পাঞ্জাবি ও শার্ট' },
    { id: 'wholesale', label: 'পাইকারি লট/বাল্ক অর্ডার' },
  ];

  const filteredProducts = products.filter(p => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      p.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  }).sort((a, b) => {
    const pinA = a.isPinned ? 1 : 0;
    const pinB = b.isPinned ? 1 : 0;
    if (pinA !== pinB) return pinB - pinA;
    return 0;
  });

  return (
    <section id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
            <Sparkles className="w-4 h-4" />
            <span>আমাদের এক্সক্লুসিভ কালেকশন</span>
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            নরসিংদীর সেরা তাঁত ও পোশাক সম্ভার
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-xl">
            তাজা নরসিংদীর তাঁত থেকে সরাসরি সংগ্রহ। খুচরা ও পাইকারি উভয় অর্ডার গ্রহণ করা হয়।
          </p>
        </div>

        {/* Wholesale Switch Banner */}
        <div className="flex items-center gap-3 bg-amber-50/90 border border-amber-300/80 p-2.5 rounded-xl">
          <PackageOpen className="w-5 h-5 text-amber-800" />
          <div className="text-left">
            <div className="text-xs font-bold text-amber-950">পাইকারি/রিসেলার মূল্য প্রদর্শন</div>
            <div className="text-[11px] text-amber-800">দোকানদার ও বুটিক ব্যবসায়ীদের জন্য বিশেষ রেট</div>
          </div>
          <button
            onClick={() => setWholesaleMode(!wholesaleMode)}
            className={`ml-2 relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
              wholesaleMode ? 'bg-amber-600' : 'bg-stone-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                wholesaleMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Interactive Segmented Filter Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-stone-900 text-white shadow-xs font-semibold' 
                    : 'text-stone-700 bg-white border border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="পোশাক বা কাপড় খুঁজুন..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-stone-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Showing count indicator and Back button if filtered */}
      <div className="mt-4 flex items-center justify-between text-xs text-stone-600">
        <div className="flex items-center gap-2">
          {(activeCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                onSelectCategory('all');
                setSearchQuery('');
              }}
              className="flex items-center gap-1 font-bold text-amber-800 hover:text-amber-900 bg-amber-100/70 hover:bg-amber-100 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-700" />
              <span>← সব পোশাকে ফিরুন (Back to All)</span>
            </button>
          )}
          <span>মোট {filteredProducts.length} টি পোশাক প্রদর্শিত হচ্ছে</span>
        </div>
        {wholesaleMode && (
          <span className="text-amber-800 font-medium">⚡ পাইকারি মোড সক্রিয়: পাইকারি দাম প্রদর্শিত হচ্ছে</span>
        )}
      </div>

      {/* Product Grid: 2 columns on mobile, 3 or 4 on desktop */}
      {filteredProducts.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              onDirectOrder={onDirectOrder}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              wholesaleModeActive={wholesaleMode}
            />
          ))}
        </div>
      ) : (
        <div className="mt-12 py-16 text-center bg-white rounded-2xl border border-dashed border-stone-300">
          <Filter className="w-10 h-10 text-stone-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-stone-900">কোনো পণ্য খুঁজে পাওয়া যায়নি</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            আপনার সার্চ ফিল্টার পরিবর্তন করুন অথবা সব পণ্য দেখতে বোতামে চাপুন।
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              onSelectCategory('all');
            }}
            className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-medium rounded-lg hover:bg-stone-800"
          >
            সব কালেকশন রিসেট করুন
          </button>
        </div>
      )}

    </section>
  );
};
