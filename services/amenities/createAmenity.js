import { PrismaClient } from "@prisma/client";

const createAmenity = async (name) => {
  if (!name || name.trim() === "") {
    throw new Error("400 Bad Request: Missing required amenity name.");
  }

  const prisma = new PrismaClient();
  return prisma.amenity.create({
    data: {
      name,
    },
  });
};

export default createAmenity;
