import { query } from "@solidjs/router";
import { rpcClient } from "~/shared/rpc-client.ts";

export const getTasksQuery = query(async () => {
    const response = await rpcClient.tasks.$get();

    return await response.json();
}, "tasks");

export const getTaskQuery = query(async (id: string) => {
    const response = await rpcClient.tasks[":id"].$get({
        param: { id },
    });

    if (!response.ok) {
        const error = await response.json();
        if ("error" in error) {
            throw new Error(error.error.issues[0].message);
        }
        throw new Error(error.message);
    }

    return await response.json();
}, "task");
