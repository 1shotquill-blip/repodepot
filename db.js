require('dotenv').config();
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Seed data — 100% focused on business value & buyer ROI
const seedListings = [
  {
    id: 1,
    name: 'AI Trading Dashboard Business',
    description: 'A complete, ready-to-run high-frequency trading platform. Own the infrastructure behind a professional signal service.',
    business_outcome: 'Launch a proprietary trading platform or signal service immediately. Replace $40k+ in initial development costs and 6 months of build time.',
    price: 8500,
    icon: '🤖',
    badge: '★ PREMIUM',
    tech_stack: JSON.stringify(['Next.js 15', 'FastAPI', 'Redis', 'Supabase']),
    featured: 1,
    details: JSON.stringify({
      monetization: 'Designed for premium subscription models. Break-even with 15-20 users.',
      operational_cost: 'Low. Fully containerized and optimized for high-performance edge deployment.',
      market_ready: 'Includes professional UI, real-time data feeds, and proprietary signal logic.'
    }),
    delivery_info: 'Full repository access, commercial license, and deployment guides included.'
  },
  {
    id: 2,
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
    id: 3,
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

let db;
try {
  const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'repodepot.db');
  
  // On Vercel, the filesystem is read-only except /tmp
  // For production robustness, we use in-memory fallback
  db = new Database(dbPath, { timeout: 5000 });

  db.exec(`
    CREATE TABLE IF NOT EXISTS listings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      business_outcome TEXT,
      price INTEGER NOT NULL,
      icon TEXT,
      badge TEXT,
      tech_stack TEXT,
      featured INTEGER DEFAULT 0,
      details TEXT,
      delivery_info TEXT
    )
  `);

  const count = db.prepare('SELECT count(*) as count FROM listings').get().count;
  if (count === 0) {
    const insert = db.prepare(`
      INSERT INTO listings (id, name, description, business_outcome, price, icon, badge, tech_stack, featured, details, delivery_info)
      VALUES (@id, @name, @description, @business_outcome, @price, @icon, @badge, @tech_stack, @featured, @details, @delivery_info)
    `);
    const transaction = db.transaction((listings) => {
      for (const listing of listings) insert.run(listing);
    });
    transaction(seedListings);
    console.log('Database seeded successfully');
  }
} catch (err) {
  console.error('Database initialization error:', err.message);
  db = null; // Fallback to in-memory in server.js
}

module.exports = { db, seedListings };
