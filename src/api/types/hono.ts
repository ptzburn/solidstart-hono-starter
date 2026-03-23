import type { RouteConfig, RouteHandler, z } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";
import { SelectSession, SelectUser } from "~/shared/types/auth.ts";

export type AppBindings = {
  Variables: {
    logger: PinoLogger;
    user: SelectUser;
    session: SelectSession;
  };
};

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;

export type ZodSchema =
  | z.ZodUnion
  | z.ZodObject
  | z.ZodArray<z.ZodObject>
  | z.ZodArray<z.ZodDate>
  | z.ZodArray<z.ZodISODateTime>;
