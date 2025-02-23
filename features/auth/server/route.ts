import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { LoginSchema } from "../schemas";

const app = new Hono().get("/login", zValidator("json", LoginSchema), (c) => {
  return c.json({ sucess: "OK" });
});

export default app;
