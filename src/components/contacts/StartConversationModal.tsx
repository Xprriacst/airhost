import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { propertyService } from '../../services/supabase/propertyService';
import { supabase } from '../../services/supabase/client';
import type { Contact, Property } from '../../types';

interface StartConversationModalProps {
  contact: Contact;
  onClose: () => void;
}

const StartConversationModal: React.FC<StartConversationModalProps> = ({ contact, onClose }) => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await propertyService.getProperties();
        setProperties(data);
      } catch (err) {
        setError('Erreur lors du chargement des propriétés');
      }
    };
    fetchProperties();
  }, []);

  const handleStartConversation = async () => {
    if (!selectedProperty) return;
    
    setLoading(true);
    setError(null);

    try {
      // 1. Create conversation
      const { data: conversation, error: conversationError } = await supabase
        .from('conversations')
        .insert({
          property_id: selectedProperty,
          contact_id: contact.id,
          status: 'active',
          platform: 'whatsapp'
        })
        .select()
        .single();

      if (conversationError) throw conversationError;

      // 2. Add initial message
      const { error: messageError } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversation.id,
          text: 'Conversation démarrée',
          is_user: true,
          sender: 'Host'
        });

      if (messageError) throw messageError;

      onClose();
      navigate(`/properties/${selectedProperty}/conversations/${conversation.id}`);
    } catch (err) {
      console.error('Error creating conversation:', err);
      setError('Erreur lors de la création de la conversation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Démarrer une conversation</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sélectionnez une propriété
            </label>
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Choisir une propriété...</option>
              {properties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.name}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={handleStartConversation}
              disabled={!selectedProperty || loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Création...' : 'Démarrer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartConversationModal;