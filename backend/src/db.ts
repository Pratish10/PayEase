import mongoose from "mongoose";
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI ?? "");
    console.log("MongoDB --  database connection established successfully!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(`MongoDB connection error.: ${error.message as string}`);
    process.exit();
  }
};
