'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, MapPin, Award } from 'lucide-react';
import { useMarketplace } from '@/lib/store';
import { formatPrice } from '@/lib/products';
import { ImageWithFallback } from '@/components/products/ImageWithFallback';

export default function AdminSellersPage() {
  const { sellers, products } = useMarketplace();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#2E2E2E]">
        <h1 className="font-serif text-2xl sm:text-3xl text-white">
          Artisan Guilds & Weaving Partners
        </h1>
        <p className="text-xs text-[#888888] mt-0.5">
          Master cooperatives enrolled in the THARI direct-to-patron network.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sellers.map((seller) => {
          const sellerProductCount = products.filter((p) => p.seller_id === seller.id).length;
          return (
            <div key={seller.id} className="bg-[#1C1C1C] border border-[#2E2E2E] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-[#B89B5E] relative flex-shrink-0">
                    <ImageWithFallback
                      src={seller.avatar_url || seller.logo_url}
                      alt={seller.display_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-white font-medium">
                      {seller.business_name}
                    </h3>
                    <p className="text-xs text-[#AAAAAA] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#B89B5E]" />
                      {seller.location}, {seller.region}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-[#242424] border border-[#2E2E2E] mb-4 text-xs">
                  <span className="text-[10px] text-[#B89B5E] uppercase tracking-wider block mb-0.5">
                    Craft Lineage
                  </span>
                  <p className="text-[#CCCCCC]">{seller.craft_specialization}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs border-y border-[#2E2E2E] py-3 mb-4">
                  <div>
                    <span className="text-[10px] text-[#888888] block">Experience</span>
                    <span className="font-bold text-white">{seller.years_of_experience} Yrs</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#888888] block">Live Weaves</span>
                    <span className="font-bold text-white">{sellerProductCount} Sarees</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#888888] block">Patron Rating</span>
                    <span className="font-bold text-emerald-400">★ {seller.rating || 4.9}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-[#888888]">
                  Sales: <strong className="text-white font-serif">{formatPrice(seller.total_sales || 1000000)}</strong>
                </span>
                <Link
                  href={`/weavers/${seller.id}`}
                  className="text-xs uppercase tracking-wider text-[#B89B5E] hover:underline flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> View Public Story
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
