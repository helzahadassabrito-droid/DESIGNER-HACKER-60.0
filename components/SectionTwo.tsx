
import React, { forwardRef, useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Star, PenTool, Star as StarIcon, Brain, Check, Users, Flame, CheckCheck, Award, TrendingUp, ArrowDown, Rocket } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ASSETS } from '../constants';
import { SectionSeven } from './SectionSeven';
import { SectionEight } from './SectionEight';
import { SectionNine } from './SectionNine';
import { SectionTen } from './SectionTen';
import { SectionEleven } from './SectionEleven';
import { SectionTwelve } from './SectionTwelve';
import { SectionThirteen } from './SectionThirteen';
import { SectionFourteen } from './SectionFourteen';
import { SectionFifteen } from './SectionFifteen';
import { SectionSixteen } from './SectionSixteen';
import { SectionSeventeen } from './SectionSeventeen';
import { SectionEighteen } from './SectionEighteen';
import { SectionNineteen } from './SectionNineteen';
import { SectionTwenty } from './SectionTwenty';
import { SectionTwentyOne } from './SectionTwentyOne';
import { SectionComparison } from './SectionComparison';
import { Footer } from './Footer';
import { TechCard } from './ui/TechCard';
import { SectionModulesList } from './SectionModulesList';
import { scrollToPlans } from '../utils/scroll';

interface SectionTwoProps {
    isActive: boolean;
}

// --- ISOLATED PREMIUM IMAGE COMPONENT (PERFORMANCE OPTIMIZED) ---
const PremiumTiltCard = () => {
    // Motion Values for 3D Tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth Spring Physics
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    // Transform Map
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    // Spotlight Gradient Move
    const spotlightX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const spotlightY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    // Shadow Movement (Grounding)
    const shadowX = useTransform(mouseX, [-0.5, 0.5], ["5px", "-5px"]);
    const shadowY = useTransform(mouseY, [-0.5, 0.5], ["5px", "-5px"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        // PERFORMANCE GUARD: Disable logic on mobile/tablets to save battery
        if (window.innerWidth < 768) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = (mouseXVal / width) - 0.5;
        const yPct = (mouseYVal / height) - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Zoom Scroll Refs
    const imgRef = useRef<HTMLImageElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        const setWillChange = () => gsap.set(imgRef.current, { willChange: "transform" });
        const removeWillChange = () => gsap.set(imgRef.current, { willChange: "auto" });

        mm.add({
            isMobile: "(max-width: 767px)",
            isDesktop: "(min-width: 768px)",
        }, (context) => {
            const { isMobile } = context.conditions as any;
            const targetScale = isMobile ? 1.1 : 1.15;

            gsap.fromTo(imgRef.current,
                { scale: 1 },
                {
                    scale: targetScale,
                    ease: "none",
                    force3D: true, // GPU active
                    scrollTrigger: {
                        trigger: wrapRef.current,
                        start: "top 80%", // Start zooming when image enters viewport
                        end: "bottom 20%",
                        scrub: 1, // Smooth touch
                        onEnter: setWillChange,
                        onEnterBack: setWillChange,
                        onLeave: removeWillChange,
                        onLeaveBack: removeWillChange
                    }
                }
            );
        });
    }, { scope: wrapRef });

    return (
        <motion.div
            className="relative w-full max-w-[550px] md:max-w-[800px] lg:max-w-[950px] cursor-pointer md:perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                // Only apply rotation on larger screens via CSS media query or conditional logic if feasible.
                // Framer motion style injection handles the values, but if X/Y are 0, overhead is low.
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
        >
            {/* Highlight Element: Rectangular Design Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-xl -z-10 pointer-events-none">
                <div className="absolute inset-0 bg-[#00CBD9]/20 blur-[60px] rounded-xl mix-blend-screen animate-pulse"></div>
            </div>

            {/* Main Image - Wrapper for Zoom Scroll */}
            <div ref={wrapRef} className="relative overflow-hidden w-full h-auto z-10 rounded-xl">
                <img
                    ref={imgRef}
                    src="/pc.png"
                    alt="Design Hack Platform on Devices"
                    className="w-full h-auto object-contain"
                    width="950"
                    height="600"
                    loading="lazy"
                    decoding="async"
                    style={{
                        filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.8))"
                    }}
                />
            </div>

            {/* Spotlight Overlay - HIDDEN ON MOBILE via css class */}
            <motion.div
                className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay hidden md:block"
                style={{
                    background: useTransform(
                        [spotlightX, spotlightY],
                        ([sx, sy]) => `radial-gradient(circle at ${sx} ${sy}, rgba(255,255,255,0.15), transparent 60%)`
                    )
                }}
            />

            {/* Grounding Shadow (Dynamic) - STATIC ON MOBILE */}
            <motion.div
                className="absolute -bottom-10 left-[10%] w-[80%] h-[20px] bg-black/60 blur-xl rounded-[100%] -z-10 hidden md:block"
                style={{ x: shadowX, y: shadowY }}
            />
            {/* Static Mobile Shadow */}
            <div className="absolute -bottom-4 left-[10%] w-[80%] h-[20px] bg-black/60 blur-xl rounded-[100%] -z-10 md:hidden"></div>
        </motion.div>
    );
};

export const SectionTwo = forwardRef<HTMLDivElement, SectionTwoProps>(({ isActive }, ref) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Section 2 Refs
    const contentRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);
    const subRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLButtonElement>(null);
    const trustRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);

    // Section 4 Refs
    const problemSectionRef = useRef<HTMLDivElement>(null);
    const devicesWrapperRef = useRef<HTMLDivElement>(null);

    // Section 5 Refs
    const instructorSectionRef = useRef<HTMLDivElement>(null);
    const mentorPortraitRef = useRef<HTMLImageElement>(null);
    const pillsContainerRef = useRef<HTMLDivElement>(null);

    // Section 6 Refs
    const differentialsRef = useRef<HTMLDivElement>(null);
    const diffCardsRef = useRef<HTMLDivElement>(null);

    const [isScrollReady, setIsScrollReady] = useState(false);

    useLayoutEffect(() => {
        if (isActive) {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = 0;
            }
            const timer = setTimeout(() => {
                setIsScrollReady(true);
                ScrollTrigger.refresh();
            }, 100);
            return () => clearTimeout(timer);
        } else {
            setIsScrollReady(false);
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = 0;
            }
        }
    }, [isActive]);

    // Animations
    useGSAP(() => {
        if (isActive) {

            // --- MATCHMEDIA INSTANCES FOR RESPONSIVE ANIMATIONS ---
            // Declared at the start so all scroll animations can use them
            const mm = gsap.matchMedia();
            const mm2 = gsap.matchMedia();

            // --- DESKTOP ONLY: ENTRY TIMELINE ANIMATIONS ---
            // Mobile uses CSS visibility (md:invisible) - no JS needed for entry
            mm.add("(min-width: 768px)", () => {
                const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

                tl.fromTo(marqueeRef.current,
                    { y: -50, autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, duration: 0.8 }
                )
                    .fromTo(headlineRef.current,
                        { scale: 0.95, autoAlpha: 0 },
                        { scale: 1, autoAlpha: 1, duration: 0.8 },
                        "-=0.4"
                    )
                    .fromTo(subRef.current,
                        { y: 20, autoAlpha: 0 },
                        { y: 0, autoAlpha: 1, duration: 0.6 },
                        "-=0.6"
                    )
                    .fromTo(cardsRef.current?.children || [],
                        { y: 30, autoAlpha: 0 },
                        { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.15 },
                        "-=0.2"
                    )
                    .fromTo(ctaRef.current,
                        { scale: 0.9, autoAlpha: 0 },
                        { scale: 1, autoAlpha: 1, duration: 0.6 },
                        "-=0.2"
                    )
                    .fromTo(trustRef.current,
                        { autoAlpha: 0 },
                        { autoAlpha: 1, duration: 0.5 },
                        "-=0.3"
                    )
                    .fromTo(arrowRef.current,
                        { autoAlpha: 0, y: -20, scale: 0.95 },
                        { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" }
                    );
            });

            // SECTION 4 SCROLL ANIMATION (SHARP TECH REVEAL)
            if (devicesWrapperRef.current && problemSectionRef.current && scrollContainerRef.current) {
                // DESKTOP
                mm2.add("(min-width: 768px)", () => {
                    gsap.fromTo(devicesWrapperRef.current,
                        {
                            scale: 0.95,
                            opacity: 0,
                            y: 60,
                            filter: "brightness(0.5) contrast(1.2)"
                        },
                        {
                            scale: 1,
                            opacity: 1,
                            y: 0,
                            filter: "brightness(1) contrast(1)",
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: problemSectionRef.current,
                                scroller: scrollContainerRef.current,
                                start: "top 60%",
                                end: "center center",
                                scrub: 1,
                            }
                        }
                    );
                });

                // MOBILE OPTIMIZED (No Filter, Faster Trigger)
                mm2.add("(max-width: 767px)", () => {
                    gsap.fromTo(devicesWrapperRef.current,
                        {
                            scale: 0.9,
                            opacity: 0,
                            y: 40,
                            // filter: "brightness(0.5)" // Removed for performance
                        },
                        {
                            scale: 1,
                            opacity: 1,
                            y: 0,
                            // filter: "brightness(1)", // Removed
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: problemSectionRef.current,
                                scroller: scrollContainerRef.current,
                                start: "top 70%",
                                end: "center center",
                                scrub: 0.5, // Less scrub lag
                            }
                        }
                    );
                });
            }

            // SECTION 5 SCROLL ANIMATION (MENTOR ZOOM & PILLS)
            // GPU Memory Management helpers
            const setMentorWillChange = () => { if (mentorPortraitRef.current) mentorPortraitRef.current.style.willChange = 'transform'; };
            const removeMentorWillChange = () => { if (mentorPortraitRef.current) mentorPortraitRef.current.style.willChange = 'auto'; };

            if (instructorSectionRef.current && mentorPortraitRef.current && pillsContainerRef.current && scrollContainerRef.current) {

                // Desktop: Cinematic Zoom + Blur
                mm2.add("(min-width: 768px)", () => {
                    gsap.fromTo(mentorPortraitRef.current,
                        {
                            scale: 0.55,
                            opacity: 0.2,
                            filter: 'blur(12px)',
                            y: 100,
                            rotation: 2,
                            boxShadow: '0 0 0px rgba(0, 203, 217, 0)'
                        },
                        {
                            scale: 1.15,
                            opacity: 1,
                            filter: 'blur(0px)',
                            y: 0,
                            rotation: 0,
                            boxShadow: '0 0 40px rgba(0, 203, 217, 0.4)',
                            ease: "power4.out",
                            force3D: true,
                            scrollTrigger: {
                                trigger: instructorSectionRef.current,
                                scroller: scrollContainerRef.current,
                                start: "top 80%",
                                end: "center 35%",
                                scrub: 1,
                                onEnter: setMentorWillChange,
                                onEnterBack: setMentorWillChange,
                                onLeave: removeMentorWillChange,
                                onLeaveBack: removeMentorWillChange
                            }
                        }
                    );

                    gsap.fromTo(pillsContainerRef.current.children,
                        {
                            y: 50,
                            opacity: 0,
                            scale: 0.85,
                            filter: 'blur(6px)',
                            rotateX: -10
                        },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            filter: 'blur(0px)',
                            rotateX: 0,
                            stagger: 0.15,
                            duration: 0.7,
                            ease: "back.out(1.5)",
                            scrollTrigger: {
                                trigger: pillsContainerRef.current,
                                scroller: scrollContainerRef.current,
                                start: "top 65%",
                            }
                        }
                    );
                });

                // Mobile: Optimized Zoom (No Blur, Smooth Scale Scrub with VRAM Management)
                mm.add("(max-width: 767px)", () => {
                    // Zoom Effect on Photo - Reduced scale for mobile performance
                    gsap.fromTo(mentorPortraitRef.current,
                        {
                            scale: 1, // Start at normal size - zoom IN on scroll
                            transformOrigin: "center center"
                        },
                        {
                            scale: 1.1, // Reduced zoom factor for mobile (1.1 vs 1.15)
                            ease: "none",
                            force3D: true,
                            scrollTrigger: {
                                trigger: mentorPortraitRef.current,
                                scroller: scrollContainerRef.current, // CRITICAL: Must specify custom scroller
                                start: "top 80%",
                                end: "bottom 20%",
                                scrub: 1,
                                onEnter: setMentorWillChange,
                                onEnterBack: setMentorWillChange,
                                onLeave: removeMentorWillChange,
                                onLeaveBack: removeMentorWillChange
                            }
                        }
                    );

                    // Pills Animation (Keep simple for performance)
                    gsap.fromTo(pillsContainerRef.current.children,
                        {
                            y: 30,
                            opacity: 0,
                        },
                        {
                            y: 0,
                            opacity: 1,
                            stagger: 0.1,
                            duration: 0.6,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: pillsContainerRef.current,
                                scroller: scrollContainerRef.current,
                                start: "top 70%",
                            }
                        }
                    );
                });
            }

            // SECTION 6 SCROLL ANIMATION (DIFFERENTIALS)
            if (differentialsRef.current && diffCardsRef.current && scrollContainerRef.current) {
                // Desktop: Stagger + Blur
                mm.add("(min-width: 768px)", () => {
                    gsap.fromTo(diffCardsRef.current.children,
                        {
                            y: 60,
                            opacity: 0,
                            scale: 0.9,
                            rotateX: -15,
                            filter: 'blur(8px)'
                        },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            rotateX: 0,
                            filter: 'blur(0px)',
                            stagger: 0.18,
                            duration: 0.8,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: differentialsRef.current,
                                scroller: scrollContainerRef.current,
                                start: "top 70%",
                            }
                        }
                    );
                });

                // Mobile: Simple Stagger
                mm.add("(max-width: 767px)", () => {
                    gsap.fromTo(diffCardsRef.current.children,
                        {
                            y: 30,
                            opacity: 0,
                            scale: 0.95,
                        },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            stagger: 0.1,
                            duration: 0.6,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: differentialsRef.current,
                                scroller: scrollContainerRef.current,
                                start: "top 65%",
                            }
                        }
                    );
                });
            }
        }

    }, { scope: scrollContainerRef, dependencies: [isActive] });

    return (
        <div
            ref={ref}
            className="section-two absolute inset-0 w-full h-full overflow-hidden bg-transparent"
        >
            <div
                ref={scrollContainerRef}
                className={`
            w-full h-full 
            cyan-scrollbar touch-pan-y 
            bg-transparent
            relative overscroll-none
            ${isActive && isScrollReady ? 'overflow-y-auto pointer-events-auto' : 'overflow-hidden pointer-events-none'}
        `}
            >

                {/* ==========================================
            SECTION 2: HERO / OFFER
           ========================================== */}
                <div className="relative w-full min-h-[100dvh] flex flex-col items-center bg-black">

                    {/* ABSOLUTE BLACK BACKGROUND WITH SCRIBBLE TEXTURE */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen"
                        style={{
                            backgroundImage: `
                        repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 15px),
                        repeating-linear-gradient(-45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 15px)
                    `,
                        }}
                    />

                    {/* NOISE TEXTURE - STATIC IMAGE BETTER THAN SVG FILTER ON MOBILE */}
                    <div
                        className="absolute inset-0 opacity-[0.05] pointer-events-none z-0 mix-blend-overlay will-change-transform"
                        style={{ backgroundImage: `url(${ASSETS.NOISE_TEXTURE})` }}
                    />

                    {/* Marquee Bar */}
                    <div
                        ref={marqueeRef}
                        className="absolute top-0 left-0 w-full bg-[#FC2C54] z-20 overflow-hidden py-1.5 md:py-2 md:invisible shadow-[0_5px_20px_rgba(252,44,84,0.3)]"
                    >
                        <div className="animate-marquee whitespace-nowrap flex will-change-transform">
                            <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-white uppercase px-4">
                                Vagas Limitadas com Valor Promocional  •  Vagas Limitadas com Valor Promocional  •  Vagas Limitadas com Valor Promocional  •  Vagas Limitadas com Valor Promocional •
                            </span>
                            <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-white uppercase px-4">
                                Vagas Limitadas com Valor Promocional  •  Vagas Limitadas com Valor Promocional  •  Vagas Limitadas com Valor Promocional  •  Vagas Limitadas com Valor Promocional •
                            </span>
                        </div>
                    </div>

                    <div ref={contentRef} className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-10 md:pt-20 pb-12 flex flex-col items-center text-center flex-grow justify-center">

                        {/* Logo & Headline */}
                        <div ref={headlineRef} className="md:invisible flex flex-col items-center mb-2 mt-0 md:mb-6 md:mt-4 shrink-0">
                            <img
                                src={ASSETS.HEADLINE_IMAGE}
                                alt="Design Hack"
                                className="h-10 md:h-16 mb-4 md:mb-6 object-contain"
                                loading="eager"
                                decoding="async"
                            />
                            <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-tight mb-2 font-sans uppercase">
                                DOMINE O DESIGN <br className="md:hidden" />
                                EM <span className="bg-gradient-to-r from-primary-main via-primary-light to-primary-dark bg-clip-text text-transparent">MENOS DE 7 DIAS!</span>
                            </h1>
                        </div>

                        {/* Subheadline */}
                        <h2 ref={subRef} className="md:invisible text-xl md:text-2xl lg:text-3xl text-white font-bold mb-6 md:mb-8 max-w-4xl shrink-0 font-sans leading-relaxed">
                            Isso vai fazer sua vida <span className="text-white italic">mais fácil</span> e com <span className="text-white italic">mais dinheiro</span>
                        </h2>

                        {/* Cards */}
                        <div ref={cardsRef} className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8 shrink-0 max-w-4xl">

                            {/* Card 1 */}
                            <div className="md:invisible h-full group">
                                <div className="h-full bg-gradient-to-br from-[#FC2C54]/10 to-black/60 border border-[#FC2C54]/20 rounded-xl p-3 md:p-4 backdrop-blur-sm group-hover:border-[#FC2C54]/50 group-hover:bg-[#FC2C54]/5 transition-all duration-300">
                                    <div className="flex flex-row md:flex-col items-center justify-start md:justify-center gap-3 md:gap-4 text-left md:text-center h-full">
                                        <div className="p-2.5 bg-[#FC2C54]/10 rounded-full shrink-0 border border-[#FC2C54]/20 group-hover:bg-[#FC2C54]/20 transition-colors shadow-[0_0_15px_rgba(252,44,84,0.15)]">
                                            <Award className="w-6 h-6 md:w-8 md:h-8 text-[#FC2C54]" strokeWidth={1.5} />
                                        </div>
                                        <p className="text-base md:text-lg font-bold text-gray-100 leading-tight">
                                            Mesmo sem ter experiência
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="md:invisible h-full group">
                                <div className="h-full bg-gradient-to-br from-[#FC2C54]/10 to-black/60 border border-[#FC2C54]/20 rounded-xl p-3 md:p-4 backdrop-blur-sm group-hover:border-[#FC2C54]/50 group-hover:bg-[#FC2C54]/5 transition-all duration-300">
                                    <div className="flex flex-row md:flex-col items-center justify-start md:justify-center gap-3 md:gap-4 text-left md:text-center h-full">
                                        <div className="p-2.5 bg-[#FC2C54]/10 rounded-full shrink-0 border border-[#FC2C54]/20 group-hover:bg-[#FC2C54]/20 transition-colors shadow-[0_0_15px_rgba(252,44,84,0.15)]">
                                            <PenTool className="w-6 h-6 md:w-8 md:h-8 text-[#FC2C54]" strokeWidth={1.5} />
                                        </div>
                                        <p className="text-base md:text-lg font-bold text-gray-100 leading-tight">
                                            Mesmo sem saber desenhar
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="md:invisible h-full group">
                                <div className="h-full bg-gradient-to-br from-[#FC2C54]/10 to-black/60 border border-[#FC2C54]/20 rounded-xl p-3 md:p-4 backdrop-blur-sm group-hover:border-[#FC2C54]/50 group-hover:bg-[#FC2C54]/5 transition-all duration-300">
                                    <div className="flex flex-row md:flex-col items-center justify-start md:justify-center gap-3 md:gap-4 text-left md:text-center h-full">
                                        <div className="p-2.5 bg-[#FC2C54]/10 rounded-full shrink-0 border border-[#FC2C54]/20 group-hover:bg-[#FC2C54]/20 transition-colors shadow-[0_0_15px_rgba(252,44,84,0.15)]">
                                            <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-[#FC2C54]" strokeWidth={1.5} />
                                        </div>
                                        <p className="text-base md:text-lg font-bold text-gray-100 leading-tight">
                                            Mesmo sem investir muito
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* CTA */}
                        <button
                            ref={ctaRef}
                            onClick={scrollToPlans}
                            className="md:invisible group relative overflow-hidden bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] text-black font-extrabold text-sm md:text-lg px-6 py-4 md:px-8 md:py-5 rounded-2xl border-2 border-[#00CBD9]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:scale-105 hover:shadow-[0_0_50px_rgba(0,203,217,0.6)] transition-all duration-300 uppercase tracking-wider font-sans flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-0 whitespace-nowrap w-full md:w-auto"
                        >
                            <div className="absolute inset-0 bg-white/40 w-[200%] animate-shimmer-sweep opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <Rocket className="w-6 h-6 md:w-6 md:h-6 shrink-0" />
                            <span className="relative z-10">QUERO SUBIR DE NÍVEL AGORA</span>
                        </button>

                        {/* Trust Stars */}
                        <div ref={trustRef} className="md:invisible flex flex-col items-center gap-2 shrink-0 mt-6 md:mt-8">
                            <div className="flex gap-1.5">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        fill="#FFD700"
                                        className="w-5 h-5 md:w-6 md:h-6 text-[#FFD700] drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
                                        strokeWidth={0}
                                    />
                                ))}
                            </div>
                            <p className="text-xs md:text-sm text-gray-400 max-w-md font-sans tracking-wide">
                                Técnicas comprovadas usadas pelos melhores profissionais
                            </p>
                        </div>
                    </div>
                </div>


                {/* ==========================================
            SEPARATOR
           ========================================== */}
                <div ref={arrowRef} className="relative w-full flex items-center justify-center py-0 bg-transparent z-30 -mt-12 md:-mt-16 -mb-8 md:mb-0 pointer-events-none md:invisible">
                    <div className="h-[1px] w-[25%] md:w-[15%] bg-gradient-to-r from-transparent to-[#00CBD9]"></div>
                    <div className="mx-4 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#00CBD9] bg-black flex items-center justify-center shadow-[0_0_20px_rgba(0,203,217,0.4)]">
                        <ArrowDown size={22} className="text-[#00CBD9]" />
                    </div>
                    <div className="h-[1px] w-[25%] md:w-[15%] bg-gradient-to-l from-transparent to-[#00CBD9]"></div>
                </div>

                {/* ==========================================
            SECTION 3: SECRETS / IMPACT (OPTIMIZED BACKGROUND)
           ========================================== */}
                <div className="relative w-full min-h-[70vh] md:min-h-0 md:py-24 px-6 md:px-4 flex flex-col justify-end md:justify-center items-start md:items-center text-left md:text-center bg-black overflow-hidden border-b border-white/5 mt-0 pb-12 md:pb-24 [content-visibility:auto]">
                    <div className="absolute inset-0 w-full h-full z-0">
                        {/* 
                   MOBILE OPTIMIZATION: 
                   - Added 'will-change-transform' to hint browser about compositing.
                */}
                        <img
                            src="/mentor2.webp"
                            alt="Background"
                            className="w-full h-full object-cover opacity-100 will-change-transform"
                            loading="lazy"
                            decoding="async"
                        />
                        {/* 
                    GRADIENTS:
                    - Desktop: Maintains standard gradients.
                    - Mobile: Simplified gradients (opacity handled by tailwind classes if needed, but defaults are usually fine as they are static).
                 */}
                        <div className="absolute top-0 left-0 w-full h-32 md:h-40 bg-gradient-to-b from-black via-black/80 to-transparent z-10"></div>
                        <div className="absolute bottom-0 left-0 w-full h-1/2 md:h-32 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
                    </div>

                    <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-start md:items-center gap-6 md:gap-10">
                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-sans font-normal leading-snug md:leading-tight text-white drop-shadow-lg">
                            Descubra meus segredos para criar projetos <br className="hidden lg:block" />
                            <span className="bg-gradient-to-r from-[#00CBD9] via-[#AEECF1] to-[#00A0B0] bg-clip-text text-transparent">
                                10x mais poderosos
                            </span>,
                            focado em comunicar emoções, influenciar decisões e fazer com que
                            <span className="bg-gradient-to-r from-[#00CBD9] via-[#AEECF1] to-[#00A0B0] bg-clip-text text-transparent ml-2 mr-2">
                                VOCÊ
                            </span>
                            se torne
                            <span className="bg-gradient-to-r from-[#00CBD9] via-[#AEECF1] to-[#00A0B0] bg-clip-text text-transparent ml-2">
                                ÚNICO
                            </span> no Mercado.
                        </h3>
                    </div>
                </div>

                {/* ==========================================
            SECTION 4: MARKET PROBLEM (OPTIMIZED BACKGROUNDS)
           ========================================== */}
                <div ref={problemSectionRef} className="relative w-full pt-12 md:pt-20 pb-4 md:pb-8 px-4 bg-black overflow-hidden [content-visibility:auto]">

                    {/* 
                MOBILE PERFORMANCE FIX:
                - The complex repeating linear gradient is hidden on mobile ('hidden md:block').
                - This prevents jagged scrolling and high GPU usage on phones.
            */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen hidden md:block"
                        style={{
                            backgroundImage: `
                        repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 15px),
                        repeating-linear-gradient(-45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 15px)
                    `,
                        }}
                    />

                    {/* 
                MOBILE PERFORMANCE FIX:
                - Changed 'mix-blend-overlay' to 'mix-blend-normal' (default) for mobile with low opacity.
                - 'mix-blend-overlay' is expensive on mobile GPUs.
                - Applied 'md:mix-blend-overlay' to keep desktop fidelity.
            */}
                    <div className="absolute inset-0 opacity-[0.03] md:opacity-[0.05] pointer-events-none z-0 mix-blend-normal md:mix-blend-overlay"
                        style={{ backgroundImage: `url(${ASSETS.NOISE_TEXTURE})` }}
                    />

                    <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 items-center">

                        {/* TEXT CONTENT */}
                        <div className="order-2 lg:order-1 flex flex-col gap-6 md:gap-8 text-left items-start">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight font-bold text-white font-sans">
                                Um dos maiores problemas do Mercado são os <span className="text-[#00CBD9] md:drop-shadow-[0_0_8px_rgba(0,203,217,0.3)]">designers desqualificados</span>
                            </h2>

                            <p className="text-lg md:text-xl lg:text-2xl leading-[1.6] text-white font-sans">
                                O mercado do Design (em todas as suas áreas) tem uma demanda gigante,
                                mas faltam profissionais qualificados para fechar projetos <span className="bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent font-medium">ou conseguir empregos que realmente pagam bem.</span>
                            </p>

                            <p className="text-lg md:text-xl lg:text-2xl leading-[1.6] text-white font-sans">
                                É para solucionar esse problema de uma vez por todas que criei a <span className="text-white font-bold">Design Hack</span>.
                                Agora você pode dominar a lógica por trás da estética, comandar projetos,
                                ser reconhecido <span className="bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent font-medium">pela sua inteligência criativa e cobrar 10x mais caro por isso</span>
                                — não por sorte, mas por valor percebido.
                            </p>

                            <div className="mt-10 md:mt-12 w-full md:w-auto">
                                <button onClick={scrollToPlans} className="group relative overflow-hidden bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] text-black font-extrabold text-sm md:text-lg px-6 py-4 md:px-8 md:py-5 rounded-2xl border-2 border-[#00CBD9]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:scale-105 hover:shadow-[0_0_50px_rgba(0,203,217,0.6)] transition-all duration-300 uppercase tracking-wider font-sans flex items-center justify-center gap-2 md:gap-3 whitespace-nowrap w-full md:w-auto">
                                    <div className="absolute inset-0 bg-white/40 w-[200%] animate-shimmer-sweep opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <Rocket className="w-6 h-6 md:w-6 md:h-6 shrink-0" />
                                    <span className="relative z-10">QUERO SUBIR DE NÍVEL AGORA</span>
                                </button>
                            </div>
                        </div>

                        {/* IMAGE CONTENT */}
                        <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end w-full mb-2 lg:mb-0 lg:mt-0">
                            {/* will-change-transform added for scroll animation performance */}
                            <div ref={devicesWrapperRef} className="relative w-full max-w-[550px] md:max-w-[700px] lg:max-w-[850px] flex justify-center will-change-transform">
                                <PremiumTiltCard />
                            </div>
                        </div>

                    </div>
                </div>

                {/* ==========================================
            SECTION 5: INSTRUCTOR & AUTHORITY
           ========================================== */}
                <div ref={instructorSectionRef} className="relative w-full pt-4 md:pt-10 pb-12 md:pb-24 px-4 bg-black overflow-hidden [content-visibility:auto]">
                    <div className="relative z-10 max-w-7xl mx-auto flex flex-col">

                        {/* 1. Intro Text */}
                        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
                            <p className="text-[clamp(16px,1.8vw,22px)] text-[#B4B4B4] mb-4 font-sans">
                                Talvez você ainda <span className="bg-gradient-to-r from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent">não me conheça...</span>
                            </p>
                            <h2 className="text-[clamp(28px,4.5vw,52px)] font-bold leading-[1.25] font-sans">
                                <span className="text-white block md:inline">Prazer, meu nome é</span>{' '}
                                <span className="bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent block md:inline">
                                    Anderson Ramon Meisterlin
                                </span>
                            </h2>
                        </div>

                        {/* 2. Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-10 items-center mb-16">

                            {/* Left: Mentor Hero Image */}
                            <div className="flex justify-center lg:justify-end order-1">
                                {/* Overflow hidden wrapper for zoom effect masking */}
                                <div className="relative w-full max-w-[300px] md:max-w-[360px] lg:max-w-[380px] overflow-hidden rounded-[24px]">
                                    {/* Zoom Target - will-change managed dynamically by GSAP */}
                                    <img
                                        ref={mentorPortraitRef}
                                        src={ASSETS.MENTOR_PORTRAIT}
                                        alt="Anderson Ramon Meisterlin"
                                        className="w-full h-full object-cover border-[3px] border-[#00CBD9]/50"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                            </div>

                            {/* Right: Credentials Pills */}
                            <div ref={pillsContainerRef} className="flex flex-col gap-3 md:gap-4 w-full order-2">
                                <CredentialPill text="Designer da Topper Brasil especializado em Footwear" />
                                <CredentialPill text="Mais de 10 anos na indústria" />
                                <CredentialPill text="Mais de 150 mil investidos em conhecimento e formação" />
                                <CredentialPill text="Entre os 32 Melhores Designers do Mundo na categoria apparel em 2019" />
                                <CredentialPill text="Diversos Prêmios de Design ao longo da carreira" />
                                <CredentialPill text="Skin in the Game, tudo o que ensino eu vivo no dia a dia" />
                            </div>

                        </div>

                        {/* 3. Brand Carousel */}
                        <div className="flex flex-col items-center w-full mt-0 mb-8">
                            <h3 className="text-center font-bold uppercase tracking-wider mb-6 md:mb-8 text-[20px]" style={{ letterSpacing: '2px', color: '#FFFFFF' }}>
                                Marcas que Já Colaborei
                            </h3>

                            {/* Full Screen Breakout Container */}
                            <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden h-[100px] md:h-[120px] flex items-center">

                                {/* Gradient overlays for both desktop and mobile */}
                                <div
                                    className="absolute left-0 top-0 h-full w-[80px] md:w-[250px] pointer-events-none z-10"
                                    style={{ background: 'linear-gradient(to right, #000000 0%, #000000 15%, rgba(0, 0, 0, 0.8) 30%, transparent 100%)' }}
                                />

                                {/* Infinite Track */}
                                <div className="flex gap-[60px] md:gap-[80px] animate-brand-scroll w-max hover:[animation-play-state:paused] will-change-transform">
                                    {/* Group 1 */}
                                    <div className="flex items-center gap-[60px] md:gap-[80px] flex-shrink-0 px-[30px]">
                                        {ASSETS.BRAND_LOGOS.map((logo, index) => (
                                            <img
                                                key={`brand-1-${index}`}
                                                src={logo}
                                                alt={`Brand ${index}`}
                                                loading="lazy"
                                                decoding="async"
                                                className="brand-logo h-[40px] md:h-[65px] w-auto max-w-[130px] md:max-w-[180px] flex-shrink-0 opacity-65 transition-all duration-600"
                                                style={{
                                                    filter: 'grayscale(1) invert(1) contrast(3) brightness(2)',
                                                    mixBlendMode: 'screen',
                                                    backgroundColor: 'transparent'
                                                }}
                                            />
                                        ))}
                                    </div>
                                    {/* Group 2 */}
                                    <div className="flex items-center gap-[60px] md:gap-[80px] flex-shrink-0 px-[30px]" aria-hidden="true">
                                        {ASSETS.BRAND_LOGOS.map((logo, index) => (
                                            <img
                                                key={`brand-2-${index}`}
                                                src={logo}
                                                alt={`Brand ${index}`}
                                                loading="lazy"
                                                decoding="async"
                                                className="brand-logo h-[40px] md:h-[65px] w-auto max-w-[130px] md:max-w-[180px] flex-shrink-0 opacity-65 transition-all duration-600"
                                                style={{
                                                    filter: 'grayscale(1) invert(1) contrast(3) brightness(2)',
                                                    mixBlendMode: 'screen',
                                                    backgroundColor: 'transparent'
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Gradient overlays for both desktop and mobile */}
                                <div
                                    className="absolute right-0 top-0 h-full w-[80px] md:w-[250px] pointer-events-none z-10"
                                    style={{ background: 'linear-gradient(to left, #000000 0%, #000000 15%, rgba(0, 0, 0, 0.8) 30%, transparent 100%)' }}
                                />
                            </div>
                        </div>

                        {/* CTA below Brands */}
                        <div className="mt-8 flex justify-center w-full">
                            <button onClick={scrollToPlans} className="group relative overflow-hidden bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] text-black font-extrabold text-sm md:text-lg px-6 py-4 md:px-8 md:py-5 rounded-2xl border-2 border-[#00CBD9]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:scale-105 hover:shadow-[0_0_50px_rgba(0,203,217,0.6)] transition-all duration-300 uppercase tracking-wider font-sans flex items-center justify-center gap-2 md:gap-3 whitespace-nowrap w-full md:w-auto">
                                <div className="absolute inset-0 bg-white/40 w-[200%] animate-shimmer-sweep opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <Rocket className="w-6 h-6 md:w-6 md:h-6 shrink-0" />
                                <span className="relative z-10">QUERO SUBIR DE NÍVEL AGORA</span>
                            </button>
                        </div>

                    </div>
                </div>

                {/* ==========================================
            SECTION 6: COURSE DIFFERENTIALS
           ========================================== */}
                <div ref={differentialsRef} className="relative w-full pt-16 pb-12 md:pt-24 md:pb-16 px-4 bg-black overflow-hidden border-t border-white/5 flex flex-col items-center text-center [content-visibility:auto]">
                    <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col items-center text-center w-full">

                        {/* 
                    MOBILE OPTIMIZATION:
                    - Reduced shadow spread on the 'Atenção' box for mobile.
                */}
                        <div className="mb-6 px-6 py-2 bg-[#FC2C54] rounded-lg shadow-md md:shadow-[0_0_20px_rgba(252,44,84,0.4)] mx-auto w-fit flex flex-col items-center justify-center text-center">
                            <p className="text-white font-bold text-sm md:text-base uppercase tracking-wider text-center leading-tight">
                                Atenção: Isso não é mais um <br className="md:hidden" /> curso convencional
                            </p>
                        </div>

                        <h3 className="text-center text-[clamp(32px,5vw,56px)] leading-[1.3] mb-8 md:mb-12 font-sans max-w-5xl mx-auto">
                            <span className="text-white font-normal block md:inline">É uma verdadeira Academia de Design.</span>{' '}
                            <span className="bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent font-bold block md:inline">
                                Diferente de tudo que você já viu!
                            </span>
                        </h3>

                        <div ref={diffCardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full justify-items-center px-0 md:px-2">
                            <DifferentialCard
                                icon={<Brain />}
                                title="TEORIA COLOCADA EM PRÁTICA"
                                desc="Fácil de entender. Didática com passo a passo usando apenas ferramentas"
                                highlight="GRATUITAS"
                            />
                            <DifferentialCard
                                icon={<CheckCheck />}
                                title="TUDO O QUE EU SEI RÁPIDO E EFICIENTE"
                                desc="Conteúdos que já investi mais de"
                                highlight="150mil e levei mais de 10 anos para descobrir. Você acessa agora com um clique."
                            />
                            <DifferentialCard
                                icon={<Users />}
                                title="ÁREA DE MEMBROS EXCLUSIVA"
                                desc="Vou pegar na sua mão. Você não precisa passar anos numa sala de aula, nem se endividar com"
                                highlight="mensalidades absurdas."
                            />
                            <DifferentialCard
                                icon={<Flame />}
                                title="ALTA DEMANDA"
                                desc="As empresas e clientes estão"
                                highlight="desesperados por designers profissionais de qualidade."
                            />
                        </div>

                        <div className="mt-8 md:mt-12 w-full md:w-auto">
                            <button onClick={scrollToPlans} className="group relative overflow-hidden bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] text-black font-extrabold text-sm md:text-lg px-6 py-4 md:px-8 md:py-5 rounded-2xl border-2 border-[#00CBD9]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:scale-105 hover:shadow-[0_0_50px_rgba(0,203,217,0.6)] transition-all duration-300 uppercase tracking-wider font-sans flex items-center justify-center gap-2 md:gap-3 whitespace-nowrap w-full md:w-auto">
                                <div className="absolute inset-0 bg-white/40 w-[200%] animate-shimmer-sweep opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <Rocket className="w-6 h-6 md:w-6 md:h-6 shrink-0" />
                                <span className="relative z-10">QUERO SUBIR DE NÍVEL AGORA</span>
                            </button>
                        </div>

                    </div>
                </div>

                {/* ==========================================
            REMAINING SECTIONS (Kept as is, assuming they are lighter)
           ========================================== */}
                <SectionSeven scrollerRef={scrollContainerRef} />
                <SectionEight scrollerRef={scrollContainerRef} />
                <SectionNine scrollerRef={scrollContainerRef} />
                <SectionTen scrollerRef={scrollContainerRef} />
                <SectionEleven scrollerRef={scrollContainerRef} />
                <SectionTwelve scrollerRef={scrollContainerRef} />
                <SectionThirteen scrollerRef={scrollContainerRef} />
                <SectionFourteen scrollerRef={scrollContainerRef} />
                <SectionComparison scrollerRef={scrollContainerRef} />
                <SectionFifteen scrollerRef={scrollContainerRef} />
                <SectionSixteen scrollerRef={scrollContainerRef} />
                <SectionSeventeen scrollerRef={scrollContainerRef} />
                <SectionEighteen scrollerRef={scrollContainerRef} />
                <SectionNineteen />
                <SectionTwenty scrollerRef={scrollContainerRef} />
                <SectionTwentyOne scrollerRef={scrollContainerRef} />
                <Footer />

            </div>

            {/* 
          OPTIMIZED STYLES 
          - Brand Logo Hover: Existing logic.
          - Differential Icons: Moved drop-shadow to desktop-only media query.
      */}
            <style>{`
        .brand-logo:hover {
            opacity: 1 !important;
            filter: grayscale(1) invert(1) contrast(3) brightness(2) drop-shadow(0 0 5px rgba(0, 217, 255, 0.8)) !important;
            transform: scale(1.12);
        }
        @media (min-width: 768px) {
            .diff-icon-shadow {
                filter: drop-shadow(0 0 2px rgba(0,203,217,0.8)) drop-shadow(0 0 8px rgba(0,203,217,0.4));
            }
        }
      `}</style>

        </div>
    );
});

// Helper Component for Credential Pills
const CredentialPill = ({ text }: { text: string }) => (
    <div className="group relative flex items-center p-4 md:px-6 md:py-5 bg-gradient-to-b from-[#3a2d00]/40 to-black border border-[#FFD700]/50 rounded-xl shadow-none md:shadow-[0_0_15px_rgba(255,215,0,0.1)] hover:shadow-[0_0_30px_rgba(255,215,0,0.25)] hover:border-[#FFD700] transition-all duration-300 w-full overflow-hidden">
        {/* Subtle Gold Hover Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Icon with Neon Glow */}
        <div className="mr-4 shrink-0 mt-0.5 relative z-10 drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]">
            <Check className="w-6 h-6 text-[#FFD700]" strokeWidth={2.5} />
        </div>

        <p className="text-gray-100 text-base md:text-lg font-medium leading-relaxed font-sans relative z-10 group-hover:text-white transition-colors">
            {text}
        </p>
    </div>
);

// SUPER PROFESSIONAL GRADIENT CARD REDESIGN - OPTIMIZED FOR MOBILE PERFORMANCE
const DifferentialCard = ({ icon, title, desc, highlight }: { icon: React.ReactNode, title: string, desc: string, highlight?: string }) => (
    <div className="group relative w-full md:max-w-[300px] h-full">
        {/* 
          MOBILE OPTIMIZATION: 
          - Disabled hover lift on mobile (md:group-hover).
      */}
        <div className="h-full transition-transform duration-300 md:group-hover:-translate-y-2">

            {/* 
              MOBILE OPTIMIZATION: 
              - Reduced shadow to 'shadow-sm' on mobile.
              - Complex hover shadow only on desktop.
          */}
            <div className="relative h-full rounded-2xl p-[1px] bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] shadow-sm md:shadow-[0_0_15px_rgba(0,203,217,0.15)] md:group-hover:shadow-[0_0_30px_rgba(0,203,217,0.4)] transition-shadow duration-300">

                <div className="relative h-full w-full rounded-[14px] bg-[#010409] overflow-hidden">

                    {/* 
                      MOBILE OPTIMIZATION: 
                      - Hidden shimmer sweep animation on mobile to save GPU.
                  */}
                    <div className="hidden md:block absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-200%] group-hover:animate-shimmer-sweep pointer-events-none" />

                    <div className="p-4 md:p-5 flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-4 h-full">

                        <div className="shrink-0 relative z-10">
                            {/* 
                            MOBILE OPTIMIZATION: 
                            - Reduced background blur radius.
                         */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#00CBD9] opacity-20 blur-[8px] md:blur-[15px] rounded-full"></div>

                            {/* 
                            MOBILE OPTIMIZATION: 
                            - Removed inline style filter.
                            - Added 'diff-icon-shadow' class which applies drop-shadow ONLY on desktop via CSS.
                         */}
                            {React.isValidElement(icon)
                                ? React.cloneElement(icon as React.ReactElement<any>, {
                                    stroke: "#00CBD9",
                                    className: "w-10 h-10 md:w-14 md:h-14 transition-all duration-300 diff-icon-shadow",
                                })
                                : icon
                            }
                        </div>

                        <div className="flex flex-col gap-1">
                            <h3 className="text-white font-bold text-lg md:text-xl uppercase tracking-wide leading-tight">
                                {title}
                            </h3>
                            <p className="text-gray-300 font-medium text-sm md:text-base leading-relaxed">
                                {desc} {highlight && <span className="bg-gradient-to-r from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent font-bold">{highlight}</span>}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
);
