import { User } from "../models/User";

import jwt from "jsonwebtoken";
import { generateToken } from "../utils/token";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { name, email, password, avatar } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ msg: "User already exists" });
      return;
    }

    // create new suer

    user = new User({
      name,
      email,
      password,
      avatar:
        avatar ||
        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // generate token
    const token = generateToken(user);

    res
      .status(201)
      .json({ success: true, token, msg: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { name, email, password, avatar } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ msg: "invalid credentials" });
      return;
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ msg: "invalid credentials" });
      return;
    }






    // generate token
    const token = generateToken(user);
    res.json({ success: true, token, msg: "User logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, avatar } = req.body;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ success: false, msg: "No token, authorization denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const userId = decoded.user.id;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, msg: "User not found" });
      return;
    }

    if (name) {
      // Check if username is already taken by another user
      const existingUser = await User.findOne({ name });
      if (existingUser && existingUser._id.toString() !== userId) {
        res.status(400).json({ success: false, msg: "Username is already taken" });
        return;
      }
      user.name = name;
    }

    if (avatar !== undefined) {
      user.avatar = avatar || "";
    }

    await user.save();

    // generate a new token with the updated user data
    const newToken = generateToken(user);

    res.json({
      success: true,
      token: newToken,
      msg: "Profile updated successfully"
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};