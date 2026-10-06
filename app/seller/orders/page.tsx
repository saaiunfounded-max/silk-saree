'use client';

import React from 'react';
import { PackageCheck, Truck, Check } from 'lucide-react';
import { useMarketplace } from '@/lib/store';
import { formatPrice } from '@/lib/products';
import { ImageWithFallback } from '@/components/products/ImageWithFallback';

export default function SellerOrdersPage() {
  const { getSellerOrders } = useMarketplace();
  const sellerOrders = getSellerOrders('seller-1');

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E8E2D5]">
        <h1 className="font-serif text-2xl sm:text-3xl text-[#111111]">
          Weaver Fulfillment & Orders
        </h1>
        <p className="text-xs text-[#666666] mt-0.5">
          Order dispatches allocated specifically to Sundaram Silk Guild looms.
        </p>
      </div>

      {sellerOrders.length === 0 ? (
        <div className="bg-white border border-[#E8E2D5] p-12 text-center">
          <PackageCheck className="w-10 h-10 text-[#CCCCCC] mx-auto mb-3" />
          <h3 className="font-serif text-lg text-[#111111] mb-1">No Orders Allocated Yet</h3>
          <p className="text-xs text-[#777777]">
            As customers purchase your Kanchipuram sarees, they will populate here for white-glove courier pickup.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-[#E8E2D5] divide-y divide-[#F0ECE1]">
          {sellerOrders.map((item) => (
            <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-20 bg-[#E8E2D5] flex-shrink-0">
                  <ImageWithFallback
                    src={item.product_image}
                    alt={item.product_name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] tracking-wider uppercase text-[#B89B5E] block">
                    ALLOCATED ORDER REF: {item.order_id}
                  </span>
                  <h4 className="font-serif text-base text-[#111111] font-medium">
                    {item.product_name}
                  </h4>
                  <p className="text-xs text-[#777777]">
                    {item.silk_type} &bull; Quantity: {item.quantity}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
                <span className="font-serif text-base font-bold text-[#111111]">
                  Disbursement: {formatPrice(item.subtotal * 0.9)}
                </span>
                <span className="text-[10px] text-[#888888]">
                  (Gross: {formatPrice(item.subtotal)} minus 10% platform settlement)
                </span>
                <button className="px-4 py-1.5 bg-[#111111] text-[#F8F5EF] hover:bg-[#B89B5E] hover:text-[#111111] text-xs uppercase tracking-luxury font-medium transition-colors flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" /> Confirm Insured Dispatch
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
