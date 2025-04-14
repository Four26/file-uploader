import express from 'express';
import { signUp } from '../controller/signUp';
import { logIn } from '../controller/logIn';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { logOut } from '../controller/logOut';
import { dashboard } from '../controller/dashboard';
import { uploadFile } from '../controller/uploadFile';
import { multerMiddleware } from '../middleware/multerMiddleware';

export const router = express.Router();

router.post('/signup', signUp);

router.post('/login', logIn);

router.post('/logout', logOut);

router.post('/uploadFile', multerMiddleware(), uploadFile);

router.get('/dashboard', isAuthenticated, dashboard);