import express from 'express';
import { StudentProfile } from '../models/StudentProfile.js';
import { INITIAL_SEED_PROFILE } from '../seed/seedData.js';
import { getDBStatus } from '../config/db.js';

export const studentRouter = express.Router();

// GET /api/student/profile
studentRouter.get('/profile', async (req, res) => {
  try {
    const { isConnected } = getDBStatus();
    let profile;

    if (isConnected) {
      profile = await StudentProfile.findOne({ userId: 'user-stu-1' });
    }

    if (!profile) {
      profile = INITIAL_SEED_PROFILE;
    }

    return res.json({ success: true, profile });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message, profile: INITIAL_SEED_PROFILE });
  }
});

// GET /api/student/competencies
studentRouter.get('/competencies', async (req, res) => {
  try {
    const { isConnected } = getDBStatus();
    let competencies;

    if (isConnected) {
      const profile = await StudentProfile.findOne({ userId: 'user-stu-1' });
      if (profile && profile.competencies?.length > 0) {
        competencies = profile.competencies;
      }
    }

    if (!competencies) {
      competencies = INITIAL_SEED_PROFILE.competencies;
    }

    return res.json({ success: true, competencies });
  } catch (err) {
    return res.status(500).json({ success: false, competencies: INITIAL_SEED_PROFILE.competencies });
  }
});

// PUT /api/student/profile
studentRouter.put('/profile', async (req, res) => {
  try {
    const { isConnected } = getDBStatus();
    const updates = req.body;

    if (isConnected) {
      const updated = await StudentProfile.findOneAndUpdate(
        { userId: 'user-stu-1' },
        { $set: updates },
        { new: true, upsert: true }
      );
      return res.json({ success: true, profile: updated });
    }

    return res.json({ success: true, profile: { ...INITIAL_SEED_PROFILE, ...updates } });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});
