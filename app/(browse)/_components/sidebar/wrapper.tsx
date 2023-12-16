"use client";

import { useEffect, useState } from "react";

import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";

import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const [mounted, setMounted] = useState(false);
  const { collapsed } = useSidebar((state) => state);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Responsable of server side rendering (SSR)
  if (!mounted)
    return (
      <aside
        className={cn(
          "fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50"
        )}
      >
        <ToggleSkeleton />
        <RecommendedSkeleton />
      </aside>
    );

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
