import { PrismaClient } from "@prisma/client";

const deleteUser = async (id) => {
  const prisma = new PrismaClient();
  const result = await prisma.user.deleteMany({
    where: { id },
  });

  if (result.count === 0) return null;
  return result;
};

export default deleteUser;
