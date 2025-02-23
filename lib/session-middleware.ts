import "server-only";

import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import {
  Account,
  Client,
  Databases,
  Storage,
  Models,
  type Account as AccountType,
  type Storage as StorageType,
  type Users as UserType,
  type Databases as DatabsesType,
} from "node-appwrite";
import { AUTH_COOKIE } from "@/features/auth/constants";

type ContextType = {
  Variables: {
    account: AccountType;
    storage: StorageType;
    databases: DatabsesType;
    users: UserType;
    user: Models.User<Models.Preferences>;
  };
};

export const sessionMiddleware = createMiddleware<ContextType>(
  async (c, next) => {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = getCookie(c, AUTH_COOKIE);
    if (!session) return c.json({ error: "Unauthorized user" }, 401);

    client.setSession(session);

    const account = new Account(client);
    const storage = new Storage(client);
    const databases = new Databases(client);

    const user = await account.get();

    c.set("account", account);
    c.set("storage", storage);
    c.set("databases", databases);
    c.set("user", user);

    await next();
  }
);
