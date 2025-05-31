// backend/config/db.js
const { Pool } = require('pg');
// Ensure dotenv is configured, typically in your main index.js or here if this module is loaded first.
// If you've already configured dotenv in index.js, this line might be redundant here,
// but it's safe to call multiple times if it checks for prior loading.
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });


const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'cosmic_lottery_db',
    password: process.env.DB_PASSWORD || 'your_password', // IMPORTANT: Change default or ensure it's set in .env
    port: parseInt(process.env.DB_PORT || '5432'),
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false, // Basic SSL config
});

pool.on('connect', () => {
    console.log('Connected to the PostgreSQL database!');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool, // Export pool if direct access is needed for transactions etc.
};
