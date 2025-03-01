import UserButton from "@/features/auth/components/user-button";
import Link from "next/link";
import { ReactNode } from "react";

type StandaloneLayoutProp = {
  children: ReactNode;
};

const StandaloneLayout = ({ children }: StandaloneLayoutProp) => {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="max-w-screen-2xl mx-auto p-4">
        <nav className="flex items-center justify-between">
          <Link href="/">
            <h1 className="font-bold text-2xl text-primary">Taskio</h1>
          </Link>
          <UserButton />
        </nav>
        <div className="h-full w-full flex items-center justify-center py-4">
          {children}
        </div>
      </div>
    </main>
  );
};
export default StandaloneLayout;
