import UserButton from "@/features/auth/components/user-button";
import MobileSidebar from "./mobile-sidebar";

const Navbar = () => {
  return (
    <div className="pt-4 px-6 flex items-center justify-between w-full">
      <div className="flex-col hidden lg:block">
        <h1 className="text-lg font-semibold">Home</h1>
        <p className="text-sm text-muted-foreground">
          Monitor all of your projects and tasks here
        </p>
      </div>

      <MobileSidebar />
      <UserButton />
    </div>
  );
};
export default Navbar;
