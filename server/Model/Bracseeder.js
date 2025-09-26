import mongoose from "mongoose";
import dotenv from "dotenv";
import BracSeed from "./models/BracSeed.js";

dotenv.config();

const bracSeedProducts = [
  {
    name: "Hybrid Rice Seed",
    image: "/images/Bracseed/Rice-Seed.png",
    price: 200,
    unit: "kg",
  },
  {
    name: "Maize Seed",
    image: "/images/Bracseed/Maize-Seed.png",
    price: 150,
    unit: "kg",
  },
  {
    name: "Vegetable Seed Pack",
    image: "/images/Bracseed/Veg.png",
    price: 100,
    unit: "packet",
  },
  {
    name: "Fertilizer",
    image: "/images/Bracseed/Fertilizer.png",
    price: 180,
    unit: "kg",
  },
];

const seedBracSeedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    await BracSeed.deleteMany();
    console.log("BracSeed collection cleared");

    await BracSeed.insertMany(bracSeedProducts);
    console.log("BracSeed products seeded");

    mongoose.connection.close();
    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
};

seedBracSeedData();
