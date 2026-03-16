import { createRoute, z } from "@hono/zod-openapi";
import * as httpStatus from "~/shared/http-status.ts";
import jsonContent from "~/api/utils/json-content.ts";
import jsonContentRequired from "~/api/utils/json-content-required.ts";
import createErrorSchema from "~/api/utils/open-api-schemas/create-error.schema.ts";
import IdParamsSchema from "~/api/utils/open-api-schemas/id-params.schema.ts";

import {
  InsertTaskSchema,
  SelectTaskSchema,
  UpdateTaskSchema,
} from "~/api/db/schema/task.ts";
import { notFoundSchema } from "~/api/lib/constants.ts";

const tags = ["Tasks"];

export const list = createRoute({
  path: "/tasks",
  method: "get",
  tags,
  responses: {
    [httpStatus.OK.CODE]: jsonContent(
      z.array(SelectTaskSchema),
      "The list of tasks",
    ),
  },
});

export const create = createRoute({
  path: "/tasks",
  method: "post",
  request: {
    body: jsonContentRequired(
      InsertTaskSchema,
      "The task to create",
    ),
  },
  tags,
  responses: {
    [httpStatus.OK.CODE]: jsonContent(
      SelectTaskSchema,
      "The created task",
    ),
    [httpStatus.UNPROCESSABLE_ENTITY.CODE]: jsonContent(
      createErrorSchema(InsertTaskSchema),
      "The validation error(s)",
    ),
  },
});

export const getOne = createRoute({
  path: "/tasks/{id}",
  method: "get",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [httpStatus.OK.CODE]: jsonContent(
      SelectTaskSchema,
      "The requested task",
    ),
    [httpStatus.NOT_FOUND.CODE]: jsonContent(
      notFoundSchema,
      "Task not found",
    ),
    [httpStatus.UNPROCESSABLE_ENTITY.CODE]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export const patch = createRoute({
  path: "/tasks/{id}",
  method: "patch",
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(
      UpdateTaskSchema,
      "The task updates",
    ),
  },
  tags,
  responses: {
    [httpStatus.OK.CODE]: jsonContent(
      SelectTaskSchema,
      "The updated task",
    ),
    [httpStatus.NOT_FOUND.CODE]: jsonContent(
      notFoundSchema,
      "Task not found",
    ),
    [httpStatus.UNPROCESSABLE_ENTITY.CODE]: jsonContent(
      createErrorSchema(UpdateTaskSchema)
        .or(createErrorSchema(IdParamsSchema)),
      "The validation error(s)",
    ),
  },
});

export const remove = createRoute({
  path: "/tasks/{id}",
  method: "delete",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [httpStatus.NO_CONTENT.CODE]: {
      description: "Task deleted",
    },
    [httpStatus.NOT_FOUND.CODE]: jsonContent(
      notFoundSchema,
      "Task not found",
    ),
    [httpStatus.UNPROCESSABLE_ENTITY.CODE]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
