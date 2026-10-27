import express from 'express';
import { User } from '../models/User.js';
import { INITIAL_SEED_USERS } from '../seed/seedData.js';
import { getDBStatus } from '../config/db.js';

export const authRouter = express.Router();

// POST /api/auth/login
authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const { isConnected } = getDBStatus();

    let user;
    if (isConnected) {
      user = await User.findOne({ email: email.toLowerCase() });
    } else {
      user = INITIAL_SEED_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    }

    if (!user || user.password !== password) {
      // Demo password check
      return res.status(401).json({ success: false, message: 'Invalid credentials. For demo use password: demo123' });
    }

    const token = `nm_jwt_token_${Date.now()}`;
    const safeUser = {
      id: user._id ? user._id.toString() : user.email === 'preethi@college.edu' ? 'user-stu-1' : 'user-adm-1',
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      registerNumber: user.registerNumber,
      avatarUrl: user.avatarUrl,
    };

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error('Auth login error:', err);
    return res.status(500).json({ success: false, message: 'Server error during login', error: err.message });
  }
});

// GET /api/auth/me
authRouter.get('/me', (req, res) => {
  res.json({
    success: true,
    user: {
      id: 'user-stu-1',
      name: 'Preethi S.',
      email: 'preethi@college.edu',
      role: 'student',
      registerNumber: '710022104042',
      department: 'Computer Science and Engineering',
    },
  });
});
