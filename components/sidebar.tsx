import Link from "next/link";
import Navigation from "./navigation";

const Sidebar = () => {
  return (
    <div className="h-full bg-neutral-100 p-3 w-full">
      <Link
        href="/"
        className="text-2xl font-bold text-primary w-full flex items-center justify-center"
      >
        Taskio
      </Link>

      <Navigation />
    </div>
  );
};
export default Sidebar;
