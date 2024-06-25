import JWT from "jsonwebtoken";
import User from "../models/userModel.js";

//protect Routes token base 
export const requiresSignIn = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const token = req.headers.authorization;

        if (!token) {
            // If token is missing, return 401 Unauthorized
            return res.status(401).json({ success: false, message: 'Authorization header missing' });
        }


        // Verify the token
        const decoded = JWT.verify(token, process.env.JWT_SECRET_TOKEN);

        // Attach the decoded token or user information to the request object
        req.user = decoded;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        console.log(error);
    }
}

//admin check middleware 
export const isAdmin = async (req, res, next) => {
    try {
        // Ensure that req.user is populated by the requiresSignIn middleware
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }

        // Fetch user from database (optional but recommended to ensure role is accurate)
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the user has an admin role
        if (user.role !== "admin") {
            return res.status(403).json({ success: false, message: 'Unauthorized access' });
        }

        // Call the next middleware or route handler
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Server error', error });
    }
};
