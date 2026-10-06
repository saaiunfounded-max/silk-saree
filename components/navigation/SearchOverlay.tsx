'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight } from 'lucide-react';
import { useMarketplace } from '@/lib/store';
import { formatPrice } from '@/lib/products';
import { ImageWithFallback } from '@/components/products/ImageWithFallback';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTIONS = [
  'Kanchipuram Temple Gold',
  'Banarasi Kadhwa',
  'Pure Mysore Crepe',
  'Wild Tussar',
  'Chanderi Zari',
  'Sundaram Weavers',
  'Bridal Silk'
];

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const { approvedProducts } = useMarketplace();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const matchingProducts = trimmed
    ? approvedProducts.filter((p) => {
        return (
          p.name.toLowerCase().includes(trimmed) ||
          p.silk_type.toLowerCase().includes(trimmed) ||
          p.region.toLowerCase().includes(trimmed) ||
          p.color.toLowerCase().includes(trimmed) ||
          (p.seller_name && p.seller_name.toLowerCase().includes(trimmed))
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-[#111111]/90 backdrop-blur-md transition-all duration-300 flex flex-col">
      {/* Top Bar */}
      <div className="border-b border-[#292929] px-6 sm:px-12 py-5 flex items-center justify-between max-w-7xl w-full mx-auto">
        <span className="font-serif text-lg tracking-luxury text-[#E5DEF0] uppercase">
          THARI SEARCH
        </span>
        <button
          onClick={onClose}
          className="text-[#E5DEF0] hover:text-[#B89B5E] p-2 transition-colors"
          aria-label="Close search"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Search Container */}
      <div className="max-w-4xl w-full mx-auto px-6 py-8 flex-1 flex flex-col overflow-y-auto">
        {/* Search Input */}
        <div className="relative border-b-2 border-[#B89B5E] pb-3 mb-8">
          <Search className="absolute left-0 top-3 w-6 h-6 text-[#B89B5E]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by silk type, motif, weaver or region..."
            className="w-full bg-transparent pl-10 pr-4 text-xl sm:text-3xl font-serif text-[#F8F5EF] placeholder:text-[#6B6B6B] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-0 top-3 text-xs tracking-widest text-[#B9A7D4] uppercase hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Suggestions if query is empty */}
        {!trimmed ? (
          <div>
            <p className="text-xs tracking-luxury uppercase text-[#B89B5E] mb-4">
              SUGGESTED DISCOVERIES
            </p>
            <div className="flex flex-wrap gap-2.5">
              {SUGGESTIONS.map((sug) => (
                <button
                  key={sug}
                  onClick={() => setQuery(sug)}
                  className="px-4 py-2 border border-[#292929] hover:border-[#B89B5E] bg-[#1a1a1a] text-sm text-[#E5DEF0] hover:text-[#B89B5E] transition-all"
                >
                  {sug}
                </button>
              ))}
            </div>

            <div className="mt-12 p-6 border border-[#292929] bg-[#161616]">
              <span className="text-[10px] tracking-widest-luxury text-[#B9A7D4] uppercase block mb-1">
                CURATED COLLECTIONS
              </span>
              <p className="font-serif text-lg text-[#F8F5EF] mb-3">
                Explore Pure Kanchipuram Korvai, Royal Banarasi Katan, and Mysore Crepe
              </p>
              <Link
                href="/shop"
                onClick={onClose}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-[#B89B5E] hover:underline"
              >
                Browse Complete Catalog <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs tracking-luxury uppercase text-[#B89B5E]">
                {matchingProducts.length} {matchingProducts.length === 1 ? 'RESULT' : 'RESULTS'} FOUND
              </p>
              <Link
                href={`/shop?search=${encodeURIComponent(query)}`}
                onClick={onClose}
                className="text-xs text-[#E5DEF0] hover:text-[#B89B5E] underline"
              >
                View all in catalog
              </Link>
            </div>

            {matchingProducts.length === 0 ? (
              <div className="py-12 text-center text-[#999999]">
                <p className="font-serif text-2xl text-[#F8F5EF] mb-2">No Silks Found</p>
                <p className="text-sm">We couldn&apos;t find matching weaves for &ldquo;{query}&rdquo;.</p>
                <div className="mt-6">
                  <button
                    onClick={() => setQuery('')}
                    className="text-xs tracking-luxury uppercase text-[#B89B5E] underline"
                  >
                    Reset Search
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchingProducts.slice(0, 6).map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="group flex gap-4 p-3 bg-[#191919] border border-[#292929] hover:border-[#B89B5E] transition-all"
                  >
                    <div className="relative w-20 h-24 flex-shrink-0 bg-[#222]">
                      <ImageWithFallback
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] tracking-wider uppercase text-[#B9A7D4]">
                        {product.silk_type}
                      </span>
                      <h4 className="font-serif text-base text-[#F8F5EF] group-hover:text-[#B89B5E] transition-colors line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#888888] line-clamp-1">
                        {product.seller_name}
                      </p>
                      <span className="font-serif text-sm font-semibold text-[#B89B5E] mt-1">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
