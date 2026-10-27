import express from 'express';
import { LearningMaterial } from '../models/LearningMaterial.js';
import { INITIAL_SEED_MATERIALS } from '../seed/seedData.js';
import { getDBStatus } from '../config/db.js';

export const materialRouter = express.Router();

// GET /api/materials
materialRouter.get('/', async (req, res) => {
  try {
    const { isConnected } = getDBStatus();
    let materials;

    if (isConnected) {
      materials = await LearningMaterial.find().lean();
    }

    if (!materials || materials.length === 0) {
      materials = INITIAL_SEED_MATERIALS.map((m, idx) => ({ ...m, id: `mat-${idx + 1}` }));
    }

    return res.json({ success: true, materials });
  } catch (err) {
    return res.status(500).json({ success: false, materials: INITIAL_SEED_MATERIALS });
  }
});

// POST /api/materials/toggle
materialRouter.post('/toggle', async (req, res) => {
  try {
    const { materialId, userId = 'user-stu-1' } = req.body;
    const { isConnected } = getDBStatus();

    if (isConnected) {
      const mat = await LearningMaterial.findById(materialId);
      if (mat) {
        const index = mat.completedByStudentIds.indexOf(userId);
        if (index > -1) {
          mat.completedByStudentIds.splice(index, 1);
        } else {
          mat.completedByStudentIds.push(userId);
        }
        await mat.save();
        return res.json({ success: true, material: mat });
      }
    }

    return res.json({ success: true, message: 'Toggled completion successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});
