"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Sparkles, PenTool, Gift, Mail, Check, Star } from "lucide-react";
import { PhotoSlot } from "@/components/store/photo-slot";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/store/product-card";
import { useNewProducts, useFeaturedProducts } from "@/hooks/use-products";
import type { Product } from "@/types/product";

// Categorias com imagens de background, descrição e links afetivos
const categoriesList = [
  {
    id: "planners",
    name: "Planners",
    description: "Espaço para rituais e intenções",
    href: "/produtos?categoria=planner",
    imageLabel: "Planejador aberto cercado por flores secas e luz do sol",
    imageSrc: "/images/category-2.svg"
  },
  {
    id: "cadernos",
    name: "Cadernos",
    description: "Linho e costura que abre em 180°",
    href: "/produtos?categoria=cadernos",
    imageLabel: "Pilha de cadernos de linho colorido com costura exposta",
    imageSrc: "/images/category-1.svg"
  },
  {
    id: "kits",
    name: "Kits de Presente",
    description: "Curadoria pronta para entregar carinho",
    href: "/produtos?categoria=kits",
    imageLabel: "Caixa kraft aberta com embrulho de seda e flores",
    imageSrc: "/images/category-3.svg"
  },
  {
    id: "presentes",
    name: "Presentes",
    description: "Lembranças com profundo significado",
    href: "/produtos?categoria=presentes",
    imageLabel: "Mão amarrando laço de algodão em caixa de presente",
    imageSrc: "/images/manifesto-gift.svg"
  },
  {
    id: "canetas",
    name: "Escrita & Canetas",
    description: "Tinta macia para desacelerar a rotina",
    href: "/produtos?categoria=canetas",
    imageLabel: "Coleção de canetas de metal com clipe dourado e blocos",
    imageSrc: "/images/manifesto-desk.svg"
  },
  {
    id: "adesivos",
    name: "Adesivos",
    description: "Ilustrações botânicas em aquarela",
    href: "/produtos?categoria=adesivos",
    imageLabel: "Cartelas de adesivos botânicos pintados em aquarela",
    imageSrc: "/images/product-card-placeholder.svg"
  }
];

// Fallback de Lançamentos se a API estiver vazia/offline
const fallbackNewProducts: Product[] = [
  {
    id: "new-1",
    name: "Planner Semanal Amanhecer",
    slug: "planner-semanal-amanhecer",
    description: "Capa em linho oliva, miolo em papel pólen 90g com espaço para rituais e intenções semanais.",
    price: 8990,
    originalPrice: null,
    categoryId: "planners",
    stockQuantity: 15,
    sku: "PLN-AMN-01",
    rating: 5,
    reviewCount: 12,
    isNew: true,
    isFeatured: false,
    active: true,
    inStock: true,
    images: [{ id: "img-n1", imageUrl: "/images/product-1.svg", displayOrder: 1 }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "new-2",
    name: "Caderno Costura Manual Blush",
    slug: "caderno-costura-manual-blush",
    description: "Encadernação artesanal copta exposta com linha de algodão encerada e capa dura em tom rosé.",
    price: 4990,
    originalPrice: null,
    categoryId: "cadernos",
    stockQuantity: 8,
    sku: "CAD-BLS-02",
    rating: 5,
    reviewCount: 8,
    isNew: true,
    isFeatured: false,
    active: true,
    inStock: true,
    images: [{ id: "img-n2", imageUrl: "/images/product-2.svg", displayOrder: 1 }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "new-3",
    name: "Caneta Gel Caligrafia Ouro",
    slug: "caneta-gel-caligrafia-ouro",
    description: "Escrita extrafina e macia com tinta gel preta resistente à água e clipe metálico dourado.",
    price: 1990,
    originalPrice: 2490,
    categoryId: "canetas",
    stockQuantity: 20,
    sku: "CAN-GEL-GD",
    rating: 4.8,
    reviewCount: 15,
    isNew: true,
    isFeatured: false,
    active: true,
    inStock: true,
    images: [{ id: "img-n3", imageUrl: "/images/product-3.svg", displayOrder: 1 }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "new-4",
    name: "Kit de Adesivos Botânica",
    slug: "kit-de-adesivos-botanica",
    description: "Cartela contendo 24 adesivos ilustrados em aquarela com motivos florais e folhagens para o seu diário.",
    price: 1490,
    originalPrice: null,
    categoryId: "adesivos",
    stockQuantity: 30,
    sku: "KIT-AD-BOT",
    rating: 5,
    reviewCount: 22,
    isNew: true,
    isFeatured: false,
    active: true,
    inStock: true,
    images: [{ id: "img-n4", imageUrl: "/images/product-card-placeholder.svg", displayOrder: 1 }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Fallback de Mais Vendidos se a API estiver vazia/offline
const fallbackFeaturedProducts: Product[] = [
  {
    id: "feat-1",
    name: "Planner Anual Coleção Calmaria",
    slug: "planner-anual-colecao-calmaria",
    description: "Planejador completo de 12 meses com capa dura em tecido oliva e marcadores de página de gorgorão.",
    price: 11990,
    originalPrice: null,
    categoryId: "planners",
    stockQuantity: 5,
    sku: "PLN-AN-CALM",
    rating: 5,
    reviewCount: 31,
    isNew: false,
    isFeatured: true,
    active: true,
    inStock: true,
    images: [{ id: "img-f1", imageUrl: "/images/product-2.svg", displayOrder: 1 }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "feat-2",
    name: "Caderno Pautado Alecrim A5",
    slug: "caderno-pautado-alecrim-a5",
    description: "Folhas pautadas em papel pólen de alta gramatura, perfeito para escrita com caneta tinteiro.",
    price: 4590,
    originalPrice: null,
    categoryId: "cadernos",
    stockQuantity: 12,
    sku: "CAD-ALE-A5",
    rating: 4.9,
    reviewCount: 18,
    isNew: false,
    isFeatured: true,
    active: true,
    inStock: true,
    images: [{ id: "img-f2", imageUrl: "/images/product-1.svg", displayOrder: 1 }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "feat-3",
    name: "Kit de Escrita Calmaria Completo",
    slug: "kit-de-escrita-calmaria-completo",
    description: "Composição contendo caderno de bolso, bloco de anotações pautado, caneta metálica e sachê perfumado.",
    price: 7990,
    originalPrice: 8990,
    categoryId: "kits",
    stockQuantity: 3,
    sku: "KIT-ESC-CALM",
    rating: 5,
    reviewCount: 10,
    isNew: false,
    isFeatured: true,
    active: true,
    inStock: true,
    images: [{ id: "img-f3", imageUrl: "/images/product-3.svg", displayOrder: 1 }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "feat-4",
    name: "Caixa Presente Afeto e Aromas",
    slug: "caixa-presente-afeto-e-aromas",
    description: "O presente perfeito para quem precisa pausar. Caixa rígida, planner de mesa, caneta e buquê de lavanda.",
    price: 9890,
    originalPrice: null,
    categoryId: "presentes",
    stockQuantity: 7,
    sku: "PRES-AFT-ARM",
    rating: 5,
    reviewCount: 14,
    isNew: false,
    isFeatured: true,
    active: true,
    inStock: true,
    images: [{ id: "img-f4", imageUrl: "/images/product-card-placeholder.svg", displayOrder: 1 }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Fotos de Lifestyle (Instagram Showcase)
const instagramPhotos = [
  {
    id: 1,
    label: "Uma xícara de café fumegante ao lado de um planner aberto sobre mesa de madeira rústica",
  },
  {
    id: 2,
    label: "Mão escrevendo com caneta dourada sobre papel de linho sob luz lateral da janela",
  },
  {
    id: 3,
    label: "Ramos de flores secas e rolos de fitas de algodão desfiados em potes de cerâmica clara",
  },
  {
    id: 4,
    label: "Caixa kraft de presente sendo selada artesanalmente com lacre de cera vermelha",
  }
];

export function HomeStory() {
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  // Queries dinâmicas de produtos
  const { data: newProductsData } = useNewProducts(4);
  const { data: featuredProductsData } = useFeaturedProducts(4);

  // Fallbacks graciosos se a API estiver vazia ou offline
  const newProductsList = newProductsData?.content?.length 
    ? newProductsData.content 
    : fallbackNewProducts;
    
  const featuredProductsList = featuredProductsData?.content?.length 
    ? featuredProductsData.content 
    : fallbackFeaturedProducts;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setNewsletterSubscribed(true);
      setEmailInput("");
    }
  };

  return (
    <div className="flex flex-col overflow-hidden bg-[var(--background)]">
      
      {/* 1. HERO EMOCIONAL + DIRECIONAMENTO */}
      <section className="relative px-4 pt-14 pb-20 sm:px-6 sm:pt-20 sm:pb-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mqm-reveal flex flex-col items-center">
            
            {/* Logo integrada em círculo animado delicado */}
            <div className="relative mb-6 p-2">
              <div className="absolute inset-0 rounded-full border border-dashed border-[color-mix(in_srgb,var(--mqm-blush-300)_50%,transparent)] animate-[spin_80s_linear_infinite]" />
              <Image
                src="/images.png"
                alt="Logo Mais que Mimo"
                width={124}
                height={124}
                priority
                className="h-24 w-24 rounded-full object-cover shadow-[var(--shadow-xs)]"
              />
            </div>
            
            <p className="font-cursive text-2xl text-[var(--mqm-olive-600)] tracking-wide">
              papelaria afetiva
            </p>
            
            <h1 className="mqm-title mt-4 text-[2.25rem] font-medium leading-[1.08] text-[var(--mqm-olive-800)] sm:text-5xl lg:text-[4.2rem]">
              A porta está encostada.
              <br />
              <span className="font-cursive text-[2.7rem] text-[var(--mqm-blush-600)] font-normal sm:text-[3.9rem] lg:text-[5.2rem]">
                Entre sem pressa.
              </span>
            </h1>
            
            <p className="mqm-copy mx-auto mt-6 max-w-xl text-base text-[var(--mqm-olive-800)]/80 sm:text-lg">
              Um refúgio delicado para quem gosta de organizar os pensamentos, rabiscar memórias e viver os rituais simples da escrita manual.
            </p>

            {/* CTA Emocional + Botão de Descida para Loja */}
            <div className="mt-9 flex flex-col items-center gap-3">
              <a
                href="#categorias"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--mqm-olive-700)] px-7 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[var(--shadow-xs)] transition-all duration-[var(--motion-base)] hover:bg-[var(--mqm-olive-800)] hover:translate-y-px"
              >
                Conhecer a papelaria
              </a>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest animate-bounce mt-2">
                Descubra abaixo
              </span>
            </div>
          </div>

          {/* Fotografia Principal (Vitrine da papelaria) */}
          <div className="mqm-reveal mt-12">
            <PhotoSlot 
              className="aspect-[16/7] min-h-[14rem] sm:min-h-[22rem] mqm-organic rounded-[3rem_1.5rem_3rem_1.5rem] shadow-[var(--shadow-xs)]" 
              label="Mesa de pinus decorada com planners, cadernos abertos e ramos de lavandas sob luz natural"
            />
          </div>
        </div>
      </section>


      {/* 2. GRADE DE CATEGORIAS (Clareza Operacional) */}
      <section id="categorias" className="relative px-4 py-16 sm:px-6 sm:py-24 border-t border-[color-mix(in_srgb,var(--border)_40%,transparent)] scroll-mt-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--mqm-olive-500)]">Escolhas por Intenção</p>
            <h2 className="mqm-title mt-2 text-3xl font-semibold text-[var(--mqm-olive-800)]">
              Explore nossos caminhos de papel
            </h2>
            <p className="mqm-copy mx-auto mt-3 max-w-md text-sm text-[var(--mqm-olive-700)]/70">
              Selecione o formato ideal para acolher sua rotina, suas anotações ou para presentear quem você ama.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {categoriesList.map((category) => (
              <Link 
                key={category.id} 
                href={category.href}
                className="group flex flex-col items-center text-center"
              >
                {/* Imagem circular da categoria com zoom sutil */}
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-full border border-[color-mix(in_srgb,var(--border)_60%,transparent)] bg-[var(--mqm-warm-100)] shadow-[var(--shadow-xs)] transition-transform duration-[var(--motion-base)] group-hover:scale-[1.03]">
                  <Image
                    src={category.imageSrc}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 ease-brand group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/[0.02]" />
                </div>
                
                <h3 className="font-display text-base font-semibold text-[var(--mqm-olive-800)] mt-4 transition-colors group-hover:text-[var(--mqm-blush-700)]">
                  {category.name}
                </h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1 px-1">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* 3. LANÇAMENTOS (Novidades Recentes) */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-24 bg-[color-mix(in_srgb,var(--mqm-warm-200)_30%,transparent)]">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="text-left">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--mqm-olive-500)]">Frescos do Ateliê</p>
              <h2 className="mqm-title mt-2 text-3xl font-semibold text-[var(--mqm-olive-800)]">
                Novidades na bancada
              </h2>
              <p className="mqm-copy mt-2 max-w-md text-sm text-[var(--mqm-olive-700)]/70">
                Itens recém-tirados de nossas mesas de costura e prensas, prontos para estrear em sua mesa.
              </p>
            </div>
            
            <Link
              href="/produtos"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--mqm-olive-700)] hover:text-[var(--mqm-blush-700)] transition-colors self-start sm:self-auto"
            >
              Ver todas as novidades
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
            {newProductsList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>


      {/* 4. COLEÇÃO ESPECIAL (Destaque Calmaria Editorial) */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-24 bg-[var(--mqm-olive-50)]">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            
            {/* Imagem grande e afetiva do Ensaio */}
            <div className="lg:col-span-7">
              <div className="relative p-2">
                <div className="absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2 border-[var(--mqm-blush-300)]" />
                <PhotoSlot
                  className="aspect-[16/10] min-h-[16rem] sm:min-h-[22rem] rounded-[2.5rem_1.2rem_2.5rem_1.2rem] shadow-[var(--shadow-xs)]"
                  label="Ensaio Coleção Calmaria: Tecidos de linho tingidos com plantas, carimbos manuais de ramos e caderno aberto cercado por folhas de sálvia"
                />
                <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[var(--mqm-blush-300)]" />
              </div>
            </div>

            {/* Texto editorial e emocional com link focado */}
            <div className="lg:col-span-5 flex flex-col justify-center text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--mqm-blush-600)] bg-[var(--mqm-blush-100)] rounded-full px-3 py-1 inline-block self-start mb-4">
                Edição Limitada
              </span>
              
              <h2 className="mqm-title text-3xl font-semibold leading-tight text-[var(--mqm-olive-800)] sm:text-4xl">
                Coleção Calmaria
              </h2>
              
              <p className="mt-4 text-sm text-[var(--mqm-olive-800)]/85 leading-relaxed">
                Um conjunto completo de planners, blocos e canetas concebidos para acalmar os dias barulhentos. Utilizamos tecidos 100% de linho cru com tingimento natural e papéis de fibras vegetais recicladas. O toque é macio e cada peça carrega pequenas irregularidades que contam o tempo de sua manufatura.
              </p>
              
              <p className="mt-3 font-cursive text-2xl text-[var(--mqm-blush-700)]">
                Rabiscos sem pressa, pensamentos organizados.
              </p>

              <div className="mt-7">
                <Button asChild variant="brand" className="rounded-full shadow-xs">
                  <Link href="/produtos?categoria=kits" className="gap-2">
                    Explorar Coleção Calmaria
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 5. MAIS VENDIDOS (Os Favoritos da Casa) */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="text-left">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--mqm-olive-500)]">Escolhas das Clientes</p>
              <h2 className="mqm-title mt-2 text-3xl font-semibold text-[var(--mqm-olive-800)]">
                Os queridinhos da casa
              </h2>
              <p className="mqm-copy mt-2 max-w-md text-sm text-[var(--mqm-olive-700)]/70">
                Os produtos que mais acompanham xícaras de café e escritas reflexivas pelo país.
              </p>
            </div>
            
            <Link
              href="/produtos"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--mqm-olive-700)] hover:text-[var(--mqm-blush-700)] transition-colors self-start sm:self-auto"
            >
              Ver toda a coleção
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
            {featuredProductsList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>


      {/* 6. MANIFESTO DA MARCA (Conexão e Calma) */}
      <section className="relative px-4 py-12 sm:px-6 sm:py-16 border-y border-[color-mix(in_srgb,var(--border)_45%,transparent)] bg-[color-mix(in_srgb,var(--mqm-warm-100)_20%,transparent)]">
        <div className="mx-auto max-w-3xl text-center">
          <Heart className="size-5 text-[var(--mqm-blush-400)] mb-4 mx-auto fill-[var(--mqm-blush-200)]/30" />
          <h2 className="mqm-title text-2xl font-semibold text-[var(--mqm-olive-800)] sm:text-3xl leading-snug">
            Organização também é um gesto de carinho.
          </h2>
          <p className="mqm-copy mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[var(--mqm-olive-700)]/85">
            Acreditamos em uma rotina mais gentil. Desenvolvemos papéis que acolhem pensamentos, costuras manuais que desaceleram o ritmo do dia e embalagens repletas de presença. Mais que objetos físicos, criamos companheiros para a jornada de autodescoberta.
          </p>
          <p className="font-cursive text-2xl text-[var(--mqm-blush-600)] mt-4">
            Feito para quem valoriza os detalhes das pequenas pausas.
          </p>
        </div>
      </section>


      {/* 7. INSTAGRAM SHOWCASE (Vitrinas do Cotidiano) */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--mqm-blush-100)] text-[var(--mqm-blush-600)] mb-3 shadow-xs">
              <svg
                className="size-4.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
            <h2 className="mqm-title text-2xl font-semibold text-[var(--mqm-olive-800)]">
              No ateliê e no cotidiano
            </h2>
            <p className="mqm-copy mx-auto mt-2 max-w-md text-sm text-[var(--mqm-olive-700)]/70">
              Acompanhe nosso trabalho manual e inspire-se com composições de escrivaninha reais.
            </p>
          </div>

          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {instagramPhotos.map((photo) => (
              <div key={photo.id} className="relative aspect-square overflow-hidden rounded-[1.8rem] border border-[color-mix(in_srgb,var(--border)_50%,transparent)] group">
                <PhotoSlot 
                  className="h-full w-full absolute inset-0 rounded-none shadow-none" 
                  label={photo.label}
                />
                {/* Overlay sutil ao hover simulando instagram */}
                <div className="absolute inset-0 bg-[var(--mqm-olive-900)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--mqm-olive-800)] bg-white/95 rounded-full px-4 py-1.5 shadow-sm">
                    Ver Atmosfera
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 8. CARTAS DA PAPELARIA (Newsletter minimalista e afetiva) */}
      <section className="relative px-4 py-14 pb-24 sm:px-6 sm:py-16 sm:pb-28">
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
              Não enviamos cupons barulhentos ou alertas de e-commerce invasivos. Compartilhamos crônicas de papelaria, pensamentos sobre organização gentil e sugestões de leitura e escrita. Uma conversa leve para ler tomando seu café.
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
