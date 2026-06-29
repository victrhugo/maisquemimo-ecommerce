export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Aguardando pagamento",
  CONFIRMED: "Confirmado",
  PROCESSING: "Em preparação",
  SHIPPED: "Enviado",
  DELIVERED: "Entregue",
  CANCELLED: "Cancelado",
  REFUNDED: "Reembolsado",
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: "amber",
  CONFIRMED: "sage",
  PROCESSING: "mauve",
  SHIPPED: "rose",
  DELIVERED: "sage",
  CANCELLED: "destructive",
  REFUNDED: "secondary",
};

export interface OrderItem {
  productId: string;
  name: string;
  imageUrl: string | null;
  price: number;
  quantity: number;
  total: number;
}

export interface Order {
  id: string;
  number: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  customer: {
    name: string;
    email: string;
  };
  shippingAddress: Address;
  trackingCode?: string;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}
