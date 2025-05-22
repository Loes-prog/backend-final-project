import { PrismaClient } from "@prisma/client";

const updateBookingById = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();
  const result = await prisma.user.updateMany({
    where: { id },
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    },
  });

  if (result.count === 0) return null;
  return result;
};
export default updateBookingById;
