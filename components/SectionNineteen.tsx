
import React from 'react';
import { ASSETS } from '../constants';

export const SectionNineteen: React.FC = () => {
  return (
    <section className="relative w-full pt-16 pb-4 md:py-16 bg-[#050505] border-t border-white/5 flex justify-center [content-visibility:auto]">
       {/* Max Width Container */}
       <div className="max-w-4xl w-full mx-4 flex flex-col md:flex-row items-center gap-6 md:gap-12 opacity-80 hover:opacity-100 transition-opacity duration-700">
          
          {/* Text Content */}
          <div className="flex-1 text-center md:text-right order-2 md:order-1">
             <p className="text-lg md:text-xl font-sans text-gray-300 italic leading-relaxed font-light">
               "Você nunca sabe que resultados virão da sua ação. Mas se você não fizer nada, não existirão resultados."
             </p>
             <p className="mt-3 text-[#00CBD9] font-bold tracking-[0.2em] uppercase text-xs md:text-sm">
               — Mahatma Gandhi
             </p>
          </div>

          {/* Image Content */}
          <div className="order-1 md:order-2">
             <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-white/10 shadow-lg">
                <img 
                    src={ASSETS.GANDHI_PORTRAIT} 
                    alt="Mahatma Gandhi" 
                    className="w-full h-full object-cover filter grayscale contrast-125 brightness-90"
                    loading="lazy"
                    decoding="async"
                />
                {/* Overlay for blending */}
                <div className="absolute inset-0 bg-[#00CBD9]/10 mix-blend-overlay"></div>
             </div>
          </div>

       </div>
    </section>
  );
};
