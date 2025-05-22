import { PrismaClient } from "@prisma/client";

const createBooking = async ({
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus,
}) => {
  const prisma = new PrismaClient();
  return prisma.booking.create({
    data: {
      user: {
        connect: { id: userId },
      },
      property: {
        connect: { id: propertyId },
      },
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });
};

export default createBooking;
