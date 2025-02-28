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

const WorkspaceSwitcher = () => {
  const { data: workspaces } = useGetWorkspaces();

  console.log(workspaces);
  return (
    <div className="w-full flex flex-col gap-y-2 my-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Workspaces</p>
        <Button variant="outline" size="icon" className="size-7">
          <Plus className="size-4" />
        </Button>
      </div>

      <Select>
        <SelectTrigger className="bg-white p-2 h-12">
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
                <span className="capitalize text-sm text-neutral-700">
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
