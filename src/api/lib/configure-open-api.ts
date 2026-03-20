import { Scalar } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "~/api/lib/types.ts";

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Tasks API",
    },
  });

  app.get(
    "/docs",
    Scalar({
      pageTitle: "API Documentation",
      theme: "deepSpace",
      layout: "classic",
      defaultHttpClient: { targetKey: "js", clientKey: "fetch" },
      sources: [
        { url: "/api/doc", title: "API" },
      ],
    }),
  );
}
