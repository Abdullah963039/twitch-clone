import { User } from "@prisma/client";

import { db } from "@/lib/database";
import { getSelf } from "@/lib/auth-service";

export const getRecommended = async () => {
  let userId: string | null;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch (error) {
    userId = null;
  }

  let users: (User & { stream: { isLive: boolean } | null })[];

  if (userId) {
    users = await db.user.findMany({
      include: { stream: { select: { isLive: true } } },
      orderBy: { createdAt: "desc" },
      where: {
        AND: [
          {
            NOT: { id: userId }, // exclude logged user
          },
          {
            NOT: { followedBy: { some: { followerId: userId } } }, // exclude followed users
          },
          {
            NOT: { blocking: { some: { blockedId: userId } } }, // exclude blocked users
          },
        ],
      },
    });
  } else {
    users = await db.user.findMany({
      include: { stream: { select: { isLive: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  return users;
};
