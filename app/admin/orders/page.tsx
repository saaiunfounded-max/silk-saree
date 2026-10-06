'use client';

import React from 'react';
import { Package, CheckCircle2 } from 'lucide-react';
import { useMarketplace } from '@/lib/store';
import { formatPrice } from '@/lib/products';
import { ImageWithFallback } from '@/components/products/ImageWithFallback';

export default function AdminOrdersPage() {
  const { orders } = useMarketplace();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#2E2E2E] flex justify-between items-center">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-white">
            Marketplace Multi-Vendor Orders
          </h1>
          <p className="text-xs text-[#888888] mt-0.5">
            Detailed ledger of customer orders and guild allocations.
          </p>
        </div>
        <span className="text-xs text-[#B89B5E] uppercase tracking-wider font-medium">
          {orders.length} Active Orders
        </span>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-[#1C1C1C] border border-[#2E2E2E] p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#2E2E2E] gap-2">
              <div>
                <span className="font-mono text-sm font-bold text-white">
                  {order.order_number}
                </span>
                <span className="text-xs text-[#888888] ml-3">
                  Customer: {order.customer_name} ({order.shipping_address.city})
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {order.status}
                </span>
                <span className="font-serif text-lg font-bold text-[#B89B5E]">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>

            {/* Order Items with Multi-Vendor Guild breakdown */}
            <div className="divide-y divide-[#262626]">
              {order.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-14 bg-[#2A2A2A] flex-shrink-0">
                      <ImageWithFallback
                        src={item.product_image}
                        alt={item.product_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm text-white font-medium">{item.product_name}</h4>
                      <p className="text-[11px] text-[#8E77B3]">
                        Seller Guild: <strong>{item.seller_name}</strong> (ID: {item.seller_id})
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-serif font-semibold text-white">
                      {formatPrice(item.subtotal)}
                    </span>
                    <span className="block text-[10px] text-[#888888]">Qty: {item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-[#777777] flex justify-between border-t border-[#262626]">
              <span>Payment Channel: {order.payment_method}</span>
              <span>Dispatched to: {order.shipping_address.address_line_1}, {order.shipping_address.city}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
