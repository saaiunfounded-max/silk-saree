'use client';

import React from 'react';
import Link from 'next/link';
import { Archive, Plus, AlertCircle } from 'lucide-react';
import { useMarketplace } from '@/lib/store';
import { formatPrice } from '@/lib/products';

export default function SellerInventoryPage() {
  const { getSellerProducts } = useMarketplace();
  const sellerProducts = getSellerProducts('seller-1');

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E8E2D5]">
        <h1 className="font-serif text-2xl sm:text-3xl text-[#111111]">
          Loom Inventory Management
        </h1>
        <p className="text-xs text-[#666666] mt-0.5">
          Real-time stock control for pure handloom silk sarees in production.
        </p>
      </div>

      <div className="bg-white border border-[#E8E2D5] overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#E8E2D5] bg-[#F4EFE5] text-[#555] uppercase tracking-wider text-[10px]">
              <th className="p-4">Saree Name</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Weaving Technique</th>
              <th className="p-4">Available Units</th>
              <th className="p-4">Inventory Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0ECE1]">
            {sellerProducts.map((p) => (
              <tr key={p.id} className="hover:bg-[#FCFAF6]">
                <td className="p-4 font-serif text-sm font-medium text-[#111111]">
                  {p.name}
                </td>
                <td className="p-4 font-mono text-[11px] text-[#666]">{p.sku}</td>
                <td className="p-4 text-[#555]">{p.weaving_technique}</td>
                <td className="p-4 font-semibold text-sm">{p.stock}</td>
                <td className="p-4">
                  {p.stock > 1 ? (
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 text-[10px] uppercase tracking-wider">
                      Optimal Stock
                    </span>
                  ) : (
                    <span className="text-amber-800 bg-amber-50 px-2 py-0.5 text-[10px] uppercase tracking-wider flex items-center gap-1 w-fit">
                      <AlertCircle className="w-3 h-3" /> Critical Stock
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
