import { toast } from "solid-sonner";
import z from "zod";

import { useAppForm } from "~/client/hooks/use-app-form.ts";
import { authClient } from "~/client/lib/auth-client.ts";
import { createSignal } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { Turnstile } from "@nerimity/solid-turnstile";

const formSchema = z.object({
  email: z.email(),
});

function ForgotPasswordPage() {
  const [turnstileToken, setTurnstileToken] = createSignal<string>();
  const navigate = useNavigate();

  const form = useAppForm(() => ({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const { email } = value;
      await authClient.requestPasswordReset({
        email,
        redirectTo: `${import.meta.env.VITE_HOST_URL}/auth/reset-password`,
        fetchOptions: {
          headers: {
            "x-captcha-response": turnstileToken() ?? "",
          },
          onError: (error) => {
            toast.error(
              error.error.message ||
                "An error occurred while requesting the password reset.",
            );
          },
          onSuccess: () => {
            toast.success("Password reset request sent successfully.");
            navigate("/auth/sign-in");
          },
        },
      });
    },
  }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      class="space-y-8"
    >
      <div class="flex flex-col items-center gap-2 text-center">
        <h1 class="text-2xl font-bold">Forgot Password</h1>
        <p class="text-muted-foreground text-sm text-balance">
          Enter your email to request a password reset.
        </p>
      </div>
      <div class="grid gap-6">
        <form.AppField name="email">
          {(field) => (
            <field.TextField
              label="Email"
              type="email"
              placeholder="example@gmail.com"
            />
          )}
        </form.AppField>
        <div class="flex justify-center">
          <Turnstile
            sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
            onVerify={setTurnstileToken}
            autoResetOnExpire
          />
        </div>
        <form.AppForm>
          <form.SubmitButton disabled={!turnstileToken()}>
            Request Password Reset
          </form.SubmitButton>
        </form.AppForm>
      </div>
      <div class="text-center text-sm">
        Remember your password?{" "}
        <A href="/auth/sign-in" class="underline underline-offset-4">
          Sign In
        </A>
      </div>
    </form>
  );
}

export default ForgotPasswordPage;
