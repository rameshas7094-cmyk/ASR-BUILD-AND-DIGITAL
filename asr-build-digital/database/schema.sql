-- Create database asr_build_digital in pgAdmin first, then run this file while connected to it.

CREATE TABLE IF NOT EXISTS enquiries (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(254) NOT NULL,
  phone VARCHAR(40),
  division VARCHAR(40) NOT NULL CHECK (division IN ('Digital Solutions', 'Property & Construction')),
  service VARCHAR(120),
  message TEXT NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Quoted', 'Won', 'Lost')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS enquiries_division_idx ON enquiries (division);
