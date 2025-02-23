import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().trim().min(1, "Email address is required").email(),
  password: z.string().trim().min(1, "Password is required"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
