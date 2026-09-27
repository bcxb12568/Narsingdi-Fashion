import React from 'react';
import { Truck, Sparkles, CreditCard, RotateCcw } from 'lucide-react';

export const FeatureHighlights: React.FC = () => {
  const features = [
    {
      icon: Truck,
      title: 'দ্রুত হোম ডেলিভারি',
      desc: 'সারা বাংলাদেশে ২-৩ দিনে আপনার দরজায় ডেলিভারি।'
    },
    {
      icon: Sparkles,
      title: '১০০% খাঁটি কাপড়',
      desc: 'নরসিংদীর ঐতিহ্যবাহী তাঁত ও প্রিমিয়াম ফেব্রিক গ্যারান্টি।'
    },
    {
      icon: CreditCard,
      title: 'নিরাপদ পেমেন্ট',
      desc: 'ক্যাশ অন ডেলিভারি, বিকাশ, নগদ ও কার্ডে সহজ পেমেন্ট।'
    },
    {
      icon: RotateCcw,
      title: 'সহজ এক্সচেঞ্জ নীতি',
      desc: 'কাপড় হাতে পেয়ে দেখে নেওয়ার পূর্ণ সন্তুষ্টির নিশ্চয়তা।'
    }
  ];

  return (
    <section className="bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="flex items-start gap-4 p-4 rounded-xl bg-white/80 border border-stone-200/80 shadow-2xs hover:shadow-xs transition-shadow"
              >
                <div className="w-11 h-11 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 text-amber-800">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-stone-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
