# Cosmic Birth Charts

A modern web application that provides personalized natal chart reports, astrological insights, and celestial wisdom.

## Features

- **Personalized Birth Chart Reports**: Generate detailed natal charts based on your birth data
- **Astrological Credits**: Earn and spend credits for premium chart features
- **Achievements**: Unlock special achievements as you explore your astrological journey
- **Referral System**: Invite friends and earn rewards
- **VIP Tiers**: Access exclusive features with premium memberships
- **Daily Horoscopes**: Get personalized daily celestial insights
- **Cosmic Events**: Stay informed about significant astrological transits

## Technology Stack

- **Frontend**: Next.js 13 with App Router, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (via Supabase)
- **Payment Processing**: Stripe (integration ready)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account (for database and authentication)
- Stripe account (for payment processing)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/cosmic-birth-charts.git
   cd cosmic-birth-charts
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add the following variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
     STRIPE_SECRET_KEY=your_stripe_secret_key
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
     OPENAI_API_KEY=your_openai_api_key
     ```

4. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Routes

The application includes comprehensive API routes for all features:

- `/api/generate-report`: Generate astrological reports
- `/api/process-payment`: Handle payments for premium features
- `/api/reports`: Manage astrological reports
- `/api/achievements`: Track user achievements
- `/api/user`: User profile management
- `/api/referrals`: Referral system management
- `/api/vip-upgrade`: Manage VIP tier upgrades
- `/api/astrological-credits`: Credit management system
- `/api/auth/callback`: Authentication callback handling
- `/api/validate-referral`: Validate referral codes
- `/api/vip-tiers`: Get VIP tier information
- `/api/zodiac`: Access zodiac sign information
- `/api/zodiac-compatibility`: Check compatibility between signs
- `/api/daily-horoscope`: Get daily horoscope readings
- `/api/notifications`: Manage user notifications
- `/api/cosmic-events`: Information about astrological events

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Astrological data and interpretations are for entertainment purposes only
- Icons and illustrations from various celestial sources
- Developed with ❤️ for the astrological community