
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronsDown } from 'lucide-react';
import { ASSETS } from '../constants';

export const SectionOne: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topTextRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // --- MOBILE: SKIP ENTRANCE ANIMATIONS ---
      // Elements appear instantly for faster LCP (Largest Contentful Paint)
      mm.add("(max-width: 767px)", () => {
        // Set all elements to visible immediately
        gsap.set([topTextRef.current, logoRef.current, headlineRef.current, nameRef.current, scrollIndicatorRef.current], {
          opacity: 1,
          y: 0,
          scale: 1
        });

        // Keep only the pulse animation (cheap translateY)
        gsap.to(scrollIndicatorRef.current, {
          y: 5,
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "power1.inOut"
        });
      });

      // --- DESKTOP: FULL ENTRANCE ANIMATIONS ---
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Top Text
        tl.fromTo(topTextRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.8 }
        );

        // Logo with heavy effects (Desktop only)
        tl.fromTo(logoRef.current,
          {
            clipPath: 'inset(50% 0 50% 0)',
            opacity: 0,
            scale: 1.4,
            filter: 'hue-rotate(90deg)'
          },
          {
            clipPath: 'inset(0% 0 0% 0)',
            opacity: 1,
            scale: 1,
            filter: 'hue-rotate(0deg)',
            duration: 1.2,
            ease: "rough({ template: power3.out, strength: 1, points: 20, taper: 'none', randomize: true, clamp: false })"
          },
          "-=0.4"
        );

        // Remaining sequence
        tl.fromTo(headlineRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.1 },
          "-=0.8"
        )
          .fromTo(nameRef.current,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.8 },
            "-=0.4"
          )
          .fromTo(scrollIndicatorRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.2"
          );

        // Pulsing Scroll Indicator
        gsap.to(scrollIndicatorRef.current, {
          y: 5,
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "power1.inOut"
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="section-one absolute inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden z-10 bg-[#0A0A0A]">

      {/* Background Stack */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* 1. Main Image */}
        <img
          src={ASSETS.MENTOR_IMAGE}
          alt="Background"
          className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
          loading="eager" // Hero image should load fast
          decoding="async"
          width="100%"
          height="100%"
        />

        {/* 2. Blue Fog Gradient Overlay - SIMPLIFIED FOR MOBILE */}
        {/* Using md:mix-blend-screen to avoid heavy blending on mobile */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,203,217,0.1)_0%,_rgba(0,203,217,0.02)_40%,_rgba(5,5,5,0.8)_90%)] md:mix-blend-screen pointer-events-none" />

        {/* 3. Subtle bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />

        {/* 4. Top Fade */}
        <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-[#050505] to-transparent opacity-90" />
      </div>

      <div className="absolute top-[8%] md:top-[12%] left-0 w-full z-20 flex justify-center px-4">
        <p ref={topTextRef} className="text-gray-200 text-sm md:text-lg tracking-[0.2em] uppercase font-sans opacity-0 font-medium drop-shadow-md text-center">
          Aprenda em 07 dias
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto w-full mt-24 md:mt-0">

        {/* Logo Container - Will change prop for mobile to avoid layout shift */}
        <div className="relative w-full max-w-[340px] md:max-w-[600px] lg:max-w-[800px] mt-20 md:mt-12 mb-2 md:mb-4 will-change-transform">
          <img
            ref={logoRef}
            src={ASSETS.HEADLINE_IMAGE}
            alt="Design Hack"
            className="w-full h-auto md:drop-shadow-[0_0_35px_rgba(0,203,217,0.3)]" // Removed drop-shadow on mobile
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="flex flex-col items-center gap-4 md:gap-6">
          <h1
            ref={headlineRef}
            className="animate-glitch-intro text-xs md:text-base lg:text-lg font-bold tracking-[0.15em] uppercase"
          >
            <span className="text-[#FC2C54] md:drop-shadow-[0_0_8px_rgba(252,44,84,0.6)]">O CONTEÚDO PROIBIDO</span>
            <span className="mx-1.5 md:mx-2"> </span>
            <span className="block md:inline mt-1 md:mt-0 text-[#00CBD9] md:drop-shadow-[0_0_8px_rgba(0,203,217,0.6)]">QUE NINGUÉM ME DEU</span>
          </h1>

          <div ref={nameRef} className="mt-8 md:mt-10">
            <span className="font-michroma text-xs md:text-sm lg:text-base tracking-[0.4em] text-white/80 uppercase drop-shadow-lg">
              ANDERSON RAMON
            </span>
          </div>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 md:bottom-12 left-0 w-full z-10 flex flex-col items-center justify-center gap-3 px-4"
      >
        <span className="text-gray-300 text-[10px] md:text-xs uppercase tracking-[0.25em] font-sans opacity-80 whitespace-nowrap text-center">
          Navegue e Descubra
        </span>

        <div className="p-[2px] rounded-full bg-gradient-to-b from-[#FC2C54] to-[#00CBD9] shadow-[0_0_20px_rgba(0,203,217,0.3)]">
          <div className="w-8 h-14 md:w-10 md:h-16 bg-[#050505] rounded-full flex items-center justify-center backdrop-blur-sm relative overflow-hidden">
            <ChevronsDown
              size={24}
              className="animate-pulse relative z-10"
              stroke="url(#gradientArrow)"
            />
          </div>
        </div>

        <svg width="0" height="0" className="absolute">
          <linearGradient id="gradientArrow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FC2C54" />
            <stop offset="100%" stopColor="#00CBD9" />
          </linearGradient>
        </svg>
      </div>
    </div>
  );
};
