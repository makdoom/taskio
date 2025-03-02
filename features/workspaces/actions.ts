"use server";

import { cookies } from "next/headers";
import { Account, Client, Databases, Query } from "node-appwrite";
import { AUTH_COOKIE } from "../auth/constants";
import { DATABASE_ID, MEMBERS_ID, WORKSPACE_ID } from "@/config";
import { getMember } from "../member/utils";
import { Workspace } from "./types";

export const getWorkspaces = async () => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = (await cookies()).get(AUTH_COOKIE);
    if (!session) return { total: 0, documents: [] };

    client.setSession(session.value);
    const databases = new Databases(client);
    const account = new Account(client);
    const user = await account.get();

    const member = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", user.$id),
    ]);
    if (member.total == 0) return { total: 0, documents: [] };

    const workspacesId = member.documents.map((item) => item.workspaceId);
    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACE_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspacesId)]
    );

    return workspaces;
  } catch (error) {
    return { total: 0, documents: [] };
  }
};

export const getSingleWorkspace = async (workspaceId: string) => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = (await cookies()).get(AUTH_COOKIE);
    if (!session) return null;

    client.setSession(session.value);
    const databases = new Databases(client);
    const account = new Account(client);
    const user = await account.get();

    const member = await getMember({
      databases,
      workspaceId,
      userId: user.$id,
    });

    if (!member) return null;

    const workspace = await databases.getDocument<Workspace>(
      DATABASE_ID,
      WORKSPACE_ID,
      workspaceId
    );

    return workspace;
  } catch (error) {
    return null;
  }
};
