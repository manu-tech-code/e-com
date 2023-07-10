import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const checkAuth = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const getPayload = req.header('Authorization')
    const payload = getPayload?.replace('Bearer ', '')
    if (!payload) return res.status(401).json({ message: 'Invalid Token' });
    
    try {
        const { _id, email, username, isAdmin } = jwt.decode(payload) as {_id: string, email: String, username: String, isAdmin: string}
        console.log(_id, email, username)
        if (!_id) return res.status(401).json({ success: false, message: 'Unauthorised' });
        // isAdmin ? console.lg('oadmin'): console.log('user')
        isAdmin ? req.query.isAdmin = isAdmin : req.query.id = _id
        next()
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong!" })
    }
}
