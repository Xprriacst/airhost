import { whatsappService } from '../services/whatsapp/service';
import { propertyService } from '../services/supabase/propertyService';

async function testWhatsApp() {
  console.log('\n=== Test WhatsApp Integration ===\n');

  try {
    // 1. Test de configuration
    console.log('1. Vérification de la configuration...');
    const webhookUrl = `${process.env.URL || 'https://localhost:8888'}/.netlify/functions/whatsapp-webhook`;
    const webhookSetup = await whatsappService.setupWebhook();
    
    if (webhookSetup) {
      console.log('✅ Webhook configuré:', webhookUrl);
    } else {
      throw new Error('Échec de la configuration du webhook');
    }

    // 2. Test d'envoi de message
    console.log('\n2. Test d\'envoi de message...');
    const testNumber = '+33617370484';
    const testMessage = {
      id: Date.now().toString(),
      text: 'Bonjour! Ceci est un message de test depuis AirHost. 👋',
      isUser: true,
      timestamp: new Date(),
      sender: 'Host'
    };

    const messageSent = await whatsappService.sendMessage(testNumber, testMessage);
    
    if (messageSent) {
      console.log('✅ Message envoyé avec succès');
    } else {
      throw new Error('Échec de l\'envoi du message');
    }

    console.log('\n✅ Tests terminés avec succès!\n');
  } catch (error) {
    console.error('\n❌ Erreur pendant les tests:', error);
    process.exit(1);
  }
}

testWhatsApp();