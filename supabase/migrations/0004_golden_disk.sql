-- Réactiver RLS
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policies pour les propriétés
CREATE POLICY "Enable read access for authenticated users"
ON properties FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert for authenticated users"
ON properties FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users"
ON properties FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Enable delete for authenticated users"
ON properties FOR DELETE
TO authenticated
USING (true);

-- Policies pour les contacts
CREATE POLICY "Enable read access for authenticated users"
ON contacts FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert for authenticated users"
ON contacts FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users"
ON contacts FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Enable delete for authenticated users"
ON contacts FOR DELETE
TO authenticated
USING (true);

-- Policies pour les conversations
CREATE POLICY "Enable read access for authenticated users"
ON conversations FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert for authenticated users"
ON conversations FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users"
ON conversations FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Enable delete for authenticated users"
ON conversations FOR DELETE
TO authenticated
USING (true);

-- Policies pour les messages
CREATE POLICY "Enable read access for authenticated users"
ON messages FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert for authenticated users"
ON messages FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users"
ON messages FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Enable delete for authenticated users"
ON messages FOR DELETE
TO authenticated
USING (true);