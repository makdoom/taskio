"use client";

import Link from "next/link";
import { FiUsers } from "react-icons/fi";

import { IoSettings, IoSettingsOutline } from "react-icons/io5";
import { GoHome, GoHomeFill } from "react-icons/go";
import { cn } from "@/lib/utils";
import { LayoutList } from "lucide-react";
import useWorkspaceId from "@/features/workspaces/hooks/use-workspace-id";
import { usePathname } from "next/navigation";

const routes = [
  {
    label: "Home",
    href: "",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "My Task",
    href: "/task",
    icon: LayoutList,
    activeIcon: LayoutList,
  },
  {
    label: "Members",
    href: "/members",
    icon: FiUsers,
    activeIcon: FiUsers,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: IoSettingsOutline,
    activeIcon: IoSettings,
  },
];

const Navigation = () => {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();

  return (
    <ul className="flex flex-col my-4 gap-y-2">
      {routes.map((item) => {
        const fullPath = `/workspaces/${workspaceId}${item.href}`;
        const isActive = pathname == fullPath;
        const Icon = isActive ? item.activeIcon : item.icon;

        return (
          <Link key={fullPath} href={fullPath}>
            <div
              className={cn(
                "flex group items-center gap-2 p-2.5 rounded-md  hover:text-primary transition text-neutral-700 hover:bg-white",
                isActive &&
                  "bg-primary hover:opacity-100 shadow-sm text-white font-semibold"
              )}
            >
              <Icon
                className={cn(
                  "size-4 group-hover:text-primary text-neutral-700",
                  isActive && "text-white"
                )}
              />
              <span className="text-sm">{item.label}</span>
            </div>
          </Link>
        );
      })}
    </ul>
  );
};
export default Navigation;
