import jwt from 'jsonwebtoken'

const adminAuth = (req, res, next) => {

    try {
        let { token } = req.cookies;

        if (!token) {
            res.status(400).json({ message: "Token not found" })
        }

        const verifytoken = jwt.verify(token, process.env.JWT_SECRET)

        if (!verifytoken) {
            res.status(400).json({ message: "Invalid Token" })
        }

        req.adminEmail = process.env.ADMIN_EMAIL
        console.log("Admin authenticated:", req.adminEmail);
        next()

    } catch (error) {
        console.log("admin auth error:", error);
        res.status(500).json({ message: `admin auth error: ${error}` }

        )
    }

}

export default adminAuth;