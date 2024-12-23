/*
  # Add WhatsApp Integration Fields

  1. Changes
    - Add guest_phone to conversations table
    - Add whatsapp_message_id to messages table
    - Add whatsapp_status to messages table
    - Add indexes for better query performance

  2. Security
    - Maintain existing RLS policies
*/

-- Add WhatsApp-specific fields to conversations
ALTER TABLE conversations
ADD COLUMN guest_phone text;

-- Add WhatsApp-specific fields to messages
ALTER TABLE messages
ADD COLUMN whatsapp_message_id text,
ADD COLUMN whatsapp_status text CHECK (whatsapp_status IN ('sent', 'delivered', 'read', 'failed'));

-- Add indexes for better performance
CREATE INDEX idx_messages_whatsapp_message_id ON messages(whatsapp_message_id);
CREATE INDEX idx_conversations_guest_phone ON conversations(guest_phone);

-- Update existing RLS policies
CREATE POLICY "Enable read access for whatsapp fields"
  ON messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable update access for whatsapp fields"
  ON messages FOR UPDATE
  TO authenticated
  USING (true);