'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackTitle?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackTitle,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`bg-[#201D1A] text-[#F8F5EF] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden select-none ${className || ''}`}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B89B5E_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="w-12 h-12 rounded-full border border-[#B89B5E]/40 flex items-center justify-center text-[#B89B5E] font-serif text-lg mb-2">
          த
        </div>
        <span className="font-serif text-sm tracking-luxury text-[#E5DEF0]/90 uppercase">
          THARI SILK
        </span>
        <span className="text-xs text-[#B89B5E]/80 mt-1 line-clamp-1 max-w-[200px]">
          {fallbackTitle || alt || 'Pure Heritage Silk'}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt || 'THARI Silk Saree'}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
