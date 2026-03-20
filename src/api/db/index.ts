import { drizzle } from "drizzle-orm/libsql/web";
import env from "~/env.ts";
import * as schema from "./schema/index.ts";
import { relations } from "./relations.ts";

const db = drizzle({
  connection: {
    url: env.DATABASE_URL,
    authToken: env.NODE_ENV === "development"
      ? undefined
      : env.DATABASE_AUTH_TOKEN,
  },
  casing: "snake_case",
  schema,
  relations,
});

export default db;
