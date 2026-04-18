# MERN User Management System

A full-stack User Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring secure authentication, JWT authorization, role-based access control, and protected routes.

## 🚀 Live Demo
Frontend: https://user-manager-nu-two.vercel.app 
Backend API: https://usermanager-meik.onrender.com

---

## 📌 Features

### 🔐 Authentication
- User Login with JWT
- Password hashing using bcrypt
- Protected routes
- Token-based session handling

### 👥 Role-Based Access Control
- Admin
- Manager
- User

### 🛠 User Management
- Create Users
- View All Users
- Update Users
- Delete / Deactivate Users

### 🎨 Frontend
- Responsive React UI
- Tailwind CSS styling
- Route protection using React Router
- Context API for authentication state

### ⚙ Backend
- REST API with Express.js
- MongoDB Atlas integration
- Mongoose models
- Middleware for auth & roles

---

## 🧱 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- dotenv
- cors

---

## 📂 Project Structure

```bash
mern-user-management/
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│
│── backend/
│   ├── models/
│   ├── routes/
│   ├── db.js
│   ├──jwt.js
│   └── server.js