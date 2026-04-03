const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const allowedOrigins = [
  'https://portfolio-frontend-rose-nine-14.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  credentials: true
}));

app.use(express.json());

const apiRoutes = require(path.join(__dirname, 'routes', 'api'));
app.use('/api', apiRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    hasEmailConfig: Boolean(process.env.GMAIL_USER && process.env.GMAIL_PASS)
  });
});

app.get('/', (req, res) => {
  res.send('Portfolio Gmail API is running...');
});

app.use((error, req, res, next) => {
  console.error('Server error:', error.message);

  if (res.headersSent) {
    return next(error);
  }

  return res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
  console.log('Health check available at /health');
  console.log(`Email configuration present: ${Boolean(process.env.GMAIL_USER && process.env.GMAIL_PASS)}`);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  server.close(() => process.exit(1));
});
