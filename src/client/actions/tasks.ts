import { action } from "@solidjs/router";
import { rpcClient } from "~/shared/rpc-client.ts";
import { UNPROCESSABLE_ENTITY } from "~/shared/http-status.ts";
import type { InsertTask, UpdateTask } from "~/shared/types.ts";

export const createTaskAction = action(
    async (data: InsertTask) => {
        const response = await rpcClient.tasks.$post({
            json: data,
        });

        if (!response.ok) {
            const json = await response.json();
            const errorMessages = json.error.issues.map((e) => Object.values(e))
                .flat()
                .join(", ");
            throw new Error(errorMessages);
        }

        return await response.json();
    },
    "createTask",
);

export const deleteTaskAction = action(
    async (id: string) => {
        const response = await rpcClient.tasks[":id"].$delete({
            param: { id },
        });

        if (!response.ok) {
            const json = await response.json();
            if ("error" in json) {
                const errorMessages = json.error.issues.map((e) =>
                    Object.values(e)
                )
                    .flat().join(", ");
                throw new Error(errorMessages);
            } else {
                throw new Error(json.message);
            }
        }

        return { ok: true };
    },
    "deleteTask",
);

export const updateTaskAction = action(
    async (id: string, json: UpdateTask) => {
        const response = await rpcClient.tasks[":id"].$patch({
            param: { id },
            json,
        });

        if (!response.ok) {
            if (response.status === UNPROCESSABLE_ENTITY.CODE) {
                const error = await response.json();
                const errorMessages = error.error.issues.map((e) =>
                    Object.values(e)
                )
                    .flat()
                    .join(", ");
                throw new Error(errorMessages);
            } else {
                const error = await response.json();
                throw new Error(error.message);
            }
        }

        return await response.json();
    },
    "updateTask",
);
