import { z } from "@hono/zod-openapi";

const ImageFileSchema = z.object({
  file: z.instanceof(File)
    .refine(
      (file) => file.type.startsWith("image/"),
      {
        message: "Invalid file type. Only images are allowed.",
      },
    )
    .refine(
      (file) => file.size <= 10 * 1024 * 1024, // 10MB
      {
        message: "File too large. Maximum size is 10MB.",
      },
    )
    .openapi({
      type: "string",
      format: "binary",
    }),
});

export default ImageFileSchema;
