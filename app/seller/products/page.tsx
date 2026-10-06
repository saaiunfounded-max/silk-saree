'use client';

import React from 'react';
import Link from 'next/link';
import { PlusCircle, Eye, Trash2, Edit } from 'lucide-react';
import { useMarketplace } from '@/lib/store';
import { formatPrice } from '@/lib/products';
import { ImageWithFallback } from '@/components/products/ImageWithFallback';

export default function SellerProductsPage() {
  const { getSellerProducts } = useMarketplace();
  const sellerProducts = getSellerProducts('seller-1');

  const getStatusBadge = (status: string, approval: string) => {
    if (approval === 'pending') {
      return (
        <span className="px-2 py-0.5 text-[10px] tracking-wider uppercase font-medium bg-[#E5DEF0] text-[#4A2D75]">
          Pending Review
        </span>
      );
    }
    if (approval === 'rejected') {
      return (
        <span className="px-2 py-0.5 text-[10px] tracking-wider uppercase font-medium bg-rose-100 text-rose-800">
          Rejected
        </span>
      );
    }
    if (status === 'out_of_stock') {
      return (
        <span className="px-2 py-0.5 text-[10px] tracking-wider uppercase font-medium bg-amber-100 text-amber-800">
          Out of Stock
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 text-[10px] tracking-wider uppercase font-medium bg-emerald-100 text-emerald-800">
        Published
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8E2D5] gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#111111]">
            Loom Products Catalog
          </h1>
          <p className="text-xs text-[#666666] mt-0.5">
            Manage your guild&apos;s active weaves, inventory levels, and moderation status.
          </p>
        </div>
        <Link
          href="/seller/products/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#111111] text-[#F8F5EF] hover:bg-[#B89B5E] hover:text-[#111111] text-xs uppercase tracking-luxury font-medium transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5" /> Add New Saree
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-[#E8E2D5] overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#E8E2D5] bg-[#F4EFE5] text-[#555555] uppercase tracking-wider text-[10px]">
              <th className="p-4">Product</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Silk Type</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0ECE1]">
            {sellerProducts.map((p) => (
              <tr key={p.id} className="hover:bg-[#FCFAF6] transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-14 bg-[#E8E2D5] flex-shrink-0">
                      <ImageWithFallback
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm text-[#111111] font-medium leading-tight">
                        {p.name}
                      </h4>
                      <span className="text-[10px] text-[#777777]">{p.region}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-mono text-[11px] text-[#666666]">{p.sku}</td>
                <td className="p-4 text-[#444444]">{p.silk_type}</td>
                <td className="p-4 font-serif font-semibold text-[#111111]">
                  {formatPrice(p.price)}
                </td>
                <td className="p-4">
                  <span className={p.stock <= 1 ? 'text-amber-800 font-bold' : 'text-[#333]'}>
                    {p.stock}
                  </span>
                </td>
                <td className="p-4">{getStatusBadge(p.status, p.approval_status)}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/product/${p.slug}`}
                      className="p-1.5 text-[#555] hover:text-[#111] hover:bg-[#F2EDE2]"
                      title="View public page"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
