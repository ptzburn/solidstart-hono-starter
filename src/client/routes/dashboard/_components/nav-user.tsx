import { A } from "@solidjs/router";
import { toast } from "solid-sonner";

import UserCircle from "~icons/lucide/user-circle";
import LogOut from "~icons/lucide/log-out";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/client/components/ui/avatar.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/client/components/ui/dropdown-menu.tsx";
import { authClient } from "~/client/lib/auth-client.ts";
import { cn, getFileUrl, getInitials } from "~/client/lib/utils.ts";
import { Show } from "solid-js";

import { useSession } from "~/client/contexts/session-context.tsx";
import { Button } from "~/client/components/ui/button.tsx";

interface NavUserProps {
  variant?: "dropdown" | "list";
  onNavigate?: () => void;
}

export function NavUser(props: NavUserProps) {
  const session = useSession();

  const handleStopImpersonating = async () => {
    await authClient.admin.stopImpersonating({
      fetchOptions: {
        onError: (error) => {
          toast.error(error.error.message);
        },
        onSuccess: () => {
          globalThis.location.href = "/dashboard";
        },
      },
    });
  };

  const linkClass =
    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground";

  // List variant for mobile nav
  if (props.variant === "list") {
    return (
      <div class="flex flex-col gap-1">
        <Show
          when={!session.session.impersonatedBy}
          fallback={
            <Button
              variant="ghost"
              onClick={() => {
                props.onNavigate?.();
                handleStopImpersonating();
              }}
              class={cn(
                linkClass,
                "justify-start text-destructive",
              )}
            >
              <LogOut class="size-5" />
              Stop Impersonating
            </Button>
          }
        >
          <A
            href="/auth/sign-out"
            onClick={props.onNavigate}
            class={cn(linkClass, "text-destructive")}
          >
            <LogOut class="size-5" />
            Sign Out
          </A>
        </Show>
      </div>
    );
  }

  // Dropdown variant (default) for desktop
  return (
    <DropdownMenu>
      <DropdownMenuTrigger class="hover:cursor-pointer flex flex-row gap-2">
        <Avatar class="size-6 rounded-sm">
          <AvatarImage
            src={getFileUrl(session.user.image)}
            alt={session.user.name}
          />
          <AvatarFallback class="rounded-lg text-xs">
            {getInitials(session.user.name)}
          </AvatarFallback>
        </Avatar>
        <span class="hidden sm:inline truncate max-w-[150px]">
          {session.user.name}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          as={A}
          href="/dashboard/account"
          class="hover:cursor-pointer"
        >
          <UserCircle class="size-4" />
          Account
        </DropdownMenuItem>
        <Show
          when={!session.session.impersonatedBy}
          fallback={
            <DropdownMenuItem
              as={Button}
              variant="ghost"
              size="sm"
              onClick={handleStopImpersonating}
            >
              <LogOut class="size-4" />
              Stop Impersonating
            </DropdownMenuItem>
          }
        >
          <DropdownMenuItem
            as={A}
            href="/auth/sign-out"
            class="hover:cursor-pointer"
          >
            <LogOut class="size-4" />
            Sign Out
          </DropdownMenuItem>
        </Show>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
