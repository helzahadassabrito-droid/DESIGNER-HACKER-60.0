
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Check, AlertTriangle, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SectionComparisonProps {
    scrollerRef: React.RefObject<HTMLDivElement | null>;
}

export const SectionComparison: React.FC<SectionComparisonProps> = ({ scrollerRef }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!scrollerRef.current) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // 1. Header Animation (Simple Fade - Common)
            gsap.fromTo(headerRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        scroller: scrollerRef.current,
                        start: "top 75%"
                    }
                }
            );

            // 2. Card Entrance (Split Logic)

            // DESKTOP: Scale + Back Ease (High Impact)
            mm.add("(min-width: 768px)", () => {
                gsap.fromTo(cardRef.current,
                    { scale: 0.95, opacity: 0, y: 30 },
                    {
                        scale: 1, opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "back.out(1.2)",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            scroller: scrollerRef.current,
                            start: "top 65%"
                        }
                    }
                );
            });

            // MOBILE: Slide Up Only (High Performance)
            mm.add("(max-width: 767px)", () => {
                gsap.fromTo(cardRef.current,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: "power2.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            scroller: scrollerRef.current,
                            start: "top 75%"
                        }
                    }
                );
            });

        }, containerRef);

        return () => ctx.revert();
    }, [scrollerRef]);

    const items = [
        {
            title: "FACULDADE",
            cost: "R$2.300 por mês / 4 anos",
            desc: "Demora para ter Resultados",
            type: "negative"
        },
        {
            title: "CURSINHOS GENÉRICOS",
            cost: "R$97,00 aqui, R$47,00 ali...",
            desc: "E sempre tem o mesmo conteúdo genérico.. acaba gastando muito achando que gasta pouco e continua sem sair do lugar",
            type: "negative"
        },
        {
            title: "VÍDEOS NO YOUTUBE",
            cost: "Custo Zero (mas custa seu Tempo)",
            desc: "Custo Zero. O problema é que você vira um colecionador de informações sem direcionamento do que realmente funciona na vida real.",
            type: "negative"
        },
        {
            title: "DESIGN HACK",
            cost: "Investimento Único e Acessível",
            desc: "Método real com resultados comprovados que eu uso para criar e entregar o que o Mercado pede e com isso ganhar muito mais dinheiro.",
            type: "positive"
        }
    ];

    return (
        <section
            ref={containerRef}
            className="relative w-full py-12 md:py-28 bg-[#0A0A0A] overflow-hidden flex flex-col items-center border-t border-white/5"
        >
            {/* Background Gradients - MOBILE OPTIMIZATION: Hidden to reduce overdraw/fill-rate */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FC2C54]/5 blur-[120px] pointer-events-none hidden md:block"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00CBD9]/5 blur-[120px] pointer-events-none hidden md:block"></div>

            <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center">

                {/* Header */}
                <div ref={headerRef} className="text-center mb-10 md:mb-14">
                    <h2 className="text-2xl md:text-4xl font-sans font-bold text-white mb-4 uppercase tracking-wide">
                        VAMOS FAZER UM <br />
                        <span className="bg-gradient-to-r from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent">COMPARATIVO HONESTO</span>
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Você pode aprender Design de diversas formas, mas apenas o <strong className="text-white">DESIGN HACK</strong> não te faz perder anos estudando, não te faz perder dinheiro e nem motivação.
                    </p>
                </div>

                {/* The Comparison Card */}
                <div ref={cardRef} className="w-full bg-[#0E0E0E] rounded-3xl border border-white/10 overflow-hidden shadow-lg md:shadow-2xl relative group">

                    {/* Decorative Top Bar */}
                    <div className="h-1 w-full bg-gradient-to-r from-[#FC2C54] via-[#0E0E0E] to-[#00FF94]"></div>

                    <div className="relative py-4 md:py-6">

                        {/* --- THE VERTICAL TIMELINE LINE --- */}
                        {/* Positioned absolutely to connect icons. The left position is calculated based on the icon container width */}
                        <div className="absolute top-[3rem] bottom-[4rem] left-[2.75rem] md:left-[4rem] w-[2px] md:w-[3px] bg-gradient-to-b from-[#FC2C54] via-[#FC2C54]/50 to-[#00FF94] z-0"></div>

                        {items.map((item, index) => (
                            <div
                                key={index}
                                className={`
                                relative p-4 md:p-8 border-b border-white/5 last:border-0 transition-all duration-300 z-10
                                ${item.type === 'positive' ? 'bg-[#00FF94]/5 md:bg-gradient-to-r md:from-[#00FF94]/10 md:to-transparent' : 'hover:bg-white/[0.02]'}
                            `}
                            >
                                <div className="flex flex-row gap-4 md:gap-8 items-start md:items-center">

                                    {/* Icon Container - Fixed Width for Perfect Alignment */}
                                    <div className="w-12 md:w-16 shrink-0 flex justify-center pt-1 md:pt-0 relative">
                                        {item.type === 'negative' ? (
                                            // Mobile Optimization: Removed heavy shadow on mobile icons
                                            <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0E0E0E] border-2 border-[#FC2C54] flex items-center justify-center text-[#FC2C54] md:shadow-[0_0_15px_rgba(252,44,84,0.3)]">
                                                <X size={20} strokeWidth={3} />
                                            </div>
                                        ) : (
                                            // Mobile Optimization: Removed heavy shadow/scale on mobile
                                            <div className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#00FF94] border-4 border-[#0E0E0E] flex items-center justify-center text-black md:shadow-[0_0_25px_rgba(0,255,148,0.6)] md:scale-110">
                                                <Check size={26} strokeWidth={4} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex-1 pb-2">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-4 mb-2">
                                            <h3 className={`text-base md:text-xl font-bold font-sans tracking-wider ${item.type === 'positive' ? 'text-white' : 'text-gray-500'}`}>
                                                {item.title}
                                            </h3>
                                            {/* Cost Tag */}
                                            <span className={`text-xs md:text-sm font-bold uppercase tracking-widest ${item.type === 'positive' ? 'text-[#00FF94]' : 'text-[#FC2C54]'}`}>
                                                {item.cost}
                                            </span>
                                        </div>
                                        <p className={`text-sm md:text-base leading-relaxed ${item.type === 'positive' ? 'text-white font-medium' : 'text-gray-400'}`}>
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Active Glow for Positive Item (Left Bar) - Mobile Optimization: Removed shadow */}
                                {item.type === 'positive' && (
                                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#00FF94] md:shadow-[0_0_15px_#00FF94]"></div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Footer Bar (Pink/Red as requested) */}
                    <div className="bg-[#FC2C54] p-4 md:p-6 flex items-center justify-center text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] animate-shimmer-sweep w-[200%]"></div>

                        <h3 className="relative z-10 text-white font-black text-lg md:text-2xl uppercase tracking-[0.15em] drop-shadow-md flex flex-col md:flex-row items-center gap-2 md:gap-4 leading-tight">
                            <span className="hidden md:inline"><AlertTriangle size={24} fill="white" className="text-[#FC2C54]" /></span>
                            A ESCOLHA INTELIGENTE ESTÁ CLARA
                            <span className="md:hidden"><ArrowDown size={20} className="animate-bounce mt-1" /></span>
                            <span className="hidden md:inline"><AlertTriangle size={24} fill="white" className="text-[#FC2C54]" /></span>
                        </h3>
                    </div>

                </div>

            </div>
        </section>
    );
};
