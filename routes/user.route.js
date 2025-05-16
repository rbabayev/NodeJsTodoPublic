import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "User data" });
});

router.get("/user/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `GET request to fetch User data by: ${id}` });
});

router.get("/me", protectRoute, (req, res) => {
  const user = req.user;

  res.status(200).json({ message: "My data", data: user });
});

router.post("/add", (req, res) => {
  const data = req.body;
  res.json({ message: "POST request received", data });
});

router.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  res.json({ message: `PUT request to update users ${id}`, data });
});

router.patch("/patch/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  res.json({ message: `PATCH request to partially update users ${id}`, data });
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `DELETE request to remove users ${id}` });
});

export default router;
