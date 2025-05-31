// backend/index.js
require('dotenv').config(); // Load environment variables at the very top
const express = require('express');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken'); // If using JWTs
const cors = require('cors'); // Import cors
const app = express();
const port = process.env.PORT || 3001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

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

        // In a real app, you'd generate a JWT here and send it back.
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

        // For MVP, just a success message. Later, implement token-based auth (JWT).
        // const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: 'Login successful',
            userId: user.id,
            email: user.email
            // token: token // Send JWT to client
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});


app.get('/', (req, res) => {
  res.send('Cosmic Lottery Backend is running!');
});

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});

// Stripe Configuration
const stripe = require('stripe')('sk_test_YOUR_STRIPE_SECRET_KEY_PLACEHOLDER'); // IMPORTANT: Use env var for this in production

// --- Stripe Create Checkout Session Route ---
app.post('/api/stripe/create-checkout-session', async (req, res) => {
    // For now, this endpoint is specifically for the "Single Report"
    // In a real app, you might pass a productId or priceId in the request body
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Single Cosmic Report',
                            // images: ['YOUR_PRODUCT_IMAGE_URL'], // Optional: Add product image URL here
                        },
                        unit_amount: 1999, // $19.99 in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment-cancel`,
        });
        res.json({ id: session.id });
    } catch (error) {
        console.error("Stripe session creation error:", error);
        res.status(500).json({ error: 'Failed to create Stripe session' });
    }
});

// --- Report Generation Route ---
app.post('/api/report/generate', async (req, res) => { // Made async
    const { userId, name, birthDate, birthTime, birthPlace } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'userId is required to save the report.' });
    }
    if (!name || !birthDate || !birthTime || !birthPlace) {
        return res.status(400).json({ message: 'All fields (name, birthDate, birthTime, birthPlace) are required for report generation.' });
    }

    // Constructing the prompt (for logging or if you were to send it)
    const prompt = `Create a detailed, high-level natal chart analysis for ${name}, born on ${birthDate} at ${birthTime} in ${birthPlace}. Organize the reading into five key areas: 1. Psychological and Personality Profile: Core traits, motivations, self-expression (Sun, Moon, Ascendant, key aspects). 2. Career and Vocational Strengths: Potential paths, talents, work style (Midheaven, 2nd, 6th, 10th houses, relevant rulers). 3. Relationship Style and Love Patterns: Approach to partnership, needs, communication in love (Venus, Mars, 7th house, Descendant). 4. Karmic Lessons and Past Life Indicators: Soul evolution themes, challenges for growth (Lunar Nodes, Saturn, Pluto aspects). 5. Current Major Transits (next 1–2 years): Significant outer planet transits (Jupiter, Saturn, Uranus, Neptune, Pluto) to natal planets and angles, and their likely impact. Provide a concise, insightful paragraph for each of these five sections. The tone should be empowering and reflective.`;
    console.log("Generated Prompt (mock):", prompt);

    // Mocked OpenAI Response
    const mockedReport = {
        reportTitle: `Natal Chart Analysis for ${name}`,
        slides: [
            {
                title: "1. Psychological and Personality Profile",
                content: `This is a sample psychological and personality profile for ${name}, born on ${birthDate} at ${birthTime} in ${birthPlace}. It would typically include insights into core traits, motivations, and self-expression based on planetary placements in signs and houses (like Sun, Moon, Ascendant), and key aspects between them. The aim is to provide a foundational understanding of your inner landscape.`
            },
            {
                title: "2. Career and Vocational Strengths",
                content: `This section would detail ${name}'s career strengths, potential vocational paths, and how they might achieve professional fulfillment. Analysis would focus on areas like the Midheaven (MC), the 2nd house of resources, the 6th house of daily work, and the 10th house of public image and career, along with relevant planetary rulers and their conditions.`
            },
            {
                title: "3. Relationship Style and Love Patterns",
                content: `Insights into ${name}'s approach to relationships, partnership needs, and patterns in love. This involves examining planets like Venus (love, values) and Mars (desire, action), the 7th house (partnerships), the Descendant, and aspects to these points to understand how you connect with others.`
            },
            {
                title: "4. Karmic Lessons and Past Life Indicators",
                content: `An exploration of potential karmic lessons, past life influences, and soul evolution themes for ${name}. These are often indicated by the Moon's Nodes (North Node pointing to growth, South Node to past patterns), Saturn (lessons, discipline), and Pluto (transformation, soul's journey) placements and aspects.`
            },
            {
                title: "5. Current Major Transits (next 1–2 years)",
                content: `A forecast of major planetary transits affecting ${name}'s natal chart over the next 1-2 years and their potential impact on various life areas. This would involve looking at transits from slow-moving planets like Jupiter (expansion), Saturn (structure, lessons), Uranus (change), Neptune (dreams, dissolution), and Pluto (transformation) to your natal planets and angles.`
            }
        ]
    };

    try {
        // Save the report to the database
        const reportToSave = mockedReport;
        const dbResult = await db.query(
            `INSERT INTO reports (user_id, report_title,
                input_name, input_birth_date, input_birth_time, input_birth_place,
                slide1_title, slide1_content, slide2_title, slide2_content,
                slide3_title, slide3_content, slide4_title, slide4_content,
                slide5_title, slide5_content)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING id`,
            [
                userId, reportToSave.reportTitle,
                name, birthDate, birthTime, birthPlace, // Save input parameters
                reportToSave.slides[0].title, reportToSave.slides[0].content,
                reportToSave.slides[1].title, reportToSave.slides[1].content,
                reportToSave.slides[2].title, reportToSave.slides[2].content,
                reportToSave.slides[3].title, reportToSave.slides[3].content,
                reportToSave.slides[4].title, reportToSave.slides[4].content,
            ]
        );
        console.log('Report saved with ID:', dbResult.rows[0].id);
        res.status(200).json(mockedReport); // Return the generated report as before
    } catch (error) {
        console.error('Error saving report to database:', error);
        // If saving fails, we still have the mockedReport, but the client should be aware.
        // For critical applications, you might choose to not send the report if saving fails.
        res.status(500).json({ message: 'Report generated but failed to save. Please contact support.', error: error.message, report: mockedReport });
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
            'SELECT id, user_id, report_title, created_at, input_name, input_birth_date, input_birth_time, input_birth_place FROM reports WHERE user_id = $1 ORDER BY created_at DESC',
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
