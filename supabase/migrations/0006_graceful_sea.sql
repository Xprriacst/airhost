-- Add policies for authenticated users
CREATE POLICY "Enable read for authenticated users only" ON properties
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable read for authenticated users only" ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable read for authenticated users only" ON conversations
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable read for authenticated users only" ON messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);