'use client';

import React from 'react';
import Link from 'next/link';
import { Package, Heart, Shield, ArrowRight } from 'lucide-react';
import { useMarketplace } from '@/lib/store';
import { useAuth } from '@/lib/auth';
import { formatPrice } from '@/lib/products';

export default function AccountOverviewPage() {
  const { orders, wishlist, approvedProducts } = useMarketplace();
  const { user } = useAuth();

  const recentOrder = orders[0];

  return (
    <div className="space-y-10">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#E8E2D5] p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E]">
              TOTAL ACQUISITIONS
            </span>
            <Package className="w-4 h-4 text-[#B89B5E]" />
          </div>
          <p className="font-serif text-3xl text-[#111111]">{orders.length}</p>
          <Link
            href="/account/orders"
            className="text-xs text-[#8E77B3] hover:underline uppercase tracking-luxury mt-3 inline-block"
          >
            View Orders &rarr;
          </Link>
        </div>

        <div className="bg-white border border-[#E8E2D5] p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E]">
              SAVED SILKS
            </span>
            <Heart className="w-4 h-4 text-[#B89B5E]" />
          </div>
          <p className="font-serif text-3xl text-[#111111]">{wishlist.length}</p>
          <Link
            href="/account/wishlist"
            className="text-xs text-[#8E77B3] hover:underline uppercase tracking-luxury mt-3 inline-block"
          >
            Open Wishlist &rarr;
          </Link>
        </div>

        <div className="bg-white border border-[#E8E2D5] p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E]">
              AUTHENTICITY MEMBERSHIP
            </span>
            <Shield className="w-4 h-4 text-[#B89B5E]" />
          </div>
          <p className="font-serif text-xl text-[#111111]">THARI Connoisseur</p>
          <p className="text-xs text-[#777777] mt-1">Direct Artisan Sourcing Guarantee</p>
        </div>
      </div>

      {/* Recent Order Preview */}
      <div className="bg-white border border-[#E8E2D5] p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5] mb-6">
          <h2 className="font-serif text-xl text-[#111111]">Recent Acquisition</h2>
          {recentOrder && (
            <Link
              href="/account/orders"
              className="text-xs text-[#B89B5E] hover:underline uppercase tracking-luxury"
            >
              See All Orders
            </Link>
          )}
        </div>

        {recentOrder ? (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#111111]">
                {recentOrder.order_number}
              </span>
              <p className="text-xs text-[#666666] mt-0.5">
                Placed on {new Date(recentOrder.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} &bull; {recentOrder.items.length} {recentOrder.items.length === 1 ? 'saree' : 'sarees'}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-block px-2 py-0.5 text-[10px] tracking-wider uppercase bg-[#E5DEF0] text-[#4A2D75]">
                  {recentOrder.status}
                </span>
                <span className="text-xs text-[#777777]">
                  Payment: {recentOrder.payment_status.toUpperCase()} ({recentOrder.payment_method})
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="font-serif text-xl font-bold text-[#111111]">
                {formatPrice(recentOrder.total)}
              </span>
              <Link
                href="/account/orders"
                className="block text-xs uppercase tracking-luxury text-[#111111] hover:text-[#B89B5E] underline mt-1"
              >
                Track Shipment Details
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-xs text-[#777777]">No acquisitions recorded yet.</p>
        )}
      </div>
    </div>
  );
}
