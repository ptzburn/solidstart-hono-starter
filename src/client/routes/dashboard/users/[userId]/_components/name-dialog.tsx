import { Accessor, Setter } from "solid-js";
import { ResponsiveEditDialog } from "~/client/components/responsive-edit-dialog.tsx";
import { useAppForm } from "~/client/hooks/use-app-form.ts";
import z from "zod";
import { authClient } from "~/client/lib/auth-client.ts";
import { revalidate } from "@solidjs/router";
import { toast } from "solid-sonner";
import type { SelectUser } from "~/shared/types/auth.ts";
import { getUserByIdQuery } from "~/client/queries/users.ts";

type NameDialogProps = {
  user: Accessor<SelectUser>;
  isOpen: Accessor<boolean>;
  setIsOpen: Setter<boolean>;
};

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const [firstName = "", ...rest] = parts;
  return {
    firstName,
    lastName: rest.join(" "),
  };
}

export function NameDialog(props: NameDialogProps) {
  const form = useAppForm(() => ({
    defaultValues: splitName(props.user().name),
    validators: {
      onSubmit: z.object({
        firstName: z.string().trim().min(1),
        lastName: z.string().trim().min(1),
      }),
    },
    onSubmit: async ({ formApi, value }) => {
      const fullName = [value.firstName.trim(), value.lastName.trim()]
        .filter(Boolean)
        .join(" ");

      await authClient.admin.updateUser(
        {
          userId: props.user().id,
          data: { name: fullName },
        },
        {
          onSuccess: () => {
            formApi.reset();
            revalidate(getUserByIdQuery.keyFor(props.user().id));
            props.setIsOpen(false);
            toast.success("Name updated");
          },
          onError: (error) => {
            toast.error(error.error.message || "Failed to update name");
          },
        },
      );
    },
  }));

  return (
    <ResponsiveEditDialog
      isOpen={props.isOpen}
      setIsOpen={props.setIsOpen}
      title="Edit name"
    >
      {() => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          class="space-y-4"
        >
          <div class="grid gap-4 md:grid-cols-2">
            <form.AppField name="firstName">
              {(field) => (
                <field.TextField
                  label="First name"
                  placeholder="First name"
                />
              )}
            </form.AppField>
            <form.AppField name="lastName">
              {(field) => (
                <field.TextField
                  label="Last name"
                  placeholder="Last name"
                />
              )}
            </form.AppField>
          </div>
          <form.AppForm>
            <form.SubmitButton>Save</form.SubmitButton>
          </form.AppForm>
        </form>
      )}
    </ResponsiveEditDialog>
  );
}
