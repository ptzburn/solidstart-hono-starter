import type { NotFoundHandler } from "hono";

import { NOT_FOUND } from "~/shared/http-status.ts";

const notFound: NotFoundHandler = (c) => {
  return c.json({
    message: `${NOT_FOUND.MESSAGE} - ${c.req.path}`,
  }, NOT_FOUND.CODE);
};

export default notFound;
