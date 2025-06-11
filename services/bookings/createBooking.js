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
  // Voer een if-check uit om te controleren of alle vereiste data aanwezig is.
  // Gebruik strikte controles voor numerieke waarden (numberOfGuests, totalPrice)
  // om te voorkomen dat 0 als 'falsey' wordt gezien.
  if (
    !userId ||
    !propertyId ||
    !checkinDate ||
    !checkoutDate ||
    numberOfGuests === undefined || // Controleer specifiek op undefined of null
    numberOfGuests === null ||
    totalPrice === undefined || // Controleer specifiek op undefined of null
    totalPrice === null ||
    !bookingStatus
  ) {
    // Gooi een foutmelding als data incompleet is
    throw new Error(
      "400 Bad Request: Missing required booking data. Please provide userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, and bookingStatus."
    );
  }

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
