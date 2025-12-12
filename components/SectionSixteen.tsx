
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket } from 'lucide-react';
import { scrollToPlans } from '../utils/scroll';

gsap.registerPlugin(ScrollTrigger);

interface SectionSixteenProps {
    scrollerRef: React.RefObject<HTMLDivElement | null>;
}

export const SectionSixteen: React.FC<SectionSixteenProps> = ({ scrollerRef }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!scrollerRef.current) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // DESKTOP: High Fidelity Animation (Elastic Pop)
            mm.add("(min-width: 768px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        scroller: scrollerRef.current,
                        start: "top 75%",
                    }
                });

                // Badge pops in with elastic ease
                tl.fromTo(badgeRef.current,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.2)" }
                );

                // Content slides in from right
                tl.fromTo(contentRef.current,
                    { x: 30, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
                    "-=0.6"
                );
            });

            // MOBILE: High Performance Animation (Simple Fade/Scale)
            mm.add("(max-width: 767px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        scroller: scrollerRef.current,
                        start: "top 80%",
                    }
                });

                // Badge fades in gently (No elastic ease to save CPU)
                tl.fromTo(badgeRef.current,
                    { scale: 0.8, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }
                );

                // Content fades up
                tl.fromTo(contentRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                    "-=0.4"
                );
            });

        }, containerRef);

        return () => ctx.revert();
    }, [scrollerRef]);

    return (
        <section
            ref={containerRef}
            className="relative w-full py-10 md:py-32 bg-[#050505] overflow-hidden flex items-center justify-center border-t border-white/5 [content-visibility:auto]"
        >
            {/* Ambient Background Glow - MOBILE OPTIMIZATION: Hidden on mobile to reduce overdraw */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,203,217,0.04)_0%,transparent_70%)] pointer-events-none hidden md:block"></div>

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                {/* --- LEFT: BADGE (IMAGE) --- */}
                <div ref={badgeRef} className="relative flex-shrink-0 group will-change-transform">
                    <div className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center">
                        <img
                            src="/garantia.png"
                            alt="Garantia 7 dias - 100% dinheiro de volta"
                            className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(0,203,217,0.3)]"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                </div>

                {/* --- RIGHT: CONTENT --- */}
                <div ref={contentRef} className="flex flex-col items-center lg:items-start text-center lg:text-left">
                    <h2 className="text-3xl md:text-5xl font-sans font-bold text-white mb-6 tracking-wide leading-tight">
                        VOCÊ NÃO TEM <br />
                        <span className="bg-gradient-to-r from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent md:drop-shadow-[0_0_15px_rgba(0,203,217,0.3)]">
                            RISCO NENHUM!
                        </span>
                    </h2>

                    <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl mb-8 font-sans">
                        Sem riscos por 7 dias. Receba <strong className="text-white border-b border-[#00CBD9]">100% do seu dinheiro de volta</strong> se não gostar.
                    </p>

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
