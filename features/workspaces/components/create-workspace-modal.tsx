"use client";

import ResponsiveModal from "@/components/responsive-modal";
import CreateWorkspaceForm from "./create-workspace-form";
import useCreateWorkspaceModal from "../hooks/use-create-worksapce-modal";

const CreateWorkspaceModal = () => {
  const { isOpen, setIsOpen, onClose } = useCreateWorkspaceModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspaceForm onCancel={onClose} />
    </ResponsiveModal>
  );
};
export default CreateWorkspaceModal;
