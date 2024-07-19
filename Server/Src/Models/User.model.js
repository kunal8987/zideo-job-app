import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Name Is Required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email Is Required"],
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Password Is Required"],
        },
        role: {
            type: String,
            required: true,
            enum: ["admin", "candidate", "recruiter"],
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
