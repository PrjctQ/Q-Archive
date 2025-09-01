-- Create the articles table
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL,
  inserted_at TIMESTAMP DEFAULT NOW()
);
