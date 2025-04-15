## 📁 File Uploader App

A stripped-down version of Google Drive built with React and Express. This app allows users to authenticate, create folders, upload files, and manage their personal storage. Extra features include sharing folders with temporary access links.

## 🚀 Features
- User authentication with session management using Passport.js.
- Folder and File CRUD with nested folder support.
- File uploads via Multer and local storage.
- View file details (name, size, upload time) and download.
- Folder sharing via temporary public links (1 day duration).

## 🛠️ Tech Stack
Client
- Vite React Typescript
- Tailwind
Server
- Express.js
- Passport.js with session based auth
- Prisma ORM and PostgreSQL
- Multer for file uploads
- Zod for input validation

## 🔨 Setup Instructions
```bash
git clone https://github.com/Four26/file-uploader.git
cd file-uploader
```
- Set up the server
```bash
cd server
npm install
npm start
```
- Set up the client
```bash
cd client
npm install
npm run dev
```
