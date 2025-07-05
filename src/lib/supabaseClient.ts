import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string | null;
          age: string | null;
          email: string | null;
          nationality: string | null;
          education_level: string | null;
          target_city: string | null;
          target_program: string | null;
          has_work_experience: boolean | null;
          has_gap_year: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          name?: string | null;
          age?: string | null;
          email?: string | null;
          nationality?: string | null;
          education_level?: string | null;
          target_city?: string | null;
          target_program?: string | null;
          has_work_experience?: boolean | null;
          has_gap_year?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
          age?: string | null;
          email?: string | null;
          nationality?: string | null;
          education_level?: string | null;
          target_city?: string | null;
          target_program?: string | null;
          has_work_experience?: boolean | null;
          has_gap_year?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      schools: {
        Row: {
          id: string;
          name: string;
          city: string;
          description: string | null;
          website: string | null;
          programs: string[] | null;
          ranking: string | null;
          tuition_fees: any | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          city: string;
          description?: string | null;
          website?: string | null;
          programs?: string[] | null;
          ranking?: string | null;
          tuition_fees?: any | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          city?: string;
          description?: string | null;
          website?: string | null;
          programs?: string[] | null;
          ranking?: string | null;
          tuition_fees?: any | null;
          created_at?: string | null;
        };
      };
      user_documents: {
        Row: {
          id: string;
          user_id: string;
          name: string | null;
          type: string | null;
          file_url: string | null;
          status: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          name?: string | null;
          type?: string | null;
          file_url?: string | null;
          status?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string | null;
          type?: string | null;
          file_url?: string | null;
          status?: string | null;
          created_at?: string | null;
        };
      };
    };
  };
};