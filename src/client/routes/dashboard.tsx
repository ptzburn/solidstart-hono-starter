import { ErrorBoundary, Show, Suspense } from "solid-js";
import { createAsync, type RouteSectionProps } from "@solidjs/router";
import { Spinner } from "~/client/components/ui/spinner.tsx";
import { SessionProvider } from "~/client/contexts/session-context.tsx";
import { getSessionQuery } from "~/client/queries/auth.ts";
import { HeaderNav } from "./dashboard/_components/header-nav.tsx";
import { ErrorBoundaryMessage } from "~/client/components/error-boundary-message.tsx";

export default function DashboardLayout(props: RouteSectionProps) {
  const session = createAsync(() => getSessionQuery());

  return (
    <div class="flex flex-col flex-1 min-h-0">
      <ErrorBoundary
        fallback={(error) => <ErrorBoundaryMessage error={error} />}
      >
        <Suspense
          fallback={
            <div class="flex flex-1 items-center justify-center">
              <Spinner class="size-10" />
            </div>
          }
        >
          <Show
            when={session()}
          >
            {(sessionData) => (
              <SessionProvider
                user={sessionData().user}
                session={sessionData().session}
              >
                <header>
                  <HeaderNav />
                </header>
                <main class="flex-1 flex flex-col min-h-0 md:pb-0">
                  {props.children}
                </main>
              </SessionProvider>
            )}
          </Show>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
