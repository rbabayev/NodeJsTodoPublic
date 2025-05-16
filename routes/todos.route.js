import express from "express";
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todos.controller.js";

const router = express.Router();

// GET method
router.get("/", getAllTodos);

// GET by id method
router.get("/todo/:id", getTodoById);

// POST method
router.post("/add", createTodo);

// PUT method
router.put("/edit/:id", updateTodo);

// DELETE method
router.delete("/delete/:id", deleteTodo);

export default router;
