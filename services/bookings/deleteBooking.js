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
      return null;
    }
    throw error;
  }
};

export default deleteBooking;
