import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: [50, "Title cannot exceed 50 characters"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    minLength: [10, "Description must be at least 10 characters"],
    maxlength: [200, "Description cannot exceed 200 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export const Todo = mongoose.model("Todo", todoSchema);
