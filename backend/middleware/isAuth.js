// in this function file we verify the token 
import jwt from "jsonwebtoken"




const isAuth = async (req, res, next) => {
    try {
        console.log("isAuth middleware called");
        console.log("Cookies received:", req.cookies);
        
        const { token } = req.cookies;

        if (!token) {
            console.log("No token found in cookies");
            return res.status(401).json({ message: "Authentication required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token decoded:", decoded);

        if (!decoded || !decoded.userId) {
            console.log("Invalid token payload");
            return res.status(401).json({ message: "Invalid authentication token" });
        }

        // Set the user object in the request
        req.user = { userId: decoded.userId };
        console.log("User set in request:", req.user);
        
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        }
        return res.status(500).json({ message: "Authentication error" });
    }
}

export default isAuth