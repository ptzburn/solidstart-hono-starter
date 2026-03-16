import { OpenAPIHono } from "@hono/zod-openapi";
import notFound from "~/api/middlewares/not-found.middleware.ts";
import onError from "~/api/middlewares/on-error.middleware.ts";
import defaultHook from "~/api/utils/default-hook.ts";

import { pinoLogger } from "~/api/middlewares/logger.middleware.ts";

import type { AppBindings, AppOpenAPI } from "~/api/lib/types.ts";

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
  return app;
}

export function createTestApp<R extends AppOpenAPI>(router: R) {
  return createApp().route("/", router);
}
