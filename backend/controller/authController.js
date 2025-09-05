import User from "../model/userModel.js"
import validator from "validator"
import bcrypt from "bcrypt"
import { genToken } from "../config/token.js"


// Register
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


// login
export const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }

        // taking actual data form  databse by help of enter email
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "Invalid credentials" })
        }


        // compare passwaord 
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }


        // Generate JWT token
        let token = await genToken(user._id);

        // Send the JWT token in cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // change to true in production with HTTPS
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });


        
        return res.status(201).json({ message: "Login sucessfully " })
    } catch (error) {
        console.log("Login error:", error);
        return res.status(500).json({ message: `login error ${error}` });

    }
}


//Logout 
export const logout=async (req,res)=>{
    try {
        res.clearCookie("token");
         return res.status(200).json({ message: "Logout sucessfully " })
    } catch (error) {
        console.log("logout error:", error);
         return res.status(500).json({ message: `login error ${error}` });
    }
}

