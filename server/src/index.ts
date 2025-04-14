import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import { pool } from "./db/db";
import session from "express-session";
import { router } from "./routes/router";
import connectPgSimple from "connect-pg-simple";
import { errorHandler } from "./middleware/errorHandler";



dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    exposedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use(session({
    store: new (connectPgSimple(session))({
        pool,
        tableName: 'session',
        pruneSessionInterval: 60
    }),
    secret: process.env.SESSION_SECRET ?? 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', router);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});