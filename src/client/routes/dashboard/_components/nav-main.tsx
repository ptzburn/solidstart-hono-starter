import { For, Show } from "solid-js";
import House from "~icons/lucide/house";
import UserIcon from "~icons/lucide/user";

import { cn } from "~/client/lib/utils.ts";
import { A, useLocation } from "@solidjs/router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLabel,
  NavigationMenuLink,
} from "~/client/components/ui/navigation-menu.tsx";
import { useSession } from "~/client/contexts/session-context.tsx";

interface NavMainProps {
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
  class?: string;
}

const items = (
  pathname: string,
) => [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: House,
    isActive: pathname === "/dashboard",
  },
];

export function NavMain(props: NavMainProps) {
  const location = useLocation();
  const session = useSession();

  const isVertical = () => props.orientation === "vertical";

  return (
    <NavigationMenu
      orientation={props.orientation ?? "horizontal"}
      class={cn(
        "flex gap-1",
        isVertical() ? "flex-col w-full" : "flex-row",
        props.class,
      )}
    >
      <For
        each={items(
          location.pathname,
        )}
      >
        {(item) => (
          <NavigationMenuItem>
            <NavigationMenuLink
              as={A}
              href={item.url}
              onClick={props.onNavigate}
              class={cn(
                "hover:cursor-pointer inline-flex items-center gap-2",
                item.isActive &&
                  "bg-accent text-accent-foreground",
                isVertical() && "w-full",
              )}
            >
              <Show when={item.icon}>
                {<item.icon class="size-4" />}
              </Show>
              <NavigationMenuLabel class="inline-flex items-center gap-1">
                <span>{item.title}</span>
              </NavigationMenuLabel>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </For>

      {/* Admin Menu */}
      <Show when={session.user.role === "admin"}>
        <NavigationMenuItem>
          <NavigationMenuLink
            as={A}
            href="/dashboard/users"
            onClick={props.onNavigate}
            class={cn(
              "hover:cursor-pointer inline-flex items-center gap-2",
              location.pathname.startsWith("/users") &&
                "bg-accent",
              isVertical() && "w-full",
            )}
          >
            <UserIcon class="size-4" />
            <NavigationMenuLabel>
              Users
            </NavigationMenuLabel>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </Show>
    </NavigationMenu>
  );
}
