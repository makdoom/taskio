"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/api/use-logout";
import { useCurrentUser } from "@/features/auth/api/user-current-user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const { data, isLoading } = useCurrentUser();
  const { mutate } = useLogout();

  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/sign-in");
    }
  }, [data]);

  if (isLoading) return <p>loading ...</p>;
  return (
    <h1>
      Home-authorized user
      <Button onClick={() => mutate()}>Logout</Button>
    </h1>
  );
};

export default Home;
