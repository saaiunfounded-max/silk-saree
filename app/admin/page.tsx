'use client';

import React from 'react';
import Link from 'next/link';
import {
  DollarSign,
  Package,
  Users,
  Layers,
  ShieldAlert,
  Check,
  X,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useMarketplace } from '@/lib/store';
import { formatPrice } from '@/lib/products';
import { ImageWithFallback } from '@/components/products/ImageWithFallback';

export default function AdminDashboardPage() {
  const { products, sellers, orders, updateProductApproval } = useMarketplace();

  const totalGMV = 5710000 + orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = 142 + orders.length;
  const activeSellersCount = sellers.length;
  const activeProductsCount = products.filter((p) => p.approval_status === 'approved').length;
  const pendingApprovals = products.filter((p) => p.approval_status === 'pending');

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="pb-4 border-b border-[#2E2E2E] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#F8F5EF]">
            Marketplace Overview
          </h1>
          <p className="text-xs text-[#888888] mt-0.5">
            Holistic management of patron acquisitions, artisan guilds, and curation quality.
          </p>
        </div>
        <Link
          href="/admin/approvals"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#B89B5E] text-[#111111] hover:bg-[#D4BC84] text-xs uppercase tracking-luxury font-medium transition-colors"
        >
          Curate Submissions ({pendingApprovals.length})
        </Link>
      </div>

      {/* 5 TOP DASHBOARD CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-[#1C1C1C] border border-[#2E2E2E] p-4">
          <span className="text-[10px] tracking-wider uppercase text-[#B89B5E] block mb-1">
            MARKETPLACE GMV
          </span>
          <p className="font-serif text-xl sm:text-2xl font-bold text-white">
            {formatPrice(totalGMV)}
          </p>
          <span className="text-[10px] text-emerald-400 block mt-1">+18.5% YOY</span>
        </div>

        <div className="bg-[#1C1C1C] border border-[#2E2E2E] p-4">
          <span className="text-[10px] tracking-wider uppercase text-[#B89B5E] block mb-1">
            TOTAL ORDERS
          </span>
          <p className="font-serif text-xl sm:text-2xl font-bold text-white">
            {totalOrdersCount}
          </p>
          <span className="text-[10px] text-[#888888] block mt-1">Multi-Vendor items</span>
        </div>

        <div className="bg-[#1C1C1C] border border-[#2E2E2E] p-4">
          <span className="text-[10px] tracking-wider uppercase text-[#B89B5E] block mb-1">
            ACTIVE GUILDS
          </span>
          <p className="font-serif text-xl sm:text-2xl font-bold text-white">
            {activeSellersCount}
          </p>
          <span className="text-[10px] text-[#888888] block mt-1">Master Cooperatives</span>
        </div>

        <div className="bg-[#1C1C1C] border border-[#2E2E2E] p-4">
          <span className="text-[10px] tracking-wider uppercase text-[#B89B5E] block mb-1">
            APPROVED WEAVES
          </span>
          <p className="font-serif text-xl sm:text-2xl font-bold text-white">
            {activeProductsCount}
          </p>
          <span className="text-[10px] text-[#888888] block mt-1">Public on catalog</span>
        </div>

        <div className="bg-[#1C1C1C] border border-[#2E2E2E] p-4 col-span-2 lg:col-span-1">
          <span className="text-[10px] tracking-wider uppercase text-[#B89B5E] block mb-1">
            PENDING APPROVALS
          </span>
          <p className="font-serif text-xl sm:text-2xl font-bold text-rose-400">
            {pendingApprovals.length}
          </p>
          <span className="text-[10px] text-[#AAAAAA] block mt-1">Action required</span>
        </div>
      </div>

      {/* PENDING APPROVALS QUEUE */}
      <div className="bg-[#1C1C1C] border border-[#2E2E2E] p-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#2E2E2E] mb-6">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#B89B5E]" />
            <h2 className="font-serif text-xl text-white">Pending Product Approvals</h2>
          </div>
          <Link
            href="/admin/approvals"
            className="text-xs text-[#B89B5E] hover:underline uppercase tracking-wider"
          >
            Review All
          </Link>
        </div>

        {pendingApprovals.length === 0 ? (
          <div className="text-center py-8 text-xs text-[#888888]">
            All submitted handloom creations have been reviewed and approved.
          </div>
        ) : (
          <div className="divide-y divide-[#2E2E2E]">
            {pendingApprovals.map((p) => (
              <div key={p.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-16 bg-[#252525] flex-shrink-0">
                    <ImageWithFallback
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-base text-white">{p.name}</h3>
                    <p className="text-xs text-[#888888]">
                      Weaver: <span className="text-[#E5DEF0]">{p.seller_name}</span> &bull; {p.silk_type} &bull; {formatPrice(p.price)}
                    </p>
                    <p className="text-[11px] text-[#666666] line-clamp-1 mt-0.5">
                      Technique: {p.weaving_technique}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => updateProductApproval(p.id, 'approved')}
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs uppercase tracking-wider flex items-center gap-1 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve
                  </button>
                  <button
                    onClick={() => updateProductApproval(p.id, 'rejected')}
                    className="px-3 py-1.5 bg-rose-800 hover:bg-rose-700 text-white text-xs uppercase tracking-wider flex items-center gap-1 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SELLER PERFORMANCE & RECENT MARKETPLACE ORDERS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Seller Guild Performance */}
        <div className="bg-[#1C1C1C] border border-[#2E2E2E] p-6">
          <h2 className="font-serif text-xl text-white pb-3 border-b border-[#2E2E2E] mb-4">
            Seller Guild Performance
          </h2>
          <div className="space-y-4">
            {sellers.map((seller) => (
              <div key={seller.id} className="p-3 bg-[#242424] border border-[#2E2E2E] flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm text-white font-medium">
                    {seller.business_name}
                  </h4>
                  <p className="text-[11px] text-[#888888]">
                    {seller.location}, {seller.region} &bull; {seller.craft_specialization.split(' ')[0]}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-sm font-bold text-[#B89B5E]">
                    {formatPrice(seller.total_sales || 1200000)}
                  </span>
                  <span className="block text-[10px] text-emerald-400">★ {seller.rating || 4.9}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders Overview */}
        <div className="bg-[#1C1C1C] border border-[#2E2E2E] p-6">
          <h2 className="font-serif text-xl text-white pb-3 border-b border-[#2E2E2E] mb-4">
            Recent Multi-Vendor Orders
          </h2>
          <div className="space-y-3">
            {orders.slice(0, 4).map((order) => (
              <div key={order.id} className="p-3 bg-[#242424] border border-[#2E2E2E] flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs text-white font-bold block">
                    {order.order_number}
                  </span>
                  <p className="text-[11px] text-[#888888]">
                    {order.customer_name} &bull; {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-sm font-semibold text-white">
                    {formatPrice(order.total)}
                  </span>
                  <span className="block text-[10px] text-[#B9A7D4] uppercase">
                    {order.payment_method}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
