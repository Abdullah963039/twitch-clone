import { currentUser } from "@clerk/nextjs";

import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from "@/lib/user-service";

interface CreatorPageProps {
  params: {
    username: string;
  };
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const exteranlUser = await currentUser();
  const user = await getUserByUsername(params.username);

  if (!user || user.externalUserId !== exteranlUser?.id || !user.stream)
    throw new Error("Unauthorized");

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  );
};
export default CreatorPage;
