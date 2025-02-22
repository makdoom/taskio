import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().trim().min(1, "Email address is required").email(),
  password: z.string().trim().min(1, "Password is required"),
});

type FormSchemaType = z.infer<typeof formSchema>;

const SignInCard = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: FormSchemaType) => {
    console.log(values);
  };

  return (
    <Card className="w-full h-full md:w-[450px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Welcome back !</CardTitle>
      </CardHeader>

      <CardContent className="p-7">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            action=""
            className="space-y-4"
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      autoFocus
                      placeholder="Enter email address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button size="lg" className="w-full !mt-8">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>

      <div className="flex items-center">
        <Separator className="w-[130px] mx-auto" />
        <span className="text-sm font-semibold">OR</span>
        <Separator className="w-[130px] mx-auto" />
      </div>

      <CardContent className="flex items-center gap-2 mt-4">
        <Button variant="outline" className="w-full text-sm">
          <FcGoogle />
          Login with Google
        </Button>
        <Button variant="outline" className="w-full text-sm">
          <FaGithub />
          Login with Github
        </Button>
      </CardContent>

      <CardContent className="flex items-center justify-center my-2">
        <p className="text-sm">
          Don't have an account ?{" "}
          <Link className="text-primary font-semibold" href="/sign-up">
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
export default SignInCard;
