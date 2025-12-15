
import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Plus, MessageCircle } from 'lucide-react';
import { MessageCircle as WhatsAppIcon } from 'lucide-react';
import { scrollToPlans } from '../utils/scroll';

gsap.registerPlugin(ScrollTrigger);

interface SectionTwentyProps {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}

const FAQS = [
  {
    question: "Por que o Design Hack Academy é diferente de outros cursos?",
    answer: "Porque além de te ensinar ferramentas — te ensina visão. E não só a minha visão, mas a de vários convidados especiais que atuam na linha de frente, na Elite do Mercado Global.\nEnquanto outros cursos só te mostram \"como fazer\", o Design Hack te mostra \"por que fazer\". É um curso de design para quem quer entender o cérebro por trás de qualquer produção.\n\n💡 O design muda quando você entende as pessoas — não só os pixels."
  },
  {
    question: "E se eu não for bom o suficiente. O conteúdo é muito complexo pra mim?",
    answer: "Não. E todo designer já sentiu isso.\nO Design Hack Academy foi criado para simplificar o design, não complicar.\nCada aula traduz o \"designer difícil\" em pensamento visual direto — sem jargão, sem enrolação.\nVocê vai aprender a pensar como um designer estratégico, não decorar atalhos de software.\n\n💡 Design é clareza, não complexidade."
  },
  {
    question: "Faço 20 a 40 artes por dia e ganho pouco. Isso vai mudar depois que eu fizer as aulas?",
    answer: "Sim — mas só se você mudar o jeito que pensa sobre design.\nVocê não ganha pouco porque trabalha pouco. Você ganha pouco porque trabalha como todo mundo.\nDesign Hack Academy foi feito para virar essa chave — para te ensinar o porquê por trás da estética, e transformar o que você cria em valor percebido.\n\nEle te ensina o que a rotina nunca ensina: estratégia, posicionamento e visão criativa.\n\n💡 Enquanto todo mundo te treina pra cumprir prazo, o Design Hack te treina pra criar valor. Menos cliques, mais estratégia."
  },
  {
    question: "Design Hack Academy é caro? Dá muito trabalho?",
    answer: "Caro comparado com o que? Não custa nem 0,5% do que eu já gastei para estar te ensinando todos os conteúdos.\nCaro é continuar preso no ciclo de agência ou qualquer outro lugar que você não tenha tempo nem reconhecimento.\nDesign Hack Academy custa menos que um açaí por mês — e te entrega o conteúdo para reposicionar sua carreira inteira.\nVocê não está comprando um curso. Está comprando clareza, propósito e tempo (que nos dias de hoje é o nosso maior ativo e o melhor artigo de luxo).\n\nE sim, da trabalho — mas o trabalho certo. Inteligente. Cada módulo é pensado para gerar resultado rápido.\n\n💡 Pagar barato pelo aprendizado errado é o investimento mais caro que existe.\n\n💡 Trabalho que transforma não cansa, liberta."
  },
  {
    question: "Tenho bloqueio criativo. A academia Design Hack vai me ajudar?",
    answer: "Ajuda — e muito.\nO bloqueio criativo não é falta de ideia, é excesso de ruído.\nAqui, te ensino a limpar esse ruído e enxergar o design como sistema — um método visual que desperta clareza e autoconfiança.\n\n💡 Criatividade não nasce do caos. Nasce da clareza."
  },
  {
    question: "Quero otimizar meu tempo de criação. Academia Design Hack vai me ajudar?",
    answer: "Exatamente para isso que existe.\nVocê vai aprender a pensar antes de clicar.\nQuando entende o raciocínio visual e psicológico por trás do design, cria com muito mais velocidade e direção.\n\n💡 Você não precisa criar mais rápido. Precisa criar com propósito."
  },
  {
    question: "E se eu já for experiente, ainda faz sentido?",
    answer: "Mais do que nunca.\nO curso é feito para quebrar paradigmas — não importa seu nível técnico.\nDesign Hack é para quem quer evoluir da execução para a direção, da estética para a estratégia.\nÉ o tipo de atualização mental que nenhum software ensina.\n\n💡 Quem já sabe criar precisa agora aprender a pensar."
  },
  {
    question: "Em quanto tempo eu começo a ter resultados?",
    answer: "Depende do seu ritmo, mas a maioria dos alunos começa a ver resultado já nas primeiras semanas.\nPorque o curso foi criado para aplicar o aprendizado na prática, dentro dos projetos que você já faz. Independente da área que você atua.\nO progresso é imediato — o impacto é permanente.\n\n💡 Não é sobre terminar o curso. É sobre começar a pensar diferente."
  },
  {
    question: "Todas as aulas dos módulos estão liberadas?",
    answer: "Sim.\nAo entrar no Design Hack Academy, você tem acesso imediato a todos os módulos — sem bloqueios, sem segredos.\nIsso te permite seguir o seu próprio ritmo, revisitar aulas e aplicar o conteúdo conforme evolui.\n\n💡 Liberdade criativa começa com liberdade de aprendizado."
  },
  {
    question: "Como faço para acessar a academia Design Hack?",
    answer: "Simples.\nAssim que escolher o plano que mais faz sentido pra você, você confirma sua inscrição e após o pagamento (100% seguro) você recebe um e-mail com o link de acesso direto à plataforma.\nO Design Hack Academy é 100% online, pode ser acessado pelo celular, tablet ou computador — de onde e quando quiser.\nSeu progresso fica salvo, e você pode assistir quantas vezes precisar.\n\n💡 Design sem pressa, no seu tempo, no seu ritmo."
  },
  {
    question: "Design Hack Academy tem suporte?",
    answer: "Tem, e é direto.\nVocê pode tirar dúvidas dentro da própria plataforma e dentro do grupo exclusivo Design Hack que permite trocas diretas comigo e com outros alunos — pra tirar qualquer dúvida, compartilhar projetos, feedbacks e evoluções reais.\n\nO suporte do Design Hack é feito pra acelerar o seu aprendizado, não te enrolar.\n\n💡 Aqui, suporte não é resposta automática. É acompanhamento pra te fazer evoluir de verdade."
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
        <div ref={ctaRef} className="mt-12 md:mt-16 w-full flex flex-col items-center gap-6">
          <button onClick={scrollToPlans} className="group relative overflow-hidden bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] text-black font-extrabold text-sm md:text-lg px-6 py-4 md:px-8 md:py-5 rounded-2xl border-2 border-[#00CBD9]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:scale-105 hover:shadow-[0_0_50px_rgba(0,203,217,0.6)] transition-all duration-300 uppercase tracking-wider font-sans flex items-center justify-center gap-2 md:gap-3 whitespace-nowrap w-full md:w-auto">
            <div className="absolute inset-0 bg-white/40 w-[200%] animate-shimmer-sweep opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Rocket className="w-5 h-5 md:w-6 md:h-6" />
            <span className="relative z-10">QUERO SUBIR DE NÍVEL AGORA</span>
          </button>

          {/* WhatsApp Contact Section */}
          <div className="flex flex-col items-center gap-4 w-full">
            <p className="text-white text-base md:text-lg font-medium">Ainda com Dúvida?</p>

            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-sm md:text-base px-6 py-4 md:px-8 md:py-4 rounded-2xl shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:shadow-[0_0_60px_rgba(37,211,102,0.8)] transition-all duration-300 uppercase tracking-wide font-sans flex items-center justify-center gap-3 w-full md:w-auto hover:scale-105"
            >
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <WhatsAppIcon className="w-5 h-5 md:w-6 md:h-6 relative z-10" />
              <span className="relative z-10">ENTRE EM CONTATO COMIGO</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
