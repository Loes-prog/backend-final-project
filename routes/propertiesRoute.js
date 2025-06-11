import express from "express";
import getProperties from "../services/properties/getProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import createProperty from "../services/properties/createProperty.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import deleteProperty from "../services/properties/deleteProperty.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET all properties
router.get("/", async (req, res, next) => {
  try {
    const { location, pricePerNight, amenities } = req.query;
    const properties = await getProperties(location, pricePerNight, amenities);
    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
});

// GET property by ID

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await getPropertyById(id);
    if (!property) {
      res.status(404).json({ message: `No properties found with id ${id}.` });
    } else {
      res.status(200).json(property);
    }
  } catch (error) {
    next(error);
  }
});

// POST create a new property

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
      amenityIds,
    } = req.body;
    const newProperty = await createProperty({
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
      amenityIds,
    });
    res.status(201).json(newProperty);
  } catch (error) {
    if (error.message.startsWith("400 Bad Request")) {
      return res.status(400).json({ message: error.message });
    }

    console.error("Error creating review:", error);
    next(error);
  }
});

// PUT update a property by ID

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
      amenityIds,
    } = req.body;
    const updatedProperty = await updatePropertyById(
      id,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
      amenityIds
    );
    if (!updatedProperty) {
      res.status(404).json(`No properties found with id ${id}.`);
    } else {
      res.status(200).json(updatedProperty);
    }
  } catch (error) {
    next(error);
  }
});

// DELETE a property

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await deleteProperty(id);
    if (!property) {
      res.status(404).json(`No properties found with id ${id}.`);
    } else {
      res.status(200).json({ message: "Property deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
