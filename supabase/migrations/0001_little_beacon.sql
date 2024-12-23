/*
  # Initial Schema Setup

  1. New Tables
    - properties
      - id (uuid, primary key)
      - name (text)
      - address (text) 
      - wifi_name (text)
      - wifi_password (text)
      - door_code (text)
      - check_in_time (time)
      - check_out_time (time)
      - max_guests (int)
      - description (text)
      - parking_info (text)
      - house_rules (text[])
      - amenities (text[])
      - restaurants (text[])
      - fast_food (text[])
      - emergency_contacts (text[])
      - photos (text[])
      - auto_pilot (boolean)
      - created_at (timestamptz)
      - updated_at (timestamptz)

    - contacts
      - id (uuid, primary key)
      - name (text)
      - email (text)
      - phone (text)
      - notes (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)

    - conversations
      - id (uuid, primary key)
      - property_id (uuid, foreign key)
      - contact_id (uuid, foreign key)
      - status (text)
      - platform (text)
      - check_in_date (date)
      - check_out_date (date)
      - created_at (timestamptz)
      - updated_at (timestamptz)

    - messages
      - id (uuid, primary key)
      - conversation_id (uuid, foreign key)
      - text (text)
      - is_user (boolean)
      - sender (text)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Properties table
CREATE TABLE properties (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  address text NOT NULL,
  wifi_name text,
  wifi_password text,
  door_code text,
  check_in_time time NOT NULL,
  check_out_time time NOT NULL,
  max_guests int NOT NULL,
  description text,
  parking_info text,
  house_rules text[],
  amenities text[],
  restaurants text[],
  fast_food text[],
  emergency_contacts text[],
  photos text[],
  auto_pilot boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Contacts table
CREATE TABLE contacts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Conversations table
CREATE TABLE conversations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  contact_id uuid REFERENCES contacts(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'active',
  platform text NOT NULL DEFAULT 'whatsapp',
  check_in_date date,
  check_out_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Messages table
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id uuid REFERENCES conversations(id) ON DELETE CASCADE,
  text text NOT NULL,
  is_user boolean NOT NULL DEFAULT false,
  sender text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for authenticated users" ON properties
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable read access for authenticated users" ON contacts
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable read access for authenticated users" ON conversations
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable read access for authenticated users" ON messages
  FOR SELECT TO authenticated USING (true);

-- Create indexes
CREATE INDEX idx_conversations_property_id ON conversations(property_id);
CREATE INDEX idx_conversations_contact_id ON conversations(contact_id);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_contacts_email ON contacts(email);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();