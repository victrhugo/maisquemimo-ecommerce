export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number | null;
  categoryId: string;
  stockQuantity: number;
  sku: string;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isFeatured: boolean;
  active: boolean;
  inStock: boolean;
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  imageUrl: string;
  displayOrder: number;
}

export interface ProductFilters {
  categoria?: string;
  busca?: string;
  precoMin?: number;
  precoMax?: number;
  destaque?: string;
  ordenar?: "relevancia" | "menor-preco" | "maior-preco" | "novidades" | "mais-vendidos";
  pagina?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}
