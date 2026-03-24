import { createSignal } from "solid-js";
import { toast } from "solid-sonner";
import { authClient } from "~/client/lib/auth-client.ts";
import { DeletionDialog } from "~/client/components/deletion-dialog.tsx";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "~/client/components/ui/item.tsx";
import { Button } from "~/client/components/ui/button.tsx";
import Mail from "~icons/lucide/mail";

function AccountDataPage() {
  const [isOpen, setIsOpen] = createSignal(false);
  const [isAccountDeleting, setIsAccountDeleting] = createSignal(false);

  const handleAccountDelete = async () => {
    setIsAccountDeleting(true);
    await authClient.deleteUser({}, {
      onSuccess: () => {
        setIsOpen(false);
      },
      onError: (error) => {
        toast.error(error.error.message || "Failed to delete account");
      },
    });
    setIsAccountDeleting(false);
  };

  return (
    <div class="flex flex-1 flex-col container py-4 md:py-8 pb-20 md:pb-8 gap-10">
      <div>
        <h2>Data</h2>
        <p class="text-muted-foreground">
          Manage your account data.
        </p>
      </div>
      <ItemGroup class="rounded-lg border bg-card">
        <Item>
          <ItemContent>
            <ItemTitle>Delete account</ItemTitle>
            <ItemDescription>
              Permanently delete your account and all associated data.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(true)}
              disabled={isAccountDeleting()}
            >
              Delete account
            </Button>
          </ItemActions>
        </Item>
      </ItemGroup>

      <DeletionDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isPending={isAccountDeleting()}
        title="Delete account"
        description="We will send you an email with a link to delete your account. Clicking the link will permanently delete your account and all associated data. This action cannot be undone."
        buttonText="Send deletion link"
        icon={<Mail />}
        onDelete={handleAccountDelete}
      />
    </div>
  );
}

export default AccountDataPage;
