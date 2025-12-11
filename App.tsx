
import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { SectionOne } from './components/SectionOne';
import { SectionTwo } from './components/SectionTwo';
import { HypnoticBackground } from './components/ui/HypnoticBackground';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sec1Ref = useRef<HTMLDivElement>(null);
  const sec2Ref = useRef<HTMLDivElement>(null);
  const [isSectionTwoActive, setIsSectionTwoActive] = useState(false);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // --- DESKTOP OPTIMIZATION (High Fidelity) ---
    mm.add("(min-width: 768px)", () => {
        // Initial Set for Section 2
        gsap.set(sec2Ref.current, { 
            scale: 0.8, 
            autoAlpha: 0, 
            filter: "blur(4px)"
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top top",
                end: "+=100%", 
                scrub: 0.5, 
                pin: true,
                onLeave: () => setIsSectionTwoActive(true),
                onEnterBack: () => setIsSectionTwoActive(false)
            }
        });

        // Heavy Blur Transition allowed on Desktop
        tl
        .to(sec1Ref.current, {
            scale: 1.3,
            autoAlpha: 0,
            filter: "blur(12px)", // Expensive GPU operation
            duration: 1,
            ease: "linear"
        }, 0)
        .to(sec2Ref.current, {
            scale: 1,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "linear"
        }, 0);
    });

    // --- MOBILE OPTIMIZATION (High Performance) ---
    mm.add("(max-width: 767px)", () => {
        // Initial Set for Section 2 (NO BLUR)
        gsap.set(sec2Ref.current, { 
            scale: 0.9, 
            autoAlpha: 0, 
            // filter: "blur(0px)" -> Removed to save GPU
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top top",
                end: "+=100%", 
                scrub: 0.2, // Faster response
                pin: true,
                onLeave: () => setIsSectionTwoActive(true),
                onEnterBack: () => setIsSectionTwoActive(false)
            }
        });

        // Simplified Transition (Opacity & Scale only)
        tl
        .to(sec1Ref.current, {
            scale: 1.1, // Reduced scale to prevent pixelation/layout shift
            autoAlpha: 0,
            // No filter blur
            duration: 1,
            ease: "linear"
        }, 0)
        .to(sec2Ref.current, {
            scale: 1,
            autoAlpha: 1,
            duration: 1,
            ease: "linear"
        }, 0);
    });

  }, { scope: wrapperRef });

  return (
    <div className="relative w-full bg-dark-bg min-h-screen">
      
      {/* 
          GLOBAL BACKGROUND: LIQUID AURORA 
          Fixed position, z-0 to sit behind everything.
      */}
      <HypnoticBackground />

      {/* 
          UPDATED: h-[100dvh] 
          Using dynamic viewport height prevents jumps when mobile address bars retract/expand.
      */}
      <div ref={wrapperRef} className="relative w-full h-[100dvh] overflow-hidden z-10">
        
        {/* Section 1 Wrapper */}
        <div ref={sec1Ref} className="absolute inset-0 w-full h-full z-20 origin-center will-change-transform">
            <SectionOne />
        </div>

        {/* Section 2 Wrapper */}
        <div ref={sec2Ref} className="absolute inset-0 w-full h-full z-30 origin-center will-change-transform">
            {/* 
               Section 2 is passed the isActive state. 
               Its internal animations (cards staggering) will only fire 
               once the main zoom transition is complete.
            */}
            <SectionTwo ref={null} isActive={isSectionTwoActive} />
        </div>

      </div>

    </div>
  );
}

export default App;
