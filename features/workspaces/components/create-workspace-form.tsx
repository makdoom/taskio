"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { WorkspaceSchema, WorkspaceSchemaType } from "../schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { Loader } from "lucide-react";

type CreateWorkspaceFormPropType = {
  onCancel?: () => void;
};

const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormPropType) => {
  const { mutate, isPending } = useCreateWorkspace();

  const form = useForm<WorkspaceSchemaType>({
    resolver: zodResolver(WorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: WorkspaceSchemaType) => {
    console.log(values);
    mutate({ json: values });
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Create a new workspace
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      autoFocus
                      placeholder="Enter workspace name"
                      className="text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={onCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="lg"
                className={cn(isPending && "cursor-not-allowed")}
                disabled={isPending}
              >
                {isPending && <Loader className="animate-spin" />}
                Create Workspace
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default CreateWorkspaceForm;
