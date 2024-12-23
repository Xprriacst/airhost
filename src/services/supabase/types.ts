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
      properties: {
        Row: {
          id: string
          name: string
          address: string
          wifi_name: string | null
          wifi_password: string | null
          door_code: string | null
          check_in_time: string
          check_out_time: string
          max_guests: number
          description: string | null
          parking_info: string | null
          house_rules: string[] | null
          amenities: string[] | null
          restaurants: string[] | null
          fast_food: string[] | null
          emergency_contacts: string[] | null
          photos: string[] | null
          auto_pilot: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          wifi_name?: string | null
          wifi_password?: string | null
          door_code?: string | null
          check_in_time: string
          check_out_time: string
          max_guests: number
          description?: string | null
          parking_info?: string | null
          house_rules?: string[] | null
          amenities?: string[] | null
          restaurants?: string[] | null
          fast_food?: string[] | null
          emergency_contacts?: string[] | null
          photos?: string[] | null
          auto_pilot?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string
          wifi_name?: string | null
          wifi_password?: string | null
          door_code?: string | null
          check_in_time?: string
          check_out_time?: string
          max_guests?: number
          description?: string | null
          parking_info?: string | null
          house_rules?: string[] | null
          amenities?: string[] | null
          restaurants?: string[] | null
          fast_food?: string[] | null
          emergency_contacts?: string[] | null
          photos?: string[] | null
          auto_pilot?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          property_id: string
          contact_id: string
          status: string
          platform: string
          check_in_date: string | null
          check_out_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          property_id: string
          contact_id: string
          status?: string
          platform?: string
          check_in_date?: string | null
          check_out_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          contact_id?: string
          status?: string
          platform?: string
          check_in_date?: string | null
          check_out_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          text: string
          is_user: boolean
          sender: string
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          text: string
          is_user?: boolean
          sender: string
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          text?: string
          is_user?: boolean
          sender?: string
          created_at?: string
        }
      }
    }
  }
}