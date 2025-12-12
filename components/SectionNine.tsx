
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket } from 'lucide-react';
import { ASSETS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

interface SectionNineProps {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}

export const SectionNine: React.FC<SectionNineProps> = ({ scrollerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const frontCertRef = useRef<HTMLDivElement>(null);
  const backCertRef = useRef<HTMLDivElement>(null);

  // Typewriter State
  const [displayText, setDisplayText] = useState("");
  const names = ["{NOME_ALUNO}", "Anderson Ramon", "Maria Silva", "João Souza", "Seu Nome Aqui"];
  const [nameIndex, setNameIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // --- Typewriter Effect Logic ---
  useEffect(() => {
    const currentName = names[nameIndex];
    const typingSpeed = isDeleting ? 50 : 100; // Delete faster than type
    const pauseEnd = 2000; // Wait at end of word

    const handleType = () => {
      if (!isDeleting) {
        // Typing
        if (charIndex < currentName.length) {
          setDisplayText((prev) => currentName.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        } else {
          // Finished typing word
          setTimeout(() => setIsDeleting(true), pauseEnd);
        }
      } else {
        // Deleting
        if (charIndex > 0) {
          setDisplayText((prev) => currentName.substring(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        } else {
          // Finished deleting word
          setIsDeleting(false);
          setNameIndex((prev) => (prev + 1) % names.length);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, nameIndex, names]);

  // --- Animations & Parallax Logic ---
  useEffect(() => {
    if (!scrollerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // 1. Text Column Entrance (Right) - Common
      gsap.fromTo(rightColRef.current,
        { x: 30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            scroller: scrollerRef.current,
            start: "top 75%",
          }
        }
      );

      // 2. Desktop Logic: Heavy Animations & Parallax
      mm.add("(min-width: 1024px)", () => {
          // Complex Scale Entrance
          gsap.fromTo(leftColRef.current,
            { scale: 0.8, opacity: 0, y: 50 },
            {
              scale: 1, opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
              scrollTrigger: {
                trigger: containerRef.current,
                scroller: scrollerRef.current,
                start: "top 70%",
              }
            }
          );

          // Mouse Parallax (Attached purely via JS to avoid React overhead)
          const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const moveX = (clientX - centerX) / 30; // Sensitivity
            const moveY = (clientY - centerY) / 30;

            // Front layer moves faster (closer)
            gsap.to(frontCertRef.current, {
              x: moveX * 1.5,
              y: moveY * 1.5,
              rotationY: moveX * 0.1,
              rotationX: -moveY * 0.1,
              duration: 0.5,
              ease: "power2.out"
            });

            // Back layer moves slower (farther)
            gsap.to(backCertRef.current, {
              x: -moveX, 
              y: -moveY,
              duration: 0.5,
              ease: "power2.out"
            });
          };

          containerRef.current?.addEventListener('mousemove', handleMouseMove);
          return () => {
             containerRef.current?.removeEventListener('mousemove', handleMouseMove);
          };
      });

      // 3. Mobile Logic: Simplified Entrance
      mm.add("(max-width: 1023px)", () => {
          // Simple Fade Up (No Scale)
          gsap.fromTo(leftColRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                scroller: scrollerRef.current,
                start: "top 75%",
              }
            }
          );
      });

    }, containerRef);

    return () => ctx.revert();
  }, [scrollerRef]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[auto] md:min-h-[90vh] pt-4 md:pt-0 pb-16 md:pb-16 px-4 bg-[#000000] overflow-hidden flex items-center justify-center border-t border-white/5 [content-visibility:auto]"
    >
      {/* Background Glow - Optimized Blur for Mobile */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#00CBD9] opacity-5 blur-[60px] md:blur-[150px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-8 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: CERTIFICATE MOCKUPS */}
        <div ref={leftColRef} className="relative w-full h-[300px] md:h-[500px] flex items-center justify-center md:perspective-1000 mb-0 md:mb-0">
          
          {/* Back Certificate (Shadow/Ghost) */}
          <div 
            ref={backCertRef}
            className="absolute w-[90%] max-w-[550px] aspect-[1.414/1] bg-[#1a1a1a] rounded-sm border border-white/5 shadow-2xl opacity-40 blur-[2px] -translate-x-4 md:-translate-x-8 -translate-y-2 md:-translate-y-4 -rotate-2 z-0"
          >
          </div>

          {/* FRONT CERTIFICATE - REPLICATING THE IMAGE DESIGN */}
          <div 
            ref={frontCertRef}
            className="absolute w-[95%] md:w-[90%] max-w-[600px] aspect-[1.414/1] bg-[#F5F5F5] rounded-sm shadow-2xl md:shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 flex flex-col relative overflow-hidden group border-[4px] border-[#FFD700]"
          >
              {/* --- DECORATIVE SHAPES (CSS Shapes for performance) --- */}
              
              {/* Top Right: Black & Grey Shapes */}
              <div className="absolute top-0 right-0 w-[40%] h-[60%] bg-[#1a1a1a] z-0" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
              <div className="absolute top-0 right-0 w-[35%] h-[55%] bg-[#333] z-0 opacity-50" style={{ clipPath: 'polygon(100% 0, 20% 0, 100% 80%)' }}></div>
              
              {/* Bottom Left: Black Shape */}
              <div className="absolute bottom-0 left-0 w-[25%] h-[40%] bg-black z-0" style={{ clipPath: 'polygon(0 100%, 0 0, 100% 100%)' }}></div>
              
              {/* Bottom Right: Wireframe Simulation (Thin lines) */}
               <div className="absolute bottom-[-5%] right-[-5%] w-[120px] h-[120px] md:w-[180px] md:h-[180px] opacity-30 pointer-events-none z-1">
                  <svg viewBox="0 0 100 100" className="w-full h-full stroke-gray-600 fill-none stroke-[0.5]">
                      <path d="M50 0 L95 25 L95 75 L50 100 L5 75 L5 25 Z" />
                      <path d="M50 0 L50 100 M95 25 L5 75 M95 75 L5 25" />
                      <path d="M5 25 L95 25 M5 75 L95 75" />
                  </svg>
               </div>

              {/* --- CONTENT --- */}
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-5 px-6 md:py-10 md:px-12 text-black">
                  
                  {/* Header Logo */}
                  <div className="flex flex-col items-center">
                      <div className="font-michroma text-lg md:text-2xl font-bold tracking-widest uppercase italic text-black leading-none drop-shadow-sm">
                        DESIGN
                      </div>
                      <div className="font-michroma text-[0.6rem] md:text-sm tracking-[0.6em] uppercase text-black/70 leading-none mt-1">
                        HACK
                      </div>
                  </div>

                  {/* Title */}
                  <div className="text-center mt-2">
                      <h1 className="font-sans text-2xl md:text-5xl font-extrabold text-black tracking-wide uppercase leading-none">
                        CERTIFICADO
                      </h1>
                      <p className="font-sans text-[0.6rem] md:text-sm tracking-[0.4em] text-black/60 uppercase mt-1">
                        DE CONCLUSÃO
                      </p>
                  </div>

                  {/* Name (Dynamic) */}
                  <div className="w-full flex flex-col items-center my-1 md:my-2">
                      <div className="relative w-full max-w-lg text-center border-b border-black/30 pb-1 md:pb-2 mb-1 md:mb-2">
                         <span className="font-serif text-xl md:text-4xl font-bold text-black uppercase tracking-wide">
                            {displayText}
                            <span className="animate-pulse ml-0.5 text-black">|</span>
                         </span>
                      </div>
                      <p className="text-[0.5rem] md:text-xs font-bold text-black/50 uppercase tracking-widest">
                         ATRIBUÍDO EM 15/10/2025
                      </p>
                  </div>

                  {/* Description */}
                  <p className="text-[0.55rem] md:text-sm text-center max-w-lg text-black/70 font-medium leading-relaxed px-4">
                     Certificamos que este aluno(a) concluiu o Curso Avançado de Design, e chegou até o fim com ótimo desempenho.
                  </p>

                  {/* Signatures */}
                  <div className="w-full flex justify-between items-end mt-2 md:mt-4 px-2 md:px-8 gap-4">
                      <div className="flex flex-col items-center justify-center flex-1">
                          {/* Signature Font - Adjusted to fit better on mobile */}
                          <div className="font-serif italic text-[10px] sm:text-xs md:text-2xl text-black/80 mb-1 transform -rotate-2 whitespace-nowrap">
                             Anderson Ramon Meisterlin
                          </div>
                          <div className="w-full h-[1px] bg-black"></div>
                          <p className="text-[0.45rem] md:text-[10px] font-bold uppercase mt-1 tracking-wider">INSTRUTOR</p>
                      </div>

                      <div className="flex flex-col items-center justify-center flex-1">
                          <div className="h-4 md:h-8"></div> {/* Spacer */}
                          <div className="w-full h-[1px] bg-black"></div>
                          <p className="text-[0.45rem] md:text-[10px] font-bold uppercase mt-1 tracking-wider">ASSINATURA</p>
                      </div>
                  </div>

                  {/* Footer */}
                  <div className="text-[0.4rem] md:text-[8px] text-center text-black/40 uppercase tracking-wide mt-2 md:mt-4 w-full">
                     DIPLOMA DE CONCLUSÃO DE ESTUDOS - EMISSÃO DE CERTIFICADO OFICIAL <br className="hidden md:block"/>
                     - ADQUIRIU OS CONHECIMENTOS NECESSÁRIOS DURANTE O PERÍODO
                  </div>

              </div>
              
              {/* Shine Overlay - HIDDEN ON MOBILE */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent skew-x-12 translate-x-[-200%] animate-shimmer-sweep pointer-events-none"></div>
           </div>
        </div>

        {/* RIGHT COLUMN: TEXT CONTENT */}
        <div ref={rightColRef} className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 md:space-y-6 px-2">
            <h2 className="text-4xl md:text-6xl font-black text-white font-sans uppercase leading-none">
                Certificado <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">Valorizado</span>
            </h2>
            
            <h3 className="text-xl md:text-2xl font-medium text-[#00CBD9] tracking-wide">
                Acrescente no seu currículo.
            </h3>
            
            <p className="text-gray-100 text-lg md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                Ao final do curso, você solicita e recebe um certificado digital, 
                <span className="text-white font-bold"> exclusivo </span> 
                para quem completar todas as aulas do curso.
            </p>

            <div className="pt-6 w-full md:w-auto">
                 <button onClick={scrollToPlans} className="group relative overflow-hidden bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] text-black font-extrabold text-sm md:text-lg px-6 py-4 md:px-8 md:py-5 rounded-2xl border-2 border-[#00CBD9]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:scale-105 hover:shadow-[0_0_50px_rgba(0,203,217,0.6)] transition-all duration-300 uppercase tracking-wider font-sans flex items-center justify-center gap-2 md:gap-3 whitespace-nowrap w-full md:w-auto">
                     <div className="absolute inset-0 bg-white/40 w-[200%] animate-shimmer-sweep opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <Rocket className="w-6 h-6 md:w-6 md:h-6 shrink-0" />
                     <span className="relative z-10">QUERO SUBIR DE NÍVEL AGORA</span>
                 </button>
            </div>
        </div>

      </div>
    </section>
  );
};
