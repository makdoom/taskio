import { getCurrentUser } from "@/features/auth/actions";
import SignUpCard from "@/features/auth/components/sign-up-card";
import { redirect } from "next/navigation";

const SignUp = async () => {
  const user = await getCurrentUser();
  if (user) redirect("/");

  return <SignUpCard />;
};
export default SignUp;
