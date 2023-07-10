import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IUser, User } from "../models/user";
require("dotenv/config");

export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
    if (req.query.isAdmin) {
        try {
            const users: IUser[] = await User.find({}, {password: false});
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Something went wrong!" });
        }    
    }

    res.status(401).json({ success: false, message: "Unauthorised"})
}