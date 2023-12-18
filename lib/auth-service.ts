import { currentUser } from "@clerk/nextjs";

import { db } from "@/lib/database";

export const getSelf = async () => {
  const self = await currentUser();

  if (!self || !self.username) throw new Error("401 Unauthorized");

  const user = await db.user.findUnique({
    where: { externalUserId: self.id },
  });

  if (!user) throw new Error("404 User not found");

  return user;
};

export const getSelfByUsername = async (username: string) => {
  const self = await currentUser();

  if (!self || !self.username) throw new Error("401 Unauthorized");

  const user = await db.user.findUnique({ where: { username } });

  if (!user) throw new Error("404 User not found!");

  if (self.username !== user.username) throw new Error("401 Unauthorized");

  return user;
};
