"use client";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import WorkspacesAvatar from "@/features/workspaces/components/workspaces-avatar";
import { useRouter } from "next/navigation";
import useWorkspaceId from "@/features/workspaces/hooks/use-workspace-id";

const WorkspaceSwitcher = () => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { data: workspaces } = useGetWorkspaces();

  const onValueChange = (id: string) => {
    router.push(`/workspaces/${id}`);
  };

  return (
    <div className="w-full flex flex-col gap-y-2 my-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-neutral-600">Workspaces</p>
        <Button variant="outline" size="icon" className="size-6">
          <Plus className="size-1" />
        </Button>
      </div>

      <Select value={workspaceId} onValueChange={onValueChange}>
        <SelectTrigger className="bg-white p-1.5 h-12">
          <SelectValue placeholder="No workspace selected" />
        </SelectTrigger>

        <SelectContent>
          {workspaces?.documents.map((workspace) => (
            <SelectItem
              key={workspace.$id}
              value={workspace.$id}
              className="cursor-pointer group"
            >
              <div className="flex items-center gap-x-2">
                <WorkspacesAvatar
                  name={workspace.name}
                  image={workspace.imageURL}
                />
                <span className="capitalize text-sm text-neutral-700 truncate">
                  {workspace.name}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
export default WorkspaceSwitcher;
