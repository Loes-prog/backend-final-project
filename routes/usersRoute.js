import { Router } from "express";
import getUsers from "../services/users/getUsers.js";
import createUser from "../services/users/createUser.js";
import getUserById from "../services/users/getUserById.js";
import deleteUser from "../services/users/deleteUser.js";
import updateUser from "../services/users/updateUser.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

// GET all users

router.get("/", async (req, res, next) => {
  try {
    const { username, email } = req.query;
    const users = await getUsers(username, email);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// POST create a new user

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;
    const newUser = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    res.status(201).json(newUser);
  } catch (error) {
    if (error.message.startsWith("400 Bad Request")) {
      return res.status(400).json({ message: error.message });
    }
    console.error("Error creating user:", error);
    next(error);
  }
});

// GET all users by ID

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      res.status(404).json(`No users found with id ${id}.`);
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

// DELETE user by ID

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await deleteUser(id);
    if (!user) {
      res.status(404).json(`No users found with id ${id}.`);
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
});

// PUT update user by ID

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;
    const user = await updateUser(
      id,
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    if (!user) {
      res.status(404).json(`No users found with id ${id}.`);
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
