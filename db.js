const Database = require('better-sqlite3');
const db = new Database('repodepot.db');

// Create listings table
db.exec(`
  CREATE TABLE IF NOT EXISTS listings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    icon TEXT,
    badge TEXT,
    inventory_badge TEXT,
    sloc INTEGER,
    featured INTEGER DEFAULT 0,
    tags TEXT, -- Store as JSON string
    tooltip TEXT
  )
`);

// Seed data
const seedListings = [
  {
    name: 'AI Trading Dashboard Core',
    description: 'A complete high-frequency trading interface. Connect your API keys and launch your own signal service or trading platform today.',
    price: 8500,
    icon: '🤖',
    badge: '★ PREMIUM',
    inventory_badge: 'Single License Only',
    sloc: 3200,
    featured: 1,
    tags: JSON.stringify(['Next.js 15', 'FastAPI', 'Redis', 'Supabase']),
    tooltip: 'Includes: Full source code, commercial license, deployment guide, 30-day technical support'
  },
  {
    name: 'SaaS Billing Engine',
    description: 'Scale your SaaS without building billing from scratch. Includes metered usage, dunning flows, and automated tax handling.',
    price: 3200,
    icon: '⚡',
    badge: '',
    inventory_badge: 'Verified Revenue',
    sloc: 1800,
    featured: 0,
    tags: JSON.stringify(['Next.js', 'Stripe', 'Prisma', 'PostgreSQL']),
    tooltip: 'Includes: Full source code, Stripe configuration guide, environment templates'
  },
  {
    name: 'Auth Zero — Identity Layer',
    description: 'A drop-in identity provider for enterprise apps. Support SSO and MFA out of the box. Own your user data without the monthly seat tax.',
    price: 1900,
    icon: '🛡️',
    badge: '',
    inventory_badge: 'Enterprise Ready',
    sloc: 2100,
    featured: 0,
    tags: JSON.stringify(['Go', 'JWT', 'OAuth 2.0', 'Redis']),
    tooltip: 'Includes: Production auth core, white-label UI, security documentation'
  },
  {
    name: 'Analytics Platform Core',
    description: 'A self-hosted, white-label analytics engine. Own your customer data and build custom dashboards for your clients without per-event fees.',
    price: 4800,
    icon: '📊',
    badge: '',
    inventory_badge: 'SaaS Ready',
    sloc: 4400,
    featured: 0,
    tags: JSON.stringify(['React', 'Python', 'ClickHouse', 'D3.js']),
    tooltip: 'Includes: Full white-label source, database schema, deployment manifests'
  },
  {
    name: 'Edge CDN Orchestrator',
    description: 'Production-ready edge routing. Deploy a global CDN with smart caching and geo-aware logic in minutes using Cloudflare Workers.',
    price: 2400,
    icon: '🌐',
    badge: '',
    inventory_badge: 'High Performance',
    sloc: 980,
    featured: 0,
    tags: JSON.stringify(['TypeScript', 'Workers', 'KV Store']),
    tooltip: 'Includes: Edge Worker source, routing templates, cache logic'
  },
  {
    name: 'LLM Gateway — API Router',
    description: 'The infrastructure for your AI startup. Unified routing, fallback chains, and precise cost tracking across all major LLM providers.',
    price: 6200,
    icon: '🧠',
    badge: '',
    inventory_badge: 'AI Infrastructure',
    sloc: 2700,
    featured: 0,
    tags: JSON.stringify(['Bun', 'Hono', 'OpenAI', 'Anthropic']),
    tooltip: 'Includes: Router source code, provider adapters, cost-tracking layer'
  }
];

const insert = db.prepare(`
  INSERT INTO listings (name, description, price, icon, badge, inventory_badge, sloc, featured, tags, tooltip)
  VALUES (@name, @description, @price, @icon, @badge, @inventory_badge, @sloc, @featured, @tags, @tooltip)
`);

const count = db.prepare('SELECT count(*) as count FROM listings').get().count;

if (count === 0) {
  for (const listing of seedListings) {
    insert.run(listing);
  }
  console.log('Database seeded with initial listings.');
} else {
  console.log('Database already contains listings.');
}

module.exports = db;
