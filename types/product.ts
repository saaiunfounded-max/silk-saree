export type SilkType = 
  | 'Kanchipuram'
  | 'Banarasi'
  | 'Mysore Silk'
  | 'Tussar'
  | 'Chanderi'
  | 'Raw Silk';

export type ProductStatus = 'draft' | 'pending_review' | 'published' | 'rejected' | 'out_of_stock';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface Product {
  id: string;
  seller_id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price?: number;
  sku: string;
  silk_type: SilkType;
  color: string;
  region: string;
  weaving_technique: string;
  length: string;
  blouse_included: boolean;
  stock: number;
  status: ProductStatus;
  approval_status: ApprovalStatus;
  images: string[];
  featured?: boolean;
  is_new?: boolean;
  is_handwoven?: boolean;
  occasion?: string;
  zari?: string;
  care_instructions?: string;
  created_at: string;
  seller_name?: string;
  seller_location?: string;
}

export interface ProductFilter {
  silk_type?: string[];
  region?: string[];
  color?: string[];
  minPrice?: number;
  maxPrice?: number;
  occasion?: string[];
  seller_id?: string;
  inStockOnly?: boolean;
  search?: string;
  sort?: 'featured' | 'newest' | 'price-asc' | 'price-desc';
}
