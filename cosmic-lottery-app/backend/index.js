// backend/index.js
require('dotenv').config(); // Load environment variables at the very top
const express = require('express');
const bcrypt = require('bcryptjs');
const OpenAI = require('openai'); // Import OpenAI library
// const jwt = require('jsonwebtoken'); // If using JWTs
const cors = require('cors'); // Import cors
const app = express();
const port = process.env.PORT || 3001;

const openai = new OpenAI({ // Initialize OpenAI client
    apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies (this should generally be before specific raw routes if not handled carefully)

const db = require('./config/db'); // Import database configuration

// --- Registration Route ---
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const existingUserResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUserResult.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists with this email.' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUserResult = await db.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at',
            [email, passwordHash]
        );
        const newUser = newUserResult.rows[0];

        res.status(201).json({
            message: 'User registered successfully',
            userId: newUser.id,
            email: newUser.email,
            createdAt: newUser.created_at
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// --- Login Route ---
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials (user not found)' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials (password mismatch)' });
        }
        res.status(200).json({
            message: 'Login successful',
            userId: user.id,
            email: user.email
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// --- Email Report Endpoint ---
const { sendEmail } = require('./services/emailService'); // Adjust path if your service is elsewhere

app.post('/api/reports/:reportId/email', async (req, res) => {
    const { userId, recipientEmail: customRecipientEmail } = req.body;
    const { reportId } = req.params;

    if (!userId) {
        // In a real app, this would be req.user.id from auth middleware
        return res.status(401).json({ message: 'User authentication required.' });
    }

    try {
        // 1. Verify report ownership and fetch report data
        const reportRes = await db.query(
            'SELECT * FROM reports WHERE id = $1 AND user_id = $2',
            [reportId, userId]
        );
        if (reportRes.rows.length === 0) {
            return res.status(404).json({ message: 'Report not found or access denied.' });
        }
        const report = reportRes.rows[0];

        // 2. Determine target email
        let targetEmail = customRecipientEmail;
        if (!targetEmail) { // If no custom recipient, send to the report owner
            const userRes = await db.query('SELECT email FROM users WHERE id = $1', [userId]);
            if (userRes.rows.length > 0) {
                targetEmail = userRes.rows[0].email;
            } else {
                // This case should ideally not happen if userId is valid and report ownership is verified
                return res.status(404).json({ message: 'Report owner email not found.' });
            }
        }

        if (!targetEmail) { // Should be caught by previous checks, but as a safeguard
            return res.status(400).json({ message: 'Recipient email is required and could not be determined.' });
        }

        // 3. Format report for HTML email
        let htmlContent = `<h1>${report.report_title}</h1>`;
        htmlContent += `<p>This report was generated for: ${report.input_name || 'N/A'}`;
        if (report.input_birth_date) htmlContent += ` (Born: ${new Date(report.input_birth_date).toLocaleDateString()})`;
        if (report.input_birth_time) htmlContent += ` at ${report.input_birth_time}`;
        if (report.input_birth_place) htmlContent += ` in ${report.input_birth_place}`;
        htmlContent += `)</p><hr style="margin: 20px 0;">`;

        for (let i = 1; i <= 5; i++) {
            const slideTitle = report[`slide${i}_title`];
            const slideContent = report[`slide${i}_content`];
            if (slideTitle && slideContent) {
                htmlContent += `<h2 style="color: #5A67D8; margin-top: 25px;">${slideTitle}</h2><div style="font-size: 1.1em; line-height: 1.6;">${slideContent.replace(/\n/g, '<br>')}</div>`;
            }
        }
        htmlContent += `<br><hr style="margin: 20px 0;"><p style="font-size: 0.9em; color: #718096;">Thank you for using Cosmic Lottery! Explore more at <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}">our website</a>.</p>`;
        htmlContent += `<p style="font-size: 0.8em; color: #A0AEC0;">Report ID: ${report.id}</p>`;

        // 4. Send email
        const emailResult = await sendEmail(
            targetEmail,
            `Your Cosmic Lottery Report: ${report.report_title}`,
            htmlContent
        );

        if (emailResult.success) {
            res.status(200).json({ message: `Report successfully emailed to ${targetEmail}` });
        } else {
            // Log the full error for backend diagnostics if needed
            console.error("Email sending failed with internal service error:", emailResult.error, "Details:", emailResult.details);
            res.status(500).json({ message: 'Failed to send email due to an internal error.', error: emailResult.error });
        }

    } catch (error) {
        console.error('Error processing /email-report request:', error);
        res.status(500).json({ message: 'Server error while preparing to email report.' });
    }
});


app.get('/', (req, res) => {
  res.send('Cosmic Lottery Backend is running!');
});


// Stripe Configuration
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Stripe Webhook Handler - IMPORTANT: This route needs to be before app.use(express.json())
// if express.json() is registered globally, or use specific middleware order.
// For simplicity, we'll assume express.json() is not globally breaking raw body parsing here,
// but in complex apps, ensure raw body is available for Stripe.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
app.post('/api/stripe/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log('Webhook event received:', event.type);
  } catch (err) {
    console.error(`Webhook signature verification failed:`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('CheckoutSession completed. Session ID:', session.id, 'Payment Status:', session.payment_status);

    if (session.payment_status === 'paid') {
      const userId = session.metadata.userId;
      const reportCreditsToGrant = parseInt(session.metadata.reportCreditsToGrant);
      const stripeCustomerId = session.customer;

      if (!userId) {
        console.error('Webhook Error: Missing userId in session metadata for session:', session.id);
        return res.status(400).send('Webhook Error: Missing userId in metadata.');
      }
      if (isNaN(reportCreditsToGrant) || reportCreditsToGrant <= 0) {
        console.error('Webhook Error: Invalid reportCreditsToGrant in session metadata for session:', session.id);
        return res.status(400).send('Webhook Error: Invalid reportCreditsToGrant in metadata.');
      }

      console.log(`Processing payment for user ${userId}, granting ${reportCreditsToGrant} credits. Stripe Customer ID: ${stripeCustomerId}`);

      try {
        if (stripeCustomerId) {
          await db.query(
            'UPDATE users SET stripe_customer_id = $1 WHERE id = $2 AND (stripe_customer_id IS NULL OR stripe_customer_id != $1)',
            [stripeCustomerId, userId]
          );
          console.log(`Updated Stripe Customer ID for user ${userId} to ${stripeCustomerId}`);
        }

        const creditResult = await db.query(
          `INSERT INTO user_report_credits (user_id, credits_available)
           VALUES ($1, $2)
           ON CONFLICT (user_id) DO UPDATE SET
           credits_available = user_report_credits.credits_available + $2,
           updated_at = NOW()
           RETURNING credits_available;`,
          [userId, reportCreditsToGrant]
        );
        console.log(`User ${userId} granted ${reportCreditsToGrant} credits. New total: ${creditResult.rows[0].credits_available}`);
      } catch (dbError) {
        console.error(`Database error processing webhook for user ${userId}, session ${session.id}:`, dbError);
        return res.status(500).send('Database error processing event.');
      }
    } else {
        console.log(`Checkout session ${session.id} payment status: ${session.payment_status}. No credits granted.`);
    }
  } else {
    console.log(`Received unhandled event type ${event.type}`);
  }
  res.status(200).send();
});

// General app.use(express.json()) should be after routes that need raw body, like webhooks.
// If it was global before, it's fine here. If not, it was added earlier.

// --- Stripe Create Checkout Session Route ---
app.post('/api/stripe/create-checkout-session', async (req, res) => {
    const { itemId, userId } = req.body;

    if (!itemId || !userId) {
        return res.status(400).json({ error: 'Missing itemId or userId in request.' });
    }

    let line_items;
    let metadata;

    if (itemId === 'single_report_20000') {
        line_items = [{
            price_data: { currency: 'usd', product_data: { name: 'Single Cosmic Report' }, unit_amount: 20000 },
            quantity: 1,
        }];
        metadata = { userId, purchaseType: 'single_report', reportCreditsToGrant: 1, itemId };
    } else if (itemId === 'bundle_3_reports_48000') {
        line_items = [{
            price_data: { currency: 'usd', product_data: { name: '3 Report Bundle' }, unit_amount: 48000 },
            quantity: 1,
        }];
        metadata = { userId, purchaseType: 'bundle_3_reports', reportCreditsToGrant: 3, itemId };
    } else {
        return res.status(400).json({ error: 'Invalid itemId provided.' });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment-cancel`,
            metadata: metadata,
            client_reference_id: userId,
        });
        res.json({ id: session.id });
    } catch (error) {
        console.error("Stripe session creation error:", error);
        res.status(500).json({ error: 'Failed to create Stripe session' });
    }
});

// --- Report Generation Route ---
app.post('/api/report/generate', async (req, res) => {
    const { userId, name, birthDate, birthTime, birthPlace } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'userId is required to save the report.' });
    }
    if (!name || !birthDate || !birthTime || !birthPlace) {
        return res.status(400).json({ message: 'All fields (name, birthDate, birthTime, birthPlace) are required for report generation.' });
    }

    console.log("Sending prompt to OpenAI for user:", userId, "Name:", name);

    try {
        const creditCheckResult = await db.query('SELECT credits_available FROM user_report_credits WHERE user_id = $1', [userId]);

        if (creditCheckResult.rows.length === 0 || creditCheckResult.rows[0].credits_available <= 0) {
            return res.status(402).json({ message: 'No report credits available. Please purchase a report or bundle.' });
        }

        const promptString = `Create a detailed, high-level natal chart analysis for ${name}, born on ${birthDate} at ${birthTime} in ${birthPlace}. Organize the reading into five key areas:
1. Psychological and Personality Profile
2. Career and Vocational Strengths
3. Relationship Style and Love Patterns
4. Karmic Lessons and Past Life Indicators
5. Current Major Transits (next 1–2 years)

Interpret with nuance using classical and modern astrology, integrating house placements, planetary dignities, major aspects, nodal axis, and current planetary transits. Format it as if written by a professional astrologer for a personal client. Avoid clichés and make it psychologically insightful and specific to the chart. Ensure each section begins with its designated numbered heading (e.g., "1. Psychological and Personality Profile").`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a professional astrologer providing a detailed and insightful natal chart reading. Format the response clearly into the five requested sections, each starting with its designated numbered heading (e.g., \"1. Psychological and Personality Profile\"). Ensure the content for each section is substantial and well-developed." },
                { role: "user", content: promptString }
            ],
            temperature: 0.7,
        });

        const aiResponse = completion.choices[0].message.content;
        console.log("Received response from OpenAI.");

        const sections = {
            slide1: { title: "1. Psychological and Personality Profile", content: "" },
            slide2: { title: "2. Career and Vocational Strengths", content: "" },
            slide3: { title: "3. Relationship Style and Love Patterns", content: "" },
            slide4: { title: "4. Karmic Lessons and Past Life Indicators", content: "" },
            slide5: { title: "5. Current Major Transits (next 1–2 years)", content: "" }
        };
        const sectionTitles = [sections.slide1.title, sections.slide2.title, sections.slide3.title, sections.slide4.title, sections.slide5.title];
        let currentSectionKey = null;
        const lines = aiResponse.split('\n');
        for (const line of lines) {
            let matchedNewSection = false;
            for (let i = 0; i < sectionTitles.length; i++) {
                if (line.trim().startsWith(sectionTitles[i])) {
                    currentSectionKey = `slide${i + 1}`;
                    const contentAfterTitle = line.substring(sectionTitles[i].length).trimStart();
                    if (contentAfterTitle) sections[currentSectionKey].content += contentAfterTitle + '\n';
                    matchedNewSection = true;
                    break;
                }
            }
            if (!matchedNewSection && currentSectionKey) sections[currentSectionKey].content += line + '\n';
        }
        for (const key in sections) sections[key].content = sections[key].content.trim();

        const finalReport = {
            reportTitle: `Natal Chart Analysis for ${name}`,
            slides: [
                { title: sections.slide1.title, content: sections.slide1.content || "Content could not be parsed for this section." },
                { title: sections.slide2.title, content: sections.slide2.content || "Content could not be parsed for this section." },
                { title: sections.slide3.title, content: sections.slide3.content || "Content could not be parsed for this section." },
                { title: sections.slide4.title, content: sections.slide4.content || "Content could not be parsed for this section." },
                { title: sections.slide5.title, content: sections.slide5.content || "Content could not be parsed for this section." }
            ]
        };

        const reportDbResult = await db.query(
            `INSERT INTO reports (user_id, report_title, input_name, input_birth_date, input_birth_time, input_birth_place, slide1_title, slide1_content, slide2_title, slide2_content, slide3_title, slide3_content, slide4_title, slide4_content, slide5_title, slide5_content)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING id`,
            [userId, finalReport.reportTitle, name, birthDate, birthTime, birthPlace, finalReport.slides[0].title, finalReport.slides[0].content, finalReport.slides[1].title, finalReport.slides[1].content, finalReport.slides[2].title, finalReport.slides[2].content, finalReport.slides[3].title, finalReport.slides[3].content, finalReport.slides[4].title, finalReport.slides[4].content]
        );
        console.log('AI-generated report saved with ID:', reportDbResult.rows[0].id);

        const newCreditResult = await db.query(
            'UPDATE user_report_credits SET credits_available = credits_available - 1, updated_at = NOW() WHERE user_id = $1 RETURNING credits_available',
            [userId]
        );

        res.status(200).json({ ...finalReport, creditsRemaining: newCreditResult.rows[0].credits_available });
    } catch (error) {
        console.error("OpenAI API call or processing/DB error:", error);
        if (error.response) res.status(500).json({ message: "Error from OpenAI API", details: error.response.data });
        else if (error.request) res.status(500).json({ message: "No response received from OpenAI API" });
        else res.status(500).json({ message: "Error setting up OpenAI API request or processing response", details: error.message });
    }
});

// --- Get User Credits Route ---
app.get('/api/user/credits/:userId', async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    try {
        const result = await db.query('SELECT credits_available FROM user_report_credits WHERE user_id = $1', [userId]);
        if (result.rows.length === 0) {
            return res.status(200).json({ userId: userId, credits_available: 0 });
        }
        res.status(200).json({ userId: userId, credits_available: result.rows[0].credits_available });
    } catch (error) {
        console.error('Error fetching user credits:', error);
        res.status(500).json({ message: 'Error fetching user credits from database.' });
    }
});

// --- Get User's Reports Route ---
app.get('/api/reports/my-reports/:userId', async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    try {
        const result = await db.query(
            'SELECT id, user_id, report_title, created_at, input_name, input_birth_date, input_birth_time, input_birth_place, is_shared, share_token FROM reports WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No reports found for this user.'});
        }
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching user reports:', error);
        res.status(500).json({ message: 'Error fetching reports from database.' });
    }
});

// --- Report Sharing Endpoints ---
const crypto = require('crypto');

// Generate/Enable Sharing for a Report
app.post('/api/reports/:reportId/share', async (req, res) => {
    const { reportId } = req.params;
    const { userId } = req.body; // In a real app, userId should come from authenticated session (e.g., req.user.id)

    if (!userId) {
        return res.status(401).json({ message: 'User authentication required.' });
    }

    try {
        // Verify ownership
        const reportResult = await db.query('SELECT id, user_id FROM reports WHERE id = $1 AND user_id = $2', [reportId, userId]);
        if (reportResult.rows.length === 0) {
            return res.status(403).json({ message: 'Forbidden: You do not own this report or report not found.' });
        }

        const shareToken = crypto.randomBytes(24).toString('hex');
        const updateResult = await db.query(
            'UPDATE reports SET share_token = $1, is_shared = TRUE, share_token_generated_at = NOW() WHERE id = $2 RETURNING share_token',
            [shareToken, reportId]
        );

        res.status(200).json({
            message: 'Report sharing enabled.',
            shareLink: `/share/report/${updateResult.rows[0].share_token}`, // Relative link for frontend
            shareToken: updateResult.rows[0].share_token
        });
    } catch (error) {
        console.error('Error enabling report sharing:', error);
        res.status(500).json({ message: 'Failed to enable report sharing.' });
    }
});

// Disable Sharing for a Report
app.post('/api/reports/:reportId/stop-sharing', async (req, res) => {
    const { reportId } = req.params;
    const { userId } = req.body; // userId for ownership verification

    if (!userId) {
        return res.status(401).json({ message: 'User authentication required.' });
    }

    try {
        // Verify ownership
        const reportResult = await db.query('SELECT id FROM reports WHERE id = $1 AND user_id = $2', [reportId, userId]);
        if (reportResult.rows.length === 0) {
            return res.status(403).json({ message: 'Forbidden: You do not own this report or report not found.' });
        }

        await db.query(
            'UPDATE reports SET is_shared = FALSE, share_token = NULL, share_token_generated_at = NULL WHERE id = $1',
            [reportId]
        );
        res.status(200).json({ message: 'Report sharing disabled.' });
    } catch (error) {
        console.error('Error disabling report sharing:', error);
        res.status(500).json({ message: 'Failed to disable report sharing.' });
    }
});

// View Shared Report (Public)
app.get('/api/public/reports/shared/:share_token', async (req, res) => {
    const { share_token } = req.params;
    try {
        const result = await db.query(
            `SELECT id, report_title, input_name,
                    slide1_title, slide1_content, slide2_title, slide2_content,
                    slide3_title, slide3_content, slide4_title, slide4_content,
                    slide5_title, slide5_content, created_at
             FROM reports
             WHERE share_token = $1 AND is_shared = TRUE`,
            [share_token]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Report not found, not shared, or token is invalid.' });
        }

        // Reconstruct the report in the desired slides format for ReportDisplay component
        const dbReport = result.rows[0];
        const sharedReport = {
            reportTitle: dbReport.report_title,
            // inputName: dbReport.input_name, // Optionally include for context on shared page
            // createdAt: dbReport.created_at, // Optionally include
            slides: [
                { title: dbReport.slide1_title, content: dbReport.slide1_content },
                { title: dbReport.slide2_title, content: dbReport.slide2_content },
                { title: dbReport.slide3_title, content: dbReport.slide3_content },
                { title: dbReport.slide4_title, content: dbReport.slide4_content },
                { title: dbReport.slide5_title, content: dbReport.slide5_content },
            ]
        };
        res.status(200).json(sharedReport);
    } catch (error) {
        console.error('Error fetching shared report:', error);
        res.status(500).json({ message: 'Error fetching shared report.' });
    }
});


app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
