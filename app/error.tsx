'use client';

import React from 'react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-6 py-24 text-center bg-[#F8F5EF] text-[#111111]">
      <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E] mb-2">
        TEMPORARY DISRUPTION
      </span>
      <h1 className="font-serif text-3xl sm:text-5xl text-[#111111] font-light mb-4">
        AN UNEXPECTED HARMONY LAPSE.
      </h1>
      <p className="font-sans text-xs sm:text-sm text-[#666666] font-light max-w-md mb-8 leading-relaxed">
        Our atelier system encountered an unexpected condition. Rest assured, your selections and provenance records remain safe.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-8 py-3.5 bg-[#111111] text-[#F8F5EF] hover:bg-[#B89B5E] hover:text-[#111111] text-xs uppercase tracking-luxury font-medium transition-colors"
        >
          RETRY ACTION
        </button>
        <Link
          href="/"
          className="px-8 py-3.5 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#F8F5EF] text-xs uppercase tracking-luxury font-medium transition-colors"
        >
          RETURN TO HOME
        </Link>
      </div>
    </div>
  );
}
