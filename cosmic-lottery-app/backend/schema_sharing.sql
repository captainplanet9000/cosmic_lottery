-- This SQL should be run against your PostgreSQL database to add sharing features.

-- Add columns to the 'reports' table for sharing functionality
ALTER TABLE reports
ADD COLUMN IF NOT EXISTS share_token VARCHAR(64) UNIQUE NULL,
ADD COLUMN IF NOT EXISTS is_shared BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS share_token_generated_at TIMESTAMP WITH TIME ZONE NULL;

-- Comments for the new columns
COMMENT ON COLUMN reports.share_token IS 'Unique token for sharing a report. Null if not shared or sharing is disabled.';
COMMENT ON COLUMN reports.is_shared IS 'Boolean flag to indicate if the report is currently shared (TRUE) or not (FALSE).';
COMMENT ON COLUMN reports.share_token_generated_at IS 'Timestamp of when the share token was generated or sharing was last enabled.';

-- Optional: Index on share_token for faster lookups on the public shared report page
-- This index is created IF NOT EXISTS to prevent errors on re-runs.
CREATE INDEX IF NOT EXISTS idx_reports_share_token ON reports(share_token);

-- Instructions for developer:
-- 1. Connect to your PostgreSQL database (e.g., cosmic_lottery_db).
-- 2. Run the SQL commands in this file.
--    Using psql: psql -U your_db_user -d cosmic_lottery_db -a -f path/to/schema_sharing.sql
-- 3. Verify the columns and index are added to the 'reports' table:
--    \d reports
--    SELECT indexname FROM pg_indexes WHERE tablename = 'reports';

-- Example of how to check a report after modification:
-- SELECT id, user_id, report_title, is_shared, share_token, share_token_generated_at FROM reports WHERE id = YOUR_REPORT_ID;
