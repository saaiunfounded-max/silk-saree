'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Award, Sparkles, MapPin, Clock } from 'lucide-react';
import { useMarketplace } from '@/lib/store';
import { ImageWithFallback } from '@/components/products/ImageWithFallback';
import { ProductCard } from '@/components/products/ProductCard';

export default function WeaverStoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { sellers, products } = useMarketplace();

  // Match by id or display name
  const seller =
    sellers.find((s) => s.id === slug || s.id === `seller-${slug}`) ||
    sellers[0];

  const weaverProducts = products.filter(
    (p) => p.seller_id === seller.id && p.approval_status === 'approved'
  );

  return (
    <div className="bg-[#F8F5EF] min-h-screen pb-24">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
        <Link
          href="/#weavers"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-[#666666] hover:text-black transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Master Weavers
        </Link>
      </div>

      {/* Hero Editorial Banner */}
      <div className="relative bg-[#181614] text-[#F8F5EF] py-16 sm:py-24 overflow-hidden border-y border-[#292929]">
        <div className="absolute inset-0 opacity-25">
          <ImageWithFallback
            src={seller.cover_url}
            alt={seller.business_name}
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 flex flex-col items-center text-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#B89B5E] mb-6 relative">
            <ImageWithFallback
              src={seller.avatar_url || seller.logo_url}
              alt={seller.display_name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex items-center gap-4 text-xs tracking-widest-luxury uppercase text-[#B89B5E] mb-3">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {seller.location}, {seller.region}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {seller.years_of_experience} Years of Craft
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F8F5EF] font-normal leading-tight mb-4">
            {seller.business_name}
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-[#E5DEF0] max-w-2xl mb-6">
            &ldquo;{seller.story_excerpt}&rdquo;
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#B89B5E]/40 text-[11px] uppercase tracking-widest-luxury text-[#B89B5E]">
            <Award className="w-3.5 h-3.5" /> {seller.craft_specialization}
          </div>
        </div>
      </div>

      {/* Weaver Chronicle & Heritage Narrative */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-16">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E] block mb-2 font-sans">
            THE CHRONICLE
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#111111]">
            THE LINEAGE OF {seller.display_name.toUpperCase()}
          </h2>
        </div>

        <div className="prose prose-lg mx-auto text-sm sm:text-base text-[#444444] font-light leading-relaxed space-y-6">
          <p>{seller.full_story}</p>
          <div className="p-6 bg-[#F2EDE2] border border-[#E0D8C7] my-8">
            <h4 className="font-serif text-base text-[#111111] font-semibold mb-2">
              Loom Technique & Heritage
            </h4>
            <p className="text-xs text-[#555555]">
              {seller.weaving_heritage || 'Traditional wooden pit-loom with ancestral jacquard/korvai harness.'}
            </p>
          </div>
          <p>
            When you purchase a saree directly from this atelier on THARI, 100% of the artisan earnings are disbursed directly without merchant deductions, empowering the preservation of living Indian loom arts.
          </p>
        </div>
      </div>

      {/* Weaver's Sarees Catalog */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-10 border-t border-[#E8E2D5]">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-10 pb-4 border-b border-[#E8E2D5]">
          <div>
            <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E] block font-sans">
              ATELIER ARCHIVE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#111111]">
              Sarees from {seller.display_name}
            </h3>
          </div>
          <span className="text-xs text-[#666666] tracking-wider uppercase mt-2 sm:mt-0">
            {weaverProducts.length} Heirloom {weaverProducts.length === 1 ? 'Piece' : 'Pieces'} Listed
          </span>
        </div>

        {weaverProducts.length === 0 ? (
          <div className="text-center py-16 text-xs text-[#777777]">
            Currently awaiting new loom cycles from this atelier.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {weaverProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
