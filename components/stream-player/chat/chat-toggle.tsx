"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useChatSidebar } from "@/store/use-chat-sidebar";

export const ChatToggle = () => {
  const { collapsed, onExpand, onCollapse } = useChatSidebar();

  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

  const onToggle = () => (collapsed ? onExpand() : onCollapse());

  const label = collapsed ? "View chat" : "Hide chat";

  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon className="w-4 h-4" />
      </Button>
    </Hint>
  );
};
