import { getCurrentUser } from "@/features/auth/queries";
import { getSingleWorkspace } from "@/features/workspaces/queries";
import EditWorkspaceForm from "@/features/workspaces/components/edit-workspace-form";
import { redirect } from "next/navigation";
import DangerZone from "@/components/danger-zone";

type WorkspaceSettingIdPageProp = {
  params: Promise<{
    workspaceId: string;
  }>;
};

const WorkspaceIdSettingPage = async ({
  params,
}: WorkspaceSettingIdPageProp) => {
  const { workspaceId } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const initialValues = await getSingleWorkspace(workspaceId);
  if (!initialValues) return redirect(`/workspaces/${workspaceId}`);

  return (
    <div className="h-full w-full lg:max-w-xl flex items-center justify-center flex-col gap-3">
      <EditWorkspaceForm initialValues={initialValues} />

      <DangerZone />
    </div>
  );
};

export default WorkspaceIdSettingPage;
