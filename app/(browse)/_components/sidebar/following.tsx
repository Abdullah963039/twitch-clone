"use client";

import { Follow, Stream, User } from "@prisma/client";

import { useSidebar } from "@/store/use-sidebar";

import { UserItem, UserItemSkeleton } from "./user-item";

type DataType = Follow & { following: User & { stream: Stream | null } };

interface FollowingProps {
  data: DataType[];
}

export const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar();

  if (!data.length) return null;

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((follow) => (
          <UserItem
            key={follow.id}
            username={follow.following.username}
            imageUrl={follow.following.imageUrl}
            isLive={follow.following.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => (
  <ul className="px-2 pt-2 lg:pt-0">
    {Array.from({ length: 3 }).map((_, idx) => (
      <UserItemSkeleton key={idx} />
    ))}
  </ul>
);
