import { Product, Order, Customer, GoogleReview, StoreSettings } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // 1. জামদানি ও সুতি শাড়ি
  {
    id: 'prod-jamdani-01',
    titleBn: 'রয়াল নরসিংদী সোনালী জরি জামদানি শাড়ি',
    titleEn: 'Royal Narsingdi Golden Zari Jamdani Saree',
    category: 'jamdani-saree',
    categoryNameBn: 'জামদানি ও সুতি শাড়ি',
    retailPrice: 4200,
    wholesalePrice: 3200,
    minWholesaleQty: 4,
    stock: 28,
    fabric: '১০০% পিওর কটন ও হাই কোয়ালিটি রেশম সুতা',
    description: 'নরসিংদীর প্রখ্যাত তাঁতিদের হাতে বোনা খাঁটি জামদানি শাড়ি। সোনালী জরি সুতায় নিখুঁত ঐতিহ্যবাহী নকশা এবং নরম আরামদায়ক ফেব্রিক যা যেকোনো উৎসব ও বিয়েতে পরা যায়।',
    image: '/src/assets/images/product_jamdani_saree_1790215220685.jpg',
    rating: 4.9,
    reviewsCount: 240,
    isNew: true,
    isBestseller: true,
    isPinned: true,
    sizes: ['১২ হাত বহর (ব্লাউজ পিস সহ)'],
    colors: ['রয়াল মেরুন ও গোল্ডেন', 'কালো ও সোনালী', 'ফিরোজা ব্লু', 'অফ হোয়াইট'],
    features: ['হাতে বোনা নরসিংদীর তাঁত', 'ব্লাউজ পিস সংযুক্ত', 'কালার গ্যারান্টি', 'প্রিমিয়াম ফিনিশিং']
  },
  {
    id: 'prod-jamdani-02',
    titleBn: 'নরসিংদী পিওর কটন তাঁত শাড়ি (দৈনন্দিন পরা)',
    titleEn: 'Traditional Narsingdi Tant Cotton Daily Saree',
    category: 'jamdani-saree',
    categoryNameBn: 'জামদানি ও সুতি শাড়ি',
    retailPrice: 1350,
    wholesalePrice: 950,
    minWholesaleQty: 6,
    stock: 65,
    fabric: '১০০% খাঁটি নরসিংদী সুতি (৮০ কাউন্ট)',
    description: 'গরমে অত্যন্ত আরামদায়ক ও নরম পিওর সুতি তাঁত শাড়ি। নরসিংদীর বাবুরহাটের মূল তাঁত থেকে সরাসরি সংগৃহীত, যা ধোয়ার পরও কুঁচকে যায় না এবং রং দীর্ঘস্থায়ী।',
    image: '/src/assets/images/product_jamdani_saree_1790215220685.jpg',
    rating: 4.8,
    reviewsCount: 185,
    isNew: false,
    isBestseller: true,
    sizes: ['১২ হাত স্ট্যান্ডার্ড বহর'],
    colors: ['হালকা আকাশি ও নীল পাড়', 'হলুদ ও লাল পাড়', 'সবুজ ও গোলাপি'],
    features: ['৮০ কাউন্ট মিহি সুতি', '১০০% আরামদায়ক', 'রং ওঠার ভয় নেই']
  },
  {
    id: 'prod-jamdani-03',
    titleBn: 'হাফ-সিল্ক ঢাকাই বুটি জামদানি স্পেশাল',
    titleEn: 'Half-Silk Dhakai Buti Jamdani Festive Edition',
    category: 'jamdani-saree',
    categoryNameBn: 'জামদানি ও সুতি শাড়ি',
    retailPrice: 2850,
    wholesalePrice: 2150,
    minWholesaleQty: 4,
    stock: 42,
    fabric: 'হাফ সিল্ক ও রেশমি সুতা',
    description: 'চকচকে ও সফট ফল ফিনিশিং সহ হাফ সিল্ক জামদানি। হালকা ওজনের হওয়ায় যেকোনো পার্টিতে সারাদিন স্বাচ্ছন্দ্যে পরা যায়।',
    image: '/src/assets/images/product_jamdani_saree_1790215220685.jpg',
    rating: 4.9,
    reviewsCount: 94,
    isNew: true,
    isBestseller: false,
    sizes: ['১২ হাত স্ট্যান্ডার্ড'],
    colors: ['ম্যাজেন্টা ও সোনালী', 'নেভি ব্লু', 'বটল গ্রিন'],
    features: ['হালকা ও আকর্ষণীয় শাইন', 'পার্টি ও উৎসব উপযোগী', 'সহজে কুঁচি বসে']
  },

  // 2. প্রিমিয়াম থ্রি-পিস ও আনস্টিচড ফেব্রিক
  {
    id: 'prod-threepiece-01',
    titleBn: 'প্রিমিয়াম নরসিংদী এমব্রয়ডারি লাক্সারি কটন থ্রি-পিস',
    titleEn: 'Premium Narsingdi Embroidered Luxury Cotton Three-Piece',
    category: 'three-piece',
    categoryNameBn: 'প্রিমিয়াম থ্রি-পিস ও আনস্টিচড ফেব্রিক',
    retailPrice: 2450,
    wholesalePrice: 1750,
    minWholesaleQty: 5,
    stock: 50,
    fabric: 'পিওর প্রিমিয়াম কটন ও অরগাঞ্জা ওড়না',
    description: 'গলায় গর্জিয়াস ভারী হাতের কাজ ও এমব্রয়ডারি ডিজাইন সহ আনস্টিচড কামিজ, সফট কটন সালোয়ার এবং আকর্ষণীয় ৫ হাত ডিজিটাল প্রিন্ট ওড়না।',
    image: '/src/assets/images/product_three_piece_1790215232415.jpg',
    rating: 5.0,
    reviewsCount: 310,
    isNew: true,
    isBestseller: true,
    sizes: ['আনস্টিচড (যেকোনো সাইজে সেলাই করা যাবে)'],
    colors: ['ল্যাভেন্ডার প্যাস্টেল', 'পীচ পিংক', 'মিন্ট গ্রিন', 'আইভরি ক্রিম'],
    features: ['ভারী কারচুপির কাজ', '৫ হাত সম্পূর্ণ ওড়না', '১০০% কালার ফাস্টনেস', 'প্রিমিয়াম কাপড়']
  },
  {
    id: 'prod-threepiece-02',
    titleBn: 'নরসিংদী তাঁত ব্লক ও বাটিক প্রিমিয়াম থ্রি-পিস',
    titleEn: 'Narsingdi Tant Hand Block & Batik Three-Piece Collection',
    category: 'three-piece',
    categoryNameBn: 'প্রিমিয়াম থ্রি-পিস ও আনস্টিচড ফেব্রিক',
    retailPrice: 1650,
    wholesalePrice: 1150,
    minWholesaleQty: 6,
    stock: 75,
    fabric: '১০০% পিওর নরসিংদী তাঁত কটন',
    description: 'নরসিংদীর ঐতিহ্যবাহী হাতে করা কাঠের ব্লকের নিখুঁত প্রিন্ট। প্রতিটি থ্রি-পিসে দেশীয় ঐতিহ্যের ছোঁয়া। গরমে অফিসে বা বাইরে পরার জন্য সেরা পছন্দ।',
    image: '/src/assets/images/product_three_piece_1790215232415.jpg',
    rating: 4.8,
    reviewsCount: 160,
    isNew: false,
    isBestseller: true,
    sizes: ['আনস্টিচড ফ্রি সাইজ'],
    colors: ['মাস্টার্ড ইয়েলো', 'মেরুন ও ব্ল্যাক', 'রয়াল ইন্ডিগো'],
    features: ['হাতে করা ব্লক প্রিন্ট', '১০০% নরসিংদী সুতি', 'টেকসই ও বাতাস চলাচল করে']
  },
  {
    id: 'prod-threepiece-03',
    titleBn: 'ডিজিটাল প্রিন্ট লন কটন থ্রি-পিস (মায়াবতী কালেকশন)',
    titleEn: 'Digital Print Premium Lawn Three-Piece Set',
    category: 'three-piece',
    categoryNameBn: 'প্রিমিয়াম থ্রি-পিস ও আনস্টিচড ফেব্রিক',
    retailPrice: 1950,
    wholesalePrice: 1400,
    minWholesaleQty: 5,
    stock: 36,
    fabric: 'সফট লাক্সারি লন কটন',
    description: 'ট্রেন্ডি আধুনিক ফুলেল ডিজিটাল প্রিন্ট এবং সুন্দর লেস বর্ডার সহ এক্সক্লুসিভ কালেকশন। তরুণী ও গৃহিণীদের পছন্দের তালিকায় শীর্ষ।',
    image: '/src/assets/images/product_three_piece_1790215232415.jpg',
    rating: 4.9,
    reviewsCount: 88,
    isNew: true,
    isBestseller: false,
    sizes: ['আনস্টিচড'],
    colors: ['স্কাই ব্লু', 'গোলাপি ফ্লোরাল', 'সরিষা হলুদ'],
    features: ['হাই-ডেফিনিশন ডিজিটাল প্রিন্ট', 'প্রিমিয়াম সুতি ওড়না', 'কুঁচকে যায় না']
  },

  // 3. পুরুষদের পাঞ্জাবি ও কটন শার্ট
  {
    id: 'prod-panjabi-01',
    titleBn: 'নরসিংদী হ্যান্ডলুম সুতি প্রিমিয়াম ডিজাইনার পাঞ্জাবি',
    titleEn: 'Narsingdi Handloom Cotton Designer Panjabi',
    category: 'panjabi',
    categoryNameBn: 'পুরুষদের পাঞ্জাবি ও কটন শার্ট',
    retailPrice: 1850,
    wholesalePrice: 1250,
    minWholesaleQty: 5,
    stock: 45,
    fabric: '১০০% নরসিংদীর সুতি তাঁতের সুতা',
    description: 'আভিজাত্যপূর্ণ কলার ও প্ল্যাকেটে সূক্ষ্ম সুতার এমব্রয়ডারি ওয়ার্ক। সেমি-ফিটেড আধুনিক কাটিং ও মেটাল বাটন সম্বলিত এই পাঞ্জাবি ঈদের নামায ও পারিবারিক আয়োজনে দেবে আলাদা মর্যাদা।',
    image: '/src/assets/images/product_mens_panjabi_1790215242348.jpg',
    rating: 4.9,
    reviewsCount: 220,
    isNew: true,
    isBestseller: true,
    sizes: ['৩৮ (M)', '৪০ (L)', '৪২ (XL)', '৪৪ (XXL)'],
    colors: ['অফ হোয়াইট ও গোল্ডেন সুতা', 'নেভি ব্লু', 'কালো', 'অলিভ গ্রিন'],
    features: ['১০০% নরসিংদী হ্যান্ডলুম সুতি', 'মেটাল বাটন ও ফিনিশিং', 'আরামদায়ক সেমি-ফিট', 'কালার ১০০% পাকা']
  },
  {
    id: 'prod-panjabi-02',
    titleBn: 'নরসিংদী খাঁটি খাদি কটন ক্যাজুয়াল পাঞ্জাবি',
    titleEn: 'Authentic Narsingdi Khadi Cotton Casual Panjabi',
    category: 'panjabi',
    categoryNameBn: 'পুরুষদের পাঞ্জাবি ও কটন শার্ট',
    retailPrice: 1250,
    wholesalePrice: 850,
    minWholesaleQty: 8,
    stock: 60,
    fabric: 'নরসিংদী পিওর খাদি কটন',
    description: 'সহজ সরল অথচ দৃষ্টিনন্দন খাঁটি খাদি পাঞ্জাবি। যেকোনো আবহাওয়ায় চমৎকার অনুভূতি দেয়। সাইড পকেট ও কাঠের বোতামের নকশা।',
    image: '/src/assets/images/product_mens_panjabi_1790215242348.jpg',
    rating: 4.8,
    reviewsCount: 140,
    isNew: false,
    isBestseller: true,
    sizes: ['৩৮ (M)', '৪০ (L)', '৪২ (XL)'],
    colors: ['প্রাকৃতিক খাদি অফ-হোয়াইট', 'ধূসর গ্রে', 'হালকা নীল'],
    features: ['খাঁটি দেশীয় খাদি ফেব্রিক', 'কাঠের বাটন', 'ডাবল সাইড পকেট']
  },
  {
    id: 'prod-panjabi-03',
    titleBn: 'নরসিংদী হ্যান্ডলুম কটন ক্যাজুয়াল ফর্মাল শার্ট',
    titleEn: 'Narsingdi Handloom Cotton Casual Formal Shirt',
    category: 'panjabi',
    categoryNameBn: 'পুরুষদের পাঞ্জাবি ও কটন শার্ট',
    retailPrice: 1100,
    wholesalePrice: 750,
    minWholesaleQty: 6,
    stock: 50,
    fabric: '১০০% নরসিংদী সুতি স্ট্রাইপ ও চেক',
    description: 'গরমে অফিস এবং প্রতিদিনের কাজের জন্য অত্যন্ত বাতাস চলাচলযোগ্য আরামদায়ক নরসিংদীর হ্যান্ডলুম শার্ট। নিখুঁত সেলাই ও আধুনিক কলার।',
    image: '/src/assets/images/product_mens_panjabi_1790215242348.jpg',
    rating: 4.7,
    reviewsCount: 95,
    isNew: true,
    isBestseller: false,
    sizes: ['M (38)', 'L (40)', 'XL (42)'],
    colors: ['স্কাই ব্লু চেক', 'হোয়াইট স্ট্রাইপ', 'প্যাস্টেল পিংক'],
    features: ['১০০% নরসিংদী সুতি', 'ঘাম শোষণকারী', 'সহজে ইস্ত্রি হয়']
  },

  // 4. পাইকারি লট/বাল্ক অর্ডার
  {
    id: 'prod-wholesale-01',
    titleBn: 'নরসিংদী বাবুরহাট হোলসেল শাড়ি লট (১২ পিস বান্ডেল)',
    titleEn: 'Narsingdi Baburhat Wholesale Saree Lot (12 Pcs Bundle)',
    category: 'wholesale',
    categoryNameBn: 'পাইকারি লট/বাল্ক অর্ডার',
    retailPrice: 15600,
    wholesalePrice: 10800,
    minWholesaleQty: 1,
    stock: 25,
    fabric: 'নরসিংদী পিওর কটন ও হাফসিল্ক মিক্সড লট',
    description: 'সরাসরি নরসিংদীর এশিয়ার বৃহত্তম কাপড়ের হাট "বাবুরহাট / শেখেরচর" থেকে সরাসরি শোরুম ও অনলাইন বিক্রেতাদের জন্য প্রস্তুত ১২ পিস শাড়ির স্পেশাল লট। প্রতিটি লটে রয়েছে ভিন্ন ভিন্ন কালার ও আকর্ষণীয় ট্রেন্ডি ডিজাইন।',
    image: '/src/assets/images/product_wholesale_fabrics_1790215253441.jpg',
    rating: 5.0,
    reviewsCount: 420,
    isNew: true,
    isBestseller: true,
    sizes: ['১২ পিস ফুল সেট বান্ডেল (১২ হাত)'],
    colors: ['১২ টি আকর্ষণীয় ভিন্ন ভিন্ন কালার ও ডিজাইন'],
    features: ['বাবুরহাট হোলসেল প্রাইস রেট', '১০০% কালার গ্যারান্টি', 'দোকানদার ও রিসেলারদের সর্বোচ্চ লাভ', 'নিরাপদ প্যাকেজিং']
  },
  {
    id: 'prod-wholesale-02',
    titleBn: 'পাইকারি আনস্টিচড সুতি থ্রি-পিস মাস্টার বেল (২৪ পিস)',
    titleEn: 'Wholesale Unstitched Cotton Three-Piece Master Bale (24 Pcs)',
    category: 'wholesale',
    categoryNameBn: 'পাইকারি লট/বাল্ক অর্ডার',
    retailPrice: 38400,
    wholesalePrice: 26400,
    minWholesaleQty: 1,
    stock: 18,
    fabric: '১০০% কটন এমব্রয়ডারি ও ব্লক থ্রি-পিস',
    description: 'শোরুম, বুটিক শপ এবং ফেসবুক পেজ বিক্রেতাদের জন্য সেরা লাভজনক থ্রি-পিস লট। প্রতিটি বক্সে থাকবে রানিং বেস্টসেলার ডিজাইনের ২৪টি আনস্টিচড থ্রি-পিস।',
    image: '/src/assets/images/product_wholesale_fabrics_1790215253441.jpg',
    rating: 4.9,
    reviewsCount: 280,
    isNew: false,
    isBestseller: true,
    sizes: ['২৪ পিস মাস্টার বক্স প্যাক'],
    colors: ['মাল্টিকালার ট্রেন্ডি কালেকশন'],
    features: ['প্রতি পিসে গড়ে ৮০০-১০০০ টাকা রিটেল প্রফিট', 'নরসিংদী মিল রেট', 'অনলাইন বিজনেস রেডি ছবি সরবরাহ']
  },
  {
    id: 'prod-wholesale-03',
    titleBn: 'প্রিমিয়াম নরসিংদী পাঞ্জাবি হোলসেল লট (১০ পিস)',
    titleEn: 'Premium Narsingdi Panjabi Wholesale Bundle (10 Pcs)',
    category: 'wholesale',
    categoryNameBn: 'পাইকারি লট/বাল্ক অর্ডার',
    retailPrice: 16500,
    wholesalePrice: 11000,
    minWholesaleQty: 1,
    stock: 30,
    fabric: 'হ্যান্ডলুম সুতি ও কটন লিনেন',
    description: 'সব সাইজের মিক্সড (M-38, L-40, XL-42, XXL-44) ১০ পিস প্রিমিয়াম এমব্রয়ডারি করা পাঞ্জাবি বান্ডেল। প্রতিটি পাঞ্জাবির সাথে রয়েছে নিজস্ব ব্র্যান্ডেড হ্যাঙ্গার ও পলিব্যাগ।',
    image: '/src/assets/images/product_wholesale_fabrics_1790215253441.jpg',
    rating: 4.9,
    reviewsCount: 190,
    isNew: true,
    isBestseller: false,
    sizes: ['১০ পিস বান্ডেল (সাইজ ৩৮-৪৪ মিক্সড)'],
    colors: ['হোয়াইট, নেভি, মেরুন, ব্ল্যাক ও অলিভ'],
    features: ['রেডিমেড ব্র্যান্ডেড প্যাকেট', 'শোরুম কোয়ালিটি ফিনিশিং', 'দ্রুত সারা দেশে কুরিয়ার সুবিধা']
  }
];

export const INITIAL_REVIEWS: GoogleReview[] = [
  {
    id: 'rev-01',
    author: 'তানিয়া রহমান',
    city: 'মিরপুর, ঢাকা',
    rating: 5,
    date: '৩ দিন আগে',
    comment: 'নরসিংদী ফ্যাশন থেকে সোনালী জরি জামদানি শাড়িটা নিলাম। সত্যি বলছি ছবির চেয়ে সামনাসামনি আরও সুন্দর! কাপড়ের কোয়ালিটি অত্যন্ত নরম ও সুতা খুব সূক্ষ্ম। ২ দিনেই ডেলিভারি পেয়েছি।',
    isGoogleVerified: true,
    isApproved: true,
    avatarText: 'TR',
    productTitle: 'রয়াল নরসিংদী সোনালী জরি জামদানি শাড়ি',
    reply: 'ধন্যবাদ তানিয়া আপু! আপনার সুন্দর মন্তব্যে আমরা কৃতজ্ঞ।'
  },
  {
    id: 'rev-02',
    author: 'মোহাম্মদ রফিকুল ইসলাম (বুটিক ওনার)',
    city: 'আগ্রাবাদ, চট্টগ্রাম',
    rating: 5,
    date: '৫ দিন আগে',
    comment: 'আমরা চট্টগ্রামের বুটিক শপের জন্য পাইকারি বাবুরহাট শাড়ির ২৪ পিসের লট নিয়েছিলাম। কাপড়ের কোয়ালিটি মাশাল্লাহ ১০০% খাঁটি নরসিংদীর তাঁত। ডেলিভারি ও প্যাকিং দারুণ ছিল। কাস্টমাররা খুব পছন্দ করেছে।',
    isGoogleVerified: true,
    isApproved: true,
    avatarText: 'RI',
    productTitle: 'নরসিংদী বাবুরহাট হোলসেল শাড়ি লট'
  },
  {
    id: 'rev-03',
    author: 'ফারহানা ইসলাম সুমি',
    city: 'উপশহর, সিলেট',
    rating: 5,
    date: '১ সপ্তাহ আগে',
    comment: 'এমব্রয়ডারি থ্রি-পিসটা নেওয়ার পর ধুয়ে দেখেছি, এতটুকু রং ওঠেনি কিংবা সুতা ছোট হয়নি। পিওর সুতি নরসিংদীর কাপড়ের সুনাম এমনি এমনি নয়!',
    isGoogleVerified: true,
    isApproved: true,
    avatarText: 'FS',
    productTitle: 'প্রিমিয়াম নরসিংদী এমব্রয়ডারি লাক্সারি কটন থ্রি-পিস',
    reply: 'অনেক অনেক ধন্যবাদ আপু, সবসময় নরসিংদী ফ্যাশনের সাথেই থাকবেন।'
  },
  {
    id: 'rev-04',
    author: 'ইঞ্জিনিয়ার তানভীর মাহমুদ',
    city: 'উত্তরা, ঢাকা',
    rating: 5,
    date: '২ সপ্তাহ আগে',
    comment: 'হ্যান্ডলুম সুতি পাঞ্জাবি অর্ডার করেছিলাম। সাইজ ৩৮ একদম নিখুঁত ফিটিং হয়েছে। কলারের ফিনিশিং ও মেটাল বোতাম দেখতে অসাধারণ। অফিসের ফ্রাইডে ক্যাজুয়াল কিংবা পারিবারিক অনুষ্ঠানে বেস্ট।',
    isGoogleVerified: true,
    isApproved: true,
    avatarText: 'TM',
    productTitle: 'নরসিংদী হ্যান্ডলুম সুতি প্রিমিয়াম ডিজাইনার পাঞ্জাবি'
  },
  {
    id: 'rev-05',
    author: 'সেলিনা আক্তার',
    city: 'শেখেরচর, নরসিংদী',
    rating: 5,
    date: '৩ সপ্তাহ আগে',
    comment: 'আমি নিজে নরসিংদীর মানুষ হয়েও বলব, তাদের কাপড়ের সিলেকশন ও প্রিমিয়াম ফিনিশিং অসাধারণ। হোম ডেলিভারি সার্ভিসও খুব ফাস্ট।',
    isGoogleVerified: true,
    isApproved: true,
    avatarText: 'SA',
    productTitle: 'নরসিংদী পিওর কটন তাঁত শাড়ি'
  },
  {
    id: 'rev-06',
    author: 'কবির হোসেন (অনলাইন উদ্যোক্তা)',
    city: 'রাজশাহী সদর',
    rating: 4,
    date: '১ মাস আগে',
    comment: '১০ পিসের পাঞ্জাবি হোলসেল বান্ডেল নিয়ে অনলাইন বিক্রি শুরু করেছি। আলহামদুলিল্লাহ ৩ দিনের মধ্যে সব বিক্রি হয়ে গেছে! পরবর্তী অর্ডার খুব তাড়াতাড়ি দিব।',
    isGoogleVerified: true,
    isApproved: true,
    avatarText: 'KH',
    productTitle: 'প্রিমিয়াম নরসিংদী পাঞ্জাবি হোলসেল লট'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'NF-9842',
    date: '২৩ সেপ্টেম্বর, ২০২৬ - ০২:৪৫ PM',
    customerName: 'নুসরাত জাহান স্বর্ণা',
    customerPhone: '01711223344',
    customerEmail: 'nusrat.swarna@gmail.com',
    address: 'বাড়ি নং ৪২, রোড ৭, সেক্টর ৪, উত্তরা',
    district: 'ঢাকা',
    paymentMethod: 'bkash',
    paymentStatus: 'Paid',
    trxId: 'BK9X77A23Q',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        isWholesale: false,
        selectedColor: 'রয়াল মেরুন ও গোল্ডেন'
      },
      {
        product: INITIAL_PRODUCTS[3],
        quantity: 1,
        isWholesale: false,
        selectedColor: 'ল্যাভেন্ডার প্যাস্টেল'
      }
    ],
    subtotal: 6650,
    deliveryCharge: 60,
    discount: 0,
    grandTotal: 6710,
    status: 'Processing',
    courier: {
      provider: 'Steadfast',
      trackingCode: 'STF-8492048',
      status: 'Consignment Placed',
      bookedAt: '২৩ সেপ্টেম্বর, ২০২৬'
    },
    notes: 'অনুগ্রহ করে সুন্দর গিফট বক্সিং করবেন।'
  },
  {
    id: 'NF-9841',
    date: '২৩ সেপ্টেম্বর, ২০২৬ - ১১:১৫ AM',
    customerName: 'আহমেদ জুবায়ের (রিসেলার)',
    customerPhone: '01822334455',
    customerEmail: 'zubair.fashion@yahoo.com',
    address: 'দোকান নং ১২, কাপুড়িয়া পট্টি মার্কেট',
    district: 'নরসিংদী',
    paymentMethod: 'cod',
    paymentStatus: 'Pending',
    items: [
      {
        product: INITIAL_PRODUCTS[9],
        quantity: 1,
        isWholesale: true
      }
    ],
    subtotal: 10800,
    deliveryCharge: 60,
    discount: 0,
    grandTotal: 10860,
    status: 'Pending',
    notes: 'বাবুরহাট শোরুম থেকে সরাসরি পিকআপ অথবা ডেলিভারি দিবেন।'
  },
  {
    id: 'NF-9839',
    date: '২২ সেপ্টেম্বর, ২০২৬ - ০৫:২০ PM',
    customerName: 'ড. মাহবুবুল আলম',
    customerPhone: '01933445566',
    address: 'রোড ৫, নাসিরাবাদ হাউজিং সোসাইটি',
    district: 'চট্টগ্রাম',
    paymentMethod: 'nagad',
    paymentStatus: 'Paid',
    trxId: 'NG84288X99',
    items: [
      {
        product: INITIAL_PRODUCTS[6],
        quantity: 2,
        isWholesale: false,
        selectedSize: '৪০ (L)',
        selectedColor: 'অফ হোয়াইট ও গোল্ডেন সুতা'
      }
    ],
    subtotal: 3700,
    deliveryCharge: 120,
    discount: 100,
    grandTotal: 3720,
    status: 'Shipped',
    courier: {
      provider: 'Pathao',
      trackingCode: 'PTH-9923847',
      status: 'In Transit to CTG Hub',
      bookedAt: '২২ সেপ্টেম্বর, ২০২৬'
    }
  },
  {
    id: 'NF-9830',
    date: '২১ সেপ্টেম্বর, ২০২৬ - ১০:১০ AM',
    customerName: 'সাদিয়া আফরিন',
    customerPhone: '01644556677',
    address: 'হাউজ ২১, শিবগঞ্জ রোড',
    district: 'সিলেট',
    paymentMethod: 'cod',
    paymentStatus: 'Paid',
    items: [
      {
        product: INITIAL_PRODUCTS[1],
        quantity: 2,
        isWholesale: false,
        selectedColor: 'হালকা আকাশি ও নীল পাড়'
      }
    ],
    subtotal: 2700,
    deliveryCharge: 120,
    discount: 0,
    grandTotal: 2820,
    status: 'Delivered',
    courier: {
      provider: 'Steadfast',
      trackingCode: 'STF-7832109',
      status: 'Delivered & Cash Collected',
      bookedAt: '২১ সেপ্টেম্বর, ২০২৬'
    }
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-01',
    name: 'নুসরাত জাহান স্বর্ণা',
    phone: '01711223344',
    email: 'nusrat.swarna@gmail.com',
    district: 'ঢাকা',
    address: 'বাড়ি নং ৪২, রোড ৭, সেক্টর ৪, উত্তরা',
    totalOrders: 3,
    totalSpent: 14850,
    registeredDate: '১৫ আগস্ট, ২০২৬',
    lastOrderDate: '২৩ সেপ্টেম্বর, ২০২৬'
  },
  {
    id: 'cust-02',
    name: 'আহমেদ জুবায়ের (রিসেলার)',
    phone: '01822334455',
    email: 'zubair.fashion@yahoo.com',
    district: 'নরসিংদী',
    address: 'দোকান নং ১২, কাপুড়িয়া পট্টি মার্কেট',
    totalOrders: 5,
    totalSpent: 64500,
    registeredDate: '০১ জুন, ২০২৬',
    lastOrderDate: '২৩ সেপ্টেম্বর, ২০২৬'
  },
  {
    id: 'cust-03',
    name: 'ড. মাহবুবুল আলম',
    phone: '01933445566',
    district: 'চট্টগ্রাম',
    address: 'রোড ৫, নাসিরাবাদ হাউজিং সোসাইটি',
    totalOrders: 2,
    totalSpent: 7420,
    registeredDate: '১০ সেপ্টেম্বর, ২০২৬',
    lastOrderDate: '২২ সেপ্টেম্বর, ২০২৬'
  },
  {
    id: 'cust-04',
    name: 'সাদিয়া আফরিন',
    phone: '01644556677',
    district: 'সিলেট',
    address: 'হাউজ ২১, শিবগঞ্জ রোড',
    totalOrders: 1,
    totalSpent: 2820,
    registeredDate: '২০ সেপ্টেম্বর, ২০২৬',
    lastOrderDate: '২১ সেপ্টেম্বর, ২০২৬'
  }
];

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'NARSINGDI FASHION',
  tagline: 'ঐতিহ্যবাহী তাঁত ও আধুনিক ফ্যাশন',
  heroHeading: 'ফ্যাশনে নরসিংদী, সেরা পোশাকে আপনি!',
  heroSubtext: 'সরাসরি নরসিংদীর সেরা তাঁত ও ট্রেন্ডি কাপড়ের বিশ্বস্ত অনলাইন শপ।',
  storePhone: '+880 1712-345678',
  storeEmail: 'contact@narsingdifashion.com',
  storeAddress: 'শেখেরচর বাবুরহাট কাপড়ের বাজার, মাধবদী, নরসিংদী, বাংলাদেশ',
  deliveryInsideNarsingdi: 60,
  deliveryOutsideNarsingdi: 120,
  freeDeliveryOver: 5000,
  bkashNumber: '01712-345678 (মার্চেন্ট)',
  nagadNumber: '01812-345678 (মার্চেন্ট)',
  allowCod: true,
  bannerNotice: 'সারা বাংলাদেশে ২-৩ দিনে দ্রুততম ডেলিভারি ও ক্যাশ অন ডেলিভারি সুবিধা!',
  adminPassword: 'narsingdi123'
};

export const initialProducts = INITIAL_PRODUCTS;
export const initialReviews = INITIAL_REVIEWS;
export const initialOrders = INITIAL_ORDERS;
export const initialCustomers = INITIAL_CUSTOMERS;
export const initialSettings = INITIAL_SETTINGS;
