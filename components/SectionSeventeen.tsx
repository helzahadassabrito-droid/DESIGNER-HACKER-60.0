
import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Rocket, Quote, MessageCircle } from 'lucide-react';
import { ASSETS } from '../constants';
import { scrollToPlans } from '../utils/scroll';

gsap.registerPlugin(ScrollTrigger);

interface SectionSeventeenProps {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}

// --- TESTIMONIAL DATA USING FEEDBACK IMAGES ---
const TESTIMONIALS = ASSETS.FEEDBACK_IMAGES.map((image, index) => ({
  id: index + 1,
  image: image,
}));


export const SectionSeventeen: React.FC<SectionSeventeenProps> = ({ scrollerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // --- CAROUSEL LOGIC ---
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Autoplay
  useEffect(() => {
    if (isHovering) return;
    autoPlayRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovering]);

  // --- ENTRANCE ANIMATIONS (GSAP) ---
  useEffect(() => {
    if (!scrollerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Header Fade In
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
            start: "top 70%"
          }
        }
      );

      // Carousel Pop In - SPLIT LOGIC
      // DESKTOP: Elastic Pop
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(carouselRef.current,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            delay: 0.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: containerRef.current,
              scroller: scrollerRef.current,
              start: "top 60%"
            }
          }
        );
      });

      // MOBILE: Simple Fade (No Scale)
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(carouselRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              scroller: scrollerRef.current,
              start: "top 65%"
            }
          }
        );
      });

      // CTA Fade Up
      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.4,
          ease: "power2.out",
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

  // Helper to determine position relative to active index
  const getPosition = (index: number) => {
    const total = TESTIMONIALS.length;
    // Calculate distance handling wrap-around
    let diff = (index - activeIndex + total) % total;
    if (diff > total / 2) diff -= total;
    return diff; // 0 = center, -1 = left, 1 = right, etc.
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section
      ref={containerRef}
      className="relative w-full py-10 md:py-32 bg-[#0A0A0A] overflow-hidden flex flex-col items-center border-t border-white/5 [content-visibility:auto]"
    >
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(0,203,217,0.05)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 flex flex-col items-center">

        {/* --- HEADER --- */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <h3 className="text-sm md:text-base font-bold text-white/50 tracking-[0.3em] uppercase mb-4 font-sans">
            FEEDBACK
          </h3>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans font-bold text-white mb-6">
            Quem me Conhece <br />
            <span className="bg-gradient-to-r from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent">RECOMENDA</span>
          </h2>

          {/* 5 Stars */}
          <div className="flex gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} fill="#FFD700" stroke="none" size={24} className="drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]" />
            ))}
          </div>
          <p className="text-yellow-500/80 text-xs tracking-widest uppercase font-bold">
            Satisfação Garantida
          </p>
        </div>

        {/* --- CAROUSEL --- */}
        <div
          ref={carouselRef}
          className="relative w-full max-w-6xl h-[500px] md:h-[600px] flex items-center justify-center perspective-1000"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Cards Container */}
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence initial={false}>
              {TESTIMONIALS.map((testimonial, index) => {
                const position = getPosition(index);

                const isCenter = position === 0;
                // Filter out cards that are not current, prev, or next to avoid clutter
                if (!isCenter && Math.abs(position) > 1 && Math.abs(position) < TESTIMONIALS.length - 1) {
                  return null;
                }

                return (
                  <motion.div
                    key={testimonial.id}
                    className={`absolute top-1/2 left-1/2 w-[300px] md:w-[360px] cursor-grab active:cursor-grabbing origin-center`}
                    initial={{
                      x: position > 0 ? '100%' : '-100%',
                      opacity: 0,
                      scale: 0.8,
                      zIndex: 0
                    }}
                    animate={{
                      // MOBILE OPTIMIZATION: Reduced spacing distance for tighter mobile view
                      x: `calc(-50% + ${position * (isMobile ? 105 : 110)}%)`,
                      y: '-50%',
                      scale: isCenter ? 1 : 0.85,
                      opacity: isCenter ? 1 : 0.4,
                      zIndex: isCenter ? 20 : 10,
                      // MOBILE OPTIMIZATION: Disable expensive filters and 3D rotations
                      filter: isMobile ? 'none' : (isCenter ? 'blur(0px)' : 'blur(4px)'),
                      rotateY: isMobile ? 0 : (isCenter ? 0 : (position < 0 ? 15 : -15))
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    onClick={() => {
                      if (position !== 0) setActiveIndex(index);
                    }}
                  >
                    <WhatsAppCard data={testimonial} isActive={isCenter} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows (Desktop) */}
          <button
            onClick={prevSlide}
            className="absolute left-0 md:left-4 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 md:backdrop-blur-md flex items-center justify-center text-white hover:bg-[#00CBD9] hover:text-black hover:border-[#00CBD9] transition-all duration-300 group shadow-lg"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 md:right-4 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 md:backdrop-blur-md flex items-center justify-center text-white hover:bg-[#00CBD9] hover:text-black hover:border-[#00CBD9] transition-all duration-300 group shadow-lg"
          >
            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Pagination Dots */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex
                  ? 'w-8 bg-[#00CBD9] shadow-[0_0_10px_#00CBD9]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* --- CTA BUTTON --- */}
        <div ref={ctaRef} className="mt-20 md:mt-24 opacity-0 z-20">
          <button onClick={scrollToPlans} className="group relative overflow-hidden bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] text-black font-extrabold text-base md:text-lg px-8 py-5 rounded-2xl border-2 border-[#00CBD9]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:scale-105 hover:shadow-[0_0_50px_rgba(0,203,217,0.6)] transition-all duration-300 uppercase tracking-wider font-sans flex items-center justify-center gap-3 whitespace-nowrap">
            <div className="absolute inset-0 bg-white/40 w-[200%] animate-shimmer-sweep opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Rocket className="w-5 h-5 md:w-6 md:h-6" />
            <span className="relative z-10">QUERO SUBIR DE NÍVEL AGORA</span>
          </button>
        </div>

      </div>
    </section>
  );
};

// --- FEEDBACK IMAGE CARD COMPONENT ---
interface FeedbackImageCardProps {
  data: { id: number; image: string };
  isActive: boolean;
}

const WhatsAppCard: React.FC<FeedbackImageCardProps> = ({ data, isActive }) => {
  return (
    <div className={`
            relative w-full aspect-[9/16] rounded-[32px] overflow-hidden border transition-all duration-500
            ${isActive
        ? 'border-[#00CBD9]/50 shadow-xl md:shadow-[0_20px_60px_rgba(0,0,0,0.7)]'
        : 'border-white/10 shadow-none'
      }
        `}>
      {/* Feedback Image */}
      <img
        src={data.image}
        alt={`Feedback ${data.id}`}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>

      {/* Neon Border Glow (Only active card) */}
      {isActive && (
        <div className="absolute inset-0 rounded-[32px] border-2 border-[#00CBD9]/50 pointer-events-none hidden md:block shadow-[inset_0_0_20px_rgba(0,203,217,0.1)]"></div>
      )}
      {/* Mobile simplified active border */}
      {isActive && (
        <div className="absolute inset-0 rounded-[32px] border-2 border-[#00CBD9]/50 pointer-events-none md:hidden"></div>
      )}
    </div>
  );
};
