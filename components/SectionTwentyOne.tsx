
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSETS } from '../constants';
import { Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SectionTwentyOneProps {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}

export const SectionTwentyOne: React.FC<SectionTwentyOneProps> = ({ scrollerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // --- DESKTOP ANIMATIONS (High Fidelity) ---
      mm.add("(min-width: 768px)", () => {
        // 1. Quote Animation (Fade Up)
        gsap.fromTo(quoteRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              scroller: scrollerRef.current,
              start: "top 60%"
            }
          }
        );

        // 2. Narrative Text Animation (Staggered Fade)
        if (narrativeRef.current) {
          gsap.fromTo(narrativeRef.current.children,
            { y: 30, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out",
              scrollTrigger: {
                trigger: narrativeRef.current,
                scroller: scrollerRef.current,
                start: "top 70%"
              }
            }
          );
        }
      });

      // --- MOBILE ANIMATIONS (High Performance) ---
      mm.add("(max-width: 767px)", () => {
        // 1. Quote Animation (Faster, Less Distance)
        gsap.fromTo(quoteRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              scroller: scrollerRef.current,
              start: "top 65%"
            }
          }
        );

        // 2. Narrative Text Animation (Batch Fade - No Stagger for smoothness)
        if (narrativeRef.current) {
          gsap.fromTo(narrativeRef.current.children,
            { y: 20, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out", // Very fast stagger
              scrollTrigger: {
                trigger: narrativeRef.current,
                scroller: scrollerRef.current,
                start: "top 75%"
              }
            }
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [scrollerRef]);

  return (
    <section
      ref={containerRef}
      className="relative w-full flex flex-col"
    >
      {/* --- PART 1: THE QUOTE (Dark/Mystical) --- */}
      <div className="relative w-full py-10 md:py-32 bg-[#020608] overflow-hidden flex items-center justify-center">

        {/* Background Image / Atmosphere */}
        <div className="absolute inset-0 z-0">
          {/* Fallback dark gradient foundation */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#001E24] via-[#050b14] to-[#000000]"></div>

          {/* Subtle Clouds / Fog Effect - MOBILE OPTIMIZATION: Hidden on mobile */}
          <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(circle_at_top,_rgba(0,203,217,0.2)_0%,_transparent_60%)] hidden md:block"></div>

          {/* Optional Texture Overlay - MOBILE OPTIMIZATION: Hidden on mobile */}
          <div
            className="absolute inset-0 opacity-20 mix-blend-overlay hidden md:block"
            style={{ backgroundImage: `url(${ASSETS.NOISE_TEXTURE})` }}
          ></div>
        </div>

        <div ref={quoteRef} className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          {/* Decorative Line */}
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#FFD700] to-transparent mx-auto mb-6 opacity-60"></div>

          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl leading-tight md:leading-snug text-[#E5E5E5] drop-shadow-lg">
            "O povo amaldiçoa aquele que <br className="hidden md:block" />
            <span className="text-[#FFD700] font-semibold italic">esconde o trigo</span>, mas <br className="hidden md:block" />
            a bênção coroa aquele <br className="hidden md:block" />
            que logo se dispõe a <span className="text-[#FFD700] font-semibold italic">vendê-lo</span>."
          </h2>

          <p className="mt-8 text-sm md:text-base tracking-[0.2em] text-[#00CBD9] font-sans uppercase font-bold">
            Provérbios 11:26
          </p>

          {/* Decorative Line Bottom */}
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#FFD700] via-transparent to-transparent mx-auto mt-6 opacity-60"></div>

          <p className="text-sm md:text-[10px] uppercase tracking-widest text-gray-500 mt-2">Bíblia Divina</p>
        </div>
      </div>

      {/* --- PART 2: THE NARRATIVE (Light/Sketch) --- */}
      <div className="relative w-full py-10 md:py-28 bg-[#F0F0F0] text-[#1A1A1A] overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={ASSETS.BACKGROUND_FUNDO}
            alt="Background"
            className="w-full h-full object-cover opacity-30"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Background Texture (Sneaker Sketches) - MOBILE OPTIMIZATION: Simplified blend mode */}
        <div className="absolute inset-0 z-0 opacity-[0.05] md:opacity-[0.07] pointer-events-none mix-blend-normal md:mix-blend-multiply md:filter md:grayscale">
          <img
            src={ASSETS.PORTFOLIO.SKETCH}
            alt="Sketch Pattern"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Vignette to focus center */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#F0F0F0_90%)]"></div>

        <div ref={narrativeRef} className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col gap-8 md:gap-10 text-center text-lg md:text-lg leading-relaxed font-sans font-medium text-[#333]">

          <p>
            E depois de ler isso, me dei conta de que <span className="font-bold text-black">o trigo nesse caso, é o meu conhecimento e minha experiência.</span>
          </p>

          <p>
            Logo, ao invés de ficar com tudo isso só pra mim e me beneficiar sozinho... percebi que serei muito mais abençoado se <span className="font-bold text-black bg-[#00CBD9]/10 px-1 rounded">compartilhar minha sabedoria</span> para ajudar e fazer o bem a outras pessoas.
          </p>

          <p>
            Dessa forma, eu <strong className="text-black underline decoration-[#00CBD9] decoration-2 underline-offset-4">Anderson Ramon Meisterlin</strong> assumi a responsabilidade e a missão de potencializar a sua carreira no universo do Design.
          </p>

          {/* MOBILE OPTIMIZATION: Removed backdrop-blur, used solid opacity color instead */}
          <div className="p-6 md:p-8 bg-white/90 md:bg-white/60 md:backdrop-blur-sm border border-black/5 rounded-2xl shadow-sm">
            <p className="text-lg md:text-xl text-black font-bold mb-0">
              Esta academia é perfeita para designers aspirantes e profissionais.
            </p>
            <p className="mt-4 text-sm md:text-base text-gray-600">
              Todos que desejam desenvolver novas habilidades, aprender atalhos, se valorizar no mercado e consequentemente <span className="text-[#009CA8] text-2xl font-black block mt-2 md:inline md:mt-0">ganhar muito bem para isso!</span>
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 mt-4">
            <p className="text-lg md:text-2xl font-bold text-black">
              Conte comigo.
            </p>
            <div className="flex items-center gap-2 text-base md:text-xl font-medium text-gray-700">
              Vamos juntos nessa? <Rocket className="text-[#00CBD9] animate-bounce" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
