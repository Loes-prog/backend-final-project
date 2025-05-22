import { PrismaClient } from "@prisma/client";

const getProperties = async (location, pricePerNight, amenities) => {
  const prisma = new PrismaClient();

  const filters = {};

  if (location) {
    filters.location = {
      contains: location,
    };
  }

  if (pricePerNight) {
    filters.pricePerNight = {
      equals: parseFloat(pricePerNight),
    };
  }

  if (amenities) {
    filters.amenities = {
      some: {
        name: {
          contains: amenities,
        },
      },
    };
  }

  const properties = await prisma.property.findMany({
    where: filters,
    include: {
      amenities: true,
    },
  });

  return properties;
};

export default getProperties;
