import { PrismaClient } from "@prisma/client";

const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  if (
    !username ||
    !password ||
    !name ||
    !email ||
    !phoneNumber ||
    !profilePicture ||
    !aboutMe
  ) {
    throw new Error(
      "400 Bad Request: Missing required host data. Please provide username, password, name, email, phoneNumber, profilePicture, and aboutMe."
    );
  }

  const prisma = new PrismaClient();

  const existingHost = await prisma.host.findUnique({
    where: { username },
  });

  if (existingHost) {
    throw new Error("409 Conflict: Username already exists for a host.");
  }

  return prisma.host.create({
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    },
  });
};

export default createHost;
