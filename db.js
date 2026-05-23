require('dotenv').config();
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = process.env.DATABASE_PATH || 'repodepot.db';
const db = new Database(dbPath);

// Create listings table with business-focused schema
db.exec(`
  CREATE TABLE IF NOT EXISTS listings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    business_outcome TEXT,
    price INTEGER NOT NULL,
    icon TEXT,
    badge TEXT,
    inventory_badge TEXT,
    tech_stack TEXT, -- Store as JSON string
    featured INTEGER DEFAULT 0,
    details TEXT, -- Store as JSON string (ROI, cost savings, etc.)
    delivery_info TEXT -- What the buyer gets instantly
  )
`);

// Seed data with strong business messaging
const seedListings = [
  {
    name: 'AI Trading Dashboard Core',
    description: 'A complete high-frequency trading interface. Own the infrastructure behind a professional signal service.',
    business_outcome: 'Launch a proprietary trading platform or signal service in days, not months. Save $40k+ in initial development costs.',
    price: 8500,
    icon: '🤖',
    badge: '★ PREMIUM',
    inventory_badge: 'Exclusive Ownership',
    tech_stack: JSON.stringify(['Next.js 15', 'FastAPI', 'Redis', 'Supabase']),
    featured: 1,
    details: JSON.stringify({
      roi: 'Break even with 15-20 premium subscribers.',
      maintenance: 'Low. Fully containerized and ready for scale.',
      scalability: 'Handles 10k+ concurrent WebSocket connections.'
    }),
    delivery_info: 'Full source code, deployment automation, and IP transfer agreement.'
  },
  {
    name: 'SaaS Billing Infrastructure',
    description: 'The backbone for any subscription business. Replace high-fee billing SaaS with your own platform.',
    business_outcome: 'Eliminate monthly "seat taxes" and per-transaction fees. Own your billing logic and customer data.',
    price: 3200,
    icon: '⚡',
    badge: '',
    inventory_badge: 'Verified Logic',
    tech_stack: JSON.stringify(['Next.js', 'Stripe', 'Prisma', 'PostgreSQL']),
    featured: 0,
    details: JSON.stringify({
      cost_savings: 'Saves ~$1,200/year in middleware fees for early-stage startups.',
      features: 'Metered billing, dunning flows, and automated tax handling.'
    }),
    delivery_info: 'Production-ready billing engine and environment configuration.'
  },
  {
    name: 'Auth Zero — Identity Provider',
    description: 'A drop-in identity provider for enterprise apps. Own your user data without the "auth tax".',
    business_outcome: 'Support Enterprise SSO and MFA out of the box. Ideal for B2B SaaS aiming for the "Enterprise Ready" badge.',
    price: 1900,
    icon: '🛡️',
    badge: '',
    inventory_badge: 'Enterprise Grade',
    tech_stack: JSON.stringify(['Go', 'JWT', 'OAuth 2.0', 'Redis']),
    featured: 0,
    details: JSON.stringify({
      compliance: 'Built with SOC2/GDPR principles in mind.',
      integration: 'Plug-and-play with any OIDC-compliant application.'
    }),
    delivery_info: 'Self-hosted identity core and security documentation.'
  }
];

function seed() {
  const count = db.prepare('SELECT count(*) as count FROM listings').get().count;
  if (count === 0) {
    const insert = db.prepare(`
      INSERT INTO listings (name, description, business_outcome, price, icon, badge, inventory_badge, tech_stack, featured, details, delivery_info)
      VALUES (@name, @description, @business_outcome, @price, @icon, @badge, @inventory_badge, @tech_stack, @featured, @details, @delivery_info)
    `);

    const transaction = db.transaction((listings) => {
      for (const listing of listings) {
        insert.run(listing);
      }
    });

    transaction(seedListings);
    console.log('Database seeded with business-focused listings.');
  } else {
    console.log('Database already contains listings. Skipping seed.');
  }
}

seed();

module.exports = db;
