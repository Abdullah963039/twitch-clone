import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/database";

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({ where: { id } });

    if (!otherUser) throw new Error("404 User not found!");

    if (otherUser.id === self.id) throw new Error("400 Cannot block yourself!");

    const existingBlock = await db.block.findUnique({
      where: {
        blockedId_blockerId: {
          blockerId: otherUser.id,
          blockedId: self.id,
        },
      },
    });

    return !!existingBlock;
  } catch {
    return false;
  }
};

export const blockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) throw new Error("400 Cannot block yourself!");

  const otherUser = await db.user.findUnique({ where: { id } });

  if (!otherUser) throw new Error("404 User not found!");

  const existingBlock = await db.block.findUnique({
    where: {
      blockedId_blockerId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (existingBlock) throw new Error("400 Already blocked");

  const block = await db.block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
    include: { blocked: true },
  });

  return block;
};

export const unblockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) throw new Error("400 Cannot unblock yourself!");

  const otherUser = await db.user.findUnique({ where: { id } });

  if (!otherUser) throw new Error("404 User not found!");

  const existingBlock = await db.block.findUnique({
    where: {
      blockedId_blockerId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (!existingBlock) throw new Error("400 Already not blocked");

  const unblock = await db.block.delete({
    where: { id: existingBlock.id },
    include: { blocked: true },
  });

  return unblock;
};
