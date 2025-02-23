"use client";

import { Loader, LogOut } from "lucide-react";
import { useLogout } from "../api/use-logout";
import { useCurrentUser } from "../api/user-current-user";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserButton = () => {
  const { data: user, isLoading } = useCurrentUser();
  const { mutate } = useLogout();

  if (isLoading) {
    return (
      <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
        <Loader className="animate-spin size-4 text-muted-foreground" />
      </div>
    );
  }

  if (!user) return null;

  const { name, email } = user;
  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase() ?? "U";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
          <AvatarFallback className="bg-neutral-200 font-medium flex items-center justify-center text-neutral-700">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        side="top"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center px-2.5 py-4 gap-2">
          <Avatar className="size-[50px] border border-neutral-300">
            <AvatarFallback className="bg-neutral-200 font-medium flex items-center text-xl justify-center text-neutral-700">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>

          <div className="flex items-center justify-center flex-col">
            <p className="text-sm text-neutral-800 font-medium">
              {name || "User"}
            </p>
            <p className="text-xs text-neutral-500">{email}</p>
          </div>
        </div>

        <DropdownMenuItem
          onClick={() => mutate()}
          className="h-10 flex items-center justify-center font-medium text-destructive cursor-pointer hover:!bg-red-500 hover:!text-white"
        >
          <LogOut className="size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserButton;
