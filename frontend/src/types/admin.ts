export interface AdminOrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface AdminOrder {
  id: string;
  number: string;
  customerName: string;
  customerEmail: string;
  status: string;
  total: number;
  createdAt: string;
  items: AdminOrderItem[];
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate: string | null;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

export interface AdminUserRequest {
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

export interface DashboardPayload {
  monthRevenue: number;
  ordersCount: number;
  customersCount: number;
  activeProductsCount: number;
  recentOrders: AdminOrder[];
  topProducts: Array<{ id: string; name: string; sales: number; revenue: number }>;
  lowStock: Array<{ id: string; name: string; stock: number }>;
}
