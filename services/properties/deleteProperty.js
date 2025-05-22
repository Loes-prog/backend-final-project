import { PrismaClient } from "@prisma/client";

const deleteProperty = async (id) => {
  const prisma = new PrismaClient();
  const result = await prisma.property.deleteMany({
    where: { id },
  });
  if (result.count === 0) return null;
  return result;
};

export default deleteProperty;
