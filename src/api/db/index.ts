import { drizzle } from "drizzle-orm/libsql";
import env from "~/env.ts";
import * as schema from "./schema/index.ts";
import { createClient } from "@libsql/client";
import { relations } from "./relations.ts";

export const client = createClient({
  url: env.NODE_ENV === "development"
    ? env.DATABASE_URL
    : "file:/app/data/replica.db",
  syncUrl: env.NODE_ENV === "development" ? undefined : env.DATABASE_URL,
  authToken: env.NODE_ENV === "development"
    ? undefined
    : env.DATABASE_AUTH_TOKEN,
});

const db = drizzle({
  client,
  casing: "snake_case",
  schema,
  relations,
});

export default db;
