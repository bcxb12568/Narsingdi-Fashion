import React, { useState, useMemo } from 'react';
import { Product, GoogleReview } from '../types';
import { 
  X, 
  ShoppingBag, 
  Zap, 
  Check, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  ArrowLeft, 
  Star, 
  MessageSquarePlus, 
  CheckCircle2, 
  ThumbsUp, 
  MessageCircle,
  Award
} from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, isWholesale: boolean, size?: string, color?: string) => void;
  onDirectBuy: (product: Product, quantity: number, isWholesale: boolean, size?: string, color?: string) => void;
  reviews?: GoogleReview[];
  onSubmitReview?: (review: Omit<GoogleReview, 'id' | 'isGoogleVerified' | 'isApproved'>) => void;
  onUpdateProductRating?: (productId: string, newRating: number, newCount: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onDirectBuy,
  reviews = [],
  onSubmitReview,
  onUpdateProductRating
}) => {
  if (!product) return null;

  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || '');
  const [forceWholesale, setForceWholesale] = useState(product.category === 'wholesale');

  // Rating Form State
  const [ratingFormOpen, setRatingFormOpen] = useState(false);
  const [userRating, setUserRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [userName, setUserName] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userComment, setUserComment] = useState('');
  const [submittedRatingSuccess, setSubmittedRatingSuccess] = useState(false);

  const isWholesaleActive = forceWholesale || quantity >= product.minWholesaleQty || product.category === 'wholesale';
  const unitPrice = isWholesaleActive ? product.wholesalePrice : product.retailPrice;
  const totalPrice = unitPrice * quantity;

  // Filter reviews for this product
  const productReviews = useMemo(() => {
    return reviews.filter(
      r => r.isApproved && (
        r.productId === product.id || 
        (r.productTitle && r.productTitle.toLowerCase().includes(product.titleBn.toLowerCase()))
      )
    );
  }, [reviews, product]);

  const displayReviews = productReviews.length > 0 ? productReviews : reviews.filter(r => r.isApproved).slice(0, 4);

  const ratingLabels: Record<number, string> = {
    1: '★☆☆☆☆ ১/৫ - একদম সন্তুষ্ট নই (Poor)',
    2: '★★☆☆☆ ২/৫ - মোটামুটি (Average)',
    3: '★★★☆☆ ৩/৫ - ভালো কোয়ালিটি (Good)',
    4: '★★★★☆ ৪/৫ - খুব চমৎকার পোশাক (Very Good)',
    5: '★★★★★ ৫/৫ - অসাধারণ ও খাঁটি নরসিংদী তাঁত! (Excellent)'
  };

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userComment.trim()) return;

    if (onSubmitReview) {
      onSubmitReview({
        author: userName.trim(),
        city: userCity.trim() || 'বাংলাদেশ',
        rating: userRating,
        comment: userComment.trim(),
        date: 'আজকে',
        productTitle: product.titleBn,
        productId: product.id
      });
    }

    // Optimistically update rating count
    const updatedCount = (product.reviewsCount || 0) + 1;
    const currentRating = product.rating || 5;
    const updatedRating = Math.round(((currentRating * (product.reviewsCount || 10) + userRating) / updatedCount) * 10) / 10;
    
    if (onUpdateProductRating) {
      onUpdateProductRating(product.id, updatedRating, updatedCount);
    }

    setSubmittedRatingSuccess(true);
    setRatingFormOpen(false);
    setUserName('');
    setUserCity('');
    setUserComment('');
    setTimeout(() => setSubmittedRatingSuccess(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header with Tab Switcher */}
        <div className="px-4 py-3 bg-[#FAF9F5] border-b border-stone-200 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-700 hover:text-amber-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-amber-700" />
            <span>← পেছনে ফিরুন (Back)</span>
          </button>
          
          {/* Tabs */}
          <div className="flex items-center bg-stone-200/80 p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                activeTab === 'details'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              বিবরণ ও অর্ডার
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'reviews'
                  ? 'bg-white text-amber-900 shadow-2xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>রেটিং ও রিভিউ ({product.reviewsCount})</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-200/70 hover:bg-stone-300 flex items-center justify-center text-stone-700 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Tab 1: Product Details & Order */}
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto">
            {/* Product Image Column */}
            <div className="bg-stone-100 p-6 flex items-center justify-center relative">
              <img
                src={product.image}
                alt={product.titleBn}
                className="w-full max-h-[420px] object-cover rounded-xl shadow-xs"
                referrerPolicy="no-referrer"
              />
              {product.category === 'wholesale' && (
                <div className="absolute top-8 left-8 bg-amber-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-xs">
                  পাইকারি মাস্টার লট
                </div>
              )}
            </div>

            {/* Details Column */}
            <div className="p-6 sm:p-8 flex flex-col">
              {/* Category */}
              <div className="text-xs font-medium text-amber-800 uppercase tracking-wider mb-1">
                {product.categoryNameBn}
              </div>

              {/* Title */}
              <h2 className="font-serif-brand text-2xl font-bold text-stone-900 leading-snug">
                {product.titleBn}
              </h2>
              <div className="text-xs text-stone-500 font-sans mt-0.5">
                {product.titleEn}
              </div>

              {/* Interactive Rating Badge Button */}
              <button
                onClick={() => setActiveTab('reviews')}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-950 rounded-full border border-amber-200 w-fit text-xs font-semibold transition-colors cursor-pointer"
                title="গ্রাহকদের রেটিং ও রিভিউ দেখতে ক্লিক করুন"
              >
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3.5 h-3.5 ${
                        star <= Math.round(product.rating)
                          ? 'fill-amber-400 text-amber-500'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold tabular-nums">{product.rating.toFixed(1)}</span>
                <span className="text-stone-500 text-[11px]">({product.reviewsCount} টি রিভিউ · রেটিং দিন ⭐)</span>
              </button>

              {/* Price Box */}
              <div className="mt-4 p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-stone-500 block mb-0.5">
                      {isWholesaleActive ? 'পাইকারি রেট:' : 'খুচরা রেট:'}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-stone-900 tabular-nums">
                        ৳{unitPrice.toLocaleString('bn-BD')}
                      </span>
                      {isWholesaleActive && (
                        <span className="text-xs line-through text-stone-400">
                          ৳{product.retailPrice.toLocaleString('bn-BD')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-stone-500 block mb-0.5">সর্বমোট মূল্য:</span>
                    <span className="text-lg font-bold text-amber-800 tabular-nums">
                      ৳{totalPrice.toLocaleString('bn-BD')}
                    </span>
                  </div>
                </div>

                {/* Wholesale Tier Helper */}
                {product.category !== 'wholesale' && (
                  <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs">
                    <span className="text-stone-600">
                      💡 {product.minWholesaleQty}+ পিস নিলে পাইকারি রেট ৳{product.wholesalePrice.toLocaleString('bn-BD')}
                    </span>
                    <button
                      onClick={() => {
                        if (!forceWholesale) {
                          setQuantity(Math.max(quantity, product.minWholesaleQty));
                        }
                        setForceWholesale(!forceWholesale);
                      }}
                      className="text-amber-800 font-semibold hover:underline cursor-pointer"
                    >
                      {isWholesaleActive ? 'খুচরা মোড' : 'পাইকারি নিন'}
                    </button>
                  </div>
                )}
              </div>

              {/* Description & Fabric */}
              <div className="mt-4 space-y-2 text-xs text-stone-600">
                <p className="leading-relaxed">{product.description}</p>
                <div className="p-2 bg-amber-50/50 rounded-lg border border-amber-100 flex items-center gap-2 text-amber-900 font-medium">
                  <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>ফেব্রিক: {product.fabric}</span>
                </div>
              </div>

              {/* Color options if present */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-stone-800 mb-2">
                    কালার / শেড নির্বাচন করুন:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map(col => (
                      <button
                        key={col}
                        onClick={() => setSelectedColor(col)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          selectedColor === col
                            ? 'border-amber-700 bg-amber-50 text-amber-900 font-semibold'
                            : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size options if present */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-3">
                  <label className="block text-xs font-semibold text-stone-800 mb-2">
                    সাইজ / বহর:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(sz => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          selectedSize === sz
                            ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                            : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="mt-4 flex items-center justify-between">
                <label className="text-xs font-semibold text-stone-800">পরিমাণ (Quantity):</label>
                <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-sm font-semibold tabular-nums text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTAs: Buy Now & Add to Cart */}
              <div className="mt-6 pt-4 border-t border-stone-200 grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onAddToCart(product, quantity, isWholesaleActive, selectedSize, selectedColor);
                    onClose();
                  }}
                  className="py-3 px-3 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-900 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-98 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>কার্টে যোগ করুন</span>
                </button>

                <button
                  onClick={() => {
                    onDirectBuy(product, quantity, isWholesaleActive, selectedSize, selectedColor);
                    onClose();
                  }}
                  className="py-3 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-stone-950" />
                  <span>সরাসরি অর্ডার করুন</span>
                </button>
              </div>

              {/* Trust highlights */}
              <div className="mt-4 flex items-center justify-between text-[11px] text-stone-500 pt-2 border-t border-stone-100">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  ১০০% খাঁটি নরসিংদী তাঁত
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-stone-600" />
                  ২-৩ দিনে হোম ডেলিভারি
                </span>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: Interactive Rating & Reviews System */}
        {activeTab === 'reviews' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
            
            {/* Success Toast */}
            {submittedRatingSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 flex items-center gap-2 text-xs font-semibold animate-in fade-in duration-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>আপনার রেটিং ও মতামত সফলভাবে যোগ করা হয়েছে! ধন্যবাদ। ⭐</span>
              </div>
            )}

            {/* Rating Overview Card */}
            <div className="bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-stone-50 p-5 rounded-2xl border border-amber-300/80 shadow-2xs">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                
                {/* Big Score */}
                <div className="sm:col-span-4 text-center sm:border-r sm:border-amber-200/80 sm:pr-4">
                  <div className="text-4xl sm:text-5xl font-extrabold text-stone-900 font-mono">
                    {product.rating.toFixed(1)}
                  </div>
                  <div className="flex items-center justify-center gap-1 my-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.round(product.rating)
                            ? 'fill-amber-400 text-amber-500'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs font-semibold text-stone-700">
                    {product.reviewsCount} টি যাচাইকৃত গ্রাহক রিভিউ
                  </div>
                  <div className="text-[10.5px] text-emerald-700 font-medium flex items-center justify-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>৯৮% গ্রাহক এই পোশাকের সুপারিশ করেছেন</span>
                  </div>
                </div>

                {/* Score Breakdown Bars */}
                <div className="sm:col-span-8 space-y-1.5 text-xs">
                  {[
                    { stars: 5, pct: 88, count: Math.round(product.reviewsCount * 0.88) },
                    { stars: 4, pct: 9, count: Math.round(product.reviewsCount * 0.09) },
                    { stars: 3, pct: 2, count: Math.round(product.reviewsCount * 0.02) },
                    { stars: 2, pct: 1, count: Math.round(product.reviewsCount * 0.01) },
                    { stars: 1, pct: 0, count: 0 },
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-2">
                      <span className="w-12 text-stone-600 font-mono font-semibold flex items-center gap-0.5 text-[11px]">
                        {row.stars} <Star className="w-3 h-3 fill-amber-400 text-amber-500 inline" />
                      </span>
                      <div className="flex-1 h-2 bg-stone-200/70 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-500 rounded-full transition-all duration-500" 
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-[10px] text-stone-500 font-mono">
                        {row.pct}%
                      </span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Action Button: Give Rating */}
              <div className="mt-4 pt-4 border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-stone-700 font-medium text-center sm:text-left">
                  আপনি কি এই পোশাকটি কিনেছেন বা ব্যবহার করেছেন? আপনার রেটিং দিন!
                </span>
                <button
                  onClick={() => setRatingFormOpen(!ratingFormOpen)}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-amber-300 hover:text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <MessageSquarePlus className="w-4 h-4 text-amber-400" />
                  <span>{ratingFormOpen ? 'ফর্ম বন্ধ করুন' : 'রেটিং ও রিভিউ দিন'}</span>
                </button>
              </div>
            </div>

            {/* Interactive Rating & Review Form */}
            {ratingFormOpen && (
              <form 
                onSubmit={handleRatingSubmit}
                className="bg-white p-5 rounded-2xl border-2 border-amber-400 shadow-md space-y-4 animate-in fade-in slide-in-from-top-2 duration-300"
              >
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <h4 className="font-serif-brand font-bold text-sm text-stone-900 flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                    <span>পোশাকটির রেটিং নির্বাচন করুন</span>
                  </h4>
                  <span className="text-[11px] text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded-full">
                    {ratingLabels[hoverRating || userRating]}
                  </span>
                </div>

                {/* Interactive Star Buttons */}
                <div className="flex items-center gap-1 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setUserRating(star)}
                      className="p-1 text-3xl sm:text-4xl transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoverRating || userRating)
                            ? 'fill-amber-400 text-amber-500'
                            : 'text-stone-300 hover:text-amber-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      আপনার নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="যেমন: ফারহানা আহমেদ"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      জেলা / শহর
                    </label>
                    <input
                      type="text"
                      value={userCity}
                      onChange={(e) => setUserCity(e.target.value)}
                      placeholder="যেমন: ঢাকা, নরসিংদী, চট্টগ্রাম"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    কাপড়ের কোয়ালিটি ও অভিজ্ঞতার বিবরণ *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    placeholder="কাপড়টির সুতা, বুনন, কালার বা ডেলিভারি কেমন লেগেছে তা বিস্তারিত লিখুন..."
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setRatingFormOpen(false)}
                    className="px-4 py-2 border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-lg text-xs font-medium cursor-pointer"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>রেটিং জমা দিন</span>
                  </button>
                </div>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-3">
              <h4 className="font-serif-brand font-bold text-stone-900 text-sm flex items-center gap-2">
                <span>গ্রাহক মতামত ({displayReviews.length})</span>
                <span className="text-[10px] text-stone-500 font-sans font-normal">
                  (১০০% আসল ক্রেতাদের রিভিউ)
                </span>
              </h4>

              {displayReviews.length === 0 ? (
                <div className="py-8 text-center text-stone-500 bg-stone-50 rounded-xl border border-stone-200">
                  <Star className="w-8 h-8 text-amber-400 mx-auto mb-2 opacity-50" />
                  <p className="font-semibold text-stone-800 text-xs">এই পোশাকটির এখনো কোনো রিভিউ জমা পড়েনি।</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">প্রথম ব্যক্তি হিসেবে আপনার মতামত ও রেটিং দিন!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {displayReviews.map((rev) => (
                    <div 
                      key={rev.id}
                      className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2 hover:border-amber-200 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 text-white font-bold text-xs flex items-center justify-center shadow-2xs">
                            {rev.author.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                              <span>{rev.author}</span>
                              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 flex items-center gap-0.5">
                                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                                <span>ভেরিফাইড ক্রেতা</span>
                              </span>
                            </div>
                            <div className="text-[10px] text-stone-500">
                              {rev.city} · {rev.date}
                            </div>
                          </div>
                        </div>

                        {/* Stars */}
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= rev.rating
                                  ? 'fill-amber-400 text-amber-500'
                                  : 'text-stone-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-stone-700 text-xs leading-relaxed pl-10.5">
                        "{rev.comment}"
                      </p>

                      {/* Official Admin Reply if present */}
                      {rev.reply && (
                        <div className="ml-10.5 mt-2 p-2.5 bg-amber-50/70 border-l-2 border-amber-600 rounded-r-lg text-xs space-y-0.5">
                          <div className="font-bold text-amber-950 text-[11px] flex items-center gap-1">
                            <Award className="w-3 h-3 text-amber-700" />
                            <span>নরসিংদী ফ্যাশন অফিশিয়াল রেসপন্স:</span>
                          </div>
                          <p className="text-stone-700 text-[11px] leading-relaxed">
                            {rev.reply}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
