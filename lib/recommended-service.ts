import { db } from "@/lib/database";
import { getSelf } from "@/lib/auth-service";

export const getRecommended = async () => {
  const users = await db.user.findMany({ orderBy: { createdAt: "desc" } });

  return users;
};
