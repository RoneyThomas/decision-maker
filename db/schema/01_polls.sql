-- Drop and recreate polls table
DROP TABLE IF EXISTS polls CASCADE;

-- required only once / database to use the gen_random_uuid() function
-- CREATE EXTENSION IF EXISTS pgcrypto; 

CREATE TABLE polls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  decision VARCHAR(255) NOT NULL,
  description TEXT,
  electorate_size INT,
  start_time TIME,
  end_time TIME,
  email VARCHAR(255) NOT NULL
);
