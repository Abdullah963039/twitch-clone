"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

import { ChatInfo } from "./chat-info";

interface ChatFormProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isFollowersOnly: boolean;
  isDelayed: boolean;
  isFollowing: boolean;
}

export const ChatForm = (props: ChatFormProps) => {
  const {
    isDelayed,
    isFollowersOnly,
    isFollowing,
    isHidden,
    onChange,
    onSubmit,
    value,
  } = props;

  const [isDelayedBlocked, setIsDelayedBlocked] = useState(false);
  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
  const isDisabled =
    isHidden || isDelayedBlocked || isFollowersOnlyAndNotFollowing;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isDelayed && !isDelayedBlocked) {
      setIsDelayedBlocked(true);
      setTimeout(() => {
        setIsDelayedBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  };

  if (isHidden) return null;

  return (
    <form
      className="flex flex-col items-center gap-y-4 p-3"
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly} />
        <Input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={isDisabled}
          placeholder="Send a message"
          className={cn(
            "border-white/10",
            (isFollowersOnly || isDelayed) && "rounded-t-none border-t-0"
          )}
        />
      </div>
      <div className="ml-auto">
        <Button type="submit" variant="primary" size="sm" disabled={isDisabled}>
          Chat
        </Button>
      </div>
    </form>
  );
};

export const ChatFormSkeleton = () => (
  <div className="flex flex-col items-center gap-y-4 p-3">
    <Skeleton className="w-full h-10" />
    <div className="flex items-center gap-x-2 ml-auto">
      <Skeleton className="w-7 h-7" />
      <Skeleton className="w-12 h-7" />
    </div>
  </div>
);
