'use client';

import React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Package,
  Layers,
  Clock,
  AlertTriangle,
  PlusCircle,
  ArrowRight
} from 'lucide-react';
import { useMarketplace } from '@/lib/store';
import { formatPrice } from '@/lib/products';
import { ImageWithFallback } from '@/components/products/ImageWithFallback';

export default function SellerDashboardPage() {
  const { products, getSellerProducts, getSellerOrders } = useMarketplace();

  // Sundaram Guild is seller-1
  const sellerId = 'seller-1';
  const sellerProducts = getSellerProducts(sellerId);
  const sellerOrders = getSellerOrders(sellerId);

  const totalSales = 1420000 + (sellerOrders.length > 0 ? sellerOrders.reduce((sum, o) => sum + o.subtotal, 0) : 0);
  const pendingReviewCount = sellerProducts.filter((p) => p.approval_status === 'pending').length;
  const lowStockProducts = sellerProducts.filter((p) => p.stock <= 1);

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E2D5]">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#111111]">
            Weaver Portal Dashboard
          </h1>
          <p className="text-xs text-[#666666] mt-0.5">
            Real-time analytics and production tracking for Sundaram Silk Guild.
          </p>
        </div>
        <Link
          href="/seller/products/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#111111] text-[#F8F5EF] hover:bg-[#B89B5E] hover:text-[#111111] text-xs uppercase tracking-luxury font-medium transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5" /> List New Saree
        </Link>
      </div>

      {/* 4 TOP CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white border border-[#E8E2D5] p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E]">
              TOTAL SALES
            </span>
            <TrendingUp className="w-4 h-4 text-[#B89B5E]" />
          </div>
          <p className="font-serif text-2xl font-bold text-[#111111]">
            {formatPrice(totalSales)}
          </p>
          <span className="text-[10px] text-emerald-700 block mt-1">+14.2% this quarter</span>
        </div>

        <div className="bg-white border border-[#E8E2D5] p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E]">
              TOTAL ORDERS
            </span>
            <Package className="w-4 h-4 text-[#B89B5E]" />
          </div>
          <p className="font-serif text-2xl font-bold text-[#111111]">
            {28 + sellerOrders.length}
          </p>
          <span className="text-[10px] text-[#666666] block mt-1">Across 14 cities</span>
        </div>

        <div className="bg-white border border-[#E8E2D5] p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E]">
              CATALOG ITEMS
            </span>
            <Layers className="w-4 h-4 text-[#B89B5E]" />
          </div>
          <p className="font-serif text-2xl font-bold text-[#111111]">
            {sellerProducts.length}
          </p>
          <span className="text-[10px] text-[#666666] block mt-1">Active pit-loom weaves</span>
        </div>

        <div className="bg-white border border-[#E8E2D5] p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E]">
              PENDING REVIEW
            </span>
            <Clock className="w-4 h-4 text-[#B89B5E]" />
          </div>
          <p className="font-serif text-2xl font-bold text-[#111111]">
            {pendingReviewCount}
          </p>
          <span className="text-[10px] text-[#8E77B3] block mt-1">Awaiting admin curator</span>
        </div>
      </div>

      {/* SALES PERFORMANCE VISUALIZATION & INVENTORY ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sales Performance Graphic */}
        <div className="lg:col-span-8 bg-white border border-[#E8E2D5] p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5] mb-6">
            <div>
              <h3 className="font-serif text-lg text-[#111111]">Monthly Weaver Earnings</h3>
              <p className="text-xs text-[#777777]">Direct artisan disbursement trajectory (INR Lakhs)</p>
            </div>
            <span className="text-xs text-[#B89B5E] font-serif font-semibold">2024 Cycle</span>
          </div>

          {/* Simple Visual Bar Trajectory */}
          <div className="h-48 flex items-end gap-3 sm:gap-6 pt-6 pb-2 px-2 border-b border-[#F0ECE1]">
            {[
              { month: 'Oct', val: 55, rev: '₹2.4L' },
              { month: 'Nov', val: 78, rev: '₹3.8L' },
              { month: 'Dec', val: 92, rev: '₹4.6L' },
              { month: 'Jan', val: 68, rev: '₹3.2L' },
              { month: 'Feb', val: 85, rev: '₹4.1L' },
              { month: 'Mar', val: 95, rev: '₹4.9L' },
            ].map((bar) => (
              <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] text-[#888888] opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.rev}
                </span>
                <div
                  className="w-full bg-[#E5DEF0] group-hover:bg-[#B89B5E] transition-colors rounded-t-sm"
                  style={{ height: `${bar.val}%` }}
                />
                <span className="text-[11px] text-[#555555] font-sans">{bar.month}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 text-xs text-[#666666]">
            <span>Average Order Value: ₹44,200</span>
            <span className="text-emerald-700 font-medium">100% Zero Delay Settlements</span>
          </div>
        </div>

        {/* Inventory Alerts Box */}
        <div className="lg:col-span-4 bg-white border border-[#E8E2D5] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-[#E8E2D5] mb-4 text-[#8E743F]">
              <AlertTriangle className="w-4 h-4 text-[#B89B5E]" />
              <h3 className="font-serif text-base text-[#111111]">Loom Inventory Alerts</h3>
            </div>

            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-[#777777]">All weaves adequately stocked.</p>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.map((p) => (
                  <div key={p.id} className="p-3 bg-[#FCFAF6] border border-[#F0ECE1] text-xs">
                    <h4 className="font-serif font-medium text-[#111111] truncate">{p.name}</h4>
                    <div className="flex justify-between items-center mt-1 text-[11px] text-[#777777]">
                      <span>SKU: {p.sku}</span>
                      <span className="text-amber-800 font-medium">Stock: {p.stock} remaining</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-[#E8E2D5]">
            <Link
              href="/seller/products"
              className="text-xs uppercase tracking-luxury text-[#111111] hover:text-[#B89B5E] font-medium flex items-center justify-between"
            >
              <span>Manage All Inventory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* RECENT ORDERS FOR THIS SELLER */}
      <div className="bg-white border border-[#E8E2D5] p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5] mb-6">
          <h3 className="font-serif text-xl text-[#111111]">Recent Orders Allocated to Guild</h3>
          <Link
            href="/seller/orders"
            className="text-xs uppercase tracking-luxury text-[#B89B5E] hover:underline"
          >
            View All
          </Link>
        </div>

        {sellerOrders.length === 0 ? (
          <div className="text-center py-8 text-xs text-[#777777]">
            <p>Demo orders placed by customers will appear directly in this dispatch queue.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#F0ECE1]">
            {sellerOrders.map((item) => (
              <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-16 bg-[#E8E2D5]">
                    <ImageWithFallback
                      src={item.product_image}
                      alt={item.product_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-[#111111]">{item.product_name}</h4>
                    <p className="text-xs text-[#777777]">
                      Order Ref: {item.order_id} &bull; Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-serif text-sm font-semibold text-[#111111]">
                    {formatPrice(item.subtotal)}
                  </span>
                  <span className="block text-[10px] text-emerald-700 font-medium">READY TO DISPATCH</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
