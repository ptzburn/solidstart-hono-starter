import { createSignal, onMount, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";

import { authClient } from "~/client/lib/auth-client.ts";
import { Spinner } from "~/client/components/ui/spinner.tsx";
import { toast } from "solid-sonner";

function SignOutPage() {
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = createSignal(true);

  onMount(async () => {
    setIsSigningOut(true);

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/auth/sign-in", { replace: true });
        },
        onError: (error) => {
          toast.error(error.error.message);
          navigate(-1);
        },
      },
    });

    setIsSigningOut(false);
  });

  return (
    <div class="flex flex-1 flex-col items-center gap-6 text-center justify-center">
      <Show
        when={isSigningOut()}
      >
        <div class="space-y-4 flex flex-col items-center justify-center">
          <Spinner class="size-10" />
          <div>
            <h1 class="text-2xl font-bold">
              Signing out...
            </h1>
            <p class="text-muted-foreground text-sm text-balance">
              Please wait while we sign you out...
            </p>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default SignOutPage;
