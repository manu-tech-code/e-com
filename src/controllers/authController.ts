import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user";
import { string } from "joi";
require("dotenv/config");

export const register = async (req: Request, res: Response): Promise<any> => {
  const { password, email, isAdmin } = req.body
  // hash password
  
  const salt: string = await bcrypt.genSalt(12)
  const hashedPassword: String = await bcrypt.hash(password, salt); 

  const userExist = await User.findOne({ email: email });

  if (userExist) return res.status(422).json({ success: false, message: "Email has been taken" });

  try {
    await User.create({ 
      ...req.body,
      password: hashedPassword,
      isAdmin: false || isAdmin
    });

    res.json({message: "Register Success"});
  } catch (err) {
    res.status(400).json({ success: false, message: `Something went wrong ${err}` });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { emailOrUsername, password } = req.body
  
  // email validation
  const user = await User.findOne({ $or: [{ email: emailOrUsername }, {username: emailOrUsername}]  });
  if (!user) return res.status(400).json({ success: false, message: "Invalid Credentials" });

  // password validation
  const unHash = await bcrypt.compare(password, String(user.password))
  if (!unHash) return res.status(400).json({ success: false, message: "Invalid Credentials" });

  // return user
  try {
    const { _id, email, username, isAdmin } = user
    const token = jwt.sign(
      { _id, email, username, isAdmin, exp: 3600 * 2 },
      process.env.JWT_SECRET!
    );

    res.json({
      success: true,
      message: "Logged in Successful",
      token: token,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export const logout = async (req: Request, res: Response): Promise<any> => {
  try {
    res.removeHeader("Authorization");
    res.json({ success: true, message: "Logged Out" });
  } catch (err) {
    return res.status(400).json({ success: false, message: "Token is invalid" });
  }
};
