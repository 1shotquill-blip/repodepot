require('dotenv').config();
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = process.env.DATABASE_PATH || 'repodepot.db';
const db = new Database(dbPath);

// Create listings table with business-focused schema
db.exec(`
  DROP TABLE IF EXISTS listings;
  CREATE TABLE listings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    business_outcome TEXT,
    price INTEGER NOT NULL,
    icon TEXT,
    badge TEXT,
    tech_stack TEXT, -- Store as JSON string
    featured INTEGER DEFAULT 0,
    details TEXT, -- Store as JSON string (ROI, cost savings, etc.)
    delivery_info TEXT -- What the buyer gets instantly
  )
`);

// Seed data with strict business messaging
const seedListings = [
  {
    name: 'AI Trading Dashboard Business',
    description: 'A complete, ready-to-run high-frequency trading platform. Own the infrastructure behind a professional signal service.',
    business_outcome: 'Launch a proprietary trading platform or signal service immediately. Replace $40k+ in initial development costs and 6 months of build time.',
    price: 8500,
    icon: '🤖',
    badge: '★ PREMIUM',
    tech_stack: JSON.stringify(['Next.js 15', 'FastAPI', 'Redis', 'Supabase']),
    featured: 1,
    details: JSON.stringify({
      monetization: 'Designed for premium subscription models. break-even with 15-20 users.',
      operational_cost: 'Low. Fully containerized and optimized for high-performance edge deployment.',
      market_ready: 'Includes professional UI, real-time data feeds, and proprietary signal logic.'
    }),
    delivery_info: 'Full repository access, commercial license, and deployment guides included.'
  },
  {
    name: 'SaaS Billing & Subscription Platform',
    description: 'The backbone for any subscription business. Own your billing logic and data instead of paying monthly seat taxes.',
    business_outcome: 'Eliminate 3-5% transaction fees from middleware providers. Own your customer data and billing workflows outright.',
    price: 3200,
    icon: '⚡',
    badge: '',
    tech_stack: JSON.stringify(['Next.js', 'Stripe', 'Prisma', 'PostgreSQL']),
    featured: 0,
    details: JSON.stringify({
      roi: 'Saves ~$1,200/year in middleware fees for early-stage startups.',
      features: 'Full support for metered billing, dunning flows, and automated tax handling.',
      scalability: 'Production-tested core ready for thousands of active subscribers.'
    }),
    delivery_info: 'Complete source code and environment configuration guides included.'
  },
  {
    name: 'Enterprise Identity Provider (SSO)',
    description: 'A drop-in identity core for enterprise-grade applications. Support SSO and MFA without the "enterprise tax".',
    business_outcome: 'Close enterprise deals faster with built-in SSO and MFA. Save 400+ hours of security-critical development.',
    price: 1900,
    icon: '🛡️',
    badge: '',
    tech_stack: JSON.stringify(['Go', 'JWT', 'OAuth 2.0', 'Redis']),
    featured: 0,
    details: JSON.stringify({
      compliance: 'Built following SOC2 and GDPR security best-practices.',
      integration: 'Plug-and-play with any OIDC or SAML compliant application.',
      security: 'Hardened core with activity logging and multi-tenant isolation.'
    }),
    delivery_info: 'Self-hosted identity core and comprehensive security documentation included.'
  }
];

function seed() {
  const insert = db.prepare(`
    INSERT INTO listings (name, description, business_outcome, price, icon, badge, tech_stack, featured, details, delivery_info)
    VALUES (@name, @description, @business_outcome, @price, @icon, @badge, @tech_stack, @featured, @details, @delivery_info)
  `);

  const transaction = db.transaction((listings) => {
    for (const listing of listings) {
      insert.run(listing);
    }
  });

  transaction(seedListings);
  console.log('Database seeded with business-focused listings.');
}

seed();

module.exports = db;
