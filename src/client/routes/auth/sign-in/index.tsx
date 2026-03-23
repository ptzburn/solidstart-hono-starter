import { createSignal, onMount, Show } from "solid-js";
import SignInForm from "../_components/sign-in-form.tsx";
import { authClient } from "~/client/lib/auth-client.ts";
import { toast } from "solid-sonner";
import { Button } from "~/client/components/ui/button.tsx";
import { Spinner } from "~/client/components/ui/spinner.tsx";
import { Badge } from "~/client/components/ui/badge.tsx";
import { A, useNavigate } from "@solidjs/router";
import { Separator } from "~/client/components/ui/separator.tsx";
import FingerprintPattern from "~icons/lucide/fingerprint-pattern";
import Fa7BrandsGoogle from "~icons/fa7-brands/google";
import Fa7BrandsMicrosoft from "~icons/fa7-brands/microsoft";

function LastUsedBadge() {
  return (
    <Badge class="absolute -top-2 -right-2 text-[10px] px-1.5 py-0">
      Last used
    </Badge>
  );
}

function SignInPage() {
  const [isLoading, setIsLoading] = createSignal(false);
  const [showEmailForm, setShowEmailForm] = createSignal(false);
  const [lastLoginMethod, setLastLoginMethod] = createSignal<string | null>(
    null,
  );
  const navigate = useNavigate();

  async function handleGoogleSignIn() {
    setIsLoading(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
      fetchOptions: {
        onError: (error) => {
          navigate("/auth/sign-in");
          toast.error(
            error.error.message || "An error occurred while signing in",
          );
        },
      },
    });
    setIsLoading(false);
  }

  async function handleMicrosoftSignIn() {
    setIsLoading(true);
    await authClient.signIn.social({
      provider: "microsoft",
      callbackURL: "/dashboard",
      errorCallbackURL: "/auth/error",
      fetchOptions: {
        onError: (error) => {
          navigate("/auth/sign-in");
          toast.error(
            error.error.message || "An error occurred while signing in",
          );
        },
      },
    });
    setIsLoading(false);
  }

  async function handlePasskeySignIn() {
    setIsLoading(true);
    await authClient.signIn.passkey({
      fetchOptions: {
        onSuccess: () => {
          globalThis.location.href = "/dashboard";
        },
        onError: (ctx) => {
          toast.error(
            ctx.error.message || "An error occurred while signing in",
          );
        },
      },
    });
    setIsLoading(false);
  }

  onMount(() => {
    setLastLoginMethod(authClient.getLastUsedLoginMethod());
  });

  return (
    <>
      <div class="space-y-8">
        <div class="flex flex-col items-center gap-2 text-center">
          <h1 class="text-2xl font-bold">Sign in</h1>
        </div>
        <Show
          when={!showEmailForm()}
          fallback={<SignInForm setter={setShowEmailForm} />}
        >
          <div class="grid gap-6">
            <Button
              variant="outline"
              class="w-full relative"
              type="button"
              onClick={handleMicrosoftSignIn}
              disabled={isLoading()}
            >
              <Show
                when={isLoading()}
                fallback={<Fa7BrandsMicrosoft class="size-5" />}
              >
                <Spinner />
              </Show>
              Sign in with Microsoft
              <Show when={lastLoginMethod() === "microsoft"}>
                <LastUsedBadge />
              </Show>
            </Button>

            <Button
              variant="outline"
              class="w-full relative"
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading()}
            >
              <Show
                when={isLoading()}
                fallback={<Fa7BrandsGoogle class="size-5" />}
              >
                <Spinner />
              </Show>
              Sign in with Google
              <Show when={lastLoginMethod() === "google"}>
                <LastUsedBadge />
              </Show>
            </Button>

            <Button
              variant="outline"
              class="w-full relative"
              type="button"
              onClick={handlePasskeySignIn}
              disabled={isLoading()}
            >
              <Show
                when={isLoading()}
                fallback={<FingerprintPattern class="size-5" />}
              >
                <Spinner />
              </Show>
              Sign in with Passkey
              <Show when={lastLoginMethod() === "passkey"}>
                <LastUsedBadge />
              </Show>
            </Button>

            <Separator />

            <Button
              variant="outline"
              class="w-full relative"
              type="button"
              onClick={() => setShowEmailForm(true)}
              disabled={isLoading()}
            >
              Continue with email
              <Show when={lastLoginMethod() === "email"}>
                <LastUsedBadge />
              </Show>
            </Button>
          </div>
        </Show>

        <div class="text-center text-sm">
          Don't have an account?{"  "}
          <A
            href="/auth/sign-up"
            class="underline underline-offset-4"
          >
            Sign up
          </A>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
