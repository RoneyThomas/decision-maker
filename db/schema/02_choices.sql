-- Drop and recreate choices table
DROP TABLE IF EXISTS choices CASCADE;
CREATE TABLE choices (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id UUID REFERENCES polls(id) ON DELETE CASCADE,
  choices text [] NOT NULL,
  max_selection SMALLINT DEFAULT 1
);