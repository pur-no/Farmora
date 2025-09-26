import mongoose from "mongoose";
import dotenv from "dotenv";
import SadeeqAgro from "./models/sadeeqAgroModel.js";

dotenv.config();

const products = [
  {
    name: "Organic Ghee",
    image: "/images/SadeeqAgro/ghi.jpg",
    price: 200,
    unit: "Bottle",
  },
  {
    name: "Pesta Badam Sharbat",
    image: "/images/SadeeqAgro/Pesta.jpg",
    price: 90,
    unit: "Litter",
  },
  {
    name: "Bull",
    image: "/images/SadeeqAgro/bull.jpg",
    price: 80000,
    unit: "kg",
  },
  {
    name: "Ronaldo",
    image: "/images/SadeeqAgro/goat.jpg",
    price: 10000,
    unit: "kg",
  },
];

const seedSadeeqAgroData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    await SadeeqAgro.deleteMany();
    console.log("SadeeqAgro collection cleared");

    await SadeeqAgro.insertMany(products);
    console.log("SadeeqAgro products seeded");

    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedSadeeqAgroData();
