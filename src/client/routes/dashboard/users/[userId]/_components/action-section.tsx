import LoaderCircle from "~icons/lucide/loader-circle";
import Trash2 from "~icons/lucide/trash-2";
import Drama from "~icons/lucide/drama";
import { createSignal, Show } from "solid-js";
import { toast } from "solid-sonner";

import type { SelectUser } from "~/shared/types/auth.ts";

import { DeletionDialog } from "~/client/components/deletion-dialog.tsx";
import { Button } from "~/client/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/client/components/ui/card.tsx";
import { authClient } from "~/client/lib/auth-client.ts";
import { useNavigate } from "@solidjs/router";
import type { Accessor } from "solid-js";

type ImpersonateSectionProps = {
  user: Accessor<SelectUser>;
};

export function ActionSection(props: ImpersonateSectionProps) {
  const navigate = useNavigate();

  const [isImpersonating, setIsImpersonating] = createSignal(false);
  const [isDeleting, setIsDeleting] = createSignal(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = createSignal(false);

  const handleImpersonate = async () => {
    setIsImpersonating(true);

    await authClient.admin.impersonateUser({
      userId: props.user().id,
    }, {
      onError: (error) => {
        toast.error(error.error.message);
      },
      onSuccess: () => {
        globalThis.location.href = "/chat";
      },
    });

    setIsImpersonating(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    await authClient.admin.removeUser({
      userId: props.user().id,
    }, {
      onError: (error) => {
        toast.error(error.error.message);
        setIsDeleting(false);
      },
      onSuccess: () => {
        toast.success(`User ${props.user().name} deleted`);
        navigate("/users");
      },
    });

    setIsDeleting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
        <CardDescription>
          Manage user
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-3">
        <Button
          onClick={handleImpersonate}
          disabled={isImpersonating() || (props.user().banned ?? false)}
          class="w-full"
          variant="outline"
        >
          <Drama class="size-4 mr-2" />
          <Show when={isImpersonating()} fallback="Impersonate user">
            <LoaderCircle class="size-4 animate-spin" />
          </Show>
        </Button>

        <Button
          variant="destructive"
          class="w-full cursor-pointer"
          disabled={isDeleting()}
          onClick={() => setDeleteDialogOpen(true)}
        >
          <Trash2 class="size-4 mr-2" />
          <Show when={isDeleting()} fallback="Delete user">
            <LoaderCircle class="size-4 animate-spin" />
          </Show>
        </Button>

        <DeletionDialog
          isOpen={deleteDialogOpen}
          setIsOpen={setDeleteDialogOpen}
          isPending={isDeleting()}
          title="Delete user"
          description={`Are you sure you want to delete ${props.user().name}?`}
          buttonText="Delete user"
          icon={<Trash2 />}
          onDelete={handleDelete}
        />
      </CardContent>
    </Card>
  );
}
