// server/utils/seeder.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/productModel.js';
import connectDB from '../config/db.js';

// Load env vars
dotenv.config({ path: './server/.env' });

// Connect to DB
connectDB();

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read JSON files
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/products.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Product.deleteMany();

    await Product.insertMany(products);

    console.log('✅ Data Imported...');
    process.exit();
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
    process.exit(1);
  }
};

// Delete data
const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log('✅ Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}