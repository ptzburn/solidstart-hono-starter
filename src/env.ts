import { z, ZodError } from "zod";
import process from "node:process";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default(
    "development",
  ),
  LOG_LEVEL: z.enum([
    "fatal",
    "error",
    "warn",
    "info",
    "debug",
    "trace",
    "silent",
  ]).default("info"),
  DATABASE_URL: z.url(),
  DATABASE_AUTH_TOKEN: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.url(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  VITE_TURNSTILE_SITE_KEY: z.string(),
  VITE_TURNSTILE_SECRET_KEY: z.string(),
  VITE_HOST_URL: z.url(),
  RESEND_API_KEY: z.string(),
  RESEND_EMAIL: z.email(),
  SEVEN_IO_API_KEY: z.string(),
});

export type env = z.infer<typeof EnvSchema>;

let env: env;

try {
  env = EnvSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    const missingValues = Object.keys(z.flattenError(error).fieldErrors)
      .join(
        "\n",
      );
    console.error("Missing required variables in .env:\n" + missingValues);
  }
  process.exit(1);
}

export default env;
