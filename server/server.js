// server/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Import routes
import helloRoutes from './routes/helloRoutes.js';
import productRoutes from './routes/productRoutes.js'; // Import product routes

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Use Routes
app.use('/api/hello', helloRoutes);
app.use('/api/products', productRoutes); // Use product routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});