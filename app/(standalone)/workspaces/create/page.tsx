import { getCurrentUser } from "@/features/auth/actions";
import CreateWorkspaceForm from "@/features/workspaces/components/create-workspace-form";
import { redirect } from "next/navigation";

const CreateWorkspace = async () => {
  const user = await getCurrentUser();
  if (!user) return redirect("/sign-in");

  return (
    <div className="h-full w-full lg:max-w-xl flex items-center justify-center">
      <CreateWorkspaceForm />
    </div>
  );
};
export default CreateWorkspace;
