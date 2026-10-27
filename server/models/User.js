import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, default: 'demo123' },
    role: { type: String, enum: ['student', 'admin'], default: 'student' },
    registerNumber: { type: String },
    department: { type: String },
    yearOfStudy: { type: Number },
    avatarUrl: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
