-- Make sure to connect to your PostgreSQL instance and run these commands,
-- typically in a database named 'cosmic_lottery_db' or as configured in your .env file.

-- Drop tables if they exist (optional, for a clean setup during development)
-- DROP TABLE IF EXISTS reports;
-- DROP TABLE IF EXISTS users;

-- users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    stripe_customer_id VARCHAR(255) UNIQUE -- For linking to Stripe customers
    -- Add other user-related fields here, e.g., subscription status, report credits
    -- is_subscribed BOOLEAN DEFAULT FALSE,
    -- report_credits INTEGER DEFAULT 0
);

-- reports table
CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- Ensures reports are deleted if user is deleted
    report_title VARCHAR(255) NOT NULL,
    -- Input parameters used for generation, for reference
    input_name VARCHAR(255),
    input_birth_date DATE,
    input_birth_time TIME,
    input_birth_place TEXT,
    -- Report content, structured into slides
    slide1_title TEXT,
    slide1_content TEXT,
    slide2_title TEXT,
    slide2_content TEXT,
    slide3_title TEXT,
    slide3_content TEXT,
    slide4_title TEXT,
    slide4_content TEXT,
    slide5_title TEXT,
    slide5_content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- For payment tracking, if reports are tied to individual purchases
    stripe_payment_intent_id VARCHAR(255) UNIQUE
);

-- Indexes for faster lookups (optional but recommended for larger tables)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_reports_user_id ON reports(user_id);

-- You can add more ALTER TABLE statements here for future migrations
-- For example, adding a new column:
-- ALTER TABLE users ADD COLUMN last_login TIMESTAMP WITH TIME ZONE;

-- Note on running this file:
-- 1. Ensure PostgreSQL is installed and running.
-- 2. Create your database (e.g., `CREATE DATABASE cosmic_lottery_db;`)
-- 3. Connect to your database (e.g., `\c cosmic_lottery_db`)
-- 4. Run the content of this file. You can do this via psql command line:
--    `psql -U your_db_user -d cosmic_lottery_db -a -f path/to/schema.sql`
--    (Replace your_db_user, cosmic_lottery_db, and path/to/schema.sql accordingly)
--    You will be prompted for the password if it's set up for the user.
--    Alternatively, copy and paste the SQL commands into a SQL client connected to your database.

-- After running, verify tables are created:
-- \dt
-- SELECT * FROM users LIMIT 1;
-- SELECT * FROM reports LIMIT 1;
