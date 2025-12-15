
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Star, Zap, Timer, Award, ShieldCheck } from 'lucide-react';
import { ASSETS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

interface SectionFifteenProps {
    scrollerRef: React.RefObject<HTMLDivElement | null>;
}

export const SectionFifteen: React.FC<SectionFifteenProps> = ({ scrollerRef }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerWrapperRef = useRef<HTMLDivElement>(null);
    const decisionPathRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);
    // Refs for Plan images scroll zoom
    const img2019Ref = useRef<HTMLImageElement>(null);
    const img2025Ref = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!scrollerRef.current) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // --- 1. HEADER ENTRANCE ---
            gsap.fromTo(headerWrapperRef.current,
                { x: -50, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        scroller: scrollerRef.current,
                        start: "top 70%",
                    }
                }
            );

            // --- 2. DECISION PATH ANIMATION (Split Logic) ---
            gsap.fromTo(decisionPathRef.current,
                { x: 50, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        scroller: scrollerRef.current,
                        start: "top 70%",
                    }
                }
            );

            // GPU Memory Management helpers for Plan images
            const set2019WillChange = () => { if (img2019Ref.current) img2019Ref.current.style.willChange = 'transform'; };
            const remove2019WillChange = () => { if (img2019Ref.current) img2019Ref.current.style.willChange = 'auto'; };
            const set2025WillChange = () => { if (img2025Ref.current) img2025Ref.current.style.willChange = 'transform'; };
            const remove2025WillChange = () => { if (img2025Ref.current) img2025Ref.current.style.willChange = 'auto'; };

            // DESKTOP: Full Fidelity (Blur, Shadow, Grayscale)
            mm.add("(min-width: 768px)", () => {
                const tlDecision = gsap.timeline({
                    scrollTrigger: {
                        trigger: decisionPathRef.current,
                        scroller: scrollerRef.current,
                        start: "top 60%",
                        end: "bottom 80%",
                        scrub: 1.5,
                    }
                });

                // Step 1: Reveal 2019 with scroll zoom
                tlDecision.fromTo(".img-2019", { filter: "grayscale(100%) opacity(0.5) blur(5px)", scale: 0.9 }, { filter: "grayscale(100%) opacity(1) blur(0px)", scale: 1.15, duration: 1 });

                // 2019 Image VRAM Management
                gsap.fromTo(img2019Ref.current,
                    { scale: 1 },
                    {
                        scale: 1.15,
                        ease: "none",
                        force3D: true,
                        scrollTrigger: {
                            trigger: img2019Ref.current,
                            scroller: scrollerRef.current,
                            start: "top 80%",
                            end: "bottom 20%",
                            scrub: 1,
                            onEnter: set2019WillChange,
                            onEnterBack: set2019WillChange,
                            onLeave: remove2019WillChange,
                            onLeaveBack: remove2019WillChange
                        }
                    }
                );

                // Step 2: Red Dots & "Uma Decisão" Text
                tlDecision.fromTo(".text-decision-pill", { opacity: 0, scale: 0.8, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.5 });
                tlDecision.fromTo(".dot-red",
                    { opacity: 0.1, scale: 0.5, boxShadow: "0 0 0 rgba(252,44,84,0)" },
                    { opacity: 1, scale: 1, boxShadow: "0 0 15px rgba(252,44,84,0.6)", stagger: 0.2, duration: 1 },
                    "<"
                );

                // Step 3: The Turn
                tlDecision.fromTo(".decision-arrow",
                    { strokeDashoffset: 100, opacity: 0 },
                    { strokeDashoffset: 0, opacity: 1, duration: 0.8 }
                );
                tlDecision.fromTo(".decision-text-end", { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.5 }, "<");

                // Step 4: Green Dots
                tlDecision.fromTo(".dot-green",
                    { opacity: 0.1, scale: 0.5, boxShadow: "0 0 0 rgba(0,255,148,0)" },
                    { opacity: 1, scale: 1, boxShadow: "0 0 15px rgba(0,255,148,0.6)", backgroundColor: "#00FF94", stagger: 0.2, duration: 1 }
                );

                // Step 5: Reveal 2025 with scroll zoom
                tlDecision.fromTo(".img-2025",
                    { filter: "grayscale(100%) opacity(0.5)", scale: 0.9 },
                    { filter: "grayscale(0%) opacity(1)", scale: 1.15, duration: 1 }
                );

                // 2025 Image VRAM Management
                gsap.fromTo(img2025Ref.current,
                    { scale: 1 },
                    {
                        scale: 1.15,
                        ease: "none",
                        force3D: true,
                        scrollTrigger: {
                            trigger: img2025Ref.current,
                            scroller: scrollerRef.current,
                            start: "top 80%",
                            end: "bottom 20%",
                            scrub: 1,
                            onEnter: set2025WillChange,
                            onEnterBack: set2025WillChange,
                            onLeave: remove2025WillChange,
                            onLeaveBack: remove2025WillChange
                        }
                    }
                );

                // Step 6: Reveal Text Block below 2025
                tlDecision.fromTo(".text-block-final",
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8 }
                );
            });

            // MOBILE: High Performance (No Blur, No BoxShadow Tweening)
            mm.add("(max-width: 767px)", () => {
                const tlDecision = gsap.timeline({
                    scrollTrigger: {
                        trigger: decisionPathRef.current,
                        scroller: scrollerRef.current,
                        start: "top 60%",
                        end: "bottom 80%",
                        scrub: 1, // Faster scrub
                    }
                });

                // Step 1: Reveal 2019 with scroll zoom (Opacity/Scale Only)
                tlDecision.fromTo(".img-2019",
                    { opacity: 0.5, scale: 0.95 },
                    { opacity: 1, scale: 1.1, duration: 1 }
                );

                // 2019 Image VRAM Management (Mobile)
                gsap.fromTo(img2019Ref.current,
                    { scale: 1 },
                    {
                        scale: 1.1, // Reduced for mobile
                        ease: "none",
                        force3D: true,
                        scrollTrigger: {
                            trigger: img2019Ref.current,
                            scroller: scrollerRef.current, // CRITICAL: Must specify custom scroller
                            start: "top 80%",
                            end: "bottom 20%",
                            scrub: 1,
                            onEnter: set2019WillChange,
                            onEnterBack: set2019WillChange,
                            onLeave: remove2019WillChange,
                            onLeaveBack: remove2019WillChange
                        }
                    }
                );

                // Step 2: Red Dots
                tlDecision.fromTo(".text-decision-pill", { opacity: 0, scale: 0.8, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.5 });
                tlDecision.fromTo(".dot-red",
                    { opacity: 0.2, scale: 0.5 },
                    // Removed boxShadow transition
                    { opacity: 1, scale: 1, stagger: 0.2, duration: 1 },
                    "<"
                );

                // Step 3: Arrow
                tlDecision.fromTo(".decision-arrow",
                    { strokeDashoffset: 100, opacity: 0 },
                    { strokeDashoffset: 0, opacity: 1, duration: 0.8 }
                );
                tlDecision.fromTo(".decision-text-end", { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.5 }, "<");

                // Step 4: Green Dots
                tlDecision.fromTo(".dot-green",
                    { opacity: 0.2, scale: 0.5 },
                    // Removed boxShadow transition
                    { opacity: 1, scale: 1, backgroundColor: "#00FF94", stagger: 0.2, duration: 1 }
                );

                // Step 5: Reveal 2025 with scroll zoom
                tlDecision.fromTo(".img-2025",
                    { opacity: 0.5, scale: 0.9 },
                    { opacity: 1, scale: 1.1, duration: 1 }
                );

                // 2025 Image VRAM Management (Mobile)
                gsap.fromTo(img2025Ref.current,
                    { scale: 1 },
                    {
                        scale: 1.1, // Reduced for mobile
                        ease: "none",
                        force3D: true,
                        scrollTrigger: {
                            trigger: img2025Ref.current,
                            scroller: scrollerRef.current, // CRITICAL: Must specify custom scroller
                            start: "top 80%",
                            end: "bottom 20%",
                            scrub: 1,
                            onEnter: set2025WillChange,
                            onEnterBack: set2025WillChange,
                            onLeave: remove2025WillChange,
                            onLeaveBack: remove2025WillChange
                        }
                    }
                );

                // Step 6: Text Block
                tlDecision.fromTo(".text-block-final",
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8 }
                );
            });

            // --- 3. CARDS ANIMATION ---
            mm.add("(min-width: 768px)", () => {
                if (cardsRef.current) {
                    gsap.fromTo(cardsRef.current.children,
                        { y: 100, opacity: 0 },
                        {
                            y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out",
                            scrollTrigger: {
                                trigger: cardsRef.current,
                                scroller: scrollerRef.current,
                                start: "top 75%",
                            }
                        }
                    );
                }
            });

            mm.add("(max-width: 767px)", () => {
                if (cardsRef.current && cardsRef.current.children.length === 3) {
                    const c = cardsRef.current.children;
                    // Mobile Order: Mensal (0), Anual (1), Vitalicio (2)
                    const orderedCards = [c[0], c[1], c[2]];
                    gsap.fromTo(orderedCards,
                        { y: 60, opacity: 0, scale: 0.95 },
                        {
                            y: 0, opacity: 1, scale: 1, stagger: 0.25, duration: 0.8, ease: "power2.out",
                            scrollTrigger: {
                                trigger: cardsRef.current,
                                scroller: scrollerRef.current,
                                start: "top 65%",
                            }
                        }
                    );
                }
            });

            // --- 4. FOOTER ---
            gsap.fromTo(footerRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        scroller: scrollerRef.current,
                        start: "top 90%",
                    }
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, [scrollerRef]);

    // Benefits list for Lifetime plan
    const lifetimeFeatures = [
        "Conceitos e Métodos avançados de Design profissional (R$497)",
        "Fundamentos Sólidos para nunca mais travar ao criar (R$147)",
        "Técnicas Diretas para ter resultados expressivos em qualquer área do Design (R$147)",
        "Organização e produtividade de designer profissional (R$147)",
        "Softwares Secretos e atalhos que economizam horas por projeto (R$147)",
        "Acesso a meus arquivos para copiar e colar efeitos e trabalhar mais rápido (R$147)",
        "Usando IA de forma gratuita para criar mais rápido e com mais qualidade (R$97)",
        "Prompts prontos para aumentar sua produtividade (R$97)",
        "Estratégia para montar portfólio que vende por você (R$197)",
        "Como posicionar seus projetos de maneira profissional (R$97)",
        "Como manter foco, disciplina e constância criativa (R$97)",
        "Como transformar seu design em dinheiro na prática (R$247)",
        "Como gerar desejo e vender de forma eficiente (R$147)",
        "Mentalidade de crescimento para destravar resultados (R$67)",
        "Aulas extras + materiais exclusivos só para alunos (R$147)",
        "Networking, suporte coletivo e troca profissional (IMPAGÁVEL)"
    ];

    return (
        <section
            id="plans-section"
            ref={containerRef}
            className="relative w-full min-h-[100dvh] pt-0 pb-12 md:pb-32 flex flex-col items-center justify-between overflow-x-hidden bg-black -mt-12 md:-mt-20 [content-visibility:auto]"
        >
            {/* Background Texture (Subtle) */}
            {/* Mobile: Removed noise overlay mix-blend for performance */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0 hidden md:block mix-blend-overlay pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-[1300px] mx-auto px-4 md:px-6 flex flex-col flex-grow">

                {/* --- GRID LAYOUT: TITLE LEFT, PATH RIGHT --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start mb-16 md:mb-24 mt-4 md:mt-8">

                    {/* COL 1: HEADER CARD */}
                    <div ref={headerWrapperRef} className="order-1 flex justify-center lg:justify-start w-full sticky top-24 self-start">
                        <div className="relative w-full overflow-hidden rounded-[2rem] border border-[#00CBD9]/20 bg-gradient-to-br from-[#001E24] via-[#010B0E] to-black p-8 md:p-12 md:shadow-[0_0_50px_rgba(0,203,217,0.05)]">
                            {/* Mobile: Hidden heavy blur glow */}
                            <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-[#00CBD9]/10 blur-[60px] md:blur-[100px] rounded-full pointer-events-none mix-blend-screen hidden md:block"></div>

                            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-sans font-black text-white leading-[1.15] tracking-tight">
                                <span className="block mb-2 md:mb-0">Existem momentos na vida</span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00CBD9] to-[#AEECF1] md:drop-shadow-[0_0_20px_rgba(0,203,217,0.25)]">
                                    que definem o rumo <br className="hidden lg:block" /> dos próximos anos.
                                </span>
                            </h2>
                            <div className="mt-8 flex items-center gap-3 opacity-60">
                                <div className="h-[2px] w-12 bg-[#00CBD9]"></div>
                            </div>
                        </div>
                    </div>

                    {/* COL 2: DECISION PATH (Gamification) */}
                    <div ref={decisionPathRef} className="order-2 flex justify-center w-full">
                        <div className="flex flex-col items-center relative w-full max-w-lg">

                            {/* NODE 1: 2019 (The Past) */}
                            <div className="relative z-10 img-2019 mb-3">
                                <div className="relative w-[320px] max-w-[90vw] h-[320px] max-h-[90vw] md:w-[200px] md:h-[200px] rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl bg-black">
                                    <img ref={img2019Ref} src={ASSETS.PLAN_2019_IMAGE} loading="lazy" decoding="async" alt="2019" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50"></div>
                                </div>
                            </div>

                            {/* THE PATH (Connecting Line) */}
                            <div className="absolute top-[320px] md:top-[200px] bottom-[20%] w-[2px] bg-white/5 z-0"></div>

                            {/* RED DOTS & PILL LABEL */}
                            <div className="flex flex-col gap-4 md:gap-4 my-6 relative z-10 w-full items-center">
                                <div className="text-decision-pill absolute -top-10 md:top-0 w-full flex justify-center md:justify-end md:right-[55%] z-20 pointer-events-none">
                                    <div className="bg-[#1a0505] md:backdrop-blur-md px-4 py-1.5 rounded-full border border-[#FC2C54] shadow-[0_0_15px_rgba(252,44,84,0.3)] flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#FC2C54] animate-pulse"></div>
                                        <h3 className="text-white font-bold text-xs md:text-sm leading-none whitespace-nowrap uppercase tracking-wider">
                                            Uma decisão...
                                        </h3>
                                    </div>
                                </div>

                                {[1, 2, 3, 4].map((i) => (
                                    <div key={`red-${i}`} className="dot-red w-5 h-5 md:w-4 md:h-4 rounded-full bg-[#2A0505] border border-[#FC2C54] md:shadow-[0_0_12px_rgba(252,44,84,0.4)]"></div>
                                ))}
                            </div>

                            {/* THE TURNING POINT (Interaction) */}
                            <div className="relative py-4 md:py-6 flex items-center justify-center z-20 w-full">
                                <div className="decision-text-end absolute left-[50%] ml-10 md:ml-12 top-1/2 -translate-y-1/2 w-max text-left z-20">
                                    <p className="text-gray-400 text-[10px] md:text-xs uppercase tracking-widest leading-tight">
                                        te leva a uma <br />
                                        <span className="text-[#00FF94] font-bold text-sm md:text-base whitespace-nowrap">vida diferente</span>
                                    </p>
                                </div>

                                <div className="relative w-20 h-20 md:w-16 md:h-16 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-b from-[#FC2C54]/20 to-[#00FF94]/20 blur-xl rounded-full"></div>
                                    <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 md:w-10 md:h-10 text-white decision-arrow drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                                        <path d="M4 4V10C4 13.3137 6.68629 16 10 16H18M18 16L14 12M18 16L14 20" stroke="url(#gradientDecision)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                        <defs>
                                            <linearGradient id="gradientDecision" x1="4" y1="4" x2="18" y2="20" gradientUnits="userSpaceOnUse">
                                                <stop offset="0%" stopColor="#FC2C54" />
                                                <stop offset="100%" stopColor="#00FF94" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                            </div>

                            {/* GREEN DOTS (Success) */}
                            <div className="flex flex-col gap-4 md:gap-4 my-6 relative z-10 w-full items-center">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={`green-${i}`} className="dot-green w-5 h-5 md:w-4 md:h-4 rounded-full bg-[#001A0F] border border-[#00FF94] md:shadow-[0_0_12px_rgba(0,255,148,0.4)]"></div>
                                ))}
                            </div>

                            {/* NODE 2: Atualmente (The Future) */}
                            <div className="relative z-10 img-2025 mt-3 group">
                                <div className="relative w-[320px] max-w-[90vw] h-[320px] max-h-[90vw] md:w-[220px] md:h-[220px] rounded-3xl overflow-hidden border-[3px] border-[#00FF94] shadow-[0_0_30px_rgba(0,255,148,0.2)] md:shadow-[0_0_60px_rgba(0,255,148,0.3)] bg-black">
                                    <img ref={img2025Ref} src={ASSETS.PLAN_CURRENT_IMAGE} loading="lazy" decoding="async" alt="Atualmente" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#00FF94]/40 via-transparent to-transparent mix-blend-overlay"></div>
                                </div>
                                {/* Hidden ping on mobile for performance */}
                                <div className="absolute -inset-4 border border-[#00FF94]/30 rounded-[30px] opacity-0 group-hover:opacity-100 animate-ping pointer-events-none hidden md:block"></div>
                            </div>

                            {/* NEW TEXT BLOCK BELOW 2025 */}
                            <div className="text-block-final mt-10 md:mt-12 flex flex-col items-center text-center z-10 w-full max-w-[90%] md:max-w-md mx-auto opacity-0">

                                {/* // E SIM */}
                                <p className="text-[#00CBD9] text-xs md:text-xs font-bold tracking-[0.2em] uppercase mb-4 font-mono">
                                // E SIM
                                </p>

                                {/* Text 1 */}
                                <p className="text-gray-300 text-base md:text-base leading-relaxed mb-6 font-sans">
                                    Por cada Módulo, eu poderia facilmente cobrar o valor de uma mensalidade de qualquer faculdade que é em torno de <span className="text-white font-black text-2xl md:text-2xl block mt-1">R$2.300</span>
                                </p>

                                {/* Text 2 */}
                                <p className="text-gray-300 text-base md:text-base leading-relaxed mb-6 font-sans">
                                    Mas meu intuito é ajudar <br /> o máximo de pessoas. <br />
                                    Por isso , <span className="text-[#00CBD9] font-bold text-lg md:text-lg">vou liberar 3 planos</span> <br />
                                    para você decidir qual <br />
                                    é o <span className="italic text-white text-lg md:text-lg">melhor para Você!</span>
                                </p>

                                {/* Divider / Visual break */}
                                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00CBD9]/30 to-transparent my-6"></div>

                                {/* Impact Text */}
                                <div className="flex flex-col gap-2 mb-8">
                                    <p className="text-white font-bold text-xl md:text-xl leading-tight">
                                        Por um valor que volta <br />
                                        para o seu bolso logo
                                    </p>
                                    <p className="text-2xl md:text-3xl font-black bg-gradient-to-r from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent uppercase tracking-wide">
                                        no primeiro projeto
                                    </p>
                                </div>

                                {/* Footer Text */}
                                <div className="flex flex-col items-center">
                                    <p className="text-gray-500 text-sm md:text-xs mb-2 uppercase tracking-wider">Aproveite o valor promocional</p>
                                    <p className="text-white font-bold text-base md:text-base uppercase tracking-[0.15em] border-b-2 border-[#00CBD9] pb-1">
                                        Não é gasto! É investimento!
                                    </p>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>

                {/* --- PRICING CARDS --- */}
                <div
                    ref={cardsRef}
                    className="flex flex-col md:flex-row items-center md:items-end justify-center gap-6 md:gap-8 w-full max-w-6xl mx-auto"
                >
                    {/* PLAN 1: MENSAL (DOM 0) - Mobile Order 1 */}
                    <div className="order-1 md:order-1 h-auto w-full md:w-auto opacity-0 flex-1">
                        <PricingCard
                            title="Plano Mensal"
                            accentColor="#00CBD9"
                            price="R$ 47,00"
                            period="por mês"
                            features={[
                                "Curso Completo",
                                "Acesso à Comunidade Exclusiva",
                                "Assinatura automática, seu acesso é liberado todo mês"
                            ]}
                            buttonText="QUERO ESTE PLANO PARA SUBIR DE NÍVEL AGORA"
                            vibe="Entrada no sistema"
                        />
                    </div>

                    {/* PLAN 2: ANUAL (DOM 1) - Mobile Order 2 */}
                    <div className="order-2 md:order-2 h-auto w-full md:w-auto opacity-0 flex-1">
                        <PricingCard
                            title="Plano Anual"
                            accentColor="#00A0B0"
                            price="R$ 19,34"
                            period="12x"
                            subPrice="ou R$ 187,00 à vista"
                            features={[
                                "Curso Completo",
                                "Acesso à Comunidade Exclusiva",
                                "Acesso liberado automaticamente, sempre que for renovado"
                            ]}
                            buttonText="QUERO ESTE PLANO PARA SUBIR DE NÍVEL AGORA"
                        />
                    </div>

                    {/* PLAN 3: VITALÍCIO (DOM 2) - Mobile Order 3 */}
                    <div className="order-3 md:order-3 h-auto w-full md:w-auto relative z-20 opacity-0 flex-1 min-w-[320px] lg:min-w-[360px]">
                        <PricingCard
                            title="Plano Vitalício"
                            accentColor="#FFD700"
                            price="R$ 25,55"
                            period="12x"
                            subPrice="ou R$ 247,00 à vista"
                            oldPrice="de R$2.300,00 por apenas"
                            features={lifetimeFeatures}
                            buttonText="QUERO ESTE PLANO PARA SUBIR DE NÍVEL AGORA"
                            isGold={true}
                            badge="MELHOR QUE BITCOIN EM 2015 ⚡"
                            offerNote="🔻 Oferta válida enquanto houver vagas"
                        />
                    </div>

                </div>
            </div>

            {/* --- FOOTER TRUST BAR --- */}
            <div
                ref={footerRef}
                className="relative w-full mt-12 md:mt-24 z-10 opacity-0"
            >
                <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00CBD9]/30 to-transparent border-y border-[#00CBD9]/20"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
                    }}
                />
                {/* Mobile: Hide heavy footer blur */}
                <div className="absolute inset-y-0 left-1/3 right-1/3 bg-[#00CBD9]/15 blur-2xl pointer-events-none hidden md:block"></div>

                <div className="relative z-10 flex gap-6 md:gap-16 items-center justify-center py-10 md:py-12">
                    <TrustItem icon={<Zap size={18} />} text="RÁPIDO" />
                    <div className="h-6 w-[1px] bg-gradient-to-b from-transparent via-[#00CBD9]/50 to-transparent"></div>
                    <TrustItem icon={<Timer size={18} />} text="ACESSÍVEL" />
                    <div className="h-6 w-[1px] bg-gradient-to-b from-transparent via-[#00CBD9]/50 to-transparent"></div>
                    <TrustItem icon={<Award size={18} />} text="INOVADOR" />
                </div>
            </div>
        </section>
    );
};

const TrustItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="flex items-center gap-2 md:gap-3 text-white/90 font-bold text-xs md:text-sm tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(0,203,217,0.3)] hover:text-[#00CBD9] hover:scale-105 transition-all duration-300">
        <span className="text-[#00CBD9]">{icon}</span> <span>{text}</span>
    </div>
);

interface PricingCardProps {
    title: string;
    accentColor: string;
    price: string;
    period: string;
    subPrice?: string;
    oldPrice?: string;
    features: string[];
    buttonText: string;
    isGold?: boolean;
    badge?: string;
    vibe?: string;
    offerNote?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
    title, accentColor, price, period, subPrice, oldPrice, features, buttonText, isGold, badge, vibe, offerNote
}) => {
    return (
        // OUTER WRAPPER
        <div
            className={`
                group relative flex flex-col h-full rounded-2xl transition-all duration-500 w-full
                ${isGold
                    ? 'scale-[1.02] md:scale-110 z-20'
                    : 'md:hover:-translate-y-2'
                }
            `}
        >
            {/* Top Badge for Gold */}
            {badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFD700] text-black font-bold text-[9px] md:text-[10px] px-3 py-1.5 rounded-sm uppercase tracking-widest shadow-lg whitespace-nowrap z-30 flex items-center gap-1">
                    {badge}
                </div>
            )}

            {/* INNER CONTAINER */}
            <div className={`
                relative flex flex-col h-full rounded-2xl p-6 md:p-8 overflow-hidden w-full
                ${isGold
                    ? 'bg-gradient-to-b from-[#3a2d00] to-black border border-[#FFD700]/50 md:shadow-[0_0_40px_rgba(255,215,0,0.15)] md:group-hover:shadow-[0_0_60px_rgba(255,215,0,0.3)]'
                    : 'bg-[#141414] md:bg-[#141414]/80 md:backdrop-blur-sm border border-white/10 group-hover:border-white/20'
                }
            `}>

                {/* Top Border Accent */}
                <div
                    className="absolute top-0 left-0 w-full h-[3px] opacity-100 shadow-[0_0_15px_rgba(0,203,217,0.5)]"
                    style={{
                        background: `linear-gradient(90deg, ${accentColor} 0%, rgba(5,16,20,0) 100%)`,
                        boxShadow: `0 0 10px ${accentColor}`
                    }}
                />

                {/* Content */}
                <div className="flex-1 flex flex-col">

                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${isGold ? 'border-[#FFD700]/30 text-[#FFD700] bg-[#FFD700]/10' : 'border-white/10 text-gray-400 bg-white/5'}`}>
                                {title}
                            </span>
                            {/* Vibe Text */}
                            {vibe && <span className="text-[9px] text-gray-600 uppercase tracking-wider hidden md:block">{vibe}</span>}
                        </div>

                        {/* Old Price Display (if any) */}
                        {oldPrice && (
                            <div className="mb-2">
                                <p className="text-gray-400 text-xs line-through">{oldPrice.split(" por ")[0]}</p>
                                <p className="text-white text-xs font-bold uppercase tracking-wider">{oldPrice.split(" de ")[1] ? "por apenas" : ""}</p>
                            </div>
                        )}

                        <div className="flex items-end gap-1 flex-wrap">
                            {period === '12x' && <span className={`text-lg font-bold mb-1 ${isGold ? 'text-[#FFD700]' : 'text-gray-500'}`}>12x</span>}
                            <span
                                className={`text-4xl md:text-5xl font-black tracking-tighter leading-none ${isGold ? 'text-[#FFD700] md:drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]' : 'bg-gradient-to-r from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent'}`}
                            >
                                {price}
                            </span>
                            {period !== '12x' && <span className="text-gray-500 text-xs font-bold mb-1 uppercase">{period}</span>}
                        </div>

                        {subPrice && <p className="text-gray-500 text-xs mt-1">{subPrice}</p>}
                    </div>

                    {/* Divider */}
                    <div className="w-full h-[1px] bg-white/5 mb-6"></div>

                    {/* Checklist */}
                    <ul className="space-y-4 mb-8">
                        {features.map((feat, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <div className={`mt-0.5 min-w-[16px] h-4 flex items-center justify-center rounded-full ${isGold ? 'bg-[#FFD700]' : 'bg-transparent border border-white/20'}`}>
                                    {isGold ? <Check size={10} className="text-black stroke-[4px]" /> : <Check size={10} className={accentColor === '#00CBD9' ? 'text-[#00CBD9]' : 'text-[#00A0B0]'} />}
                                </div>
                                <span className={`text-xs md:text-sm font-sans leading-relaxed ${isGold ? 'text-white font-medium' : 'text-gray-400'}`}>
                                    {feat}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {offerNote && (
                        <div className="mb-6">
                            <p className="text-[#FC2C54] text-xs font-bold uppercase tracking-wide animate-pulse">
                                {offerNote}
                            </p>
                        </div>
                    )}

                    {/* Button */}
                    <div className="mt-auto">
                        <button
                            className={`
                                w-full py-4 rounded-xl font-bold uppercase transition-all duration-300 relative overflow-hidden
                                ${isGold
                                    ? 'text-[12px] md:text-xs tracking-[0.2em] bg-[#FFD700] text-black hover:bg-[#ffe44d] shadow-[0_0_30px_rgba(255,215,0,0.8)] md:shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_40px_rgba(255,215,0,0.6)]'
                                    : 'text-[10px] md:text-xs tracking-[0.2em] bg-transparent border border-white/20 text-white hover:border-[#00CBD9] hover:text-[#00CBD9] hover:bg-[#00CBD9]/5'
                                }
                            `}
                        >
                            {buttonText.includes("AGORA") ? "QUERO SUBIR DE NÍVEL" : buttonText}
                        </button>

                        {/* Cancel Policy */}
                        <p className="text-center text-[9px] md:text-[10px] text-gray-500 mt-3 leading-tight opacity-70">
                            Você pode cancelar a qualquer momento, mas perderá acesso ao curso e a comunidade.
                        </p>

                        {/* Kiwify Secure Payment Badge - NOW FOR ALL PLANS */}
                        <div
                            className="mt-4 w-full mx-auto rounded-lg overflow-hidden border transition-colors shadow-lg bg-white"
                            style={{ borderColor: isGold ? '#FFD70050' : `${accentColor}40` }}
                        >
                            {/* Header */}
                            <div
                                className="py-1.5 flex items-center justify-center"
                                style={{ backgroundColor: accentColor }}
                            >
                                <span className="text-black text-[9px] font-black uppercase tracking-wide text-center leading-none">
                                    Condição Especial • Tempo Limitado
                                </span>
                            </div>

                            {/* Body */}
                            <div className="p-2 flex flex-col items-center gap-1.5">
                                {/* Kiwify Logo Representation */}
                                <div className="flex items-center gap-1 opacity-90 scale-95">
                                    <ShieldCheck size={14} className="text-[#353535] fill-current" />
                                    <span className="font-bold text-[#353535] text-sm tracking-tighter lowercase leading-none mt-0.5">kiwify</span>
                                </div>

                                <p className="text-[8px] text-gray-600 text-center leading-tight px-1 font-sans">
                                    <span className="font-bold text-gray-800">Compra 100% Segura.</span> Acesso imediato após confirmação.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Rating for Gold */}
                    {isGold && (
                        <div className="flex justify-center gap-1 mt-4">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} fill="#FFD700" className="text-[#FFD700]" />)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
