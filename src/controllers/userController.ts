// import { IUser, User } from "../models/user";
// import { Request, Response } from "express";

// export const profile = async (req: Request, res: Response): Promise<any> => {
//     const user = await User.findById(req.query.id);

//     const { firstName, lastName, email } = user;

//     res.json({
//         firstName,
//         lastName,
//         email,
//     });
// }

// export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const users: IUser[]  = await User.find().populate('recipes');
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// }
