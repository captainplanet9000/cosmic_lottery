-- This SQL should be run against your PostgreSQL database.
-- It adds the user_report_credits table and a trigger function
-- for automatically updating the updated_at timestamp.

-- user_report_credits table
CREATE TABLE IF NOT EXISTS user_report_credits (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    credits_available INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Comment explaining the purpose of the table:
COMMENT ON TABLE user_report_credits IS 'Stores the number of report generation credits available to each user.';
COMMENT ON COLUMN user_report_credits.user_id IS 'Foreign key referencing the users table. Each user has one row here.';
COMMENT ON COLUMN user_report_credits.credits_available IS 'Number of reports the user can generate.';
COMMENT ON COLUMN user_report_credits.updated_at IS 'Timestamp of the last update to the credit balance.';


-- Function to update timestamp on update
-- This function is reusable for any table that has an 'updated_at' column.
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION trigger_set_timestamp() IS 'Updates the updated_at column to the current timestamp upon a row update.';

-- Trigger to update timestamp for user_report_credits
-- Check if the trigger already exists before creating to avoid errors on re-runs.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_trigger
        WHERE tgname = 'set_user_report_credits_timestamp'
    ) THEN
        CREATE TRIGGER set_user_report_credits_timestamp
        BEFORE UPDATE ON user_report_credits
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_timestamp();

        COMMENT ON TRIGGER set_user_report_credits_timestamp ON user_report_credits IS 'Automatically updates the updated_at timestamp whenever a user''s credit balance is modified.';
    END IF;
END
$$;


-- Ensure the users table has stripe_customer_id (added in a previous schema.sql, but good to verify)
-- If it wasn't added or was missed, this is a good place to ensure it.
-- Example:
-- ALTER TABLE users
-- ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR(255) UNIQUE;
-- COMMENT ON COLUMN users.stripe_customer_id IS 'Stores the Stripe Customer ID for linking users to Stripe subscriptions/payments.';

-- Instructions for developer:
-- 1. Connect to your PostgreSQL database (e.g., cosmic_lottery_db).
-- 2. Run the SQL commands in this file.
--    Using psql: psql -U your_db_user -d cosmic_lottery_db -a -f path/to/schema_credits.sql
-- 3. Verify the table and trigger are created:
--    \dt user_report_credits
--    SELECT tgname FROM pg_trigger WHERE tgrelid = 'user_report_credits'::regclass;

-- Initial credit grant (optional example, might be handled by purchases):
-- INSERT INTO user_report_credits (user_id, credits_available) VALUES (some_user_id, 1)
-- ON CONFLICT (user_id) DO UPDATE SET credits_available = user_report_credits.credits_available + 1;
