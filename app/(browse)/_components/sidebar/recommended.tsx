"use client";

import { User } from "@prisma/client";

import { useSidebar } from "@/store/use-sidebar";

import { UserItem, UserItemSkeleton } from "./user-item";

type DataType = User & { stream: { isLive: boolean } | null };

interface RecommendedProps {
  data: DataType[];
}

export const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebar();

  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}

      <ul className="space-y-4 px-2">
        {data.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={user.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {Array.from({ length: 3 }).map((_, idx) => (
        <UserItemSkeleton key={idx} />
      ))}
    </ul>
  );
};
