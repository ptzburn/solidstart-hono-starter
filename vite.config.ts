import { defineConfig } from "vite";
import { nitroV2Plugin as nitro } from "@solidjs/vite-plugin-nitro-2";
import deno from "@deno/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import "./src/env.ts";

import { solidStart } from "@solidjs/start/config";

export default defineConfig({
  plugins: [
    tailwindcss(),
    solidStart({
      routeDir: "./client/routes",
    }),
    nitro({
      preset: "deno_server",
      compatibilityDate: "2026-03-20",
    }),
    deno(),
    {
      name: "deno-ssr-stream-fix",
      enforce: "post",
      configureServer() {
        // Under Deno, srvx resolves to its "deno" adapter where FastResponse is
        // the standard Response constructor. SolidStart's handler returns a raw
        // Solid stream object when USING_SOLID_START_DEV_SERVER is true, relying
        // on srvx's NodeResponse to handle pipe-able bodies. The standard Response
        // cannot handle this custom stream, stringifying it to "[object Object]".
        // Disabling the flag forces the handler to convert the stream to a proper
        // ReadableStream via TransformStream, which works with any Response impl.
        return () => {
          (globalThis as Record<string, unknown>).USING_SOLID_START_DEV_SERVER =
            false;
        };
      },
    },
  ],
});
