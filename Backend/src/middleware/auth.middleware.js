import jwt from "jsonwebtoken";
import { config } from "../config/config.js";


export const authMiddleware = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized user"
        });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error(error)
    return res.status(401).json({ 
        message: "Authentication failed" 
    });
  }
};
