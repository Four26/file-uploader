import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import z from "zod"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const signUp = expressAsyncHandler(async (req: Request, res: Response) => {

    const validateSignUp = z.object({
        firstname: z.string().min(2, 'Firstname must be at least 2 characters long!'),
        lastname: z.string().min(2, 'Lastname must be at least 2 characters long!'),
        username: z.string().min(3, 'Username must be at least 3 characters long!'),
        password: z.string().min(6, 'Password must be at least 6 characters long!'),
        confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match!',
        path: ['confirmPassword']
    });

    try {
        const { username, firstname, lastname, password } = validateSignUp.parse(req.body);

        const hashPassword = await bcryptjs.hash(password, 10);

        const checkDuplicate = await prisma.users.findUnique({
            where: {
                username: username
            }
        });

        if (checkDuplicate) {
            res.status(409).json({ message: 'Username already exist!' });
            return;
        } else {
            const createUser = await prisma.users.create({
                data: {
                    username: username,
                    firstname: firstname,
                    lastname: lastname,
                    password: hashPassword,
                    created_at: new Date()
                }
            });

            res.status(200).json({ message: 'Successfully signed up!', createUser });
            return;
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.errors });
            return;
        } else {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
    }

});
