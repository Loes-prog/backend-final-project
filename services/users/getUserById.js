import { PrismaClient } from "@prisma/client";

const getUserById = async (id) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      username: true,
      email: true,
    },
  });
  return user;
};

export default getUserById;
