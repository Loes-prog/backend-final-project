import express from "express";
import getReviews from "../services/reviews/getReviews.js";
import getReviewById from "../services/reviews/getReviewById.js";
import createReview from "../services/reviews/createReview.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import deleteReview from "../services/reviews/deleteReview.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET all reviews

router.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

// GET review by ID

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await getReviewById(id);
    if (!review) {
      res.status(404).json(`No reviews found with id ${id}.`);
    } else {
      res.status(200).json(review);
    }
  } catch (error) {
    next(error);
  }
});

// POST create a new review
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { userId, propertyId, rating, comment } = req.body;
    const newReview = await createReview(userId, propertyId, rating, comment);
    res.status(201).json(newReview);
  } catch (error) {
    if (error.message.startsWith("400 Bad Request")) {
      return res.status(400).json({ message: error.message });
    }

    console.error("Error creating review:", error);
    next(error);
  }
});

// PUT update an existing review by ID
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, propertyId, rating, comment } = req.body;
    const updatedReview = await updateReviewById(
      id,
      userId,
      propertyId,
      rating,
      comment
    );
    if (!updatedReview) {
      res.status(404).json(`No reviews found with id ${id}.`);
    } else {
      res.status(200).json({ message: "Review updated successfully" });
    }
  } catch (error) {
    next(error);
  }
});

// DELETE a review by ID

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await deleteReview(id);
    if (!review) {
      res.status(404).json(`No reviews found with id ${id}.`);
    } else {
      res.status(200).json({ message: "Review deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
