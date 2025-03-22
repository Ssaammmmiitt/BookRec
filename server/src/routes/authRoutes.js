import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const generateToken = (u_Id) => {
    return jwt.sign({u_Id},process.env.JWT_SECRET,{expiresIn:"30d"});
}

router.post("/login", async (req, res) => {
  res.send("login route");
});

router.post("/register", async (req, res) => {
  try {
    const { email, username, password, gender } = req.body;
    if (!username || !email || !password || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }
    if (username.length < 3) {
      return res
        .status(400)
        .json({ message: "Username must be at least 3 characters" });
    }

    //checking for existing error
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "Email already linked to an account!" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken!" });
    }

      const profilePic = (gender="Male") ? `https://avatar.iran.liara.run/public/boy?username=${username}`:`https://avatar.iran.liara.run/public/girl?username=${username}`;
    

    const user = new User({
      username,
      email,
      password,
      gender,
      profilePic
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({ token, user:{
        _id:user._id,
        username:user.username,
        email:user.email,
        profilePic:user.profilePic,
    }})

} catch (error) {
    console.log("Error in register route !!!", error);
    res.status(500).json({message:"Internal Server Error"});
}
});

export default router;
