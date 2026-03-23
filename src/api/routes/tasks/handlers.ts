import { eq } from "drizzle-orm";
import * as httpStatus from "~/shared/http-status.ts";

import type { AppRouteHandler } from "~/api/types/hono.ts";

import db from "~/api/db/index.ts";
import { tasks } from "~/api/db/schema/task.ts";
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from "~/api/lib/constants.ts";

import type {
  CreateRoute,
  GetOneRoute,
  ListRoute,
  PatchRoute,
  RemoveRoute,
} from "./routes.ts";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await db.query.tasks.findMany();
  return c.json(tasks);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const task = c.req.valid("json");
  const [inserted] = await db.insert(tasks).values(task).returning();
  return c.json(inserted, httpStatus.OK.CODE);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const task = await db.query.tasks.findFirst({
    where: {
      id,
    },
  });

  if (!task) {
    return c.json(
      {
        message: httpStatus.NOT_FOUND.MESSAGE,
      },
      httpStatus.NOT_FOUND.CODE,
    );
  }

  return c.json(task, httpStatus.OK.CODE);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");

  if (Object.keys(updates).length === 0) {
    return c.json(
      {
        success: false,
        error: {
          issues: [
            {
              code: ZOD_ERROR_CODES.INVALID_UPDATES,
              path: [],
              message: ZOD_ERROR_MESSAGES.NO_UPDATES,
            },
          ],
          name: "ZodError",
        },
      },
      httpStatus.UNPROCESSABLE_ENTITY.CODE,
    );
  }

  const [task] = await db.update(tasks)
    .set(updates)
    .where(eq(tasks.id, id))
    .returning();

  if (!task) {
    return c.json(
      {
        message: httpStatus.NOT_FOUND.MESSAGE,
      },
      httpStatus.NOT_FOUND.CODE,
    );
  }

  return c.json(task, httpStatus.OK.CODE);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const result = await db.delete(tasks)
    .where(eq(tasks.id, id));

  if (result.rowsAffected === 0) {
    return c.json(
      {
        message: httpStatus.NOT_FOUND.MESSAGE,
      },
      httpStatus.NOT_FOUND.CODE,
    );
  }

  return c.body(null, httpStatus.NO_CONTENT.CODE);
};
