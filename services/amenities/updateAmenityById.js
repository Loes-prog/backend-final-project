import { PrismaClient } from "@prisma/client";

const updateAmenityById = async (id, name) => {
  const prisma = new PrismaClient();
  const result = await prisma.amenity.updateMany({
    where: { id },
    data: {
      name,
    },
  });

  if (result.count === 0) return null;
  return result;
};

export default updateAmenityById;
