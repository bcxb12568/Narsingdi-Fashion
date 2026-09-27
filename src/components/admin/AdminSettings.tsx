import React, { useState } from 'react';
import { StoreSettings } from '../../types';
import { 
  Save, 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  Layout, 
  Phone, 
  MapPin, 
  Upload, 
  Image as ImageIcon, 
  Link2, 
  Sparkles, 
  RotateCcw,
  Zap
} from 'lucide-react';

interface AdminSettingsProps {
  settings: StoreSettings;
  onUpdateSettings: (newSettings: StoreSettings) => void;
}

const PRESET_LOGOS = [
  { label: 'মূল গোল্ডেন সিল', url: '/logo.jpg', tag: 'গোল্ডেন এমব্লেম' },
  { label: 'তাঁত বুনন আর্ট', url: '/src/assets/images/hero_narsingdi_loom_1790215205794.jpg', tag: 'তাঁত কারখানা' },
  { label: 'জামদানি শাড়ি সিল', url: '/src/assets/images/product_jamdani_saree_1790215220685.jpg', tag: 'জামদানি' },
  { label: 'থ্রি-পিস সিল', url: '/src/assets/images/product_three_piece_1790215232415.jpg', tag: 'থ্রি-পিস' },
  { label: 'পাঞ্জাবি সিল', url: '/src/assets/images/product_mens_panjabi_1790215242348.jpg', tag: 'পাঞ্জাবি' },
];

export const AdminSettings: React.FC<AdminSettingsProps> = ({
  settings,
  onUpdateSettings
}) => {
  const [formData, setFormData] = useState<StoreSettings>({ ...settings });
  const [toastVisible, setToastVisible] = useState(false);

  const handleLogoFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 900;
        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.85);
          setFormData((prev) => ({ ...prev, logoUrl: compressed }));
        }
      };
      if (e.target?.result) {
        img.src = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(formData);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const currentLogo = formData.logoUrl || '/logo.jpg';

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-stone-900">
            স্টোর সেটিংস ও ব্র্যান্ডিং
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            ব্র্যান্ড লোগো পরিবর্তন, ব্যানার কাস্টমাইজেশন, ডেলিভারি চার্জ ও অর্ডার অটো-রিমুভ সেটিংস
          </p>
        </div>

        {toastVisible && (
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>সকল পরিবর্তন সফলভাবে সেভ হয়েছে!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        
        {/* 0. Brand Logo & Official Emblem Customization (লোগো পরিবর্তন) */}
        <div className="p-5 sm:p-6 bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-white rounded-2xl border-2 border-amber-500/50 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-950">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>১. অফিসিয়াল ব্র্যান্ড লোগো ও সিল পরিবর্তন</span>
            </div>
            <span className="text-[11px] font-semibold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300/60">
              হিরো ব্যানার, হেডার ও ইনভয়েস লোগো
            </span>
          </div>

          <p className="text-stone-600 text-xs">
            আপনার শোরুমের যেকোনো ছবি বা লোগো আপলোড করুন। এটি স্বয়ংক্রিয়ভাবে ওয়েবসাইটের হেডার, হিরো ব্যানার সিল এবং চালানে আপডেট হয়ে যাবে।
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Live Visual Previews */}
            <div className="md:col-span-5 flex flex-col sm:flex-row md:flex-col gap-4 items-center">
              
              {/* Plaque Card Preview (Matching Hero Banner exactly) */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-500/50 shadow-xl p-4 text-center w-full max-w-[240px]">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-semibold mb-2.5">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>অফিশিয়াল ব্র্যান্ড লোগো ও সিল</span>
                </div>
                
                <div className="w-full aspect-square max-w-[190px] mx-auto rounded-xl overflow-hidden border border-amber-500/60 shadow-inner bg-stone-950">
                  <img
                    src={currentLogo}
                    alt="Logo Preview"
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="mt-2.5 space-y-0.5">
                  <div className="font-serif-brand text-sm font-bold text-amber-100 tracking-wide">
                    {formData.storeName || 'NARSINGDI FASHION'}
                  </div>
                  <div className="text-[10px] text-stone-400 truncate">
                    {formData.tagline || 'ঐতিহ্যের বিশ্বস্ত প্রতীক'}
                  </div>
                </div>
              </div>

              {/* Header Preview */}
              <div className="p-3 bg-stone-100 rounded-xl border border-stone-200 text-center w-full max-w-[240px]">
                <span className="text-[10.5px] font-bold text-stone-700 block mb-1.5">হেডার বার প্রিভিউ:</span>
                <div className="inline-flex items-center gap-2 p-1.5 px-3 bg-white rounded-lg border border-stone-300 shadow-2xs">
                  <div className="w-7 h-7 rounded-md overflow-hidden border border-amber-600 bg-stone-900 shrink-0">
                    <img src={currentLogo} alt="Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <span className="font-serif-brand font-bold text-xs text-stone-900">
                    {formData.storeName || 'NARSINGDI FASHION'}
                  </span>
                </div>
              </div>

            </div>

            {/* Controls & Upload Area */}
            <div className="md:col-span-7 space-y-4">
              
              {/* Upload Button */}
              <div className="space-y-1.5">
                <label className="block font-bold text-stone-800">
                  ডিভাইস / গ্যালারি থেকে নতুন ছবি বা লোগো আপলোড করুন
                </label>
                <label className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-amber-300 hover:text-white font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer active:scale-98 border border-amber-500/40">
                  <Upload className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>গ্যালারি / ক্যামেরা থেকে লোগো ছবি দিন</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleLogoFileUpload(file);
                    }}
                  />
                </label>
                <p className="text-[10.5px] text-stone-500">
                  * মোবাইল থেকে ছবি তুলুন বা গ্যালারি থেকে সিলেক্ট করুন। সাইজ স্বয়ংক্রিয়ভাবে অপটিমাইজ হবে।
                </p>
              </div>

              {/* URL Input */}
              <div className="space-y-1.5">
                <label className="block font-bold text-stone-800">
                  অথবা ছবির অনলাইন লিঙ্ক (URL) পেস্ট করুন
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={formData.logoUrl?.startsWith('data:') ? '' : (formData.logoUrl || '')}
                    onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                    placeholder="https://example.com/your-logo.jpg"
                    className="w-full pl-8 pr-3 py-2 border border-stone-300 rounded-lg text-stone-900 bg-white focus:outline-none focus:border-amber-600 font-sans"
                  />
                  <Link2 className="w-4 h-4 text-stone-400 absolute left-2.5 top-2.5" />
                </div>
              </div>

              {/* Reset to Default Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, logoUrl: '/logo.jpg' })}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
                  <span>ডিফল্ট গোল্ডেন লোগো ফিরিয়ে আনুন</span>
                </button>
              </div>

              {/* Preset Sample Logos */}
              <div className="pt-2 border-t border-amber-200/60">
                <span className="text-[11px] font-bold text-stone-700 block mb-2">
                  অথবা রেডিমেড নরসিংদী লোগো ও আর্টওয়ার্ক থেকে বেছে নিন:
                </span>
                <div className="flex flex-wrap gap-2">
                  {PRESET_LOGOS.map((preset) => (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() => setFormData({ ...formData, logoUrl: preset.url })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                        (formData.logoUrl || '/logo.jpg') === preset.url
                          ? 'bg-amber-700 text-white shadow-xs font-bold'
                          : 'bg-white border border-stone-300 text-stone-800 hover:bg-amber-50'
                      }`}
                    >
                      <span>{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
        
        {/* 1. Hero & Banner Customization */}
        <div className="p-5 sm:p-6 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 border-b border-stone-200 pb-2">
            <Layout className="w-4 h-4 text-amber-700" />
            <span>২. সাইট ব্যানার ও শিরোনাম কনফিগারেশন</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                শীর্ষ ব্যানার নোটিশ (Top Announcement Bar)
              </label>
              <input
                type="text"
                value={formData.bannerNotice}
                onChange={(e) => setFormData({ ...formData, bannerNotice: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                মেইন হিরো হেডিং (Hero Heading Overlay Text) *
              </label>
              <input
                type="text"
                required
                value={formData.heroHeading}
                onChange={(e) => setFormData({ ...formData, heroHeading: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                সাব-হেডিং টেক্সট (Sub-text) *
              </label>
              <textarea
                rows={2}
                required
                value={formData.heroSubtext}
                onChange={(e) => setFormData({ ...formData, heroSubtext: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
              />
            </div>
          </div>
        </div>

        {/* 2. Delivery Charges Setup */}
        <div className="p-5 sm:p-6 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 border-b border-stone-200 pb-2">
            <Truck className="w-4 h-4 text-amber-700" />
            <span>২. ডেলিভারি চার্জ সেটআপ (সারা বাংলাদেশ)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                নরসিংদী জেলার ভেতরে ডেলিভারি চার্জ (৳)
              </label>
              <input
                type="number"
                value={formData.deliveryInsideNarsingdi}
                onChange={(e) => setFormData({ ...formData, deliveryInsideNarsingdi: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                নরসিংদীর বাইরে / সারা বাংলাদেশে (৳)
              </label>
              <input
                type="number"
                value={formData.deliveryOutsideNarsingdi}
                onChange={(e) => setFormData({ ...formData, deliveryOutsideNarsingdi: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                ফ্রি ডেলিভারি অফার লিমিট (৳)
              </label>
              <input
                type="number"
                value={formData.freeDeliveryOver}
                onChange={(e) => setFormData({ ...formData, freeDeliveryOver: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 font-mono font-bold"
              />
            </div>
          </div>
        </div>

        {/* 3. bKash / Payment Gateway Configuration */}
        <div className="p-5 sm:p-6 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 border-b border-stone-200 pb-2">
            <CreditCard className="w-4 h-4 text-amber-700" />
            <span>৩. বিকাশ ও নগদ পেমেন্ট গেটওয়ে কনফিগারেশন</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                বিকাশ মার্চেন্ট / পার্সোনাল নম্বর
              </label>
              <input
                type="text"
                value={formData.bkashNumber}
                onChange={(e) => setFormData({ ...formData, bkashNumber: e.target.value })}
                className="w-full px-3 py-2 border border-[#E2136E]/40 focus:border-[#E2136E] rounded-lg text-stone-900 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                নগদ মার্চেন্ট / পার্সোনাল নম্বর
              </label>
              <input
                type="text"
                value={formData.nagadNumber}
                onChange={(e) => setFormData({ ...formData, nagadNumber: e.target.value })}
                className="w-full px-3 py-2 border border-[#F7941D]/40 focus:border-[#F7941D] rounded-lg text-stone-900 font-mono font-bold"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.allowCod}
                onChange={(e) => setFormData({ ...formData, allowCod: e.target.checked })}
                className="w-4 h-4 text-amber-600 rounded"
              />
              <span className="font-semibold text-stone-800">
                ক্যাশ অন ডেলিভারি (Cash on Delivery) চালু রাখুন
              </span>
            </label>
          </div>
        </div>

        {/* 4. Store Info & Contact */}
        <div className="p-5 sm:p-6 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 border-b border-stone-200 pb-2">
            <MapPin className="w-4 h-4 text-amber-700" />
            <span>৪. শোরুমের ঠিকানা ও যোগাযোগের তথ্য</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                হেল্পলাইন ফোন নম্বর
              </label>
              <input
                type="text"
                value={formData.storePhone}
                onChange={(e) => setFormData({ ...formData, storePhone: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                অফিসিয়াল ইমেইল
              </label>
              <input
                type="email"
                value={formData.storeEmail}
                onChange={(e) => setFormData({ ...formData, storeEmail: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              বাবুরহাট শোরুম ও আড়তের ঠিকানা
            </label>
            <input
              type="text"
              value={formData.storeAddress}
              onChange={(e) => setFormData({ ...formData, storeAddress: e.target.value })}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
            />
          </div>
        </div>

        {/* 5. Secret Admin Password Settings */}
        <div className="p-5 sm:p-6 bg-white rounded-2xl border border-amber-300/80 shadow-2xs space-y-4 bg-gradient-to-br from-amber-500/5 via-white to-stone-50">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 border-b border-stone-200 pb-2">
            <span className="text-base">🔒</span>
            <span>৫. সিক্রেট অ্যাডমিন পাসওয়ার্ড (Secret Password)</span>
          </div>

          <div className="max-w-md">
            <label className="block font-semibold text-stone-700 mb-1">
              অ্যাডমিন প্যানেলে প্রবেশের গোপন পাসওয়ার্ড
            </label>
            <input
              type="text"
              value={formData.adminPassword || 'narsingdi123'}
              onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
              placeholder="যেমন: narsingdi123"
              className="w-full px-3 py-2 border border-amber-400/80 rounded-lg text-stone-900 font-mono font-bold bg-white focus:ring-2 focus:ring-amber-500"
            />
            <p className="text-[11px] text-stone-500 mt-1">
              * পাবলিক ভিজিটররা যাতে অ্যাডমিনে ঢুকতে না পারে সেজন্য এই পাসওয়ার্ড গোপন রাখুন। ডিফল্ট: <strong>narsingdi123</strong>
            </p>
          </div>
        </div>

        {/* 6. Order Management & Auto-Remove Configuration */}
        <div className="p-5 sm:p-6 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 border-b border-stone-200 pb-2">
            <Zap className="w-4 h-4 text-amber-700" />
            <span>৬. অর্ডার ডেলিভারি ও অটো-রিমুভ কনফিগারেশন</span>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-amber-50/50 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={formData.autoRemoveDeliveredOrders ?? true}
                onChange={(e) => setFormData({ ...formData, autoRemoveDeliveredOrders: e.target.checked })}
                className="w-4 h-4 mt-0.5 text-amber-600 rounded border-stone-300 focus:ring-amber-500 cursor-pointer"
              />
              <div>
                <span className="font-bold text-stone-900 block text-xs">
                  ডেলিভারি সম্পন্ন (Delivered) হলে অ্যাক্টিভ তালিকা থেকে স্বয়ংক্রিয়ভাবে রিমুভ / আর্কাইভ করুন
                </span>
                <span className="text-[11px] text-stone-600 leading-relaxed block mt-0.5">
                  চালু থাকলে কোনো অর্ডার 'Delivered' মার্ক করার সাথে সাথে অ্যাক্টিভ তালিকা থেকে সরিয়ে ফেলা হবে, যাতে নতুন ও অপেক্ষমাণ অর্ডারগুলোর কাজে সুবিধা হয়। (প্রয়োজনে যে কোনো সময় 'ডেলিভার্ড আর্কাইভ' ট্যাবে দেখা বা চিরতরে ডিলিট করা যাবে)।
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer active:scale-98"
          >
            <Save className="w-4 h-4" />
            <span>সকল পরিবর্তন সেভ করুন</span>
          </button>
        </div>

      </form>
    </div>
  );
};
