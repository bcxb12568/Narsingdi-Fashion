import React, { useState } from 'react';
import { Customer, Order } from '../../types';
import { Search, Phone, Mail, MapPin, ShoppingBag, Eye, X } from 'lucide-react';

interface AdminCustomersProps {
  customers: Customer[];
  orders: Order[];
}

export const AdminCustomers: React.FC<AdminCustomersProps> = ({
  customers,
  orders
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(c => {
    const q = searchQuery.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.phone.includes(q) || c.district.toLowerCase().includes(q);
  });

  const customerOrders = selectedCustomer
    ? orders.filter(o => o.customerPhone === selectedCustomer.phone || o.customerName === selectedCustomer.name)
    : [];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-stone-900">
            কাস্টমার ও বায়ার ডাটাবেজ
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            নিয়মিত ক্রেতা ও পাইকারি বুটিক রিসেলারদের ফোন নম্বর ও কেনাকাটার ইতিহাস
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="নাম, ফোন বা জেলা দিয়ে খুঁজুন..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-hidden focus:border-amber-600"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-100/70 border-b border-stone-200 text-stone-700 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">কাস্টমারের নাম</th>
                <th className="py-3 px-4">মোবাইল নম্বর ও যোগাযোগ</th>
                <th className="py-3 px-4">ঠিকানা ও জেলা</th>
                <th className="py-3 px-4 text-center">মোট অর্ডার</th>
                <th className="py-3 px-4 text-right">সর্বমোট কেনাকাটা (LTV)</th>
                <th className="py-3 px-4">সর্বশেষ অর্ডার</th>
                <th className="py-3 px-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredCustomers.map(customer => (
                <tr key={customer.id} className="hover:bg-stone-50/80 transition-colors">
                  
                  {/* Name */}
                  <td className="py-3.5 px-4 font-semibold text-stone-900">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xs">
                        {customer.name.slice(0, 1)}
                      </div>
                      <div>
                        <div>{customer.name}</div>
                        {customer.totalSpent >= 20000 && (
                          <span className="text-[10px] text-amber-800 font-medium">★ পাইকারি ভিআইপি বায়ার</span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Phone */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <a 
                        href={`tel:${customer.phone}`} 
                        className="font-mono text-stone-900 hover:text-amber-700 font-semibold flex items-center gap-1"
                        title="সরাসরি কল দিন"
                      >
                        <Phone className="w-3 h-3 text-emerald-600" />
                        <span>{customer.phone}</span>
                      </a>
                    </div>
                    {customer.email && (
                      <div className="text-[10px] text-stone-500 mt-0.5">{customer.email}</div>
                    )}
                  </td>

                  {/* Address */}
                  <td className="py-3.5 px-4 max-w-[200px]">
                    <div className="font-medium text-stone-800">{customer.district}</div>
                    <div className="text-[11px] text-stone-500 truncate" title={customer.address}>
                      {customer.address}
                    </div>
                  </td>

                  {/* Total Orders */}
                  <td className="py-3.5 px-4 text-center font-bold font-mono tabular-nums">
                    {customer.totalOrders}
                  </td>

                  {/* Lifetime Value */}
                  <td className="py-3.5 px-4 text-right font-bold text-stone-900 tabular-nums">
                    ৳{customer.totalSpent.toLocaleString('bn-BD')}
                  </td>

                  {/* Last Order Date */}
                  <td className="py-3.5 px-4 text-stone-600 text-[11px]">
                    {customer.lastOrderDate}
                  </td>

                  {/* History button */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="px-2.5 py-1 text-xs bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg flex items-center gap-1 ml-auto transition-colors"
                      title="কেনাকাটার ইতিহাস দেখুন"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>ইতিহাস</span>
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Purchase History Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-stone-200 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-stone-200 pb-4">
              <div>
                <h3 className="font-serif-brand text-2xl font-bold text-stone-900">
                  {selectedCustomer.name}
                </h3>
                <div className="text-xs text-stone-500 font-mono mt-0.5">
                  ফোন: {selectedCustomer.phone} · জেলা: {selectedCustomer.district}
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1 rounded-lg text-stone-400 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50 rounded-xl text-xs">
                <div>
                  <span className="text-stone-500 block">মোট সফল অর্ডার:</span>
                  <span className="font-bold text-sm text-stone-900 font-mono">{selectedCustomer.totalOrders} টি</span>
                </div>
                <div>
                  <span className="text-stone-500 block">মোট কেনাকাটার মূল্য:</span>
                  <span className="font-bold text-sm text-amber-800 font-mono">৳{selectedCustomer.totalSpent.toLocaleString('bn-BD')}</span>
                </div>
              </div>

              <div className="font-semibold text-xs text-stone-800 pt-2">
                অর্ডার হিস্ট্রি ({customerOrders.length}):
              </div>

              {customerOrders.length === 0 ? (
                <div className="text-xs text-stone-500 text-center py-4">
                  সাম্প্রতিক ডাটাবেজে বিস্তারিত রেকর্ড সংরক্ষিত হচ্ছে।
                </div>
              ) : (
                <div className="space-y-2">
                  {customerOrders.map(ord => (
                    <div key={ord.id} className="p-3 border border-stone-200 rounded-xl text-xs space-y-1">
                      <div className="flex justify-between font-mono font-bold text-stone-900">
                        <span>#{ord.id}</span>
                        <span>৳{ord.grandTotal.toLocaleString('bn-BD')}</span>
                      </div>
                      <div className="text-[11px] text-stone-500">{ord.date}</div>
                      <div className="text-stone-700">
                        {ord.items.map(i => `${i.product.titleBn} (x${i.quantity})`).join(', ')}
                      </div>
                      <div className="text-[10px] text-amber-800 font-semibold pt-1">
                        স্ট্যাটাস: {ord.status} · {ord.paymentMethod.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
