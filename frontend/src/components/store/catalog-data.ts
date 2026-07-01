export type StoreCategory = {
  id: string;
  name: string;
  href: string;
  imageSrc: string;
};

export type StoreCollection = {
  id: string;
  name: string;
  description: string;
  href: string;
  imageSrc: string;
};

export const storeCategories: StoreCategory[] = [
  {
    id: "cadernos",
    name: "Cadernos",
    href: "/produtos?categoria=cadernos",
    imageSrc: "/images/category-1.svg",
  },
  {
    id: "planner",
    name: "Planners",
    href: "/produtos?categoria=planner",
    imageSrc: "/images/category-2.svg",
  },
  {
    id: "canetas",
    name: "Escrita",
    href: "/produtos?categoria=canetas",
    imageSrc: "/images/category-3.svg",
  },
  {
    id: "presentes",
    name: "Presentes",
    href: "/produtos?categoria=presentes",
    imageSrc: "/images/manifesto-gift.svg",
  },
  {
    id: "adesivos",
    name: "Adesivos",
    href: "/produtos?categoria=adesivos",
    imageSrc: "/images/product-card-placeholder.svg",
  },
  {
    id: "kits",
    name: "Kits",
    href: "/produtos?categoria=kits",
    imageSrc: "/images/manifesto-desk.svg",
  },
];

export const storeCollections: StoreCollection[] = [
  {
    id: "calmaria",
    name: "Colecao Calmaria",
    description: "Linho, papel polen e tons suaves para organizar com leveza.",
    href: "/produtos?categoria=planner",
    imageSrc: "/images/placeholder-hero.svg",
  },
  {
    id: "atelier",
    name: "Colecao Atelier",
    description: "Pecas para escrita diaria com acabamento artesanal.",
    href: "/produtos?categoria=cadernos",
    imageSrc: "/images/hero-detail.svg",
  },
  {
    id: "presentear",
    name: "Colecao Presentear",
    description: "Selecao pronta para entregar afeto em datas especiais.",
    href: "/produtos?categoria=presentes",
    imageSrc: "/images/manifesto-gift.svg",
  },
];
