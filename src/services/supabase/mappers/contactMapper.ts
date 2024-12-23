import type { Contact } from '../../../types';
import type { Database } from '../types';

type ContactRow = Database['public']['Tables']['contacts']['Row'];

export const mapContactFromRow = (row: ContactRow): Contact => ({
  id: row.id,
  name: row.name,
  email: row.email,
  phone: row.phone,
  notes: row.notes || undefined,
  createdAt: new Date(row.created_at)
});

export const mapContactToInsert = (contact: Omit<Contact, 'id' | 'createdAt'>) => ({
  name: contact.name,
  email: contact.email,
  phone: contact.phone,
  notes: contact.notes || null
});