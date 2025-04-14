import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import { PrismaClient, users } from "@prisma/client";

const prisma = new PrismaClient();

passport.use(new LocalStrategy(async (username: string, password: string, done: any) => {
    try {
        const response = await prisma.users.findUnique({
            where: {
                username: username
            }
        });

        if (!response) {
            return done(null, false, { message: 'User not found! Please sign up first!' });
        }

        const passwordMatch = await bcryptjs.compare(password, response?.password);

        if (!passwordMatch) {
            return done(null, false, { message: 'Incorrect password!' });
        }

        return done(null, response);

    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user: any, done: any) => {
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser(async (id: number, done: any) => {
    try {
        const response = await prisma.users.findUnique({
            where: {
                id: id
            }
        });
        return done(null, response);
    } catch (error) {
        return done(error)
    }
})

export const logIn = expressAsyncHandler(async (req: Request, res: Response) => {
    passport.authenticate('local', async (err: Error, user: users, info: any) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!user) {
            return res.status(401).json({ message: info.message || 'Unauthorized' });
        }

        req.logIn(user, (error) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            console.log('Session after login:', req.session);

            return res.status(200).json({ message: 'Successfully logged in!', user: JSON.parse(JSON.stringify(user)), sessionID: req.sessionID });
        })

    })(req, res);
});
