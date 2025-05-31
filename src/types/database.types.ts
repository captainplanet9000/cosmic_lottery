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
      reports: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string
          birth_date: string
          birth_time: string
          birth_location: string
          sun_sign: string
          moon_sign: string
          ascendant: string
          content: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email: string
          birth_date: string
          birth_time?: string
          birth_location: string
          sun_sign: string
          moon_sign?: string
          ascendant?: string
          content: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string
          birth_date?: string
          birth_time?: string
          birth_location?: string
          sun_sign?: string
          moon_sign?: string
          ascendant?: string
          content?: Json
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          created_at: string
          updated_at: string
          cosmic_coins: number
          vip_tier: string
          last_login: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          created_at?: string
          updated_at?: string
          cosmic_coins?: number
          vip_tier?: string
          last_login?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          created_at?: string
          updated_at?: string
          cosmic_coins?: number
          vip_tier?: string
          last_login?: string
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          report_id: string
          amount: number
          currency: string
          status: string
          payment_method: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          report_id: string
          amount: number
          currency: string
          status: string
          payment_method: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          report_id?: string
          amount?: number
          currency?: string
          status?: string
          payment_method?: string
          created_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          coins_reward: number
          achieved_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          coins_reward: number
          achieved_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          coins_reward?: number
          achieved_at?: string
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
      payment_status: 'pending' | 'completed' | 'failed'
      vip_tier: 'bronze' | 'silver' | 'gold' | 'platinum'
    }
  }
}