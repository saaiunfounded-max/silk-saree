-- ============================================================
-- THARI — LUXURY SILK SAREE MULTI-VENDOR MARKETPLACE
-- SUPABASE RELATIONAL DATABASE SCHEMA & ROW LEVEL SECURITY
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES
create table if not exists public.profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade unique,
  name text not null,
  email text not null unique,
  phone text,
  avatar_url text,
  role text not null check (role in ('customer', 'seller', 'admin')) default 'customer',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. SELLERS (WEAVERS / ARTISANS)
create table if not exists public.sellers (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(user_id) on delete cascade unique,
  business_name text not null,
  display_name text not null,
  bio text,
  location text not null,
  region text not null,
  craft_specialization text not null,
  years_of_experience integer default 10,
  logo_url text,
  cover_url text,
  status text not null check (status in ('active', 'pending', 'suspended')) default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. CATEGORIES
create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. COLLECTIONS
create table if not exists public.collections (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. PRODUCTS (MULTI-VENDOR: Every product MUST have a seller_id)
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  seller_id uuid references public.sellers(id) on delete cascade not null,
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text not null,
  price numeric(10, 2) not null check (price >= 0),
  compare_at_price numeric(10, 2) check (compare_at_price >= price),
  sku text not null unique,
  silk_type text not null,
  color text not null,
  region text not null,
  weaving_technique text not null,
  length text default '6.2 Meters with Blouse Piece',
  blouse_included boolean default true,
  stock integer not null default 1 check (stock >= 0),
  status text not null check (status in ('draft', 'pending_review', 'published', 'rejected', 'out_of_stock')) default 'pending_review',
  approval_status text not null check (approval_status in ('pending', 'approved', 'rejected')) default 'pending',
  featured boolean default false,
  is_new boolean default false,
  is_handwoven boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. PRODUCT IMAGES
create table if not exists public.product_images (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id) on delete cascade not null,
  image_url text not null,
  alt_text text,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. INVENTORY
create table if not exists public.inventory (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id) on delete cascade unique not null,
  quantity integer not null default 1 check (quantity >= 0),
  reserved_quantity integer not null default 0 check (reserved_quantity >= 0),
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. ADDRESSES
create table if not exists public.addresses (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  phone text not null,
  address_line_1 text not null,
  address_line_2 text,
  city text not null,
  state text not null,
  postal_code text not null,
  country text default 'India' not null,
  is_default boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. ORDERS
create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text not null unique,
  customer_id uuid references public.profiles(id) on delete set null,
  total numeric(10, 2) not null,
  subtotal numeric(10, 2) not null,
  shipping numeric(10, 2) default 0.00,
  status text not null check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')) default 'pending',
  payment_status text not null check (payment_status in ('pending', 'paid', 'failed', 'refunded')) default 'pending',
  shipping_address jsonb not null,
  payment_method text not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. ORDER ITEMS (MULTI-VENDOR: Every item MUST have seller_id)
create table if not exists public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete set null not null,
  seller_id uuid references public.sellers(id) on delete set null not null,
  quantity integer not null check (quantity > 0),
  price numeric(10, 2) not null,
  subtotal numeric(10, 2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 11. CART ITEMS
create table if not exists public.cart_items (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references public.profiles(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  quantity integer default 1 check (quantity > 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(customer_id, product_id)
);

-- 12. WISHLIST ITEMS
create table if not exists public.wishlist_items (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references public.profiles(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(customer_id, product_id)
);

-- 13. REVIEWS
create table if not exists public.reviews (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id) on delete cascade not null,
  customer_id uuid references public.profiles(id) on delete cascade not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  title text,
  content text,
  status text check (status in ('pending', 'approved', 'rejected')) default 'approved',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 14. SELLER PAYOUTS
create table if not exists public.seller_payouts (
  id uuid primary key default uuid_generate_v4(),
  seller_id uuid references public.sellers(id) on delete cascade not null,
  order_id uuid references public.orders(id) on delete cascade not null,
  amount numeric(10, 2) not null,
  commission numeric(10, 2) not null,
  status text check (status in ('pending', 'processing', 'paid', 'cancelled')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 15. PRODUCT APPROVALS
create table if not exists public.product_approvals (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id) on delete cascade not null,
  admin_id uuid references public.profiles(id) on delete set null,
  status text not null check (status in ('pending', 'approved', 'rejected', 'changes_requested')),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- INDEXES
create index if not exists idx_products_seller_id on public.products(seller_id);
create index if not exists idx_products_status on public.products(status);
create index if not exists idx_products_approval on public.products(approval_status);
create index if not exists idx_order_items_seller on public.order_items(seller_id);
create index if not exists idx_order_items_order on public.order_items(order_id);

-- ROW LEVEL SECURITY (RLS) POLICIES
alter table public.profiles enable row level security;
alter table public.sellers enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Public can view active sellers
create policy "Public sellers are viewable by everyone" on public.sellers
  for select using (status = 'active');

-- Public can view approved and published products
create policy "Approved published products are viewable by everyone" on public.products
  for select using (status = 'published' and approval_status = 'approved');

-- Sellers can manage their own products
create policy "Sellers can manage their own products" on public.products
  for all using (auth.uid() in (select user_id from public.sellers where id = products.seller_id));

-- Users can view their own orders
create policy "Users can view their own orders" on public.orders
  for select using (auth.uid() in (select user_id from public.profiles where id = orders.customer_id));

-- Sellers can view order items belonging to them
create policy "Sellers can view their order items" on public.order_items
  for select using (auth.uid() in (select user_id from public.sellers where id = order_items.seller_id));
