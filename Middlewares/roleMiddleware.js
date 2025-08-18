import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * Role-based middleware
 * @param {Array} allowedRoles - roles that can access the route
 */
export const roleMiddleware = (allowedRoles) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Find user in DB
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check role
      if (allowedRoles.includes(user.role)) {
        next();
      } else {
        return res.status(403).json({ message: "Access denied: insufficient role" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Invalid token", error: error.message });
    }
  };
};
