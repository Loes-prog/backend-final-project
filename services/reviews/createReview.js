import { PrismaClient } from "@prisma/client";

const createReview = async (userId, propertyId, rating, comment) => {
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
