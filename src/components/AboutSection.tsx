import React from 'react';
import { Award, HeartHandshake, ShieldCheck, MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="bg-[#FAF9F5] border-t border-stone-200 py-16 sm:py-20 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Visual Showcase */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-stone-200">
              <img
                src="/src/assets/images/hero_narsingdi_loom_1790215205794.jpg"
                alt="Narsingdi Loom Heritage"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Quiet heritage card floating */}
            <div className="absolute -bottom-6 -right-4 sm:bottom-6 sm:-right-6 bg-white p-5 rounded-2xl border border-amber-200/80 shadow-md max-w-xs">
              <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider mb-1">
                <MapPin className="w-4 h-4" />
                <span>বাবুরহাট, নরসিংদী</span>
              </div>
              <p className="text-xs text-stone-700 leading-snug">
                এশিয়ার বৃহত্তম পাইকারি কাপড়ের হাটের কেন্দ্রবিন্দু থেকে আসল খাঁটি বস্ত্র।
              </p>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                আমাদের ঐতিহ্য ও গল্প
              </span>
              <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mt-1 leading-snug">
                নরসিংদীর তাঁত শিল্পের বিশ্বস্ত নাম
              </h2>
            </div>

            <p className="text-sm text-stone-700 leading-relaxed">
              নরসিংদীকে বলা হয় বাংলাদেশের বস্ত্র রাজধানী বা প্রাচ্যের ম্যানচেস্টার। শেখেরচর বাবুরহাট ও মাধবদীর তাঁত পল্লীর দক্ষ কারিগরদের প্রজন্ম থেকে প্রজন্মে বয়ে চলা ঐতিহ্য ও নৈপুণ্যের নির্যাস নিয়ে তৈরি <strong>NARSINGDI FASHION</strong>।
            </p>

            <p className="text-sm text-stone-700 leading-relaxed">
              আমরা মধ্যস্বত্বভোগীদের এড়িয়ে সরাসরি নরসিংদীর গ্রামীণ তাঁতিদের কাঠের তাঁত ও আধুনিক টেক্সটাইল মিল থেকে প্রিমিয়াম জামদানি, খাঁটি সুতি শাড়ি, থ্রি-পিস ও পাঞ্জাবি সারা দেশের ফ্যাশন সচেতন ক্রেতা এবং পাইকারি ব্যবসায়ীদের কাছে পৌঁছে দিচ্ছি।
            </p>

            {/* Trust points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">শতভাগ নিজস্ব তাঁত সংগৃহীত</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">কোনো কৃত্রিম বা নকল সুতার মিশ্রণ নেই।</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">তাঁত কারিগরদের ন্যায্য মূল্য</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">আপনার প্রতিটি কেনাকাটা তাঁতি পরিবারকে স্বাবলম্বী করে।</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
