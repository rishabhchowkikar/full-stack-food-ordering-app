import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    const connectionString = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `Mongo Database connected Successfully with: ${connectionString.connection.host}`
    );
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`);
  }
};
