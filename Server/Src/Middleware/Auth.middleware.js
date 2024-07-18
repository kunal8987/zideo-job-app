import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Candidate from "../Models/Candidate.model.js";
import Recruiter from "../Models/Recuriter.model.js";

dotenv.config();

// AUTH MIDDLEWARE FUNCTION

export const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
        return res
            .status(401)
            .json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        req.body.authId = decoded.authId
        next();
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }
};
export const updateMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");

        // VALIDATE THE TOKEN
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        //DECODE THE TOKEN
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // CHECK IF THE USER IS A CANDIDATE OR RECRUITER
        const candidate = await Candidate.findOne({ authId: req.user.authId });
        const recruiter = await Recruiter.findOne({ authId: req.user.authId });

        // CONDITIONAL VALIDATION
        if (candidate) {
            req.user.role = "candidate";
            // req.user.data = candidate;
        } else if (recruiter) {
            req.user.role = "recruiter";
            // req.user.data = recruiter;
        } else {
            return res.status(404).json({ message: "User not found" });
        }

        next();
    } catch (error) {
        console.error("Error in auth middleware", error);
        res.status(401).json({ message: "Invalid token" });
    }
};

// ADMIN MIDDLEWARE FUNCTION

export const adminMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");

        // VALIDATE THE TOKEN
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        // DECODE THE TOKEN
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // CHECK IF THE USER IS AN ADMIN
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        next();
    } catch (error) {
        console.error("Error in admin middleware", error);
        res.status(401).json({ message: "Invalid token" });
    }
};
