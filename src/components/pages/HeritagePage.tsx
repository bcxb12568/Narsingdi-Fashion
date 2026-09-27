import React from 'react';
import { StoreSettings } from '../../types';
import { 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Building2,
  ArrowRight
} from 'lucide-react';

interface HeritagePageProps {
  settings: StoreSettings;
  onGoToShop: () => void;
}

export const HeritagePage: React.FC<HeritagePageProps> = ({
  settings,
  onGoToShop
}) => {
  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-in fade-in duration-300">
      
      {/* Top Banner / Hero of Heritage */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-stone-100 shadow-xl border border-stone-800">
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/hero_narsingdi_loom_1790215205794.jpg"
            alt="Narsingdi Loom Heritage"
            className="w-full h-full object-cover opacity-35"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
        </div>

        <div className="relative p-6 sm:p-10 lg:p-14 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>প্রাচ্যের ম্যানচেস্টার · বাবুরহাট, নরসিংদী</span>
              </div>

              <h1 className="font-serif-brand text-3xl sm:text-5xl font-bold text-white leading-tight">
                নরসিংদীর ঐতিহ্যবাহী তাঁত ও আমাদের পরিচিতি
              </h1>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl">
                বাংলাদেশের বস্ত্র রাজধানীর শতবর্ষের বুনন ঐতিহ্য, গ্রামীণ তাঁতিদের নিখুঁত শৈল্পিক কারুকাজ এবং আধুনিক ফ্যাশনকে এক সুতোয় বেঁধেছে <strong>NARSINGDI FASHION</strong>।
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onGoToShop}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer active:scale-98"
                >
                  <span>পোশাক কালেকশন দেখুন</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={`tel:${settings.storePhone}`}
                  className="px-5 py-3 bg-stone-800/80 hover:bg-stone-700 text-white font-semibold text-xs rounded-xl border border-stone-700 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>হেল্পলাইন: {settings.storePhone}</span>
                </a>
              </div>
            </div>

            {/* Brand Logo Emblem */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-amber-500/60 shadow-2xl bg-stone-950 p-1 shrink-0">
                <img
                  src={settings.logoUrl || "/logo.jpg"}
                  alt="Narsingdi Fashion Emblem"
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Grid: Story & History of Baburhat */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <div className="inline-block text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md">
            ইতিহাস ও বুনন গৌরব
          </div>
          <h2 className="font-serif-brand text-2xl sm:text-4xl font-bold text-stone-900 leading-snug">
            কেন নরসিংদীর কাপড় সারা দেশে সেরা?
          </h2>
          <p className="text-sm text-stone-700 leading-relaxed">
            মেঘনা নদীর অববাহিকায় গড়ে ওঠা নরসিংদীর শেখেরচর বাবুরহাট হলো দক্ষিণ এশিয়ার অন্যতম বৃহত্তম কাপড়ের পাইকারি বাজার। ব্রিটিশ আমল থেকেই এখানকার সুতা প্রক্রিয়াজাতকরণ এবং খাঁটি সুতি তাঁতের কাপড় দেশজুড়ে সমাদৃত।
          </p>
          <p className="text-sm text-stone-700 leading-relaxed">
            আমরা মধ্যস্বত্বভোগী বা দালালের চক্র ভেঙে সরাসরি স্থানীয় তাঁতপল্লী ও দক্ষ কারিগরদের থেকে জামদানি শাড়ি, সুতি থ্রি-পিস ও হ্যান্ডলুম পাঞ্জাবি সংগ্রহ করি। ফলে একদিকে যেমন কাপড় ১০০% অরিজিনাল থাকে, অন্যদিকে আপনি পান বাজারের সবচেয়ে সাশ্রয়ী মূল্য।
          </p>

          {/* Key Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-1">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                <Award className="w-4 h-4 text-amber-700" />
                <span>১০০% খাঁটি সুতি ও তন্তুবুনন</span>
              </div>
              <p className="text-[11px] text-stone-500">
                কোনো প্লাস্টিক পলিয়েস্টার বা নিম্নমানের মিশ্রণ ছাড়াই নিখুঁত কাপড়।
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-1">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>রং ও স্থায়িত্বের পূর্ণ নিশ্চয়তা</span>
              </div>
              <p className="text-[11px] text-stone-500">
                সরাসরি ডাইং ও ফিনিশিং হওয়ায় ১০০% পাকা রং ও দীর্ঘস্থায়ী আরাম।
              </p>
            </div>
          </div>
        </div>

        {/* Visual photo grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-md border border-stone-200">
              <img
                src="/src/assets/images/product_jamdani_saree_1790215217435.jpg"
                alt="নরসিংদী জামদানি শাড়ি"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-[11px] text-amber-900 font-medium">
              ✨ ঐতিহ্যবাহী রেশম ও জরি মিশ্রিত জামদানি
            </div>
          </div>
          <div className="space-y-4 pt-6">
            <div className="p-3 bg-stone-100 rounded-xl border border-stone-200 text-[11px] text-stone-700 font-medium">
              🧵 ১০০% হ্যান্ডলুম ও পাওয়ারলুম ফিনিশিং
            </div>
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-md border border-stone-200">
              <img
                src="/src/assets/images/product_mens_panjabi_1790215242348.jpg"
                alt="নরসিংদী সুতি পাঞ্জাবি"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wholesale & Bulk Buying Guide for Retailers */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 text-stone-100 rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-xl space-y-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold mb-3 border border-amber-500/30">
            <Layers className="w-3.5 h-3.5" />
            <span>পাইকারি ও বাল্ক অর্ডার সুবিধা</span>
          </div>
          <h3 className="font-serif-brand text-2xl sm:text-3xl font-bold text-white">
            দোকানি ও অনলাইন উদ্যোক্তাদের জন্য পাইকারি লট
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
            আপনি কি বুটিক শপ চালান বা ফেসবুক লাইভে কাপড় বিক্রি করেন? নরসিংদীর সরাসরি আড়ত ও তাঁত রেটে মাত্র ৪-৬ পিসের লট অর্ডার করুন। সারা দেশে কুরিয়ারে ক্যাশ অন ডেলিভারিতে দ্রুত পৌঁছে যাবে।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-stone-800/80 p-4 rounded-xl border border-stone-700 space-y-1.5">
            <div className="text-amber-400 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>সর্বনিম্ন ৪-৬ পিসের লট</span>
            </div>
            <p className="text-stone-400">
              বড় পুঁজি ছাড়া মাত্র কয়েক পিস দিয়েই নতুন ব্যবসা শুরু করতে পারবেন।
            </p>
          </div>

          <div className="bg-stone-800/80 p-4 rounded-xl border border-stone-700 space-y-1.5">
            <div className="text-amber-400 font-bold flex items-center gap-1.5">
              <Truck className="w-4 h-4" />
              <span>সরাসরি কুরিয়ার হোম ডেলিভারি</span>
            </div>
            <p className="text-stone-400">
              Steadfast, Pathao ও RedX এর মাধ্যমে সমগ্র বাংলাদেশের প্রতিটি জেলায় ডেলিভারি।
            </p>
          </div>

          <div className="bg-stone-800/80 p-4 rounded-xl border border-stone-700 space-y-1.5">
            <div className="text-amber-400 font-bold flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span>বাবুরহাট আড়ত ভিজিট</span>
            </div>
            <p className="text-stone-400">
              সরাসরি আমাদের আড়তে এসে কাপড় যাচাই করে নেওয়ার সুবিধা রয়েছে।
            </p>
          </div>
        </div>
      </div>

      {/* Showroom & Contact Details */}
      <div className="p-6 sm:p-8 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-6">
        <div>
          <h3 className="font-serif-brand text-xl sm:text-2xl font-bold text-stone-900">
            আমাদের শো-রুম ও যোগাযোগ কেন্দ্র
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            যেকোনো জিজ্ঞাসা, বাল্ক অর্ডার বা পরামর্শের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-800 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm">শো-রুমের ঠিকানা</h4>
              <p className="text-stone-600 mt-1 leading-relaxed">
                {settings.storeAddress}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-800 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm">হটলাইন ও হোয়াটসঅ্যাপ</h4>
              <p className="text-stone-600 mt-1">
                কল করুন: <a href={`tel:${settings.storePhone}`} className="font-bold text-amber-800 underline">{settings.storePhone}</a>
              </p>
              <p className="text-stone-500 text-[11px] mt-0.5">সকাল ৯:০০ - রাত ১০:০০ পর্যন্ত</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-800 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm">অফিসিয়াল ইমেইল</h4>
              <p className="text-stone-600 mt-1">
                <a href={`mailto:${settings.storeEmail}`} className="text-stone-700 hover:text-amber-800">
                  {settings.storeEmail}
                </a>
              </p>
              <p className="text-stone-500 text-[11px] mt-0.5">ব্যবসা ও বাল্ক ইনকোয়ারির জন্য</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
