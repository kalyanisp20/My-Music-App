import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import musicRoute from './routes/musicRoute.js'; // Make sure the path matches your file

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());


connectDB();

// API Routes
app.use('/api/music', musicRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
