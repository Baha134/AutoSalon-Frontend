import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel_type: string;
  transmission: string;
  body_type: string;
  color: string;
  engine: string;
  power: number;
  description: string;
  image_url: string;
  images: string[];
  status: string;
  featured: boolean;
  created_at: string;
};

export type Inquiry = {
  id?: string;
  car_id: string | null;
  name: string;
  email: string;
  phone: string;
  message: string;
};
