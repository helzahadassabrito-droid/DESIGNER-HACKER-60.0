
import React, { useRef, useEffect, ReactElement } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  DollarSign, 
  Pencil, 
  PenTool, 
  Image as ImageIcon, 
  Zap, 
  Target, 
  Briefcase, 
  TrendingUp, 
  Globe,
  Rocket
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SectionThirteenProps {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}

const COLORS_MAP: Record<string, string> = {
  cyan: "#00CBD9",
  magenta: "#FC2C54",
  gold: "#FFD700",
  blue: "#2563EB",
  green: "#10B981"
};

const SOLUTIONS = [
  {
    icon: <DollarSign />,
    color: "cyan", 
    text: "Se autopromover e <strong class='text-white'>aumentar suas vendas</strong> para alcançar resultados consistentes"
  },
  {
    icon: <Pencil />,
    color: "magenta",
    text: "Dominar Técnicas de <strong class='text-white'>Desenho Manual</strong> e expressão visual"
  },
  {
    icon: <PenTool />,
    color: "gold",
    text: "Dominar Técnicas de <strong class='text-white'>Vetorização com Illustrator</strong>"
  },
  {
    icon: <ImageIcon />,
    color: "blue",
    text: "Dominar Técnicas de <strong class='text-white'>Renderização com Photoshop</strong>"
  },
  {
    icon: <Zap />,
    color: "gold",
    text: "Ganhar <strong class='text-white'>TEMPO</strong> e criar projetos 10x mais <strong class='text-white'>PODEROSOS</strong>"
  },
  {
    icon: <Target />,
    color: "magenta",
    text: "Dominar o Design <strong class='text-white'>Integrativo e Estratégico</strong>"
  },
  {
    icon: <Briefcase />,
    color: "cyan",
    text: "Estruturar seu <strong class='text-white'>Portfólio Profissional</strong> PRONTO e VALIDADO"
  },
  {
    icon: <TrendingUp />,
    color: "green",
    text: "Um Caminho Claro para sair do <strong class='text-white'>Zero até o Lucro</strong> no Mercado Criativo"
  },
  {
    icon: <Globe />,
    color: "cyan",
    text: "Atuar no <strong class='text-white'>Mercado GRINGO</strong> e Ganhar em Dólar"
  }
];

export const SectionThirteen: React.FC<SectionThirteenProps> = ({ scrollerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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
            start: "top 75%",
          }
        }
      );

      // 2. Grid Stagger Animation (Optimized)
      if (gridRef.current) {
        
        // DESKTOP: Full Animation (Scale + Back Ease)
        mm.add("(min-width: 768px)", () => {
            gsap.fromTo(gridRef.current.children,
              { 
                y: 40, 
                opacity: 0, 
                scale: 0.95,
              },
              {
                y: 0, 
                opacity: 1, 
                scale: 1,
                duration: 0.8, 
                stagger: 0.1, 
                ease: "back.out(1.2)", 
                scrollTrigger: {
                  trigger: gridRef.current,
                  scroller: scrollerRef.current,
                  start: "top 70%",
                }
              }
            );
        });

        // MOBILE: Simplified Animation (No Scale, Faster)
        mm.add("(max-width: 767px)", () => {
            gsap.fromTo(gridRef.current.children,
              { 
                y: 30, 
                opacity: 0, 
                // No scale on mobile to save layout recalcs
              },
              {
                y: 0, 
                opacity: 1, 
                duration: 0.6, 
                stagger: 0.05, // Faster stagger
                ease: "power2.out", 
                scrollTrigger: {
                  trigger: gridRef.current,
                  scroller: scrollerRef.current,
                  start: "top 80%",
                }
              }
            );
        });
      }

      // 3. CTA Animation
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
            { y: 30, opacity: 0 },
            {
               y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power2.out",
               scrollTrigger: {
                  trigger: ctaRef.current,
                  scroller: scrollerRef.current,
                  start: "top 90%"
               }
            }
         );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [scrollerRef]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full pt-12 pb-24 md:py-32 px-4 bg-[#0A0A0A] overflow-hidden flex flex-col items-center border-t border-white/5"
    >
      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center">
        
        {/* Header Connection */}
        <div ref={headerRef} className="mb-10 md:mb-16 text-center px-4 w-full flex flex-col items-center">
            <h2 className="text-2xl md:text-5xl font-sans font-bold text-white mb-4 leading-tight">
                Pois ao final do Design Hack <br />
                <span className="bg-gradient-to-r from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent">
                   você será capaz de:
                </span>
            </h2>
            {/* Divider - Pink Gradient */}
            <div className="w-full max-w-[200px] md:max-w-[400px] h-1 bg-gradient-to-r from-transparent via-[#FC2C54] to-transparent rounded-full opacity-80 mt-2"></div>
        </div>

        {/* 
            GRID SYSTEM 
        */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full px-2"
        >
          {SOLUTIONS.map((item, i) => {
            const activeColor = COLORS_MAP[item.color];
            const borderColor = "#FC2C54"; // CONSTANT PINK BORDER for all cards
            
            return (
              <div 
                  key={i} 
                  className="group relative w-full h-full min-h-[100px] perspective-1000"
              >
                  {/* 
                     1. AMBIENT SHADOW (Pink Glow)
                     Appears on hover to back the moving line.
                     MOBILE OPTIMIZATION: Hidden on mobile (hidden md:block)
                  */}
                  <div 
                    className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-lg hidden md:block"
                    style={{ backgroundColor: borderColor }}
                  ></div>

                  {/* 
                     2. CONTAINER (Clips the spinning effect)
                  */}
                  <div className="relative h-full w-full bg-[#0A0A0A] rounded-2xl overflow-hidden">
                      
                      {/* 
                         STATIC BORDER (Visible when NOT hovering)
                         Gives structure when idle. Increased thickness to 3px.
                      */}
                      <div 
                        className="absolute inset-0 rounded-2xl border-[3px] transition-opacity duration-300 md:group-hover:opacity-0"
                        style={{ borderColor: `${borderColor}40` }}
                      ></div>

                      {/* 
                         MOVING LINE EFFECT (Visible on HOVER)
                         Spinning conic gradient simulating a snake line.
                         inset-[-200%] ensures the gradient covers corners during rotation.
                         MOBILE OPTIMIZATION: Hidden on mobile (hidden md:block) to prevent continuous heavy painting.
                      */}
                      <div 
                        className="hidden md:block absolute inset-[-200%] animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ 
                            background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 50%, ${borderColor} 100%)`
                        }}
                      ></div>

                      {/* 
                         3. INNER MASK
                         Creates the "hole" for the content, defining the border thickness (3px).
                      */}
                      <div className="absolute inset-[3px] bg-[#0A0A0A] rounded-[13px] z-10"></div>

                      {/* 
                         4. CONTENT
                      */}
                      <div className="relative z-20 h-full w-full p-4 md:p-6 flex items-center gap-5">
                          
                          {/* Icon Container (Preserves original color logic) */}
                          <div 
                            className="relative shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl border border-white/5 flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),0_4px_8px_rgba(0,0,0,0.5)] transition-colors duration-300 bg-[#131313]"
                          >
                              {/* Inner Glow matching icon color */}
                              <div 
                                className="absolute inset-0 rounded-xl opacity-10 blur-md pointer-events-none group-hover:opacity-30 transition-opacity duration-300" 
                                style={{ backgroundColor: activeColor }}
                              ></div>
                              
                              {/* The Icon */}
                              {/* Mobile: Removed drop-shadow and brightness filter for clearer SVG rendering */}
                              {React.cloneElement(item.icon as ReactElement<any>, {
                                  size: 28, 
                                  color: activeColor, 
                                  strokeWidth: 2,
                                  className: "relative z-10 transition-transform duration-300 md:group-hover:scale-110 md:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] md:filter md:brightness-110", 
                              })}
                          </div>

                          {/* Text Content */}
                          <p 
                              className="text-gray-300 text-base md:text-lg leading-snug font-sans font-medium transition-colors duration-300 group-hover:text-white"
                              dangerouslySetInnerHTML={{ __html: item.text }}
                          />
                          
                          {/* Subtle Shine on Hover (Interior) */}
                          {/* Mobile: Hidden shimmer */}
                          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-200%] group-hover:animate-shimmer-sweep pointer-events-none rounded-[14px]"></div>
                      </div>
                  </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div ref={ctaRef} className="mt-12 md:mt-20 w-full flex justify-center">
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
