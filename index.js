import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/users.route.js";
import todoRoutes from "./routes/todos.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
  connectDB();
});

// User Endpoints
// http://localhost:3000/api/users - GET all users
// http://localhost:3000/api/users/user/:id - GET user by id
// http://localhost:3000/api/users/add - POST add user
// http://localhost:3000/api/users/edit/:id - PUT edit user by id
// http://localhost:3000/api/users/patch/:id - PATCH edit user by id
// http://localhost:3000/api/users/delete/:id - DELETE user by id
