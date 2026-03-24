import type { AppRouteHandler } from "~/api/types/hono.ts";

import * as filesService from "./services.ts";
import { NO_CONTENT, NOT_FOUND, OK } from "~/shared/http-status.ts";
import { HTTPException } from "hono/http-exception";

import type { RemoveUserAvatarRoute, UploadUserAvatarRoute } from "./routes.ts";
import { auth } from "~/shared/auth.ts";

export const uploadUserAvatar: AppRouteHandler<UploadUserAvatarRoute> = async (
  c,
) => {
  const user = c.get("user");
  const { file } = c.req.valid("form");

  const fileKey = await filesService.uploadUserAvatar(file, user.id);

  await auth.api.updateUser({
    body: {
      image: fileKey,
    },
    headers: c.req.raw.headers,
  });

  return c.json({
    fileKey: fileKey,
  }, OK.CODE);
};

export const removeUserAvatar: AppRouteHandler<RemoveUserAvatarRoute> = async (
  c,
) => {
  const user = c.get("user");

  if (!user.image) {
    throw new HTTPException(NOT_FOUND.CODE, {
      message: NOT_FOUND.MESSAGE,
    });
  }

  await filesService.removeUserAvatar(user.id);

  await auth.api.updateUser({
    body: {
      image: undefined,
    },
    headers: c.req.raw.headers,
  });

  return c.body(null, NO_CONTENT.CODE);
};
