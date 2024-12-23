/*
  # Add RLS Policies for all tables
  
  1. Properties
  2. Contacts
  3. Conversations
  4. Messages
*/

-- Enable insert for authenticated users
CREATE POLICY "Enable insert for authenticated users" ON properties
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON properties
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Enable delete for authenticated users" ON properties
  FOR DELETE TO authenticated USING (true);

-- Contacts policies
CREATE POLICY "Enable insert for authenticated users" ON contacts
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON contacts
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Enable delete for authenticated users" ON contacts
  FOR DELETE TO authenticated USING (true);

-- Conversations policies
CREATE POLICY "Enable insert for authenticated users" ON conversations
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON conversations
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Enable delete for authenticated users" ON conversations
  FOR DELETE TO authenticated USING (true);

-- Messages policies
CREATE POLICY "Enable insert for authenticated users" ON messages
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON messages
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Enable delete for authenticated users" ON messages
  FOR DELETE TO authenticated USING (true);