-- Create property_estimates table to track all property valuations
CREATE TABLE IF NOT EXISTS property_estimates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  
  -- Address Information
  street_number TEXT NOT NULL,
  street_name TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  
  -- Property Details
  property_type TEXT NOT NULL,
  property_style TEXT NOT NULL,
  square_footage INTEGER,
  year_built INTEGER,
  num_bedrooms INTEGER,
  num_bathrooms INTEGER,
  num_parking_spaces INTEGER,
  
  -- Basement Information
  basement_type TEXT,
  basement_finished BOOLEAN,
  basement_bedrooms INTEGER,
  
  -- Financial Information
  annual_taxes NUMERIC(10, 2),
  
  -- API Response Data (stored as JSONB for flexibility)
  estimate_data JSONB,
  
  -- Estimate Summary (for quick access)
  estimated_value NUMERIC(12, 2),
  estimated_value_low NUMERIC(12, 2),
  estimated_value_high NUMERIC(12, 2),
  confidence_score INTEGER,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_property_estimates_lead_id ON property_estimates(lead_id);
CREATE INDEX IF NOT EXISTS idx_property_estimates_city ON property_estimates(city);
CREATE INDEX IF NOT EXISTS idx_property_estimates_created_at ON property_estimates(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_property_estimates_postal_code ON property_estimates(postal_code);

-- Enable Row Level Security
ALTER TABLE property_estimates ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for property estimates)
CREATE POLICY "Allow public insert" ON property_estimates
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow service role to read all
CREATE POLICY "Allow service role to read all" ON property_estimates
  FOR SELECT
  TO service_role
  USING (true);
