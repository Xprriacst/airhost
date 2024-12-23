import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import ConversationList from '../components/ConversationList';
import { conversationService } from '../services';
import type { Conversation } from '../types';

const Conversations: React.FC = () => {
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedConversations = propertyId 
          ? await conversationService.fetchPropertyConversations(propertyId)
          : await conversationService.fetchAllConversations();
        setConversations(fetchedConversations);
      } catch (err) {
        setError('Failed to load conversations');
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, [propertyId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {propertyId ? 'Property Conversations' : 'All Conversations'}
        </h1>
      </div>

      {conversations.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations yet</h3>
          <p className="text-gray-500">Start by adding your first conversation</p>
        </div>
      ) : (
        <ConversationList
          conversations={conversations}
          onSelectConversation={(conversation) => {
            navigate(`/properties/${conversation.propertyId}/conversations/${conversation.id}`);
          }}
        />
      )}
    </div>
  );
};

export default Conversations;