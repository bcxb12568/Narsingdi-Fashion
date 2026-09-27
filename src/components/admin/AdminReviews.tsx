import React, { useState } from 'react';
import { GoogleReview } from '../../types';
import { Star, Check, EyeOff, MessageSquare, Trash2, Plus, CheckCircle2 } from 'lucide-react';

interface AdminReviewsProps {
  reviews: GoogleReview[];
  onToggleApprove: (id: string) => void;
  onAddReply: (id: string, reply: string) => void;
  onDeleteReview: (id: string) => void;
  onAddCustomReview: (review: GoogleReview) => void;
}

export const AdminReviews: React.FC<AdminReviewsProps> = ({
  reviews,
  onToggleApprove,
  onAddReply,
  onDeleteReview,
  onAddCustomReview
}) => {
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [newModalOpen, setNewModalOpen] = useState(false);

  // New review form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newProduct, setNewProduct] = useState('');

  const handleSaveReply = (id: string) => {
    if (!replyText.trim()) return;
    onAddReply(id, replyText);
    setReplyingId(null);
    setReplyText('');
  };

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const created: GoogleReview = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      city: newCity || 'বাংলাদেশ',
      rating: newRating,
      date: 'আজকে',
      comment: newComment,
      isGoogleVerified: true,
      isApproved: true,
      avatarText: newAuthor.slice(0, 2).toUpperCase(),
      productTitle: newProduct || 'নরসিংদী তাঁত পোশাক'
    };

    onAddCustomReview(created);
    setNewModalOpen(false);
    setNewAuthor('');
    setNewCity('');
    setNewComment('');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-stone-900">
            গুগল রিভিউ ও রেটিং কন্ট্রোল
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            কাস্টমারদের রিভিউ অ্যাপ্রুভ/হাইড করুন, উত্তর দিন এবং নতুন প্রশংসাপত্র যোগ করুন
          </p>
        </div>

        <button
          onClick={() => setNewModalOpen(true)}
          className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>রিভিউ এন্ট্রি করুন</span>
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map(rev => (
          <div 
            key={rev.id}
            className={`p-5 rounded-2xl border transition-all ${
              rev.isApproved ? 'bg-white border-stone-200 shadow-2xs' : 'bg-stone-100/60 border-dashed border-stone-300 opacity-75'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center font-bold text-amber-900 text-xs shrink-0">
                  {rev.avatarText || rev.author.slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-stone-900">{rev.author}</h4>
                    <span className="text-xs text-stone-500">({rev.city})</span>
                    <span className="text-[11px] text-stone-400">· {rev.date}</span>
                  </div>

                  <div className="flex items-center gap-1 mt-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-semibold text-stone-700 ml-1">
                      {rev.rating}.0
                    </span>
                  </div>

                  {rev.productTitle && (
                    <div className="text-[11px] text-amber-800 font-medium mt-1">
                      পণ্য: {rev.productTitle}
                    </div>
                  )}

                  <p className="mt-2 text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                    "{rev.comment}"
                  </p>

                  {/* Merchant Reply Display */}
                  {rev.reply && (
                    <div className="mt-3 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                      <div className="font-semibold text-stone-900 flex items-center gap-1.5 mb-1">
                        <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
                        <span>নরসিংদী ফ্যাশন অফিশিয়াল উত্তর:</span>
                      </div>
                      <p className="text-stone-600">{rev.reply}</p>
                    </div>
                  )}

                  {/* Reply Input Box */}
                  {replyingId === rev.id && (
                    <div className="mt-3 space-y-2">
                      <textarea
                        rows={2}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="কাস্টমারকে ধন্যবাদ বা কোনো আপডেট জানান..."
                        className="w-full p-2 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-hidden focus:border-amber-600 bg-white"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveReply(rev.id)}
                          className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-stone-950 rounded-md text-xs font-semibold"
                        >
                          উত্তর সেভ করুন
                        </button>
                        <button
                          onClick={() => setReplyingId(null)}
                          className="px-3 py-1 border border-stone-300 rounded-md text-xs text-stone-700 hover:bg-stone-50"
                        >
                          বাতিল
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons: Approve / Hide Toggle */}
              <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                <button
                  onClick={() => onToggleApprove(rev.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                    rev.isApproved
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                      : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                  }`}
                >
                  {rev.isApproved ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span>অনুমোদিত (Live)</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-stone-600" />
                      <span>লুকানো (Hidden)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setReplyingId(rev.id);
                    setReplyText(rev.reply || '');
                  }}
                  className="px-3 py-1.5 text-xs text-stone-700 hover:text-stone-900 border border-stone-200 rounded-lg hover:bg-stone-50 flex items-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{rev.reply ? 'উত্তর এডিট' : 'উত্তর দিন'}</span>
                </button>

                <button
                  onClick={() => onDeleteReview(rev.id)}
                  className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                  title="রিভিউ ডিলিট করুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Manual Review Entry Modal */}
      {newModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-stone-200 shadow-2xl">
            <h3 className="font-serif-brand text-2xl font-bold text-stone-900">
              নতুন কাস্টমার রিভিউ যুক্ত করুন
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              হোয়াটসঅ্যাপ বা ফোনে পাওয়া কাস্টমারের প্রশংসাপত্র গুগল রিভিউ হিসেবে প্রদর্শন করুন।
            </p>

            <form onSubmit={handleCreateReview} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">কাস্টমারের নাম *</label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="যেমন: সেলিনা আক্তার"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">শহর / জেলা</label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    placeholder="যেমন: নরসিংদী সদর"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">রেটিং</label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (৫ স্টার)</option>
                    <option value={4}>⭐⭐⭐⭐ (৪ স্টার)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">পোশাকের নাম</label>
                <input
                  type="text"
                  value={newProduct}
                  onChange={(e) => setNewProduct(e.target.value)}
                  placeholder="যেমন: রয়াল নরসিংদী জামদানি শাড়ি"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">মন্তব্য (Review) *</label>
                <textarea
                  rows={3}
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="কাপড়ের মান ও অনুভূতির বিবরণ লিখুন..."
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setNewModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-50"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-lg"
                >
                  যুক্ত করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
