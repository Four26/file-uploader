import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";

export const logOut = expressAsyncHandler(async (req: Request, res: Response) => {
    req.logout(() => {
        req.session.destroy((error) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(200).json({ message: 'Successfully logged out!' });
        })
    })
});