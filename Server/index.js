import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Src/Utils/Database.js";
import { userRouter } from "./Src/Routes/User.routes.js";
import { candidateRouter } from "./Src/Routes/Candidate.routes.js";

// ENV CONFIGURATION

dotenv.config();

// CREATE APP USING EXPRESS

let app = express();

// INBUILT EXPRESS MIDDLEWARE

app.use(express.json());

// CORS MIDDLEWARE

app.use(cors());


// ROUTES 

app.use('/api/v1/auth',userRouter)
app.use('/api/v1/candidate',candidateRouter)


// APP LISTING FUNCTION

let port = process.env.PORT || 4500;
app.listen(port, async (req, res) => {
    try {
        await connectDB();
        console.log("Server Is Listing On Port", port);
    } catch (error) {
        console.error("An Error Occurred While Starting The Server");
        console.log(error.message);
    }
});
