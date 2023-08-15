import {Request, Response, NextFunction} from "express";
import {decodedTokenType} from "../types/auth";
import jwt from "jsonwebtoken";

export const checkUserAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET as string) as decodedTokenType;
        if (!decodedToken) return res.status(401).json({ message: "Unauthorized" });
        req.body.id = decodedToken.id;
        next();
    } catch (error: any) {
        return res.status(401).json({ message: error.message });
    }
}