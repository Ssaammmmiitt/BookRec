import jwt from "jsonwebtoken";
import User from "../models/User.js";
import "dotenv/config";

const protectRoute = async (req,res,next)=> {
    try {
        //get token
        const token = req.header("Authorization").replace("Bearer ", "");
        if(!token) return res.status(401).json({message:"Unauthorized"});

        //verify token
        const decoded= jwt.verify(token,process.env.JWT_SECRET);

        //find user
        const user = await User.findById(decoded.userId).select("-password");
        if(!user) return res.status(404).json({message:"User not found"});

        req.user=user;
        next();
    }
    catch(error){
        console.log("Error in auth middleware",error);
        return res.status(401).json({message:error.message});
    }
}

export default protectRoute;