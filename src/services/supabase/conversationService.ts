import { supabase } from './client';
import { handleDatabaseError, logError } from './utils/errorHandler';
import type { Conversation } from '../../types';

export const conversationService = {
  async fetchAllConversations(): Promise<Conversation[]> {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          property:properties(name),
          contact:contacts(name, email),
          messages(*)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        return handleDatabaseError(error, 'fetchAllConversations');
      }

      return (data || []).map(conv => ({
        id: conv.id,
        propertyId: conv.property_id,
        guestName: conv.contact?.name || 'Unknown Guest',
        guestEmail: conv.contact?.email || '',
        checkIn: conv.check_in_date,
        checkOut: conv.check_out_date,
        messages: (conv.messages || []).map((msg: any) => ({
          id: msg.id,
          text: msg.text,
          isUser: msg.is_user,
          timestamp: new Date(msg.created_at),
          sender: msg.sender
        })),
        status: conv.status,
        platform: conv.platform
      }));
    } catch (error) {
      return logError(error, 'fetchAllConversations');
    }
  },

  async fetchPropertyConversations(propertyId: string): Promise<Conversation[]> {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          property:properties(name),
          contact:contacts(name, email),
          messages(*)
        `)
        .eq('property_id', propertyId)
        .order('created_at', { ascending: false });

      if (error) {
        return handleDatabaseError(error, 'fetchPropertyConversations');
      }

      return (data || []).map(conv => ({
        id: conv.id,
        propertyId: conv.property_id,
        guestName: conv.contact?.name || 'Unknown Guest',
        guestEmail: conv.contact?.email || '',
        checkIn: conv.check_in_date,
        checkOut: conv.check_out_date,
        messages: (conv.messages || []).map((msg: any) => ({
          id: msg.id,
          text: msg.text,
          isUser: msg.is_user,
          timestamp: new Date(msg.created_at),
          sender: msg.sender
        })),
        status: conv.status,
        platform: conv.platform
      }));
    } catch (error) {
      return logError(error, 'fetchPropertyConversations');
    }
  },

  async fetchConversationById(conversationId: string): Promise<Conversation | null> {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          property:properties(name),
          contact:contacts(name, email),
          messages(*)
        `)
        .eq('id', conversationId)
        .single();

      if (error) {
        console.error('Error fetching conversation:', error);
        return null;
      }

      if (!data) {
        return null;
      }

      return {
        id: data.id,
        propertyId: data.property_id,
        guestName: data.contact?.name || 'Unknown Guest',
        guestEmail: data.contact?.email || '',
        checkIn: data.check_in_date,
        checkOut: data.check_out_date,
        messages: (data.messages || []).map((msg: any) => ({
          id: msg.id,
          text: msg.text,
          isUser: msg.is_user,
          timestamp: new Date(msg.created_at),
          sender: msg.sender
        })),
        status: data.status,
        platform: data.platform
      };
    } catch (error) {
      console.error('Error in fetchConversationById:', error);
      return null;
    }
  },

  async addMessage(conversationId: string, message: { text: string; isUser: boolean; sender: string }) {
    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          text: message.text,
          is_user: message.isUser,
          sender: message.sender
        });

      if (error) {
        console.error('Error adding message:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in addMessage:', error);
      return false;
    }
  }
};