import {
  createAsync,
  query,
  redirect,
  type RouteSectionProps,
} from "@solidjs/router";
import { auth } from "~/shared/auth.ts";
import { getRequestEvent } from "solid-js/web";
import { ThemeToggle } from "~/client/components/theme-toggle.tsx";

const getSession = query(async () => {
  "use server";
  const event = getRequestEvent();
  if (event) {
    const headers = event.request.headers;
    const url = new URL(event.request.url);
    const path = url.pathname.split("/").pop() || "";

    const session = await auth.api.getSession({
      headers,
    });

    if (session && path !== "sign-out") {
      throw redirect("/chat");
    }
    return session;
  }
}, "session");

export default function AuthLayout(props: RouteSectionProps) {
  createAsync(() => getSession());

  return (
    <div class="grid lg:grid-cols-2 flex-1 min-h-0">
      <div class="flex flex-col gap-4 p-6 md:p-10">
        <header class="flex items-center justify-end gap-2">
          <ThemeToggle />
        </header>
        <div class="flex flex-1 items-center justify-center min-h-0">
          <div class="w-full max-w-xs">
            {props.children}
          </div>
        </div>
      </div>
      <div class="relative hidden lg:flex items-center justify-center p-8 overflow-hidden bg-muted">
      </div>
    </div>
  );
}
