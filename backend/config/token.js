// in this file we generate jwty token 

import jwt from "jsonwebtoken"  


export const genToken = async (userId) => {
    try {
        let token = await jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return token;
    }
    catch (error) {
        console.error("Token Error:", error.message);
        throw error;
    }
}