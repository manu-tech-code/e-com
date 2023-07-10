import { Request, Response } from "express";
import { IUser, User } from "../models/user";
require("dotenv/config");

export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
    if (req.query.isAdmin) {
        try {
            const users: IUser[] = await User.find({ isAdmin: { $ne: true } }, { password: false });
            if(!users) return res.status(204).json({message: "No data found"})
            res.json(users);
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal server error!" });
        }
    }

    res.status(401).json({ success: false, message: "Unauthorised" })
}