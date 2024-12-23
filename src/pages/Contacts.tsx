import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import ContactList from '../components/contacts/ContactList';
import ContactForm from '../components/contacts/ContactForm';
import { contactService } from '../services/supabase/contactService';
import type { Contact } from '../types';

const Contacts: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await contactService.getContacts();
        setContacts(data);
      } catch (err) {
        setError('Erreur lors du chargement des contacts');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleAddContact = async (contact: Omit<Contact, 'id' | 'createdAt'>) => {
    try {
      const newContact = await contactService.createContact(contact);
      if (newContact) {
        setContacts(prev => [newContact, ...prev]);
        setShowForm(false);
      }
    } catch (err) {
      setError('Erreur lors de la création du contact');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-600 mt-1">
            Gérez vos contacts et démarrez des conversations
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouveau Contact
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      <ContactList contacts={contacts} />

      {showForm && (
        <ContactForm
          onSubmit={handleAddContact}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Contacts;