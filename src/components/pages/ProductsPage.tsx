import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../../types';
import { ProductCard } from '../ProductCard';
import { Search, Filter, PackageOpen, ArrowDownUp, Layers, Sparkles, X, Star } from 'lucide-react';

interface ProductsPageProps {
  products: Product[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, isWholesale: boolean) => void;
  onDirectOrder: (product: Product, isWholesale: boolean) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  onQuickView,
  onAddToCart,
  onDirectOrder,
  wishlistIds,
  onToggleWishlist
}) => {
  const [wholesaleMode, setWholesaleMode] = useState<boolean>(activeCategory === 'wholesale');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [ratingFilter, setRatingFilter] = useState<'all' | '4.8' | '4.5' | '4.0'>('all');

  // Sync category with wholesale mode
  const handleCategoryChange = (cat: string) => {
    onSelectCategory(cat);
    if (cat === 'wholesale') {
      setWholesaleMode(true);
    }
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (activeCategory === 'wholesale') {
        // Wholesale allows all products
      } else if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }

      // In-stock filter
      if (onlyInStock && product.stock <= 0) {
        return false;
      }

      // Rating filter
      if (ratingFilter !== 'all' && product.rating < parseFloat(ratingFilter)) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = product.titleBn.toLowerCase().includes(query) || product.titleEn.toLowerCase().includes(query);
        const matchFabric = product.fabric.toLowerCase().includes(query);
        const matchCat = product.categoryNameBn.toLowerCase().includes(query);
        return matchTitle || matchFabric || matchCat;
      }

      return true;
    }).sort((a, b) => {
      // Default sort preserves custom order and puts pinned products at the very top!
      if (sortBy === 'default') {
        const pinA = a.isPinned ? 1 : 0;
        const pinB = b.isPinned ? 1 : 0;
        if (pinA !== pinB) return pinB - pinA;
        return 0;
      }

      const priceA = wholesaleMode ? a.wholesalePrice : a.retailPrice;
      const priceB = wholesaleMode ? b.wholesalePrice : b.retailPrice;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0;
    });
  }, [products, activeCategory, wholesaleMode, onlyInStock, searchQuery, sortBy]);

  const categories: { id: ProductCategory | 'all'; label: string; count: number }[] = [
    { id: 'all', label: 'সকল পোশাক', count: products.length },
    { id: 'jamdani-saree', label: 'জামদানি ও সুতি শাড়ি', count: products.filter(p => p.category === 'jamdani-saree').length },
    { id: 'three-piece', label: 'থ্রি-পিস ও আনস্টিচড', count: products.filter(p => p.category === 'three-piece').length },
    { id: 'panjabi', label: 'পাঞ্জাবি ও কটন শার্ট', count: products.filter(p => p.category === 'panjabi').length },
    { id: 'wholesale', label: 'পাইকারি লট / বাল্ক', count: products.length }
  ];

  return (
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
      
      {/* Clean Top Bar: Pure Products Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold text-stone-900">
              পোশাক কালেকশন
            </h1>
            <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
              {filteredProducts.length} টি পোশাক
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            খাঁটি সুতি, জামদানি, থ্রি-পিস ও পাঞ্জাবির সরাসরি স্টক কালেকশন
          </p>
        </div>

        {/* Wholesale Switch & Search */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Wholesale Mode Toggle */}
          <button
            onClick={() => setWholesaleMode(!wholesaleMode)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer border ${
              wholesaleMode
                ? 'bg-amber-800 text-amber-100 border-amber-900 ring-2 ring-amber-600/30'
                : 'bg-white text-stone-700 border-stone-300 hover:border-amber-600 hover:text-amber-800'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>{wholesaleMode ? '✓ পাইকারি মোড চালু' : 'পাইকারি রেট দেখুন'}</span>
          </button>

          {/* Quick Search Input */}
          <div className="relative min-w-[200px] flex-1 sm:flex-initial">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="পোশাকের নাম দিয়ে খুঁজুন..."
              className="w-full pl-9 pr-8 py-2 bg-white text-xs border border-stone-300 rounded-xl focus:outline-none focus:border-amber-600 text-stone-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Pills & Sorting Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-300'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-amber-600 text-stone-950 font-bold' : 'bg-stone-100 text-stone-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filters & Sorting */}
        <div className="flex items-center gap-2.5 self-end lg:self-auto text-xs">
          {/* In Stock Only Checkbox */}
          <label className="flex items-center gap-1.5 text-stone-700 font-medium cursor-pointer bg-white px-2.5 py-2 rounded-xl border border-stone-200">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
              className="rounded text-amber-700 focus:ring-amber-500"
            />
            <span>শুধুমাত্র স্টকে আছে</span>
          </label>

          {/* Rating Filter Dropdown */}
          <div className="flex items-center gap-1.5 bg-white px-2.5 py-2 rounded-xl border border-stone-200 text-stone-700">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value as any)}
              className="bg-transparent font-medium focus:outline-none cursor-pointer text-stone-800"
            >
              <option value="all">রেটিং: সব রেটিং</option>
              <option value="4.8">৪.৮★ ও ওপরে</option>
              <option value="4.5">৪.৫★ ও ওপরে</option>
              <option value="4.0">৪.০★ ও ওপরে</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-white px-2.5 py-2 rounded-xl border border-stone-200 text-stone-700">
            <ArrowDownUp className="w-3.5 h-3.5 text-stone-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent font-medium focus:outline-none cursor-pointer text-stone-800"
            >
              <option value="default">সাজান: শীর্ষে পিনকৃত ও ক্রমানুসারে</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
              <option value="rating">গ্রাহক রেটিং</option>
              <option value="newest">নতুন আগমন</option>
            </select>
          </div>
        </div>
      </div>

      {/* Wholesale Banner Indicator (if in wholesale mode) */}
      {wholesaleMode && (
        <div className="mb-6 p-3.5 bg-amber-500/10 border border-amber-600/30 rounded-xl flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2 font-medium">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
            <span>পাইকারি লট রেট সক্রিয়: প্রতিটি পোশাকের পাইকারি মূল্য ও নুন্যতম লট কোয়ান্টিটি প্রদর্শিত হচ্ছে।</span>
          </div>
          <button
            onClick={() => setWholesaleMode(false)}
            className="text-xs font-bold text-amber-800 underline hover:text-amber-950 cursor-pointer whitespace-nowrap ml-2"
          >
            খুচরা মূল্যে ফিরুন
          </button>
        </div>
      )}

      {/* Active Filter Pills (Reset button if filter applied) */}
      {(activeCategory !== 'all' || searchQuery || onlyInStock || sortBy !== 'default') && (
        <div className="mb-4 flex items-center gap-2 text-xs">
          <span className="text-stone-500">ফিল্টার সক্রিয়:</span>
          <button
            onClick={() => {
              onSelectCategory('all');
              setSearchQuery('');
              setOnlyInStock(false);
              setSortBy('default');
            }}
            className="text-amber-800 hover:text-amber-950 underline font-semibold cursor-pointer"
          >
            সকল ফিল্টার মুছুন (Reset All)
          </button>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wholesaleModeActive={wholesaleMode}
              onQuickView={() => onQuickView(product)}
              onAddToCart={(prod, isWs) => onAddToCart(prod, isWs)}
              onDirectOrder={(prod, isWs) => onDirectOrder(prod, isWs)}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={() => onToggleWishlist(product)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
          <div className="w-14 h-14 mx-auto bg-stone-100 rounded-full flex items-center justify-center text-stone-400">
            <PackageOpen className="w-7 h-7" />
          </div>
          <h3 className="font-serif-brand text-lg font-bold text-stone-800">
            কোনো পোশাক পাওয়া যায়নি
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            আপনার পছন্দের ক্যাটাগরি বা সার্চ শব্দের সাথে কোনো পোশাক মিলছে না। ফিল্টার রিসেট করে আবার চেষ্টা করুন।
          </p>
          <button
            onClick={() => {
              onSelectCategory('all');
              setSearchQuery('');
              setOnlyInStock(false);
            }}
            className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
          >
            সকল পোশাক দেখুন
          </button>
        </div>
      )}

    </div>
  );
};
