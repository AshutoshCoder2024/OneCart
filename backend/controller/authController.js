import User from "../model/userModel.js"
import validator from "validator"
import bcrypt from "bcrypt"
import { genToken } from "../config/token.js"

export const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the email already exists
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Check if email is valid
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Enter a valid email" });
        }

        // Check if password is strong enough
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({ name, email, password: hashPassword });

        // Generate JWT token
        const token = await genToken(user._id);

        // Send the JWT token in cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // change to true in production with HTTPS
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(201).json(user);
    } catch (error) {
        console.log("registration error:", error);
        return res.status(500).json({
            message: `Registration error: ${error}`
        });
    }
};


export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "Invalid candiatation 0" })
        }
        let isMatch =  await bcrypt.compare(password, User.password);
        if (!isMatch) {
            return res.status(404).json({ message: "invalid candantion" })
        }
        // Generate JWT token
        const token = await genToken(user._id);

        // Send the JWT token in cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // change to true in production with HTTPS
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        return res.status.json({ message: "Login sucessfully " })
    } catch (error) {

    }
}