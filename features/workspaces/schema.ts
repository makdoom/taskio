import { z } from "zod";

export const WorkspaceSchema = z.object({
  name: z.string().trim().min(1, "Workspace name is required"),
  imageURL: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});

export const UpdateWorkspaceSchema = WorkspaceSchema.extend({
  name: z.string().trim().min(1, "Workspace name is required").optional(),
});

export type WorkspaceSchemaType = z.infer<typeof WorkspaceSchema>;
export type UpdateWorkspaceSchemaType = z.infer<typeof UpdateWorkspaceSchema>;
