import React, { useState } from 'react';
import { Product, ProductCategory } from '../../types';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  ArrowUpToLine, 
  Pin, 
  PinOff, 
  Sparkles, 
  Package, 
  X, 
  Check,
  Upload,
  Image as ImageIcon,
  Link2
} from 'lucide-react';

const PRESET_FABRIC_IMAGES = [
  { label: 'জামদানি শাড়ি', url: '/src/assets/images/product_jamdani_saree_1790215220685.jpg', tag: 'জামদানি' },
  { label: 'থ্রি-পিস কালেকশন', url: '/src/assets/images/product_three_piece_1790215232415.jpg', tag: 'থ্রি-পিস' },
  { label: 'পুরুষদের পাঞ্জাবি', url: '/src/assets/images/product_mens_panjabi_1790215242348.jpg', tag: 'পাঞ্জাবি' },
  { label: 'পাইকারি কাপড় লট', url: '/src/assets/images/product_wholesale_fabrics_1790215253441.jpg', tag: 'পাইকারি' },
  { label: 'তাঁতের খাঁটি বুনন', url: '/src/assets/images/hero_narsingdi_loom_1790215205794.jpg', tag: 'তাঁত' },
];

interface AdminProductsProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateStock: (productId: string, newStock: number) => void;
  onDeleteProduct: (productId: string) => void;
  onMoveToTop: (productId: string) => void;
  onTogglePin: (productId: string) => void;
  onMoveOrder: (productId: string, direction: 'up' | 'down') => void;
  onUpdateProduct?: (product: Product) => void;
}

export const AdminProducts: React.FC<AdminProductsProps> = ({
  products,
  onAddProduct,
  onUpdateStock,
  onDeleteProduct,
  onMoveToTop,
  onTogglePin,
  onMoveOrder,
  onUpdateProduct
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Form State for new/edit product
  const [titleBn, setTitleBn] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [category, setCategory] = useState<ProductCategory>('jamdani-saree');
  const [retailPrice, setRetailPrice] = useState(2500);
  const [wholesalePrice, setWholesalePrice] = useState(1800);
  const [minWholesaleQty, setMinWholesaleQty] = useState(5);
  const [stock, setStock] = useState(50);
  const [fabric, setFabric] = useState('১০০% খাঁটি নরসিংদী সুতি তাঁত');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('/src/assets/images/product_jamdani_saree_1790215220685.jpg');
  const [pinToTop, setPinToTop] = useState(false);

  // Filter products
  const filteredProducts = products.filter(p => {
    if (categoryFilter === 'pinned') {
      if (!p.isPinned) return false;
    } else if (categoryFilter !== 'all' && p.category !== categoryFilter) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.titleBn.toLowerCase().includes(q) ||
        p.titleEn.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q)
      );
    }

    return true;
  });

  const getCategoryNameBn = (cat: ProductCategory) => {
    switch (cat) {
      case 'jamdani-saree': return 'জামদানি ও সুতি শাড়ি';
      case 'three-piece': return 'প্রিমিয়াম থ্রি-পিস ও আনস্টিচড ফেব্রিক';
      case 'panjabi': return 'পুরুষদের পাঞ্জাবি ও কটন শার্ট';
      case 'wholesale': return 'পাইকারি লট/বাল্ক অর্ডার';
    }
  };

  const handleImageFileUpload = (file: File) => {
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
          const compressed = canvas.toDataURL('image/jpeg', 0.82);
          setImage(compressed);
        }
      };
      if (e.target?.result) {
        img.src = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleOpenAddModal = () => {
    setTitleBn('');
    setTitleEn('');
    setCategory('jamdani-saree');
    setRetailPrice(2500);
    setWholesalePrice(1800);
    setMinWholesaleQty(5);
    setStock(50);
    setFabric('১০০% খাঁটি নরসিংদী সুতি তাঁত');
    setDescription('');
    setImage('/src/assets/images/product_jamdani_saree_1790215220685.jpg');
    setPinToTop(true); // default to placing new products on top
    setModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setTitleBn(product.titleBn);
    setTitleEn(product.titleEn);
    setCategory(product.category);
    setRetailPrice(product.retailPrice);
    setWholesalePrice(product.wholesalePrice);
    setMinWholesaleQty(product.minWholesaleQty);
    setStock(product.stock);
    setFabric(product.fabric);
    setDescription(product.description);
    setImage(product.image);
    setPinToTop(!!product.isPinned);
    setEditModalOpen(true);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleBn) return;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      titleBn,
      titleEn: titleEn || titleBn,
      category,
      categoryNameBn: getCategoryNameBn(category),
      retailPrice: Number(retailPrice),
      wholesalePrice: Number(wholesalePrice),
      minWholesaleQty: Number(minWholesaleQty),
      stock: Number(stock),
      fabric,
      description: description || 'নরসিংদীর ঐতিহ্যবাহী তাঁত থেকে সংগৃহীত প্রিমিয়াম কাপড়।',
      image,
      rating: 5.0,
      reviewsCount: 1,
      isNew: true,
      isPinned: pinToTop,
      pinnedAt: pinToTop ? Date.now() : undefined
    };

    onAddProduct(newProd);
    setModalOpen(false);
  };

  const handleSaveEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const updated: Product = {
      ...editingProduct,
      titleBn,
      titleEn,
      category,
      categoryNameBn: getCategoryNameBn(category),
      retailPrice: Number(retailPrice),
      wholesalePrice: Number(wholesalePrice),
      minWholesaleQty: Number(minWholesaleQty),
      stock: Number(stock),
      fabric,
      description,
      image,
      isPinned: pinToTop
    };

    if (onUpdateProduct) {
      onUpdateProduct(updated);
    }
    setEditModalOpen(false);
    setEditingProduct(null);
  };

  const pinnedCount = products.filter(p => p.isPinned).length;

  return (
    <div className="space-y-6">
      
      {/* Header with Explanatory Highlight */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-stone-900">
              পোশাক ও পজিশন ব্যবস্থাপনা
            </h2>
            <span className="bg-amber-100 text-amber-900 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-amber-300">
              {products.length} টি পোশাক
            </span>
          </div>
          <p className="text-xs text-stone-600 mt-1">
            যেকোনো পোশাক <span className="font-bold text-amber-900">"🔝 সবার ওপরে তুলুন"</span> বা <span className="font-bold text-amber-900">"📌 পিন"</span> করে স্টোরের একদম শুরুতে প্রদর্শন করুন।
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>নতুন কাপড় যোগ করুন</span>
        </button>
      </div>

      {/* Reorder Tips Box */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent border-l-4 border-amber-600 p-3.5 rounded-r-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-700">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>টিপস:</strong> আপনি যে পণ্যটি বেশি বিক্রি করতে চান বা প্রমোট করতে চান, তার পাশে থাকা <strong>"🔝 ওপরে তুলুন"</strong> বাটনে ক্লিক করলেই সেটি ওয়েবসাইটে সবার আগে দৃশ্যমান হবে।
          </span>
        </div>
        {pinnedCount > 0 && (
          <div className="font-semibold text-amber-900 shrink-0 flex items-center gap-1">
            <Pin className="w-3.5 h-3.5 fill-amber-600 text-amber-700" />
            <span>{pinnedCount} টি পণ্য শীর্ষে পিন করা আছে</span>
          </div>
        )}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: `সকল কাপড় (${products.length})` },
            { id: 'pinned', label: `📌 শীর্ষে রাখা (${pinnedCount})` },
            { id: 'jamdani-saree', label: 'জামদানি ও শাড়ি' },
            { id: 'three-piece', label: 'থ্রি-পিস' },
            { id: 'panjabi', label: 'পাঞ্জাবি ও শার্ট' },
            { id: 'wholesale', label: 'পাইকারি লট' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCategoryFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap cursor-pointer transition-all ${
                categoryFilter === tab.id
                  ? 'bg-stone-900 text-amber-300 font-bold shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="পোশাকের নাম দিয়ে খুঁজুন..."
            className="w-full pl-9 pr-4 py-1.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-amber-600"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2" />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-100/80 border-b border-stone-200 text-stone-700 font-bold uppercase text-[10.5px]">
                <th className="py-3 px-3 w-16 text-center">পজিশন</th>
                <th className="py-3 px-4">পোশাক ও বিবরণ</th>
                <th className="py-3 px-4">ক্যাটাগরি ও ফেব্রিক</th>
                <th className="py-3 px-4 text-right">খুচরা মূল্য</th>
                <th className="py-3 px-4 text-right">পাইকারি মূল্য (লট)</th>
                <th className="py-3 px-3 text-center">স্টক</th>
                <th className="py-3 px-4 text-center">শীর্ষে রাখার অপশন</th>
                <th className="py-3 px-3 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredProducts.map((product) => {
                // Find actual global index in products array
                const globalIndex = products.findIndex(p => p.id === product.id);
                const isFirst = globalIndex === 0;
                const isLast = globalIndex === products.length - 1;

                return (
                  <tr 
                    key={product.id} 
                    className={`transition-colors ${
                      product.isPinned 
                        ? 'bg-amber-50/40 hover:bg-amber-50/70' 
                        : 'hover:bg-stone-50/80'
                    }`}
                  >
                    
                    {/* 1. Global Position Badge */}
                    <td className="py-3 px-3 text-center align-middle">
                      <div className="flex flex-col items-center justify-center">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                          isFirst
                            ? 'bg-amber-500 text-stone-950 shadow-xs'
                            : product.isPinned
                              ? 'bg-amber-200 text-amber-900'
                              : 'bg-stone-100 text-stone-600'
                        }`}>
                          #{globalIndex + 1}
                        </span>
                        {isFirst && (
                          <span className="text-[9px] text-amber-800 font-bold mt-0.5">শীর্ষে</span>
                        )}
                      </div>
                    </td>

                    {/* 2. Image & Title */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          <img
                            src={product.image}
                            alt={product.titleBn}
                            className="w-13 h-13 object-cover rounded-xl border border-stone-200"
                          />
                          {product.isPinned && (
                            <div className="absolute -top-1.5 -right-1.5 bg-amber-500 text-stone-950 p-0.5 rounded-full shadow-xs" title="শীর্ষে পিন করা">
                              <Pin className="w-3 h-3 fill-stone-950" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-stone-900 text-sm leading-snug">
                              {product.titleBn}
                            </span>
                            {product.isPinned && (
                              <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-sans shrink-0">
                                📌 পিনকৃত
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                            ID: {product.id}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 3. Category & Fabric */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-stone-800 text-[11px]">
                        {product.categoryNameBn}
                      </div>
                      <div className="text-[10.5px] text-stone-500 truncate max-w-[160px]">
                        {product.fabric}
                      </div>
                    </td>

                    {/* 4. Retail Price */}
                    <td className="py-3 px-4 text-right font-bold tabular-nums text-stone-900">
                      ৳{product.retailPrice.toLocaleString('bn-BD')}
                    </td>

                    {/* 5. Wholesale Price */}
                    <td className="py-3 px-4 text-right tabular-nums">
                      <div className="font-bold text-amber-900">
                        ৳{product.wholesalePrice.toLocaleString('bn-BD')}
                      </div>
                      <div className="text-[10px] text-stone-500">
                        মিনিমাম {product.minWholesaleQty} পিস
                      </div>
                    </td>

                    {/* 6. Stock Updater */}
                    <td className="py-3 px-3 text-center">
                      <div className="inline-flex items-center border border-stone-300 rounded-lg bg-stone-50 shadow-2xs">
                        <button
                          onClick={() => onUpdateStock(product.id, Math.max(0, product.stock - 1))}
                          className="px-2 py-1 text-stone-700 hover:bg-stone-200 font-bold text-xs cursor-pointer"
                          title="স্টক ১ কমান"
                        >
                          -
                        </button>
                        <span className={`px-2.5 py-1 font-bold font-mono text-xs tabular-nums ${
                          product.stock <= 10 ? 'text-rose-600 bg-rose-50' : 'text-stone-900'
                        }`}>
                          {product.stock}
                        </span>
                        <button
                          onClick={() => onUpdateStock(product.id, product.stock + 1)}
                          className="px-2 py-1 text-stone-700 hover:bg-stone-200 font-bold text-xs cursor-pointer"
                          title="স্টক ১ বাড়ান"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* 7. Position Reordering Controls (THE KEY REQUEST) */}
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex flex-col sm:flex-row items-center gap-1.5 justify-center">
                        
                        {/* Instant Move to Very Top (#1) */}
                        <button
                          onClick={() => onMoveToTop(product.id)}
                          disabled={isFirst && product.isPinned}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                            isFirst && product.isPinned
                              ? 'bg-amber-200 text-amber-900 cursor-default opacity-80'
                              : 'bg-amber-600 hover:bg-amber-500 text-stone-950 shadow-xs hover:scale-103'
                          }`}
                          title="এই পোশাকটি সরাসরি সবার ওপরে ১ নম্বরে নিয়ে যান"
                        >
                          <ArrowUpToLine className="w-3.5 h-3.5" />
                          <span>🔝 শীর্ষে তুলুন</span>
                        </button>

                        {/* Step Up Arrow */}
                        <button
                          onClick={() => onMoveOrder(product.id, 'up')}
                          disabled={isFirst}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            isFirst 
                              ? 'text-stone-300 border-stone-200 cursor-not-allowed' 
                              : 'text-stone-700 border-stone-300 hover:bg-stone-200 hover:text-stone-900'
                          }`}
                          title="এক ধাপ ওপরে নিন"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>

                        {/* Step Down Arrow */}
                        <button
                          onClick={() => onMoveOrder(product.id, 'down')}
                          disabled={isLast}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            isLast 
                              ? 'text-stone-300 border-stone-200 cursor-not-allowed' 
                              : 'text-stone-700 border-stone-300 hover:bg-stone-200 hover:text-stone-900'
                          }`}
                          title="এক ধাপ নিচে নিন"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>

                        {/* Pin / Unpin Toggle */}
                        <button
                          onClick={() => onTogglePin(product.id)}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            product.isPinned
                              ? 'bg-amber-100 text-amber-900 border-amber-400'
                              : 'text-stone-500 border-stone-300 hover:bg-stone-100 hover:text-stone-800'
                          }`}
                          title={product.isPinned ? 'পিন অপসারণ করুন' : 'শীর্ষে পিন করুন'}
                        >
                          <Pin className={`w-3.5 h-3.5 ${product.isPinned ? 'fill-amber-700' : ''}`} />
                        </button>

                      </div>
                    </td>

                    {/* 8. Edit / Delete Actions */}
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                          title="সম্পাদনা করুন"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(product.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 border border-stone-200 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <h3 className="font-serif-brand text-2xl font-bold text-stone-900">
                  নতুন কাপড় / পোশাক যোগ করুন
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  নরসিংদীর তাঁত শোরুম বা কারখানার নতুন পোশাকের তথ্য পূরণ করুন।
                </p>
              </div>
              <button 
                onClick={() => setModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="mt-4 space-y-4 text-xs">
              
              {/* Highlight Option: Pin To Top checkbox */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Pin className="w-4 h-4 text-amber-700 shrink-0" />
                  <div>
                    <span className="font-bold text-stone-900 block">এই পোশাকটি সরাসরি সবার ওপরে প্রদর্শন করুন</span>
                    <span className="text-[11px] text-stone-600">চেক করলে পোশাকটি ওয়েবসাইটের তালিকার শুরুতে #১ পজিশনে থাকবে</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={pinToTop}
                  onChange={(e) => setPinToTop(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded border-stone-300 focus:ring-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">পোশাকের নাম (বাংলা) *</label>
                <input
                  type="text"
                  required
                  value={titleBn}
                  onChange={(e) => setTitleBn(e.target.value)}
                  placeholder="যেমন: নরসিংদী স্পেশাল বুটি জামদানি শাড়ি"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">ইংরেজি নাম (ঐচ্ছিক)</label>
                <input
                  type="text"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="Narsingdi Special Buti Jamdani Saree"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">ক্যাটাগরি *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-600 cursor-pointer"
                  >
                    <option value="jamdani-saree">জামদানি ও সুতি শাড়ি</option>
                    <option value="three-piece">প্রিমিয়াম থ্রি-পিস ও আনস্টিচড</option>
                    <option value="panjabi">পুরুষদের পাঞ্জাবি ও শার্ট</option>
                    <option value="wholesale">পাইকারি লট/বাল্ক অর্ডার</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">কাপড় / ফেব্রিক ধরন *</label>
                  <input
                    type="text"
                    required
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value)}
                    placeholder="১০০% পিওর কটন / সুতি তাঁত"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              {/* Pricing & Stock */}
              <div className="grid grid-cols-3 gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">খুচরা মূল্য (৳) *</label>
                  <input
                    type="number"
                    required
                    value={retailPrice}
                    onChange={(e) => setRetailPrice(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 border border-stone-300 rounded bg-white text-stone-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">পাইকারি মূল্য (৳) *</label>
                  <input
                    type="number"
                    required
                    value={wholesalePrice}
                    onChange={(e) => setWholesalePrice(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 border border-stone-300 rounded bg-white text-amber-900 font-bold font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">মিনিমাম লট</label>
                  <input
                    type="number"
                    required
                    value={minWholesaleQty}
                    onChange={(e) => setMinWholesaleQty(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 border border-stone-300 rounded bg-white text-stone-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">প্রাথমিক স্টক সংখ্যা *</label>
                <input
                  type="number"
                  required
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 font-mono"
                />
              </div>

              {/* Product Image Upload & Selection Card */}
              <div className="p-3.5 bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-stone-50 rounded-xl border-2 border-dashed border-amber-500/50 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-amber-700" />
                    <span>কাপড়ের ছবি (Product Image) *</span>
                  </label>
                  <span className="text-[10.5px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                    গ্যালারি / ক্যামেরা বা অনলাইন লিংক
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  {/* Live Thumbnail Preview */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-amber-600 bg-stone-900 shadow-md shrink-0 group">
                    <img
                      src={image}
                      alt="Product Preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-stone-950/85 text-amber-300 text-[10px] text-center py-0.5 font-bold">
                      লাইভ প্রিভিউ
                    </div>
                  </div>

                  {/* Actions & Buttons */}
                  <div className="space-y-2 flex-1 w-full">
                    {/* Primary Upload Button */}
                    <label className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-stone-900 hover:bg-stone-800 text-amber-300 hover:text-white font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer active:scale-98 border border-amber-500/30">
                      <Upload className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>গ্যালারি / ক্যামেরা থেকে ছবি আপলোড করুন</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageFileUpload(file);
                        }}
                      />
                    </label>

                    {/* Online Image URL Input */}
                    <div className="relative">
                      <input
                        type="url"
                        value={image.startsWith('data:') ? '' : image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="অথবা অনলাইন ছবির লিঙ্ক (URL) পেস্ট করুন..."
                        className="w-full pl-8 pr-3 py-1.5 border border-stone-300 rounded-lg text-xs text-stone-900 bg-white focus:outline-none focus:border-amber-600 font-sans"
                      />
                      <Link2 className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2" />
                    </div>

                    {/* Sample Fabric Quick Picks */}
                    <div>
                      <span className="text-[10px] text-stone-500 block mb-1 font-medium">অথবা নরসিংদী স্যাম্পল ছবি নির্বাচন করুন:</span>
                      <div className="flex flex-wrap gap-1">
                        {PRESET_FABRIC_IMAGES.map((preset) => (
                          <button
                            key={preset.url}
                            type="button"
                            onClick={() => setImage(preset.url)}
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all cursor-pointer ${
                              image === preset.url
                                ? 'bg-amber-700 text-white shadow-2xs font-bold'
                                : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                            }`}
                          >
                            {preset.tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">বিবরণ (Description)</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="নরসিংদীর তাঁত, রঙ পাকা ও আরামদায়ক অনুভূতি সম্পর্কে লিখুন..."
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-50 cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold rounded-lg shadow-md cursor-pointer"
                >
                  স্টোরে যোগ করুন {pinToTop && '(শীর্ষে প্রদর্শন হবে)'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 border border-stone-200 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <h3 className="font-serif-brand text-2xl font-bold text-stone-900">
                  পোশাক সম্পাদনা করুন
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  ID: {editingProduct.id}
                </p>
              </div>
              <button 
                onClick={() => setEditModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditProduct} className="mt-4 space-y-4 text-xs">
              
              {/* Pin To Top option */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Pin className="w-4 h-4 text-amber-700 shrink-0" />
                  <div>
                    <span className="font-bold text-stone-900 block">এই পোশাকটি শীর্ষে পিন করুন</span>
                    <span className="text-[11px] text-stone-600">চেক করলে এটি গ্রাহকের কাছে বিশেষ পছন্দ হিসেবে প্রথমে আসবে</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={pinToTop}
                  onChange={(e) => setPinToTop(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded border-stone-300 focus:ring-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">পোশাকের নাম (বাংলা) *</label>
                <input
                  type="text"
                  required
                  value={titleBn}
                  onChange={(e) => setTitleBn(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">ক্যাটাগরি *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 cursor-pointer"
                  >
                    <option value="jamdani-saree">জামদানি ও সুতি শাড়ি</option>
                    <option value="three-piece">প্রিমিয়াম থ্রি-পিস ও আনস্টিচড</option>
                    <option value="panjabi">পুরুষদের পাঞ্জাবি ও শার্ট</option>
                    <option value="wholesale">পাইকারি লট/বাল্ক অর্ডার</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">ফেব্রিক *</label>
                  <input
                    type="text"
                    required
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">খুচরা মূল্য (৳)</label>
                  <input
                    type="number"
                    required
                    value={retailPrice}
                    onChange={(e) => setRetailPrice(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 border border-stone-300 rounded bg-white text-stone-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">পাইকারি মূল্য (৳)</label>
                  <input
                    type="number"
                    required
                    value={wholesalePrice}
                    onChange={(e) => setWholesalePrice(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 border border-stone-300 rounded bg-white text-amber-900 font-bold font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">স্টক</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 border border-stone-300 rounded bg-white text-stone-900 font-mono"
                  />
                </div>
              </div>

              {/* Product Image Upload & Selection Card (Edit Mode) */}
              <div className="p-3.5 bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-stone-50 rounded-xl border-2 border-dashed border-amber-500/50 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-amber-700" />
                    <span>কাপড়ের ছবি পরিবর্তন করুন *</span>
                  </label>
                  <span className="text-[10.5px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                    গ্যালারি / ক্যামেরা বা অনলাইন লিংক
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  {/* Live Thumbnail Preview */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-amber-600 bg-stone-900 shadow-md shrink-0 group">
                    <img
                      src={image}
                      alt="Product Preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-stone-950/85 text-amber-300 text-[10px] text-center py-0.5 font-bold">
                      বর্তমান ছবি
                    </div>
                  </div>

                  {/* Actions & Buttons */}
                  <div className="space-y-2 flex-1 w-full">
                    {/* Primary Upload Button */}
                    <label className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-stone-900 hover:bg-stone-800 text-amber-300 hover:text-white font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer active:scale-98 border border-amber-500/30">
                      <Upload className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>নতুন ছবি আপলোড করুন (গ্যালারি / ক্যামেরা)</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageFileUpload(file);
                        }}
                      />
                    </label>

                    {/* Online Image URL Input */}
                    <div className="relative">
                      <input
                        type="url"
                        value={image.startsWith('data:') ? '' : image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="অথবা অনলাইন ছবির লিঙ্ক (URL) পেস্ট করুন..."
                        className="w-full pl-8 pr-3 py-1.5 border border-stone-300 rounded-lg text-xs text-stone-900 bg-white focus:outline-none focus:border-amber-600 font-sans"
                      />
                      <Link2 className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2" />
                    </div>

                    {/* Sample Fabric Quick Picks */}
                    <div>
                      <span className="text-[10px] text-stone-500 block mb-1 font-medium">অথবা নরসিংদী স্যাম্পল ছবি নির্বাচন করুন:</span>
                      <div className="flex flex-wrap gap-1">
                        {PRESET_FABRIC_IMAGES.map((preset) => (
                          <button
                            key={preset.url}
                            type="button"
                            onClick={() => setImage(preset.url)}
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all cursor-pointer ${
                              image === preset.url
                                ? 'bg-amber-700 text-white shadow-2xs font-bold'
                                : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                            }`}
                          >
                            {preset.tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">বিবরণ</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-50 cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold rounded-lg shadow-md cursor-pointer"
                >
                  পরিবর্তন সংরক্ষণ করুন
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
