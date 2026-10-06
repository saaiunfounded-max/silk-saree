'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/products';
import { useMarketplace } from '@/lib/store';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { isInWishlist, toggleWishlist, addToCart } = useMarketplace();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="group relative flex flex-col bg-[#F8F5EF] transition-all duration-300">
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#ECE7DC]">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          <ImageWithFallback
            src={product.images[0]}
            alt={product.name}
            fallbackTitle={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Minimal Luxury Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.is_new && (
            <span className="bg-[#111111]/90 backdrop-blur-sm text-[#F8F5EF] text-[10px] tracking-widest-luxury uppercase px-2 py-0.5 font-sans">
              NEW
            </span>
          )}
          {product.stock === 1 && (
            <span className="bg-[#B89B5E]/90 backdrop-blur-sm text-[#111111] text-[10px] tracking-widest-luxury uppercase px-2 py-0.5 font-medium">
              LIMITED
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#111111] hover:bg-white hover:text-[#B89B5E] transition-all duration-200"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              inWishlist ? 'fill-[#B89B5E] text-[#B89B5E]' : 'stroke-current'
            }`}
          />
        </button>

        {/* Quick Add To Bag Slide-Up on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hidden sm:block">
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
            className="w-full bg-[#111111]/95 hover:bg-[#111111] text-[#F8F5EF] py-2.5 px-4 text-xs tracking-luxury uppercase flex items-center justify-center gap-2 transition-colors duration-200 backdrop-blur-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Quick Add to Bag
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="pt-3 pb-2 flex flex-col flex-grow">
        {/* Silk Type & Region */}
        <div className="flex items-center justify-between text-[11px] text-[#6B6B6B] tracking-wider uppercase mb-1">
          <span>{product.silk_type}</span>
          <span className="truncate max-w-[130px] text-right">{product.seller_location?.split(',')[0]}</span>
        </div>

        {/* Product Name */}
        <Link href={`/product/${product.slug}`} className="group-hover:text-[#B89B5E] transition-colors">
          <h3 className="font-serif text-base sm:text-lg text-[#111111] font-normal leading-snug line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Weaver name */}
        <p className="text-[11px] text-[#8E77B3] mt-0.5 mb-1.5 font-medium tracking-wide">
          {product.seller_name}
        </p>

        {/* Price Row */}
        <div className="mt-auto pt-1 flex items-baseline gap-2">
          <span className="font-serif text-base font-semibold text-[#111111]">
            {formatPrice(product.price)}
          </span>
          {product.compare_at_price && (
            <span className="text-xs text-[#888888] line-through">
              {formatPrice(product.compare_at_price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
