import { PrismaClient } from "@prisma/client";

const updateReviewById = async (id, userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();
  const result = await prisma.review.updateMany({
    where: { id },
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });
  if (result.count === 0) return null;
  return result;
};
export default updateReviewById;
