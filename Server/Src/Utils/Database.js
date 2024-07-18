import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// DATABASE CONNECTION FUNCTION

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.JOB_MONGODB_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB In Utils");
        console.log(error.message);
    }
};

export default connectDB;
