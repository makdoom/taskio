import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

type WorkspaceAvatarProp = {
  image?: string;
  name: string;
  className?: string;
};

const WorkspacesAvatar = ({ image, name, className }: WorkspaceAvatarProp) => {
  if (image) {
    return (
      <div
        className={cn("size-8 relative rounded-md overflow-hidden", className)}
      >
        <Image src={image} alt="workspace-image" fill />
      </div>
    );
  }
  return (
    <Avatar className={cn("size-8 rounded-md ", className)}>
      <AvatarFallback className="uppercase font-bold rounded-md bg-primary/20 text-primary">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};
export default WorkspacesAvatar;
