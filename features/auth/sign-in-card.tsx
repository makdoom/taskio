import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

const SignInCard = () => {
  return (
    <Card className="w-full h-full md:w-[450px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Welcome back !</CardTitle>
      </CardHeader>
      <CardContent className="p-7">
        <form action="" className="space-y-4">
          <Input
            type="email"
            autoFocus
            placeholder="Enter email address"
            value=""
            onChange={() => {}}
            required
          />
          <Input
            type="password"
            placeholder="Enter password"
            value=""
            onChange={() => {}}
            required
          />
          <Button size="lg" className="w-full !mt-8">
            Login
          </Button>
        </form>
      </CardContent>
      <div className="flex items-center">
        <Separator className="w-[130px] mx-auto" />
        <span className="text-sm font-semibold">OR</span>
        <Separator className="w-[130px] mx-auto" />
      </div>
      <CardContent className="flex items-center gap-2 my-4">
        <Button variant="outline" className="w-full text-sm">
          <FcGoogle />
          Login with Google
        </Button>
        <Button variant="outline" className="w-full text-sm">
          <FaGithub />
          Login with Github
        </Button>
      </CardContent>
    </Card>
  );
};
export default SignInCard;
