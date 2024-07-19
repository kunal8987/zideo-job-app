import mongoose from "mongoose";

// EXPERIENCE SCHEMA FOR CANDIDATE

const experienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        type: String,
        required: true,
        trim: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
    },
});

// EDUCATION SCHEMA FOR CANDIDATE

const educationSchema = new mongoose.Schema({
    institution: {
        type: String,
        required: true,
        trim: true,
    },
    degree: {
        type: String,
        required: true,
        trim: true,
    },
    fieldOfStudy: {
        type: String,
        required: true,
        trim: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
    },
});

// CANDIDATE SCHEMA

const candidateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        state: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        about: {
            type: String,
            required: true,
        },
        experience: {
            type: [experienceSchema],
        },
        education: {
            type: [educationSchema],
        },
        skills: {
            type: [String],
            required: true,
        },
        resume: {
            type: String,
            // required: true,
        },
        authId: {
            type: String,
            required: true,
        },
        appliedJobs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Job",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;
