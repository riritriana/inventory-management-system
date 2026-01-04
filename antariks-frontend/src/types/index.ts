export interface Product {
  id: number;
  product_name: string;
  amount: string;
  qty: number;
  created_at?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}