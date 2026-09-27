import React, { useState, useEffect } from 'react';
import { 
  Product, 
  Order, 
  Customer, 
  GoogleReview, 
  StoreSettings, 
  CartItem, 
  OrderStatus 
} from './types';
import { 
  initialProducts, 
  initialOrders, 
  initialCustomers, 
  initialReviews, 
  initialSettings 
} from './data/initialData';
import { 
  auth,
  isUserAdmin,
  subscribeProducts,
  subscribeOrders,
  subscribeReviews,
  subscribeStoreSettings,
  saveProductToFirestore,
  deleteProductFromFirestore,
  createOrderInFirestore,
  updateOrderInFirestore,
  deleteOrderFromFirestore,
  saveReviewToFirestore,
  updateReviewInFirestore,
  deleteReviewFromFirestore,
  saveStoreSettingsToFirestore,
  seedInitialFirestoreData
} from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

// Storefront Components
import { Header, AppPage } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { FeatureHighlights } from './components/FeatureHighlights';
import { ProductCard } from './components/ProductCard';
import { ProductsPage } from './components/pages/ProductsPage';
import { HeritagePage } from './components/pages/HeritagePage';
import { ReviewsPage } from './components/pages/ReviewsPage';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { MobileBottomNav } from './components/MobileBottomNav';

// Admin Components
import { AdminLayout } from './components/admin/AdminLayout';
import { InvoiceModal } from './components/admin/InvoiceModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';

const getStoredProducts = (): Product[] => {
  try {
    const raw = localStorage.getItem('nf_products_cache');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return initialProducts;
};

const getStoredSettings = (): StoreSettings => {
  try {
    const raw = localStorage.getItem('nf_settings_cache');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.storeName) return parsed;
    }
  } catch (e) {}
  return initialSettings;
};

export default function App() {
  // Primary Business State with Local Cache
  const [products, setProducts] = useState<Product[]>(getStoredProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [reviews, setReviews] = useState<GoogleReview[]>(initialReviews);
  const [settings, setSettings] = useState<StoreSettings>(getStoredSettings);

  // App View, Page & Category State
  const [currentView, setCurrentView] = useState<'store' | 'admin'>('store');
  const [activePage, setActivePage] = useState<AppPage>('home');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdminUserRole, setIsAdminUserRole] = useState<boolean>(false);

  // Customer Shopping State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Modals & Panels
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState<Order | null>(null);

  // Quick Toast Feedback
  const [toastText, setToastText] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => setToastText(null), 3500);
  };

  // --- Real-time Firebase Sync Effect ---
  useEffect(() => {
    // 1. Auth listener
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAdminUserRole(isUserAdmin(user));
    });

    // 2. Initial Seeding if Firestore is fresh
    seedInitialFirestoreData(initialProducts, initialReviews, initialSettings);

    // 3. Live products subscription
    const unsubProducts = subscribeProducts(
      (liveProds) => {
        if (liveProds && liveProds.length > 0) {
          setProducts(liveProds);
          try {
            localStorage.setItem('nf_products_cache', JSON.stringify(liveProds));
          } catch (e) {}
        }
      },
      (err) => console.warn('Products sync fallback:', err)
    );

    // 4. Live reviews subscription
    const unsubReviews = subscribeReviews(
      (liveReviews) => {
        if (liveReviews && liveReviews.length > 0) {
          setReviews(liveReviews);
        }
      },
      (err) => console.warn('Reviews sync fallback:', err)
    );

    // 5. Live store settings subscription
    const unsubSettings = subscribeStoreSettings(
      (liveSettings) => {
        if (liveSettings) {
          setSettings(liveSettings);
          try {
            localStorage.setItem('nf_settings_cache', JSON.stringify(liveSettings));
          } catch (e) {}
        }
      },
      (err) => console.warn('Settings sync fallback:', err)
    );

    return () => {
      unsubAuth();
      unsubProducts();
      unsubReviews();
      unsubSettings();
    };
  }, []);

  // Separate subscription for customer orders (strictly for authenticated admin or admin view)
  useEffect(() => {
    if (!isAdminUserRole && currentView !== 'admin') return;

    const unsubOrders = subscribeOrders(
      (liveOrders) => {
        if (liveOrders && liveOrders.length > 0) {
          setOrders(liveOrders);
        }
      },
      (err) => console.warn('Orders sync notice:', err)
    );

    return () => {
      unsubOrders();
    };
  }, [isAdminUserRole, currentView]);

  // --- Cart Actions ---
  const handleAddToCart = (product: Product, isWholesale: boolean, quantity: number = 1, size?: string, color?: string) => {
    const minQty = isWholesale ? Math.max(product.minWholesaleQty, quantity) : quantity;

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.isWholesale === isWholesale && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += minQty;
        return next;
      } else {
        return [...prev, {
          product,
          quantity: minQty,
          isWholesale,
          selectedSize: size,
          selectedColor: color
        }];
      }
    });

    showToast(`"${product.titleBn}" শপিং ব্যাগে যুক্ত হয়েছে!`);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number, isWholesale: boolean) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId, isWholesale);
      return;
    }

    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.isWholesale === isWholesale) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (productId: string, isWholesale: boolean) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.isWholesale === isWholesale)));
  };

  // --- Wishlist Actions ---
  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      if (prev.includes(product.id)) {
        showToast('উইশলিস্ট থেকে সরানো হয়েছে');
        return prev.filter(id => id !== product.id);
      } else {
        showToast('পছন্দের তালিকায় সংরক্ষণ করা হয়েছে');
        return [...prev, product.id];
      }
    });
  };

  // --- Direct Order / Quick Buy ---
  const handleDirectOrder = (product: Product, isWholesale: boolean) => {
    handleAddToCart(product, isWholesale, isWholesale ? product.minWholesaleQty : 1);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // --- Order Placement ---
  const handlePlaceOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setCart([]); // Clear cart upon successful order

    // Persist in Firestore
    createOrderInFirestore(newOrder).catch((err) => {
      console.warn('Could not save order to Firestore:', err);
    });

    // Update customer entry or add new
    setCustomers(prev => {
      const exists = prev.find(c => c.phone === newOrder.customerPhone);
      if (exists) {
        return prev.map(c => c.phone === newOrder.customerPhone ? {
          ...c,
          totalOrders: c.totalOrders + 1,
          totalSpent: c.totalSpent + newOrder.grandTotal,
          lastOrderDate: 'আজকে'
        } : c);
      } else {
        const newCust: Customer = {
          id: `cust-${Date.now()}`,
          name: newOrder.customerName,
          phone: newOrder.customerPhone,
          email: newOrder.customerEmail,
          district: newOrder.district,
          address: newOrder.address,
          totalOrders: 1,
          totalSpent: newOrder.grandTotal,
          registeredDate: 'আজকে',
          lastOrderDate: 'আজকে'
        };
        return [newCust, ...prev];
      }
    });
  };

  // --- Admin Actions ---
  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    updateOrderInFirestore(orderId, { status }).catch(err => console.warn(err));
    showToast(`অর্ডার ${orderId} স্ট্যাটাস আপডেট হয়েছে: ${status}`);
  };

  const handleBookCourier = (orderId: string, provider: 'Steadfast' | 'Pathao') => {
    const randomCode = provider === 'Steadfast'
      ? `STF-${Math.floor(100000 + Math.random() * 900000)}`
      : `PTH-${Math.floor(100000 + Math.random() * 900000)}`;

    const courierData = {
      provider,
      trackingCode: randomCode,
      status: 'পার্সেল কুরিয়ার হাব থেকে ঠিকানার পথে'
    };

    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'Shipped',
          courier: courierData
        };
      }
      return o;
    }));

    updateOrderInFirestore(orderId, {
      status: 'Shipped',
      courier: courierData
    }).catch(err => console.warn(err));

    showToast(`অর্ডার ${orderId} সফলভাবে ${provider} এ বুক হয়েছে (ট্র্যাকিং: ${randomCode})`);
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders(prev => {
      const updated = prev.filter(o => o.id !== orderId);
      try {
        localStorage.setItem('nf_orders_cache', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    deleteOrderFromFirestore(orderId).catch(err => console.warn(err));
    showToast(`অর্ডার #${orderId} সফলভাবে মুছে ফেলা হয়েছে! 🗑️`);
  };

  const handleRateOrder = (orderId: string, rating: number, comment?: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, rating, ratingComment: comment };
      }
      return o;
    }));
    updateOrderInFirestore(orderId, { rating, ratingComment: comment }).catch(err => console.warn(err));

    const targetOrder = orders.find(o => o.id === orderId);
    if (targetOrder) {
      const newRev: GoogleReview = {
        id: `rev-ord-${Date.now()}`,
        author: targetOrder.customerName || 'সম্মানিত ক্রেতা',
        city: targetOrder.district || 'বাংলাদেশ',
        rating,
        date: 'আজকে',
        comment: comment || 'নরসিংদী ফ্যাশন থেকে পণ্য পেয়ে অত্যন্ত আনন্দিত ও সন্তুষ্ট!',
        isGoogleVerified: true,
        isApproved: true,
        orderId,
        productTitle: targetOrder.items[0]?.product?.titleBn || 'নরসিংদী তাঁত পণ্য'
      };
      setReviews(prev => [newRev, ...prev]);
      saveReviewToFirestore(newRev).catch(err => console.warn(err));
    }
    showToast('অর্ডারে আপনার রেটিং সফলভাবে গৃহীত হয়েছে! ⭐');
  };

  const handleUpdateProductRating = (productId: string, newRating: number, newCount: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const updated = { ...p, rating: newRating, reviewsCount: newCount };
        saveProductToFirestore(updated).catch(err => console.warn(err));
        return updated;
      }
      return p;
    }));
  };

  const handleAddProduct = (newProd: Product) => {
    setProducts(prev => {
      const updated = [newProd, ...prev.filter(p => p.id !== newProd.id)];
      try {
        localStorage.setItem('nf_products_cache', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    saveProductToFirestore(newProd)
      .then(() => console.log('Product saved to Firestore:', newProd.id))
      .catch(err => console.warn('Product save notice:', err));
    showToast(`"${newProd.titleBn}" স্টোরে যুক্ত করা হয়েছে!`);
  };

  // --- Product Reordering / Pinning Actions (যেকোনো প্রডাক্ট ওপরে রাখার অপশন) ---
  const handleMoveProductToTop = (productId: string) => {
    let movedTitle = '';
    let targetItem: Product | null = null;
    setProducts(prev => {
      const index = prev.findIndex(p => p.id === productId);
      if (index === -1) return prev;
      movedTitle = prev[index].titleBn;
      targetItem = { ...prev[index], isPinned: true, pinnedAt: Date.now() };
      const rest = prev.filter(p => p.id !== productId);
      const updated = [targetItem, ...rest];
      try {
        localStorage.setItem('nf_products_cache', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    if (targetItem) {
      saveProductToFirestore(targetItem).catch(err => console.warn(err));
    }
    showToast(`"${movedTitle || 'পণ্য'}" সফলভাবে সবার ওপরে (#১) রাখা হয়েছে! 🔝`);
  };

  const handleTogglePinProduct = (productId: string) => {
    let isNowPinned = false;
    let targetTitle = '';
    let updatedItem: Product | null = null;
    setProducts(prev => {
      const index = prev.findIndex(p => p.id === productId);
      if (index === -1) return prev;
      targetTitle = prev[index].titleBn;
      isNowPinned = !prev[index].isPinned;
      let updated: Product[];
      if (isNowPinned) {
        updatedItem = { ...prev[index], isPinned: true, pinnedAt: Date.now() };
        const rest = prev.filter(p => p.id !== productId);
        updated = [updatedItem, ...rest];
      } else {
        updatedItem = { ...prev[index], isPinned: false };
        updated = prev.map(p => p.id === productId ? updatedItem! : p);
      }
      try {
        localStorage.setItem('nf_products_cache', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    if (updatedItem) {
      saveProductToFirestore(updatedItem).catch(err => console.warn(err));
    }
    showToast(isNowPinned ? `"${targetTitle}" শীর্ষে পিন করা হয়েছে! 📌` : `"${targetTitle}" শীর্ষ থেকে আনপিন করা হয়েছে।`);
  };

  const handleMoveProductOrder = (productId: string, direction: 'up' | 'down') => {
    setProducts(prev => {
      const index = prev.findIndex(p => p.id === productId);
      if (index === -1) return prev;
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[newIndex];
      copy[newIndex] = temp;
      try {
        localStorage.setItem('nf_products_cache', JSON.stringify(copy));
      } catch (e) {}
      saveProductToFirestore(copy[index]).catch(err => console.warn(err));
      saveProductToFirestore(copy[newIndex]).catch(err => console.warn(err));
      return copy;
    });
    showToast(`পোশাকের ক্রম পরিবর্তিত হয়েছে (${direction === 'up' ? '১ ধাপ ওপরে' : '১ ধাপ নিচে'})।`);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prev => {
      const prevProd = prev.find(p => p.id === updatedProduct.id);
      let updated: Product[];
      if (!prevProd?.isPinned && updatedProduct.isPinned) {
        const rest = prev.filter(p => p.id !== updatedProduct.id);
        updated = [{ ...updatedProduct, pinnedAt: Date.now() }, ...rest];
      } else {
        updated = prev.map(p => p.id === updatedProduct.id ? updatedProduct : p);
      }
      try {
        localStorage.setItem('nf_products_cache', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    saveProductToFirestore(updatedProduct).catch(err => console.warn(err));
    showToast(`"${updatedProduct.titleBn}" সফলভাবে আপডেট করা হয়েছে!`);
  };

  const handleUpdateStock = (productId: string, newStock: number) => {
    let updatedProd: Product | null = null;
    setProducts(prev => {
      const updated = prev.map(p => {
        if (p.id === productId) {
          updatedProd = { ...p, stock: newStock };
          return updatedProd;
        }
        return p;
      });
      try {
        localStorage.setItem('nf_products_cache', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    if (updatedProd) {
      saveProductToFirestore(updatedProd).catch(err => console.warn(err));
    }
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => {
      const updated = prev.filter(p => p.id !== productId);
      try {
        localStorage.setItem('nf_products_cache', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    deleteProductFromFirestore(productId).catch(err => console.warn(err));
    showToast('পোশাকটি মুছে ফেলা হয়েছে।');
  };

  const handleToggleReviewApprove = (id: string) => {
    let updatedRev: GoogleReview | null = null;
    setReviews(prev => prev.map(r => {
      if (r.id === id) {
        updatedRev = { ...r, isApproved: !r.isApproved };
        return updatedRev;
      }
      return r;
    }));
    if (updatedRev) {
      updateReviewInFirestore(id, { isApproved: (updatedRev as GoogleReview).isApproved }).catch(err => console.warn(err));
    }
  };

  const handleAddReviewReply = (id: string, reply: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, reply } : r));
    updateReviewInFirestore(id, { reply }).catch(err => console.warn(err));
    showToast('রিভিউতে অফিশিয়াল উত্তর যুক্ত হয়েছে!');
  };

  const handleDeleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
    deleteReviewFromFirestore(id).catch(err => console.warn(err));
  };

  const handleAddCustomReview = (rev: GoogleReview) => {
    setReviews(prev => [rev, ...prev]);
    saveReviewToFirestore(rev).catch(err => console.warn(err));
    showToast('নতুন রিভিউ সফলভাবে যুক্ত হয়েছে!');
  };

  const handleCustomerSubmitReview = (revData: Omit<GoogleReview, 'id' | 'isGoogleVerified' | 'isApproved'>) => {
    const newRev: GoogleReview = {
      ...revData,
      id: `rev-${Date.now()}`,
      isGoogleVerified: true,
      isApproved: true // Direct show with admin moderation ability
    };
    setReviews(prev => [newRev, ...prev]);
    saveReviewToFirestore(newRev).catch(err => console.warn(err));
    showToast('আপনার মূল্যবান রিভিউটির জন্য আন্তরিক ধন্যবাদ!');
  };

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  // --- Render Storefront or Admin ---
  if (currentView === 'admin') {
    return (
      <AdminLayout
        orders={orders}
        products={products}
        customers={customers}
        reviews={reviews}
        settings={settings}
        onExitAdmin={() => setCurrentView('store')}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onBookCourier={handleBookCourier}
        onAddProduct={handleAddProduct}
        onUpdateStock={handleUpdateStock}
        onDeleteProduct={handleDeleteProduct}
        onMoveToTop={handleMoveProductToTop}
        onTogglePin={handleTogglePinProduct}
        onMoveOrder={handleMoveProductOrder}
        onUpdateProduct={handleUpdateProduct}
        onToggleReviewApprove={handleToggleReviewApprove}
        onAddReviewReply={handleAddReviewReply}
        onDeleteReview={handleDeleteReview}
        onAddCustomReview={handleAddCustomReview}
        onDeleteOrder={handleDeleteOrder}
        onUpdateSettings={(newSettings) => {
          setSettings(newSettings);
          saveStoreSettingsToFirestore(newSettings).catch(err => console.warn(err));
          showToast('স্টোর সেটিংস সফলভাবে আপডেট হয়েছে!');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 flex flex-col font-sans selection:bg-amber-200 selection:text-stone-900 pb-16 lg:pb-0">
      
      {/* Toast Notification */}
      {toastText && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-amber-200 px-5 py-2.5 rounded-full text-xs font-semibold shadow-2xl border border-stone-800 animate-in fade-in slide-in-from-bottom-3 duration-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>{toastText}</span>
        </div>
      )}

      {/* 1. Header Bar */}
      <Header
        settings={settings}
        activePage={activePage}
        onNavigatePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setActivePage('products');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentView={currentView}
        onExitAdmin={() => setCurrentView('store')}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
      />

      {/* Main Dynamic View: Page-Based Architecture */}
      <main className="flex-1">
        {/* PAGE 1: HOME PAGE */}
        {activePage === 'home' && (
          <div className="space-y-12">
            {/* Hero Banner */}
            <HeroBanner
              settings={settings}
              onOrderNow={() => {
                setActivePage('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onWholesaleClick={() => {
                setActiveCategory('wholesale');
                setActivePage('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Feature Highlights */}
            <FeatureHighlights />

            {/* Featured Best-Sellers Showcase */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    সেরা আকর্ষণ
                  </span>
                  <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                    জনপ্রিয় সেরা পোশাক কালেকশন
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setActivePage('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <span>সব পোশাক দেখুন (পোশাক পেজ)</span>
                  <span>→</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
                {products.slice(0, 4).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    wholesaleModeActive={false}
                    onQuickView={() => setSelectedProduct(product)}
                    onAddToCart={(prod, isWs) => handleAddToCart(prod, isWs, 1)}
                    onDirectOrder={handleDirectOrder}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={() => handleToggleWishlist(product)}
                  />
                ))}
              </div>
            </section>

            {/* Teaser Links: Heritage & Reviews Cards */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Heritage Teaser Card */}
                <div 
                  onClick={() => {
                    setActivePage('heritage');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 hover:border-amber-600/50 transition-all cursor-pointer group shadow-md"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    📜 নরসিংদীর ঐতিহ্য ও পরিচিতি
                  </span>
                  <h3 className="font-serif-brand text-xl sm:text-2xl font-bold mt-2 text-white group-hover:text-amber-300 transition-colors">
                    বাবুরহাট ও মেঘনা তীরের শতবর্ষের তাঁতের গল্প
                  </h3>
                  <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                    কেন নরসিংদীকে প্রাচ্যের ম্যানচেস্টার বলা হয় এবং আমাদের শতভাগ সুতি ও জামদানি কাপড়ের পেছনের কারিগরদের গল্প জানুন।
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                    <span>ঐতিহ্য ও ইতিহাস পড়ুন</span>
                    <span>→</span>
                  </div>
                </div>

                {/* Reviews Teaser Card */}
                <div 
                  onClick={() => {
                    setActivePage('reviews');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 hover:border-amber-500 transition-all cursor-pointer group shadow-2xs"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    ⭐ গ্রাহক রেটিং ও বাস্তব অভিজ্ঞতা
                  </span>
                  <h3 className="font-serif-brand text-xl sm:text-2xl font-bold mt-2 text-stone-900 group-hover:text-amber-800 transition-colors">
                    ৪.৯/৫ গুগল স্টার রেটিং ও ক্রেতাদের মন্তব্য
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    সারা দেশ থেকে অর্ডার করা সন্তুষ্ট গ্রাহকদের মতামত দেখুন অথবা আপনার নিজের কেনাকাটার অভিজ্ঞতা শেয়ার করুন।
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-amber-800 group-hover:translate-x-1 transition-transform">
                    <span>সকল রিভিউ দেখুন ও মতামত দিন</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* PAGE 2: PURE PRODUCTS PAGE (শুধুমাত্র প্রোডাক্ট - বিজ্ঞাপন ছাড়া) */}
        {activePage === 'products' && (
          <ProductsPage
            products={products}
            activeCategory={activeCategory}
            onSelectCategory={(cat) => setActiveCategory(cat)}
            onQuickView={(prod) => setSelectedProduct(prod)}
            onAddToCart={(prod, isWs) => handleAddToCart(prod, isWs, 1)}
            onDirectOrder={handleDirectOrder}
            wishlistIds={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {/* PAGE 3: HERITAGE & STORY PAGE (নরসিংদীর ঐতিহ্য ও ইতিহাস - আলাদা পেইজ) */}
        {activePage === 'heritage' && (
          <HeritagePage
            settings={settings}
            onGoToShop={() => {
              setActivePage('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* PAGE 4: REVIEWS PAGE (গ্রাহক রিভিউ ও মতামত - আলাদা পেইজ) */}
        {activePage === 'reviews' && (
          <ReviewsPage
            reviews={reviews}
            onSubmitReview={handleCustomerSubmitReview}
          />
        )}
      </main>

      {/* 7. Footer */}
      <Footer
        settings={settings}
        onNavigatePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setActivePage('products');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
      />

      {/* Modals and Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={(productId, isWholesale) => handleRemoveFromCart(productId, isWholesale)}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        settings={settings}
        onPlaceOrder={handlePlaceOrder}
        onViewInvoice={(ord) => setActiveInvoiceOrder(ord)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(prod, isWs) => handleAddToCart(prod, isWs, 1)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
      />

      <OrderTrackingModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
        orders={orders}
        onRateOrder={handleRateOrder}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(prod, qty, isWs, size, color) => handleAddToCart(prod, isWs, qty, size, color)}
          onDirectBuy={(prod, qty, isWs, size, color) => {
            handleAddToCart(prod, isWs, qty, size, color);
            setSelectedProduct(null);
            setIsCheckoutOpen(true);
          }}
          reviews={reviews}
          onSubmitReview={handleCustomerSubmitReview}
          onUpdateProductRating={handleUpdateProductRating}
        />
      )}

      {/* Invoice Modal (for direct print from order confirmation) */}
      {activeInvoiceOrder && (
        <InvoiceModal
          order={activeInvoiceOrder}
          settings={settings}
          onClose={() => setActiveInvoiceOrder(null)}
        />
      )}

      {/* Secret Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={() => {
          setIsAdminLoginOpen(false);
          setCurrentView('admin');
          showToast('সিক্রেট পাসওয়ার্ড সঠিক! অ্যাডমিন প্যানেলে স্বাগতম।');
        }}
        correctPassword={settings.adminPassword || 'narsingdi123'}
        logoUrl={settings.logoUrl}
      />

      {/* Mobile Sticky Bottom Navigation Bar (Now with clean customer tabs) */}
      <MobileBottomNav
        activePage={activePage}
        onNavigatePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
      />

    </div>
  );
}
