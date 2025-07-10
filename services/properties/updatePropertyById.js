import { PrismaClient } from "@prisma/client";

const updatePropertyById = async (
  id,
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  hostId,
  rating
) => {
  try {
    const prisma = new PrismaClient();
    const result = await prisma.property.update({
      where: { id },
      data: {
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        host: {
          connect: { id: hostId },
        },
        rating,
      },
    });
    return result;
  } catch (error) {
    // PrismaError: Record to update not found
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
};

export default updatePropertyById;
