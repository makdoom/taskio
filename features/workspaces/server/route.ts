import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, STORAGE_BUCKET_ID, WORKSPACE_ID } from "@/config";
import { ID } from "node-appwrite";
import { WorkspaceSchema } from "../schema";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const workspaces = await databases.listDocuments(DATABASE_ID, WORKSPACE_ID);

    return c.json({ success: 1, data: workspaces });
  })
  .post(
    "/",
    zValidator("form", WorkspaceSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");

      const { name, imageURL } = c.req.valid("form");
      let uploadedFileURL: string | undefined;

      if (imageURL instanceof File) {
        const file = await storage.createFile(
          STORAGE_BUCKET_ID,
          ID.unique(),
          imageURL
        );

        const arrayBuffer = await storage.getFilePreview(
          STORAGE_BUCKET_ID,
          file.$id
        );
        uploadedFileURL = `data:image/png;base64${Buffer.from(
          arrayBuffer
        ).toString("base64")}`;
      }

      const createdWorkspace = await databases.createDocument(
        DATABASE_ID,
        WORKSPACE_ID,
        ID.unique(),
        { name, userId: user.$id, imageURL: uploadedFileURL }
      );

      return c.json({ success: 1, data: createdWorkspace });
    }
  );

export default app;
