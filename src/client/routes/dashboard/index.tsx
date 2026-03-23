import { For, Show, Suspense } from "solid-js";
import { createForm } from "@tanstack/solid-form";
import {
  createAsync,
  revalidate,
  useAction,
  useSubmission,
} from "@solidjs/router";
import { getTasksQuery } from "~/client/queries/tasks.ts";
import {
  createTaskAction,
  deleteTaskAction,
  updateTaskAction,
} from "~/client/actions/tasks.ts";
import { Button } from "~/client/components/ui/button.tsx";
import { Input } from "~/client/components/ui/input.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/client/components/ui/card.tsx";
import { Checkbox } from "~/client/components/ui/checkbox.tsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/client/components/ui/alert-dialog.tsx";
import { cn } from "~/client/lib/utils.ts";
import { toast } from "solid-sonner";

type NewTaskForm = {
  name: string;
};

export default function Main() {
  const tasks = createAsync(() => getTasksQuery());

  const createTask = useAction(createTaskAction);
  const createSubmission = useSubmission(createTaskAction);

  const updateTask = useAction(updateTaskAction);

  const deleteTask = useAction(deleteTaskAction);

  const form = createForm(() => ({
    defaultValues: {
      name: "",
    } as NewTaskForm,
    onSubmit: async ({ value }) => {
      const name = value.name.trim();
      if (!name) return;
      try {
        await createTask({ name, done: false });
        revalidate(getTasksQuery.key);
        form.reset();
      } catch (error) {
        toast.error(
          Error.isError(error) ? error.message : "Failed to create task",
        );
      }
    },
  }));

  async function toggleTask(id: number, done: boolean) {
    try {
      await updateTask(String(id), { done });
      revalidate(getTasksQuery.key);
    } catch (error) {
      toast.error(
        Error.isError(error) ? error.message : "Failed to update task",
      );
    }
  }

  async function onDeleteTask(id: number) {
    try {
      await deleteTask(String(id));
      revalidate(getTasksQuery.key);
    } catch (error) {
      toast.error(
        Error.isError(error) ? error.message : "Failed to delete task",
      );
    }
  }

  return (
    <div class="mx-auto max-w-xl space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>To-do</CardTitle>
          <CardDescription>
            Add and manage tasks. Tap to toggle done.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <form
            class="flex flex-col gap-2 sm:flex-row sm:items-start"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) =>
                  value.trim().length === 0
                    ? "Name is required"
                    : value.length > 500
                    ? "Name must be 500 characters or less"
                    : undefined,
              }}
            >
              {(field) => (
                <div class="flex flex-1 flex-col gap-1">
                  <Input
                    placeholder="New task..."
                    value={field().state.value}
                    onInput={(e) =>
                      field().handleChange(
                        e.target.value,
                      )}
                    onBlur={field().handleBlur}
                    disabled={createSubmission.pending}
                    class="flex-1"
                    aria-invalid={field().state.meta.errors
                      .length > 0}
                  />
                  <Show
                    when={field().state.meta.errors.length >
                      0}
                  >
                    <p
                      id={`task-name-${field().name}-error`}
                      class="text-sm text-destructive"
                    >
                      {field().state.meta.errors.join(
                        ", ",
                      )}
                    </p>
                  </Show>
                </div>
              )}
            </form.Field>
            <Button
              type="submit"
              disabled={createSubmission.pending}
              class="sm:mt-0"
            >
              Add
            </Button>
          </form>
          <Suspense
            fallback={
              <p class="text-center text-sm text-muted-foreground">
                Loading tasks…
              </p>
            }
          >
            <Show when={tasks()}>
              {(tasks) => (
                <Show
                  when={tasks().length > 0}
                  fallback={
                    <p class="text-center text-sm text-muted-foreground">
                      No tasks yet. Add one above.
                    </p>
                  }
                >
                  <ul class="space-y-2">
                    <For each={tasks()}>
                      {(task) => (
                        <li class="flex items-center gap-3 rounded-md border bg-card px-3 py-2">
                          <Checkbox
                            checked={task.done}
                            onChange={(v) =>
                              toggleTask(
                                task.id,
                                !!v,
                              )}
                            aria-label={task.name}
                          />
                          <span
                            class={cn(
                              "flex-1 text-sm",
                              task.done &&
                                "text-muted-foreground line-through",
                            )}
                          >
                            {task.name}
                          </span>
                          <AlertDialog>
                            <AlertDialogTrigger
                              as={Button}
                              variant="ghost"
                              size="icon-sm"
                              aria-label="Delete"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="size-4"
                              >
                                <path d="M3 6h18" />
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                <line
                                  x1="10"
                                  x2="10"
                                  y1="11"
                                  y2="17"
                                />
                                <line
                                  x1="14"
                                  x2="14"
                                  y1="11"
                                  y2="17"
                                />
                              </svg>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete task?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  "{task
                                    .name}" will be removed. This can't be
                                  undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  onClick={() =>
                                    onDeleteTask(
                                      task.id,
                                    )}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </li>
                      )}
                    </For>
                  </ul>
                </Show>
              )}
            </Show>
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
