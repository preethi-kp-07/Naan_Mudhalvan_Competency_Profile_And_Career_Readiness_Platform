import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, getDBStatus } from './config/db.js';
import { seedInitialData } from './seed/seedData.js';
import { authRouter } from './routes/authRoutes.js';
import { studentRouter } from './routes/studentRoutes.js';
import { assessmentRouter } from './routes/assessmentRoutes.js';
import { materialRouter } from './routes/materialRoutes.js';
import { adminRouter } from './routes/adminRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'Naan Mudhalvan Competency Profile & Career Readiness Platform',
    timestamp: new Date().toISOString(),
    database: getDBStatus(),
  });
});

// Mount API routes
app.use('/api/auth', authRouter);
app.use('/api/student', studentRouter);
app.use('/api/assessments', assessmentRouter);
app.use('/api/materials', materialRouter);
app.use('/api/admin', adminRouter);

// Start Server & Connect Database
const startServer = async () => {
  const dbConnected = await connectDB();
  if (dbConnected) {
    await seedInitialData();
  }

  app.listen(PORT, () => {
    console.log(`\n🚀 Naan Mudhalvan MERN Backend Server running on: http://localhost:${PORT}`);
    console.log(`📋 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🔐 Auth Endpoints: http://localhost:${PORT}/api/auth/login`);
    console.log(`📊 Competency Endpoints: http://localhost:${PORT}/api/student/competencies\n`);
  });
};

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
