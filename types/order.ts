import { Address } from './user';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  seller_id: string;
  product_name: string;
  product_image: string;
  seller_name: string;
  silk_type: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  customer_name?: string;
  customer_email?: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: 'UPI' | 'Card' | 'Net Banking' | 'Cash on Delivery';
  shipping_address: Address;
  created_at: string;
  notes?: string;
}

export interface CartItem {
  product_id: string;
  quantity: number;
}
