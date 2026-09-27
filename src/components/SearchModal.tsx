import React, { useState } from 'react';
import { Product } from '../types';
import { Search, X, ArrowRight, Tag, ArrowLeft } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        p =>
          p.titleBn.toLowerCase().includes(query.toLowerCase()) ||
          p.titleEn.toLowerCase().includes(query.toLowerCase()) ||
          p.fabric.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryNameBn.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularTags = [
    'জামদানি শাড়ি',
    'সুতি তাঁত',
    'প্রিমিয়াম পাঞ্জাবি',
    'আনস্টিচড থ্রি-পিস',
    'পাইকারি লট',
    'বাবুরহাট স্পেশাল'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar with Back button */}
        <div className="p-3.5 sm:p-5 border-b border-stone-200 flex items-center gap-2.5 bg-[#FAF9F5]">
          <button
            onClick={onClose}
            className="flex items-center gap-1 text-xs font-bold text-stone-600 hover:text-amber-800 bg-stone-100 hover:bg-stone-200 px-2 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
            title="ফিরে যান"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">← ব্যাক</span>
          </button>

          <Search className="w-4.5 h-4.5 text-amber-700 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="জামদানি শাড়ি, সুতি থ্রি-পিস বা পাঞ্জাবি খুঁজুন..."
            className="w-full bg-transparent text-xs sm:text-base text-stone-900 placeholder:text-stone-400 focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center text-stone-600 transition-colors shrink-0 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                জনপ্রিয় অনুসন্ধান (Popular Searches)
              </span>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-amber-100 hover:text-amber-900 text-stone-700 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Tag className="w-3 h-3 text-stone-400" />
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8 text-stone-500 text-xs">
              <p className="text-sm font-semibold text-stone-800">কোনো ফলাফল পাওয়া যায়নি</p>
              <p className="mt-1">অন্য কোনো শব্দ যেমন: "জামদানি", "পাঞ্জাবি" অথবা "সুতি" লিখে চেষ্টা করুন।</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              <div className="text-xs text-stone-500 pb-2">
                {filtered.length} টি পোশাকের ফলাফল পাওয়া গেছে
              </div>
              {filtered.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    onSelectProduct(prod);
                    onClose();
                  }}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-stone-50 rounded-lg px-2 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.image}
                      alt={prod.titleBn}
                      className="w-12 h-12 rounded-lg object-cover border border-stone-200 shrink-0"
                    />
                    <div>
                      <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">
                        {prod.titleBn}
                      </h4>
                      <div className="text-[11px] text-stone-500">
                        {prod.categoryNameBn} · {prod.fabric}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="text-xs font-bold text-stone-900 tabular-nums">
                        ৳{prod.retailPrice.toLocaleString('bn-BD')}
                      </div>
                      <div className="text-[10px] text-amber-800">
                        লট: ৳{prod.wholesalePrice}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
