import type { SelectUser } from "~/shared/types/auth.ts";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/client/components/ui/avatar.tsx";
import { Card } from "~/client/components/ui/card.tsx";
import { getFileUrl, getInitials } from "~/client/lib/utils.ts";
import type { Accessor } from "solid-js";

type HeroProps = {
  user: Accessor<SelectUser>;
};

export function Hero(props: HeroProps) {
  return (
    <div class="space-y-4">
      <Card class="p-6">
        <div class="flex items-start gap-6">
          <Avatar class="size-24">
            <AvatarImage
              src={getFileUrl(props.user().image)}
              alt={props.user().name}
            />
            <AvatarFallback class="text-2xl">
              {getInitials(props.user().name)}
            </AvatarFallback>
          </Avatar>

          <div class="flex-1 space-y-2">
            <div>
              <h1 class="text-3xl font-bold">{props.user().name}</h1>
              <p class="text-muted-foreground text-lg">{props.user().email}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
