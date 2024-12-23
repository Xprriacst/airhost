import React, { useState, useEffect } from 'react';
import { Plus, MessageSquare, Users, Clock } from 'lucide-react';
import { propertyService } from '../../services';
import PropertyForm from '../../components/properties/PropertyForm';
import type { Property } from '../../types';

const Properties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const data = await propertyService.getProperties();
      setProperties(data);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('Failed to load properties. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProperty = async (property: Omit<Property, 'id'>) => {
    try {
      const newProperty = await propertyService.createProperty(property);
      if (newProperty) {
        setProperties(prev => [newProperty, ...prev]);
        setShowForm(false);
      }
    } catch (err) {
      console.error('Error creating property:', err);
      setError('Failed to create property. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mes Propriétés</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Ajouter une propriété
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {properties.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune propriété</h3>
          <p className="text-gray-500">Commencez par ajouter votre première propriété.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={property.photos?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{property.name}</h3>
                <p className="text-gray-600 mb-4">{property.address}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Max {property.maxGuests} guests</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Check-in: {property.checkInTime}</span>
                  </div>
                </div>

                <button
                  onClick={() => {/* Handle view conversations */}}
                  className="w-full mt-4 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Voir les conversations
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <PropertyForm
          onSubmit={handleCreateProperty}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Properties;