import React, { useState } from 'react';
import { Order } from '../types';
import { X, Search, PackageCheck, Truck, Clock, CheckCircle2, AlertCircle, ArrowLeft, Star, Send } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onRateOrder?: (orderId: string, rating: number, comment?: string) => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orders,
  onRateOrder
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundOrders, setFoundOrders] = useState<Order[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Rating state per order
  const [orderRatings, setOrderRatings] = useState<Record<string, number>>({});
  const [orderHoverRatings, setOrderHoverRatings] = useState<Record<string, number>>({});
  const [orderComments, setOrderComments] = useState<Record<string, string>>({});
  const [ratedSuccessOrders, setRatedSuccessOrders] = useState<Record<string, boolean>>({});

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    const rawTrimmed = query.trim();
    const lowerTrimmed = rawTrimmed.toLowerCase();
    
    // Check in-memory orders first
    let matches = orders.filter(
      o => o.id.toLowerCase().includes(lowerTrimmed) || o.customerPhone.includes(rawTrimmed)
    );

    // If not found in memory, query Firestore document by exact ID
    if (matches.length === 0) {
      try {
        const snap = await getDoc(doc(db, 'orders', rawTrimmed));
        if (snap.exists()) {
          matches = [snap.data() as Order];
        }
      } catch (err) {
        console.warn('Firestore order lookup error:', err);
      }
    }

    setFoundOrders(matches);
    setSearched(true);
    setIsSearching(false);
  };

  const getStatusStep = (status: Order['status']) => {
    switch (status) {
      case 'Pending': return 1;
      case 'Processing': return 2;
      case 'Shipped': return 3;
      case 'Delivered': return 4;
      default: return 0;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200"
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
            <div>
              <h2 className="font-serif-brand text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-1.5">
                <Truck className="w-4.5 h-4.5 text-amber-700" />
                <span>লাইভ অর্ডার ট্র্যাকিং</span>
              </h2>
              <p className="text-[11px] text-stone-500">
                মোবাইল নম্বর বা অর্ডার আইডি দিয়ে স্ট্যাটাস দেখুন।
              </p>
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

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="অর্ডার নং (NF-XXXX) বা ফোন নম্বর লিখুন..."
                className="w-full pl-9 pr-4 py-2.5 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-stone-950 text-xs font-bold rounded-lg transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
            >
              {isSearching ? 'অনুসন্ধান হচ্ছে...' : 'ট্র্যাক করুন'}
            </button>
          </form>

          {/* Quick suggestions */}
          {!searched && (
            <div className="text-xs text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-200">
              <div className="font-semibold text-stone-700 mb-1">উদাহরণস্বরূপ ট্র্যাকিং আইডি ট্রাই করুন:</div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => { setQuery('NF-9842'); }}
                  className="font-mono text-amber-800 underline hover:text-amber-900"
                >
                  NF-9842 (প্রসেসিং)
                </button>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={() => { setQuery('NF-9839'); }}
                  className="font-mono text-amber-800 underline hover:text-amber-900"
                >
                  NF-9839 (পাথাও কুরিয়ারে শিপড)
                </button>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={() => { setQuery('01711223344'); }}
                  className="font-mono text-amber-800 underline hover:text-amber-900"
                >
                  01711223344 (ফোন নম্বর)
                </button>
              </div>
            </div>
          )}

          {/* Search Results */}
          {searched && foundOrders.length === 0 && (
            <div className="text-center py-8 text-stone-500 space-y-2">
              <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
              <p className="text-sm font-semibold text-stone-800">কোনো অর্ডার পাওয়া যায়নি</p>
              <p className="text-xs">সঠিক অর্ডার নম্বর অথবা অর্ডারে ব্যবহৃত ফোন নম্বর দিয়ে পুনরায় চেষ্টা করুন।</p>
            </div>
          )}

          {foundOrders.map((order) => {
            const step = getStatusStep(order.status);
            return (
              <div key={order.id} className="p-4 sm:p-5 rounded-xl border border-stone-200 bg-[#FAF9F5] space-y-4">
                
                {/* Order Top Bar */}
                <div className="flex items-start justify-between border-b border-stone-200 pb-3">
                  <div>
                    <div className="text-xs text-stone-500">অর্ডার নম্বর:</div>
                    <div className="text-base font-bold font-mono text-amber-900">{order.id}</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">{order.date}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-500">স্ট্যাটাস:</span>
                    <div className="text-xs font-bold text-stone-900 bg-white px-2 py-1 rounded border border-stone-200 shadow-2xs mt-0.5">
                      {order.status === 'Pending' && 'অপেক্ষমাণ (Pending)'}
                      {order.status === 'Processing' && 'প্রস্তুত হচ্ছে (Processing)'}
                      {order.status === 'Shipped' && 'শিপড / কুরিয়ারে আছে'}
                      {order.status === 'Delivered' && 'ডেলিভারি সম্পন্ন'}
                      {order.status === 'Canceled' && 'বাতিল করা হয়েছে'}
                    </div>
                  </div>
                </div>

                {/* Tracking Progress Steps */}
                <div className="py-2">
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-semibold text-stone-600">
                    <div className={step >= 1 ? 'text-amber-800' : 'text-stone-400'}>
                      ১. অর্ডার প্লেসড
                    </div>
                    <div className={step >= 2 ? 'text-amber-800' : 'text-stone-400'}>
                      ২. কোয়ালিটি চেক
                    </div>
                    <div className={step >= 3 ? 'text-amber-800' : 'text-stone-400'}>
                      ৩. কুরিয়ারে হস্তান্তর
                    </div>
                    <div className={step >= 4 ? 'text-emerald-700' : 'text-stone-400'}>
                      ৪. হোম ডেলিভারি
                    </div>
                  </div>

                  <div className="relative mt-2 h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-amber-600 transition-all duration-500"
                      style={{ width: `${(step / 4) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Courier Partner Card if Shipped */}
                {order.courier && (
                  <div className="p-3 bg-white rounded-lg border border-amber-200 text-xs space-y-1">
                    <div className="flex items-center justify-between font-semibold text-stone-800">
                      <span>কুরিয়ার পার্টনার: {order.courier.provider} Courier</span>
                      <span className="font-mono text-amber-800">ট্র্যাকিং কোড: {order.courier.trackingCode}</span>
                    </div>
                    <div className="text-[11px] text-stone-500">
                      অবস্থা: {order.courier.status || 'পার্সেল কুরিয়ার হাব থেকে আপনার ঠিকানার পথে।'}
                    </div>
                  </div>
                )}

                {/* Items & Amount */}
                <div className="text-xs space-y-1 pt-1 text-stone-600">
                  <div className="font-semibold text-stone-800">অর্ডারের আইটেমসমূহ:</div>
                  {order.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between pl-2">
                      <span>• {it.product.titleBn} (x{it.quantity})</span>
                      <span className="tabular-nums font-medium text-stone-800">
                        ৳{((it.isWholesale ? it.product.wholesalePrice : it.product.retailPrice) * it.quantity).toLocaleString('bn-BD')}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-stone-900 pt-2 border-t border-stone-200">
                    <span>সর্বমোট টাকা:</span>
                    <span className="text-amber-900 tabular-nums">৳{order.grandTotal.toLocaleString('bn-BD')}</span>
                  </div>
                </div>

                {/* Customer Rating Section for Order */}
                <div className="pt-2 border-t border-stone-200">
                  {order.rating || ratedSuccessOrders[order.id] ? (
                    <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-950 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>আপনার দেওয়া রেটিং:</span>
                        </span>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= (orderRatings[order.id] || order.rating || 5)
                                  ? 'fill-amber-400 text-amber-500'
                                  : 'text-stone-300'
                              }`}
                            />
                          ))}
                          <span className="font-bold text-stone-900 ml-1">
                            ({orderRatings[order.id] || order.rating || 5}/৫)
                          </span>
                        </div>
                      </div>
                      {(orderComments[order.id] || order.ratingComment) && (
                        <p className="text-stone-600 text-[11px] italic pl-4.5">
                          "{orderComments[order.id] || order.ratingComment}"
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="p-3 bg-gradient-to-r from-amber-500/10 via-amber-50 to-white rounded-xl border border-amber-300/80 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          <span>আপনার কেনাকাটা ও কুরিয়ার অভিজ্ঞতা কেমন ছিল? রেটিং দিন:</span>
                        </span>
                        <span className="text-[10px] text-amber-800 font-semibold">
                          {(orderHoverRatings[order.id] || orderRatings[order.id] || 0) > 0 
                            ? `${orderHoverRatings[order.id] || orderRatings[order.id]}/৫ স্টার`
                            : 'স্টার বেছে নিন'}
                        </span>
                      </div>

                      {/* Interactive Stars */}
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setOrderHoverRatings(prev => ({ ...prev, [order.id]: star }))}
                            onMouseLeave={() => setOrderHoverRatings(prev => ({ ...prev, [order.id]: 0 }))}
                            onClick={() => setOrderRatings(prev => ({ ...prev, [order.id]: star }))}
                            className="p-1 hover:scale-125 transition-transform cursor-pointer focus:outline-none"
                          >
                            <Star
                              className={`w-6 h-6 transition-colors ${
                                star <= (orderHoverRatings[order.id] || orderRatings[order.id] || 0)
                                  ? 'fill-amber-400 text-amber-500'
                                  : 'text-stone-300 hover:text-amber-200'
                              }`}
                            />
                          </button>
                        ))}
                      </div>

                      {/* Short comment & submit */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={orderComments[order.id] || ''}
                          onChange={(e) => setOrderComments(prev => ({ ...prev, [order.id]: e.target.value }))}
                          placeholder="একটি ছোট মন্তব্য লিখুন (ঐচ্ছিক)..."
                          className="flex-1 px-3 py-1.5 border border-stone-300 rounded-lg text-xs text-stone-900 bg-white focus:outline-none focus:border-amber-600"
                        />
                        <button
                          type="button"
                          disabled={!orderRatings[order.id]}
                          onClick={() => {
                            const stars = orderRatings[order.id] || 5;
                            const comment = orderComments[order.id] || '';
                            if (onRateOrder) {
                              onRateOrder(order.id, stars, comment);
                            }
                            setRatedSuccessOrders(prev => ({ ...prev, [order.id]: true }));
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                            orderRatings[order.id]
                              ? 'bg-amber-600 hover:bg-amber-500 text-stone-950 shadow-xs cursor-pointer'
                              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                          }`}
                        >
                          <Send className="w-3 h-3" />
                          <span>জমা দিন</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
