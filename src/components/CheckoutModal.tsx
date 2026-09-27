import React, { useState } from 'react';
import { CartItem, Order, PaymentMethod, StoreSettings } from '../types';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Banknote, Smartphone, Printer, ArrowRight, ArrowLeft } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  settings: StoreSettings;
  onPlaceOrder: (order: Order) => void;
  onViewInvoice: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  settings,
  onPlaceOrder,
  onViewInvoice
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [district, setDistrict] = useState('ঢাকা');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [trxId, setTrxId] = useState('');
  const [notes, setNotes] = useState('');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const subtotal = items.reduce((sum, item) => {
    const price = item.isWholesale ? item.product.wholesalePrice : item.product.retailPrice;
    return sum + (price * item.quantity);
  }, 0);

  // Delivery charge calculation:
  const isFreeDelivery = subtotal >= settings.freeDeliveryOver;
  let deliveryCharge = 0;
  if (!isFreeDelivery) {
    if (district === 'নরসিংদী') {
      deliveryCharge = settings.deliveryInsideNarsingdi;
    } else if (district === 'ঢাকা') {
      deliveryCharge = 60;
    } else {
      deliveryCharge = settings.deliveryOutsideNarsingdi;
    }
  }

  const grandTotal = subtotal + deliveryCharge;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) return;

    const newOrderId = `NF-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('bn-BD')} - ${now.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}`;

    const newOrder: Order = {
      id: newOrderId,
      date: formattedDate,
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
      address,
      district,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Paid',
      trxId: trxId || undefined,
      items: [...items],
      subtotal,
      deliveryCharge,
      discount: 0,
      grandTotal,
      status: 'Pending',
      notes: notes || undefined
    };

    onPlaceOrder(newOrder);
    setCreatedOrder(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Back button */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF9F5]">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-1 text-xs font-bold text-stone-600 hover:text-amber-800 bg-stone-100 hover:bg-stone-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-700" />
              <span>← ফিরে যান</span>
            </button>
            <div>
              <h2 className="font-serif-brand text-lg sm:text-xl font-bold text-stone-900 leading-tight">
                {createdOrder ? 'অর্ডার সফল হয়েছে!' : 'চেকআউট ও ডেলিভারি'}
              </h2>
              <p className="text-[11px] text-stone-500">
                {createdOrder ? `অর্ডার আইডি: ${createdOrder.id}` : 'সরাসরি নরসিংদীর তাঁত থেকে পণ্য পৌঁছাবে।'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {createdOrder ? (
          /* Order Success State */
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="font-serif-brand text-2xl font-bold text-stone-900">
                ধন্যবাদ, {createdOrder.customerName}!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto leading-relaxed">
                আপনার অর্ডারটি নরসিংদী ফ্যাশনে সফলভাবে কনফার্ম করা হয়েছে। আমাদের প্রতিনিধি শীঘ্রই আপনাকে ফোন করে অর্ডারটি ভেরিফাই করবেন।
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-left max-w-md mx-auto text-xs space-y-2">
              <div className="flex justify-between font-semibold text-stone-900 pb-2 border-b border-stone-200">
                <span>অর্ডার নং: {createdOrder.id}</span>
                <span>মোট: ৳{createdOrder.grandTotal.toLocaleString('bn-BD')}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>ডেলিভারি ঠিকানা:</span>
                <span className="font-medium text-stone-800 text-right">{createdOrder.address}, {createdOrder.district}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>মোবাইল নম্বর:</span>
                <span className="font-medium text-stone-800">{createdOrder.customerPhone}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>পেমেন্ট পদ্ধতি:</span>
                <span className="font-semibold text-amber-800 uppercase">{createdOrder.paymentMethod}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onViewInvoice(createdOrder)}
                className="px-5 py-2.5 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-800 font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-amber-700" />
                <span>ইনভয়েস প্রিন্ট / দেখুন</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition-colors shadow-xs cursor-pointer"
              >
                আরো কেনাকাটা করুন
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 max-h-[78vh] overflow-y-auto space-y-5">
            
            {/* Customer Details */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <span>১. গ্রাহকের তথ্য ও ডেলিভারি ঠিকানা</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    আপনার পূর্ণ নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="যেমন: মোহাম্মদ জাহিদ হাসান"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-hidden focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    মোবাইল নম্বর (সচল) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-hidden focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    জেলা নির্বাচন করুন *
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-hidden focus:border-amber-600"
                  >
                    <option value="নরসিংদী">নরসিংদী (হোম ডেলিভারি ৳৬০)</option>
                    <option value="ঢাকা">ঢাকা সিটি (ডেলিভারি ৳৬০)</option>
                    <option value="চট্টগ্রাম">চট্টগ্রাম (ডেলিভারি ৳১২০)</option>
                    <option value="সিলেট">সিলেট (ডেলিভারি ৳১২০)</option>
                    <option value="রাজশাহী">রাজশাহী (ডেলিভারি ৳১২০)</option>
                    <option value="খুলনা">খুলনা (ডেলিভারি ৳১২০)</option>
                    <option value="বরিশাল">বরিশাল (ডেলিভারি ৳১২০)</option>
                    <option value="রংপুর">রংপুর (ডেলিভারি ৳১২০)</option>
                    <option value="ময়মনসিংহ">ময়মনসিংহ (ডেলিভারি ৳১২০)</option>
                    <option value="অন্যান্য জেলা">অন্যান্য সকল জেলা (ডেলিভারি ৳১২০)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    ইমেইল (ঐচ্ছিক)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-hidden focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  সম্পূর্ণ ঠিকানা (বাসা/রোড/এলাকা/থানা) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="যেমন: বাড়ি নং ১২, রোড ৪, ব্লক সি, বনানী, ঢাকা"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-hidden focus:border-amber-600"
                />
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="space-y-3 pt-3 border-t border-stone-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                ২. পেমেন্ট পদ্ধতি নির্বাচন করুন
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Cash on Delivery */}
                <label 
                  className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                    paymentMethod === 'cod' 
                      ? 'border-amber-600 bg-amber-50/60 shadow-2xs' 
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Banknote className="w-5 h-5 text-amber-800" />
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-amber-600"
                    />
                  </div>
                  <div className="mt-2">
                    <span className="text-xs font-bold text-stone-900 block">ক্যাশ অন ডেলিভারি</span>
                    <span className="text-[10px] text-stone-500">পণ্য হাতে পেয়ে মূল্য পরিশোধ</span>
                  </div>
                </label>

                {/* bKash */}
                <label 
                  className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                    paymentMethod === 'bkash' 
                      ? 'border-[#E2136E] bg-pink-50/50 shadow-2xs' 
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Smartphone className="w-5 h-5 text-[#E2136E]" />
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'bkash'}
                      onChange={() => setPaymentMethod('bkash')}
                      className="text-[#E2136E]"
                    />
                  </div>
                  <div className="mt-2">
                    <span className="text-xs font-bold text-stone-900 block">বিকাশ (bKash)</span>
                    <span className="text-[10px] text-stone-500">মার্চেন্ট বা সেন্ড মানি</span>
                  </div>
                </label>

                {/* Nagad */}
                <label 
                  className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                    paymentMethod === 'nagad' 
                      ? 'border-[#F7941D] bg-orange-50/50 shadow-2xs' 
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <CreditCard className="w-5 h-5 text-[#F7941D]" />
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'nagad'}
                      onChange={() => setPaymentMethod('nagad')}
                      className="text-[#F7941D]"
                    />
                  </div>
                  <div className="mt-2">
                    <span className="text-xs font-bold text-stone-900 block">নগদ (Nagad)</span>
                    <span className="text-[10px] text-stone-500">দ্রুত ও নিরাপদ পেমেন্ট</span>
                  </div>
                </label>
              </div>

              {/* bKash or Nagad Instructions */}
              {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
                  <div className="font-semibold text-stone-800">
                    {paymentMethod === 'bkash' ? 'বিকাশ নম্বর:' : 'নগদ নম্বর:'} {' '}
                    <span className="text-amber-800 font-mono">
                      {paymentMethod === 'bkash' ? settings.bkashNumber : settings.nagadNumber}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    উপরের নম্বরে মোট ৳{grandTotal.toLocaleString('bn-BD')} টাকা পাঠিয়ে নিচের ঘরে TrxID লিখুন:
                  </p>
                  <input
                    type="text"
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    placeholder="Transaction ID (TrxID) লিখুন"
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-md text-xs font-mono uppercase focus:outline-hidden focus:border-amber-600 bg-white"
                  />
                </div>
              )}
            </div>

            {/* Special Notes */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                বিশেষ কোনো নোট বা নির্দেশনা (ঐচ্ছিক)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="যেমন: দ্রুত ডেলিভারি বা নির্দিষ্ট সময়ে ফোন করার অনুরোধ"
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-hidden focus:border-amber-600"
              />
            </div>

            {/* Order Cost Breakdown */}
            <div className="p-4 rounded-xl bg-[#FAF9F5] border border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>পণ্যের মোট মূল্য ({items.length} আইটেম):</span>
                <span className="font-semibold tabular-nums text-stone-900">৳{subtotal.toLocaleString('bn-BD')}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>ডেলিভারি চার্জ ({district}):</span>
                <span className="font-semibold tabular-nums text-stone-900">
                  {isFreeDelivery ? 'ফ্রি (৳০)' : `৳${deliveryCharge.toLocaleString('bn-BD')}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>সর্বমোট প্রদেয় টাকা:</span>
                <span className="text-amber-800 text-base tabular-nums">৳{grandTotal.toLocaleString('bn-BD')}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>অর্ডার কনফার্ম করুন (৳{grandTotal.toLocaleString('bn-BD')})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>নরসিংদীর তাঁত কারিগরদের সরাসরি সহায়তা করুন</span>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};
