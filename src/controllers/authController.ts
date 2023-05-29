import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user";
require("dotenv/config");

export const register = async (req: Request, res: Response): Promise<any> => {
  const { password, confirm_password, email } = req.body
  // hash password
  if (password !== confirm_password)
    return res.status(400).json({ message: "Passwords not match" });
  const salt = await bcrypt.genSalt(12)
  const hashedPassword = await bcrypt.hash(password, salt); 

  const userExist = await User.findOne({ email: email });

  if (userExist) return res.status(422).json({ message: "Email has been taken" });
  console.log(req.body)

  try {
    const user = await User.create({ 
      ...req.body,
      password: hashedPassword,
      confirm_password: hashedPassword
    });

    const { email, username, _id } = user;

    res.json({
      id: _id,
      email: email,
      username: username,
    });
  } catch (err) {
    res.status(400).json({ message: `Something went wrong ${err}` });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { emailOrUsername, password} = req.body
  // email validation
  const user = await User.findOne({ $or: [{ email: emailOrUsername }, {username: emailOrUsername}]  });
  if (!user) return res.status(400).json({ message: "Invalid Credentials" });

  // password validation
  const unHash: string = String(bcrypt.compare(password, String(user.password)))
  if (!unHash) return res.status(400).json({ message: "Invalid Credentials" });

  // return user
  try {
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!
    );
    // res.setHeader("accessToken", token);

    res.json({
      message: "Logged in Successful",
      "accessToken": token,
    });
  } catch (err) {
    res.json({ message: "Not Found" });
  }
};

export const logout = async (req: Request, res: Response): Promise<any> => {
  try {
    res.removeHeader("Authorization");
    res.json({ message: "Logged Out" });
  } catch (err) {
    return res.status(400).json({ message: "Token is invalid" });
  }
};
