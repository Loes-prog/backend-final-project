import { PrismaClient } from "@prisma/client";

const getHostById = async (id) => {
  const prisma = new PrismaClient();
  const host = await prisma.host.findUnique({
    where: { id },
    select: {
      username: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      aboutMe: true,
    },
  });

  return host;
};

export default getHostById;
