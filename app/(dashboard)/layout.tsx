import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import CreateWorkspaceModal from "@/features/workspaces/components/create-workspace-modal";
import { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen">
      <CreateWorkspaceModal />
      <div className="flex w-full h-full">
        <div className="fixed top-0 left-0 hidden lg:block lg:w-[260px] h-full overflow-y-auto">
          <Sidebar />
        </div>
        <div className="lg:pl-[260px] w-full">
          <div className="mx-auto max-w-screen-2xl h-full w-full">
            <Navbar />
            <main className="h-full py-8 px-6 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;
