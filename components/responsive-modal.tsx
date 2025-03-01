import { ReactNode } from "react";
import { useMedia } from "react-use";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Drawer, DrawerContent } from "./ui/drawer";

type ResponsiveModalProp = {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ResponsiveModal = ({
  children,
  open,
  onOpenChange,
}: ResponsiveModalProp) => {
  const isDesktop = useMedia("(min-width: 1024px)", true);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full sm:max-w-lg p-0 border-none overflow-auto hide-scrollbar max-h-[85vh]">
          <DialogTitle className="hidden" />
          <DialogDescription className="hidden" />
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DialogTitle className="hidden" />
        <DialogDescription className="hidden" />
        <div className=" overflow-auto hide-scrollbar max-h-[85vh]">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
export default ResponsiveModal;
