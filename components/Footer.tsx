
import React from 'react';
import { ASSETS } from '../constants';
import { Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full py-16 bg-[#050505] border-t border-white/5 flex flex-col items-center justify-center overflow-hidden">
        
        {/* Top Separator Line */}
        <div className="w-[60px] h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-10 rounded-full"></div>

        {/* Social Icons Row */}
        <div className="flex items-center gap-8 md:gap-10 mb-8">
            {/* Behance */}
            <a href="#" className="text-white hover:text-[#0057ff] transition-colors duration-300 transform hover:scale-110" aria-label="Behance">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-7 md:h-7">
                    <path d="M22 7h-7v-2h7v2zm1.726 10c0 5.053-3.763 5.333-5.376 5.333-4.229 0-5.148-3.083-5.148-4.994 0-4.398 2.809-5.327 5.174-5.327 3.514 0 5.35 1.83 5.35 4.988zm-5.344-3.559c-1.353 0-2.096.79-2.28 1.944h4.467c-.156-1.503-1.077-1.944-2.187-1.944zm-7.734 3.559h-2.648v-3.725h2.82c1.867 0 1.956 1.637 1.956 1.872 0 1.636-1.036 1.853-2.128 1.853zm-2.648-7.859h2.519c1.479 0 1.701 1.481 1.701 1.711 0 1.583-1.09 1.725-1.979 1.725h-2.241v-3.436zm6.605-1.141h-10.605v16h10.233c5.362 0 8.046-2.613 8.046-7.886 0-1.837-.323-3.601-1.391-4.956-1.398-1.774-3.784-2.316-6.283-3.158zm-5.078 10.667c1.391 1.156 1.259 3.033-.674 3.033h-4.853v-12h4.51c1.82 0 2.183 1.54 1.35 2.54 1.404.757 1.343 2.529-.333 3.385v.004c1.178.654 1.436 1.614 0 3.038z"/>
                </svg>
            </a>

            {/* LinkedIn */}
            <a href="#" className="text-white hover:text-[#0077b5] transition-colors duration-300 transform hover:scale-110" aria-label="LinkedIn">
                <Linkedin strokeWidth={1.5} className="w-6 h-6 md:w-7 md:h-7" />
            </a>

            {/* WhatsApp */}
            <a href="#" className="text-white hover:text-[#25D366] transition-colors duration-300 transform hover:scale-110" aria-label="WhatsApp">
                 <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-7 md:h-7">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                 </svg>
            </a>

            {/* Instagram */}
            <a href="#" className="text-white hover:text-[#E1306C] transition-colors duration-300 transform hover:scale-110" aria-label="Instagram">
                <Instagram className="w-6 h-6 md:w-7 md:h-7" />
            </a>
        </div>

        {/* Name */}
        <p className="text-white font-sans font-medium text-base md:text-lg tracking-wide mb-8 opacity-90">
            Anderson Ramon Meisterlin
        </p>

        {/* Glitch Logo Area */}
        <div className="relative mb-3 group select-none">
             {/* Logo Glitch Effect Implementation */}
             <div className="relative w-40 md:w-56 mx-auto">
                {/* Main Logo */}
                <img 
                    src={ASSETS.HEADLINE_IMAGE} 
                    alt="Design Hack" 
                    className="w-full relative z-10"
                    loading="lazy"
                />
                
                {/* Red Shift (Glitch) - MOBILE OPTIMIZATION: Hidden on mobile */}
                <img 
                    src={ASSETS.HEADLINE_IMAGE} 
                    alt="" 
                    className="w-full absolute top-0 left-0 -translate-x-[2px] opacity-70 mix-blend-screen pointer-events-none animate-pulse hidden md:block"
                    style={{ filter: 'drop-shadow(2px 0 0 #FC2C54)' }}
                />
                
                {/* Cyan Shift (Glitch) - MOBILE OPTIMIZATION: Hidden on mobile */}
                <img 
                    src={ASSETS.HEADLINE_IMAGE} 
                    alt="" 
                    className="w-full absolute top-0 left-0 translate-x-[2px] opacity-70 mix-blend-screen pointer-events-none hidden md:block"
                    style={{ filter: 'drop-shadow(-2px 0 0 #00CBD9)' }}
                />
             </div>
        </div>
        
        {/* Tagline under logo (Red) - MOBILE OPTIMIZATION: Reduced shadow */}
        <p className="text-[#FC2C54] font-bold text-[8px] md:text-[10px] tracking-[0.2em] uppercase mb-12 shadow-none md:drop-shadow-[0_0_8px_rgba(252,44,84,0.6)]">
             O CONTEÚDO SECRETO QUE NINGUÉM TE DEU
        </p>

        {/* Copyright */}
        <p className="text-gray-600 text-[10px] md:text-xs text-center max-w-md leading-relaxed px-4 font-sans border-t border-white/5 pt-6 w-full opacity-60">
            Copyright © Anderson Ramon Meisterlin | Todos os direitos reservados
        </p>
    </footer>
  );
};
