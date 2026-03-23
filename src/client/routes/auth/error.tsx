import CircleAlert from "~icons/lucide/circle-alert";
import House from "~icons/lucide/house";
import { A, Navigate, useSearchParams } from "@solidjs/router";

import { Button } from "~/client/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/client/components/ui/card.tsx";

function formatErrorMessage(value: string | string[]): string {
  let message: string;

  if (typeof value === "string") {
    message = value;
  } else {
    message = value[0];
  }
  // Replace underscores with spaces
  const formatted = message.replace(/_/g, " ");
  // Capitalize first letter and make rest lowercase
  return formatted.charAt(0).toUpperCase() + formatted.slice(1).toLowerCase();
}

export default function ErrorPage() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const rawError = searchParams.error || "tapahtui_tuntematon_virhe";

  // Redirect to sign-up page if error is signup_disabled
  const message = typeof rawError === "string" ? rawError : rawError[0];
  if (message === "signup_disabled") {
    return <Navigate href="/auth/sign-up" />;
  }

  const errorMessage = formatErrorMessage(rawError);

  return (
    <div class="flex min-h-screen items-center justify-center bg-linear-to-br from-background via-background to-muted/20 p-4">
      <div class="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card class="border-destructive/20 shadow-lg">
          <CardHeader class="text-center">
            <div class="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-destructive/10">
              <CircleAlert class="size-8 text-destructive" />
            </div>
            <CardTitle class="text-2xl">
              Something went wrong
            </CardTitle>
            <CardDescription class="text-base">
              An error occurred while processing your request
            </CardDescription>
          </CardHeader>

          <CardContent class="space-y-4">
            <div class="rounded-lg bg-muted/50 p-4">
              <div class="mb-1 flex items-center gap-2">
                <span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Error details
                </span>
              </div>
              <p class="text-sm text-foreground/80 wrap-break-words">
                {errorMessage}
              </p>
            </div>
          </CardContent>

          <CardFooter class="flex flex-col gap-2 sm:flex-row justify-center">
            <A href="/auth/sign-in">
              <Button
                variant="default"
                class="w-full sm:flex-1"
              >
                <House class="mr-2 size-4" />
                Go back to home
              </Button>
            </A>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
