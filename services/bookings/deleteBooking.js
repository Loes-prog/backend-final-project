import { PrismaClient } from "@prisma/client";

const deleteBooking = async (id) => {
  const prisma = new PrismaClient();
  try {
    const deletedBooking = await prisma.booking.delete({
      where: { id },
    });
    return deletedBooking;
  } catch (error) {
    if (error.code === "P2025") {
      // booking niet gevonden
      return null;
    }
    throw error; // andere fouten gewoon doorgeven
  }
};

export default deleteBooking;
