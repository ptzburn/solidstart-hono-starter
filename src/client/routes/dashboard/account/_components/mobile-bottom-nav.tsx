import { useLocation } from "@solidjs/router";
import { cn } from "~/client/lib/utils.ts";
import { For } from "solid-js";
import { A } from "@solidjs/router";

import Database from "~icons/lucide/database";
import GlobeLock from "~icons/lucide/globe-lock";
import Shield from "~icons/lucide/shield";
import User from "~icons/lucide/user";

export const NAV_ITEMS = [
  {
    label: "Account",
    icon: User,
    href: "/dashboard/account",
  },
  {
    label: "Data management",
    icon: Database,
    href: "/dashboard/account/data",
  },
  {
    label: "Security",
    icon: Shield,
    href: "/dashboard/account/security",
  },
  {
    label: "Sessions",
    icon: GlobeLock,
    href: "/dashboard/account/sessions",
  },
];

export function AccountBottomNav() {
  const location = useLocation();

  const isActive = (href: string) => {
    const normalizedPath = location.pathname.endsWith("/")
      ? location.pathname.slice(0, -1)
      : location.pathname;
    return normalizedPath === href;
  };

  return (
    <nav class="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background md:hidden">
      <ul class="flex items-center justify-around">
        <For
          each={NAV_ITEMS}
        >
          {(item) => (
            <li>
              <A
                href={item.href}
                class={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 text-[0.625rem] font-medium transition-colors",
                  isActive(item.href)
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                <item.icon class="size-5" />
                <span class="truncate max-w-16">
                  {item.label}
                </span>
              </A>
            </li>
          )}
        </For>
      </ul>
    </nav>
  );
}
