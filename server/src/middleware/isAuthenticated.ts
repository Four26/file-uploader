import expressAsyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";

export const isAuthenticated = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ message: 'Please log in first!' });
        res.redirect('/login');
        return;
    }
    next();
});