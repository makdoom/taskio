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
import { RegisterSchema, RegisterSchemaType } from "../schemas";
import { useRegister } from "../api/use-register";
import { cn } from "@/lib/utils";

const SignUpCard = () => {
  const { mutate, isPending } = useRegister();
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: RegisterSchemaType) => {
    console.log(values);
    mutate({ json: values });
  };

  return (
    <Card className="w-full h-full md:w-[450px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Signup</CardTitle>
      </CardHeader>
      <CardContent className="p-7">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            action=""
            className="space-y-4"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="name"
                      autoFocus
                      placeholder="Enter your name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
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
              Signup
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="flex items-center">
        <Separator className="w-[130px] mx-auto" />
        <span className="text-sm font-semibold">OR</span>
        <Separator className="w-[130px] mx-auto" />
      </div>
      <CardContent className="flex items-center gap-2 my-4">
        <Button
          variant="outline"
          className="w-full text-sm"
          disabled={isPending}
        >
          <FcGoogle />
          Login with Google
        </Button>
        <Button
          variant="outline"
          className="w-full text-sm"
          disabled={isPending}
        >
          <FaGithub />
          Login with Github
        </Button>
      </CardContent>
      <CardContent className="flex items-center justify-center my-2">
        <p className="text-sm">
          Already have an account ?{" "}
          <Link className="text-primary font-semibold" href="/sign-in">
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
export default SignUpCard;
