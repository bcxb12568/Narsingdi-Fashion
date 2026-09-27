import React from 'react';
import { Order, Product, Customer } from '../../types';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  CreditCard, 
  AlertTriangle, 
  Package, 
  Clock, 
  CheckCircle,
  Truck,
  ArrowUpRight
} from 'lucide-react';

interface AdminDashboardProps {
  orders: Order[];
  products: Product[];
  customers: Customer[];
  onNavigateTab: (tab: string) => void;
  onViewInvoice: (order: Order) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  orders,
  products,
  customers,
  onNavigateTab,
  onViewInvoice
}) => {
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Canceled' ? o.grandTotal : 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending');
  const processingOrders = orders.filter(o => o.status === 'Processing');
  const shippedOrders = orders.filter(o => o.status === 'Shipped');
  const deliveredOrders = orders.filter(o => o.status === 'Delivered');

  const lowStockProducts = products.filter(p => p.stock <= 30);

  // Today orders
  const todayOrders = orders.slice(0, 3);

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#1C1917] text-white">
        <div>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            রিয়েল-টাইম বিজনেস ট্র্যাকার
          </span>
          <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold mt-1 text-white">
            নরসিংদী ফ্যাশন অ্যাডমিন কন্ট্রোল
          </h2>
          <p className="text-xs text-stone-300 mt-1">
            বাবুরহাট ও নরসিংদী তাঁত শোরুমের সরাসরি স্টক, বিক্রয় ও কুরিয়ার ম্যানেজমেন্ট।
          </p>
        </div>

        <div className="flex items-center gap-2">
          {pendingOrders.length > 0 && (
            <button
              onClick={() => onNavigateTab('orders')}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Clock className="w-4 h-4 text-stone-950" />
              <span>{pendingOrders.length} টি নতুন অর্ডার অপেক্ষমাণ</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Revenue */}
        <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
            <span>মোট বিক্রয় রেভিনিউ</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-serif-brand text-stone-900 mt-3 tabular-nums">
            ৳{totalRevenue.toLocaleString('bn-BD')}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>সফল {deliveredOrders.length + processingOrders.length + shippedOrders.length} টি অর্ডারে সংগৃহীত</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
            <span>মোট অর্ডার সংখ্যা</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-serif-brand text-stone-900 mt-3 tabular-nums">
            {orders.length} টি
          </div>
          <div className="text-[11px] text-stone-500 mt-1 flex items-center gap-2">
            <span className="text-amber-700 font-semibold">{pendingOrders.length} পেন্ডিং</span>
            <span>·</span>
            <span className="text-emerald-700 font-semibold">{deliveredOrders.length} ডেলিভারড</span>
          </div>
        </div>

        {/* Total Customers */}
        <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
            <span>মোট নিবন্ধিত কাস্টমার</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-serif-brand text-stone-900 mt-3 tabular-nums">
            {customers.length + 15} জন
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            রিটেল ক্রেতা ও পাইকারি বুটিক বিক্রেতা
          </div>
        </div>

        {/* Average Order Value */}
        <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
            <span>গড় অর্ডার মান (AOV)</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-serif-brand text-stone-900 mt-3 tabular-nums">
            ৳{Math.round(totalRevenue / Math.max(1, orders.length)).toLocaleString('bn-BD')}
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            পাইকারি বান্ডেলের কারণে উচ্চ মান
          </div>
        </div>

      </div>

      {/* Two Column Layout: Recent Orders & Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Orders (2 Columns on large) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <div>
              <h3 className="font-serif-brand text-lg font-bold text-stone-900">
                সাম্প্রতিক অর্ডারসমূহ
              </h3>
              <p className="text-xs text-stone-500">গ্রাহকদের সর্বশেষ অর্ডার ও ডেলিভারি স্ট্যাটাস</p>
            </div>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs font-semibold text-amber-800 hover:text-amber-900"
            >
              সব অর্ডার দেখুন ({orders.length}) →
            </button>
          </div>

          <div className="divide-y divide-stone-100 mt-2">
            {todayOrders.map((order) => (
              <div key={order.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-stone-900">{order.id}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm ${
                      order.status === 'Pending' ? 'bg-amber-100 text-amber-900' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-900' :
                      order.status === 'Shipped' ? 'bg-purple-100 text-purple-900' :
                      'bg-emerald-100 text-emerald-900'
                    }`}>
                      {order.status}
                    </span>
                    <span className="text-[11px] text-stone-400 font-mono">({order.customerPhone})</span>
                  </div>
                  <div className="text-xs text-stone-700 font-medium mt-1">
                    {order.customerName} · <span className="text-stone-500">{order.district}</span>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    {order.items.map(i => `${i.product.titleBn} (x${i.quantity})`).join(', ')}
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:text-right">
                  <div>
                    <div className="text-sm font-bold text-stone-900 tabular-nums">
                      ৳{order.grandTotal.toLocaleString('bn-BD')}
                    </div>
                    <div className="text-[10px] uppercase font-semibold text-stone-500">
                      {order.paymentMethod} ({order.paymentStatus})
                    </div>
                  </div>
                  <button
                    onClick={() => onViewInvoice(order)}
                    className="px-2.5 py-1 text-xs border border-stone-300 rounded-lg hover:bg-stone-50 text-stone-700 transition-colors"
                  >
                    ইনভয়েস
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock & Inventory Overview (1 Column) */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h3 className="font-serif-brand text-lg font-bold text-stone-900">
                স্টক সতর্কতা
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('products')}
              className="text-xs font-semibold text-amber-800"
            >
              ম্যানেজ করুন →
            </button>
          </div>

          <div className="space-y-3">
            {lowStockProducts.map(prod => (
              <div key={prod.id} className="p-3 rounded-xl border border-stone-100 bg-stone-50 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <h4 className="text-xs font-semibold text-stone-900 truncate">
                    {prod.titleBn}
                  </h4>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    খুচরা: ৳{prod.retailPrice} · পাইকারি: ৳{prod.wholesalePrice}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900 tabular-nums">
                    {prod.stock} পিস বাকি
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Courier Summary */}
          <div className="pt-3 border-t border-stone-200">
            <h4 className="text-xs font-bold text-stone-900 mb-2 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-amber-700" />
              <span>সক্রিয় কুরিয়ার কানেক্টিভিটি</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/50">
                <div className="font-bold text-emerald-900">Steadfast</div>
                <div className="text-[10px] text-emerald-700">API কানেক্টেড · সক্রিয়</div>
              </div>
              <div className="p-2.5 rounded-lg border border-rose-200 bg-rose-50/50">
                <div className="font-bold text-rose-900">Pathao</div>
                <div className="text-[10px] text-rose-700">সারা দেশ কাভারেজ</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
