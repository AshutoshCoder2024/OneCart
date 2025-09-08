import User from "../model/userModel.js"

export const getCurrentUser = async (req, res) => {
    try {
        console.log('Request user object:', req.user);
        
        if (!req.user || !req.user.userId) {
            console.log('No user in request or missing userId');
            return res.status(401).json({ message: "Not authenticated" });
        }

        const user = await User.findById(req.user.userId).select("-password");
        console.log('Found user:', user);
        
        if (!user) {
            console.log('No user found with ID:', req.user.userId);
            return res.status(404).json({ message: "User not found" });
        }
        
        console.log('Sending user data');
        return res.status(200).json(user);
    } catch (error) {
        console.error("Get user error:", error);
        return res.status(500).json({
            message: "Error getting user details",
            error: error.message
        });
    }
}
export default getCurrentUser;