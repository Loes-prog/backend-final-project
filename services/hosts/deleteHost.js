import { PrismaClient } from "@prisma/client";

const deleteHost = async (id) => {
  const prisma = new PrismaClient();
  const result = await prisma.host.deleteMany({
    where: { id },
  });
  if (result.count === 0) return null;
  return result;
};
export default deleteHost;
