import React from 'react';
import { StoreSettings } from '../types';
import { Phone, Mail, MapPin, Truck, ShieldCheck, Heart, Lock, BookOpen, Star } from 'lucide-react';
import { AppPage } from './Header';

interface FooterProps {
  settings: StoreSettings;
  onNavigatePage: (page: AppPage) => void;
  onSelectCategory: (cat: string) => void;
  onOpenTrackOrder: () => void;
  onOpenAdminLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigatePage,
  onSelectCategory,
  onOpenTrackOrder,
  onOpenAdminLogin
}) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl overflow-hidden border border-amber-500/80 bg-stone-950 shadow-md flex items-center justify-center shrink-0">
                <img 
                  src={settings.logoUrl || "/logo.jpg"} 
                  alt="Narsingdi Fashion Logo" 
                  className="w-full h-full object-cover object-center" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-serif-brand text-xl font-bold tracking-tight text-white block leading-tight">
                  NARSINGDI FASHION
                </span>
                <span className="text-[10px] text-amber-400/80 block mt-0.5">
                  ঐতিহ্যবাহী তাঁত ও আধুনিক ফ্যাশন
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              সরাসরি নরসিংদীর সেরা তাঁত ও ট্রেন্ডি কাপড়ের বিশ্বস্ত অনলাইন শপ ও পাইকারি বাজার। ঐতিহ্যবাহী সুতি, জামদানি ও আধুনিক পোশাকের সমাহার।
            </p>

            <div className="pt-2 text-xs text-amber-400/90 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>১০০% খাঁটি ও কালার গ্যারান্টিযুক্ত কাপড়</span>
            </div>
          </div>

          {/* Quick Links / Pages & Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              নেভিগেশন ও কালেকশন
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => {
                    onNavigatePage('products');
                    onSelectCategory('jamdani-saree');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  জামদানি ও সুতি শাড়ি
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigatePage('products');
                    onSelectCategory('three-piece');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  প্রিমিয়াম থ্রি-পিস ও আনস্টিচড লন
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigatePage('products');
                    onSelectCategory('panjabi');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  পুরুষদের পাঞ্জাবি ও কটন শার্ট
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigatePage('products');
                    onSelectCategory('wholesale');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors text-left text-amber-300 font-semibold cursor-pointer"
                >
                  📦 পাইকারি লট / বাল্ক অর্ডার (Wholesale)
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => {
                    onNavigatePage('heritage');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer text-stone-300"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>নরসিংদীর ঐতিহ্য ও পরিচিতি</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigatePage('reviews');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer text-stone-300"
                >
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                  <span>গ্রাহক রিভিউ ও রেটিং</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTrackOrder}
                  className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5 pt-1 text-white cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5 text-amber-400" />
                  <span>লাইভ অর্ডার ট্র্যাকিং</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & Address */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              যোগাযোগ ও শো-রুম
            </h4>
            <ul className="space-y-3 text-xs text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{settings.storeAddress}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${settings.storePhone}`} className="hover:text-amber-400">
                  {settings.storePhone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${settings.storeEmail}`} className="hover:text-amber-400">
                  {settings.storeEmail}
                </a>
              </li>
            </ul>
          </div>

          {/* Delivery & Payment Partners */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              পেমেন্ট ও কুরিয়ার পার্টনার
            </h4>
            <div className="space-y-3">
              <div className="text-xs text-stone-400">
                নিরাপদ ডিজিটাল পেমেন্ট ও ক্যাশ অন ডেলিভারি:
              </div>
              
              {/* Payment badges */}
              <div className="flex flex-wrap gap-2 text-[11px] font-medium text-stone-300">
                <span className="px-2.5 py-1 rounded bg-stone-800 border border-stone-700">বিকাশ (bKash)</span>
                <span className="px-2.5 py-1 rounded bg-stone-800 border border-stone-700">নগদ (Nagad)</span>
                <span className="px-2.5 py-1 rounded bg-stone-800 border border-stone-700">ক্যাশ অন ডেলিভারি</span>
                <span className="px-2.5 py-1 rounded bg-stone-800 border border-stone-700">ভিসা / মাস্টারকার্ড</span>
              </div>

              <div className="text-xs text-stone-400 pt-2">
                কুরিয়ার ডেলিভারি পার্টনার:
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] font-medium text-stone-300">
                <span className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700 text-emerald-400">Steadfast Courier</span>
                <span className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700 text-rose-400">Pathao Courier</span>
                <span className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700 text-amber-400">RedX</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line with subtle secret admin trigger */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} NARSINGDI FASHION. সর্বস্বত্ব সংরক্ষিত।
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-stone-400">
              <span>নরসিংদীর তাঁত শিল্পের গর্ব ও ঐতিহ্য নিয়ে তৈরি</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </div>

            {/* Secret Admin Login Link (গোপন স্টাফ লগইন) */}
            <button
              onClick={onOpenAdminLogin}
              className="text-[11px] text-stone-500 hover:text-stone-300 transition-colors flex items-center gap-1 cursor-pointer"
              title="স্টাফ / সিক্রেট অ্যাডমিন এক্সেস"
            >
              <Lock className="w-3 h-3 text-stone-500" />
              <span>স্টাফ পোর্টাল</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
