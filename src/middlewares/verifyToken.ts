import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const checkAuth = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const getPayload = req.header('accessToken')
    if (!getPayload) return res.status(401).json({ message: 'Unauthorised' });

    try {
        const { id } = jwt.decode(getPayload) as { id: string }
        if (!id) return res.status(401).json({ message: 'Unauthorised' });

        req.query.id = id
        next()
    } catch (error) {
        res.status(401).json({ message: "Unauthorised" })
    } // pass control to the next middleware or route handler
}
