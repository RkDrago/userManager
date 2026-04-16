import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import db from './db.js';

dotenv.config();

const app = express();

db()

app.use(express.json());

//use the routes
app.use('/api/', userRoutes)
app.use('/api/users', adminRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});