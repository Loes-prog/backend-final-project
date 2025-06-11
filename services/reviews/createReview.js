import { PrismaClient } from "@prisma/client";

const createReview = async (userId, propertyId, rating, comment) => {
  if (!userId || !propertyId || rating === undefined || !comment) {
    throw new Error(
      "400 Bad Request: Missing required review data. Please provide userId, propertyId, rating, and comment."
    );
  }

  const prisma = new PrismaClient();
  return prisma.review.create({
    data: {
      user: {
        connect: { id: userId },
      },
      property: {
        connect: { id: propertyId },
      },
      rating,
      comment,
    },
  });
};

export default createReview;
