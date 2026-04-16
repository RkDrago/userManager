import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoURL = process.env.MONGO_DB_LOCAL_URL

const db = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log('✅ Connected to the database');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1); // stop app if DB fails
  }
};

export default db;