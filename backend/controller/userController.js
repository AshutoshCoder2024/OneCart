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



export const getAdmin = async (req, res) => {
    try {
        // Check if user is authenticated through middleware
        // if (!req.user || req.user.role !== 'admin') {
        //     return res.status(401).json({ message: "Unauthorized: Admin access required" });
        // }

        const adminEmail = req.adminEmail; 
        if (!adminEmail) {
            return res.status(400).json({ message: "Admin email not found" });
        }

        return res.status(200).json({
            eamil:adminEmail,
            role: "admin"
        });
    } catch (error) {
        console.log("Get admin error:", error);
        return res.status(500).json({
            message: "Error getting admin details",
            error: error.message
        });
    }
};

// export default getAdmin;

