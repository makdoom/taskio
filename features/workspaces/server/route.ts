import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, WORKSPACE_ID } from "@/config";
import { ID } from "node-appwrite";
import { WorkspaceSchema } from "../schema";

const app = new Hono().post(
  "/",
  zValidator("json", WorkspaceSchema),
  sessionMiddleware,
  async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");

    const { name } = c.req.valid("json");
    const createdWorkspace = await databases.createDocument(
      DATABASE_ID,
      WORKSPACE_ID,
      ID.unique(),
      { name, userId: user.$id }
    );

    return c.json({ success: 1, data: createdWorkspace });
  }
);

export default app;
