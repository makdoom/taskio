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
import { Divide, ImageIcon, Loader } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { ChangeEvent, useRef } from "react";
import { MAX_FILE_SIZE } from "../constants";
import { toast } from "sonner";

type CreateWorkspaceFormPropType = {
  onCancel?: () => void;
};

const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormPropType) => {
  const { mutate, isPending } = useCreateWorkspace();

  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<WorkspaceSchemaType>({
    resolver: zodResolver(WorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file?.size > MAX_FILE_SIZE)
      return toast.error(
        "File size exceeds the allowed limit. Please upload a file smaller than 1 MB."
      );
    if (e.target.files?.length) form.setValue("imageURL", e.target.files[0]);
  };

  const onSubmit = (values: WorkspaceSchemaType) => {
    const finalValues = {
      ...values,
      imageURL: values.imageURL instanceof File ? values?.imageURL : "",
    };
    mutate(
      { form: finalValues },
      {
        onSuccess: () => {
          form.resetField("name");
        },
      }
    );
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

            <FormField
              name="imageURL"
              control={form.control}
              render={({ field }) => (
                <div className="flex flex-col gap-y-2">
                  <div className="flex items-center gap-x-5">
                    {field.value ? (
                      <div className="size-[72px] relative overflow-hidden rounded-md">
                        <Image
                          alt="worspace-logo"
                          fill
                          className="object-cover size-[72px]"
                          src={
                            field.value instanceof File
                              ? URL.createObjectURL(field.value)
                              : field.value
                          }
                        />
                      </div>
                    ) : (
                      <Avatar className="size-[72px]">
                        <AvatarFallback>
                          <ImageIcon className="size-[30px] text-neutral-400" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div className="flex flex-col gap-y-1">
                      <p className="font-medium text-sm">Workspace Icon</p>
                      <span className="text-muted-foreground text-sm">
                        JPG, PNG, JPEG or SVG, (File Size: max. 1MB)
                      </span>

                      <input
                        type="file"
                        className="hidden"
                        accept=".jpg, .jpeg, .png, .svg"
                        ref={inputRef}
                        disabled={isPending}
                        onChange={handleImageChange}
                      />

                      <Button
                        type="button"
                        variant="secondary"
                        disabled={isPending}
                        size="sm"
                        className="w-fit mt-2 font-medium"
                        onClick={() => inputRef.current?.click()}
                      >
                        Upload Image
                      </Button>
                    </div>
                  </div>
                </div>
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
