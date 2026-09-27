import React, { useState } from 'react';
import { GoogleReview } from '../types';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, MessageSquarePlus, MessageSquare } from 'lucide-react';

interface GoogleReviewsSectionProps {
  reviews: GoogleReview[];
  onSubmitReview: (review: Omit<GoogleReview, 'id' | 'isGoogleVerified' | 'isApproved'>) => void;
}

export const GoogleReviewsSection: React.FC<GoogleReviewsSectionProps> = ({
  reviews,
  onSubmitReview
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newProduct, setNewProduct] = useState('রয়াল নরসিংদী জামদানি শাড়ি');
  const [submittedToast, setSubmittedToast] = useState(false);

  const approvedReviews = reviews.filter(r => r.isApproved);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? Math.max(0, approvedReviews.length - 1) : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev >= approvedReviews.length - 1 ? 0 : prev + 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

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
    <section className="bg-white border-y border-stone-200 py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Google Rating Summary Display */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-stone-200/90">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
              <span>সত্যিকারের কাস্টমার অভিজ্ঞতা</span>
              <span aria-hidden="true">·</span>
              <span>গুগল ভেরিফাইড রিভিউ</span>
            </div>
            <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              আমাদের সম্মানিত গ্রাহকদের মতামত
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-lg">
              নরসিংদী ফ্যাশন থেকে সারা বাংলাদেশে ডেলিভারি পাওয়া গ্রাহকদের বাস্তব প্রতিক্রিয়া।
            </p>
          </div>

          {/* Google Review & Stars Card */}
          <div className="flex flex-wrap items-center gap-5 p-4 sm:p-5 rounded-2xl bg-[#FAF9F5] border border-amber-200/70 shadow-2xs">
            {/* Google G Icon */}
            <div className="w-12 h-12 rounded-xl bg-white shadow-2xs flex items-center justify-center border border-stone-200">
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-stone-900 tracking-tight font-serif-brand">4.9</span>
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-stone-700">/ 5.0 Stars</span>
              </div>
              <div className="text-xs text-stone-600 mt-0.5">
                <strong className="text-stone-900">১৫০০+</strong> কাস্টমার রিভিউ ও রেটিং
              </div>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer ml-auto"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-amber-400" />
              <span>রিভিউ দিন</span>
            </button>
          </div>
        </div>

        {submittedToast && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-lg text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>ধন্যবাদ! আপনার রিভিউটি জমা দেওয়া হয়েছে এবং যাচাইকরণের পর প্রকাশিত হবে।</span>
          </div>
        )}

        {/* Carousel / Slider Container */}
        <div className="mt-8 relative">
          {/* Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-stone-500">
              দেখাচ্ছে {currentIndex + 1} থেকে {Math.min(currentIndex + 3, approvedReviews.length)} (মোট {approvedReviews.length} টি রিভিউ)
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-lg border border-stone-300 hover:bg-stone-100 flex items-center justify-center text-stone-700 transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-lg border border-stone-300 hover:bg-stone-100 flex items-center justify-center text-stone-700 transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedReviews.slice(currentIndex, currentIndex + 3).map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-2xl bg-[#FAF9F5] border border-stone-200 flex flex-col justify-between hover:shadow-sm transition-shadow"
              >
                <div>
                  {/* Top: Avatar, Name, City, Verified Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-200/80 border border-amber-300 flex items-center justify-center font-bold text-amber-900 text-xs">
                        {review.avatarText || review.author.slice(0, 2)}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-stone-900 leading-snug">
                          {review.author}
                        </h4>
                        <div className="text-[11px] text-stone-500">
                          {review.city} <span aria-hidden="true">·</span> {review.date}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>ভেরিফাইড</span>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="mt-3 text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                    "{review.comment}"
                  </p>

                  {/* Product purchased info */}
                  {review.productTitle && (
                    <div className="mt-3 text-[11px] text-amber-900 font-medium">
                      পণ্য: {review.productTitle}
                    </div>
                  )}
                </div>

                {/* Merchant Reply if present */}
                {review.reply && (
                  <div className="mt-4 pt-3 border-t border-stone-200/80 text-[11px] text-stone-600 bg-white/70 p-2.5 rounded-lg border">
                    <div className="flex items-center gap-1 font-semibold text-stone-800 mb-0.5">
                      <MessageSquare className="w-3 h-3 text-amber-700" />
                      <span>নরসিংদী ফ্যাশন টিম:</span>
                    </div>
                    <span>{review.reply}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-stone-200 shadow-xl">
            <h3 className="font-serif-brand text-2xl font-bold text-stone-900">
              আপনার মতামত ও রিভিউ লিখুন
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              নরসিংদী ফ্যাশন থেকে কেনা কাপড়ের মান ও আপনার অভিজ্ঞতা জানিয়ে অন্য ক্রেতাদের সাহায্য করুন।
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">আপনার নাম *</label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="যেমন: নুসরাত জাহান"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-hidden focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">শহর / জেলা</label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    placeholder="যেমন: ধানমন্ডি, ঢাকা"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-hidden focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">রেটিং (Stars)</label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-hidden focus:border-amber-600"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (৫ স্টার)</option>
                    <option value={4}>⭐⭐⭐⭐ (৪ স্টার)</option>
                    <option value={3}>⭐⭐⭐ (৩ স্টার)</option>
                    <option value={2}>⭐⭐ (২ স্টার)</option>
                    <option value={1}>⭐ (১ স্টার)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">কোন পণ্যটি কিনেছিলেন?</label>
                <input
                  type="text"
                  value={newProduct}
                  onChange={(e) => setNewProduct(e.target.value)}
                  placeholder="পোশাকের নাম..."
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-hidden focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">আপনার রিভিউ বিস্তারিত লিখুন *</label>
                <textarea
                  rows={3}
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="কাপড়ের মান, ডেলিভারি ও প্যাকেজিং কেমন লেগেছে তা শেয়ার করুন..."
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-hidden focus:border-amber-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-50"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 rounded-lg text-xs font-semibold transition-colors"
                >
                  রিভিউ জমা দিন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
