import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, surname, email, password } = req.body;

  const user = new User({
    name,
    surname,
    email,
    password,
    role: "user",
  });

  try {
    const savedUser = await user.save();

    const userResponse = savedUser.toObject();
    delete userResponse.password;
    res.status(201).json(userResponse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const updateUser = async (req, res) => {
  try {
    const restrictedUpdates = ["password", "role"];
    const attemptedUpdates = Object.keys(req.body);

    const isRestrictedUpdate = attemptedUpdates.some((field) =>
      restrictedUpdates.includes(field)
    );

    if (isRestrictedUpdate) {
      return res.status(403).json({
        message: "Password and role cannot be updated via this endpoint",
      });
    }

    const allowedUpdates = ["name", "surname", "email"];
    const updates = {};

    attemptedUpdates.forEach((field) => {
      if (allowedUpdates.includes(field)) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message.includes("validation")
        ? "Invalid update data"
        : error.message,
    });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(req);
    res.status(500).json({ message: error.message });
  }
};
