-- Drop and recreate polls table
DROP TABLE IF EXISTS polls CASCADE;
CREATE TABLE polls (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  electorate_size INT,
  start_time TIME,
  end_time TIME,
  email VARCHAR(255) NOT NULL
);
