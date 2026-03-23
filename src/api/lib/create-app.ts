import { OpenAPIHono } from "@hono/zod-openapi";
import notFound from "~/api/middlewares/not-found.middleware.ts";
import onError from "~/api/middlewares/on-error.middleware.ts";
import defaultHook from "~/api/utils/default-hook.ts";

import { pinoLogger } from "~/api/middlewares/logger.middleware.ts";

import type { AppBindings } from "~/api/types/hono.ts";
import { auth } from "~/shared/auth.ts";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();
  app.use(pinoLogger());
  app.notFound(notFound);
  app.onError(onError);
  // deno-lint-ignore require-await
  app.on(["POST", "GET"], "/api/auth/**", async (c) => {
    if (c.req.path === "/api/auth/error") {
      const error = c.req.query("error");
      const redirectUrl = error ? `/auth/error?error=${error}` : "/auth/error";
      return c.redirect(redirectUrl);
    }
    return auth.handler(c.req.raw);
  });
  return app;
}
