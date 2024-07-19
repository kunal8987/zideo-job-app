import express from "express";
import { createCandidate, createEducation, createExperience, updateCandidate } from "./../Controller/Candidate.controller.js";
import { authMiddleware, updateMiddleware } from "./../Middleware/Auth.middleware.js";

export const candidateRouter = express.Router();

candidateRouter.post("/create-candidate", authMiddleware, createCandidate);
candidateRouter.patch("/update-candidate/:id", updateMiddleware, updateCandidate);
candidateRouter.patch("/create-education", updateMiddleware, createEducation);
candidateRouter.patch("/create-experience", updateMiddleware, createExperience);
