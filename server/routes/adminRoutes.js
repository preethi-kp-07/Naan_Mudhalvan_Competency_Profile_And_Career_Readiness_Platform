import express from 'express';
import { getDBStatus } from '../config/db.js';

export const adminRouter = express.Router();

// GET /api/admin/cohort
adminRouter.get('/cohort', (req, res) => {
  res.json({
    success: true,
    cohort: {
      totalStudents: 142,
      activeStudents: 138,
      averageCompetencyScore: 68.4,
      averageCareerReadiness: 71.2,
      assessmentParticipationRate: 88,
      topDeficientCompetency: 'Relational Databases & SQL',
      studentsNeedingIntervention: 28,
    },
  });
});

// GET /api/admin/status
adminRouter.get('/status', (req, res) => {
  res.json({
    success: true,
    serverTime: new Date().toISOString(),
    database: getDBStatus(),
    environment: process.env.NODE_ENV || 'development',
  });
});
