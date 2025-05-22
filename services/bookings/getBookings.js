import { PrismaClient } from "@prisma/client";

const getBookings = async (userId) => {
  const prisma = new PrismaClient();
  const bookings = await prisma.booking.findMany({
    where: {
      userId: {
        contains: userId,
      },
    },
  });
  return bookings;
};

export default getBookings;
