
import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Rocket, Quote, MessageCircle } from 'lucide-react';
import { ASSETS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

interface SectionSeventeenProps {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}

// --- MOCK DATA FOR TESTIMONIALS ---
const TESTIMONIALS = [
  {
    id: 1,
    name: "Ricardo Silva",
    role: "Senior Designer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    message: "Anderson, cara... acabei de fechar um contrato de 12k usando a técnica de ancoragem do Módulo 7. O cliente nem questionou o preço! O curso já se pagou 10x.",
    time: "10:42"
  },
  {
    id: 2,
    name: "Julia Mattos",
    role: "Freelancer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    message: "Eu travava muito na hora de criar o portfólio. As aulas de renderização mudaram meu jogo. Meu Behance tá bombando e já recebi 3 propostas essa semana.",
    time: "14:15"
  },
  {
    id: 3,
    name: "Lucas Ferraro",
    role: "Estudante",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    message: "Nunca imaginei que em 7 dias eu aprenderia mais que em 2 anos de faculdade. A didática é absurda. Sem enrolação, direto ao ponto. Valeu cada centavo!",
    time: "09:30"
  },
  {
    id: 4,
    name: "Fernanda Costa",
    role: "Art Director",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    message: "O Networking do grupo VIP é surreal. Consegui um parceiro pra um projeto gringo lá dentro. Só o acesso à comunidade já vale o preço do curso inteiro.",
    time: "16:20"
  },
  {
    id: 5,
    name: "Pedro Henrique",
    role: "UI Designer",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    message: "Tava estagnado ganhando 2k/mês. Apliquei o método de vendas e mudei meu posicionamento. Esse mês fechei 8k. Gratidão eterna, mestre!",
    time: "11:05"
  }
];

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
                            className={`h-2 rounded-full transition-all duration-300 ${
                                idx === activeIndex 
                                ? 'w-8 bg-[#00CBD9] shadow-[0_0_10px_#00CBD9]' 
                                : 'w-2 bg-white/20 hover:bg-white/40'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* --- CTA BUTTON --- */}
            <div ref={ctaRef} className="mt-20 md:mt-24 opacity-0 z-20">
                 <button className="group relative overflow-hidden bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] text-black font-extrabold text-base md:text-lg px-8 py-5 rounded-2xl border-2 border-[#00CBD9]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:scale-105 hover:shadow-[0_0_50px_rgba(0,203,217,0.6)] transition-all duration-300 uppercase tracking-wider font-sans flex items-center justify-center gap-3 whitespace-nowrap">
                    <div className="absolute inset-0 bg-white/40 w-[200%] animate-shimmer-sweep opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Rocket className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="relative z-10">QUERO SUBIR DE NÍVEL AGORA</span>
                </button>
            </div>

        </div>
    </section>
  );
};

// --- WHATSAPP CARD COMPONENT ---
interface WhatsAppCardProps {
    data: typeof TESTIMONIALS[0];
    isActive: boolean;
}

const WhatsAppCard: React.FC<WhatsAppCardProps> = ({ data, isActive }) => {
    return (
        <div className={`
            relative w-full aspect-[9/16] bg-[#0B141A] rounded-[32px] overflow-hidden border border-white/10 transition-all duration-500
            ${isActive 
                ? 'shadow-xl md:shadow-[0_20px_60px_rgba(0,0,0,0.7)]' // Reduced shadow on mobile
                : 'shadow-none'
            }
        `}>
            {/* Glass Glare Overlay - MOBILE OPTIMIZATION: Hidden on mobile */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-20 pointer-events-none z-20 rounded-[32px] hidden md:block"></div>

            {/* --- Header (WhatsApp Style) --- */}
            <div className="bg-[#202C33] p-4 flex items-center gap-3 border-b border-[#2A3942] relative z-10 h-[70px]">
                <div className="relative">
                     <img src={data.avatar} alt={data.name} className="w-10 h-10 rounded-full object-cover" decoding="async" loading="lazy" />
                     {/* Green Dot */}
                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#00A884] rounded-full border-2 border-[#202C33]"></div>
                </div>
                <div className="flex-1">
                    <h4 className="text-[#E9EDEF] text-sm font-bold leading-tight">{data.name}</h4>
                    <p className="text-[#8696A0] text-[10px] leading-tight mt-0.5">online</p>
                </div>
                <div className="flex gap-4 text-[#00A884]">
                    <div className="w-4 h-4 rounded-full border border-[#00A884]"></div>
                </div>
            </div>

            {/* --- Chat Body (Background Pattern) --- */}
            <div className="relative flex-1 bg-[#0B141A] p-4 flex flex-col justify-end pb-8 h-[calc(100%-70px)]">
                {/* WhatsApp Doodle Background Pattern */}
                <div className="absolute inset-0 opacity-[0.06]" 
                    style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')" }}
                ></div>
                
                {/* Date Divider */}
                <div className="flex justify-center mb-6 relative z-10">
                    <span className="bg-[#182229] text-[#8696A0] text-[10px] px-3 py-1 rounded-lg shadow-sm uppercase font-bold tracking-widest">
                        HOJE
                    </span>
                </div>

                {/* Message 1 (My Reply - Context) */}
                <div className="flex justify-end mb-4 relative z-10">
                    <div className="bg-[#005C4B] rounded-lg rounded-tr-none p-3 max-w-[85%] shadow-md relative group">
                        <div className="absolute top-0 right-[-8px] w-0 h-0 border-t-[10px] border-t-[#005C4B] border-r-[10px] border-r-transparent"></div>
                        <p className="text-[#E9EDEF] text-xs md:text-sm leading-relaxed">
                            E aí {data.name.split(' ')[0]}! Como estão os resultados depois daquela aula? 🚀
                        </p>
                        <div className="flex justify-end items-center gap-1 mt-1">
                            <span className="text-[#8696A0] text-[9px] opacity-80">09:15</span>
                            <span className="text-[#53bdeb]"><CheckCheckIcon /></span>
                        </div>
                    </div>
                </div>

                {/* Message 2 (Testimonial) */}
                <div className="flex justify-start relative z-10">
                    <div className="bg-[#202C33] rounded-lg rounded-tl-none p-3 max-w-[90%] shadow-md relative">
                         <div className="absolute top-0 left-[-8px] w-0 h-0 border-t-[10px] border-t-[#202C33] border-l-[10px] border-l-transparent transform scale-x-[-1]"></div>
                         
                         {/* Name highlight */}
                         <p className="text-[#E55066] text-[10px] font-bold mb-1 opacity-80">~ {data.name}</p>
                         
                         <p className="text-[#E9EDEF] text-xs md:text-sm leading-relaxed">
                            {data.message}
                         </p>
                         <div className="flex justify-end items-center mt-1">
                            <span className="text-[#8696A0] text-[9px] opacity-80">{data.time}</span>
                         </div>
                    </div>
                </div>

                {/* Simulated Input Area (Bottom) */}
                <div className="absolute bottom-4 left-4 right-4 h-10 bg-[#202C33] rounded-full flex items-center px-4 gap-3 z-10 border border-white/5 opacity-80">
                     <div className="w-5 h-5 rounded-full bg-[#8696A0] opacity-20"></div>
                     <div className="flex-1 h-2 bg-[#8696A0] opacity-10 rounded-full"></div>
                     <div className="w-5 h-5 rounded-full bg-[#00A884] opacity-80"></div>
                </div>
            </div>

            {/* Neon Border Glow (Only active card) - MOBILE OPTIMIZATION: Hidden inner shadow on mobile */}
            {isActive && (
                <div className="absolute inset-0 rounded-[32px] border border-[#00CBD9]/30 pointer-events-none hidden md:block shadow-[inset_0_0_20px_rgba(0,203,217,0.1)]"></div>
            )}
            {/* Mobile simplified active border */}
            {isActive && (
                <div className="absolute inset-0 rounded-[32px] border border-[#00CBD9]/30 pointer-events-none md:hidden"></div>
            )}
        </div>
    );
};

// Mini SVG for Double Check
const CheckCheckIcon = () => (
    <svg viewBox="0 0 16 11" width="12" height="12" className="">
        <path d="M11.5 0L5.5 8.5L2.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15 1L9 9.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);
