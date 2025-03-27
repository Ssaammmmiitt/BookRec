import jwt from "jsonwebtoken";
import User from "../models/User.js";
import "dotenv/config";

const protectRoute = async (req, res, next) => {
  try {
    //get token
    // const token = req.header("Authorization").replace("Bearer ", "");
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.u_Id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    //find user
    const user = await User.findById(decoded.u_Id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in auth middleware", error);
    return res.status(401).json({ message: error.message });
  }
};

export default protectRoute;
