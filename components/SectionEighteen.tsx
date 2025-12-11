
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Zap, Crown, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SectionEighteenProps {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}

const AUDIENCE_LEVELS = [
  {
    title: "Iniciante",
    icon: <Compass className="w-8 h-8 text-[#00CBD9]" />,
    description: "Quer começar do jeito certo, com direção clara e estratégia para alcançar resultados reais sem desperdiçar dinheiro, tempo nem energia."
  },
  {
    title: "Intermediário",
    icon: <Zap className="w-8 h-8 text-[#00CBD9]" />,
    description: "Já tem base, mas trava no crescimento. Você trabalha, entrega, mas o retorno não vem na mesma proporção. Busca clareza e ações que fazem a diferença."
  },
  {
    title: "Avançado",
    icon: <Crown className="w-8 h-8 text-[#FFD700]" />, // Gold accent for Advanced
    description: "Já domina o jogo, mas quer jogar em outro nível. Sente que pode crescer muito mais. Busca clareza e ações que realmente escalam o negócio.",
    isPremium: true
  }
];

export const SectionEighteen: React.FC<SectionEighteenProps> = ({ scrollerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  // Refs for Beam Elements
  const desktopBeamRef = useRef<HTMLDivElement>(null);
  const mobileBeamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollerRef.current) return;

    const ctx = gsap.context(() => {
      
      // 1. Header Entrance (Simple Fade)
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            scroller: scrollerRef.current,
            start: "top 75%"
          }
        }
      );

      // --- MATCH MEDIA FOR RESPONSIVE MOTION ---
      const mm = gsap.matchMedia();

      // DESKTOP ANIMATION (Horizontal Flow - High Fidelity)
      mm.add("(min-width: 768px)", () => {
         const tl = gsap.timeline({
            scrollTrigger: {
                trigger: cardsRef.current,
                scroller: scrollerRef.current,
                start: "top 70%", // Start animating when cards section hits 70% of viewport
                end: "bottom 80%",   // Finish when bottom hits 80%
                scrub: 1,         // Smooth scrubbing linked to scroll
            }
         });

         // Initial State: Cards Dimmed + Blurred + Grayscale
         gsap.set(".audience-card", { opacity: 0.3, filter: "grayscale(100%) blur(2px)", scale: 0.95 });
         gsap.set(desktopBeamRef.current, { scaleX: 0 });

         // Step 1: Beam grows to Card 1
         tl.to(desktopBeamRef.current, { scaleX: 0.15, duration: 0.5, ease: "none" })
           .to(cardsRef.current?.children[0] || {}, { opacity: 1, filter: "grayscale(0%) blur(0px)", scale: 1, duration: 0.5 }, "<");

         // Step 2: Beam grows to Card 2
         tl.to(desktopBeamRef.current, { scaleX: 0.5, duration: 0.5, ease: "none" })
           .to(cardsRef.current?.children[1] || {}, { opacity: 1, filter: "grayscale(0%) blur(0px)", scale: 1, duration: 0.5 }, "<");

         // Step 3: Beam grows to Card 3 (Full)
         tl.to(desktopBeamRef.current, { scaleX: 1, duration: 0.5, ease: "none" })
           .to(cardsRef.current?.children[2] || {}, { opacity: 1, filter: "grayscale(0%) blur(0px)", scale: 1.05, duration: 0.5 }, "<");
      });

      // MOBILE ANIMATION (Vertical Flow - High Performance)
      mm.add("(max-width: 767px)", () => {
         const tl = gsap.timeline({
            scrollTrigger: {
                trigger: cardsRef.current,
                scroller: scrollerRef.current,
                start: "top 60%", // Start earlier on mobile
                end: "bottom 90%",
                scrub: 1,
            }
         });

         // Initial State: NO FILTER, NO BLUR (Performance)
         gsap.set(".audience-card", { opacity: 0.3, x: -10 }); // Reduced X distance
         gsap.set(mobileBeamRef.current, { scaleY: 0 });

         // Step 1: Beam down to Card 1
         tl.to(mobileBeamRef.current, { scaleY: 0.33, duration: 0.5, ease: "none" })
           .to(cardsRef.current?.children[0] || {}, { opacity: 1, x: 0, duration: 0.5 }, "<");

         // Step 2: Beam down to Card 2
         tl.to(mobileBeamRef.current, { scaleY: 0.66, duration: 0.5, ease: "none" })
           .to(cardsRef.current?.children[1] || {}, { opacity: 1, x: 0, duration: 0.5 }, "<");

         // Step 3: Beam down to Card 3
         tl.to(mobileBeamRef.current, { scaleY: 1, duration: 0.5, ease: "none" })
           .to(cardsRef.current?.children[2] || {}, { opacity: 1, x: 0, duration: 0.5 }, "<");
      });

    }, containerRef);

    return () => ctx.revert();
  }, [scrollerRef]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-10 md:py-32 bg-[#0A0A0A] overflow-hidden flex flex-col items-center border-t border-white/5 [content-visibility:auto]"
    >
        {/* Background Grid - Optimized opacity */}
        <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ 
                backgroundImage: 'linear-gradient(rgba(0, 203, 217, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 203, 217, 0.5) 1px, transparent 1px)', 
                backgroundSize: '40px 40px' 
            }} 
        />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 flex flex-col items-center">
            
            {/* --- HEADER --- */}
            <div ref={headerRef} className="text-center mb-12 md:mb-20">
                <p className="text-gray-500 text-xs md:text-sm uppercase tracking-[0.3em] font-bold mb-4 font-sans">
                    IDENTIFIQUE SEU MOMENTO
                </p>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans font-bold text-white">
                    O <span className="bg-gradient-to-r from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent">DESIGN HACK</span> é para você:
                </h2>
            </div>

            {/* --- CARDS CONTAINER WITH BEAMS --- */}
            <div className="relative w-full max-w-6xl pl-6 md:pl-0">
                
                {/* DESKTOP BEAM (Horizontal Line) */}
                <div className="hidden md:block absolute top-[40px] left-0 w-full h-[3px] bg-[#1a1a1a] z-0 rounded-full overflow-hidden">
                    <div 
                        ref={desktopBeamRef} 
                        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#00CBD9] via-[#AEECF1] to-[#00CBD9] shadow-[0_0_20px_#00CBD9] origin-left"
                    ></div>
                </div>

                {/* MOBILE BEAM (Vertical Line) */}
                <div className="md:hidden absolute top-0 left-0 w-[3px] h-full bg-[#1a1a1a] z-0 rounded-full overflow-hidden">
                    {/* Mobile Optimization: Removed shadow on mobile beam to save GPU */}
                    <div 
                        ref={mobileBeamRef} 
                        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#00CBD9] via-[#AEECF1] to-[#00CBD9] md:shadow-[0_0_20px_#00CBD9] origin-top"
                    ></div>
                </div>

                {/* --- CARDS GRID --- */}
                <div 
                    ref={cardsRef}
                    className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 w-full relative z-10"
                >
                    {AUDIENCE_LEVELS.map((item, index) => (
                        <AudienceCard key={index} data={item} index={index} />
                    ))}
                </div>
            </div>

        </div>
    </section>
  );
};

const AudienceCard: React.FC<{ data: any, index: number }> = ({ data, index }) => {
    return (
        <div className="audience-card group relative h-full transition-all duration-500 will-change-transform">
            
            {/* Desktop Connector Dot (Visual Anchor to Beam) */}
            <div className="hidden md:flex absolute -top-[34px] left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0A0A0A] border-2 border-[#333] rounded-full items-center justify-center z-20 group-[.audience-card[style*='opacity: 1']]:border-[#00CBD9] transition-colors duration-300">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#333] group-[.audience-card[style*='opacity: 1']]:bg-[#00CBD9] group-[.audience-card[style*='opacity: 1']]:shadow-[0_0_10px_#00CBD9] transition-all duration-300"></div>
            </div>

            {/* Mobile Connector Dot - Optimized: Removed glow */}
            <div className="md:hidden absolute top-1/2 -translate-y-1/2 -left-[32px] w-4 h-4 bg-[#0A0A0A] border-2 border-[#333] rounded-full items-center justify-center z-20 group-[.audience-card[style*='opacity: 1']]:border-[#00CBD9] transition-colors duration-300">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#333] group-[.audience-card[style*='opacity: 1']]:bg-[#00CBD9] transition-all duration-300"></div>
            </div>

            {/* Card Container */}
            <div className={`
                relative h-full bg-[#0E0E0E] rounded-2xl p-[1px] overflow-hidden transition-all duration-500
                ${data.isPremium 
                    ? 'shadow-none md:shadow-[0_0_30px_rgba(255,215,0,0.05)]' 
                    : 'shadow-none md:shadow-[0_0_30px_rgba(0,203,217,0.05)]'
                }
            `}>
                
                {/* Gradient Border (Shows when active) */}
                <div className={`absolute inset-0 opacity-0 group-[.audience-card[style*='opacity: 1']]:opacity-100 transition-opacity duration-500 ${data.isPremium ? 'bg-gradient-to-b from-[#FFD700] to-transparent' : 'bg-gradient-to-b from-[#00CBD9] to-transparent'}`} />

                {/* Inner Content */}
                <div className="relative h-full bg-[#0E0E0E] rounded-[15px] p-6 md:p-8 flex flex-col items-center text-center overflow-hidden">
                    
                    {/* Top Highlight */}
                    <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                    {/* Icon Circle */}
                    <div className={`
                        w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mt-2 transition-all duration-500
                        ${data.isPremium 
                            ? 'bg-[#FFD700]/10 border border-[#FFD700]/20' 
                            : 'bg-[#00CBD9]/10 border border-[#00CBD9]/20'
                        }
                    `}>
                        <div className="group-[.audience-card[style*='opacity: 1']]:scale-110 transition-transform duration-300">
                            {data.icon}
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className={`text-2xl font-bold mb-4 font-sans ${data.isPremium ? 'text-[#FFD700]' : 'text-white'}`}>
                        {data.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white text-base md:text-lg leading-relaxed mb-4 flex-grow font-sans">
                        {data.description}
                    </p>

                    {/* Active Sweep Effect - MOBILE OPTIMIZATION: Hidden on mobile */}
                    <div className="hidden md:block absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-200%] group-[.audience-card[style*='opacity: 1']]:animate-shimmer-sweep pointer-events-none" />
                </div>
            </div>
        </div>
    );
};
