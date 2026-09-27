import React from 'react';
import { ShoppingBag, Eye, Heart, Check, Zap, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, isWholesale: boolean) => void;
  onDirectOrder: (product: Product, isWholesale: boolean) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  wholesaleModeActive?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  onDirectOrder,
  isWishlisted,
  onToggleWishlist,
  wholesaleModeActive = false
}) => {
  const isWholesale = wholesaleModeActive || product.category === 'wholesale';
  const displayPrice = isWholesale ? product.wholesalePrice : product.retailPrice;

  return (
    <div className="group flex flex-col bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-2xs hover:shadow-md hover:border-amber-300 transition-all duration-200">
      
      {/* Product Image Slot */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.image}
          alt={product.titleBn}
          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Quiet editorial text kicker on corner instead of loud pill sandwiches */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 items-start">
          {product.isPinned && (
            <span className="text-[9.5px] sm:text-[10.5px] font-bold text-amber-950 bg-amber-300/95 backdrop-blur-xs px-1.5 sm:px-2 py-0.5 rounded-sm border border-amber-500/80 shadow-2xs flex items-center gap-1">
              <span>📌</span>
              <span>শীর্ষে</span>
            </span>
          )}
          {product.isNew && (
            <span className="text-[9.5px] sm:text-[11px] font-semibold text-amber-900 bg-amber-50/95 backdrop-blur-xs px-1.5 sm:px-2 py-0.5 rounded-sm border border-amber-200/80 shadow-2xs">
              নতুন
            </span>
          )}
          {product.category === 'wholesale' && (
            <span className="text-[9.5px] sm:text-[11px] font-semibold text-emerald-950 bg-emerald-50/95 backdrop-blur-xs px-1.5 sm:px-2 py-0.5 rounded-sm border border-emerald-200/80 shadow-2xs">
              পাইকারি
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-700 hover:text-rose-600 transition-colors shadow-2xs"
          title="উইশলিস্টে রাখুন"
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
        </button>

        {/* Quick View Overlay Hover Action */}
        <div className="absolute inset-x-0 bottom-2.5 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-1.5 px-3 bg-stone-900/90 hover:bg-stone-900 text-white text-xs font-medium rounded-md backdrop-blur-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>বিস্তারিত দেখুন</span>
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-1">
        
        {/* Category & Fabric Metadata: clean unboxed text with typographic dot */}
        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-stone-500 mb-1 sm:mb-1.5 truncate">
          <span className="text-amber-800 font-semibold truncate">{product.categoryNameBn}</span>
          <span aria-hidden="true">·</span>
          <span className="truncate">{product.fabric.split(' ')[0]}</span>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onQuickView(product)}
          className="font-semibold text-stone-900 text-xs sm:text-sm leading-snug line-clamp-2 hover:text-amber-700 cursor-pointer transition-colors mb-1.5 sm:mb-2 min-h-[32px] sm:min-h-[38px]"
          title={product.titleBn}
        >
          {product.titleBn}
        </h3>

        {/* Interactive Rating Badge */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="inline-flex items-center gap-1.5 text-[10.5px] sm:text-xs text-stone-600 mb-2 sm:mb-2.5 cursor-pointer hover:opacity-80 transition-opacity"
          title={`${product.rating} স্টার রেটিং (${product.reviewsCount} টি রিভিউ - দেখতে ক্লিক করুন)`}
        >
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3 h-3 ${
                  star <= Math.round(product.rating)
                    ? 'fill-amber-400 text-amber-500'
                    : 'text-stone-300'
                }`}
              />
            ))}
          </div>
          <span className="font-bold text-stone-900 tabular-nums">{product.rating.toFixed(1)}</span>
          <span className="text-stone-500 text-[10px] hidden xs:inline">({product.reviewsCount})</span>
        </div>

        {/* Pricing Matrix */}
        <div className="mt-auto pt-2 border-t border-stone-100">
          <div className="flex items-baseline justify-between gap-1">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-[10px] sm:text-xs text-stone-500">{isWholesale ? 'পাইকারি:' : 'মূল্য:'}</span>
                <span className="text-sm sm:text-lg font-bold text-stone-900 tabular-nums">
                  ৳{displayPrice.toLocaleString('bn-BD')}
                </span>
              </div>
              {/* Secondary price hint */}
              {!isWholesale && product.wholesalePrice > 0 && (
                <div className="text-[9.5px] sm:text-[11px] text-amber-700 font-medium truncate">
                  পাইকারি: ৳{product.wholesalePrice.toLocaleString('bn-BD')}
                </div>
              )}
            </div>

            {/* Stock status indicator */}
            <div className="text-right shrink-0">
              {product.stock > 0 ? (
                <span className="text-[9.5px] sm:text-[11px] text-emerald-700 flex items-center gap-0.5 font-medium">
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600" />
                  <span className="hidden xs:inline">স্টকে আছে</span>
                  <span className="xs:hidden">স্টক</span>
                </span>
              ) : (
                <span className="text-[9.5px] sm:text-[11px] text-rose-600 font-medium">স্টক শেষ</span>
              )}
            </div>
          </div>

          {/* Action Buttons: Add to Cart and Quick Order */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-2.5 sm:mt-3 pt-1">
            <button
              onClick={() => onAddToCart(product, isWholesale)}
              className="py-1.5 sm:py-2 px-1 sm:px-2 text-[11px] sm:text-xs font-semibold rounded-lg border border-stone-300 text-stone-800 hover:bg-stone-50 hover:border-stone-400 flex items-center justify-center gap-1 transition-all active:scale-98 cursor-pointer"
            >
              <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>কার্ট</span>
            </button>

            <button
              onClick={() => onDirectOrder(product, isWholesale)}
              className="py-1.5 sm:py-2 px-1 sm:px-2 text-[11px] sm:text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 flex items-center justify-center gap-1 shadow-2xs transition-all active:scale-98 cursor-pointer"
            >
              <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-stone-950" />
              <span>অর্ডার</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
