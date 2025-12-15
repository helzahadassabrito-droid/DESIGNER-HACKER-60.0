
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket } from 'lucide-react';
import { ASSETS } from '../constants';
import { scrollToPlans } from '../utils/scroll';

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
        <div ref={leftColRef} className="relative w-full h-[260px] md:h-[500px] flex items-center justify-center md:perspective-1000 mb-0 md:mb-0">

          {/* Back Certificate (Shadow/Ghost) - Hidden on mobile for cleaner look */}
          <div
            ref={backCertRef}
            className="hidden md:block absolute w-[90%] max-w-[550px] aspect-[1.414/1] bg-[#1a1a1a] rounded-sm border border-white/5 shadow-2xl opacity-40 blur-[2px] -translate-x-8 -translate-y-4 -rotate-2 z-0"
          >
          </div>

          {/* FRONT CERTIFICATE - IMAGE */}
          <div
            ref={frontCertRef}
            className="absolute w-[100%] md:w-[90%] max-w-[600px] aspect-[1.414/1] rounded-sm shadow-2xl md:shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 overflow-hidden group"
          >
            <img
              src="/Certificado.avif"
              alt="Certificado Design Hack"
              className="w-full h-full object-contain"
              loading="lazy"
              decoding="async"
            />

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
