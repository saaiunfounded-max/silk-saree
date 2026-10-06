'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, ShieldCheck, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { useMarketplace } from '@/lib/store';
import { formatPrice } from '@/lib/products';
import { ImageWithFallback } from '@/components/products/ImageWithFallback';

export default function AdminProductsPage() {
  const { products } = useMarketplace();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#2E2E2E] flex justify-between items-center">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-white">
            Marketplace Products Directory
          </h1>
          <p className="text-xs text-[#888888] mt-0.5">
            Complete inventory across all registered Indian weaving cooperatives.
          </p>
        </div>
        <span className="text-xs text-[#B89B5E] uppercase tracking-wider font-medium">
          {products.length} Sarees Listed
        </span>
      </div>

      <div className="bg-[#1C1C1C] border border-[#2E2E2E] overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#2E2E2E] bg-[#242424] text-[#AAAAAA] uppercase tracking-wider text-[10px]">
              <th className="p-4">Saree</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Artisan Guild</th>
              <th className="p-4">Silk Type</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Approval</th>
              <th className="p-4 text-right">Preview</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2E2E2E]">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-[#222222]">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-12 bg-[#2E2E2E] flex-shrink-0">
                      <ImageWithFallback
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm text-white font-medium">{p.name}</h4>
                      <span className="text-[10px] text-[#888888]">{p.region}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-mono text-[11px] text-[#888888]">{p.sku}</td>
                <td className="p-4 text-[#E5DEF0]">{p.seller_name}</td>
                <td className="p-4 text-[#AAAAAA]">{p.silk_type}</td>
                <td className="p-4 font-serif font-semibold text-white">
                  {formatPrice(p.price)}
                </td>
                <td className="p-4 text-white">{p.stock}</td>
                <td className="p-4">
                  {p.approval_status === 'approved' ? (
                    <span className="px-2 py-0.5 text-[10px] tracking-wider uppercase font-medium bg-emerald-950 text-emerald-400 border border-emerald-800">
                      Approved
                    </span>
                  ) : p.approval_status === 'rejected' ? (
                    <span className="px-2 py-0.5 text-[10px] tracking-wider uppercase font-medium bg-rose-950 text-rose-400 border border-rose-800">
                      Rejected
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[10px] tracking-wider uppercase font-medium bg-amber-950 text-amber-300 border border-amber-800">
                      Pending
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <Link
                    href={`/product/${p.slug}`}
                    className="p-1.5 text-[#888888] hover:text-white inline-block"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
