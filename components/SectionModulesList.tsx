
import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, PlayCircle, Package, MonitorPlay, Rocket } from 'lucide-react';
import { scrollToPlans } from '../utils/scroll';

gsap.registerPlugin(ScrollTrigger);

interface SectionModulesListProps {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}

// Detailed Content for the Modules
const MODULE_DETAILS = [
  {
    title: "01. BOAS VINDAS – Start Hack",
    lessons: [
      "BOAS VINDAS – o Play Inicial para Subir de Nível"
    ]
  },
  {
    title: "02. DESIGN HACK PRO – Formação Completa o conteúdo de +150K",
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
    title: "03. WORKFLOW – Como Eu Trabalho + Ferramentas Secretas",
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
    title: "04. INTELIGÊNCIA ARTIFICIAL – O Que Realmente Funciona",
    lessons: [
      "I.A. QUE FUNCIONA – Parte I",
      "I.A. QUE FUNCIONA – Parte II"
    ]
  },
  {
    title: "05. PORTFÓLIO IMBATÍVEL – Irresistível e Lucrativo",
    lessons: [
      "PORTFÓLIO IMBATÍVEL – Parte I",
      "PORTFÓLIO IMBATÍVEL – Parte II – Na Prática"
    ]
  },
  {
    title: "06. CORPO E MENTE – Produtividade Extrema",
    lessons: [
      "NOSSO CORPO É O NOSSO TEMPLO",
      "PRODUTIVIDADE E PERFORMANCE"
    ]
  },
  {
    title: "07. EMPREENDEDORISMO – Passo a Passo da Ideia ao Lucro",
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
    title: "08. ESPIRITUALIDADE – A Força Invisível",
    lessons: [
      "O PODER DA FÉ"
    ]
  },
  {
    title: "09. 📌 BÔNUS – 📌 Conteúdo Extra Acelerador",
    lessons: [
      "Como Baixar e Instalar Softwares de Design - PHOTOSHOP, ILLUSTRATOR, RHINOCEROS",
      "ESTEVAN HANSEN – Inteligência de Mercado Aplicada ao Design",
      "ROBERTO DOS SANTOS – Design e Carreira",
      "BRUNO FEITOSA – Design na Prática",
      "CIRO RAMBOR – Design e Liderança Criativa",
      "EDUARDO BRAUN – Criatividade, Design e Propósito",
      "WAGNER METZ – Corpo, Mente e Performance",
      "CARLOS PICAUÍ – Design 3D",
      "VIVIAN LAUBE – Soft Skills e Comunicação Não Violenta que Constroem Designers de Sucesso"
    ]
  },
  {
    title: "10. GRUPO VIP - Comunidade Exclusiva Design Hack",
    lessons: [
      "Acesso à Comunidade Exclusiva",
      "Networking com Designers Profissionais",
      "Suporte e Mentoria da Comunidade",
      "Oportunidades de Colaboração"
    ]
  }
];

export const SectionModulesList: React.FC<SectionModulesListProps> = ({ scrollerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleModule = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    if (!scrollerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // --- List Entrance (Optimized for Mobile) ---
      // DESKTOP: Full stagger
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(listRef.current?.children || [],
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out",
            scrollTrigger: {
              trigger: listRef.current,
              scroller: scrollerRef.current,
              start: "top 80%"
            }
          }
        );
      });

      // MOBILE: Faster stagger, less movement distance to reduce layout cost
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(listRef.current?.children || [],
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

      // Stats Entrance
      if (statsRef.current) {
        gsap.fromTo(statsRef.current.children,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: statsRef.current,
              scroller: scrollerRef.current,
              start: "top 85%"
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

    }, containerRef);

    return () => ctx.revert();
  }, [scrollerRef]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-16 md:py-24 bg-[#0A0A0A] overflow-hidden flex flex-col items-center"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center">

        {/* Accordion List - Grid Layout on Desktop */}
        <div
          ref={listRef}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-start mt-4 will-change-transform"
        >
          {MODULE_DETAILS.map((module, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                onClick={() => toggleModule(index)}
                className={`
                                group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 border h-fit
                                ${isOpen
                    ? 'bg-[#05121d] border-[#00CBD9] md:shadow-[0_0_20px_rgba(0,203,217,0.2)]'
                    : 'bg-[#05121d] border-[#00CBD9]/30 hover:border-[#00CBD9] md:hover:shadow-[0_0_15px_rgba(0,203,217,0.1)]'
                  }
                            `}
              >
                {/* Card Header */}
                <div className="p-4 md:p-6 flex items-center justify-between gap-4">
                  <h3 className={`text-base md:text-lg lg:text-xl font-bold font-sans transition-colors ${isOpen ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>
                    {module.title}
                  </h3>

                  {/* Plus Icon */}
                  <div className={`
                                    w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300
                                    ${isOpen
                      ? 'bg-[#00CBD9] text-black rotate-180 md:shadow-[0_0_15px_#00CBD9]'
                      : 'bg-[#00CBD9]/10 text-[#00CBD9] group-hover:bg-[#00CBD9] group-hover:text-black'
                    }
                                `}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
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
                      <div className="px-4 pb-6 md:px-8 md:pb-8">
                        <div className="h-[1px] w-full bg-[#00CBD9]/20 mb-4"></div>
                        <ul className="grid grid-cols-1 gap-3">
                          {module.lessons.map((lesson, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-400 text-sm md:text-base font-sans">
                              <PlayCircle size={14} className="text-[#00CBD9] shrink-0 mt-1" />
                              <span className="leading-relaxed">{lesson}</span>
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



        {/* Stats Section */}
        <div ref={statsRef} className="flex flex-col md:flex-row gap-4 md:gap-8 mt-12 md:mt-16 w-full justify-center">
          <StatPill icon={<Package size={20} />} text="+ 10 CURSOS EM 1" />
          <StatPill icon={<MonitorPlay size={20} />} text="+ 70 AULAS" />
          <StatPill icon={<PlayCircle size={20} />} text="+ 100 HORAS" />
        </div>

        {/* Golden Yellow Motivational Card - Below Stats Section */}
        <div className="mt-8 md:mt-10 w-full flex justify-center">
          <div className="w-full bg-gradient-to-br from-[#3a2d00] via-[#2a2000] to-[#1a1500] border-2 border-[#FFD700] rounded-2xl p-6 md:p-8 shadow-[0_0_40px_rgba(255,215,0,0.3)]">
            <h3 className="text-[#FFD700] font-black text-2xl md:text-4xl text-center uppercase tracking-wider leading-tight" style={{ textShadow: '0 0 20px rgba(255,215,0,0.6), 0 2px 4px rgba(0,0,0,0.8)' }}>
              Em 7 dias você vai estar em outro nível!
            </h3>
          </div>
        </div>

        {/* New CTA Button */}
        <div ref={ctaRef} className="mt-12 md:mt-16 w-full flex justify-center">
          <button onClick={scrollToPlans} className="group relative overflow-hidden bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] text-black font-extrabold text-sm md:text-lg px-6 py-4 md:px-8 md:py-5 rounded-2xl border-2 border-[#00CBD9]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:scale-105 hover:shadow-[0_0_50px_rgba(0,203,217,0.6)] transition-all duration-300 uppercase tracking-wider font-sans flex items-center justify-center gap-2 md:gap-3 whitespace-nowrap w-full md:w-auto">
            <div className="absolute inset-0 bg-white/40 w-[200%] animate-shimmer-sweep opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Rocket className="w-6 h-6 md:w-6 md:h-6 shrink-0" />
            <span className="relative z-10">QUERO SUBIR DE NÍVEL AGORA</span>
          </button>
        </div>



      </div>
    </section>
  );
};

// Stat Pill Component (Mobile Optimized: Removed heavy shadows on mobile)
const StatPill = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <div className="flex items-center gap-3 px-8 py-4 rounded-2xl border border-[#00CBD9] bg-[#05121d] md:shadow-[0_0_15px_rgba(0,203,217,0.15)] min-w-[220px] justify-center md:hover:shadow-[0_0_25px_rgba(0,203,217,0.3)] transition-all duration-300">
    <div className="text-[#00CBD9]">
      {icon}
    </div>
    <span className="text-white font-bold text-lg font-sans tracking-wide">
      {text}
    </span>
  </div>
);
