import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: any;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        res.status(401).json({ error: 'Access Ditolak, Ga ada token'});
        return; 
    }

    try {
        const secret = process.env.JWT_SECRET || 'karisma123rahasia';
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next(); 
    } catch (err) {
        res.status(401).json({ error: 'Token expired'});
        return;
    }
};

export const checkRole = (role: string) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (req.user && req.user.role === role) {
            next();
        } else {
            res.status(403).json({ error: 'Access Ditolak, Role Tidak Sesuai'});
            return;
        }
    };
};