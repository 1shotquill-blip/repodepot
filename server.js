require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const db = require('./db');

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

// API: Get all listings (Business Focused)
app.get('/api/listings', (req, res) => {
  try {
    const listings = db.prepare('SELECT * FROM listings ORDER BY featured DESC, id ASC').all();
    
    const formattedListings = listings.map(l => ({
      ...l,
      tech_stack: JSON.parse(l.tech_stack),
      details: JSON.parse(l.details)
    }));
    
    res.json(formattedListings);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to retrieve listings' });
  }
});

// API: Seller Submission (Skeleton/Placeholder)
app.post('/api/submissions', (req, res) => {
  const { name, email, repo_url, description } = req.body;
  
  // Basic Validation
  if (!name || !email || !repo_url) {
    return res.status(400).json({ error: 'Name, email, and repository URL are required.' });
  }
  
  // In a real app, we'd store this in a 'submissions' table and notify admin
  console.log('New Seller Submission:', { name, email, repo_url, description });
  
  res.status(202).json({ message: 'Submission received for curation. We will contact you shortly.' });
});

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`RepoDepot v1.0 (Express 4) running on http://localhost:${PORT}`);
});
