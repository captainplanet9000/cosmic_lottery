# Cosmic Lottery - Complete Documentation Package

## Table of Contents

1. [Project Requirements Document](#1-project-requirements-document)
2. [Tech Stack & APIs Documentation](#2-tech-stack--apis-documentation)
3. [App Flow Documentation](#3-app-flow-documentation)
4. [Backend Structure & Database Schema](#4-backend-structure--database-schema)
5. [Frontend Development Guidelines](#5-frontend-development-guidelines)
6. [Loading Screen & Notification System](#6-loading-screen--notification-system)
7. [Complete App Design System](#7-complete-app-design-system)
8. [Implementation Examples](#8-implementation-examples)

---

# 1. Project Requirements Document

## 1. Executive Summary
A web-based application that generates personalized, professional-grade natal birth chart reports using AI-powered astrological interpretations. Users input their birth data and receive a comprehensive, beautifully formatted astrological analysis.

## 2. Functional Requirements

### 2.1 User Input System
- **Birth Data Collection Form:**
  - Full Name (required)
  - Birth Date (required) - Date picker
  - Birth Time (required) - Time picker with "unknown time" option
  - Birth Place (required) - Location autocomplete with timezone detection
  - Email (required) - For report delivery and user account

### 2.2 Report Generation
- **AI Integration:**
  - Integration with GPT-4 API for report generation
  - Custom prompt engineering for astrological interpretations
  - Response parsing and formatting
  
- **Loading Experience:**
  - Progress indicator showing generation stages
  - Estimated time remaining
  - Engaging astrological facts/tips during wait
  - Option to receive email notification when complete

### 2.3 Report Display
- **Structured Sections:**
  1. Psychological and Personality Profile
  2. Career and Vocational Strengths
  3. Relationship Style and Love Patterns
  4. Karmic Lessons and Past Life Indicators
  5. Current Major Transits (next 1-2 years)
  
- **Features:**
  - Interactive navigation menu
  - Expandable/collapsible sections
  - Print-friendly version
  - PDF download option
  - Share functionality

### 2.4 User Account System
- **Features:**
  - User registration and login
  - Report history and storage
  - Multiple chart management
  - Comparison tools (future feature)
  - Subscription management

### 2.5 Payment Processing
- **Options:**
  - One-time report purchase
  - Subscription tiers
  - Bundle packages
  - Secure payment gateway integration

## 3. Non-Functional Requirements

### 3.1 Performance
- Report generation: < 60 seconds
- Page load time: < 3 seconds
- API response time: < 200ms
- Concurrent user support: 1000+

### 3.2 Security
- SSL/TLS encryption
- Secure API key management
- GDPR compliance
- PCI DSS compliance for payments
- Data encryption at rest

### 3.3 Usability
- Mobile-responsive design
- Accessibility compliance (WCAG 2.1 AA)
- Multi-language support (future)
- Intuitive navigation
- Clear error messaging

### 3.4 Scalability
- Cloud infrastructure
- Auto-scaling capabilities
- CDN integration
- Database optimization
- Caching strategies

## 4. Business Requirements

### 4.1 Monetization
- Freemium model with basic/premium reports
- Subscription tiers
- API access for partners
- White-label options

### 4.2 Marketing Integration
- SEO optimization
- Social media sharing
- Email marketing integration
- Affiliate program support
- Analytics tracking

### 4.3 Customer Support
- Help documentation
- FAQ section
- Contact form
- Live chat integration (future)
- Report issue tracking

## 5. Technical Constraints
- Must work on all modern browsers
- Mobile app consideration for future
- API rate limits consideration
- Data storage limitations
- GDPR and privacy compliance

---

# 2. Tech Stack & APIs Documentation

## 1. Frontend Technology Stack

### 1.1 Core Framework
- **React 18+** or **Next.js 14+**
  - Server-side rendering for SEO
  - Built-in routing
  - API routes
  - Image optimization

### 1.2 UI Framework & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern component library
- **Framer Motion** - Animations and transitions
- **React Icons** - Icon library

### 1.3 State Management
- **Zustand** or **Redux Toolkit** - Global state management
- **React Query (TanStack Query)** - Server state management
- **React Hook Form** - Form handling

### 1.4 Additional Libraries
- **Day.js** - Date/time manipulation
- **React-PDF** - PDF generation
- **React-to-Print** - Print functionality
- **Recharts** - Data visualization (future charts)

## 2. Backend Technology Stack

### 2.1 Server Framework
- **Node.js** with **Express.js** or **Fastify**
- Alternative: **Python** with **FastAPI**

### 2.2 Database
- **PostgreSQL** - Primary database
  - User data
  - Report storage
  - Transaction records
- **Redis** - Caching layer
  - Session management
  - Rate limiting
  - Queue management

### 2.3 Authentication
- **JWT** (JSON Web Tokens)
- **Passport.js** or **Auth0**
- **OAuth 2.0** for social logins

### 2.4 Job Queue
- **Bull** or **BullMQ** - Job processing
- **Redis** as message broker

## 3. External APIs

### 3.1 AI/ML APIs
- **OpenAI GPT-4 API**
  - Model: gpt-4-turbo-preview
  - Fallback: gpt-3.5-turbo
  - Rate limiting: 10,000 TPM
  - Cost: ~$0.03-0.06 per report

### 3.2 Astrological Calculation APIs
- **Swiss Ephemeris** (via Python library)
- **AstroAPI** or **Astro-Seek API**
  - Chart calculations
  - Planetary positions
  - House systems
  - Aspect calculations

### 3.3 Location & Timezone APIs
- **Google Places API**
  - Location autocomplete
  - Coordinates lookup
- **TimeZoneDB API**
  - Historical timezone data
  - DST calculations

### 3.4 Payment APIs
- **Stripe**
  - Payment processing
  - Subscription management
  - Invoice generation
- **PayPal** (optional secondary)

### 3.5 Email Service
- **SendGrid** or **Postmark**
  - Transactional emails
  - Report delivery
  - Marketing campaigns

### 3.6 Storage & CDN
- **AWS S3** or **Cloudinary**
  - Report PDF storage
  - Static asset hosting
- **CloudFront** or **Cloudflare**
  - CDN for global distribution
  - DDoS protection

## 4. DevOps & Infrastructure

### 4.1 Hosting
- **Vercel** (for Next.js) or **Railway**
- **AWS EC2** or **DigitalOcean** (for backend)
- **Heroku** (alternative)

### 4.2 Monitoring & Analytics
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Google Analytics 4** - User analytics
- **Mixpanel** - Product analytics

### 4.3 Development Tools
- **TypeScript** - Type safety
- **ESLint** & **Prettier** - Code quality
- **Jest** & **React Testing Library** - Testing
- **Cypress** - E2E testing

## 5. Security Considerations

### 5.1 API Security
- Rate limiting per user/IP
- API key encryption
- Request validation
- CORS configuration

### 5.2 Data Security
- Environment variables for secrets
- Encrypted database connections
- Secure session management
- Regular security audits

## 6. API Cost Optimization

### 6.1 Caching Strategy
- Cache generated reports for 30 days
- Cache astrological calculations
- Cache location data

### 6.2 Batch Processing
- Group API calls when possible
- Implement request queuing
- Use webhooks for async processing

### 6.3 Rate Limit Management
- Implement backoff strategies
- Queue management for peak times
- Multiple API key rotation

---

# 3. App Flow Documentation

## 1. User Journey Overview

```
Landing Page → Sign Up/Login → Input Birth Data → Payment → Report Generation → View Report → Download/Share
```

## 2. Detailed User Flows

### 2.1 New User Flow
1. **Landing Page**
   - Hero section with value proposition
   - Sample report preview
   - Pricing information
   - CTA: "Get Your Birth Chart"

2. **Registration**
   - Email/password or social login
   - Email verification
   - Welcome email with tutorial

3. **Birth Data Input**
   - Step-by-step form
   - Real-time validation
   - Location autocomplete
   - Time zone auto-detection
   - Preview of what's included

4. **Payment Selection**
   - Single report vs subscription
   - Payment method selection
   - Secure checkout (Stripe)
   - Order confirmation

5. **Report Generation**
   - Loading screen with progress
   - Astrological facts/tips display
   - Estimated time remaining
   - Option for email notification

6. **Report Viewing**
   - Interactive report dashboard
   - Navigation menu
   - Expandable sections
   - Download/print options

### 2.2 Returning User Flow
1. **Login**
   - Quick access via saved credentials
   - "Remember me" option
   - Password reset available

2. **Dashboard**
   - Previous reports list
   - Quick "New Report" button
   - Subscription status
   - Saved birth data profiles

3. **Quick Report Generation**
   - Pre-filled data from saved profiles
   - One-click generation for saved profiles
   - Comparison tools (premium)

## 3. Technical Flow Architecture

### 3.1 Frontend Flow
```
User Input → Validation → API Request → Loading State → Response Handling → UI Update
```

### 3.2 Backend Flow
```
Request Receipt → Authentication → Validation → Queue Job → Process Generation → Store Result → Send Response
```

### 3.3 Report Generation Flow
1. **Data Collection**
   - Validate birth data
   - Calculate chart positions
   - Prepare prompt context

2. **AI Processing**
   - Send to GPT-4 API
   - Parse response
   - Format into sections
   - Quality check

3. **Post-Processing**
   - Generate PDF
   - Store in database
   - Send notification
   - Update user dashboard

## 4. State Management Flow

### 4.1 Application States
- **Loading States**
  - Initial load
  - Form submission
  - Report generation
  - Section navigation

- **Error States**
  - Form validation errors
  - Payment failures
  - API errors
  - Network issues

- **Success States**
  - Registration complete
  - Payment successful
  - Report ready
  - Download complete

### 4.2 Data Flow
```
Component State → Global State → API Call → Database → Response → State Update → UI Render
```

## 5. Navigation Structure

```
/                     - Landing Page
/login                - Login Page
/register             - Registration Page
/dashboard            - User Dashboard
/reports              - Reports List
/reports/:id          - Individual Report
/new-report           - Create New Report
/profile              - User Profile
/subscription         - Subscription Management
/settings             - Account Settings
```

## 6. API Endpoints Flow

### 6.1 Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/refresh`

### 6.2 Reports
- `POST /api/reports/generate`
- `GET /api/reports/:id`
- `GET /api/reports/list`
- `DELETE /api/reports/:id`

### 6.3 User Management
- `GET /api/user/profile`
- `PUT /api/user/profile`
- `GET /api/user/saved-profiles`
- `POST /api/user/saved-profiles`

### 6.4 Payments
- `POST /api/payments/create-session`
- `POST /api/payments/webhook`
- `GET /api/payments/history`

## 7. Error Handling Flow

### 7.1 Client-Side
1. Form validation errors → Inline error messages
2. Network errors → Toast notifications
3. API errors → Error boundary with retry

### 7.2 Server-Side
1. Validation errors → 400 with details
2. Auth errors → 401/403 with redirect
3. Server errors → 500 with error ID

## 8. Performance Optimization Flow

### 8.1 Caching Strategy
- Browser cache for static assets
- Redis cache for reports
- CDN cache for images/PDFs

### 8.2 Lazy Loading
- Route-based code splitting
- Image lazy loading
- Section content on-demand

### 8.3 Progressive Enhancement
- Basic functionality without JS
- Enhanced features with JS
- Offline capability (PWA)

---

# 4. Backend Structure & Database Schema

## 1. Database Schema (PostgreSQL)

### 1.1 Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    reset_token VARCHAR(255),
    reset_token_expires TIMESTAMP,
    subscription_status VARCHAR(50) DEFAULT 'free',
    subscription_expires_at TIMESTAMP,
    stripe_customer_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_stripe_customer_id ON users(stripe_customer_id);
```

### 1.2 Birth Profiles Table
```sql
CREATE TABLE birth_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    profile_name VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    birth_time TIME,
    birth_place VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    timezone VARCHAR(50) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_birth_profiles_user_id ON birth_profiles(user_id);
```

### 1.3 Reports Table
```sql
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    birth_profile_id UUID REFERENCES birth_profiles(id),
    report_type VARCHAR(50) DEFAULT 'natal',
    status VARCHAR(50) DEFAULT 'pending',
    generation_started_at TIMESTAMP,
    generation_completed_at TIMESTAMP,
    report_data JSONB,
    pdf_url VARCHAR(500),
    ai_tokens_used INTEGER,
    ai_cost DECIMAL(10, 4),
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reports_user_id ON reports(user_id);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_created_at ON reports(created_at DESC);
```

### 1.4 Transactions Table
```sql
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    report_id UUID REFERENCES reports(id),
    stripe_payment_intent_id VARCHAR(255) UNIQUE,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(50) NOT NULL,
    payment_method VARCHAR(50),
    description TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_stripe_payment_intent_id ON transactions(stripe_payment_intent_id);
```

### 1.5 Subscription Plans Table
```sql
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    stripe_price_id VARCHAR(255) UNIQUE,
    price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    interval VARCHAR(20) NOT NULL, -- monthly, yearly
    features JSONB,
    report_limit INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 1.6 API Keys Table (for future API access)
```sql
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    key_hash VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100),
    permissions JSONB,
    rate_limit INTEGER DEFAULT 100,
    last_used_at TIMESTAMP,
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_api_keys_key_hash ON api_keys(key_hash);
```

## 2. Backend Directory Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── redis.js
│   │   ├── stripe.js
│   │   └── openai.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── reportController.js
│   │   ├── userController.js
│   │   ├── paymentController.js
│   │   └── profileController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── rateLimiter.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Report.js
│   │   ├── BirthProfile.js
│   │   ├── Transaction.js
│   │   └── SubscriptionPlan.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── reports.js
│   │   ├── users.js
│   │   ├── payments.js
│   │   └── profiles.js
│   ├── services/
│   │   ├── aiService.js
│   │   ├── astroService.js
│   │   ├── emailService.js
│   │   ├── pdfService.js
│   │   └── queueService.js
│   ├── utils/
│   │   ├── validators.js
│   │   ├── helpers.js
│   │   ├── constants.js
│   │   └── logger.js
│   ├── workers/
│   │   ├── reportGenerator.js
│   │   ├── emailSender.js
│   │   └── cleanup.js
│   └── app.js
├── tests/
├── migrations/
├── .env.example
├── package.json
└── server.js
```

## 3. API Response Structures

### 3.1 Success Response
```json
{
    "success": true,
    "data": {},
    "message": "Operation successful",
    "timestamp": "2024-01-15T10:30:00Z"
}
```

### 3.2 Error Response
```json
{
    "success": false,
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Invalid input data",
        "details": {
            "field": "birthTime",
            "issue": "Invalid time format"
        }
    },
    "timestamp": "2024-01-15T10:30:00Z"
}
```

### 3.3 Report Response Structure
```json
{
    "id": "uuid",
    "status": "completed",
    "createdAt": "2024-01-15T10:30:00Z",
    "profile": {
        "name": "John Doe",
        "birthDate": "1990-01-15",
        "birthTime": "14:30:00",
        "birthPlace": "New York, NY"
    },
    "sections": {
        "psychological": {
            "title": "Psychological and Personality Profile",
            "content": "..."
        },
        "career": {
            "title": "Career and Vocational Strengths",
            "content": "..."
        },
        "relationships": {
            "title": "Relationship Style and Love Patterns",
            "content": "..."
        },
        "karmic": {
            "title": "Karmic Lessons and Past Life Indicators",
            "content": "..."
        },
        "transits": {
            "title": "Current Major Transits",
            "content": "..."
        }
    },
    "downloadUrl": "https://..."
}
```

## 4. Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/astro_app
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_EXPIRES_IN=30d

# External APIs
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
GOOGLE_PLACES_API_KEY=...
SENDGRID_API_KEY=SG...

# Storage
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=astro-reports
AWS_REGION=us-east-1

# Application
NODE_ENV=production
PORT=3000
CLIENT_URL=https://yourdomain.com
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX=100
```

## 5. Queue Jobs Structure

### 5.1 Report Generation Job
```javascript
{
    id: "job_uuid",
    type: "GENERATE_REPORT",
    data: {
        userId: "user_uuid",
        reportId: "report_uuid",
        birthData: {
            name: "John Doe",
            date: "1990-01-15",
            time: "14:30:00",
            place: "New York, NY",
            lat: 40.7128,
            lng: -74.0060,
            timezone: "America/New_York"
        }
    },
    attempts: 0,
    maxAttempts: 3,
    priority: 1,
    createdAt: "2024-01-15T10:30:00Z"
}
```

---

# 5. Frontend Development Guidelines

## 1. Design System

### 1.1 Color Palette
```css
/* Primary Colors */
--primary-900: #1a1654;    /* Deep cosmic purple */
--primary-700: #2d2875;    /* Royal purple */
--primary-500: #4339a0;    /* Main purple */
--primary-300: #6b5dd3;    /* Light purple */
--primary-100: #e6e3f7;    /* Pale purple */

/* Accent Colors */
--accent-gold: #f4c542;    /* Sun gold */
--accent-silver: #c0c0c0;  /* Moon silver */
--accent-copper: #b87333;  /* Rising sign copper */

/* Neutral Colors */
--gray-900: #111827;       /* Deep space */
--gray-700: #374151;       /* Dark gray */
--gray-500: #6b7280;       /* Medium gray */
--gray-300: #d1d5db;       /* Light gray */
--gray-100: #f3f4f6;       /* Off white */

/* Semantic Colors */
--success: #10b981;        /* Green */
--warning: #f59e0b;        /* Amber */
--error: #ef4444;          /* Red */
--info: #3b82f6;           /* Blue */
```

### 1.2 Typography
```css
/* Font Families */
--font-display: 'Playfair Display', serif;  /* Headers */
--font-body: 'Inter', sans-serif;           /* Body text */
--font-mono: 'Fira Code', monospace;        /* Code/data */

/* Font Sizes */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */
```

### 1.3 Spacing System
```css
/* Based on 8px grid */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

## 2. Component Architecture

### 2.1 Component Structure
```typescript
// Example: ReportSection.tsx
import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ReportSectionProps {
  title: string;
  content: string;
  icon: React.ReactNode;
  defaultOpen?: boolean;
}

export const ReportSection: FC<ReportSectionProps> = ({
  title,
  content,
  icon,
  defaultOpen = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <motion.div 
      className="report-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Component implementation */}
    </motion.div>
  );
};
```

### 2.2 Folder Structure
```
src/
├── components/
│   ├── common/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Modal/
│   │   └── LoadingSpinner/
│   ├── layout/
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── Navigation/
│   ├── report/
│   │   ├── ReportSection/
│   │   ├── ReportViewer/
│   │   └── ReportNavigation/
│   └── forms/
│       ├── BirthDataForm/
│       └── PaymentForm/
├── pages/
├── hooks/
├── utils/
├── styles/
├── types/
└── lib/
```

## 3. UI/UX Guidelines

### 3.1 Loading States
```tsx
// Progressive loading with astrological theme
const LoadingScreen = () => {
  const [fact, setFact] = useState(astroFacts[0]);
  
  return (
    <div className="loading-container">
      <div className="cosmic-spinner">
        <PlanetaryOrbit />
      </div>
      <h2>Calculating Your Cosmic Blueprint...</h2>
      <ProgressBar percentage={progress} />
      <p className="astro-fact">{fact}</p>
    </div>
  );
};
```

### 3.2 Report Display Layout
```tsx
// Split view with navigation
<div className="report-container">
  <aside className="report-navigation">
    <nav>
      <a href="#psychological">Personality Profile</a>
      <a href="#career">Career Strengths</a>
      <a href="#relationships">Love Patterns</a>
      <a href="#karmic">Karmic Lessons</a>
      <a href="#transits">Current Transits</a>
    </nav>
  </aside>
  
  <main className="report-content">
    <ReportHeader userData={userData} />
    <ReportSections sections={sections} />
    <ReportActions />
  </main>
</div>
```

### 3.3 Responsive Design Breakpoints
```css
/* Mobile First Approach */
/* Default: 0-639px */

/* Tablet */
@media (min-width: 640px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1280px) { }

/* Extra Large */
@media (min-width: 1536px) { }
```

## 4. Animation Guidelines

### 4.1 Micro-interactions
```typescript
// Framer Motion Variants
const sectionVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { 
    opacity: 1, 
    height: "auto",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};
```

### 4.2 Page Transitions
```typescript
// Page transition wrapper
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);
```

## 5. Form Design Guidelines

### 5.1 Birth Data Form
```tsx
// Multi-step form with validation
const BirthDataForm = () => {
  const steps = [
    { id: 'name', title: 'Your Name' },
    { id: 'datetime', title: 'Birth Date & Time' },
    { id: 'location', title: 'Birth Location' },
    { id: 'review', title: 'Review & Confirm' }
  ];
  
  return (
    <FormProvider {...methods}>
      <StepIndicator currentStep={currentStep} steps={steps} />
      <AnimatePresence mode="wait">
        {renderCurrentStep()}
      </AnimatePresence>
      <FormNavigation />
    </FormProvider>
  );
};
```

## 6. Accessibility Guidelines

### 6.1 ARIA Labels
```tsx
<button
  aria-label="Expand personality profile section"
  aria-expanded={isExpanded}
  onClick={toggleSection}
>
  <ChevronDown className={isExpanded ? 'rotate-180' : ''} />
</button>
```

### 6.2 Keyboard Navigation
- All interactive elements must be keyboard accessible
- Focus indicators must be visible
- Tab order must be logical
- Escape key closes modals
- Arrow keys navigate menus

### 6.3 Screen Reader Support
- Proper heading hierarchy (h1 → h6)
- Descriptive link text
- Alt text for images
- Form labels and error messages
- Live regions for dynamic content

## 7. Performance Guidelines

### 7.1 Code Splitting
```typescript
// Lazy load heavy components
const ReportViewer = lazy(() => import('./components/ReportViewer'));
const PDFGenerator = lazy(() => import('./components/PDFGenerator'));
```

### 7.2 Image Optimization
- Use WebP format with fallbacks
- Implement lazy loading
- Responsive images with srcset
- CDN for static assets

### 7.3 Bundle Optimization
- Tree shaking enabled
- Minimize CSS/JS
- Gzip compression
- Cache static assets
- Preload critical fonts

## 8. State Management Patterns

### 8.1 Global State Structure
```typescript
interface AppState {
  user: UserState;
  reports: ReportsState;
  ui: UIState;
  payment: PaymentState;
}

interface UserState {
  profile: UserProfile | null;
  isAuthenticated: boolean;
  subscription: SubscriptionInfo | null;
}

interface ReportsState {
  current: Report | null;
  list: Report[];
  isGenerating: boolean;
  generationProgress: number;
}
```

### 8.2 Custom Hooks
```typescript
// Report generation hook
const useReportGeneration = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<GenerationStatus>('idle');
  
  const generateReport = async (birthData: BirthData) => {
    // Implementation
  };
  
  return { generateReport, progress, status };
};
```

## 9. Testing Guidelines

### 9.1 Component Testing
```typescript
describe('ReportSection', () => {
  it('should toggle content visibility', () => {
    render(<ReportSection {...props} />);
    const toggle = screen.getByRole('button');
    
    fireEvent.click(toggle);
    expect(screen.getByText(content)).toBeVisible();
  });
});
```

### 9.2 E2E Testing
- Test complete user flows
- Test payment integration
- Test report generation
- Test error scenarios
- Test mobile responsiveness

---

# 6. Loading Screen & Notification System

## 1. Loading Screen Design

### 1.1 Visual Concept
A cosmic slot machine/lottery wheel spinning through zodiac signs and planetary symbols, creating an engaging "lottery" experience while the report generates.

### 1.2 Loading States & Messages

#### Phase 1: Initial Processing (0-20%)
```javascript
const loadingPhases = [
  {
    progress: 0-20,
    message: "Drawing your cosmic lottery numbers...",
    animation: "lottery-balls-mixing"
  }
];
```

#### Phase 2: Chart Calculation (20-40%)
```javascript
{
  progress: 20-40,
  message: "Calculating planetary positions at your moment of birth...",
  animation: "planets-aligning"
}
```

#### Phase 3: AI Analysis (40-80%)
```javascript
{
  progress: 40-80,
  message: "Your cosmic winning combination is being analyzed...",
  animation: "ai-brain-cosmic"
}
```

#### Phase 4: Final Generation (80-100%)
```javascript
{
  progress: 80-100,
  message: "Revealing your cosmic jackpot...",
  animation: "lottery-reveal"
}
```

### 1.3 React Component Implementation

```tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface LoadingScreenProps {
  progress: number;
  estimatedTime: number;
}

const CosmicLotteryLoader: React.FC<LoadingScreenProps> = ({ 
  progress, 
  estimatedTime 
}) => {
  const [currentFact, setCurrentFact] = useState(0);
  const [showLotteryBalls, setShowLotteryBalls] = useState(true);

  const cosmicFacts = [
    "Did you know? Your birth chart is more unique than your fingerprint!",
    "The cosmic lottery has 1 in 75 billion combinations - yours is truly one of a kind.",
    "Ancient astrologers were the first data scientists, tracking celestial patterns for millennia.",
    "Your rising sign changes every 2 hours - timing really is everything in the cosmic lottery!",
    "The Moon moves through all 12 zodiac signs in just 28 days.",
    "Jupiter, the planet of luck, takes 12 years to complete its cosmic journey.",
    "Your birth chart contains over 50 unique data points creating your cosmic signature."
  ];

  // Rotate facts every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % cosmicFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Celebration when complete
  useEffect(() => {
    if (progress === 100) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4339a0', '#f4c542', '#c0c0c0']
      });
    }
  }, [progress]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex items-center justify-center z-50">
      <div className="max-w-2xl w-full px-8">
        
        {/* Cosmic Lottery Animation */}
        <div className="mb-8">
          <CosmicLotteryWheel progress={progress} />
        </div>

        {/* Progress Information */}
        <div className="text-center text-white">
          <h2 className="text-3xl font-display mb-4">
            {getPhaseMessage(progress)}
          </h2>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-3 mb-6 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 to-purple-500"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          {/* Percentage and Time */}
          <div className="flex justify-between text-sm text-white/70 mb-8">
            <span>{progress}% Complete</span>
            <span>~{Math.ceil(estimatedTime / 1000)}s remaining</span>
          </div>

          {/* Cosmic Facts */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFact}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/5 rounded-lg p-6 backdrop-blur-sm"
            >
              <p className="text-lg text-white/90">
                ✨ {cosmicFacts[currentFact]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Skip to Email Option */}
        {progress < 50 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-6"
          >
            <button className="text-white/60 hover:text-white/80 text-sm underline">
              Notify me by email when ready
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Cosmic Lottery Wheel Component
const CosmicLotteryWheel: React.FC<{ progress: number }> = ({ progress }) => {
  const zodiacSymbols = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
  const planetSymbols = ['☉', '☽', '☿', '♀', '♂', '♃', '♄', '⛢', '♆', '♇'];
  
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Outer Ring - Zodiac Signs */}
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-yellow-400"
        animate={{ rotate: progress * 3.6 }}
        transition={{ duration: 0.5 }}
      >
        {zodiacSymbols.map((symbol, i) => (
          <div
            key={i}
            className="absolute text-2xl text-yellow-400"
            style={{
              top: '50%',
              left: '50%',
              transform: `
                translate(-50%, -50%) 
                rotate(${i * 30}deg) 
                translateY(-110px)
              `
            }}
          >
            {symbol}
          </div>
        ))}
      </motion.div>

      {/* Inner Ring - Planets */}
      <motion.div
        className="absolute inset-8 rounded-full border-4 border-purple-400"
        animate={{ rotate: -progress * 2 }}
        transition={{ duration: 0.5 }}
      >
        {planetSymbols.map((symbol, i) => (
          <div
            key={i}
            className="absolute text-xl text-purple-400"
            style={{
              top: '50%',
              left: '50%',
              transform: `
                translate(-50%, -50%) 
                rotate(${i * 36}deg) 
                translateY(-70px)
              `
            }}
          >
            {symbol}
          </div>
        ))}
      </motion.div>

      {/* Center Display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black/50 rounded-full w-24 h-24 flex items-center justify-center">
          <span className="text-3xl font-bold text-white">{progress}%</span>
        </div>
      </div>

      {/* Lottery Ball Effect */}
      <LotteryBalls progress={progress} />
    </div>
  );
};
```

## 2. Notification System

### 2.1 Toast Notifications

```tsx
import { toast, Toaster } from 'react-hot-toast';

// Custom toast styles matching Cosmic Lottery theme
const toastOptions = {
  style: {
    background: '#1a1654',
    color: '#fff',
    border: '1px solid #4339a0',
  },
  success: {
    icon: '🎰',
    style: {
      background: '#065f46',
    },
  },
  error: {
    icon: '❌',
    style: {
      background: '#7f1d1d',
    },
  },
  loading: {
    icon: '🎲',
  },
};

// Usage examples
const showNotifications = {
  reportStarted: () => toast.loading('Rolling the cosmic dice...', {
    id: 'report-generation'
  }),
  
  reportComplete: () => toast.success('Jackpot! Your cosmic report is ready!', {
    id: 'report-generation',
    duration: 5000,
    icon: '🎉'
  }),
  
  reportError: () => toast.error('Cosmic misalignment. Please try again.', {
    id: 'report-generation'
  }),
  
  paymentSuccess: () => toast.success('Payment successful! Let\'s reveal your cosmic fortune!'),
  
  savedProfile: () => toast.success('Birth profile saved to your cosmic vault!')
};
```

### 2.2 Email Notification Template

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f3f4f6;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: linear-gradient(135deg, #1a1654 0%, #2d2875 100%);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    .header {
      text-align: center;
      padding: 40px 20px;
      color: white;
    }
    .lottery-numbers {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin: 20px 0;
    }
    .number-ball {
      width: 50px;
      height: 50px;
      background: #f4c542;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #1a1654;
      font-size: 20px;
    }
    .content {
      background: white;
      padding: 40px;
      text-align: center;
    }
    .cta-button {
      display: inline-block;
      background: #4339a0;
      color: white;
      padding: 16px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="font-size: 32px; margin: 0;">🎰 Cosmic Lottery 🎰</h1>
      <p style="font-size: 20px; margin-top: 10px;">Your Cosmic Jackpot is Ready!</p>
    </div>
    
    <div class="content">
      <h2 style="color: #1a1654;">Congratulations {{Name}}!</h2>
      
      <div class="lottery-numbers">
        <div class="number-ball">♈</div>
        <div class="number-ball">☉</div>
        <div class="number-ball">☽</div>
        <div class="number-ball">♃</div>
        <div class="number-ball">⬆</div>
      </div>
      
      <p style="font-size: 18px; color: #374151; line-height: 1.6;">
        Your personalized cosmic lottery report has been generated! 
        Discover what the universe had in store for you at the moment of your birth.
      </p>
      
      <p style="color: #6b7280;">
        Born on {{Birth Date}} at {{Time}} in {{Place}}
      </p>
      
      <a href="{{reportLink}}" class="cta-button">
        View Your Cosmic Fortune
      </a>
      
      <p style="margin-top: 30px; font-size: 14px; color: #9ca3af;">
        Your report will be available for 30 days. 
        Download it to keep your cosmic blueprint forever!
      </p>
    </div>
  </div>
</body>
</html>
```

### 2.3 In-App Notification Center

```tsx
interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    url: string;
  };
}

const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-white hover:bg-white/10 rounded-lg"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50"
          >
            <div className="p-4 border-b">
              <h3 className="font-semibold">Notifications</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="p-4 text-gray-500 text-center">
                  No notifications yet
                </p>
              ) : (
                notifications.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRead={() => markAsRead(notification.id)}
                  />
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
```

---

# 7. Complete App Design System

## 1. Brand Identity

### 1.1 Logo Design
```
Primary Logo: 
- Stylized lottery ball with zodiac wheel inside
- Colors: Deep purple (#4339a0) with gold accents (#f4c542)
- Typography: "COSMIC" in bold sans-serif, "LOTTERY" in elegant serif

Logo Variations:
- Full color on dark
- Full color on light  
- Monochrome
- Icon only (lottery ball with stars)
```

### 1.2 Brand Taglines
- Primary: "Your Birth, Your Fortune, Your Stars"
- Secondary: "Every Birth is a Cosmic Jackpot"
- CTA: "Draw Your Cosmic Numbers"

### 1.3 Visual Language
- **Concept**: Blend of casino/lottery aesthetics with mystical astrology
- **Mood**: Exciting, mysterious, luxurious, accessible
- **Elements**: Lottery balls, slot reels, zodiac wheels, constellation patterns, gold coins

## 2. Component Design Specifications

### 2.1 Landing Page Hero Section
```jsx
<section className="cosmic-hero">
  <div className="cosmic-stars-bg"> {/* Animated starfield background */}
    <div className="lottery-machine-animation">
      {/* 3D lottery machine with spinning zodiac symbols */}
    </div>
    
    <h1 className="hero-title">
      <span className="gold-text">WIN BIG</span> WITH YOUR 
      <span className="cosmic-gradient">COSMIC LOTTERY</span>
    </h1>
    
    <p className="hero-subtitle">
      Every birth chart is a winning ticket. Discover your cosmic jackpot.
    </p>
    
    <button className="cta-button lottery-style">
      <span className="button-text">Draw My Numbers</span>
      <span className="price-tag">Only $19.99</span>
    </button>
    
    <div className="trust-indicators">
      <div className="indicator">🎰 50,000+ Winning Charts</div>
      <div className="indicator">⭐ 4.9/5 Stars</div>
      <div className="indicator">🔒 Secure & Private</div>
    </div>
  </div>
</section>
```

### 2.2 Birth Data Input Form Design
```jsx
const BirthDataForm = () => {
  return (
    <div className="lottery-ticket-form">
      <div className="ticket-header">
        <h2>🎫 Your Cosmic Lottery Ticket</h2>
        <p>Fill in your numbers to play</p>
      </div>
      
      <div className="ticket-body">
        {/* Step 1: Name */}
        <div className="lottery-field">
          <label>Player Name</label>
          <input 
            type="text" 
            placeholder="Enter your cosmic alias"
            className="lottery-input"
          />
        </div>
        
        {/* Step 2: Birth Date - Styled like lottery number selection */}
        <div className="date-selector lottery-balls">
          <div className="ball-group">
            <label>Month</label>
            <select className="lottery-ball-select">
              {months.map(m => <option>{m}</option>)}
            </select>
          </div>
          <div className="ball-group">
            <label>Day</label>
            <select className="lottery-ball-select">
              {days.map(d => <option>{d}</option>)}
            </select>
          </div>
          <div className="ball-group">
            <label>Year</label>
            <input type="number" className="lottery-ball-input" />
          </div>
        </div>
        
        {/* Step 3: Time - Slot machine style */}
        <div className="time-selector slot-machine">
          <div className="slot-reel hour">
            <input type="number" min="1" max="12" />
          </div>
          <div className="slot-separator">:</div>
          <div className="slot-reel minute">
            <input type="number" min="0" max="59" />
          </div>
          <div className="slot-reel ampm">
            <select>
              <option>AM</option>
              <option>PM</option>
            </select>
          </div>
        </div>
        
        {/* Step 4: Location - Map with pin */}
        <div className="location-picker">
          <label>Where did you hit the cosmic jackpot?</label>
          <PlacesAutocomplete />
          <div className="mini-map">
            {/* Visual map with golden pin */}
          </div>
        </div>
      </div>
      
      <div className="ticket-footer">
        <button className="play-button">
          <span className="button-icon">🎰</span>
          <span>Play Cosmic Lottery</span>
          <span className="sparkle-effect">✨</span>
        </button>
      </div>
    </div>
  );
};
```

### 2.3 Report Display Layout
```jsx
const CosmicLotteryReport = () => {
  return (
    <div className="report-container cosmic-theme">
      {/* Header - Winning Ticket Announcement */}
      <header className="report-header winner-announcement">
        <div className="confetti-animation" />
        <h1 className="winner-text">
          🎉 COSMIC JACKPOT WINNER! 🎉
        </h1>
        <div className="winning-numbers">
          <div className="number-display">
            <span className="label">Sun</span>
            <span className="zodiac-ball">♌</span>
          </div>
          <div className="number-display">
            <span className="label">Moon</span>
            <span className="zodiac-ball">♓</span>
          </div>
          <div className="number-display">
            <span className="label">Rising</span>
            <span className="zodiac-ball">♐</span>
          </div>
        </div>
        <p className="winner-details">
          {userName} • Born {birthDate} at {birthTime} • {birthPlace}
        </p>
      </header>

      {/* Navigation - Casino Chips Style */}
      <nav className="report-nav casino-chips">
        <button className="chip-button active">
          <span className="chip-icon">🧠</span>
          <span>Personality</span>
        </button>
        <button className="chip-button">
          <span className="chip-icon">💼</span>
          <span>Career</span>
        </button>
        <button className="chip-button">
          <span className="chip-icon">❤️</span>
          <span>Love</span>
        </button>
        <button className="chip-button">
          <span className="chip-icon">🔮</span>
          <span>Karma</span>
        </button>
        <button className="chip-button">
          <span className="chip-icon">🌟</span>
          <span>Future</span>
        </button>
      </nav>

      {/* Report Sections - Styled as Prize Categories */}
      <main className="report-content">
        <section className="prize-section">
          <div className="section-header">
            <div className="prize-badge">
              <span className="prize-amount">GRAND PRIZE</span>
              <h2>Your Personality Profile</h2>
            </div>
          </div>
          <div className="section-content luxury-card">
            {/* Report content with elegant typography */}
          </div>
        </section>
      </main>

      {/* Action Bar - Claim Your Prizes */}
      <div className="action-bar claim-prizes">
        <button className="action-button download">
          <Trophy /> Claim PDF Trophy
        </button>
        <button className="action-button share">
          <Share /> Share My Win
        </button>
        <button className="action-button print">
          <Printer /> Print Certificate
        </button>
      </div>
    </div>
  );
};
```

## 3. Mobile Design Specifications

### 3.1 Mobile Navigation
```jsx
const MobileNav = () => (
  <div className="mobile-bottom-nav">
    <div className="nav-item">
      <Home className="icon" />
      <span>Home</span>
    </div>
    <div className="nav-item featured">
      <div className="play-button-mobile">
        <Dice className="icon spinning" />
        <span>PLAY</span>
      </div>
    </div>
    <div className="nav-item">
      <FileText className="icon" />
      <span>Reports</span>
    </div>
  </div>
);
```

### 3.2 Mobile Report Viewer
- Swipeable sections
- Collapsible content blocks
- Touch-optimized navigation
- Pinch-to-zoom for detailed views
- Share sheet integration

## 4. Animation Specifications

### 4.1 Micro-animations
```css
/* Lottery Ball Bounce */
@keyframes lotteryBounce {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(90deg); }
  50% { transform: translateY(0) rotate(180deg); }
  75% { transform: translateY(-10px) rotate(270deg); }
}

/* Slot Machine Spin */
@keyframes slotSpin {
  0% { transform: translateY(0); }
  100% { transform: translateY(-2000%); }
}

/* Gold Coin Flip */
@keyframes coinFlip {
  0% { transform: rotateY(0); }
  100% { transform: rotateY(360deg); }
}

/* Sparkle Effect */
@keyframes sparkle {
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
}
```

### 4.2 Page Transitions
```javascript
const pageVariants = {
  initial: { 
    opacity: 0, 
    scale: 0.8,
    rotateY: -180 
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    scale: 1.2,
    filter: "blur(10px)",
    transition: {
      duration: 0.3
    }
  }
};
```

## 5. Sound Design (Optional Enhancement)

### 5.1 Sound Effects
- **Lottery ball roll**: On form submission
- **Slot machine spin**: During loading
- **Jackpot win**: On report completion
- **Chip placement**: On navigation clicks
- **Coin collection**: On successful payment

### 5.2 Implementation
```javascript
const soundEffects = {
  play: () => new Audio('/sounds/lottery-roll.mp3').play(),
  spin: () => new Audio('/sounds/slot-spin.mp3').play(),
  win: () => new Audio('/sounds/jackpot.mp3').play(),
  chip: () => new Audio('/sounds/chip-place.mp3').play(),
  coin: () => new Audio('/sounds/coin-collect.mp3').play()
};
```

## 6. Gamification Elements

### 6.1 Achievement System
```javascript
const achievements = [
  {
    id: 'first_report',
    title: 'First Draw',
    description: 'Generated your first cosmic lottery report',
    icon: '🎰',
    points: 100
  },
  {
    id: 'triple_seven',
    title: 'Lucky Triple',
    description: 'Has 3 planets in the same sign',
    icon: '777',
    points: 777
  },
  {
    id: 'full_house',
    title: 'Full House',
    description: 'Generated reports for 5 people',
    icon: '🏠',
    points: 500
  }
];
```

### 6.2 Loyalty Program
- **Cosmic Coins**: Earn with each report
- **VIP Tiers**: Bronze, Silver, Gold, Platinum
- **Rewards**: Discounts, exclusive reports, priority support

## 7. Accessibility Features

### 7.1 High Contrast Mode
```css
.high-contrast {
  --primary: #ffffff;
  --background: #000000;
  --text: #ffffff;
  --accent: #ffff00;
}
```

### 7.2 Screen Reader Announcements
```jsx
<div className="sr-only" aria-live="polite">
  Your cosmic lottery report is {progress}% complete
</div>
```

### 7.3 Keyboard Navigation
- Tab through all interactive elements
- Enter/Space to activate buttons
- Arrow keys for navigation menu
- Escape to close modals

## 8. Error States Design

### 8.1 Friendly Error Messages
```javascript
const errorMessages = {
  payment_failed: {
    title: "Cosmic Hiccup! 🌟",
    message: "The stars weren't aligned for that payment. Let's try again!",
    icon: "🎰",
    action: "Try Another Card"
  },
  generation_failed: {
    title: "Mercury Must Be in Retrograde! ☿",
    message: "We hit a cosmic snag. Your lottery ticket is safe - let's spin again!",
    icon: "🔄",
    action: "Re-spin the Cosmos"
  }
};
```

## 9. Marketing Integration Points

### 9.1 Social Sharing Templates
```javascript
const shareTemplates = {
  twitter: "I just won the Cosmic Lottery! 🎰✨ My birth chart revealed [highlight]. What's your cosmic jackpot? Play at cosmiclottery.com",
  instagram: "COSMIC JACKPOT WINNER! 🎉 Born under [sign] with [planet] rising. #CosmicLottery #Astrology #BirthChart",
  facebook: "Just discovered my cosmic lottery numbers and WOW! [personalized insight]. Find your cosmic fortune at Cosmic Lottery!"
};
```

### 9.2 Referral Program UI
```jsx
<div className="referral-card golden-ticket">
  <h3>🎫 Share the Cosmic Wealth!</h3>
  <p>Give $5, Get $5 when friends play</p>
  <div className="referral-code">
    <span>Your Lucky Code:</span>
    <code>COSMIC-{userCode}</code>
  </div>
  <button className="share-button">Share Golden Ticket</button>
</div>
```

---

# 8. Implementation Examples

```typescript
// Cosmic Lottery - Key Implementation Examples

// ============================================
// 1. Report Generation Service
// ============================================

import { OpenAI } from 'openai';
import { Queue } from 'bullmq';
import { Redis } from 'ioredis';

interface BirthData {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

class ReportGenerationService {
  private openai: OpenAI;
  private reportQueue: Queue;
  private redis: Redis;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    this.redis = new Redis(process.env.REDIS_URL);
    
    this.reportQueue = new Queue('report-generation', {
      connection: this.redis,
    });
  }

  async generateReport(userId: string, birthData: BirthData): Promise<string> {
    // Create report record in database
    const reportId = await this.createReportRecord(userId, birthData);
    
    // Add to queue for processing
    await this.reportQueue.add('generate', {
      reportId,
      userId,
      birthData,
    }, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    });

    return reportId;
  }

  async processReportGeneration(jobData: any) {
    const { reportId, userId, birthData } = jobData;
    
    try {
      // Update status
      await this.updateReportStatus(reportId, 'processing', 0);
      
      // Step 1: Calculate astrological data (20%)
      const astroData = await this.calculateAstrologicalData(birthData);
      await this.updateReportStatus(reportId, 'processing', 20);
      
      // Step 2: Prepare enhanced prompt with astrological data
      const enhancedPrompt = this.buildEnhancedPrompt(birthData, astroData);
      await this.updateReportStatus(reportId, 'processing', 40);
      
      // Step 3: Generate report with GPT-4
      const reportContent = await this.generateWithGPT(enhancedPrompt);
      await this.updateReportStatus(reportId, 'processing', 80);
      
      // Step 4: Format and save report
      const formattedReport = this.formatReport(reportContent);
      await this.saveReport(reportId, formattedReport);
      
      // Step 5: Generate PDF
      const pdfUrl = await this.generatePDF(reportId, formattedReport);
      await this.updateReportStatus(reportId, 'completed', 100, { pdfUrl });
      
      // Send notification
      await this.notifyUser(userId, reportId);
      
    } catch (error) {
      await this.updateReportStatus(reportId, 'failed', 0, { 
        error: error.message 
      });
      throw error;
    }
  }

  private buildEnhancedPrompt(birthData: BirthData, astroData: any): string {
    return `
      You are a professional astrologer creating a personalized "Cosmic Lottery" report.
      Style: Blend professional astrological insight with lottery/fortune theme.
      Tone: Exciting, positive, yet accurate and insightful.
      
      Create a detailed natal chart analysis for ${birthData.name}, born on ${birthData.birthDate} 
      at ${birthData.birthTime} in ${birthData.birthPlace}.
      
      Astrological Data:
      Sun Sign: ${astroData.sun}
      Moon Sign: ${astroData.moon}
      Rising Sign: ${astroData.rising}
      [Additional planetary positions...]
      
      Frame insights as "cosmic winnings" and "jackpot traits."
      
      Organize into five sections:
      1. Psychological and Personality Profile - "Your Cosmic Jackpot Personality"
      2. Career and Vocational Strengths - "Your Fortune in the Career Casino"
      3. Relationship Style and Love Patterns - "Love Lottery Numbers"
      4. Karmic Lessons and Past Life Indicators - "Karma Coins & Past Life Prizes"
      5. Current Major Transits - "Your Next 12 Months of Cosmic Chances"
      
      Make it psychologically insightful, specific, and avoid generic statements.
      Include specific examples and actionable insights.
    `;
  }

  private async generateWithGPT(prompt: string): Promise<any> {
    const completion = await this.openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert astrologer with deep knowledge of both classical and modern astrology, creating premium personalized reports."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 4000,
    });

    return this.parseGPTResponse(completion.choices[0].message.content);
  }

  private formatReport(content: any): FormattedReport {
    return {
      sections: {
        psychological: {
          title: "Your Cosmic Jackpot Personality",
          icon: "🧠",
          content: content.psychological,
          highlights: this.extractHighlights(content.psychological),
        },
        career: {
          title: "Your Fortune in the Career Casino",
          icon: "💼",
          content: content.career,
          highlights: this.extractHighlights(content.career),
        },
        relationships: {
          title: "Love Lottery Numbers",
          icon: "❤️",
          content: content.relationships,
          highlights: this.extractHighlights(content.relationships),
        },
        karmic: {
          title: "Karma Coins & Past Life Prizes",
          icon: "🔮",
          content: content.karmic,
          highlights: this.extractHighlights(content.karmic),
        },
        transits: {
          title: "Your Next 12 Months of Cosmic Chances",
          icon: "🌟",
          content: content.transits,
          highlights: this.extractHighlights(content.transits),
        },
      },
      metadata: {
        generatedAt: new Date(),
        version: "1.0",
        totalWords: this.countWords(content),
      },
    };
  }
}

// ============================================
// 2. React Components Implementation
// ============================================

// Loading Screen Component
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface LoadingScreenProps {
  reportId: string;
  onComplete: () => void;
}

export const CosmicLotteryLoader: React.FC<LoadingScreenProps> = ({ 
  reportId, 
  onComplete 
}) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('starting');
  const [timeRemaining, setTimeRemaining] = useState(45);

  useEffect(() => {
    // Poll for progress updates
    const progressInterval = setInterval(async () => {
      const response = await fetch(`/api/reports/${reportId}/status`);
      const data = await response.json();
      
      setProgress(data.progress);
      setCurrentPhase(data.phase);
      
      if (data.status === 'completed') {
        clearInterval(progressInterval);
        // Celebration animation
        confetti({
          particleCount: 200,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4339a0', '#f4c542', '#c0c0c0']
        });
        setTimeout(onComplete, 1500);
      }
    }, 1000);

    return () => clearInterval(progressInterval);
  }, [reportId, onComplete]);

  const getPhaseMessage = () => {
    const messages = {
      starting: "Drawing your cosmic lottery numbers...",
      calculating: "Calculating planetary positions at your moment of birth...",
      analyzing: "Your cosmic winning combination is being analyzed...",
      formatting: "Revealing your cosmic jackpot...",
      completed: "🎉 JACKPOT! Your cosmic fortune is ready! 🎉"
    };
    return messages[currentPhase] || messages.starting;
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-2xl w-full px-8">
        {/* Cosmic Lottery Wheel Animation */}
        <div className="mb-8">
          <CosmicWheel progress={progress} />
        </div>

        {/* Progress Information */}
        <div className="text-center text-white">
          <motion.h2 
            className="text-3xl font-display mb-4"
            key={currentPhase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {getPhaseMessage()}
          </motion.h2>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-3 mb-6 overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          
          {/* Progress Stats */}
          <div className="flex justify-between text-sm text-white/70 mb-8">
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              {progress}% Complete
            </span>
            <span>~{timeRemaining}s remaining</span>
          </div>

          {/* Cosmic Facts Carousel */}
          <CosmicFactsCarousel />
        </div>
      </div>
    </motion.div>
  );
};

// Birth Data Form Component
interface BirthDataFormProps {
  onSubmit: (data: BirthData) => void;
}

export const CosmicLotteryTicketForm: React.FC<BirthDataFormProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<BirthData>>({});
  
  const handleNextStep = (data: Partial<BirthData>) => {
    setFormData({ ...formData, ...data });
    if (step < 4) {
      setStep(step + 1);
    } else {
      onSubmit(formData as BirthData);
    }
  };

  return (
    <motion.div 
      className="lottery-ticket-container max-w-2xl mx-auto"
      initial={{ rotateY: -180, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="lottery-ticket bg-gradient-to-br from-yellow-400 to-yellow-600 p-8 rounded-lg shadow-2xl">
        {/* Ticket Header */}
        <div className="ticket-header text-center mb-8">
          <h2 className="text-3xl font-bold text-purple-900">
            🎫 COSMIC LOTTERY TICKET 🎫
          </h2>
          <p className="text-purple-700 mt-2">
            Fill in your cosmic numbers to play
          </p>
          
          {/* Step Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  ${s <= step ? 'bg-purple-900 text-yellow-400' : 'bg-purple-200 text-purple-400'}`}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          {step === 1 && <StepOne onNext={handleNextStep} />}
          {step === 2 && <StepTwo onNext={handleNextStep} formData={formData} />}
          {step === 3 && <StepThree onNext={handleNextStep} formData={formData} />}
          {step === 4 && <StepFour onSubmit={handleNextStep} formData={formData} />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Report Viewer Component
interface ReportViewerProps {
  report: FormattedReport;
  user: User;
}

export const CosmicJackpotReport: React.FC<ReportViewerProps> = ({ report, user }) => {
  const [activeSection, setActiveSection] = useState('psychological');
  const [showCelebration, setShowCelebration] = useState(true);

  useEffect(() => {
    if (showCelebration) {
      // Initial celebration
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
      
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [showCelebration]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 to-black">
      {/* Winner Announcement Header */}
      <motion.header 
        className="relative overflow-hidden bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500 p-8"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            className="text-5xl font-bold text-white mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            🎉 COSMIC JACKPOT WINNER! 🎉
          </motion.h1>
          
          {/* Winning Numbers Display */}
          <div className="flex justify-center space-x-4 my-6">
            <WinningNumber label="Sun" sign={report.astroData.sun} />
            <WinningNumber label="Moon" sign={report.astroData.moon} />
            <WinningNumber label="Rising" sign={report.astroData.rising} />
          </div>
          
          <p className="text-white/90 text-lg">
            {user.name} • Born {user.birthDate} at {user.birthTime} • {user.birthPlace}
          </p>
        </div>
      </motion.header>

      {/* Report Content */}
      <div className="max-w-6xl mx-auto p-8">
        {/* Casino Chip Navigation */}
        <nav className="flex justify-center space-x-4 mb-12">
          {Object.entries(report.sections).map(([key, section]) => (
            <CasinoChip
              key={key}
              active={activeSection === key}
              onClick={() => setActiveSection(key)}
              icon={section.icon}
              label={section.title}
            />
          ))}
        </nav>

        {/* Active Section Content */}
        <AnimatePresence mode="wait">
          <motion.section
            key={activeSection}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-2xl"
          >
            <PrizeSection section={report.sections[activeSection]} />
          </motion.section>
        </AnimatePresence>

        {/* Action Bar */}
        <motion.div 
          className="flex justify-center space-x-4 mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ActionButton
            icon="🏆"
            label="Download PDF Trophy"
            onClick={() => downloadPDF(report.id)}
            primary
          />
          <ActionButton
            icon="🎊"
            label="Share My Win"
            onClick={() => shareReport(report.id)}
          />
          <ActionButton
            icon="🎫"
            label="Play Again"
            onClick={() => navigateToNew()}
          />
        </motion.div>
      </div>
    </div>
  );
};

// ============================================
// 3. Payment Integration
// ============================================

import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const PaymentForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      // Create payment intent
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: 1999, // $19.99 in cents
          description: 'Cosmic Lottery Report'
        }),
      });

      const { clientSecret } = await response.json();

      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      // Payment successful
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f4c542', '#4339a0']
      });

      onSuccess();
    } catch (error) {
      console.error('Payment error:', error);
      // Show error toast
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form lottery-style">
      <div className="payment-header">
        <h3 className="text-2xl font-bold text-purple-900">
          🎰 Insert Coins to Play 🎰
        </h3>
        <p className="text-purple-700">One play = One cosmic fortune</p>
      </div>

      <div className="card-element-container">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="payment-button lottery-play-button"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center">
            <span className="animate-spin mr-2">🎰</span>
            Processing...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <span className="mr-2">💳</span>
            Pay $19.99 & Draw Numbers
          </span>
        )}
      </button>

      <div className="payment-trust-badges">
        <span>🔒 Secure Payment</span>
        <span>💳 SSL Encrypted</span>
        <span>✅ Money Back Guarantee</span>
      </div>
    </form>
  );
};
```

---

## Development Timeline Summary

### Phase 1: MVP (6-8 weeks)
- Basic infrastructure setup
- Core report generation
- Payment integration
- Simple UI implementation

### Phase 2: Full Launch (4-6 weeks)
- Complete Cosmic Lottery branding
- All gamification features
- Advanced animations
- Mobile optimization

### Phase 3: Growth (Ongoing)
- Marketing campaigns
- Feature enhancements
- API marketplace
- White-label options

## Total Investment Estimate
- **MVP Development**: $15,000-25,000
- **Full Launch**: $10,000-15,000
- **Marketing Budget**: $5,000-10,000
- **Total Initial Investment**: $30,000-50,000

## Revenue Projections
- **Year 1 Target**: 1,000 monthly subscribers = $15,000 MRR
- **Break-even**: Month 3-4
- **Profit Margin**: 95% per report

The Cosmic Lottery app transforms astrology into an exciting, gamified experience that will attract both astrology enthusiasts and newcomers. The lottery theme provides endless marketing opportunities and makes the spiritual practice more accessible and fun.
```