import express from "express";
import getBookings from "../services/bookings/getBookings.js";
import getBookingById from "../services/bookings/getBookingById.js";
import createBooking from "../services/bookings/createBooking.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import deleteBooking from "../services/bookings/deleteBooking.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET all bookings
router.get("/", async (req, res, next) => {
  try {
    const { userId } = req.query;
    const bookings = await getBookings(userId);
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
});

// GET booking by ID

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await getBookingById(id);
    if (!booking) {
      res.status(404).json(`No bookings found with id ${id}.`);
    } else {
      res.status(200).json(booking);
    }
  } catch (error) {
    next(error);
  }
});

// POST create a new booking

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;
    const newBooking = await createBooking({
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    });
    res.status(201).json(newBooking);
  } catch (error) {
    if (error.message.startsWith("400 Bad Request")) {
      return res.status(400).json({ message: error.message });
    }

    console.error("Error creating review:", error);
    next(error);
  }
});

// PUT update an existing booking by ID

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;
    const updatedBooking = await updateBookingById(
      id,
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );
    if (!updatedBooking) {
      res.status(404).json(`No bookings found with id ${id}.`);
    } else {
      res.status(200).json({ message: "Booking updated successfully" });
    }
  } catch (error) {
    next(error);
  }
});

// DELETE a booking by ID

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await deleteBooking(id);
    if (!booking) {
      res.status(404).json(`No bookings found with id ${id}.`);
    } else {
      res.status(200).json({ message: "Booking deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
