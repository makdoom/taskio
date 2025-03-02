import ResponsiveModal from "@/components/responsive-modal";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JSX, useState } from "react";

type useConfirmProp = {
  title: string;
  message: string;
  variant: ButtonProps["variant"];
};

const useConfirm = ({
  title,
  message,
  variant = "default",
}: useConfirmProp): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => setPromise(null);

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = () => {
    return (
      <ResponsiveModal open={promise !== null} onOpenChange={handleClose}>
        <Card className="w-full h-full border-none shadow-none">
          <CardHeader className="p-7">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{message}</CardDescription>
          </CardHeader>
          <CardContent className="w-full gap-2 flex flex-col lg:flex-row items-center justify-end">
            <Button
              className="w-full lg:w-fit"
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              className="w-full lg:w-fit"
              variant={variant}
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </CardContent>
        </Card>
      </ResponsiveModal>
    );
  };

  return [ConfirmationDialog, confirm];
};

export default useConfirm;
