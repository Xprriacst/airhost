/*
  # Update Row Level Security Policies

  1. Changes
    - Re-enable RLS for all tables
    - Add missing policies for authenticated users
    - Fix duplicate policy names by using unique identifiers

  2. Security
    - Enable RLS on all tables
    - Grant appropriate CRUD permissions to authenticated users
    - Ensure each policy has a unique name
*/

-- Re-enable RLS
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Properties policies
CREATE POLICY "properties_insert_policy" ON properties
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "properties_update_policy" ON properties
  FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "properties_delete_policy" ON properties
  FOR DELETE TO authenticated
  USING (true);

-- Contacts policies
CREATE POLICY "contacts_select_policy" ON contacts
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "contacts_insert_policy" ON contacts
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "contacts_update_policy" ON contacts
  FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "contacts_delete_policy" ON contacts
  FOR DELETE TO authenticated
  USING (true);

-- Conversations policies
CREATE POLICY "conversations_select_policy" ON conversations
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "conversations_insert_policy" ON conversations
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "conversations_update_policy" ON conversations
  FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "conversations_delete_policy" ON conversations
  FOR DELETE TO authenticated
  USING (true);

-- Messages policies
CREATE POLICY "messages_select_policy" ON messages
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "messages_insert_policy" ON messages
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "messages_update_policy" ON messages
  FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "messages_delete_policy" ON messages
  FOR DELETE TO authenticated
  USING (true);