import User from "../Models/User.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

// REGISTER USER FUNCTION
export const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // VALIDATE REQUEST BODY
        if (!username || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // CHECK IF USER ALREADY EXISTS
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(parseInt(process.env.JOB_SALT_ROUND));
        const hashedPassword = await bcrypt.hash(password, salt);

        // CREATE NEW USER
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
        });

        // SAVE USER TO DATABASE
        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: newUser,
        });
    } catch (error) {
        console.error("Error registering user controller", error);
        res.status(500).json({ message: "Server error" });
    }
};

// LOGIN USER FUNCTION
export const loginUser = async (req, res) => {
    try {
        //GETTING THE DATA FROM REQUEST BODY
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(404)
                .send({
                    success: false,
                    message: "email & password are required",
                });
        }

        //FINDING THE EXISTING USER
        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(404)
                .send({ success: false, message: "User Not Found" });
        }

        //COMPARING THE PASSWORD
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }
        // GENERATE A JWT TOKEN (CUSTOMIZE THIS PART)
        const token = jwt.sign(
            { authId: user._id, role: user.role },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).send({
            success: true,
            message: "Login Successful",
            token,
        });
    } catch (error) {
        console.error("Error logging in user controller", error);
        res.status(500).json({ message: "Server error" });
    }
};
