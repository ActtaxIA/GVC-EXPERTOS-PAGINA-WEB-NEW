export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: string
          slug: string
          title: string
          meta_title: string | null
          meta_description: string | null
          icon_name: string | null
          short_description: string | null
          content: string | null
          faqs: Json | null
          order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          meta_title?: string | null
          meta_description?: string | null
          icon_name?: string | null
          short_description?: string | null
          content?: string | null
          faqs?: Json | null
          order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          meta_title?: string | null
          meta_description?: string | null
          icon_name?: string | null
          short_description?: string | null
          content?: string | null
          faqs?: Json | null
          order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      cities: {
        Row: {
          id: string
          slug: string
          name: string
          province: string | null
          community: string | null
          meta_title: string | null
          meta_description: string | null
          h1_title: string | null
          intro_text: string | null
          local_content: string | null
          coordinates: Json | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          province?: string | null
          community?: string | null
          meta_title?: string | null
          meta_description?: string | null
          h1_title?: string | null
          intro_text?: string | null
          local_content?: string | null
          coordinates?: Json | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          province?: string | null
          community?: string | null
          meta_title?: string | null
          meta_description?: string | null
          h1_title?: string | null
          intro_text?: string | null
          local_content?: string | null
          coordinates?: Json | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      team_members: {
        Row: {
          id: string
          slug: string
          name: string
          position: string
          bio: string | null
          photo_url: string | null
          email: string | null
          linkedin_url: string | null
          specialties: Json | null
          order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          position: string
          bio?: string | null
          photo_url?: string | null
          email?: string | null
          linkedin_url?: string | null
          specialties?: Json | null
          order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          position?: string
          bio?: string | null
          photo_url?: string | null
          email?: string | null
          linkedin_url?: string | null
          specialties?: Json | null
          order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      post_categories: {
        Row: {
          id: string
          slug: string
          name: string
          description: string | null
          order: number
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          description?: string | null
          order?: number
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          description?: string | null
          order?: number
          created_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          slug: string
          title: string
          meta_title: string | null
          meta_description: string | null
          excerpt: string | null
          content: string | null
          featured_image: string | null
          category_id: string | null
          author_id: string | null
          tags: Json | null
          reading_time: number | null
          is_featured: boolean
          is_published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          meta_title?: string | null
          meta_description?: string | null
          excerpt?: string | null
          content?: string | null
          featured_image?: string | null
          category_id?: string | null
          author_id?: string | null
          tags?: Json | null
          reading_time?: number | null
          is_featured?: boolean
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          meta_title?: string | null
          meta_description?: string | null
          excerpt?: string | null
          content?: string | null
          featured_image?: string | null
          category_id?: string | null
          author_id?: string | null
          tags?: Json | null
          reading_time?: number | null
          is_featured?: boolean
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      news: {
        Row: {
          id: string
          slug: string
          title: string
          meta_title: string | null
          meta_description: string | null
          excerpt: string | null
          content: string | null
          featured_image: string | null
          source_url: string | null
          is_published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          meta_title?: string | null
          meta_description?: string | null
          excerpt?: string | null
          content?: string | null
          featured_image?: string | null
          source_url?: string | null
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          meta_title?: string | null
          meta_description?: string | null
          excerpt?: string | null
          content?: string | null
          featured_image?: string | null
          source_url?: string | null
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      success_cases: {
        Row: {
          id: string
          slug: string
          title: string
          meta_title: string | null
          meta_description: string | null
          excerpt: string | null
          content: string | null
          service_id: string | null
          result_amount: number | null
          year: number | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          meta_title?: string | null
          meta_description?: string | null
          excerpt?: string | null
          content?: string | null
          service_id?: string | null
          result_amount?: number | null
          year?: number | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          meta_title?: string | null
          meta_description?: string | null
          excerpt?: string | null
          content?: string | null
          service_id?: string | null
          result_amount?: number | null
          year?: number | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          city: string | null
          content: string
          rating: number
          service_id: string | null
          city_id: string | null
          is_featured: boolean
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          city?: string | null
          content: string
          rating?: number
          service_id?: string | null
          city_id?: string | null
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          city?: string | null
          content?: string
          rating?: number
          service_id?: string | null
          city_id?: string | null
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
        }
      }
      faqs: {
        Row: {
          id: string
          question: string
          answer: string
          category: string | null
          service_id: string | null
          order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          question: string
          answer: string
          category?: string | null
          service_id?: string | null
          order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          category?: string | null
          service_id?: string | null
          order?: number
          is_active?: boolean
          created_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          city: string | null
          service_id: string | null
          message: string | null
          source_url: string | null
          utm_source: string | null
          utm_medium: string | null
          utm_campaign: string | null
          is_read: boolean
          is_contacted: boolean
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          city?: string | null
          service_id?: string | null
          message?: string | null
          source_url?: string | null
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          is_read?: boolean
          is_contacted?: boolean
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          city?: string | null
          service_id?: string | null
          message?: string | null
          source_url?: string | null
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          is_read?: boolean
          is_contacted?: boolean
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper types
export type Service = Database['public']['Tables']['services']['Row']
export type City = Database['public']['Tables']['cities']['Row']
export type TeamMember = Database['public']['Tables']['team_members']['Row']
export type PostCategory = Database['public']['Tables']['post_categories']['Row']
export type Post = Database['public']['Tables']['posts']['Row']
export type News = Database['public']['Tables']['news']['Row']
export type SuccessCase = Database['public']['Tables']['success_cases']['Row']
export type Testimonial = Database['public']['Tables']['testimonials']['Row']
export type FAQ = Database['public']['Tables']['faqs']['Row']
export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row']
