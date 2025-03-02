import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { sessionMiddleware } from "@/lib/session-middleware";
import {
  DATABASE_ID,
  MEMBERS_ID,
  STORAGE_BUCKET_ID,
  WORKSPACE_ID,
} from "@/config";
import { ID, Query } from "node-appwrite";
import { UpdateWorkspaceSchema, WorkspaceSchema } from "../schema";
import { MemberRole } from "@/features/member/types";
import { generateInviteCode } from "@/lib/utils";
import { getMember } from "@/features/member/utils";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");

    const member = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", user.$id),
    ]);
    if (member.total == 0)
      return c.json({ success: 0, data: { total: 0, documents: [] } });

    const workspacesId = member.documents.map((item) => item.workspaceId);
    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACE_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspacesId)]
    );

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
        uploadedFileURL = `data:image/png;base64,${Buffer.from(
          arrayBuffer
        ).toString("base64")}`;
      }

      const createdWorkspace = await databases.createDocument(
        DATABASE_ID,
        WORKSPACE_ID,
        ID.unique(),
        {
          name,
          userId: user.$id,
          imageURL: uploadedFileURL,
          inviteCode: generateInviteCode(8),
        }
      );

      await databases.createDocument(DATABASE_ID, MEMBERS_ID, ID.unique(), {
        userId: user.$id,
        workspaceId: createdWorkspace.$id,
        role: MemberRole.ADMIN,
      });

      return c.json({ success: 1, data: createdWorkspace });
    }
  )
  .patch(
    "/:workspaceId",
    sessionMiddleware,
    zValidator("form", UpdateWorkspaceSchema),
    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");

      const { workspaceId } = c.req.param();
      const { name, imageURL } = c.req.valid("form");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member || member.role !== MemberRole.ADMIN)
        return c.json({ success: 0, error: "Unauthorized" }, 401);

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
        uploadedFileURL = `data:image/png;base64,${Buffer.from(
          arrayBuffer
        ).toString("base64")}`;
      } else {
        uploadedFileURL = imageURL;
      }

      const updatedWorkspace = await databases.updateDocument(
        DATABASE_ID,
        WORKSPACE_ID,
        workspaceId,
        { name, imageURL: uploadedFileURL }
      );

      return c.json({ success: 1, data: updatedWorkspace });
    }
  )
  .delete("/:workspaceId", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");

    const { workspaceId } = c.req.param();
    const member = await getMember({
      databases,
      workspaceId,
      userId: user.$id,
    });
    if (!member || member.role !== MemberRole.ADMIN)
      return c.json({ success: 0, error: "Unauthorized" }, 401);

    // TODO: Delete members, Projects and task

    await databases.deleteDocument(DATABASE_ID, WORKSPACE_ID, workspaceId);
    return c.json({ success: 1, data: { $id: workspaceId } });
  });

export default app;
