import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v7 as uuidv7 } from "uuid";
import User from "../model/user.js";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly find the .env in the root task2 folder
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const connectDB = async () => {
  const uri = process.env.MONGO_URL;
  if (!uri) {
    throw new Error("MONGO_URL is not defined in .env file");
  }
  try {
    await mongoose.connect(uri);
    console.log("Database connected ✅");
  } catch (err) {
    console.error("Connection error:", err);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Relative to this script's location
    const filePath = path.join(__dirname, "seed_profiles.json"); 
    const rawData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    
    // Ensure we are looping over the array
    const profiles = Array.isArray(rawData) ? rawData : rawData.profiles;

    let inserted = 0;
    let skipped = 0;

    for (const profile of profiles) {
      const existing = await User.findOne({ name: profile.name });

      if (existing) {
        skipped++;
        continue;
      }

      await User.create({
        id: uuidv7(),
        ...profile // This spreads all fields from the JSON object
      });

      inserted++;
    }

    console.log(`Inserted: ${inserted} | Skipped: ${skipped}`);
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    mongoose.connection.close();
  }
};

await connectDB();
await seedData();