import express from "express";
import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import createHost from "../services/hosts/createHost.js";
import updateHostById from "../services/hosts/updateHostById.js";
import deleteHost from "../services/hosts/deleteHost.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET all hosts

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    const hosts = await getHosts(name);
    res.status(200).json(hosts);
  } catch (error) {
    next(error);
  }
});

// GET host by ID

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const host = await getHostById(id);
    if (!host) {
      res.status(404).json(`No hosts found with id ${id}.`);
    } else {
      res.status(200).json(host);
    }
  } catch (error) {
    next(error);
  }
});

// POST create a new host

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    const newHost = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res.status(201).json(newHost);
  } catch (error) {
    next(error);
  }
});

// PUT update an existing host by ID

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    const updatedHost = await updateHostById(
      id,
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    if (!updatedHost) {
      res.status(404).json(`No hosts found with id ${id}.`);
    } else {
      res.status(200).json(updatedHost);
    }
  } catch (error) {
    next(error);
  }
});

// DELETE a host by ID

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const host = await deleteHost(id);
    if (!host) {
      res.status(404).json(`No hosts found with id ${id}.`);
    } else {
      res.status(200).json({ message: "Host deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
