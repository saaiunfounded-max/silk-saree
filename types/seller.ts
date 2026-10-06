export interface Seller {
  id: string;
  user_id: string;
  business_name: string;
  display_name: string;
  bio: string;
  location: string;
  region: string;
  craft_specialization: string;
  years_of_experience: number;
  logo_url: string;
  cover_url: string;
  avatar_url?: string;
  status: 'active' | 'pending' | 'suspended';
  created_at: string;
  total_sales?: number;
  rating?: number;
  story_excerpt?: string;
  full_story?: string;
  weaving_heritage?: string;
}
