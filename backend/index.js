const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const urlController = require('./controllers/urlController');
const errorMiddleware = require('./middleware/errorMiddleware');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3300;

// Apply security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Routes
app.post('/api/generate-image', urlController.generateImage);
app.get('/api/health', (req, res) => res.status(200).json({ status: 'ok' }));

// Error handling middleware
app.use(errorMiddleware);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // For testing purposes
