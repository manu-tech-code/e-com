import { IUser, User } from "../models/user";
import { Request, Response } from "express";

export const profile = async (req: Request, res: Response): Promise<any> => {
    try {
        const user = await User.findById(req.query.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const { firstName, lastName, email, username } = user;

        res.json({
            firstName,
            lastName,
            email,
            username
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const updateProfile = async (req: Request, res: Response): Promise<any> => {
    try {
        const user = await User.findByIdAndUpdate(req.query.id, {
            ...req.body,
            image: req.file?.filename
        });

        if (!user) { return res.status(404).json({ message: "User not found" }) }

        res.json({ message: "Profile updated"});
    } catch (err) {
        res.status(422).json({ mesage: "Update failed" });
    }
}


