// Ajout du type Contact
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  createdAt: Date;
}