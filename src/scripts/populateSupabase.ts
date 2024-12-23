import { supabase } from '../services/supabase/client';

async function checkConnection() {
  try {
    const { data, error } = await supabase.from('properties').select('count');
    if (error) throw error;
    console.log('✅ Connexion à Supabase établie');
    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion à Supabase:', error);
    return false;
  }
}

async function clearData() {
  console.log('Nettoyage des données existantes...');
  const tables = ['messages', 'conversations', 'contacts', 'properties'];
  
  for (const table of tables) {
    const { error } = await supabase.from(table).delete().neq('id', '0');
    if (error) {
      console.error(`❌ Erreur lors du nettoyage de ${table}:`, error);
      throw error;
    }
  }
  console.log('✓ Nettoyage terminé');
}

async function createProperties() {
  console.log('\nCréation des propriétés...');
  const { data, error } = await supabase
    .from('properties')
    .insert([
      {
        name: 'Studio Blois',
        address: '13 rue des Papegaults, Blois',
        wifi_name: 'FREEBOX-AE4AC6',
        wifi_password: 'barbani@%-solvi38-irrogatura-cannetum?&',
        door_code: '210',
        check_in_time: '15:00',
        check_out_time: '11:00',
        max_guests: 4,
        description: 'Charmant studio en plein cœur de Blois',
        parking_info: 'Parking gratuit : Parking du Mail (5 minutes à pied)',
        house_rules: ['Max 4 personnes', 'Pas de visiteurs supplémentaires', 'Respecter le calme'],
        amenities: ['TV', 'Cuisine', 'Chauffage'],
        restaurants: ['Brute Maison de Cuisine', 'Le Diffa', "Bro's Restaurant"],
        fast_food: ["Frenchy's", 'Le Berliner', 'Osaka'],
        emergency_contacts: ['+33 6 17 37 04 84', '+33 6 20 16 93 17'],
        photos: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'],
        auto_pilot: true
      },
      {
        name: 'Villa Sunset',
        address: '123 Avenue de la Plage, Biarritz',
        wifi_name: 'SunsetVilla_5G',
        wifi_password: 'welcome2024!',
        door_code: '4080#',
        check_in_time: '15:00',
        check_out_time: '11:00',
        max_guests: 6,
        description: 'Magnifique villa avec vue sur l\'océan',
        house_rules: ['Pas de fête', 'Pas de fumée', 'Calme entre 22h et 8h'],
        amenities: ['Piscine', 'Accès plage', 'Parking gratuit'],
        photos: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6'],
        auto_pilot: false
      }
    ])
    .select();

  if (error) throw error;
  console.log('✓ Propriétés créées avec succès');
  return data;
}

async function createContacts() {
  console.log('\nCréation des contacts...');
  const { data, error } = await supabase
    .from('contacts')
    .insert([
      {
        name: 'Pierre Dubois',
        email: 'pierre.dubois@example.com',
        phone: '+33617370484',
        notes: 'Client régulier'
      },
      {
        name: 'Marie Laurent',
        email: 'marie.laurent@example.com',
        phone: '+33620169317',
        notes: 'Première réservation'
      }
    ])
    .select();

  if (error) throw error;
  console.log('✓ Contacts créés avec succès');
  return data;
}

async function createConversations(properties: any[], contacts: any[]) {
  console.log('\nCréation des conversations...');
  const { data, error } = await supabase
    .from('conversations')
    .insert([
      {
        property_id: properties[0].id,
        contact_id: contacts[0].id,
        status: 'active',
        platform: 'whatsapp',
        check_in_date: '2024-03-15',
        check_out_date: '2024-03-20'
      },
      {
        property_id: properties[1].id,
        contact_id: contacts[1].id,
        status: 'active',
        platform: 'whatsapp',
        check_in_date: '2024-03-20',
        check_out_date: '2024-03-25'
      }
    ])
    .select();

  if (error) throw error;
  console.log('✓ Conversations créées avec succès');
  return data;
}

async function createMessages(conversations: any[]) {
  console.log('\nCréation des messages...');
  const { error } = await supabase
    .from('messages')
    .insert([
      {
        conversation_id: conversations[0].id,
        text: 'Bonjour, je viens d\'arriver. Où puis-je trouver le code WiFi ?',
        is_user: false,
        sender: 'Pierre Dubois'
      },
      {
        conversation_id: conversations[0].id,
        text: 'Bonjour ! Le code WiFi est affiché sur le routeur dans le salon. N\'hésitez pas si vous avez d\'autres questions.',
        is_user: true,
        sender: 'Host'
      },
      {
        conversation_id: conversations[1].id,
        text: 'Bonjour, à quelle heure est le check-out demain ?',
        is_user: false,
        sender: 'Marie Laurent'
      },
      {
        conversation_id: conversations[1].id,
        text: 'Bonjour Marie, le check-out est à 11h. Vous pouvez laisser les clés sur la table de la cuisine.',
        is_user: true,
        sender: 'Host'
      }
    ]);

  if (error) throw error;
  console.log('✓ Messages créés avec succès');
}

async function populateTestData() {
  console.log('\n=== Création des données de test dans Supabase ===\n');

  try {
    // Vérifier la connexion
    const connected = await checkConnection();
    if (!connected) {
      process.exit(1);
    }

    // Nettoyer les données existantes
    await clearData();

    // Créer les données dans l'ordre
    const properties = await createProperties();
    const contacts = await createContacts();
    const conversations = await createConversations(properties, contacts);
    await createMessages(conversations);

    console.log('\n✅ Toutes les données de test ont été créées avec succès !');
  } catch (error) {
    console.error('\n❌ Erreur lors de la création des données de test:', error);
    process.exit(1);
  }
}

populateTestData();