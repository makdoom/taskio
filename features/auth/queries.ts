"use server";

import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";
import { AUTH_COOKIE } from "./constants";
import { createSessionClient } from "@/lib/appwrite";

export const getCurrentUser = async () => {
  try {
    const { account } = await createSessionClient();

    return await account.get();
  } catch (error) {
    return null;
  }
};
