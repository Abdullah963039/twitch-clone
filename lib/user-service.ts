import { db } from "@/lib/database";

export const getUserByUsername = async (username: string) => {
  const user = await db.user.findUnique({ where: { username } });

  return user;
};
