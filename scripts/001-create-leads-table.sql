-- Create leads table to track all property estimate leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for lead capture)
CREATE POLICY "Allow public insert" ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow service role to read all
CREATE POLICY "Allow service role to read all" ON leads
  FOR SELECT
  TO service_role
  USING (true);
