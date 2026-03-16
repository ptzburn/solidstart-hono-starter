import type { ZodSchema } from "~/api/lib/types.ts";

const jsonContent = <
  T extends ZodSchema,
>(schema: T, description: string) => {
  return {
    content: {
      "application/json": {
        schema,
      },
    },
    description,
  };
};

export default jsonContent;
