// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// --- Middleware (must be present) ---
app.use(cors()); // allow cross-origin requests (or restrict to your Netlify domain)
app.use(express.json()); // parse JSON bodies

// --- Simple health/test route ---
app.get('/', (req, res) => {
  res.send('Quiz Backend Running');
});

// --- Conditionally load auth routes (safe: won't crash if file missing) ---
try {
  const authPath = path.join(__dirname, 'routes', 'authRoutes.js');
  if (fs.existsSync(authPath)) {
    const authRoutes = require('./routes/authRoutes');
    app.use('/auth', authRoutes);
    console.log('Auth routes loaded.');
  } else {
    console.warn('Auth routes not found — continuing without /auth endpoints.');
  }
} catch (err) {
  console.warn('Failed to load auth routes — continuing without /auth endpoints.', err.message);
}

// --- Start server on Render port ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
