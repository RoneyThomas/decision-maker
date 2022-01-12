-- Drop and recreate votes table
DROP TABLE IF EXISTS votes CASCADE;
CREATE TABLE votes (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_votes INT [] NOT NULL,
  poll_id UUID REFERENCES polls(id) ON DELETE CASCADE
);