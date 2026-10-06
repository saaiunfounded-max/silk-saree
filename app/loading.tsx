import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F8F5EF] text-[#111111]">
      <div className="relative w-16 h-16 flex items-center justify-center mb-4">
        <div className="absolute inset-0 border-2 border-[#E8E2D5] rounded-full" />
        <div className="absolute inset-0 border-2 border-[#B89B5E] border-t-transparent rounded-full animate-spin" />
        <span className="font-serif text-lg text-[#B89B5E]">த</span>
      </div>
      <span className="font-serif text-lg tracking-luxury uppercase text-[#111111]">
        THARI
      </span>
      <span className="text-[10px] tracking-widest-luxury uppercase text-[#B89B5E] mt-1">
        Weaving Heritage Silks...
      </span>
    </div>
  );
}
