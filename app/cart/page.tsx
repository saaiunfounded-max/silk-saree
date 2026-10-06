'use client';

import React from 'react';
import Link from 'next/link';
import { Trash2, ArrowRight, ShieldCheck, Lock, ShoppingBag } from 'lucide-react';
import { useMarketplace } from '@/lib/store';
import { formatPrice } from '@/lib/products';
import { ImageWithFallback } from '@/components/products/ImageWithFallback';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartSubtotal, cartShipping, cartTotal } = useMarketplace();

  if (cart.length === 0) {
    return (
      <div className="bg-[#F8F5EF] min-h-[70vh] flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="w-16 h-16 rounded-full border border-[#B89B5E]/60 flex items-center justify-center text-[#B89B5E] mb-6">
          <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
        </div>
        <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E] mb-2 font-sans">
          YOUR SELECTIONS
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#111111] font-light mb-4">
          YOUR BAG IS WAITING.
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#666666] font-light max-w-md mb-8 leading-relaxed">
          The looms of Kanchipuram, Varanasi, and Mysore have woven exquisite treasures waiting to be discovered.
        </p>
        <Link
          href="/shop"
          className="px-8 py-3.5 bg-[#111111] text-[#F8F5EF] hover:bg-[#B89B5E] hover:text-[#111111] text-xs uppercase tracking-luxury font-medium transition-colors"
        >
          EXPLORE SILKS
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F5EF] min-h-screen pb-24">
      {/* Header */}
      <div className="border-b border-[#E8E2D5] py-10 bg-[#F4EFE5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E] block mb-1 font-sans">
            CURATED SELECTIONS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] font-normal">
            SHOPPING BAG
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: CART ITEMS LIST (8 cols) */}
          <div className="lg:col-span-8 divide-y divide-[#E8E2D5] border-t border-b border-[#E8E2D5]">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="py-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                {/* Image */}
                <div className="relative w-24 h-32 sm:w-28 sm:h-36 flex-shrink-0 bg-[#E2D9C4]">
                  <Link href={`/product/${product.slug}`}>
                    <ImageWithFallback
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </Link>
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] tracking-wider uppercase text-[#B9A7D4]">
                        {product.silk_type} &bull; {product.region.split(',')[0]}
                      </span>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-[#999999] hover:text-[#B89B5E] transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-serif text-lg sm:text-xl text-[#111111] hover:text-[#B89B5E] transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-[#777777] mt-0.5">
                      Artisan Atelier: <span className="text-[#111111] font-medium">{product.seller_name}</span>
                    </p>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F0ECE1]">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#D5CEBF]">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="px-2.5 py-1 text-xs text-[#555] hover:bg-[#EAE4D7]"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-medium text-[#111] min-w-[28px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="px-2.5 py-1 text-xs text-[#555] hover:bg-[#EAE4D7]"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right">
                      <span className="font-serif text-base sm:text-lg font-semibold text-[#111111]">
                        {formatPrice(product.price * quantity)}
                      </span>
                      {quantity > 1 && (
                        <span className="block text-[10px] text-[#888888]">
                          {formatPrice(product.price)} each
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: ORDER SUMMARY (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-[#F2EDE2] border border-[#E0D8C7] p-6 sm:p-8">
              <h2 className="font-serif text-xl text-[#111111] pb-4 border-b border-[#E0D8C7] mb-6">
                ORDER SUMMARY
              </h2>

              <div className="space-y-4 text-xs text-[#555555] pb-6 border-b border-[#E0D8C7]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-serif text-sm text-[#111111] font-medium">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>White-Glove Insured Delivery</span>
                  <span className="text-[#4A2D75] font-medium uppercase tracking-wider text-[11px]">
                    COMPLIMENTARY
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Artisan Silk Mark Certification</span>
                  <span className="text-[#B89B5E] font-medium">INCLUDED</span>
                </div>
              </div>

              {/* Estimated Total */}
              <div className="py-6 flex items-baseline justify-between">
                <span className="font-serif text-lg text-[#111111]">Estimated Total</span>
                <span className="font-serif text-2xl font-bold text-[#111111]">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full bg-[#111111] text-[#F8F5EF] hover:bg-[#B89B5E] hover:text-[#111111] py-4 px-6 text-xs uppercase tracking-luxury font-medium transition-colors flex items-center justify-center gap-2 block text-center"
              >
                PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Assurance Notes */}
              <div className="mt-6 pt-6 border-t border-[#E0D8C7] space-y-2 text-[11px] text-[#777777]">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#B89B5E]" />
                  <span>256-bit encrypted secure multi-vendor checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B89B5E]" />
                  <span>Direct settlement with master weaving guild</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
