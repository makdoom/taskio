"use client";

import { Copy, Loader } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { useResetInviteCode } from "@/features/workspaces/api/use-reset-invite-code";
import useConfirm from "@/hooks/use-confirm";
import { useRouter } from "next/navigation";

type ResetInviteCodeProp = {
  workspaceId: string;
  inviteCode: string;
};

const ResetInviteCode = ({ workspaceId, inviteCode }: ResetInviteCodeProp) => {
  const router = useRouter();

  const { mutate, isPending } = useResetInviteCode();
  const [fullInviteLink, setFullInviteLink] = useState("");

  const [DeleteDialog, confirmDeleteHandler] = useConfirm({
    title: "Reset Invite Code",
    message: "This will invalidate the current invite link",
    variant: "destructive",
  });

  const copyLinkHandler = () => {
    navigator.clipboard
      .writeText(fullInviteLink)
      .then(() => toast.success("Invite link copied successfully"));
  };

  const handleResteInviteCode = async () => {
    const isDelete = await confirmDeleteHandler();
    if (!isDelete) return;

    mutate({ param: { workspaceId } }, { onSuccess: () => router.refresh() });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullInviteLink(
        `${window.location.origin}/workspace/${workspaceId}/join/${inviteCode}`
      );
    }
  }, [workspaceId, inviteCode]);

  return (
    <Card className="w-full h-full shadow-none border-none">
      <DeleteDialog />
      <CardContent className="p-7">
        <div className="flex flex-col">
          <h3 className="font-semibold">Invite Members</h3>
          <p className="text-muted-foreground text-sm">
            Use the invite link to add more members to your workspace
          </p>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <Input disabled value={fullInviteLink} />
          <Button
            variant="outline"
            className="h-11"
            onClick={copyLinkHandler}
            disabled={isPending}
          >
            <Copy />
          </Button>
        </div>

        <div className="mt-6 flex items-center justify-end">
          <Button
            variant="destructive"
            size="sm"
            disabled={isPending}
            onClick={handleResteInviteCode}
          >
            {isPending ? (
              <Loader className="animate-spin" />
            ) : (
              <GrPowerReset className="size-3" />
            )}
            Reset Code
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default ResetInviteCode;
