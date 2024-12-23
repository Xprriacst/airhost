import { supabase } from './client';
import type { Contact } from '../../types';

export const contactService = {
  async getContacts(): Promise<Contact[]> {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }

    return data.map(contact => ({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      notes: contact.notes || undefined,
      createdAt: new Date(contact.created_at)
    }));
  },

  async createContact(contact: Omit<Contact, 'id' | 'createdAt'>): Promise<Contact | null> {
    const { data, error } = await supabase
      .from('contacts')
      .insert({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        notes: contact.notes || null
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating contact:', error);
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      notes: data.notes || undefined,
      createdAt: new Date(data.created_at)
    };
  },

  async updateContact(id: string, contact: Partial<Contact>): Promise<Contact | null> {
    const { data, error } = await supabase
      .from('contacts')
      .update({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        notes: contact.notes || null
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating contact:', error);
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      notes: data.notes || undefined,
      createdAt: new Date(data.created_at)
    };
  },

  async deleteContact(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting contact:', error);
      return false;
    }

    return true;
  }
};