import React, { useState } from 'react';
import { MessageSquare, Phone, Mail } from 'lucide-react';
import type { Contact } from '../../types';
import StartConversationModal from './StartConversationModal';

interface ContactListProps {
  contacts: Contact[];
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  if (contacts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun contact</h3>
        <p className="text-gray-500">Commencez par ajouter votre premier contact.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{contact.name}</h3>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600 flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {contact.phone}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {contact.email}
                  </p>
                </div>
              </div>
              <button
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md flex items-center gap-2"
                onClick={() => setSelectedContact(contact)}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Démarrer</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedContact && (
        <StartConversationModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}
    </>
  );
};

export default ContactList;