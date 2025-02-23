import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { LoginSchema, RegisterSchema } from "../schemas";

const app = new Hono()
  .post("/login", zValidator("json", LoginSchema), (c) => {
    const { email, password } = c.req.valid("json");
    console.log({ email, password });
    return c.json({ sucess: 1, email, password });
  })
  .post("/register", zValidator("json", RegisterSchema), (c) => {
    const { name, email, password } = c.req.valid("json");
    console.log({ name, email, password });
    return c.json({ sucess: 1 });
  });

export default app;
