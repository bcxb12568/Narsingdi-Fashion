import React from 'react';
import { ArrowRight, ShoppingBag, Layers, Award, Sparkles, ShieldCheck } from 'lucide-react';
import { StoreSettings } from '../types';

interface HeroBannerProps {
  settings: StoreSettings;
  onOrderNow: () => void;
  onWholesaleClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  settings,
  onOrderNow,
  onWholesaleClick,
}) => {
  return (
    <section className="relative overflow-hidden bg-stone-950 text-white min-h-[580px] lg:min-h-[640px] flex items-center">
      {/* Background Photography with Luxury Scrim */}
      <div className="absolute inset-0">
        <img
          src="/src/assets/images/hero_narsingdi_loom_1790215205794.jpg"
          alt="Traditional Narsingdi Loom & Textiles"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark cinematic gradient scrim for strict 4.5:1 text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/85 to-stone-900/50" />
        <div className="absolute inset-0 bg-radial from-transparent via-stone-950/50 to-stone-950/80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            
            {/* Subtle Editorial Tagline */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>ঐতিহ্যবাহী তাঁত ও আধুনিক ফ্যাশন সমাহার</span>
              <span aria-hidden="true">·</span>
              <span>বাবুরহাট, নরসিংদী</span>
            </div>

            {/* Primary Bangla Headline */}
            <h1 className="font-serif-brand text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.18] text-balance">
              {settings.heroHeading || 'ফ্যাশনে নরসিংদী, সেরা পোশাকে আপনি!'}
            </h1>

            {/* Sub-text */}
            <p className="text-sm sm:text-base lg:text-lg text-stone-200/90 leading-relaxed max-w-xl font-normal">
              {settings.heroSubtext || 'সরাসরি নরসিংদীর সেরা তাঁত ও ট্রেন্ডি কাপড়ের বিশ্বস্ত অনলাইন শপ।'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <button
                onClick={onOrderNow}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-lg hover:shadow-amber-500/25 whitespace-nowrap cursor-pointer active:scale-98"
              >
                <ShoppingBag className="w-4 h-4 text-stone-950" />
                <span>অর্ডার করুন এখনই</span>
                <ArrowRight className="w-4 h-4 text-stone-950" />
              </button>

              <button
                onClick={onWholesaleClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-stone-900/80 hover:bg-stone-800 text-amber-200 border border-amber-500/40 hover:border-amber-400 font-semibold text-xs sm:text-sm rounded-xl backdrop-blur-sm transition-all whitespace-nowrap cursor-pointer active:scale-98"
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>পাইকারি ক্যাটালগ (Wholesale)</span>
              </button>
            </div>

            {/* Trust badges footer inside hero */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>১০০% খাঁটি নরসিংদী তাঁত ও সুতি কাপড়</span>
              </div>
              <span aria-hidden="true" className="hidden sm:inline text-stone-600">·</span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>সরাসরি তাঁতি ও মিল রেটে সরবরাহ</span>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Luxury Brand Emblem Plaque */}
          <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end">
            <div className="relative group max-w-xs sm:max-w-sm w-full">
              {/* Golden Ambient Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600/30 via-amber-400/20 to-amber-700/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-700"></div>

              {/* Plaque Card */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-stone-900/90 to-stone-950/95 border border-amber-500/40 shadow-2xl p-4 sm:p-5 backdrop-blur-md text-center">
                {/* Golden Badge Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10.5px] font-semibold mb-3">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>অফিশিয়াল ব্র্যান্ড লোগো ও সিল</span>
                </div>

                {/* Logo Image */}
                <div className="w-full aspect-square max-w-[260px] mx-auto rounded-xl overflow-hidden border border-amber-500/50 shadow-inner bg-stone-950">
                  <img
                    src={settings.logoUrl || "/logo.jpg"}
                    alt={`${settings.storeName || 'Narsingdi Fashion'} Official Brand Logo`}
                    className="w-full h-full object-cover object-center transform group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="mt-3.5 space-y-1">
                  <h3 className="font-serif-brand text-base sm:text-lg font-bold text-amber-100 tracking-wide">
                    {settings.storeName || "NARSINGDI FASHION"}
                  </h3>
                  <p className="text-[11px] text-stone-400 font-medium">
                    {settings.tagline || "ঐতিহ্যের বিশ্বস্ত প্রতীক · শতভাগ খাঁটি কোয়ালিটি"}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
