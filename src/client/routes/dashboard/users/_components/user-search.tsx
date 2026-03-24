import { createSignal, Show } from "solid-js";
import Plus from "~icons/lucide/plus";
import Search from "~icons/lucide/search";

import { Button } from "~/client/components/ui/button.tsx";
import { FieldGroup, FieldSet } from "~/client/components/ui/field.tsx";
import { Separator } from "~/client/components/ui/separator.tsx";
import { ResponsiveEditDialog } from "~/client/components/responsive-edit-dialog.tsx";
import { useAppForm } from "~/client/hooks/use-app-form.ts";

const getRoleOptions = () => [
  { value: "admin", label: "Admin" },
  { value: "user", label: "Client" },
];

export type UserFilters = {
  name: string;
  email: string;
  role: string;
};

type UserSearchProps = {
  onSubmit: (filters: UserFilters) => void;
  onClear: () => void;
};

const defaultValues: UserFilters = { name: "", email: "", role: "" };

export function UserSearch(props: UserSearchProps) {
  const [isDialogOpen, setIsDialogOpen] = createSignal(false);

  const form = useAppForm(() => ({
    defaultValues,
    onSubmit: ({ value }) => {
      setIsDialogOpen(false);
      props.onSubmit(value);
    },
  }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      class="space-y-4"
    >
      <FieldSet class="grid grid-cols-2">
        <FieldGroup>
          <form.AppField name="name">
            {(field) => (
              <field.TextField
                label="Name"
                placeholder="Name"
              />
            )}
          </form.AppField>
        </FieldGroup>

        <FieldGroup>
          <form.AppField name="email">
            {(field) => (
              <field.TextField
                label="Email"
                placeholder="Email"
              />
            )}
          </form.AppField>
        </FieldGroup>
      </FieldSet>

      <Separator />

      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <form.Subscribe selector={(state) => state.values}>
          {(values) => {
            const activeCount = () => values().role ? 1 : 0;
            return (
              <Button
                variant="ghost"
                class="w-full sm:w-auto justify-center"
                type="button"
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus class="h-4 w-4" />
                Filters all criteria
                <Show when={activeCount() > 0}>
                  <span class="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground">
                    {activeCount()}
                  </span>
                </Show>
              </Button>
            );
          }}
        </form.Subscribe>
        <div class="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            class="flex-1 sm:flex-none sm:w-24"
            onClick={() => {
              form.reset();
              props.onClear();
            }}
          >
            Clear
          </Button>
          <form.AppForm>
            <div class="flex-1 sm:flex-none sm:w-32">
              <form.SubmitButton variant="default">
                <Search />
                Search
              </form.SubmitButton>
            </div>
          </form.AppForm>
        </div>
      </div>

      <ResponsiveEditDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        title="Filters all criteria"
        description="Select a role to filter users by."
      >
        {() => (
          <div class="space-y-6 pb-4">
            <FieldSet>
              <FieldGroup>
                <form.AppField name="role">
                  {(field) => (
                    <field.SelectField
                      label="Role"
                      placeholder="Select role"
                      options={getRoleOptions()}
                    />
                  )}
                </form.AppField>
              </FieldGroup>
            </FieldSet>

            <Separator />

            <div class="flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.setFieldValue("role", "");
                }}
              >
                Clear
              </Button>
              <Button
                type="button"
                onClick={() => form.handleSubmit()}
              >
                <Search class="h-4 w-4" />
                Apply filters
              </Button>
            </div>
          </div>
        )}
      </ResponsiveEditDialog>
    </form>
  );
}
