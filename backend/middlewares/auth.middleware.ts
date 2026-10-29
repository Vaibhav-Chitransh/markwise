import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from "../utils/constants";

export const authMiddleware = (req : Request, res : Response, next : NextFunction) => {
    const token = req.headers.token;
    if(!token || typeof token !== "string") return res.status(400).json({message: "You are not logged in"});

    const decoded = jwt.verify(token, JWT_SECRET || "secret123");
    if(typeof decoded === "string" || !("userId" in decoded)) return res.status(400).json({message: "Malformed Token"});
    
    (req as any).userId = (decoded as JwtPayload).userId;
    next();
}