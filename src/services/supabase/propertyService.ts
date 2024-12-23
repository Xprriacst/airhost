import { supabase } from './client';
import type { Property } from '../../types';

export const propertyService = {
  async getProperties(): Promise<Property[]> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error);
        return [];
      }

      return data?.map(property => ({
        id: property.id,
        name: property.name,
        address: property.address,
        accessCodes: {
          wifi: {
            name: property.wifi_name || '',
            password: property.wifi_password || ''
          },
          door: property.door_code || ''
        },
        checkInTime: property.check_in_time,
        checkOutTime: property.check_out_time,
        maxGuests: property.max_guests,
        description: property.description || '',
        parkingInfo: property.parking_info || '',
        houseRules: property.house_rules || [],
        amenities: property.amenities || [],
        restaurants: property.restaurants || [],
        fastFood: property.fast_food || [],
        emergencyContacts: property.emergency_contacts || [],
        photos: property.photos || [],
        autoPilot: property.auto_pilot
      })) || [];
    } catch (error) {
      console.error('Error in getProperties:', error);
      return [];
    }
  },

  async getPropertyById(id: string): Promise<Property | null> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching property:', error);
        return null;
      }

      if (!data) {
        return null;
      }

      return {
        id: data.id,
        name: data.name,
        address: data.address,
        accessCodes: {
          wifi: {
            name: data.wifi_name || '',
            password: data.wifi_password || ''
          },
          door: data.door_code || ''
        },
        checkInTime: data.check_in_time,
        checkOutTime: data.check_out_time,
        maxGuests: data.max_guests,
        description: data.description || '',
        parkingInfo: data.parking_info || '',
        houseRules: data.house_rules || [],
        amenities: data.amenities || [],
        restaurants: data.restaurants || [],
        fastFood: data.fast_food || [],
        emergencyContacts: data.emergency_contacts || [],
        photos: data.photos || [],
        autoPilot: data.auto_pilot
      };
    } catch (error) {
      console.error('Error in getPropertyById:', error);
      return null;
    }
  },

  async createProperty(property: Omit<Property, 'id'>): Promise<Property | null> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert({
          name: property.name,
          address: property.address,
          wifi_name: property.accessCodes.wifi.name,
          wifi_password: property.accessCodes.wifi.password,
          door_code: property.accessCodes.door,
          check_in_time: property.checkInTime,
          check_out_time: property.checkOutTime,
          max_guests: property.maxGuests,
          description: property.description,
          parking_info: property.parkingInfo,
          house_rules: property.houseRules,
          amenities: property.amenities,
          restaurants: property.restaurants,
          fast_food: property.fastFood,
          emergency_contacts: property.emergencyContacts,
          photos: property.photos,
          auto_pilot: false
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating property:', error);
        return null;
      }

      return {
        id: data.id,
        name: data.name,
        address: data.address,
        accessCodes: {
          wifi: {
            name: data.wifi_name || '',
            password: data.wifi_password || ''
          },
          door: data.door_code || ''
        },
        checkInTime: data.check_in_time,
        checkOutTime: data.check_out_time,
        maxGuests: data.max_guests,
        description: data.description || '',
        parkingInfo: data.parking_info || '',
        houseRules: data.house_rules || [],
        amenities: data.amenities || [],
        restaurants: data.restaurants || [],
        fastFood: data.fast_food || [],
        emergencyContacts: data.emergency_contacts || [],
        photos: data.photos || [],
        autoPilot: data.auto_pilot
      };
    } catch (error) {
      console.error('Error in createProperty:', error);
      return null;
    }
  }
};