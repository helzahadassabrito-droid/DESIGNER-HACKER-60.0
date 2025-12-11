
import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Minus, PlayCircle, Package, MonitorPlay, Rocket, ArrowDown } from 'lucide-react';
import { MODULES } from '../constants';

gsap.registerPlugin(ScrollTrigger);

interface SectionSevenProps {
    scrollerRef: React.RefObject<HTMLDivElement | null>;
}

// Detailed Content for the Modules
const MODULE_DETAILS = [
  {
    title: "01. BOAS VINDAS – ⚡ Start Hack",
    lessons: [
      "BOAS VINDAS – o Play Inicial para Subir de Nível"
    ]
  },
  {
    title: "02. DESIGN HACK PRO – 🎓 Formação Completa o conteúdo de +150K",
    lessons: [
      "INTRODUÇÃO AO DESIGN",
      "História da Arte e Design",
      "Metodologias",
      "Sustentabilidade",
      "Teoria e Crítica do Design",
      "ÁREA DE ATUAÇÃO - DESIGN GRÁFICO GERAL",
      "Composição e Linguagem Visual",
      "Produção Gráfica",
      "Embalagem",
      "Identidade Corporativa – Manual de Marca",
      "Design de Superfície",
      "ÁREA DE ATUAÇÃO - DESIGN INDUSTRIAL GERAL",
      "Design de Produto",
      "Design Gráfico Ambiental",
      "Sistemas Funcionais",
      "ÁREA DE ATUAÇÃO - DESIGN UI/UX GERAL",
      "Design UI/UX",
      "OUTRAS DISCIPLINAS FUNDAMENTAIS",
      "ERGONOMIA",
      "MATERIAIS E PROCESSOS",
      "ANTROPOLOGIA",
      "GESTÃO DO PROJETO DE DESIGN",
      "MODELOS DE NEGÓCIO PARA A INDÚSTRIA CRIATIVA",
      "INTELIGÊNCIA COMPETITIVA E PESQUISA DE MERCADO",
      "PLANEJAMENTO DE MÍDIAS SOCIAIS"
    ]
  },
  {
    title: "03. WORKFLOW – 🚀 Como Eu Trabalho + Ferramentas Secretas",
    lessons: [
      "INTRODUÇÃO",
      "PESQUISA E DEFINIÇÃO",
      "DESENHO À MÃO LIVRE – Parte I",
      "DESENHO À MÃO LIVRE – Parte II",
      "SCAN E PREPARAÇÃO PARA VETORIZAÇÃO",
      "VETORIZAÇÃO DIGITAL – Parte I",
      "VETORIZAÇÃO DIGITAL – Parte II",
      "ALTERNATIVAS COM I.A.",
      "RENDERIZAÇÃO DIGITAL – Parte I",
      "RENDERIZAÇÃO DIGITAL – Parte II – Solado",
      "RENDERIZAÇÃO DIGITAL – Parte III – Cabedal",
      "RENDERIZAÇÃO DIGITAL – Parte IV – Cabedal",
      "RENDERIZAÇÃO DIGITAL – Parte V – Finalização do Projeto",
      "COLORWAYS – Parte I",
      "COLORWAYS – Parte II",
      "COLORWAYS – Parte III – Finalização"
    ]
  },
  {
    title: "04. INTELIGÊNCIA ARTIFICIAL – 🤖 O Que Realmente Funciona",
    lessons: [
      "I.A. QUE FUNCIONA – Parte I",
      "I.A. QUE FUNCIONA – Parte II"
    ]
  },
  {
    title: "05. PORTFÓLIO IMBATÍVEL – 🔥 Irresistível e Lucrativo",
    lessons: [
      "PORTFÓLIO IMBATÍVEL – Parte I",
      "PORTFÓLIO IMBATÍVEL – Parte II – Na Prática"
    ]
  },
  {
    title: "06. CORPO E MENTE – 💡 Produtividade Extrema",
    lessons: [
      "NOSSO CORPO É O NOSSO TEMPLO",
      "PRODUTIVIDADE E PERFORMANCE"
    ]
  },
  {
    title: "07. EMPREENDEDORISMO – 🚀 Passo a Passo da Ideia ao Lucro",
    lessons: [
      "EMPREENDEDORISMO – A Virada de Chave",
      "MARCA PESSOAL – Como Fortalecer a Sua e Construir Autoridade",
      "VENDAS e TÉCNICAS DE VENDAS – Parte I - A Clareza que a Elite Tem",
      "VENDAS e TÉCNICAS DE VENDAS – Parte II - Decifrando o Cérebro do Cliente",
      "VENDAS e TÉCNICAS DE VENDAS – Parte III - Perfis de Qualificação Comportamental",
      "VENDAS e TÉCNICAS DE VENDAS – Parte IV - Copywriting + Gatilhos Ocultos",
      "VENDAS e TÉCNICAS DE VENDAS – Parte V - Vieses Cognitivos Aplicados ao Design e a Vender Mais",
      "VENDAS e TÉCNICAS DE VENDAS – Parte VI - Crenças que Estão te Impedindo de Vender Mais",
      "VENDAS e TÉCNICAS DE VENDAS – Parte VII – Negociação",
      "COMO PRECIFICAR – Brinde Calculadora de Precificação",
      "MODELOS DE NEGÓCIOS PARA O DESIGNER EMPREENDER – Parte I",
      "MODELOS DE NEGÓCIOS PARA O DESIGNER EMPREENDER – Parte II",
      "MODELOS DE NEGÓCIOS PARA O DESIGNER EMPREENDER – Parte III",
      "INVESTIMENTOS – O que Ninguém Nunca Me Contou",
      "CONTABILIDADE – No que Ficar de Olho"
    ]
  },
  {
    title: "08. ESPIRITUALIDADE – ✨ A Força Invisível",
    lessons: [
      "O PODER DA FÉ"
    ]
  },
  {
    title: "09. BÔNUS ACELERADOR",
    lessons: [
      "Aula 01: Pack de Assets Premium",
      "Aula 02: Masterclass com Convidados",
      "Aula 03: Gravações de Lives Exclusivas",
      "Aula 04: Templates de Contrato e Proposta"
    ]
  },
  {
    title: "10. NEXT LEVEL",
    lessons: [
      "Aula 01: Plano de Carreira",
      "Aula 02: Mentoria de Encerramento",
      "Aula 03: Certificação Avançada",
      "Aula 04: O Próximo Passo"
    ]
  }
];

export const SectionSeven: React.FC<SectionSevenProps> = ({ scrollerRef }) => {
  // --- CAROUSEL STATE ---
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // --- ACCORDION STATE ---
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Constants
  const TOTAL_SLIDES = MODULES.length;
  
  // Navigation Handlers
  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % TOTAL_SLIDES);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const toggleModule = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Autoplay Logic
  useEffect(() => {
    const startAutoplay = () => {
      autoplayRef.current = setInterval(goNext, 4500);
    };

    const stopAutoplay = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };

    startAutoplay();

    const el = sliderRef.current;
    if (el) {
      el.addEventListener('mouseenter', stopAutoplay);
      el.addEventListener('mouseleave', startAutoplay);
    }

    return () => {
      stopAutoplay();
      if (el) {
        el.removeEventListener('mouseenter', stopAutoplay);
        el.removeEventListener('mouseleave', startAutoplay);
      }
    };
  }, [TOTAL_SLIDES]);

  // Entrance Animation
  useEffect(() => {
    if (!scrollerRef.current) return;

    const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        // Title Animation
        gsap.fromTo(titleRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    scroller: scrollerRef.current,
                    start: "top 70%",
                }
            }
        );

        // Carousel Animation
        gsap.fromTo(sliderRef.current,
            { scale: 0.9, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    scroller: scrollerRef.current,
                    start: "top 60%",
                }
            }
        );

        // Accordion List Entrance
        if (listRef.current) {
            // DESKTOP: Full Stagger
            mm.add("(min-width: 768px)", () => {
                gsap.fromTo(listRef.current.children,
                    { y: 30, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out",
                        scrollTrigger: {
                            trigger: listRef.current,
                            scroller: scrollerRef.current,
                            start: "top 85%"
                        }
                    }
                );
            });

            // MOBILE: Fast Stagger, Less Distance
            mm.add("(max-width: 767px)", () => {
                gsap.fromTo(listRef.current.children,
                    { y: 15, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.5, stagger: 0.02, ease: "power2.out",
                        scrollTrigger: {
                            trigger: listRef.current,
                            scroller: scrollerRef.current,
                            start: "top 85%"
                        }
                    }
                );
            });
        }

        // Stats Entrance
        if (statsRef.current) {
            gsap.fromTo(statsRef.current.children,
            { y: 30, opacity: 0, scale: 0.95 },
            {
                y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)",
                scrollTrigger: {
                trigger: statsRef.current,
                scroller: scrollerRef.current,
                start: "top 90%"
                }
            }
            );
        }

        // CTA Entrance
        if (ctaRef.current) {
            gsap.fromTo(ctaRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power2.out",
                    scrollTrigger: {
                        trigger: ctaRef.current,
                        scroller: scrollerRef.current,
                        start: "top 90%"
                    }
                }
            );
        }

        // Divider Entrance
        if (dividerRef.current) {
             gsap.fromTo(dividerRef.current,
                { y: 30, opacity: 0 },
                {
                   y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power2.out",
                   scrollTrigger: {
                      trigger: dividerRef.current,
                      scroller: scrollerRef.current,
                      start: "top 95%"
                   }
                }
             );
        }

    }, containerRef);
    return () => ctx.revert();
  }, [scrollerRef]);

  // Determine card style based on distance from active index
  const getCardStyle = (index: number) => {
    let dist = (index - activeIndex + TOTAL_SLIDES) % TOTAL_SLIDES;
    if (dist > TOTAL_SLIDES / 2) dist -= TOTAL_SLIDES;
    
    const isVisible = Math.abs(dist) <= 2;
    if (!isVisible) return { display: 'none' };

    let zIndex = 10 - Math.abs(dist);
    let scale = 1 - Math.abs(dist) * 0.15;
    let opacity = 1 - Math.abs(dist) * 0.3;
    let xOffset = dist * 55;
    
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    let filter = 'none';
    if (!isMobile) {
        // Only apply brightness filter on desktop for performance
        let brightness = 1 - Math.abs(dist) * 0.3;
        filter = `brightness(${brightness})`;
    }

    if (isMobile) {
        xOffset = dist * 85; 
        scale = 1 - Math.abs(dist) * 0.2;
    }

    return {
        display: 'block',
        zIndex: zIndex,
        transform: `translateX(${xOffset}%) scale(${scale})`,
        opacity: opacity,
        filter: filter,
        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    };
  };

  return (
    <section 
        ref={containerRef} 
        className="relative w-full pt-16 md:pt-32 pb-4 bg-[#050505] overflow-hidden flex flex-col items-center [content-visibility:auto]"
    >
        {/* --- PART 1: HEADER & CAROUSEL --- */}
        
        {/* Consolidated Title */}
        <div ref={titleRef} className="flex flex-col items-center justify-center text-center mb-10 md:mb-16 opacity-0 relative z-10 px-4">
            <p className="text-[#00CBD9] text-xs md:text-sm tracking-[0.2em] font-bold uppercase mb-4 font-sans">
                // CRONOGRAMA COMPLETO
            </p>

            <h2 className="text-[clamp(28px,5vw,56px)] font-bold text-white font-sans leading-tight flex flex-row items-center justify-center gap-2">
                <span>O que você aprenderá</span>
                <span className="text-[#00CBD9] md:text-white drop-shadow-[0_0_10px_rgba(0,203,217,0.5)] md:drop-shadow-none">?</span>
            </h2>
            
             <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-transparent via-[#00CBD9] to-transparent mt-6 md:shadow-[0_0_20px_#00CBD9] rounded-full"></div>
        </div>

        {/* Carousel Container */}
        {/* UPDATED HEIGHTS FOR MOBILE to 550px */}
        <div ref={sliderRef} className="relative w-full max-w-[1400px] h-[550px] md:h-[600px] flex justify-center items-center opacity-0 perspective-1000 mb-8 md:mb-12">
            
            {/* Cards */}
            {/* UPDATED WIDTH FOR MOBILE to 85vw */}
            <div className="relative w-[85vw] max-w-[400px] md:w-[600px] h-full flex justify-center items-center">
                {MODULES.map((mod, i) => (
                    <div 
                        key={i}
                        className="absolute top-0 left-0 w-full h-full rounded-2xl md:rounded-3xl border border-[#00CBD9]/30 md:shadow-[0_0_30px_rgba(0,203,217,0.15)] overflow-hidden bg-[#050505]"
                        style={getCardStyle(i)}
                    >
                        <img 
                            src={mod.image} 
                            alt={mod.title}
                            className="w-full h-full object-cover" 
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                ))}
            </div>

            {/* Controls (Desktop) */}
            <button 
                onClick={goPrev}
                className="absolute left-2 md:left-10 z-20 w-10 h-10 md:w-14 md:h-14 rounded-full border border-[#00CBD9]/40 bg-[#00CBD9]/10 backdrop-blur-md flex items-center justify-center text-[#00CBD9] hover:bg-[#00CBD9] hover:text-black transition-all hover:shadow-[0_0_20px_rgba(0,203,217,0.5)]"
            >
                <ChevronLeft size={24} />
            </button>
            <button 
                onClick={goNext}
                className="absolute right-2 md:right-10 z-20 w-10 h-10 md:w-14 md:h-14 rounded-full border border-[#00CBD9]/40 bg-[#00CBD9]/10 backdrop-blur-md flex items-center justify-center text-[#00CBD9] hover:bg-[#00CBD9] hover:text-black transition-all hover:shadow-[0_0_20px_rgba(0,203,217,0.5)]"
            >
                <ChevronRight size={24} />
            </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex gap-2 md:gap-3 mb-12 md:mb-20 z-10">
            {MODULES.map((_, i) => (
                <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                        i === activeIndex 
                        ? 'w-8 md:w-12 bg-[#00CBD9] md:shadow-[0_0_8px_rgba(0,203,217,0.5)]' 
                        : 'w-2 md:w-3 bg-white/20 hover:bg-white/40'
                    }`}
                />
            ))}
        </div>

        {/* --- PART 2: ACCORDION LIST --- */}
        <div className="w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
            
            {/* Accordion List - Refined UI for Mobile */}
            <div 
                ref={listRef} 
                className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 items-start"
            >
                {MODULE_DETAILS.map((module, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div 
                            key={index}
                            onClick={() => toggleModule(index)}
                            className={`
                                group cursor-pointer rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 border h-fit
                                ${isOpen 
                                    ? 'bg-[#081216] border-[#00CBD9]/50 md:shadow-[0_0_20px_rgba(0,203,217,0.1)]' 
                                    : 'bg-[#0A0A0A] border-[#00CBD9]/20 hover:border-[#00CBD9]/50 hover:bg-[#081216]'
                                }
                            `}
                        >
                            {/* Card Header */}
                            <div className="p-4 md:p-6 flex items-center justify-between gap-3 md:gap-4">
                                <h3 className={`text-sm md:text-base lg:text-lg font-bold font-sans transition-colors leading-tight ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                    {module.title}
                                </h3>
                                
                                {/* Icon */}
                                <div className={`
                                    w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300
                                    ${isOpen 
                                        ? 'bg-[#00CBD9] text-black rotate-180 md:shadow-[0_0_15px_#00CBD9]' 
                                        : 'bg-[#00CBD9]/10 text-[#00CBD9] group-hover:bg-[#00CBD9] group-hover:text-black'
                                    }
                                `}>
                                    {isOpen ? <Minus size={16} className="md:w-5 md:h-5" /> : <Plus size={16} className="md:w-5 md:h-5" />}
                                </div>
                            </div>

                            {/* Dropdown Content */}
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-4 pb-5 md:px-8 md:pb-8">
                                            <div className="h-[1px] w-full bg-[#00CBD9]/10 mb-3 md:mb-4"></div>
                                            <ul className="flex flex-col gap-2 md:gap-3">
                                                {module.lessons.map((lesson, idx) => (
                                                    <li key={idx} className="flex items-start gap-3 text-gray-400 text-xs md:text-sm font-sans leading-relaxed">
                                                        <PlayCircle size={14} className="text-[#00CBD9] shrink-0 mt-1" />
                                                        <span>{lesson}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            {/* Stats Section - Compact on Mobile */}
            <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8 mt-10 md:mt-16 w-full md:w-auto">
                <StatPill icon={<Package size={18} />} text="+ 10 CURSOS EM 1" />
                <StatPill icon={<MonitorPlay size={18} />} text="+ 70 AULAS" />
                <StatPill icon={<PlayCircle size={18} />} text="+ 100 HORAS" />
            </div>

            {/* CTA Button */}
            <div ref={ctaRef} className="mt-10 md:mt-16 w-full flex justify-center">
                 <button className="group relative overflow-hidden bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] text-black font-extrabold text-sm md:text-lg px-6 py-4 md:px-8 md:py-5 rounded-2xl border-2 border-[#00CBD9]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:scale-105 hover:shadow-[0_0_50px_rgba(0,203,217,0.6)] transition-all duration-300 uppercase tracking-wider font-sans flex items-center justify-center gap-2 md:gap-3 whitespace-nowrap w-full md:w-auto">
                        <div className="absolute inset-0 bg-white/40 w-[200%] animate-shimmer-sweep opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Rocket className="w-6 h-6 md:w-6 md:h-6 shrink-0" />
                        <span className="relative z-10">QUERO SUBIR DE NÍVEL AGORA</span>
                </button>
            </div>

            {/* Separator / Divider */}
            <div ref={dividerRef} className="relative w-full flex items-center justify-center py-6 md:py-8 bg-transparent z-10 opacity-0 mt-12 md:mt-20">
                 <div className="h-[1px] w-[25%] md:w-[15%] bg-gradient-to-r from-transparent to-[#00CBD9]"></div>
                 <div className="mx-4 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#00CBD9] bg-black flex items-center justify-center md:shadow-[0_0_20px_rgba(0,203,217,0.4)]">
                     <ArrowDown size={22} className="text-[#00CBD9]" />
                 </div>
                 <div className="h-[1px] w-[25%] md:w-[15%] bg-gradient-to-l from-transparent to-[#00CBD9]"></div>
            </div>
        </div>

    </section>
  );
};

const StatPill = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="flex items-center gap-3 px-8 py-4 rounded-2xl border border-[#00CBD9] bg-[#05121d] md:shadow-[0_0_15px_rgba(0,203,217,0.15)] min-w-[220px] justify-center hover:md:shadow-[0_0_25px_rgba(0,203,217,0.3)] transition-all duration-300">
        <div className="text-[#00CBD9]">
            {icon}
        </div>
        <span className="text-white font-bold text-lg font-sans tracking-wide">
            {text}
        </span>
    </div>
);
