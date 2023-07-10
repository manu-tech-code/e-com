import { IUser, User } from "../models/user";
import { Request, Response } from "express";

export const profile = async (req: Request, res: Response): Promise<any> => {
    const id = req.query._id || req.query.id
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({
            firstname: user.firstName,
            lastname: user.lastName,
            email: user.email,
            username: user.username
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

export const updateProfile = async (req: Request, res: Response): Promise<any> => {
    try {
        const user = await User.findByIdAndUpdate(req.query.id, {
            ...req.body,
            image: req.file?.filename
        });

        if (!user) { return res.status(404).json({ success: false, message: "User not found" }) }

        res.json({ success: true, message: 'Profile updated successfully' });
    } catch (err) {
        res.status(500).json({ mesage: "Internal server error!" });
    }
}


