// in this file we generate jwty token 

import jwt from "jsonwebtoken"  

// token for user 
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


// token for Admin 
export const genToken1 = async (email) => {
    try {
        let token = await jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return token;
    }
    catch (error) {
        console.error("Token Error:", error.message);
        throw error;
    }
}