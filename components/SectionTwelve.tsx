
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TriangleAlert } from 'lucide-react';
import { TechCard } from './ui/TechCard';

gsap.registerPlugin(ScrollTrigger);

interface SectionTwelveProps {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}

const PAIN_POINTS = [
  {
    text: "Se Você passa horas criando, mas sempre bate aquela dúvida: 'será que eu to indo pelo caminho certo?'"
  },
  {
    text: "Abre seu portfólio e sente aquele vazio. 'O que eu coloco aqui pra alguém finalmente me enxergar?'"
  },
  {
    text: "Você vê outros designers voando e pensa: 'Cara, eles estão muito à frente... será que um dia eu chego lá?'"
  },
  {
    text: "Você pula de tutorial em tutorial, mas no fim percebe que ninguém mostra o que o mercado realmente quer."
  }
];

export const SectionTwelve: React.FC<SectionTwelveProps> = ({ scrollerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  
  // Typewriter State
  const [typedText, setTypedText] = useState("");
  const fullText = "FIQUE TRANQUILO";
  const hasStartedTyping = useRef(false);

  useEffect(() => {
    if (!scrollerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // 1. Header Animation (Simple Fade)
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            scroller: scrollerRef.current,
            start: "top 70%",
          }
        }
      );

      // 2. Grid Stagger Animation (Optimized)
      if (gridRef.current) {
        // DESKTOP: Full Animation with Back Ease & Scale
        mm.add("(min-width: 768px)", () => {
            gsap.fromTo(gridRef.current.children,
                { y: 50, opacity: 0, scale: 0.9 },
                {
                    y: 0, 
                    opacity: 1, 
                    scale: 1,
                    duration: 0.8, 
                    stagger: 0.15,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        scroller: scrollerRef.current,
                        start: "top 65%",
                    }
                }
            );
        });

        // MOBILE: Performance Optimized (No Scale, Linear Ease, Faster)
        mm.add("(max-width: 767px)", () => {
            gsap.fromTo(gridRef.current.children,
                { y: 30, opacity: 0 },
                {
                    y: 0, 
                    opacity: 1, 
                    // No scale animation on mobile to save layout recalcs
                    duration: 0.6, 
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        scroller: scrollerRef.current,
                        start: "top 75%",
                    }
                }
            );
        });
      }

      // 3. Footer Text Animation
      gsap.fromTo(footerRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current, 
            scroller: scrollerRef.current,
            start: "bottom 85%",
          }
        }
      );

      // 4. "FIQUE TRANQUILO" Typewriter Trigger
      ScrollTrigger.create({
        trigger: footerRef.current,
        scroller: scrollerRef.current,
        start: "top 80%",
        onEnter: () => {
            if (!hasStartedTyping.current) {
                hasStartedTyping.current = true;
                let i = 0;
                setTypedText("");
                
                const interval = setInterval(() => {
                    setTypedText(fullText.substring(0, i + 1));
                    i++;
                    if (i === fullText.length) {
                        clearInterval(interval);
                    }
                }, 100); 
            }
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [scrollerRef]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full pt-12 pb-24 md:pt-20 md:pb-32 px-4 bg-[#0A0A0A] overflow-hidden flex flex-col items-center border-t border-white/5"
    >
        {/* Subtle Background Glow - Optimized for Mobile */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(0,203,217,0.03)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
            
            {/* Header */}
            <h2 
                ref={headerRef}
                className="text-white font-sans font-bold text-xl md:text-3xl tracking-[0.2em] uppercase mb-10 md:mb-16 text-center drop-shadow-md"
            >
                AGORA PRESTE ATENÇÃO:
            </h2>

            {/* Cards Grid */}
            <div 
                ref={gridRef}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full mb-12 md:mb-16"
            >
                {PAIN_POINTS.map((item, i) => (
                    <PainPointCard key={i} text={item.text} />
                ))}
            </div>

            {/* Footer Text */}
            <div ref={footerRef} className="text-center px-4 flex flex-col gap-4 items-center">
                <h3 className="text-xl md:text-3xl font-sans font-medium leading-tight text-white/80">
                    SE ALGUMA DESSA COISAS BATEU EM VOCÊ...
                </h3>
                
                {/* TYPEWRITER ANIMATION TARGET */}
                <h2 
                    className="text-3xl md:text-5xl font-sans font-black leading-tight tracking-wide bg-gradient-to-r from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent min-h-[1.2em]"
                >
                    {typedText}
                    <span className="animate-pulse text-[#00CBD9] ml-1">|</span>
                </h2>
            </div>

        </div>
    </section>
  );
};

const PainPointCard: React.FC<{ text: string }> = ({ text }) => {
  return (
    <TechCard className="h-full min-h-[200px]">
        <div className="flex flex-col items-center text-center gap-4 md:gap-6 p-6 md:p-8 h-full">
            {/* 
                Icon Box 
                Mobile Optimization: Removed shadow on mobile (shadow-none)
                Desktop: Kept original glows (md:shadow-...)
            */}
            <div className="w-16 h-16 rounded-2xl bg-[#00CBD9]/10 border border-[#00CBD9] flex items-center justify-center shadow-none md:shadow-[0_0_20px_rgba(0,203,217,0.4)] md:group-hover:shadow-[0_0_40px_rgba(0,203,217,0.6)] transition-all duration-300 relative overflow-hidden shrink-0">
                {/* Scanline effect */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,203,217,0.1)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                
                {/* 
                    Icon 
                    Mobile Optimization: Removed drop-shadow on mobile
                */}
                <TriangleAlert className="text-[#00CBD9] w-8 h-8 relative z-10 drop-shadow-none md:drop-shadow-[0_0_8px_rgba(0,203,217,1)]" strokeWidth={2} />
            </div>

            <p className="text-[#E5E5E5] font-sans text-lg md:text-xl leading-snug group-hover:text-white transition-colors duration-300 tracking-wide font-medium">
                {text}
            </p>
        </div>
    </TechCard>
  );
};
