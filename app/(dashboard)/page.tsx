import { getCurrentUser } from "@/features/auth/actions";
import { getWorkspaces } from "@/features/workspaces/actions";
import CreateWorkspaceForm from "@/features/workspaces/components/create-workspace-form";
import { redirect } from "next/navigation";

const Home = async () => {
  const user = await getCurrentUser();
  if (!user) return redirect("/sign-in");

  const workspaces = await getWorkspaces();
  if (workspaces.total == 0) {
    redirect(`/workspaces/create`);
  } else {
    redirect(`/workspaces/${workspaces.documents[0]?.$id}`);
  }
};

export default Home;
