"use client";

import { Loader, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import useConfirm from "@/hooks/use-confirm";
import { useDeleteWorkspace } from "@/features/workspaces/api/use-delete-workspace";
import useWorkspaceId from "@/features/workspaces/hooks/use-workspace-id";

const DangerZone = () => {
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useDeleteWorkspace();
  const [DeleteDialog, confirmDeleteHandler] = useConfirm({
    title: "Delete Workspace",
    message:
      "This action can not be undone, Are you sure you want to continue ? ",
    variant: "destructive",
  });

  const handleDelete = async () => {
    const isDelete = await confirmDeleteHandler();
    if (!isDelete) return;

    mutate(
      { param: { workspaceId } },
      { onSuccess: () => (window.location.href = "/") }
    );
  };

  return (
    <Card className="w-full h-full shadow-none border border-destructive">
      <DeleteDialog />
      <CardContent className="p-7">
        <div className="flex flex-col">
          <h3 className=" font-semibold">Danger Zone</h3>
          <p className="text-muted-foreground text-sm">
            Deleting a workspace is irreversible and will remove all associated
            data
          </p>

          <Button
            size="sm"
            type="button"
            disabled={isPending}
            onClick={handleDelete}
            variant="destructive"
            className="w-fit mt-6 ml-auto"
          >
            {isPending ? (
              <Loader className="animate-spin" />
            ) : (
              <Trash className="siz-3" />
            )}
            Delete Workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default DangerZone;
