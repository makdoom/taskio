"use client";

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
import { LoginSchema, LoginSchemaType } from "../schemas";
import { useLogin } from "../api/use-login";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

const SignInCard = () => {
  const { mutate, isPending } = useLogin();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginSchemaType) => {
    console.log(values);
    mutate({ json: values });
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

            <Button
              size="lg"
              className={cn("w-full !mt-8", isPending && "cursor-not-allowed")}
              disabled={isPending}
            >
              {isPending && <Loader className="animate-spin" />}
              Login
            </Button>
          </form>
        </Form>
      </CardContent>

      <div className="flex items-center justify-center">
        <Separator className="w-[70px] sm:w-[150px] mx-auto" />
        <span className="text-sm font-semibold">OR</span>
        <Separator className="w-[70px] sm:w-[150px] mx-auto" />
      </div>

      <CardContent className="flex flex-col gap-4 md:gap-2 md:flex-row items-center mt-4 px-7">
        <Button
          variant="secondary"
          className="w-full text-sm h-10"
          disabled={isPending}
        >
          <FcGoogle />
          Login with Google
        </Button>
        <Button
          variant="secondary"
          className="w-full text-sm h-10"
          disabled={isPending}
        >
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
