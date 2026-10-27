import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/naan_mudhalvan';

  try {
    console.log(`📡 Attempting to connect to MongoDB at: ${mongoURI.replace(/:([^@]+)@/, ':****@')}`);
    
    // Connect with 5-second timeout so server starts promptly
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;
    console.log('✅ MongoDB Connected successfully!');
    return true;
  } catch (error) {
    isConnected = false;
    console.warn(`⚠️ MongoDB Connection Notice: Could not connect to MongoDB (${error.message}).`);
    console.warn('💡 Tip: You can paste your MongoDB Atlas connection string in your .env file: MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/naan_mudhalvan');
    console.log('⚡ Server running with resilient fallback store so your demo and API endpoints continue working smoothly!');
    return false;
  }
};

export const getDBStatus = () => ({
  isConnected: mongoose.connection.readyState === 1 || isConnected,
  host: mongoose.connection.host || 'local/in-memory fallback',
  name: mongoose.connection.name || 'naan_mudhalvan',
  readyState: mongoose.connection.readyState,
});
