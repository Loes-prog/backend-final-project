import { PrismaClient } from "@prisma/client";

const deleteAmenity = async (id) => {
  const prisma = new PrismaClient();
  const result = await prisma.amenity.deleteMany({
    where: { id },
  });
  if (result.count === 0) return null;
  return result;
};

export default deleteAmenity;
