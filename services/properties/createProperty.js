import { PrismaClient } from "@prisma/client";

const createProperty = async ({
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  hostId,
  rating,
  amenityIds,
}) => {
  const prisma = new PrismaClient();
  return prisma.property.create({
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
      amenities: {
        connect: amenityIds.map((id) => ({ id })),
      },
    },
  });
};

export default createProperty;
