import express from 'express';
import { signUp } from '../controller/signUp';
import { logIn } from '../controller/logIn';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { logOut } from '../controller/logOut';
import { dashboard } from '../controller/dashboard';
import { uploadFile } from '../controller/uploadFile';
import { multerMiddleware } from '../middleware/multerMiddleware';
import { createFolder } from '../controller/createFolder';
import { folder } from '../controller/folder';
import { deleteData } from '../controller/deleteData';
import { editName } from '../controller/editName';

export const router = express.Router();

router.post('/signup', signUp);

router.post('/login', logIn);

router.post('/logout', logOut);

router.post('/uploadFile', multerMiddleware(), uploadFile);

router.post('/createFolder', createFolder);

router.post('/folders/:folderId', folder);

router.put('/editName', editName)

router.get('/dashboard', isAuthenticated, dashboard);

router.delete('/deleteData/:id', deleteData);