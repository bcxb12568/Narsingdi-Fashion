import React, { useState } from 'react';
import { Order, OrderStatus } from '../../types';
import { 
  Search, 
  Printer, 
  Truck, 
  Check, 
  Clock, 
  Package, 
  CheckCircle2, 
  XCircle, 
  ExternalLink,
  ChevronDown,
  Trash2,
  Zap,
  Archive,
  RotateCcw
} from 'lucide-react';

interface AdminOrdersProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onBookCourier: (orderId: string, provider: 'Steadfast' | 'Pathao') => void;
  onViewInvoice: (order: Order) => void;
  onDeleteOrder?: (orderId: string) => void;
  autoRemoveDelivered?: boolean;
  onToggleAutoRemove?: (enabled: boolean) => void;
}

export const AdminOrders: React.FC<AdminOrdersProps> = ({
  orders,
  onUpdateOrderStatus,
  onBookCourier,
  onViewInvoice,
  onDeleteOrder,
  autoRemoveDelivered = true,
  onToggleAutoRemove
}) => {
  const [autoRemove, setAutoRemove] = useState<boolean>(autoRemoveDelivered);
  const [filterStatus, setFilterStatus] = useState<string>('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [courierDropdownOrderId, setCourierDropdownOrderId] = useState<string | null>(null);

  const filteredOrders = orders.filter(order => {
    let matchesStatus = true;
    if (filterStatus === 'active') {
      matchesStatus = order.status !== 'Delivered' && order.status !== 'Canceled';
    } else if (filterStatus !== 'all') {
      matchesStatus = order.status === filterStatus;
    }

    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      order.id.toLowerCase().includes(q) ||
      order.customerName.toLowerCase().includes(q) ||
      order.customerPhone.includes(q) ||
      order.district.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const statusCounts = {
    active: orders.filter(o => o.status !== 'Delivered' && o.status !== 'Canceled').length,
    all: orders.length,
    Pending: orders.filter(o => o.status === 'Pending').length,
    Processing: orders.filter(o => o.status === 'Processing').length,
    Shipped: orders.filter(o => o.status === 'Shipped').length,
    Delivered: orders.filter(o => o.status === 'Delivered').length,
    Canceled: orders.filter(o => o.status === 'Canceled').length,
  };

  const handleMarkDelivered = (orderId: string) => {
    onUpdateOrderStatus(orderId, 'Delivered');
  };

  return (
    <div className="space-y-5 text-xs">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-stone-900">
            অর্ডার ও ডেলিভারি ব্যবস্থাপনা
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            অর্ডারের তালিকা দেখা, ডেলিভারি কনফার্ম, এক ক্লিকে ইনভয়েস প্রিন্ট, অটো-রিমুভ ও ডিলিট অপশন
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="অর্ডার নং, ফোন বা নাম দিয়ে খুঁজুন..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-hidden focus:border-amber-600"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Auto-Remove Banner Switch */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-stone-50 p-3 sm:p-3.5 rounded-xl border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-emerald-800" />
          </div>
          <div>
            <span className="font-bold text-stone-900 text-xs block">
              ডেলিভারি সম্পন্ন হলে অ্যাক্টিভ তালিকা থেকে স্বয়ংক্রিয় রিমুভ (Auto-Remove Delivered)
            </span>
            <span className="text-[11px] text-stone-600">
              চালু থাকলে ডেলিভারি সম্পন্ন করার পর অর্ডারটি চলমান তালিকা থেকে রিমুভ হয়ে "ডেলিভার্ড আর্কাইভ" ট্যাবে সংরক্ষিত হবে
            </span>
          </div>
        </div>

        <label className="relative inline-flex items-center cursor-pointer shrink-0">
          <input
            type="checkbox"
            checked={autoRemove}
            onChange={(e) => {
              setAutoRemove(e.target.checked);
              onToggleAutoRemove?.(e.target.checked);
              if (e.target.checked) setFilterStatus('active');
            }}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          <span className="ml-2 text-xs font-bold text-stone-800">
            {autoRemove ? 'স্বয়ংক্রিয় রিমুভ সক্রিয়' : 'রিমুভ বন্ধ'}
          </span>
        </label>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-stone-200 no-scrollbar">
        {[
          { id: 'active', label: '⚡ অ্যাক্টিভ অর্ডার (চলমান)', count: statusCounts.active },
          { id: 'all', label: 'সকল অর্ডার', count: statusCounts.all },
          { id: 'Pending', label: 'অপেক্ষমাণ (Pending)', count: statusCounts.Pending },
          { id: 'Processing', label: 'প্রসেসিং (Processing)', count: statusCounts.Processing },
          { id: 'Shipped', label: 'শিপড / কুরিয়ারে (Shipped)', count: statusCounts.Shipped },
          { id: 'Delivered', label: 'ডেলিভার্ড / আর্কাইভ (Delivered)', count: statusCounts.Delivered },
          { id: 'Canceled', label: 'বাতিল (Canceled)', count: statusCounts.Canceled },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterStatus(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              filterStatus === tab.id
                ? 'bg-stone-900 text-amber-300 shadow-xs font-bold'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] tabular-nums font-mono ${
              filterStatus === tab.id ? 'bg-stone-800 text-amber-400 font-bold' : 'bg-stone-100 text-stone-700'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-100/70 border-b border-stone-200 text-stone-700 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">অর্ডার আইডি ও তারিখ</th>
                <th className="py-3 px-4">গ্রাহক ও ঠিকানা</th>
                <th className="py-3 px-4">আইটেমসমূহ</th>
                <th className="py-3 px-4 text-right">মোট টাকা</th>
                <th className="py-3 px-4">পেমেন্ট</th>
                <th className="py-3 px-4">অর্ডার স্ট্যাটাস</th>
                <th className="py-3 px-4">কুরিয়ার ইন্টিগ্রেশন</th>
                <th className="py-3 px-4 text-right">অ্যাকশন ও ডিলিট</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-stone-500">
                    <div className="max-w-xs mx-auto space-y-1">
                      <div className="text-stone-400 text-2xl">📦</div>
                      <div className="font-semibold text-stone-700">কোনো অর্ডার পাওয়া যায়নি।</div>
                      {filterStatus === 'active' && statusCounts.Delivered > 0 && (
                        <button
                          onClick={() => setFilterStatus('Delivered')}
                          className="text-amber-800 underline text-xs cursor-pointer pt-1 block mx-auto"
                        >
                          ডেলিভারি সম্পন্ন হওয়া {statusCounts.Delivered} টি অর্ডার দেখতে ক্লিক করুন
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-stone-50/80 transition-colors">
                    
                    {/* Order ID & Date */}
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-stone-900 text-xs">{order.id}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{order.date}</div>
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4 max-w-[200px]">
                      <div className="font-semibold text-stone-900">{order.customerName}</div>
                      <div className="text-stone-700 font-mono text-[11px]">{order.customerPhone}</div>
                      <div className="text-[11px] text-stone-500 truncate" title={`${order.address}, ${order.district}`}>
                        {order.address}, {order.district}
                      </div>
                    </td>

                    {/* Items */}
                    <td className="py-3.5 px-4 max-w-[220px]">
                      <div className="space-y-1">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="truncate text-stone-800">
                            • {it.product.titleBn} (x{it.quantity})
                            {it.isWholesale && <span className="ml-1 text-[10px] text-amber-800 font-bold">[লট]</span>}
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4 text-right tabular-nums">
                      <div className="font-bold text-stone-900 text-xs">
                        ৳{order.grandTotal.toLocaleString('bn-BD')}
                      </div>
                      <div className="text-[10px] text-stone-500">
                        ডেলিভারি: ৳{order.deliveryCharge}
                      </div>
                    </td>

                    {/* Payment */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold uppercase text-[11px] text-stone-800">
                        {order.paymentMethod}
                      </div>
                      <span className={`inline-block text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                        order.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.paymentStatus === 'Paid' ? 'পরিশোধিত' : 'বাকি (COD)'}
                      </span>
                      {order.trxId && (
                        <div className="font-mono text-[10px] text-stone-500 mt-0.5">{order.trxId}</div>
                      )}
                    </td>

                    {/* Status Changer */}
                    <td className="py-3.5 px-4">
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className={`text-xs font-semibold px-2 py-1 rounded-md border cursor-pointer focus:outline-hidden ${
                          order.status === 'Pending' ? 'bg-amber-50 text-amber-900 border-amber-300' :
                          order.status === 'Processing' ? 'bg-blue-50 text-blue-900 border-blue-300' :
                          order.status === 'Shipped' ? 'bg-purple-50 text-purple-900 border-purple-300' :
                          order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-900 border-emerald-300' :
                          'bg-rose-50 text-rose-900 border-rose-300'
                        }`}
                      >
                        <option value="Pending">Pending (অপেক্ষমাণ)</option>
                        <option value="Processing">Processing (প্রস্তুত)</option>
                        <option value="Shipped">Shipped (কুরিয়ারে)</option>
                        <option value="Delivered">Delivered (সম্পন্ন)</option>
                        <option value="Canceled">Canceled (বাতিল)</option>
                      </select>
                    </td>

                    {/* Courier Integration */}
                    <td className="py-3.5 px-4">
                      {order.courier ? (
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1">
                            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                              order.courier.provider === 'Steadfast' ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
                            }`}>
                              {order.courier.provider}
                            </span>
                            <span className="font-mono text-[11px] font-semibold text-stone-700">
                              {order.courier.trackingCode}
                            </span>
                          </div>
                          <div className="text-[10px] text-stone-500 truncate max-w-[140px]">
                            {order.courier.status || 'বুকিং সম্পন্ন'}
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          <button
                            onClick={() => setCourierDropdownOrderId(courierDropdownOrderId === order.id ? null : order.id)}
                            className="px-2.5 py-1 text-[11px] font-semibold bg-stone-100 hover:bg-amber-100 text-stone-800 hover:text-amber-900 border border-stone-300 rounded-md flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Truck className="w-3 h-3 text-amber-700" />
                            <span>কুরিয়ার পাঠান</span>
                            <ChevronDown className="w-3 h-3" />
                          </button>

                          {courierDropdownOrderId === order.id && (
                            <div className="absolute left-0 mt-1 w-44 bg-white border border-stone-200 rounded-lg shadow-lg z-20 py-1 text-xs">
                              <button
                                onClick={() => {
                                  onBookCourier(order.id, 'Steadfast');
                                  setCourierDropdownOrderId(null);
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-emerald-50 text-emerald-900 font-medium flex items-center gap-2 cursor-pointer"
                              >
                                <span>🚚 Steadfast Courier</span>
                              </button>
                              <button
                                onClick={() => {
                                  onBookCourier(order.id, 'Pathao');
                                  setCourierDropdownOrderId(null);
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-rose-50 text-rose-900 font-medium flex items-center gap-2 cursor-pointer"
                              >
                                <span>🛵 Pathao Courier</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Actions: Deliver Confirm, Invoice Print & Delete */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        {/* Quick 1-Click Deliver Confirm Button */}
                        {order.status !== 'Delivered' && order.status !== 'Canceled' && (
                          <button
                            onClick={() => handleMarkDelivered(order.id)}
                            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all shadow-2xs cursor-pointer active:scale-98"
                            title="অর্ডারটি ডেলিভারি সম্পন্ন মার্ক করুন (অটো-রিমুভ কার্যকর হবে)"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">ডেলিভারি</span>
                          </button>
                        )}

                        {/* Invoice Button */}
                        <button
                          onClick={() => onViewInvoice(order)}
                          className="px-2.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-amber-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors shadow-2xs cursor-pointer"
                          title="এক ক্লিকে ইনভয়েস প্রিন্ট"
                        >
                          <Printer className="w-3.5 h-3.5 text-amber-300" />
                          <span className="hidden sm:inline">ইনভয়েস</span>
                        </button>

                        {/* Direct Delete Button */}
                        <button
                          onClick={() => {
                            if (confirm(`আপনি কি নিশ্চিত যে অর্ডার #${order.id} চিরতরে মুছে ফেলতে চান?`)) {
                              onDeleteOrder?.(order.id);
                            }
                          }}
                          className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-200 cursor-pointer"
                          title="অর্ডারটি সম্পূর্ণ মুছে ফেলুন (Delete)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
