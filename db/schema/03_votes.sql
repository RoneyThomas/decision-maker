-- Drop and recreate votes table
DROP TABLE IF EXISTS votes CASCADE;
CREATE TABLE votes (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id UUID REFERENCES polls(id) ON DELETE CASCADE,
  poll_votes text [] NOT NULL
);