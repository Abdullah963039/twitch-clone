import { db } from "@/lib/database";
import { getSelf } from "@/lib/auth-service";
import { User } from "@prisma/client";

export const getRecommended = async () => {
  let userId: string | null;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch (error) {
    userId = null;
  }

  let users: User[];

  if (userId) {
    users = await db.user.findMany({
      orderBy: { createdAt: "desc" },
      where: { NOT: { id: userId } },
    });
  } else {
    users = await db.user.findMany({ orderBy: { createdAt: "desc" } });
  }

  return users;
};
