"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Sparkles, BookOpen, PenTool, Gift, Mail, Check, AlignLeft } from "lucide-react";
import { PhotoSlot } from "@/components/store/photo-slot";
import { Button } from "@/components/ui/button";

const featuredItems = [
  {
    id: "1",
    name: "Planner Semanal Amanhecer",
    category: "Planners",
    description: "Capa em tecido de linho oliva, miolo em papel pólen 90g e espaço reservado para intenções semanais.",
    price: "R$ 89,90",
    imageLabel: "Fotografia do Planner Amanhecer em mesa com luz da manhã",
    href: "/produtos?categoria=planner",
  },
  {
    id: "2",
    name: "Caderno Costura Manual A5",
    category: "Cadernos",
    description: "Encadernação artesanal exposta, capa dura em tom blush e folhas pontilhadas livres para desenhar caminhos.",
    price: "R$ 49,90",
    imageLabel: "Detalhe da costura exposta do Caderno Blush A5",
    href: "/produtos?categoria=cadernos",
  },
  {
    id: "3",
    name: "Kit Caligrafia Afeto",
    category: "Presentes",
    description: "Caneta gel com escrita fluida, bloco de notas de algodão e fita de algodão desfiada para amarrar ideias.",
    price: "R$ 34,90",
    imageLabel: "Composição com kit de escrita e ramos de lavanda secos",
    href: "/produtos?categoria=presentes",
  },
];

const drawers = [
  {
    id: "organizar",
    label: "Organizar a mente",
    title: "Planners & Diários para o seu próprio tempo.",
    description: "Nossos planners não cobram produtividade. Eles oferecem um refúgio de papel para que suas tarefas ganhem leveza e suas intenções encontrem espaço para florescer.",
    items: ["Planners anuais sem data", "Blocos de notas semanais", "Diários de escrita reflexiva"],
    href: "/produtos?categoria=planner",
    cta: "Explorar planners",
    imageLabel: "Organizador semanal cercado por flores secas e xícara de chá",
  },
  {
    id: "rabiscar",
    label: "Escrever memórias",
    title: "Cadernos que guardam e dão forma a ideias.",
    description: "Capas em tecidos naturais e costura que abre em 180° com suavidade. Papéis de alta gramatura escolhidos para que a tinta de sua caneta deslize sem pressa e sem atravessar.",
    items: ["Cadernos pautados em linho", "Cadernos pontilhados para projetos", "Sketchbooks de folhas lisas"],
    href: "/produtos?categoria=cadernos",
    cta: "Ver coleção de cadernos",
    imageLabel: "Mão segurando caneta escrevendo em caderno de linho aberto",
  },
  {
    id: "presentear",
    label: "Gesto de presente",
    title: "Mimos para lembrar a alguém que ela é querida.",
    description: "Dar um presente é escrever um bilhete de afeto no mundo. Criamos conjuntos e caixas prontas com curadoria especial, ideais para abraçar a rotina de quem você ama.",
    items: ["Caixas de presente completas", "Conjuntos combinados de escrita", "Cartões com envelopes artesanais"],
    href: "/produtos?categoria=presentes",
    cta: "Explorar presentes",
    imageLabel: "Caixa de presente amarrada com laço de algodão desfiado",
  },
  {
    id: "customizar",
    label: "Detalhes de afeto",
    title: "Papelaria criativa que perfuma o dia.",
    description: "Os pequenos complementos que dão personalidade: fitas de linho, selos de cera, marcadores de página magnéticos e adesivos botânicos pintados em aquarela.",
    items: ["Fitas e carimbos artesanais", "Adesivos em aquarela", "Clips dourados e acessórios"],
    href: "/produtos?categoria=canetas",
    cta: "Ver escrita e mimos",
    imageLabel: "Espalho de adesivos florais e carimbo de lacre de cera",
  },
];

const guestbookNotes = [
  {
    text: "Abrir a caixa da Mais que Mimo parece um ritual de cuidado. O perfume delicado, o capricho na fita de linho e a sensação de que cada detalhe foi embrulhado pensando em me acolher.",
    author: "Mariana S.",
    location: "São Paulo",
    rotation: "-rotate-1",
  },
  {
    text: "Meu planner virou meu refúgio dos domingos. Planejo a semana tomando um chá com calma e olhando as páginas de papel polén. Minha rotina ficou mais bonita e gentil.",
    author: "Beatriz M.",
    location: "Rio de Janeiro",
    rotation: "rotate-2",
  },
  {
    text: "Comprei um kit de escrita para presentear uma amiga especial e ela chorou com o bilhete que vocês escreveram à mão. É muito lindo ver uma marca que vende carinho de verdade.",
    author: "Letícia R.",
    location: "Curitiba",
    rotation: "-rotate-2",
  },
];

export function HomeStory() {
  const [activeDrawer, setActiveDrawer] = useState("organizar");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setNewsletterSubscribed(true);
      setEmailInput("");
    }
  };

  const currentDrawer = drawers.find((d) => d.id === activeDrawer) || drawers[0];

  return (
    <div className="flex flex-col overflow-hidden">
      {/* SEÇÃO 1: O UMBRAL (A Entrada da Loja) */}
      <section className="relative px-4 pt-12 pb-20 sm:px-6 sm:pt-16 sm:pb-24 lg:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mqm-reveal flex flex-col items-center">
            {/* Logo emoldurada de forma artística e delicada */}
            <div className="relative mb-6 p-2">
              <div className="absolute inset-0 rounded-full border border-dashed border-[color-mix(in_srgb,var(--mqm-blush-300)_50%,transparent)] animate-[spin_60s_linear_infinite]" />
              <Image
                src="/images.png"
                alt="Logo Mais que Mimo"
                width={130}
                height={130}
                priority
                className="h-28 w-28 rounded-full object-cover shadow-[var(--shadow-sm)]"
              />
            </div>
            
            <p className="font-cursive text-3xl text-[var(--mqm-olive-600)] tracking-wide">
              papelaria afetiva
            </p>
            
            <h1 className="mqm-title mt-4 text-[2.2rem] font-medium leading-[1.1] text-[var(--mqm-olive-800)] sm:text-5xl lg:text-[4rem]">
              A porta está encostada.
              <br />
              <span className="font-cursive text-[2.6rem] text-[var(--mqm-blush-600)] font-normal sm:text-[3.8rem] lg:text-[5rem]">
                Entre sem pressa.
              </span>
            </h1>
            
            <p className="mqm-copy mx-auto mt-6 max-w-xl text-base text-[var(--mqm-olive-800)]/80 sm:text-lg">
              Um refúgio delicado para quem gosta de rabiscar memórias, acalmar os pensamentos e fazer o tempo correr no ritmo suave do coração.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/produtos"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--mqm-olive-700)] px-6 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[var(--shadow-xs)] transition-all duration-[var(--motion-base)] hover:bg-[var(--mqm-olive-800)] hover:shadow-[var(--shadow-sm)]"
              >
                Passear pela papelaria
              </Link>
              <Link
                href="/produtos?categoria=presentes"
                className="inline-flex h-11 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--mqm-olive-200)_60%,transparent)] bg-[color-mix(in_srgb,var(--mqm-warm-50)_85%,transparent)] px-6 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--mqm-olive-800)] transition-all duration-[var(--motion-base)] hover:bg-[var(--mqm-blush-100)]"
              >
                Montar um presente
              </Link>
            </div>
          </div>

          {/* Fotografia da vitrine elegante da papelaria */}
          <div className="mqm-reveal mt-12 sm:mt-16">
            <PhotoSlot 
              className="aspect-[16/7] min-h-[14rem] sm:min-h-[22rem] mqm-organic rounded-[3.5rem_2rem_3.5rem_2rem] shadow-[var(--shadow-xs)]" 
              label="Visão de entrada: Mesa de pinus com luz lateral iluminando cadernos e buquê de lavandas"
            />
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: A MESA DE ENTRADA (Vitrine Assimétrica) */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-24 bg-[color-mix(in_srgb,var(--mqm-warm-200)_35%,transparent)]">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center sm:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--mqm-olive-500)]">Curadoria de Detalhes</p>
            <h2 className="mqm-title mt-2 text-3xl font-semibold leading-tight text-[var(--mqm-olive-800)] sm:text-4xl">
              Três peças para viver no cotidiano
            </h2>
            <p className="mqm-copy mt-3 max-w-xl text-base text-[var(--mqm-olive-700)]/70">
              Itens selecionados não para preencher uma prateleira vazia, mas para dar textura e presença aos seus momentos de pausa.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {featuredItems.map((item, index) => (
              <article 
                key={item.id} 
                className={`flex flex-col bg-[var(--mqm-warm-50)] p-5 rounded-[2rem] border border-[color-mix(in_srgb,var(--border)_50%,transparent)] shadow-[var(--shadow-xs)] transition-transform duration-[var(--motion-slow)] hover:-translate-y-1.5 ${
                  index === 1 ? "md:translate-y-8" : index === 2 ? "md:translate-y-4" : ""
                }`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.3rem_1.3rem_0.8rem_0.8rem]">
                  <PhotoSlot 
                    label={item.imageLabel} 
                    className="h-full w-full absolute inset-0"
                  />
                  <span className="absolute top-3 left-3 bg-[var(--mqm-warm-100)] border border-[color-mix(in_srgb,var(--border)_70%,transparent)] rounded-full px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-[var(--mqm-olive-600)] shadow-sm">
                    {item.category}
                  </span>
                </div>
                
                <div className="mt-5 flex flex-col flex-1">
                  <h3 className="font-display text-xl font-semibold text-[var(--mqm-olive-800)] leading-snug">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--mqm-olive-700)]/75 leading-relaxed flex-1">
                    {item.description}
                  </p>
                  
                  <div className="mt-5 pt-4 border-t border-[color-mix(in_srgb,var(--border)_40%,transparent)] flex items-center justify-between">
                    <span className="text-lg font-display font-medium text-[var(--mqm-olive-800)]">
                      {item.price}
                    </span>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--mqm-olive-700)] transition-colors hover:text-[var(--mqm-blush-700)]"
                    >
                      Segurar na mão
                      <ArrowRight className="size-3.5 transition-transform duration-[var(--motion-fast)] group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          <div className="mt-16 md:mt-24 text-center">
            <Link
              href="/produtos"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--mqm-olive-700)] transition-colors hover:text-[var(--mqm-blush-700)]"
            >
              Ver toda a nossa mesa de produtos
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: O ARMÁRIO DE SENTIMENTOS (Abas interativas das gavetas) */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <p className="font-cursive text-2xl text-[var(--mqm-blush-600)]">o armário da papelaria</p>
            <h2 className="mqm-title mt-1 text-3xl font-semibold text-[var(--mqm-olive-800)] sm:text-4xl">
              Abra a gaveta de intenções
            </h2>
            <p className="mqm-copy mx-auto mt-3 max-w-md text-base text-[var(--mqm-olive-700)]/70">
              Criamos uma organização que respeita sua sensibilidade. O que você gostaria de acolher hoje em sua vida?
            </p>
          </div>

          {/* Abas horizontais no celular / Grid de Gavetas no Desktop */}
          <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-[var(--mqm-warm-100)] rounded-full border border-[color-mix(in_srgb,var(--border)_60%,transparent)] max-w-2xl mx-auto mb-10">
            {drawers.map((drawer) => (
              <button
                key={drawer.id}
                onClick={() => setActiveDrawer(drawer.id)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-[var(--motion-base)] ${
                  activeDrawer === drawer.id
                    ? "bg-[var(--mqm-olive-700)] text-white shadow-sm"
                    : "text-[var(--mqm-olive-700)] hover:bg-[var(--mqm-blush-100)]"
                }`}
              >
                {drawer.label}
              </button>
            ))}
          </div>

          {/* Conteúdo da Gaveta Ativa */}
          <div className="bg-[var(--mqm-warm-50)] rounded-[2.5rem] border border-[color-mix(in_srgb,var(--border)_50%,transparent)] p-6 sm:p-10 shadow-[var(--shadow-sm)] transition-all duration-[var(--motion-base)]">
            <div className="grid gap-8 md:grid-cols-12 md:items-center">
              <div className="md:col-span-5 order-2 md:order-1">
                <p className="text-[10px] uppercase font-bold tracking-widest text-[var(--mqm-blush-600)] bg-[var(--mqm-blush-100)] rounded-full px-3 py-1 inline-block mb-4">
                  {currentDrawer.label}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--mqm-olive-800)] leading-tight">
                  {currentDrawer.title}
                </h3>
                <p className="mt-4 text-sm sm:text-base text-[var(--mqm-olive-700)]/80 leading-relaxed">
                  {currentDrawer.description}
                </p>
                
                <ul className="mt-6 space-y-2.5">
                  {currentDrawer.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs text-[var(--mqm-olive-800)]/85">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--mqm-olive-100)] text-[var(--mqm-olive-700)]">
                        <Check className="size-3" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button asChild variant="brand" className="rounded-full shadow-xs">
                    <Link href={currentDrawer.href} className="gap-2">
                      {currentDrawer.cta}
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="md:col-span-7 order-1 md:order-2">
                <PhotoSlot 
                  className="aspect-[4/3] w-full min-h-[14rem] sm:min-h-[18rem] mqm-organic rounded-[2rem_3.5rem_2rem_3.5rem] shadow-inner" 
                  label={currentDrawer.imageLabel}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: O CANTO DE ESCRITA (Ateliê e Manifesto) */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-24 bg-[var(--mqm-olive-50)]">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Bloco de imagem da escrivaninha */}
            <div className="lg:col-span-6">
              <div className="relative p-2">
                {/* Detalhe flutuante de papel craft */}
                <div className="absolute -top-3 -left-3 h-10 w-10 border-t-2 border-l-2 border-[var(--mqm-blush-300)]" />
                <PhotoSlot
                  className="aspect-[4/5] min-h-[20rem] sm:min-h-[28rem] rounded-[3rem_1rem_3rem_1rem] shadow-[var(--shadow-md)]"
                  label="Detalhe em close-up: Tinteiro vintage, ponta de caneta tinteiro molhada e escrita cursiva secando sobre papel encorpado"
                />
                <div className="absolute -bottom-3 -right-3 h-10 w-10 border-b-2 border-r-2 border-[var(--mqm-blush-300)]" />
              </div>
            </div>

            {/* Bloco do manifesto da escrita */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--mqm-olive-600)]">O Rito do Silêncio</p>
              <h2 className="mqm-title mt-2 text-3xl font-semibold leading-tight text-[var(--mqm-olive-800)] sm:text-4xl lg:text-[2.6rem]">
                Escrever é criar um cantinho para si mesma.
              </h2>
              
              <div className="mt-6 space-y-4 text-base text-[var(--mqm-olive-800)]/85 leading-relaxed">
                <p>
                  O ruído das teclas, a pressa das notificações, as listas de tarefas intermináveis que piscam no telefone. Nós convidamos você para um caminho diferente.
                </p>
                <p>
                  A costura do caderno que se abre totalmente plano na mesa, a textura encorpada de folhas prontas para acolher medos e sonhos, o som sutil da tinta deslizando. A escrita à mão não é uma obrigação do dia; é um abraço íntimo na própria mente.
                </p>
              </div>

              {/* Assinatura poética simulando carimbo manuscrito */}
              <div className="mt-8 flex items-center gap-4">
                <span className="h-10 w-10 rounded-full bg-[var(--mqm-blush-200)]/50 flex items-center justify-center text-[var(--mqm-blush-700)]">
                  <Heart className="size-5 fill-[var(--mqm-blush-500)]/30 text-[var(--mqm-blush-600)]" />
                </span>
                <div>
                  <p className="font-cursive text-2xl text-[var(--mqm-blush-700)] leading-none">
                    Com carinho,
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--mqm-olive-700)] mt-1">
                    Equipe Mais que Mimo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: A ARTE DE PRESENTEAR (Gesto de Cuidado) */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--mqm-olive-500)]">Ritual de Embrulho</p>
          <h2 className="mqm-title mt-2 text-3xl font-semibold text-[var(--mqm-olive-800)] sm:text-4xl">
            Como enviamos o seu carinho
          </h2>
          <p className="mqm-copy mx-auto mt-4 max-w-xl text-base text-[var(--mqm-olive-700)]/70">
            Não jogamos caixas em sacos plásticos cinzas. Cada embrulho é composto de pequenos toques delicados que mostram respeito a quem vai receber.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--mqm-blush-100)] text-[var(--mqm-blush-600)] shadow-sm">
                <Gift className="size-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-[var(--mqm-olive-800)] mt-4">1. Curadoria do Mimo</h3>
              <p className="text-sm text-[var(--mqm-olive-700)]/75 mt-2 max-w-[15rem] leading-relaxed">
                Você escolhe as peças e nós organizamos em uma caixa rígida, aninhada em papel de seda macio.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--mqm-olive-100)] text-[var(--mqm-olive-600)] shadow-sm">
                <PenTool className="size-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-[var(--mqm-olive-800)] mt-4">2. Bilhete Escrito à Mão</h3>
              <p className="text-sm text-[var(--mqm-olive-700)]/75 mt-2 max-w-[15rem] leading-relaxed">
                Você dita as palavras no carrinho e nós transcrevemos em um cartão elegante com caneta tinteiro.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--mqm-blush-200)]/30 text-[var(--mqm-blush-700)] shadow-sm">
                <Sparkles className="size-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-[var(--mqm-olive-800)] mt-4">3. Aroma & Ramos</h3>
              <p className="text-sm text-[var(--mqm-olive-700)]/75 mt-2 max-w-[15rem] leading-relaxed">
                Perfumamos o interior com nossa essência floral e finalizamos com um ramo de lavandas secas.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <PhotoSlot 
              className="aspect-[16/6] min-h-[12rem] sm:min-h-[18rem] mqm-organic rounded-[2rem] shadow-xs max-w-3xl mx-auto"
              label="Composição visual da caixa aberta, com papel de seda blush amassado, flores secas e tag carimbada à mão"
            />
          </div>

          <div className="mt-8">
            <Button asChild variant="brand" className="rounded-full">
              <Link href="/produtos?categoria=presentes" className="gap-2">
                Conhecer nossos Kits Presente
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SEÇÃO 6: O LIVRO DE VISITAS (Depoimentos em Papel) */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-24 bg-[color-mix(in_srgb,var(--mqm-warm-200)_25%,transparent)]">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--mqm-olive-500)]">Caderno de Notas</p>
            <h2 className="mqm-title mt-2 text-3xl font-semibold text-[var(--mqm-olive-800)] sm:text-4xl">
              Quem já sentiu nosso carinho
            </h2>
            <p className="mqm-copy mx-auto mt-3 max-w-md text-base text-[var(--mqm-olive-700)]/70">
              Palavras gentis que recebemos de pessoas reais que encontraram um momento de aconchego nas páginas dos nossos cadernos.
            </p>
          </div>

          {/* Cards espalhados de forma assimétrica simulando recortes de papel de carta */}
          <div className="grid gap-6 md:grid-cols-3">
            {guestbookNotes.map((note, idx) => (
              <article
                key={idx}
                className={`bg-[var(--mqm-warm-50)] p-6 rounded-[1.5rem] border border-[color-mix(in_srgb,var(--border)_50%,transparent)] shadow-[0_8px_16px_-6px_rgba(90,98,50,0.06)] transform transition-transform duration-[var(--motion-base)] hover:rotate-0 hover:scale-[1.02] ${note.rotation}`}
              >
                <div className="relative">
                  {/* Detalhe de linhas pautadas leves no fundo */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(121,138,73,0.05)_1px,transparent_1px)] bg-[size:100%_1.5rem] pointer-events-none" />
                  
                  <Heart className="size-4 text-[var(--mqm-blush-400)] mb-3 fill-[var(--mqm-blush-200)]/20" />
                  
                  <p className="text-sm font-sans text-[var(--mqm-olive-800)]/90 leading-[1.65] relative z-10 italic">
                    &ldquo;{note.text}&rdquo;
                  </p>
                  
                  <div className="mt-5 pt-3 border-t border-[color-mix(in_srgb,var(--border)_45%,transparent)] flex flex-col relative z-10">
                    <span className="font-cursive text-xl text-[var(--mqm-olive-700)] leading-none">
                      {note.author}
                    </span>
                    <span className="text-[10px] text-muted-foreground tracking-wider uppercase mt-1">
                      {note.location}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 7: CARTAS DA PAPELARIA (Newsletter minimalista) */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="relative bg-[var(--mqm-warm-50)] p-8 sm:p-12 rounded-[2.5rem] border border-[color-mix(in_srgb,var(--border)_60%,transparent)] shadow-[var(--shadow-sm)] text-center">
            {/* Detalhe estético de envelope antigo */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-[var(--mqm-blush-200)] flex items-center justify-center text-[var(--mqm-blush-700)] shadow-xs">
              <Mail className="size-5" />
            </div>

            <p className="font-cursive text-2xl text-[var(--mqm-blush-600)] mt-2">
              sintonizar e desacelerar
            </p>
            
            <h2 className="mqm-title mt-2 text-2xl sm:text-3xl font-semibold text-[var(--mqm-olive-800)]">
              Quer receber nossas cartas?
            </h2>
            
            <p className="mqm-copy mx-auto mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-[var(--mqm-olive-700)]/85">
              Não enviamos cupons com relógios piscando ou e-mails promocionais invasivos. Enviamos crônicas de papelaria, pensamentos sobre organização calma e rituais de escrita. Uma conversa suave para acompanhar sua xícara de café.
            </p>

            <div className="mt-8 max-w-md mx-auto">
              {newsletterSubscribed ? (
                <div className="mqm-reveal flex flex-col items-center bg-[var(--mqm-olive-50)] p-4 rounded-2xl border border-[color-mix(in_srgb,var(--mqm-olive-200)_40%,transparent)]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--mqm-olive-600)] text-white mb-2">
                    <Check className="size-4" />
                  </div>
                  <p className="text-sm font-semibold text-[var(--mqm-olive-800)]">
                    Carta guardada com carinho!
                  </p>
                  <p className="text-xs text-[var(--mqm-olive-700)]/80 mt-1">
                    Em breve, o perfume da papelaria chegará na sua caixa de entrada.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    required
                    placeholder="Seu e-mail de correspondência..."
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-1 rounded-full px-5 py-2.5 text-sm bg-[var(--mqm-warm-100)] border border-[color-mix(in_srgb,var(--border)_85%,transparent)] focus:outline-none focus:border-[var(--mqm-blush-300)] focus:ring-1 focus:ring-[var(--mqm-blush-200)] text-[var(--mqm-olive-900)] placeholder-[color-mix(in_srgb,var(--mqm-olive-300)_90%,transparent)]"
                  />
                  <button
                    type="submit"
                    className="h-11 rounded-full bg-[var(--mqm-olive-700)] px-6 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-[var(--mqm-olive-800)] transition-all shadow-xs"
                  >
                    Aceitar convite
                  </button>
                </form>
              )}
            </div>

            <p className="text-[10px] text-muted-foreground tracking-wider uppercase mt-6">
              Você pode cancelar a correspondência quando quiser. Respeitamos seu tempo.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
