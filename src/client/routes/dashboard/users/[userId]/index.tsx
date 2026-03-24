import { Show, Suspense } from "solid-js";
import { AccountDetails } from "./_components/account-details.tsx";
import { ActionSection } from "./_components/action-section.tsx";
import { Hero } from "./_components/hero.tsx";
import { createAsync, useParams } from "@solidjs/router";
import { getUserByIdQuery } from "~/client/queries/users.ts";

export default function UserDetailPage() {
  const params = useParams<{ userId: string }>();

  const user = createAsync(() => getUserByIdQuery(params.userId));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Show when={user()}>
        {(user) => (
          <div class="flex flex-1 flex-col gap-4 p-4 pt-2">
            <div class="max-w-5xl mx-auto space-y-8 w-full">
              {/* Hero Section */}
              <Hero user={user} />

              {/* Main Content Grid */}
              <div class="grid gap-6 md:grid-cols-3">
                {/* Left Column - Main Info */}
                <div class="md:col-span-2 space-y-6">
                  <AccountDetails user={user} />
                </div>

                {/* Right Column - Actions & Status */}
                <div class="space-y-6">
                  <div class="sticky top-6 space-y-6">
                    <ActionSection user={user} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Show>
    </Suspense>
  );
}
