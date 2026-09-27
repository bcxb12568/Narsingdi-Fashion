import React, { useState, useMemo } from 'react';
import { GoogleReview } from '../../types';
import { 
  Star, 
  CheckCircle2, 
  MessageSquarePlus, 
  Search, 
  ThumbsUp, 
  ShieldCheck, 
  Filter, 
  Sparkles,
  MessageCircle,
  X
} from 'lucide-react';

interface ReviewsPageProps {
  reviews: GoogleReview[];
  onSubmitReview: (review: Omit<GoogleReview, 'id' | 'isGoogleVerified' | 'isApproved'>) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({
  reviews,
  onSubmitReview
}) => {
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  // Form State
  const [newAuthor, setNewAuthor] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newProduct, setNewProduct] = useState('রয়াল নরসিংদী জামদানি শাড়ি');
  const [submittedToast, setSubmittedToast] = useState(false);

  const approvedReviews = useMemo(() => {
    return reviews.filter(r => r.isApproved);
  }, [reviews]);

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return approvedReviews.filter((review) => {
      if (selectedRating !== 'all' && review.rating !== selectedRating) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          review.author.toLowerCase().includes(q) ||
          review.city.toLowerCase().includes(q) ||
          review.comment.toLowerCase().includes(q) ||
          (review.productTitle && review.productTitle.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [approvedReviews, selectedRating, searchQuery]);

  // Statistics
  const totalReviews = approvedReviews.length;
  const avgRating = totalReviews > 0
    ? (approvedReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : '4.9';

  const fiveStarCount = approvedReviews.filter(r => r.rating === 5).length;
  const fourStarCount = approvedReviews.filter(r => r.rating === 4).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    onSubmitReview({
      author: newAuthor,
      city: newCity || 'বাংলাদেশ',
      rating: newRating,
      date: 'আজকে',
      comment: newComment,
      avatarText: newAuthor.slice(0, 2).toUpperCase(),
      productTitle: newProduct
    });

    setModalOpen(false);
    setSubmittedToast(true);
    setNewAuthor('');
    setNewCity('');
    setNewComment('');
    setTimeout(() => setSubmittedToast(false), 4000);
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Toast */}
      {submittedToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-900 text-emerald-100 px-6 py-3 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 border border-emerald-700 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>আপনার মূল্যবান মতামত ও রিভিউ সফলভাবে গ্রহণ করা হয়েছে! ধন্যবাদ।</span>
        </div>
      )}

      {/* Top Banner: Google Rating Summary Card */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Overall Rating */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>প্রকৃত গ্রাহক সন্তুষ্টি ও গুগল রেটিং</span>
            </div>

            <h1 className="font-serif-brand text-3xl sm:text-4xl font-bold text-stone-900">
              গ্রাহক রিভিউ ও বাস্তব অভিজ্ঞতা
            </h1>

            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-5xl sm:text-6xl font-black font-mono text-stone-900">
                {avgRating}
              </span>
              <div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  মোট {totalReviews} টি অনুমোদিত ও ভেরিফাইড রিভিউ
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              সারা বাংলাদেশ থেকে নরসিংদীর তাঁতের কাপড় কিনে সন্তুষ্ট ক্রেতাদের অকপট মতামত ও রেটিং।
            </p>
          </div>

          {/* Middle: Rating Breakdown Bar */}
          <div className="lg:col-span-4 space-y-2 text-xs border-y lg:border-y-0 lg:border-x border-stone-100 py-4 lg:py-0 lg:px-6">
            <div className="flex items-center gap-3">
              <span className="w-12 text-stone-600 font-medium">৫ স্টার</span>
              <div className="flex-1 h-2.5 bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full" 
                  style={{ width: `${totalReviews > 0 ? (fiveStarCount / totalReviews) * 100 : 90}%` }}
                />
              </div>
              <span className="w-8 text-right font-mono text-stone-500">{fiveStarCount}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-12 text-stone-600 font-medium">৪ স্টার</span>
              <div className="flex-1 h-2.5 bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-400 rounded-full" 
                  style={{ width: `${totalReviews > 0 ? (fourStarCount / totalReviews) * 100 : 10}%` }}
                />
              </div>
              <span className="w-8 text-right font-mono text-stone-500">{fourStarCount}</span>
            </div>

            <div className="pt-2 text-[11px] text-stone-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>১০০% আসল ক্রেতার রিভিউ ভেরিফিকেশন</span>
            </div>
          </div>

          {/* Right: CTA to Submit Review */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end justify-center text-center lg:text-right space-y-3">
            <p className="text-xs text-stone-600">
              আপনিও কি আমাদের থেকে কাপড় ক্রয় করেছেন?
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto px-5 py-3 bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 text-amber-400" />
              <span>আপনার রিভিউ দিন</span>
            </button>
          </div>

        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Star Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            onClick={() => setSelectedRating('all')}
            className={`px-3.5 py-2 rounded-xl font-semibold transition-colors cursor-pointer ${
              selectedRating === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
            }`}
          >
            সকল রিভিউ ({approvedReviews.length})
          </button>
          <button
            onClick={() => setSelectedRating(5)}
            className={`px-3.5 py-2 rounded-xl font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
              selectedRating === 5
                ? 'bg-amber-600 text-stone-950 font-bold shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
            }`}
          >
            <span>৫ স্টার</span>
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>({fiveStarCount})</span>
          </button>
          <button
            onClick={() => setSelectedRating(4)}
            className={`px-3.5 py-2 rounded-xl font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
              selectedRating === 4
                ? 'bg-amber-600 text-stone-950 font-bold shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
            }`}
          >
            <span>৪ স্টার</span>
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>({fourStarCount})</span>
          </button>
        </div>

        {/* Search inside reviews */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="রিভিউ বা জেলার নাম দিয়ে খুঁজুন..."
            className="w-full pl-9 pr-4 py-2 bg-white text-xs border border-stone-300 rounded-xl focus:outline-none focus:border-amber-600 text-stone-900"
          />
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Header: Author & Verified Badge */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    {review.avatarText || review.author.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">{review.author}</h4>
                    <p className="text-[11px] text-stone-500">{review.city} · {review.date}</p>
                  </div>
                </div>

                {review.isGoogleVerified && (
                  <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>ভেরিফাইড ক্রেতা</span>
                  </span>
                )}
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-xs text-stone-700 leading-relaxed italic">
                "{review.comment}"
              </p>
            </div>

            {/* Bottom: Product Purchased & Admin Reply if any */}
            <div className="pt-3 border-t border-stone-100 space-y-2">
              {review.productTitle && (
                <p className="text-[11px] text-amber-800 font-medium">
                  ক্রয়কৃত পোশাক: <span className="font-semibold">{review.productTitle}</span>
                </p>
              )}

              {review.reply && (
                <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 text-xs text-stone-700 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-stone-900 text-[11px]">
                    <MessageCircle className="w-3.5 h-3.5 text-amber-700" />
                    <span>NARSINGDI FASHION এর উত্তর:</span>
                  </div>
                  <p className="text-[11px] text-stone-600 italic">
                    "{review.reply}"
                  </p>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Submit Review Modal */}
      {modalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setModalOpen(false)}
        >
          <div 
            className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif-brand text-lg font-bold text-stone-900 mb-1">
              আপনার মতামত ও রেটিং দিন
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              আপনার বাস্তব মূল্যায়ন নরসিংদীর তাঁত শিল্পের বিশ্বস্ততা বৃদ্ধি করে।
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">রেটিং নির্বাচন করুন *</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1 text-amber-500 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-mono font-bold text-stone-700 ml-2">
                    {newRating} / ৫ স্টার
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">আপনার নাম *</label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="যেমন: ফারহানা সুলতানা"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">আপনার জেলা / শহর</label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    placeholder="যেমন: ঢাকা, চট্টগ্রাম"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">ক্রয়কৃত পোশাক</label>
                  <input
                    type="text"
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                    placeholder="যেমন: সুতি থ্রি-পিস"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">আপনার মূল্যবান অভিজ্ঞতা লিখুন *</label>
                <textarea
                  required
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="কাপড়ের মান, রং, ফিনিশিং ও ডেলিভারি কেমন লেগেছে তা বিস্তারিত জানান..."
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg font-medium cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold rounded-lg shadow-md cursor-pointer transition-all"
                >
                  রিভিউ জমা দিন
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
