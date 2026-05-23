const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// API to get all listings
app.get('/api/listings', (req, res) => {
  try {
    const listings = db.prepare('SELECT * FROM listings ORDER BY featured DESC, id ASC').all();
    // Parse JSON tags
    const formattedListings = listings.map(l => ({
      ...l,
      tags: JSON.parse(l.tags)
    }));
    res.json(formattedListings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve index.html for all other routes (SPA style if needed, but here just for root)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`RepoDepot backend running on http://localhost:${PORT}`);
});
