const fs = require('fs');
const path = require('path');

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
