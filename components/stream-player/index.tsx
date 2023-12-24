"use client";

import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";

import { Video, VideoSkeleton } from "./video";
import { Chat, ChatSkeleton } from "./chat";
import { ChatToggle } from "./chat/chat-toggle";
import { Header, HeaderSkeleton } from "./header";
import { InfoCard } from "./info-card";

interface StraemPlayerProps {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
}

export const StreamPlayer = ({
  stream,
  user,
  isFollowing,
}: StraemPlayerProps) => {
  const { token, identity, name } = useViewerToken(user.id);
  const { collapsed } = useChatSidebar();

  if (!token || !name || !identity) return <StreamPlayerSkeleton />;

  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-6 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scollbar pb-10">
          <Video hostName={user.username} hostIdentity={user.id} />
          <Header
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            name={stream.name}
          />
          <InfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumbnailUrl}
          />
        </div>
        <div className={cn("col-span-1", collapsed && "hidden")}>
          <Chat
            viewerName={name}
            hostIdentity={user.id}
            hostName={user.username}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDeleyed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export const StreamPlayerSkeleton = () => (
  <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
    <div className="space-y-2 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
      <VideoSkeleton />
      <HeaderSkeleton />
    </div>
    <div className="col-span-1 bg-background">
      <ChatSkeleton />
    </div>
  </div>
);
