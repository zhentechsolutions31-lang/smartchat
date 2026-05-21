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