
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket } from 'lucide-react';
import { ASSETS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

interface SectionFourteenProps {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}

export const SectionFourteen: React.FC<SectionFourteenProps> = ({ scrollerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // 1. Title Animation (Common - Simple Fade)
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            scroller: scrollerRef.current,
            start: "top 70%"
          }
        }
      );

      // 2. Image Animation (Split Logic)
      
      // DESKTOP: High Fidelity (Blur + Scale)
      mm.add("(min-width: 768px)", () => {
          gsap.fromTo(imageRef.current,
            { scale: 0.9, opacity: 0, filter: "blur(10px)" },
            { 
              scale: 1, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power2.out", delay: 0.2,
              scrollTrigger: {
                trigger: containerRef.current,
                scroller: scrollerRef.current,
                start: "top 60%"
              }
            }
          );
      });

      // MOBILE: High Performance (No Blur, No Scale, just Slide)
      mm.add("(max-width: 767px)", () => {
          gsap.fromTo(imageRef.current,
            { y: 30, opacity: 0 },
            { 
              y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.1,
              // Removed filter transition entirely for mobile performance
              scrollTrigger: {
                trigger: containerRef.current,
                scroller: scrollerRef.current,
                start: "top 65%"
              }
            }
          );
      });

      // 3. CTA Animation
      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.4,
          scrollTrigger: {
            trigger: containerRef.current,
            scroller: scrollerRef.current,
            start: "top 60%"
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, [scrollerRef]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-12 md:py-20 bg-[#0A0A0A] overflow-hidden flex flex-col items-center border-t border-white/5 [content-visibility:auto]"
    >
        {/* Background Ambience - Simplified opacity for better compositing */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,203,217,0.05)_0%,_#0A0A0A_70%)] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl px-4 flex flex-col items-center justify-center">
            
            {/* TITLE */}
            <div ref={titleRef} className="text-center max-w-5xl w-full mb-8 md:mb-12">
                <p className="text-[#00CBD9] text-xs md:text-sm tracking-[0.2em] font-bold uppercase mb-4 font-sans">
                    // E NÃO PARA POR AÍ
                </p>
                {/* Mobile Optimization: Removed drop-shadow-2xl on mobile to save rasterization */}
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-sans font-bold text-white leading-tight md:drop-shadow-2xl">
                    Você terá acesso a nossa <br />
                    <span className="bg-gradient-to-r from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent">
                        Comunidade VIP no Whatsapp!
                    </span>
                </h2>
                <div className="mt-6 space-y-2">
                    <p className="text-white text-lg md:text-2xl font-sans font-medium">
                        Uma Oportunidade <span className="font-bold text-[#00CBD9]">ÚNICA</span> de Networking!
                    </p>
                    <p className="text-gray-300 text-base md:text-xl font-sans uppercase tracking-widest font-bold">
                        Fundamental nessa Área!
                    </p>
                </div>
            </div>

            {/* STATIC IMAGE */}
            <div ref={imageRef} className="relative w-full max-w-5xl mb-6 md:mb-8 will-change-transform">
                {/* 
                   MOBILE OPTIMIZATION: 
                   - Added explicit width/height for layout stability (CLS).
                   - Added loading="lazy".
                   - Removed heavy drop-shadow on mobile (md:drop-shadow).
                */}
                <img 
                    src={ASSETS.DEVICES_IMAGE} 
                    alt="Comunidade VIP Design Hack" 
                    className="w-full h-auto object-contain md:drop-shadow-[0_0_50px_rgba(0,203,217,0.15)]"
                    width="1000"
                    height="600"
                    loading="lazy"
                    decoding="async"
                />
            </div>
            
            {/* CTA Button */}
            <div ref={ctaRef} className="flex-shrink-0 w-full flex justify-center">
                 <button onClick={scrollToPlans} className="group relative overflow-hidden bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] text-black font-extrabold text-sm md:text-lg px-6 py-4 md:px-8 md:py-5 rounded-2xl border-2 border-[#00CBD9]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:scale-105 hover:shadow-[0_0_50px_rgba(0,203,217,0.6)] transition-all duration-300 uppercase tracking-wider font-sans flex items-center justify-center gap-2 md:gap-3 whitespace-nowrap w-full md:w-auto">
                    <div className="absolute inset-0 bg-white/40 w-[200%] animate-shimmer-sweep opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Rocket className="w-6 h-6 md:w-6 md:h-6 shrink-0" />
                    <span className="relative z-10">QUERO SUBIR DE NÍVEL AGORA</span>
                </button>
            </div>

        </div>
    </section>
  );
};
