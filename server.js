require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { db, seedListings } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "script-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      "img-src": ["'self'", "data:", "https://*"],
    },
  },
}));

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// API: Get all listings (with fallback for serverless robustness)
app.get('/api/listings', (req, res) => {
  try {
    let listings;
    if (db) {
      listings = db.prepare('SELECT * FROM listings ORDER BY featured DESC, id ASC').all();
    } else {
      console.warn('Using in-memory fallback for listings');
      listings = seedListings;
    }
    
    const formattedListings = listings.map(l => ({
      ...l,
      tech_stack: typeof l.tech_stack === 'string' ? JSON.parse(l.tech_stack) : l.tech_stack,
      details: typeof l.details === 'string' ? JSON.parse(l.details) : l.details
    }));
    
    res.json(formattedListings);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to retrieve listings' });
  }
});

// API: Stripe Checkout Skeleton
app.post('/api/checkout', (req, res) => {
  const { listingId, email } = req.body;
  
  if (!listingId || !email) {
    return res.status(400).json({ error: 'Listing ID and email are required.' });
  }

  // Placeholder for real Stripe logic
  // const session = await stripe.checkout.sessions.create({...});
  
  res.status(200).json({ 
    message: 'Checkout session created (simulation)',
    url: '/checkout-success-simulation' 
  });
});

// API: Seller Submission
app.post('/api/submissions', (req, res) => {
  const { name, email, repo_url, description } = req.body;
  
  if (!name || !email || !repo_url) {
    return res.status(400).json({ error: 'Name, email, and repository URL are required.' });
  }
  
  console.log('New Seller Submission:', { name, email, repo_url, description });
  res.status(202).json({ message: 'Submission received for curation. We will contact you shortly.' });
});

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`RepoDepot v1.1 (Express 4) running on http://localhost:${PORT}`);
});
