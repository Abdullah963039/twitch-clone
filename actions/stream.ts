"use server";

import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/database";
import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getSelf();
    const selfStream = await getStreamByUserId(self.id);

    if (!selfStream) throw new Error("Stream not found!");

    const validData = {
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatDelayed: values.isChatDelayed,
      isChatFollowersOnly: values.isChatFollowersOnly,
    };

    const stream = await db.stream.update({
      where: { id: selfStream.id },
      data: { ...validData },
    });

    revalidatePath(`/`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/u/${self.username}/chat`);

    return stream;
  } catch (error) {
    throw new Error("500 Intenal Error");
  }
};
