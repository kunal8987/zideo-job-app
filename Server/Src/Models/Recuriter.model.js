import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First Name Is Required"],
            lowercase: true,
        },
        lastName: {
            type: String,
            required: [true, "Last Name Is Required"],
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, "Email Is Required"],
            unique: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: [true, "Phone Number Is Required"],
            trim: true,
        },
        company: {
            type: String,
            required: [true, "Company Name Is Required"],
            trim: true,
        },
        authId: {
            type: String,
            required: true,
        },
        jobsPosted: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Job",
            },
        ],
    },
    { timestamps: true }
);

const Recruiter = mongoose.model("Recruiter", recruiterSchema);

export default Recruiter;
