import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product, isWholesale: boolean) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl border-l border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Back button */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF9F5]">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="flex items-center gap-1 text-xs font-bold text-stone-600 hover:text-amber-800 bg-stone-100 hover:bg-stone-200 px-2 py-1.5 rounded-lg transition-colors cursor-pointer"
              title="ফিরে যান"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-700" />
              <span>← ব্যাক</span>
            </button>
            <div className="flex items-center gap-1.5">
              <Heart className="w-4.5 h-4.5 text-rose-600 fill-rose-600" />
              <h2 className="font-serif-brand text-lg font-bold text-stone-900">
                পছন্দের তালিকা ({wishlistProducts.length})
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-3">
                <Heart className="w-8 h-8" />
              </div>
              <p className="text-base font-semibold text-stone-800">উইশলিস্টে কোনো পণ্য নেই</p>
              <p className="text-xs text-stone-500 mt-1 max-w-xs">
                পছন্দের কাপড়ের হার্ট আইকনে ক্লিক করে সংরক্ষণ করুন।
              </p>
            </div>
          ) : (
            wishlistProducts.map((prod) => (
              <div 
                key={prod.id}
                className="flex gap-3 p-3 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors"
              >
                <img
                  src={prod.image}
                  alt={prod.titleBn}
                  className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-lg shrink-0 border border-stone-200"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-semibold text-stone-900 line-clamp-2 leading-snug">
                        {prod.titleBn}
                      </h4>
                      <button
                        onClick={() => onRemoveFromWishlist(prod)}
                        className="text-stone-400 hover:text-rose-600 p-1"
                        title="মুছুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-stone-500 mt-0.5">
                      {prod.categoryNameBn} · ৳{prod.retailPrice.toLocaleString('bn-BD')}
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-stone-200/60 flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900 tabular-nums">
                      ৳{prod.retailPrice.toLocaleString('bn-BD')}
                    </span>

                    <button
                      onClick={() => {
                        onAddToCart(prod, false);
                        onRemoveFromWishlist(prod);
                      }}
                      className="px-3 py-1 bg-stone-900 hover:bg-amber-700 text-white text-[11px] font-semibold rounded-md flex items-center gap-1 transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>ব্যাগে নিন</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
