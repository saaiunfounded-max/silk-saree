'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Upload, Sparkles } from 'lucide-react';
import { useMarketplace } from '@/lib/store';
import { SilkType } from '@/types/product';
import { ImageWithFallback } from '@/components/products/ImageWithFallback';

const SILK_TYPES: SilkType[] = [
  'Kanchipuram',
  'Banarasi',
  'Mysore Silk',
  'Tussar',
  'Chanderi',
  'Raw Silk',
];

export default function AddProductPage() {
  const router = useRouter();
  const { addProduct } = useMarketplace();

  const [formData, setFormData] = useState({
    name: 'Kanchipuram Temple Mayil Silk',
    description: 'An exceptional bridal handloom woven with 3-ply twisted mulberry silk, featuring authentic korvai temple gopurams and mayil (peacock) motifs in fine brushed gold zari.',
    price: 39500,
    compare_at_price: 45000,
    sku: `THARI-KAN-${Math.floor(100 + Math.random() * 900)}`,
    silk_type: 'Kanchipuram' as SilkType,
    color: 'Temple Crimson & Gold',
    region: 'Kanchipuram, Tamil Nadu',
    weaving_technique: 'Traditional Heavy Korvai Pit Loom with Petni Pallu',
    length: '6.2 Meters with Blouse Piece',
    blouse_included: true,
    stock: 2,
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    zari: 'Certified Pure Silver Dipped in 24K Gold Zari',
    occasion: 'Bridal & Muhurtham',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdProductSlug, setCreatedProductSlug] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const slug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newProd = addProduct({
      seller_id: 'seller-1',
      seller_name: 'Sundaram Silk Guild',
      seller_location: 'Kanchipuram, Tamil Nadu',
      name: formData.name,
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      description: formData.description,
      price: Number(formData.price),
      compare_at_price: formData.compare_at_price ? Number(formData.compare_at_price) : undefined,
      sku: formData.sku,
      silk_type: formData.silk_type,
      color: formData.color,
      region: formData.region,
      weaving_technique: formData.weaving_technique,
      length: formData.length,
      blouse_included: formData.blouse_included,
      stock: Number(formData.stock),
      images: [formData.imageUrl],
      status: 'pending_review',
      approval_status: 'pending',
      featured: false,
      is_new: true,
      is_handwoven: true,
      zari: formData.zari,
      occasion: formData.occasion,
    });

    setCreatedProductSlug(newProd.slug);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white border border-[#E8E2D5] p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm">
        <div className="w-16 h-16 rounded-full bg-[#E5DEF0] text-[#4A2D75] flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E] block mb-1">
          SUBMISSION SUCCESSFUL
        </span>
        <h2 className="font-serif text-3xl text-[#111111] mb-2">
          NEW WEAVE SUBMITTED FOR CURATION
        </h2>
        <p className="text-xs text-[#666666] leading-relaxed mb-6">
          Your saree has been registered under <strong>Sundaram Silk Guild</strong> and entered into the <strong>Pending Review</strong> queue. The THARI admin curators will verify Silk Mark credentials and approve for public catalog listing.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/admin/approvals"
            className="w-full sm:w-auto px-6 py-3 bg-[#111111] text-[#F8F5EF] hover:bg-[#B89B5E] hover:text-[#111111] text-xs uppercase tracking-luxury font-medium transition-colors"
          >
            Open Admin Approvals Console &rarr;
          </Link>
          <Link
            href="/seller/products"
            className="w-full sm:w-auto px-6 py-3 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#F8F5EF] text-xs uppercase tracking-luxury font-medium transition-colors"
          >
            Return to Products Table
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="pb-4 border-b border-[#E8E2D5]">
        <h1 className="font-serif text-2xl sm:text-3xl text-[#111111]">
          List a New Loom Creation
        </h1>
        <p className="text-xs text-[#666666] mt-0.5">
          Submit an authentic handwoven silk saree with precise technical specifications.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-[#E8E2D5] p-6 sm:p-8 space-y-8">
        {/* Section 1: General Info */}
        <div>
          <h2 className="font-serif text-lg text-[#111111] pb-2 border-b border-[#F0ECE1] mb-4">
            1. Basic Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="block text-[#666666] uppercase tracking-wider mb-1 font-medium">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
              />
            </div>

            <div>
              <label className="block text-[#666666] uppercase tracking-wider mb-1 font-medium">
                Silk Category *
              </label>
              <select
                value={formData.silk_type}
                onChange={(e) => setFormData({ ...formData, silk_type: e.target.value as SilkType })}
                className="w-full border border-[#D5CEBF] p-3 text-sm bg-white focus:outline-none focus:border-[#B89B5E]"
              >
                {SILK_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#666666] uppercase tracking-wider mb-1 font-medium">
                Stock Keeping Unit (SKU) *
              </label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full border border-[#D5CEBF] p-3 text-sm font-mono focus:outline-none focus:border-[#B89B5E]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[#666666] uppercase tracking-wider mb-1 font-medium">
                Artisan Story & Technical Description *
              </label>
              <textarea
                rows={3}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Pricing & Stock */}
        <div>
          <h2 className="font-serif text-lg text-[#111111] pb-2 border-b border-[#F0ECE1] mb-4">
            2. Commercial Value & Inventory
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-[#666666] uppercase tracking-wider mb-1 font-medium">
                Patron Price (INR ₹) *
              </label>
              <input
                type="number"
                required
                min={5000}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
              />
            </div>

            <div>
              <label className="block text-[#666666] uppercase tracking-wider mb-1 font-medium">
                Compare-at Benchmark (INR ₹)
              </label>
              <input
                type="number"
                value={formData.compare_at_price}
                onChange={(e) => setFormData({ ...formData, compare_at_price: Number(e.target.value) })}
                className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
              />
            </div>

            <div>
              <label className="block text-[#666666] uppercase tracking-wider mb-1 font-medium">
                Loom Stock Quantity *
              </label>
              <input
                type="number"
                required
                min={1}
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Craft Details */}
        <div>
          <h2 className="font-serif text-lg text-[#111111] pb-2 border-b border-[#F0ECE1] mb-4">
            3. Craft Specifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[#666666] uppercase tracking-wider mb-1 font-medium">
                Dominant Color Palette
              </label>
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
              />
            </div>

            <div>
              <label className="block text-[#666666] uppercase tracking-wider mb-1 font-medium">
                Geographic Weaving Region
              </label>
              <input
                type="text"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
              />
            </div>

            <div>
              <label className="block text-[#666666] uppercase tracking-wider mb-1 font-medium">
                Weaving Technique
              </label>
              <input
                type="text"
                value={formData.weaving_technique}
                onChange={(e) => setFormData({ ...formData, weaving_technique: e.target.value })}
                className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
              />
            </div>

            <div>
              <label className="block text-[#666666] uppercase tracking-wider mb-1 font-medium">
                Zari Composition
              </label>
              <input
                type="text"
                value={formData.zari}
                onChange={(e) => setFormData({ ...formData, zari: e.target.value })}
                className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
              />
            </div>

            <div>
              <label className="block text-[#666666] uppercase tracking-wider mb-1 font-medium">
                Length & Measurements
              </label>
              <input
                type="text"
                value={formData.length}
                onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
              />
            </div>

            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="blouse"
                checked={formData.blouse_included}
                onChange={(e) => setFormData({ ...formData, blouse_included: e.target.checked })}
                className="rounded-none border-[#999] text-[#111] focus:ring-[#B89B5E]"
              />
              <label htmlFor="blouse" className="text-xs text-[#222] font-medium cursor-pointer">
                Matching Handloom Blouse Piece Included
              </label>
            </div>
          </div>
        </div>

        {/* Section 4: Imagery */}
        <div>
          <h2 className="font-serif text-lg text-[#111111] pb-2 border-b border-[#F0ECE1] mb-4">
            4. Photography Asset
          </h2>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-[#666666] uppercase tracking-wider mb-1 font-medium">
                Image URL (High Resolution Photography)
              </label>
              <input
                type="url"
                required
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full border border-[#D5CEBF] p-3 text-sm focus:outline-none focus:border-[#B89B5E]"
              />
            </div>

            {formData.imageUrl && (
              <div className="flex items-center gap-4 p-3 bg-[#FCFAF6] border border-[#F0ECE1]">
                <div className="relative w-16 h-20 bg-[#E8E2D5] flex-shrink-0">
                  <ImageWithFallback
                    src={formData.imageUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-[#B89B5E] uppercase tracking-wider block">
                    Asset Preview Verified
                  </span>
                  <p className="text-xs text-[#555] line-clamp-1">{formData.imageUrl}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-[#E8E2D5] flex justify-end gap-4">
          <Link
            href="/seller/products"
            className="px-6 py-3 border border-[#D5CEBF] text-xs uppercase tracking-luxury text-[#666] hover:text-black"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-8 py-3 bg-[#111111] text-[#F8F5EF] hover:bg-[#B89B5E] hover:text-[#111111] text-xs uppercase tracking-luxury font-medium transition-colors"
          >
            Submit for Admin Moderation
          </button>
        </div>
      </form>
    </div>
  );
}
