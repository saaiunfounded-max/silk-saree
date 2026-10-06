'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useMarketplace } from '@/lib/store';
import { formatPrice } from '@/lib/products';
import { ImageWithFallback } from '@/components/products/ImageWithFallback';

export default function AccountWishlistPage() {
  const { wishlist, products, toggleWishlist, addToCart } = useMarketplace();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5]">
        <div>
          <h2 className="font-serif text-2xl text-[#111111]">Wishlist</h2>
          <p className="text-xs text-[#666666] mt-0.5">
            Heirloom silks reserved for your consideration.
          </p>
        </div>
        <span className="text-xs uppercase tracking-luxury text-[#B89B5E]">
          {savedProducts.length} {savedProducts.length === 1 ? 'ITEM' : 'ITEMS'}
        </span>
      </div>

      {savedProducts.length === 0 ? (
        <div className="bg-white border border-[#E8E2D5] p-12 text-center">
          <Heart className="w-10 h-10 text-[#CCCCCC] mx-auto mb-3" />
          <h3 className="font-serif text-lg text-[#111111] mb-1">Your Wishlist is Empty</h3>
          <p className="text-xs text-[#777777] mb-6">Explore the collections and heart pieces you treasure.</p>
          <Link
            href="/shop"
            className="px-6 py-2.5 bg-[#111111] text-[#F8F5EF] text-xs uppercase tracking-luxury hover:bg-[#B89B5E]"
          >
            Explore Silks
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProducts.map((product) => (
            <div key={product.id} className="bg-white border border-[#E8E2D5] p-4 flex flex-col justify-between">
              <div>
                <div className="relative aspect-[3/4] w-full mb-3 bg-[#EAE4D7] overflow-hidden">
                  <Link href={`/product/${product.slug}`}>
                    <ImageWithFallback
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full text-[#111111] hover:text-[#B89B5E]"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-[10px] tracking-wider uppercase text-[#B9A7D4] block mb-1">
                  {product.silk_type} &bull; {product.region.split(',')[0]}
                </span>
                <Link href={`/product/${product.slug}`}>
                  <h3 className="font-serif text-base text-[#111111] hover:text-[#B89B5E] transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-xs text-[#777777] mb-2">{product.seller_name}</p>
                <p className="font-serif text-base font-semibold text-[#111111]">
                  {formatPrice(product.price)}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0ECE1]">
                <button
                  onClick={() => addToCart(product, 1)}
                  className="w-full bg-[#111111] text-[#F8F5EF] hover:bg-[#B89B5E] hover:text-[#111111] py-2.5 text-xs uppercase tracking-luxury font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Move to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
