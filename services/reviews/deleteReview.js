import { PrismaClient } from "@prisma/client";

const deleteReview = async (id) => {
  const prisma = new PrismaClient();
  const result = await prisma.review.deleteMany({
    where: { id },
  });
  if (result.count === 0) return null;
  return result;
};
export default deleteReview;
