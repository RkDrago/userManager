import cors from "cors";
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import db from './db.js';
import dns from "node:dns/promises"
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

const app = express();

db()

app.use(cors({
  origin: "https://user-manager-nu-two.vercel.app",
  credentials: true
}));

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

//use the routes
app.use('/api/', userRoutes)
app.use('/api/users', adminRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});