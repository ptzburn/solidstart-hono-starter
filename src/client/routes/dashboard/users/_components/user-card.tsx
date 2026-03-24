import LoaderCircle from "~icons/lucide/loader-circle";
import Drama from "~icons/lucide/drama";
import { A } from "@solidjs/router";
import { createSignal, Match, Switch } from "solid-js";
import { toast } from "solid-sonner";
import { format } from "date-fns";

import type { SelectUser } from "~/shared/types/auth.ts";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/client/components/ui/avatar.tsx";
import { Badge } from "~/client/components/ui/badge.tsx";
import { Button } from "~/client/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/client/components/ui/card.tsx";
import { authClient } from "~/client/lib/auth-client.ts";
import { getFileUrl, getInitials } from "~/client/lib/utils.ts";

const getRoleLabel = (role: SelectUser["role"]) => {
  switch (role) {
    case "user":
      return "User";
    case "admin":
      return "Admin";
  }
};

type UserCardProps = {
  user: SelectUser;
};

export function UserCard(props: UserCardProps) {
  const [isImpersonating, setIsImpersonating] = createSignal(false);

  const handleImpersonate = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsImpersonating(true);

    await authClient.admin.impersonateUser({
      userId: props.user.id,
    }, {
      onError: (error) => {
        toast.error(error.error.message);
      },
      onSuccess: () => {
        globalThis.location.href = "/chat";
      },
    });

    setIsImpersonating(false);
  };

  return (
    <A href={`/dashboard/users/${props.user.id}`} class="relative">
      <div class="absolute -top-3 right-4 z-10">
        <Badge class="bg-card border border-border text-foreground">
          {getRoleLabel(props.user.role)}
        </Badge>
      </div>
      <Card class="flex flex-col h-full transition-colors hover:bg-accent/50 cursor-pointer">
        <CardHeader class="flex flex-row items-center gap-4">
          <Avatar class="size-12 rounded-none">
            <AvatarImage
              src={getFileUrl(props.user.image) ?? ""}
              alt={props.user.name}
            />
            <AvatarFallback>{getInitials(props.user.name)}</AvatarFallback>
          </Avatar>
          <div class="flex flex-col gap-1 flex-1 min-w-0">
            <h3 class="font-semibold truncate">{props.user.name}</h3>
            <p class="text-sm text-muted-foreground truncate">
              {props.user.email}
            </p>
          </div>
        </CardHeader>
        <CardContent class="flex flex-col gap-2">
          <div class="text-xs text-muted-foreground">
            <p>
              Joined {format(props.user.createdAt, "dd.MM.yyyy")}
            </p>
          </div>
        </CardContent>
        <CardFooter class="mt-auto">
          <Button
            onClick={handleImpersonate}
            disabled={isImpersonating() || (props.user.banned ?? false)}
            class="w-full"
            variant="outline"
          >
            <Drama class="size-4 mr-2" />
            <Switch>
              <Match when={isImpersonating()}>
                <LoaderCircle class="size-4 animate-spin" />
              </Match>
              <Match when={!isImpersonating()}>
                Impersonate user
              </Match>
            </Switch>
          </Button>
        </CardFooter>
      </Card>
    </A>
  );
}
