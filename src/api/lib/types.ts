import { z } from "zod";
import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;

export type ZodIssue = z.core.$ZodIssue;
export type ZodSchema =
  | z.ZodUnion
  | z.ZodObject
  | z.ZodArray<z.ZodObject>
  | z.ZodArray<z.ZodDate>;
