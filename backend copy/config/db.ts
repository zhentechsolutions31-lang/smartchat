import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI;
    try {
        if (!MONGO_URI) {
            throw new Error("Please provide MONGO_URI");
        }
        await mongoose.connect(MONGO_URI)
        console.log("Database connected")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDB