import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/database";

export const getStreams = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    // Guest
    userId = null;
  }

  let streams = [];

  if (userId) {
    streams = await db.stream.findMany({
      where: {
        user: { NOT: { blocking: { some: { blockedId: userId } } } },
      },
      select: {
        user: true,
        isLive: true,
        thumbnailUrl: true,
        name: true,
        id: true,
      },
      orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
    });
  } else {
    streams = await db.stream.findMany({
      select: {
        user: true,
        isLive: true,
        thumbnailUrl: true,
        name: true,
        id: true,
      },
      orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
    });
  }

  return streams;
};
