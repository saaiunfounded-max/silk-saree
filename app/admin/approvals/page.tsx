'use client';

import React, { useState } from 'react';
import { ShieldCheck, Check, X, AlertTriangle, Eye } from 'lucide-react';
import { useMarketplace } from '@/lib/store';
import { formatPrice } from '@/lib/products';
import { ImageWithFallback } from '@/components/products/ImageWithFallback';
import Link from 'next/link';

export default function AdminApprovalsPage() {
  const { products, updateProductApproval } = useMarketplace();
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const filtered = products.filter((p) => p.approval_status === activeTab);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#2E2E2E]">
        <h1 className="font-serif text-2xl sm:text-3xl text-white">
          Product Approval & Moderation Center
        </h1>
        <p className="text-xs text-[#888888] mt-0.5">
          Verify Silk Mark compliance, precious zari guarantees, and photo quality before publishing to public patrons.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 border-b border-[#2E2E2E]">
        {(['pending', 'approved', 'rejected'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-xs tracking-wider uppercase border-b-2 font-medium transition-colors ${
              activeTab === tab
                ? 'border-[#B89B5E] text-[#B89B5E]'
                : 'border-transparent text-[#888888] hover:text-white'
            }`}
          >
            {tab} (
            {products.filter((p) => p.approval_status === tab).length}
            )
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-[#1C1C1C] border border-[#2E2E2E] p-12 text-center text-xs text-[#888888]">
          No products currently under &ldquo;{activeTab}&rdquo; status.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-[#1C1C1C] border border-[#2E2E2E] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-5">
                <div className="relative w-20 h-28 bg-[#252525] flex-shrink-0">
                  <ImageWithFallback
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 bg-[#2A2A2A] text-[#B89B5E]">
                      {p.silk_type}
                    </span>
                    <span className="font-mono text-xs text-[#888888]">SKU: {p.sku}</span>
                  </div>
                  <h3 className="font-serif text-lg text-white font-medium">{p.name}</h3>
                  <p className="text-xs text-[#AAAAAA]">
                    Artisan Guild: <strong className="text-white">{p.seller_name}</strong> &bull; {p.region}
                  </p>
                  <p className="text-xs text-[#888888]">
                    Technique: {p.weaving_technique} &bull; Zari: {p.zari || 'Precious Zari'}
                  </p>
                  <p className="font-serif text-base font-semibold text-[#B89B5E] pt-1">
                    {formatPrice(p.price)}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0 border-[#2E2E2E]">
                <Link
                  href={`/product/${p.slug}`}
                  className="px-3 py-2 bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  target="_blank"
                >
                  <Eye className="w-3.5 h-3.5" /> Preview
                </Link>

                {activeTab !== 'approved' && (
                  <button
                    onClick={() => updateProductApproval(p.id, 'approved')}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors font-medium"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve & Publish
                  </button>
                )}

                {activeTab !== 'rejected' && (
                  <button
                    onClick={() => updateProductApproval(p.id, 'rejected')}
                    className="px-4 py-2 bg-rose-800 hover:bg-rose-700 text-white text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors font-medium"
                  >
                    <X className="w-3.5 h-3.5" /> Reject
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
