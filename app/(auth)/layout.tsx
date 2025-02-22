"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isSignin = pathname == "/sign-in";

  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex items-center justify-between">
          <h4 className="text-3xl font-bold tracking-wide text-primary">
            Taskio
          </h4>
          <Button asChild>
            <Link href={isSignin ? "/sign-up" : "/sign-in"}>
              {isSignin ? "Signup" : "Login"}
            </Link>
          </Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
