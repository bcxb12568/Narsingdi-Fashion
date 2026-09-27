import React from 'react';
import { Order, StoreSettings } from '../../types';
import { X, Printer, Download, CheckCircle2, ArrowLeft } from 'lucide-react';

interface InvoiceModalProps {
  order: Order | null;
  settings: StoreSettings;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  order,
  settings,
  onClose
}) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls (Hidden in print) */}
        <div className="p-3 sm:p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50 print:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="flex items-center gap-1 text-xs font-bold text-stone-600 hover:text-amber-800 bg-white border border-stone-200 hover:bg-stone-100 px-2 py-1 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-700" />
              <span>← ফিরে যান</span>
            </button>
            <span className="font-semibold text-xs text-stone-800 hidden sm:inline">ইনভয়েস / চালান</span>
            <span className="text-[11px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-mono font-bold">
              {order.id}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট করুন (Print)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Paper Area */}
        <div id="printable-invoice" className="p-6 sm:p-8 bg-white text-stone-900 text-xs">
          
          {/* Invoice Header */}
          <div className="flex items-start justify-between border-b-2 border-stone-900 pb-5">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded border border-stone-300 overflow-hidden flex items-center justify-center bg-stone-50 shrink-0">
                  <img src={settings.logoUrl || "/logo.jpg"} alt="Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h1 className="font-serif-brand text-2xl font-bold tracking-tight text-stone-950">
                    NARSINGDI FASHION
                  </h1>
                  <p className="text-[11px] text-stone-600">নরসিংদীর ঐতিহ্যবাহী তাঁত ও পাইকারি কাপড়ের আড়ত</p>
                </div>
              </div>
              <div className="mt-2 text-[11px] text-stone-600 leading-tight">
                <div>{settings.storeAddress}</div>
                <div>মোবাইল: {settings.storePhone} · ইমেইল: {settings.storeEmail}</div>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-block px-3 py-1 bg-stone-900 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-sm mb-1">
                INVOICE / বিল মেমো
              </div>
              <div className="font-mono font-bold text-sm text-stone-900 mt-1">
                #{order.id}
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">
                তারিখ: {order.date}
              </div>
              <div className="text-[11px] mt-1">
                স্ট্যাটাস: <strong className="text-amber-800 uppercase">{order.status}</strong>
              </div>
            </div>
          </div>

          {/* Bill To & Courier Info */}
          <div className="grid grid-cols-2 gap-6 py-5 border-b border-stone-200">
            <div>
              <span className="font-bold text-stone-700 uppercase tracking-wider text-[10px] block mb-1">
                বিল টু (গ্রাহকের তথ্য):
              </span>
              <div className="font-bold text-sm text-stone-900">{order.customerName}</div>
              <div className="text-stone-700 mt-0.5">{order.address}, {order.district}</div>
              <div className="text-stone-700 mt-0.5">মোবাইল: <strong className="font-mono">{order.customerPhone}</strong></div>
              {order.customerEmail && <div className="text-stone-500">{order.customerEmail}</div>}
            </div>

            <div className="text-right">
              <span className="font-bold text-stone-700 uppercase tracking-wider text-[10px] block mb-1">
                পেমেন্ট ও ডেলিভারি বিবরণ:
              </span>
              <div>পদ্ধতি: <strong className="uppercase">{order.paymentMethod}</strong></div>
              <div>পেমেন্ট অবস্থা: <strong className={order.paymentStatus === 'Paid' ? 'text-emerald-700' : 'text-amber-800'}>{order.paymentStatus}</strong></div>
              {order.trxId && <div>TrxID: <span className="font-mono font-semibold">{order.trxId}</span></div>}
              {order.courier && (
                <div className="mt-1 pt-1 border-t border-stone-200 text-stone-700">
                  কুরিয়ার: <strong>{order.courier.provider}</strong> (ট্র্যাকিং: <span className="font-mono">{order.courier.trackingCode}</span>)
                </div>
              )}
            </div>
          </div>

          {/* Itemized Table */}
          <div className="mt-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-300 text-stone-700 font-bold uppercase text-[10px]">
                  <th className="py-2">ক্রম</th>
                  <th className="py-2">পণ্যের বিবরণ / ফেব্রিক</th>
                  <th className="py-2">প্রকার</th>
                  <th className="py-2 text-right">একক মূল্য</th>
                  <th className="py-2 text-center">পরিমাণ</th>
                  <th className="py-2 text-right">মোট টাকা</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-800">
                {order.items.map((item, idx) => {
                  const price = item.isWholesale ? item.product.wholesalePrice : item.product.retailPrice;
                  const itemTotal = price * item.quantity;
                  return (
                    <tr key={idx} className="hover:bg-stone-50">
                      <td className="py-2.5 font-mono">{idx + 1}</td>
                      <td className="py-2.5">
                        <div className="font-semibold text-stone-900">{item.product.titleBn}</div>
                        <div className="text-[10px] text-stone-500">{item.product.fabric}</div>
                        {(item.selectedSize || item.selectedColor) && (
                          <div className="text-[10px] text-amber-800">
                            {item.selectedSize && `সাইজ: ${item.selectedSize}`} {item.selectedColor && `· কালার: ${item.selectedColor}`}
                          </div>
                        )}
                      </td>
                      <td className="py-2.5">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${item.isWholesale ? 'bg-amber-100 text-amber-900' : 'bg-stone-100 text-stone-700'}`}>
                          {item.isWholesale ? 'পাইকারি লট' : 'খুচরা'}
                        </span>
                      </td>
                      <td className="py-2.5 text-right tabular-nums">৳{price.toLocaleString('bn-BD')}</td>
                      <td className="py-2.5 text-center font-bold tabular-nums">{item.quantity}</td>
                      <td className="py-2.5 text-right font-bold tabular-nums">৳{itemTotal.toLocaleString('bn-BD')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mt-4 pt-3 border-t-2 border-stone-300 flex justify-end">
            <div className="w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>পণ্যের সাবটোটাল:</span>
                <span className="font-semibold tabular-nums text-stone-900">৳{order.subtotal.toLocaleString('bn-BD')}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>হোম ডেলিভারি চার্জ:</span>
                <span className="font-semibold tabular-nums text-stone-900">৳{order.deliveryCharge.toLocaleString('bn-BD')}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>ডিসকাউন্ট:</span>
                  <span className="font-semibold tabular-nums">-৳{order.discount.toLocaleString('bn-BD')}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-900">
                <span>সর্বমোট প্রদেয় টাকা:</span>
                <span className="text-amber-800 font-mono text-base tabular-nums">৳{order.grandTotal.toLocaleString('bn-BD')}</span>
              </div>
            </div>
          </div>

          {/* Notes & Terms */}
          {order.notes && (
            <div className="mt-4 p-2 bg-stone-50 rounded border border-stone-200 text-[11px] text-stone-600">
              <strong>বিশেষ নোট:</strong> {order.notes}
            </div>
          )}

          {/* Footer Signature */}
          <div className="mt-10 pt-6 border-t border-stone-200 flex items-end justify-between text-[11px] text-stone-500">
            <div>
              <p>• কাপড় হাতে পাওয়ার পর দেখে নেওয়ার অনুরোধ রইল।</p>
              <p>• যেকোনো প্রয়োজনে আমাদের কাস্টমার কেয়ার নম্বরে কল করুন।</p>
            </div>
            <div className="text-center">
              <div className="w-32 border-b border-stone-400 mb-1"></div>
              <span>কর্তৃপক্ষের স্বাক্ষর ও সিল</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
