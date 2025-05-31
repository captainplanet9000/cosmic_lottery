// backend/services/emailService.js
const sgMail = require('@sendgrid/mail');

// It's crucial that SENDGRID_API_KEY is loaded from .env before this file is required and executed.
// Ensure require('dotenv').config() is called at the very top of your main application file (e.g., index.js).
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log('SendGrid API key configured.');
} else {
    console.error('SENDGRID_API_KEY not found in environment variables. Emailing will fail.');
    // You could throw an error here to halt startup if email is critical,
    // or allow it to proceed if email is non-essential and can fail gracefully.
}

const sendEmail = async (to, subject, html, text) => { // Added optional 'text' parameter
    if (!process.env.SENDGRID_API_KEY) {
        console.error('Cannot send email: SENDGRID_API_KEY is not set.');
        return { success: false, error: 'Email service not configured (API key missing).' };
    }
    if (!process.env.SENDGRID_FROM_EMAIL) {
        console.error('Cannot send email: SENDGRID_FROM_EMAIL is not set.');
        return { success: false, error: 'Email service not configured (FROM email missing).' };
    }

    const msg = {
        to,
        from: {
            email: process.env.SENDGRID_FROM_EMAIL,
            name: 'Cosmic Lottery Support' // Optional: Sender name
        },
        subject,
        html,
        text: text || html.replace(/<[^>]+>/g, ''), // Basic text version if not provided
    };

    try {
        await sgMail.send(msg);
        console.log('Email sent successfully to', to);
        return { success: true };
    } catch (error) {
        console.error('Error sending email via SendGrid:');
        if (error.response) {
            // Log detailed error from SendGrid
            console.error('Status Code:', error.response.statusCode);
            console.error('Headers:', error.response.headers);
            console.error('Body:', error.response.body); // This usually contains detailed error messages
        } else {
            // Log other types of errors (e.g., network issues before reaching SendGrid)
            console.error('Error message:', error.message);
        }
        return { success: false, error: error.message, details: error.response ? error.response.body : null };
    }
};

module.exports = { sendEmail };
