import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-6 py-24 text-center bg-[#F8F5EF] text-[#111111]">
      <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E] mb-2">
        ERROR 404 &bull; WEAVE UNFOUND
      </span>
      <h1 className="font-serif text-4xl sm:text-6xl text-[#111111] font-light mb-4">
        THIS WEAVE HAS DEPARTED.
      </h1>
      <p className="font-sans text-xs sm:text-sm text-[#666666] font-light max-w-md mb-8 leading-relaxed">
        The archive or heirloom creation you seek may have completed its cycle or moved to a different catalog shelf.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-8 py-3.5 bg-[#111111] text-[#F8F5EF] hover:bg-[#B89B5E] hover:text-[#111111] text-xs uppercase tracking-luxury font-medium transition-colors"
        >
          RETURN HOME
        </Link>
        <Link
          href="/shop"
          className="px-8 py-3.5 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#F8F5EF] text-xs uppercase tracking-luxury font-medium transition-colors"
        >
          EXPLORE CATALOG
        </Link>
      </div>
    </div>
  );
}
