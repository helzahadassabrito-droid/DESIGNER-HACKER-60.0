
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PauseCircle, MousePointer2, X, Rocket } from 'lucide-react';
import { GUESTS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

interface SectionEightProps {
    scrollerRef: React.RefObject<HTMLDivElement | null>;
}

export const SectionEight: React.FC<SectionEightProps> = ({ scrollerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  // State for the expanded card (Zoom effect)
  const [selectedGuest, setSelectedGuest] = useState<typeof GUESTS[0] | null>(null);

  useEffect(() => {
    if (!scrollerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // 1. Entrance Animation (Split Logic)
      mm.add("(min-width: 768px)", () => {
          gsap.fromTo(titleRef.current,
            { y: 50, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 1, ease: "power3.out",
              scrollTrigger: {
                trigger: containerRef.current,
                scroller: scrollerRef.current,
                start: "top 75%",
              }
            }
          );
      });

      mm.add("(max-width: 767px)", () => {
          gsap.fromTo(titleRef.current,
            { y: 30, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                scroller: scrollerRef.current,
                start: "top 80%",
              }
            }
          );
      });

      // 2. Infinite Marquee
      // Optimized: Ensure logic runs efficiently
      const duration = 40; 
      const tl = gsap.to(innerRef.current, {
        xPercent: -50,
        ease: "none",
        duration: duration,
        repeat: -1,
        force3D: true // Hardware acceleration hint
      });

      marqueeRef.current?.addEventListener('mouseenter', () => tl.pause());
      marqueeRef.current?.addEventListener('mouseleave', () => tl.play());

      // Marquee Entrance
      gsap.fromTo(marqueeRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            scroller: scrollerRef.current,
            start: "top 60%",
          }
        }
      );

      // 3. CTA Animation
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
            { y: 30, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power2.out",
                scrollTrigger: {
                    trigger: marqueeRef.current, 
                    scroller: scrollerRef.current,
                    start: "bottom 90%"
                }
            }
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, [scrollerRef]);

  const marqueeList = [...GUESTS, ...GUESTS, ...GUESTS]; // Tripled for smoothness

  return (
    <section 
      ref={containerRef} 
      className="relative w-full pt-10 md:pt-16 pb-12 md:pb-32 bg-[#050505] overflow-hidden [content-visibility:auto]"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(255,215,0,0.08)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 flex flex-col items-center">
        
        {/* Header Section */}
        <div ref={titleRef} className="text-center mb-8 md:mb-24 opacity-0 flex flex-col items-center">
          
          {/* UPDATED: "No Módulo 09" using StatPill Design */}
          <div className="flex items-center gap-3 px-8 py-4 rounded-2xl border border-[#00CBD9] bg-[#05121d] md:shadow-[0_0_15px_rgba(0,203,217,0.15)] mb-8">
            <span className="text-white font-bold text-lg font-sans tracking-wide uppercase">
                No Módulo 09
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight font-sans">
            Regularmente teremos <br className="hidden md:block"/>
            <span className="text-white">convidados especiais</span>
          </h2>
          
          <p className="bg-gradient-to-r from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent text-lg md:text-xl font-bold tracking-wide font-sans">
            Aprenda com especialistas que atuam no Mercado
          </p>
        </div>

        {/* Marquee Carousel */}
        <div ref={marqueeRef} className="w-full relative opacity-0">
           <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 z-20 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
           <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 z-20 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />

           <div className="overflow-hidden w-full cursor-grab active:cursor-grabbing py-8 md:py-12">
              <div ref={innerRef} className="flex gap-4 md:gap-12 w-max px-4">
                  {marqueeList.map((guest, idx) => (
                    <GuestCard 
                        key={`${guest.name}-${idx}`} 
                        guest={guest} 
                        onClick={() => setSelectedGuest(guest)}
                    />
                  ))}
              </div>
           </div>

           <div className="flex md:hidden items-center justify-center gap-2 mt-4 text-white/30 text-[10px] uppercase tracking-widest">
              <MousePointer2 size={12} /> Arraste para explorar
           </div>
           
           <div className="hidden md:flex items-center justify-center gap-2 mt-8 text-white/30 text-xs uppercase tracking-widest">
              <PauseCircle size={14} /> Passe o mouse para pausar • Clique para ampliar
           </div>
        </div>

        {/* CTA Button */}
        <div ref={ctaRef} className="mt-8 md:mt-20 w-full flex justify-center opacity-0 px-4">
             <button className="group relative overflow-hidden bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] text-black font-extrabold text-sm md:text-lg px-6 py-4 md:px-8 md:py-5 rounded-2xl border-2 border-[#00CBD9]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:scale-105 hover:shadow-[0_0_50px_rgba(0,203,217,0.6)] transition-all duration-300 uppercase tracking-wider font-sans flex items-center justify-center gap-2 md:gap-3 whitespace-nowrap w-full md:w-auto">
                    <div className="absolute inset-0 bg-white/40 w-[200%] animate-shimmer-sweep opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Rocket className="w-6 h-6 md:w-6 md:h-6 shrink-0" />
                    <span className="relative z-10">QUERO SUBIR DE NÍVEL AGORA</span>
            </button>
        </div>

      </div>

      {/* ZOOM MODAL */}
      {selectedGuest && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
              {/* Backdrop - Solid on mobile for performance, blurred on desktop */}
              <div 
                className="absolute inset-0 bg-black/95 md:bg-black/90 md:backdrop-blur-md"
                onClick={() => setSelectedGuest(null)}
              ></div>

              {/* Zoomed Card Container */}
              <div className="relative w-full max-w-[360px] md:max-w-[400px] aspect-[3/4] animate-in fade-in zoom-in duration-300">
                  
                  {/* METALLIC GOLD BORDER WRAPPER (Zoomed) - Reduced shadow on mobile */}
                  <div className="absolute inset-0 rounded-[32px] p-[3px] bg-gradient-to-br from-[#BF953F] via-[#FCF6BA] to-[#B38728] shadow-none md:shadow-[0_0_80px_rgba(255,215,0,0.4)]">
                    <div className="relative w-full h-full rounded-[29px] overflow-hidden bg-black">
                        <button 
                            onClick={() => setSelectedGuest(null)}
                            className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors border border-white/10"
                        >
                            <X size={24} />
                        </button>
                        
                        <img 
                            src={selectedGuest.image} 
                            alt={selectedGuest.name} 
                            className="absolute inset-0 w-full h-full object-cover"
                            decoding="async"
                        />
                        
                        {/* Gradients - Simplified for mobile */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#BF953F] via-[#BF953F]/20 to-transparent opacity-90 md:mix-blend-multiply"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                        <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-center text-center">
                            <h3 className="text-black font-black text-2xl md:text-3xl uppercase tracking-wider mb-1 leading-none drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
                                {selectedGuest.name}
                            </h3>
                            <p className="text-[#3a2f0b] font-bold text-sm md:text-base uppercase tracking-widest mb-4 drop-shadow-sm">
                                {selectedGuest.role}
                            </p>
                            <p className="text-black/90 font-medium text-sm leading-relaxed max-w-[90%]">
                                {selectedGuest.bio}
                            </p>
                        </div>
                    </div>
                  </div>
              </div>
          </div>
      )}

    </section>
  );
};

interface GuestCardProps {
    guest: typeof GUESTS[0];
    onClick: () => void;
}

const GuestCard: React.FC<GuestCardProps> = ({ guest, onClick }) => {
  return (
    <div 
        onClick={onClick}
        className="group relative w-[240px] md:w-[320px] h-[360px] md:h-[480px] flex-shrink-0 cursor-pointer transition-all duration-500 md:hover:-translate-y-4 perspective-1000"
    >
      {/* 
          ULTRA PREMIUM METALLIC GOLD BORDER 
          Mobile: Reduced shadow, no hover glow expansion to save GPU.
      */}
      <div className="absolute inset-0 rounded-[24px] p-[2px] bg-gradient-to-br from-[#BF953F] via-[#FCF6BA] to-[#B38728] shadow-[0_0_10px_rgba(191,149,63,0.1)] md:shadow-[0_0_25px_rgba(191,149,63,0.3)] md:group-hover:shadow-[0_0_60px_rgba(255,215,0,0.6)] transition-all duration-500">
        
        {/* Inner Content - Black Background to mask image corners correctly */}
        <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-black">
            
            {/* Image - No scale zoom on mobile */}
            <img 
                src={guest.image} 
                alt={guest.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110"
                loading="lazy"
                decoding="async"
            />

            {/* Premium Gold Overlays - BLENDS DISABLED ON MOBILE */}
            {/* 1. Multiply blend for color tinting (Desktop only) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700] via-[#FFD700]/30 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90 md:mix-blend-multiply hidden md:block" />
            
            {/* 1. Mobile Fallback (Simple Gradient) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#b39029] via-transparent to-transparent opacity-80 md:hidden" />

            {/* 2. Overlay blend for luminosity (Desktop only) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700] via-transparent to-transparent opacity-50 md:mix-blend-overlay hidden md:block" />

            {/* Text Content */}
            <div className="absolute bottom-0 left-0 w-full p-4 pb-6 md:p-6 md:pb-8 flex flex-col items-center text-center z-20">
                
                {/* Name */}
                <h3 className="text-black font-black text-xl md:text-2xl uppercase tracking-wider mb-1 leading-none drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
                    {guest.name}
                </h3>
                
                {/* Role */}
                <p className="text-[#3a2f0b] font-bold text-[10px] md:text-xs uppercase tracking-widest mb-2 drop-shadow-sm">
                    {guest.role}
                </p>
                
                {/* Decorative Line (Expands on hover - Desktop only) */}
                <div className="w-12 h-[3px] bg-black/80 mt-1 mb-1 md:group-hover:w-24 transition-all duration-500 rounded-full" />
            </div>
        </div>
      </div>
    </div>
  );
};
