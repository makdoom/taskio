import { getCurrentUser } from "@/features/auth/actions";
import { redirect } from "next/navigation";

const WorkspaceIdPage = async () => {
  const user = await getCurrentUser();
  if (!user) return redirect("/sign-in");

  return <div>WorkspaceIdPage</div>;
};
export default WorkspaceIdPage;
