"use client";

import { type LucideIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";

interface NavItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
}

export const NavItem = ({
  href,
  icon: Icon,
  isActive,
  label,
}: NavItemProps) => {
  const { collapsed } = useCreatorSidebar();

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-12",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
    >
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
          {!collapsed && <span>{label}</span>}
        </div>
      </Link>
    </Button>
  );
};

export const NavItemSkeleton = () => (
  <li className="flex items-center gap-x-4 px-3 py-2">
    <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />
    <div className="flex-1 hidden lg:block">
      <Skeleton className="h-6" />
    </div>
  </li>
);
