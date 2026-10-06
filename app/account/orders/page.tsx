'use client';

import React from 'react';
import Link from 'next/link';
import { Package, ArrowRight, ExternalLink } from 'lucide-react';
import { useMarketplace } from '@/lib/store';
import { formatPrice } from '@/lib/products';
import { ImageWithFallback } from '@/components/products/ImageWithFallback';

export default function AccountOrdersPage() {
  const { orders } = useMarketplace();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5]">
        <div>
          <h2 className="font-serif text-2xl text-[#111111]">Order History</h2>
          <p className="text-xs text-[#666666] mt-0.5">
            Verified provenance and dispatch records for your silk acquisitions.
          </p>
        </div>
        <span className="text-xs uppercase tracking-luxury text-[#B89B5E]">
          {orders.length} {orders.length === 1 ? 'ORDER' : 'ORDERS'}
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border border-[#E8E2D5] p-12 text-center">
          <Package className="w-10 h-10 text-[#CCCCCC] mx-auto mb-3" />
          <h3 className="font-serif text-lg text-[#111111] mb-1">No Orders Placed Yet</h3>
          <p className="text-xs text-[#777777] mb-6">Explore our curated collections of pure silk sarees.</p>
          <Link
            href="/shop"
            className="px-6 py-2.5 bg-[#111111] text-[#F8F5EF] text-xs uppercase tracking-luxury hover:bg-[#B89B5E]"
          >
            Explore Silks
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-[#E8E2D5] p-6 sm:p-8">
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8E2D5] gap-2 mb-6">
                <div>
                  <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E] block">
                    ORDER REFERENCE
                  </span>
                  <span className="font-mono text-sm font-bold text-[#111111]">
                    {order.order_number}
                  </span>
                  <span className="text-xs text-[#888888] ml-3">
                    Placed on {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 text-[10px] tracking-wider uppercase font-medium bg-[#E5DEF0] text-[#4A2D75]">
                    STATUS: {order.status.toUpperCase()}
                  </span>
                  <span className="font-serif text-lg font-bold text-[#111111]">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="divide-y divide-[#F0ECE1] mb-6">
                {order.items.map((item) => (
                  <div key={item.id} className="py-4 flex gap-4 items-center">
                    <div className="relative w-16 h-20 bg-[#E8E2D5] flex-shrink-0">
                      <ImageWithFallback
                        src={item.product_image}
                        alt={item.product_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-serif text-base text-[#111111]">
                        {item.product_name}
                      </h4>
                      <p className="text-xs text-[#777777]">
                        {item.silk_type} &bull; Qty: {item.quantity}
                      </p>
                      <p className="text-xs text-[#8E77B3]">
                        Weaver Guild: {item.seller_name}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-serif text-sm font-semibold text-[#111111]">
                        {formatPrice(item.subtotal)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping & Payment Meta */}
              <div className="bg-[#FCFAF6] border border-[#F0ECE1] p-4 text-xs text-[#666666] flex flex-col sm:flex-row justify-between gap-3">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#888888] mb-0.5">
                    Shipping Address
                  </span>
                  <span>
                    {order.shipping_address.name}, {order.shipping_address.address_line_1}, {order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.postal_code}
                  </span>
                </div>
                <div className="text-left sm:text-right">
                  <span className="block text-[10px] uppercase tracking-wider text-[#888888] mb-0.5">
                    Payment Channel
                  </span>
                  <span>{order.payment_method} (Verified)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
