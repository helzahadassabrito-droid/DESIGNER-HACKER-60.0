
import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Plus, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SectionTwentyProps {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}

const FAQS = [
  {
    question: "O curso é para iniciantes?",
    answer: "Sim! O curso foi desenhado para levar você do zero absoluto até o nível profissional. Abordamos desde os fundamentos até técnicas avançadas."
  },
  {
    question: "Quanto tempo de acesso eu tenho?",
    answer: "Depende do plano escolhido. No Plano Vitalício, o acesso é para sempre, incluindo todas as atualizações futuras."
  },
  {
    question: "Preciso saber desenhar?",
    answer: "Não! O método ensina técnicas que não dependem de dom artístico, mas sim de fundamentos de design e uso de ferramentas."
  },
  {
    question: "Tem certificado?",
    answer: "Sim, ao concluir todas as aulas você recebe um certificado oficial de conclusão válido em todo território nacional."
  },
  {
    question: "Como funciona o suporte?",
    answer: "Você terá acesso à nossa comunidade exclusiva onde eu e minha equipe tiramos dúvidas diariamente."
  },
  {
    question: "E se eu não gostar?",
    answer: "Você tem 7 dias de garantia incondicional. Se não gostar, devolvemos 100% do seu dinheiro. Risco zero."
  }
];

export const SectionTwenty: React.FC<SectionTwentyProps> = ({ scrollerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    if (!scrollerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Header Animation
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            scroller: scrollerRef.current,
            start: "top 70%"
          }
        }
      );

      // List Animation (Stagger)
      mm.add("(min-width: 768px)", () => {
          gsap.fromTo(listRef.current?.children || [],
            { y: 30, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
              scrollTrigger: {
                trigger: listRef.current,
                scroller: scrollerRef.current,
                start: "top 70%"
              }
            }
          );
      });

      mm.add("(max-width: 767px)", () => {
          gsap.fromTo(listRef.current?.children || [],
            { y: 20, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out",
              scrollTrigger: {
                trigger: listRef.current,
                scroller: scrollerRef.current,
                start: "top 75%"
              }
            }
          );
      });

      // CTA Animation
      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        {
           y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power2.out",
           scrollTrigger: {
              trigger: ctaRef.current,
              scroller: scrollerRef.current,
              start: "top 80%"
           }
        }
     );

    }, containerRef);

    return () => ctx.revert();
  }, [scrollerRef]);

  return (
    <section 
        ref={containerRef}
        className="relative w-full py-12 md:py-24 bg-[#0A0A0A] overflow-hidden flex flex-col items-center border-t border-white/5"
    >
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center">
            
            {/* Header */}
            <div ref={headerRef} className="text-center mb-10 md:mb-16">
                <div className="inline-flex items-center gap-2 mb-4">
                    <MessageCircle className="text-[#00CBD9]" size={20} />
                    <span className="text-gray-500 text-xs md:text-sm uppercase tracking-[0.3em] font-bold font-sans">
                        DÚVIDAS FREQUENTES
                    </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-sans font-bold text-white leading-tight">
                    Ficou com alguma <br className="md:hidden" />
                    <span className="bg-gradient-to-r from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent">Dúvida?</span>
                </h2>
            </div>

            {/* FAQ List */}
            <div ref={listRef} className="w-full flex flex-col gap-3 md:gap-4">
                {FAQS.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div 
                            key={index}
                            onClick={() => toggleFAQ(index)}
                            className={`
                                group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 border
                                ${isOpen 
                                    ? 'bg-[#05121d] border-[#00CBD9] md:shadow-[0_0_20px_rgba(0,203,217,0.15)]' 
                                    : 'bg-[#0E0E0E] border-white/5 hover:border-[#00CBD9]/50'
                                }
                            `}
                        >
                            <div className="p-5 md:p-6 flex items-start justify-between gap-4">
                                <h3 className={`text-base md:text-lg font-bold font-sans leading-snug transition-colors ${isOpen ? 'text-[#00CBD9]' : 'text-gray-200 group-hover:text-white'}`}>
                                    {faq.question}
                                </h3>
                                <div className={`
                                    w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300
                                    ${isOpen ? 'rotate-45 bg-[#00CBD9] text-black' : 'bg-white/10 text-gray-400 group-hover:bg-[#00CBD9] group-hover:text-black'}
                                `}>
                                    <Plus size={16} />
                                </div>
                            </div>
                            
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-5 pb-6 md:px-6 md:pb-8 pt-0">
                                            <p className="text-gray-400 text-sm md:text-base leading-relaxed border-t border-white/5 pt-4">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            {/* CTA */}
            <div ref={ctaRef} className="mt-12 md:mt-16 w-full flex justify-center">
                 <button onClick={scrollToPlans} className="group relative overflow-hidden bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] text-black font-extrabold text-sm md:text-lg px-6 py-4 md:px-8 md:py-5 rounded-2xl border-2 border-[#00CBD9]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:scale-105 hover:shadow-[0_0_50px_rgba(0,203,217,0.6)] transition-all duration-300 uppercase tracking-wider font-sans flex items-center justify-center gap-2 md:gap-3 whitespace-nowrap w-full md:w-auto">
                    <div className="absolute inset-0 bg-white/40 w-[200%] animate-shimmer-sweep opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Rocket className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="relative z-10">QUERO SUBIR DE NÍVEL AGORA</span>
                </button>
            </div>

        </div>
    </section>
  );
};
