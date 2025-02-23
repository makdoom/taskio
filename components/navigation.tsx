import Link from "next/link";
import { FiUsers } from "react-icons/fi";

import {
  IoSettings,
  IoSettingsOutline,
  IoListCircleOutline,
  IoListCircle,
} from "react-icons/io5";
import { GoHome, GoHomeFill } from "react-icons/go";
import { cn } from "@/lib/utils";

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
    icon: IoListCircleOutline,
    activeIcon: IoListCircle,
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
  return (
    <ul className="flex flex-col my-8">
      {routes.map((item) => {
        const isActive = false;
        const Icon = isActive ? item.activeIcon : item.icon;

        return (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                "flex group items-center gap-2 p-2.5 rounded-md  font-medium hover:text-primary transition text-neutral-500 hover:bg-white",
                isActive && "bg-white hover:opacity-100 shadow-sm text-primary"
              )}
            >
              <Icon className="size-5 group-hover:text-primary text-neutral-500" />
              {item.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
};
export default Navigation;
