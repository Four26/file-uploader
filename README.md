## 📁 File Uploader App

A stripped-down version of Google Drive built with React and Express. This app allows users to authenticate, create folders, upload files, and manage their personal storage. The app is designed to be a simple file management system with a focus on user experience and ease of  use.

## 🚀 Features
- User authentication with session management using Passport.js.
- Folder and File CRUD with nested folder support.
- File uploads via Multer and local storage.
- View file details (name, size, upload time) and download.

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
