export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryRequest {
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  active?: boolean;
}
