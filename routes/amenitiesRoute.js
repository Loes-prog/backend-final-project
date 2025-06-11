import express from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import createAmenity from "../services/amenities/createAmenity.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import deleteAmenity from "../services/amenities/deleteAmenity.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET all amenities

router.get("/", async (req, res, next) => {
  try {
    const amenities = await getAmenities();
    res.status(200).json(amenities);
  } catch (error) {
    next(error);
  }
});

// GET amenity by ID

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const amenity = await getAmenityById(id);
    if (!amenity) {
      res.status(404).json(`No amenities found with id ${id}.`);
    } else {
      res.status(200).json(amenity);
    }
  } catch (error) {
    next(error);
  }
});

// POST create a new amenity

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { name } = req.body;
    const newAmenity = await createAmenity(name);
    res.status(201).json(newAmenity);
  } catch (error) {
    if (error.message.startsWith("400 Bad Request")) {
      return res.status(400).json({ message: error.message });
    }

    console.error("Error creating review:", error);
    next(error);
  }
});

// PUT update an existing amenity by ID

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const amenity = await updateAmenityById(id, name);
    if (!amenity) {
      res.status(404).json(`No amenities found with id ${id}.`);
    } else {
      res.status(200).json(amenity);
    }
  } catch (error) {
    next(error);
  }
});

// DELETE an amenity by ID

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const amenity = await deleteAmenity(id);
    if (!amenity) {
      res.status(404).json(`No amenities found with id ${id}.`);
    } else {
      res.status(200).json({ message: "Host deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
});

// Export the router
export default router;
