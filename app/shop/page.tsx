'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useMarketplace } from '@/lib/store';
import { ProductCard } from '@/components/products/ProductCard';

const SILK_TYPES = ['Kanchipuram', 'Banarasi', 'Mysore Silk', 'Tussar', 'Chanderi', 'Raw Silk'];
const REGIONS = ['Kanchipuram, Tamil Nadu', 'Varanasi, Uttar Pradesh', 'Mysore, Karnataka', 'Raigarh & Madurai', 'Chanderi, Madhya Pradesh'];
const OCCASIONS = ['Bridal & Muhurtham', 'Royal Reception', 'Festive & Formal Soirée', 'Daytime Gathering & Art Evenings', 'Gala & Black Tie Soirée'];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || '';
  const initialFilter = searchParams.get('filter') || '';
  const initialSearch = searchParams.get('search') || '';

  const { approvedProducts, sellers } = useMarketplace();

  // Filters state
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialType ? [initialType] : []);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedWeavers, setSelectedWeavers] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>(initialFilter === 'new' ? 'newest' : 'featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter logic
  const filteredProducts = useMemo(() => {
    return approvedProducts.filter((product) => {
      // URL search query
      if (initialSearch) {
        const query = initialSearch.toLowerCase();
        const matchesQuery =
          product.name.toLowerCase().includes(query) ||
          product.silk_type.toLowerCase().includes(query) ||
          product.region.toLowerCase().includes(query) ||
          product.color.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Silk Type filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(product.silk_type)) {
        return false;
      }

      // Region filter
      if (selectedRegions.length > 0 && !selectedRegions.includes(product.region)) {
        return false;
      }

      // Weaver filter
      if (selectedWeavers.length > 0 && !selectedWeavers.includes(product.seller_id)) {
        return false;
      }

      // Price filter
      if (selectedPriceRange === 'under-30k' && product.price > 30000) return false;
      if (selectedPriceRange === '30k-45k' && (product.price < 30000 || product.price > 45000)) return false;
      if (selectedPriceRange === 'above-45k' && product.price < 45000) return false;

      // Occasion filter
      if (selectedOccasion && product.occasion !== selectedOccasion) {
        return false;
      }

      // In stock
      if (onlyInStock && product.stock <= 0) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      // default: featured
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [
    approvedProducts,
    initialSearch,
    selectedTypes,
    selectedRegions,
    selectedWeavers,
    selectedPriceRange,
    selectedOccasion,
    onlyInStock,
    sortOption,
  ]);

  const resetFilters = () => {
    setSelectedTypes([]);
    setSelectedRegions([]);
    setSelectedWeavers([]);
    setSelectedPriceRange('all');
    setSelectedOccasion('');
    setOnlyInStock(false);
  };

  const activeFilterCount =
    selectedTypes.length +
    selectedRegions.length +
    selectedWeavers.length +
    (selectedPriceRange !== 'all' ? 1 : 0) +
    (selectedOccasion ? 1 : 0) +
    (onlyInStock ? 1 : 0);

  return (
    <div className="bg-[#F8F5EF] min-h-screen pb-24">
      {/* Editorial Header */}
      <div className="border-b border-[#E8E2D5] bg-[#F4EFE5] py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center max-w-3xl">
          <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E] block mb-2 font-sans">
            ROYAL CATALOGUE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#111111] font-normal tracking-tight mb-3">
            SILK SAREES
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#555555] font-light leading-relaxed">
            A curated collection of India&apos;s finest silk traditions. Masterfully woven on authentic pit and dobby looms with tested precious zari.
          </p>
        </div>
      </div>

      {/* Main Grid & Filter Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-10">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8E2D5] gap-4 mb-8">
          <div className="flex items-center gap-4">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[#292929] text-xs uppercase tracking-luxury text-[#111111]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters ({activeFilterCount})</span>
            </button>

            <span className="text-xs text-[#666666] tracking-wider uppercase">
              Showing {filteredProducts.length} Heirloom {filteredProducts.length === 1 ? 'Creation' : 'Creations'}
            </span>

            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-[#B89B5E] hover:underline uppercase tracking-luxury ml-2"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#777777] uppercase tracking-luxury hidden sm:inline">
              Sort By:
            </span>
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent text-xs tracking-luxury uppercase border border-[#DCD5C5] px-3 py-2 text-[#111111] focus:outline-none focus:border-[#B89B5E] cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="newest">Newest from Looms</option>
                <option value="price-asc">Price — Low to High</option>
                <option value="price-desc">Price — High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-6 border-r border-[#E8E2D5]">
            {/* Silk Type */}
            <div>
              <h3 className="font-serif text-base text-[#111111] font-medium tracking-luxury uppercase mb-3">
                Silk Type
              </h3>
              <div className="space-y-2">
                {SILK_TYPES.map((type) => (
                  <label key={type} className="flex items-center gap-2.5 text-xs text-[#444444] cursor-pointer hover:text-black">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedTypes([...selectedTypes, type]);
                        else setSelectedTypes(selectedTypes.filter((t) => t !== type));
                      }}
                      className="rounded-none border-[#999999] text-[#111111] focus:ring-[#B89B5E]"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="pt-6 border-t border-[#E8E2D5]">
              <h3 className="font-serif text-base text-[#111111] font-medium tracking-luxury uppercase mb-3">
                Price
              </h3>
              <div className="space-y-2">
                {[
                  { label: 'All Silks', value: 'all' },
                  { label: 'Under ₹30,000', value: 'under-30k' },
                  { label: '₹30,000 — ₹45,000', value: '30k-45k' },
                  { label: 'Above ₹45,000', value: 'above-45k' },
                ].map((range) => (
                  <label key={range.value} className="flex items-center gap-2.5 text-xs text-[#444444] cursor-pointer hover:text-black">
                    <input
                      type="radio"
                      name="price-filter"
                      checked={selectedPriceRange === range.value}
                      onChange={() => setSelectedPriceRange(range.value)}
                      className="border-[#999999] text-[#111111] focus:ring-[#B89B5E]"
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Weaver / Guild */}
            <div className="pt-6 border-t border-[#E8E2D5]">
              <h3 className="font-serif text-base text-[#111111] font-medium tracking-luxury uppercase mb-3">
                Weaver Guild
              </h3>
              <div className="space-y-2">
                {sellers.map((seller) => (
                  <label key={seller.id} className="flex items-center gap-2.5 text-xs text-[#444444] cursor-pointer hover:text-black">
                    <input
                      type="checkbox"
                      checked={selectedWeavers.includes(seller.id)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedWeavers([...selectedWeavers, seller.id]);
                        else setSelectedWeavers(selectedWeavers.filter((w) => w !== seller.id));
                      }}
                      className="rounded-none border-[#999999] text-[#111111] focus:ring-[#B89B5E]"
                    />
                    <span className="truncate">{seller.business_name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Region */}
            <div className="pt-6 border-t border-[#E8E2D5]">
              <h3 className="font-serif text-base text-[#111111] font-medium tracking-luxury uppercase mb-3">
                Craft Region
              </h3>
              <div className="space-y-2">
                {REGIONS.map((region) => (
                  <label key={region} className="flex items-center gap-2.5 text-xs text-[#444444] cursor-pointer hover:text-black">
                    <input
                      type="checkbox"
                      checked={selectedRegions.includes(region)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedRegions([...selectedRegions, region]);
                        else setSelectedRegions(selectedRegions.filter((r) => r !== region));
                      }}
                      className="rounded-none border-[#999999] text-[#111111] focus:ring-[#B89B5E]"
                    />
                    <span>{region.split(',')[0]}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* In Stock toggle */}
            <div className="pt-6 border-t border-[#E8E2D5]">
              <label className="flex items-center gap-2.5 text-xs text-[#444444] cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded-none border-[#999999] text-[#111111] focus:ring-[#B89B5E]"
                />
                <span className="font-medium text-[#111111]">In Stock Only</span>
              </label>
            </div>
          </aside>

          {/* PRODUCT GRID (4-column desktop, 3-column tablet, 2-column mobile) */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center border border-dashed border-[#DCD5C5] p-8">
                <h3 className="font-serif text-2xl text-[#111111] mb-2">No Matching Silks Found</h3>
                <p className="text-xs text-[#666666] max-w-sm mx-auto mb-6">
                  No weaves match the selected filters. Please adjust your criteria or reset the filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#111111] text-[#F8F5EF] text-xs uppercase tracking-luxury hover:bg-[#B89B5E] hover:text-[#111111] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#F8F5EF] h-full shadow-2xl flex flex-col z-10 p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5]">
              <span className="font-serif text-xl tracking-luxury">Refine Silks</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-[#292929]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-6 flex-1">
              {/* Silk Type */}
              <div>
                <h4 className="font-serif text-sm font-semibold tracking-luxury uppercase mb-2">
                  Silk Type
                </h4>
                <div className="space-y-2">
                  {SILK_TYPES.map((type) => (
                    <label key={type} className="flex items-center gap-2 text-xs text-[#444444]">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedTypes([...selectedTypes, type]);
                          else setSelectedTypes(selectedTypes.filter((t) => t !== type));
                        }}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 className="font-serif text-sm font-semibold tracking-luxury uppercase mb-2">
                  Price Range
                </h4>
                <div className="space-y-2">
                  {[
                    { label: 'All Silks', value: 'all' },
                    { label: 'Under ₹30,000', value: 'under-30k' },
                    { label: '₹30,000 — ₹45,000', value: '30k-45k' },
                    { label: 'Above ₹45,000', value: 'above-45k' },
                  ].map((range) => (
                    <label key={range.value} className="flex items-center gap-2 text-xs text-[#444444]">
                      <input
                        type="radio"
                        name="mobile-price"
                        checked={selectedPriceRange === range.value}
                        onChange={() => setSelectedPriceRange(range.value)}
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E2D5] flex gap-3">
              <button
                onClick={resetFilters}
                className="w-1/2 py-2.5 border border-[#111111] text-xs uppercase tracking-luxury text-[#111111]"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-1/2 py-2.5 bg-[#111111] text-xs uppercase tracking-luxury text-[#F8F5EF]"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8F5EF]">
          <div className="text-center font-serif text-lg tracking-luxury">
            Loading THARI Silk Catalog...
          </div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
