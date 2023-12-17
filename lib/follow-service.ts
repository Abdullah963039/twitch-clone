import { db } from "@/lib/database";
import { getSelf } from "@/lib/auth-service";

export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({ where: { id } });

    if (!otherUser) throw new Error("404 User not found");

    if (otherUser.id === self.id) return true;

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    return !!existingFollow;
  } catch {
    return false;
  }
};

export const followUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await db.user.findUnique({ where: { id } });

  if (!otherUser) throw new Error("404 User not found");

  if (otherUser.id === self.id) throw new Error("400 Cannot follow your self");

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (existingFollow) throw new Error("400 Already following");

  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      follower: true,
      following: true,
    },
  });

  return follow;
};

export const unfollowUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await db.user.findUnique({ where: { id } });

  if (!otherUser) throw new Error("404 User not found");

  if (otherUser.id === self.id) throw new Error("400 Cannot unfollow yourself");

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (!existingFollow) throw new Error("400 Not following!");

  const follow = await db.follow.delete({
    where: { id: existingFollow.id },
    include: { following: true },
  });

  return follow;
};
