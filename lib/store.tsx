'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ApprovalStatus } from '@/types/product';
import { Seller } from '@/types/seller';
import { Order, OrderItem } from '@/types/order';
import { INITIAL_PRODUCTS } from '@/lib/products';
import { INITIAL_SELLERS } from '@/lib/sellers';

interface CartEntry {
  product: Product;
  quantity: number;
}

interface MarketplaceContextType {
  products: Product[];
  approvedProducts: Product[];
  sellers: Seller[];
  cart: CartEntry[];
  wishlist: string[]; // product IDs
  orders: Order[];
  
  // Cart Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartShipping: number;
  cartTotal: number;

  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Seller / Product Actions (Multi-Vendor)
  addProduct: (newProd: Omit<Product, 'id' | 'created_at'>) => Product;
  updateProductApproval: (productId: string, status: ApprovalStatus) => void;
  getSellerProducts: (sellerId: string) => Product[];
  getSellerOrders: (sellerId: string) => OrderItem[];

  // Checkout Actions
  createOrder: (orderData: {
    customerName: string;
    customerEmail: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    paymentMethod: 'UPI' | 'Card' | 'Net Banking' | 'Cash on Delivery';
  }) => Order;
}

const MarketplaceContext = createContext<MarketplaceContextType | null>(null);

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [sellers] = useState<Seller[]>(INITIAL_SELLERS);
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedProds = localStorage.getItem('thari_products');
      if (storedProds) setProducts(JSON.parse(storedProds));

      const storedCart = localStorage.getItem('thari_cart');
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedWish = localStorage.getItem('thari_wishlist');
      if (storedWish) setWishlist(JSON.parse(storedWish));

      const storedOrders = localStorage.getItem('thari_orders');
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      } else {
        // Sample order for demo preview
        const initialOrder: Order = {
          id: 'ord-1001',
          order_number: 'THR-2024-8841',
          customer_id: 'user-demo-cust',
          customer_name: 'Ananya Rao',
          customer_email: 'demo@thari.local',
          items: [
            {
              id: 'item-1',
              order_id: 'ord-1001',
              product_id: 'prod-1',
              seller_id: 'seller-1',
              product_name: 'Kanchipuram Temple Gold',
              product_image: INITIAL_PRODUCTS[0].images[0],
              seller_name: 'Sundaram Silk Guild',
              silk_type: 'Kanchipuram',
              quantity: 1,
              price: 48500,
              subtotal: 48500,
            }
          ],
          subtotal: 48500,
          shipping: 0,
          total: 48500,
          status: 'processing',
          payment_status: 'paid',
          payment_method: 'UPI',
          shipping_address: {
            id: 'addr-1',
            name: 'Ananya Rao',
            phone: '+91 98401 23456',
            address_line_1: 'No. 44, Boat Club Road',
            city: 'Chennai',
            state: 'Tamil Nadu',
            postal_code: '600028',
            country: 'India',
          },
          created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
        };
        setOrders([initialOrder]);
        localStorage.setItem('thari_orders', JSON.stringify([initialOrder]));
      }
    } catch {
      // ignore JSON parse errors in SSR
    }
    setIsLoaded(true);
  }, []);

  // Save changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('thari_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('thari_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('thari_products', JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('thari_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders, isLoaded]);

  // Cart methods
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  // Complimentary insured shipping for luxury heritage orders
  const cartShipping = 0;
  const cartTotal = cartSubtotal + cartShipping;

  // Wishlist methods
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Multi-vendor products
  const addProduct = (newProd: Omit<Product, 'id' | 'created_at'>): Product => {
    const created: Product = {
      ...newProd,
      id: `prod-${Date.now()}`,
      created_at: new Date().toISOString(),
      status: 'pending_review',
      approval_status: 'pending',
    };
    setProducts((prev) => [created, ...prev]);
    return created;
  };

  const updateProductApproval = (productId: string, status: ApprovalStatus) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            approval_status: status,
            status: status === 'approved' ? 'published' : 'rejected',
          };
        }
        return p;
      })
    );
  };

  const approvedProducts = products.filter(
    (p) => p.approval_status === 'approved' && p.status === 'published'
  );

  const getSellerProducts = (sellerId: string) => {
    return products.filter((p) => p.seller_id === sellerId);
  };

  const getSellerOrders = (sellerId: string): OrderItem[] => {
    const list: OrderItem[] = [];
    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.seller_id === sellerId) {
          list.push(item);
        }
      });
    });
    return list;
  };

  // Checkout & Order Creation
  const createOrder = (orderData: {
    customerName: string;
    customerEmail: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    paymentMethod: 'UPI' | 'Card' | 'Net Banking' | 'Cash on Delivery';
  }): Order => {
    const orderItems: OrderItem[] = cart.map((item, idx) => ({
      id: `item-${Date.now()}-${idx}`,
      order_id: `ord-${Date.now()}`,
      product_id: item.product.id,
      seller_id: item.product.seller_id,
      product_name: item.product.name,
      product_image: item.product.images[0],
      seller_name: item.product.seller_name || 'Artisan Loom',
      silk_type: item.product.silk_type,
      quantity: item.quantity,
      price: item.product.price,
      subtotal: item.product.price * item.quantity,
    }));

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      order_number: `THR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      customer_id: 'user-demo-cust',
      customer_name: orderData.customerName,
      customer_email: orderData.customerEmail,
      items: orderItems,
      subtotal: cartSubtotal,
      shipping: cartShipping,
      total: cartTotal,
      status: 'processing',
      payment_status: 'paid',
      payment_method: orderData.paymentMethod,
      shipping_address: {
        id: `addr-${Date.now()}`,
        name: orderData.customerName,
        phone: orderData.phone,
        address_line_1: orderData.address,
        city: orderData.city,
        state: orderData.state,
        postal_code: orderData.postalCode,
        country: 'India',
        is_default: true,
      },
      created_at: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <MarketplaceContext.Provider
      value={{
        products,
        approvedProducts,
        sellers,
        cart,
        wishlist,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartShipping,
        cartTotal,
        toggleWishlist,
        isInWishlist,
        addProduct,
        updateProductApproval,
        getSellerProducts,
        getSellerOrders,
        createOrder,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
