import { z } from "zod";
import {
  InsertTaskSchema,
  SelectTaskSchema,
  UpdateTaskSchema,
} from "~/api/db/schema/task.ts";

export type InsertTask = z.infer<typeof InsertTaskSchema>;
export type SelectTask = z.infer<typeof SelectTaskSchema>;
export type UpdateTask = z.infer<typeof UpdateTaskSchema>;
