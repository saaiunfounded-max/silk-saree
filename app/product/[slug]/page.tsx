'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Check,
  Share2
} from 'lucide-react';
import { useMarketplace } from '@/lib/store';
import { formatPrice } from '@/lib/products';
import { ImageWithFallback } from '@/components/products/ImageWithFallback';
import { ProductCard } from '@/components/products/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { products, approvedProducts, addToCart, isInWishlist, toggleWishlist } = useMarketplace();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addedNotice, setAddedNotice] = useState(false);

  // Accordions state
  const [openAccordion, setOpenAccordion] = useState<string | null>('craft');

  const product = products.find((p) => p.slug === slug) || products[0];
  const inWishlist = isInWishlist(product.id);

  const relatedProducts = approvedProducts
    .filter((p) => p.id !== product.id && (p.silk_type === product.silk_type || p.seller_id === product.seller_id))
    .slice(0, 4);

  const handleAddToBag = () => {
    addToCart(product, 1);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, 1);
    router.push('/checkout');
  };

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <div className="bg-[#F8F5EF] min-h-screen pb-24">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5 border-b border-[#E8E2D5] text-[11px] tracking-luxury uppercase text-[#777777] flex items-center gap-2">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-black">
          Silk Sarees
        </Link>
        <span>/</span>
        <Link href={`/shop?type=${encodeURIComponent(product.silk_type)}`} className="hover:text-black">
          {product.silk_type}
        </Link>
        <span>/</span>
        <span className="text-[#111111] font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </div>

      {/* Main Detail Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* LEFT: IMAGE GALLERY (7 cols on Desktop) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[600px] flex-shrink-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-28 border transition-all flex-shrink-0 bg-[#EAE4D7] ${
                      selectedImageIndex === idx
                        ? 'border-[#B89B5E] ring-1 ring-[#B89B5E]'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Primary Large Image */}
            <div className="relative aspect-[3/4] w-full bg-[#EAE4D7] overflow-hidden">
              <ImageWithFallback
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                fallbackTitle={product.name}
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                <span className="bg-[#111111]/90 backdrop-blur-sm text-[#F8F5EF] text-[10px] tracking-widest-luxury uppercase px-2.5 py-1">
                  100% PURE {product.silk_type.toUpperCase()}
                </span>
                {product.is_handwoven && (
                  <span className="bg-[#B89B5E]/90 text-[#111111] text-[10px] tracking-widest-luxury uppercase px-2.5 py-1 font-medium">
                    AUTHENTIC HANDLOOM
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO & SPECIFICATIONS (5 cols on Desktop) */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Silk Type & Weaver Location */}
            <div className="flex items-center justify-between text-xs tracking-luxury uppercase text-[#B89B5E] mb-2 font-sans">
              <span>{product.silk_type} &bull; {product.region}</span>
              <span className="text-[10px] text-[#888888]">SKU: {product.sku}</span>
            </div>

            {/* Product Name */}
            <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] font-normal leading-tight mb-3">
              {product.name}
            </h1>

            {/* Weaver Association */}
            <div className="flex items-center gap-2 mb-6 pb-6 border-b border-[#E8E2D5]">
              <span className="text-xs text-[#777777]">Woven by</span>
              <Link
                href={`/weavers/${product.seller_id}`}
                className="text-xs font-serif italic text-[#111111] hover:text-[#B89B5E] underline font-medium"
              >
                {product.seller_name}
              </Link>
              <span className="text-[10px] bg-[#B9A7D4]/25 text-[#4A2D75] px-2 py-0.5 rounded-full ml-auto">
                Verified Master Loom
              </span>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#111111]">
                {formatPrice(product.price)}
              </span>
              {product.compare_at_price && (
                <span className="text-sm text-[#888888] line-through font-light">
                  {formatPrice(product.compare_at_price)}
                </span>
              )}
              <span className="text-[10px] text-[#666666] tracking-wider uppercase ml-1">
                (Inclusive of all taxes & insured delivery)
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#444444] font-light leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Craft At-A-Glance Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-[#F2EDE2] border border-[#E0D8C7] mb-8 text-xs">
              <div>
                <span className="text-[#888888] uppercase tracking-wider text-[10px] block">
                  Weaving Technique
                </span>
                <span className="font-serif text-[#111111] font-medium text-xs">
                  {product.weaving_technique}
                </span>
              </div>
              <div>
                <span className="text-[#888888] uppercase tracking-wider text-[10px] block">
                  Zari Specification
                </span>
                <span className="font-serif text-[#111111] font-medium text-xs">
                  {product.zari || 'Tested Precious Zari'}
                </span>
              </div>
              <div>
                <span className="text-[#888888] uppercase tracking-wider text-[10px] block">
                  Drape Length
                </span>
                <span className="font-serif text-[#111111] font-medium text-xs">
                  {product.length}
                </span>
              </div>
              <div>
                <span className="text-[#888888] uppercase tracking-wider text-[10px] block">
                  Blouse Piece
                </span>
                <span className="font-serif text-[#111111] font-medium text-xs">
                  {product.blouse_included ? 'Included (Unstitched Brocade)' : 'Not Included'}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 mb-8">
              {addedNotice && (
                <div className="bg-[#111111] text-[#F8F5EF] text-xs py-2 px-3 flex items-center justify-between animate-fade-in">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#B89B5E]" /> Saree placed in your bag
                  </span>
                  <Link href="/cart" className="text-[#B89B5E] uppercase tracking-luxury text-[10px] underline">
                    View Bag
                  </Link>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleAddToBag}
                  className="flex-1 bg-[#111111] text-[#F8F5EF] hover:bg-[#292929] py-3.5 px-6 text-xs uppercase tracking-luxury font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  ADD TO BAG
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Wishlist toggle"
                  className="w-12 border border-[#292929] flex items-center justify-center text-[#111111] hover:text-[#B89B5E] hover:border-[#B89B5E] transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      inWishlist ? 'fill-[#B89B5E] text-[#B89B5E]' : ''
                    }`}
                  />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full bg-[#B89B5E] text-[#111111] hover:bg-[#D4BC84] py-3.5 px-6 text-xs uppercase tracking-luxury font-medium transition-colors"
              >
                BUY NOW WITH BESPOKE ASSURANCE
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 py-4 border-y border-[#E8E2D5] text-center text-[10px] tracking-wider text-[#666666] mb-8">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#B89B5E]" />
                <span>100% PURE SILK MARK</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#B89B5E]" />
                <span>COMPLIMENTARY SHIPPING</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-[#B89B5E]" />
                <span>7-DAY CURATED RETURN</span>
              </div>
            </div>

            {/* ACCORDIONS */}
            <div className="border-t border-[#E8E2D5] divide-y divide-[#E8E2D5]">
              {/* Accordion 1: THE WEAVER */}
              <div>
                <button
                  onClick={() => toggleAccordion('weaver')}
                  className="w-full py-4 flex items-center justify-between text-xs tracking-luxury uppercase text-[#111111] font-medium"
                >
                  <span>THE WEAVER & LOOM LINEAGE</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === 'weaver' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'weaver' && (
                  <div className="pb-4 text-xs text-[#555555] font-light leading-relaxed animate-fade-in space-y-2">
                    <p>
                      Crafted by <strong className="text-black">{product.seller_name}</strong> in {product.region}.
                    </p>
                    <p>
                      Every silk weaver listing on THARI belongs to a certified master guild. When you acquire this piece, the settlement is directly routed to the weaving cooperative.
                    </p>
                    <Link
                      href={`/weavers/${product.seller_id}`}
                      className="inline-block text-[11px] text-[#B89B5E] tracking-luxury uppercase underline pt-1"
                    >
                      View Master Weaver&apos;s Full Profile & Atelier &rarr;
                    </Link>
                  </div>
                )}
              </div>

              {/* Accordion 2: CRAFT DETAILS */}
              <div>
                <button
                  onClick={() => toggleAccordion('craft')}
                  className="w-full py-4 flex items-center justify-between text-xs tracking-luxury uppercase text-[#111111] font-medium"
                >
                  <span>CRAFT & WEAVING DETAILS</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === 'craft' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'craft' && (
                  <div className="pb-4 text-xs text-[#555555] font-light leading-relaxed animate-fade-in space-y-2">
                    <p>
                      <strong>Technique:</strong> {product.weaving_technique}.
                    </p>
                    <p>
                      <strong>Zari Composition:</strong> {product.zari}.
                    </p>
                    <p>
                      <strong>Origin:</strong> {product.region}.
                    </p>
                    <p>
                      Authenticity verified under Silk Mark guidelines. Handwoven variations in texture are hallmarks of authentic pit-loom craftsmanship.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3: CARE GUIDE */}
              <div>
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full py-4 flex items-center justify-between text-xs tracking-luxury uppercase text-[#111111] font-medium"
                >
                  <span>CARE & PRESERVATION CONCIERGE</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === 'care' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'care' && (
                  <div className="pb-4 text-xs text-[#555555] font-light leading-relaxed animate-fade-in space-y-2">
                    <p>{product.care_instructions || 'Dry clean only.'}</p>
                    <p>
                      Always wrap pure silk in soft unbleached cotton or muslin. Store away from harsh sunlight and air-dry gently in shade twice annually.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 4: SHIPPING & RETURNS */}
              <div>
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full py-4 flex items-center justify-between text-xs tracking-luxury uppercase text-[#111111] font-medium"
                >
                  <span>WHITE GLOVE SHIPPING & RETURNS</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === 'shipping' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pb-4 text-xs text-[#555555] font-light leading-relaxed animate-fade-in space-y-2">
                    <p>
                      Dispatched directly from the artisan loom in custom archival linen boxes. All deliveries are insured in transit across India and 40+ international countries.
                    </p>
                    <p>
                      We offer a 7-day hassle-free return policy on untampered handloom sarees with intact security tags.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RELATED HEIRLOOM PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-28 pt-16 border-t border-[#E8E2D5]">
            <div className="text-center mb-12">
              <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E] block mb-2 font-sans">
                RELATED WEAVES
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#111111] font-normal">
                YOU MAY ALSO TREASURE
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
