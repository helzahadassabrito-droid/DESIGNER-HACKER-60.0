
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
                <a href="#" className="text-white hover:text-[#1769ff] transition-colors duration-300 transform hover:scale-110" aria-label="Behance">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-7 md:h-7">
                        <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                    </svg>
                </a>

                {/* LinkedIn */}
                <a href="#" className="text-white hover:text-[#0077b5] transition-colors duration-300 transform hover:scale-110" aria-label="LinkedIn">
                    <Linkedin strokeWidth={1.5} className="w-6 h-6 md:w-7 md:h-7" />
                </a>

                {/* WhatsApp */}
                <a href="#" className="text-white hover:text-[#25D366] transition-colors duration-300 transform hover:scale-110" aria-label="WhatsApp">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-7 md:h-7">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
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

            {/* Tagline under logo - Split color */}
            <p className="text-center font-bold text-[8px] md:text-[10px] tracking-[0.2em] uppercase mb-12">
                <span className="text-[#FC2C54] shadow-none md:drop-shadow-[0_0_8px_rgba(252,44,84,0.6)]">O CONTEÚDO PROIBIDO</span>
                <span className="text-[#00CBD9] shadow-none md:drop-shadow-[0_0_8px_rgba(0,203,217,0.6)] ml-1">QUE NINGUÉM ME DEU</span>
            </p>

            {/* Copyright */}
            <p className="text-gray-600 text-[10px] md:text-xs text-center max-w-md leading-relaxed px-4 font-sans border-t border-white/5 pt-6 w-full opacity-60">
                Copyright © Anderson Ramon Meisterlin | Todos os direitos reservados
            </p>
        </footer>
    );
};
