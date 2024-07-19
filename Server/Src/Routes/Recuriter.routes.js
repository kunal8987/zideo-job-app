import express from "express";
import {
    createRecruiter,
    updateRecruiter,
} from "../Controller/Recuriter.controller.js";
import {
    authMiddleware,
    updateMiddleware,
} from "../Middleware/Auth.middleware.js";

export const recuriterRouter = express.Router();

recuriterRouter.post("/create", authMiddleware, createRecruiter);

recuriterRouter.patch(
    "/update-recuriter/:id",
    authMiddleware,
    updateMiddleware,
    updateRecruiter
);
