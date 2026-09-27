import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, isWholesale: boolean) => void;
  onRemoveItem: (productId: string, isWholesale: boolean) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => {
    const price = item.isWholesale ? item.product.wholesalePrice : item.product.retailPrice;
    return sum + (price * item.quantity);
  }, 0);

  const totalItemsCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl border-l border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF9F5]">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="flex items-center gap-1 text-xs font-bold text-stone-600 hover:text-amber-800 bg-stone-100 hover:bg-stone-200 px-2 py-1.5 rounded-lg transition-colors cursor-pointer"
              title="কেনাকাটায় ফিরুন"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-700" />
              <span>← ব্যাক</span>
            </button>
            <div className="flex items-center gap-1.5">
              <ShoppingBag className="w-4.5 h-4.5 text-amber-800" />
              <h2 className="font-serif-brand text-lg font-bold text-stone-900">
                শপিং ব্যাগ ({totalItemsCount})
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Free delivery notice bar */}
        <div className="px-5 py-2.5 bg-amber-50/70 border-b border-amber-200/60 text-xs text-amber-900 flex items-center justify-between">
          <span>🚚 ৫০০০ টাকার অর্ডারে সারা দেশে ফ্রি ডেলিভারি!</span>
          {subtotal < 5000 && subtotal > 0 && (
            <span className="font-semibold text-amber-800">
              আর ৳{(5000 - subtotal).toLocaleString('bn-BD')} বাকি
            </span>
          )}
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-base font-semibold text-stone-800">আপনার ব্যাগ খালি</p>
              <p className="text-xs text-stone-500 mt-1 max-w-xs">
                আমাদের ঐতিহ্যবাহী জামদানি, থ্রি-পিস ও পাঞ্জাবি কালেকশন থেকে পছন্দ করুন।
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-5 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors"
              >
                কেনাকাটা শুরু করুন
              </button>
            </div>
          ) : (
            items.map((item, idx) => {
              const unitPrice = item.isWholesale ? item.product.wholesalePrice : item.product.retailPrice;
              const itemTotal = unitPrice * item.quantity;

              return (
                <div 
                  key={`${item.product.id}-${item.isWholesale ? 'ws' : 'rt'}-${idx}`}
                  className="flex gap-3 p-3 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.titleBn}
                    className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-lg shrink-0 border border-stone-200"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-semibold text-stone-900 line-clamp-2 leading-snug">
                          {item.product.titleBn}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.isWholesale)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Metadata */}
                      <div className="text-[11px] text-stone-500 mt-1 flex flex-wrap items-center gap-1.5">
                        {item.isWholesale ? (
                          <span className="text-amber-800 font-semibold bg-amber-100/70 px-1.5 py-0.2 rounded text-[10px]">
                            পাইকারি লট রেট
                          </span>
                        ) : (
                          <span>খুচরা</span>
                        )}
                        {item.selectedSize && <span>· সাইজ: {item.selectedSize}</span>}
                        {item.selectedColor && <span>· কালার: {item.selectedColor}</span>}
                      </div>
                    </div>

                    {/* Stepper & Price */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200/60">
                      <div className="flex items-center border border-stone-300 rounded-md bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1, item.isWholesale)}
                          className="px-2 py-0.5 text-xs text-stone-700 hover:bg-stone-100 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-semibold tabular-nums text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.isWholesale)}
                          className="px-2 py-0.5 text-xs text-stone-700 hover:bg-stone-100 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-stone-900 tabular-nums">
                          ৳{itemTotal.toLocaleString('bn-BD')}
                        </span>
                        <div className="text-[10px] text-stone-500">
                          (৳{unitPrice.toLocaleString('bn-BD')} /পিস)
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-[#FAF9F5] space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-600">পণ্যের মোট মূল্য:</span>
              <span className="font-bold text-stone-900 tabular-nums">
                ৳{subtotal.toLocaleString('bn-BD')}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-500">
              <span>ডেলিভারি চার্জ:</span>
              <span>চেকআউটে নির্ধারিত হবে (৳৬০ / ৳১২০)</span>
            </div>

            <button
              onClick={() => {
                onProceedToCheckout();
                onClose();
              }}
              className="w-full py-3.5 px-4 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>অর্ডার সম্পন্ন করতে এগিয়ে যান</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>১০০% নিরাপদ চেকআউট · ক্যাশ অন ডেলিভারি সুবিধা</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
