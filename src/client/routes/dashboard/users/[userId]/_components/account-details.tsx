import Calendar from "~icons/lucide/calendar";
import Mail from "~icons/lucide/mail";
import UserKey from "~icons/lucide/user-key";
import User from "~icons/lucide/user";
import ALargeSmall from "~icons/lucide/a-large-small";
import { format } from "date-fns";
import { createSignal, Match, Switch } from "solid-js";
import type { Accessor } from "solid-js";

import type { SelectUser } from "~/shared/types/auth.ts";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "~/client/components/ui/item.tsx";
import { Button } from "~/client/components/ui/button.tsx";
import { RoleDialog } from "./role-dialog.tsx";
import { NameDialog } from "./name-dialog.tsx";

type AccountDetailsProps = {
  user: Accessor<SelectUser>;
};

export function AccountDetails(props: AccountDetailsProps) {
  const [roleDialogOpen, setRoleDialogOpen] = createSignal(false);
  const [nameDialogOpen, setNameDialogOpen] = createSignal(false);

  return (
    <div class="flex flex-col gap-2">
      <ItemGroup class="rounded-lg border bg-card">
        <Item>
          <ItemMedia variant="icon">
            <ALargeSmall />
          </ItemMedia>
          <ItemContent>
            <ItemTitle class="text-muted-foreground font-medium">
              Name
            </ItemTitle>
            <p class="text-base font-semibold wrap-break-word">
              {props.user().name}
            </p>
          </ItemContent>
          <ItemActions>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNameDialogOpen(true)}
            >
              Change
            </Button>
          </ItemActions>
        </Item>
        <ItemSeparator />
        <Item>
          <ItemMedia variant="icon">
            <Mail />
          </ItemMedia>
          <ItemContent>
            <ItemTitle class="text-muted-foreground font-medium">
              Email
            </ItemTitle>
            <p class="text-base font-semibold wrap-break-word">
              {props.user().email}
            </p>
          </ItemContent>
        </Item>
        <ItemSeparator />
        <Item>
          <ItemMedia variant="icon">
            <Switch>
              <Match when={props.user().role === "user"}>
                <User />
              </Match>
              <Match when={props.user().role === "admin"}>
                <UserKey />
              </Match>
            </Switch>
          </ItemMedia>
          <ItemContent>
            <ItemTitle class="text-muted-foreground font-medium">
              Role
            </ItemTitle>
            <p class="text-base font-semibold capitalize">
              {props.user().role || "user"}
            </p>
          </ItemContent>
          <ItemActions>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRoleDialogOpen(true)}
            >
              Change
            </Button>
          </ItemActions>
        </Item>
        <ItemSeparator />
        <Item>
          <ItemMedia variant="icon">
            <Calendar />
          </ItemMedia>
          <ItemContent>
            <ItemTitle class="text-muted-foreground font-medium">
              Created
            </ItemTitle>
            <p class="text-base font-semibold wrap-break-word">
              {format(props.user().createdAt, "dd.MM.yyyy")}
            </p>
          </ItemContent>
        </Item>
      </ItemGroup>

      <RoleDialog
        user={props.user}
        isOpen={roleDialogOpen}
        setIsOpen={setRoleDialogOpen}
      />
      <NameDialog
        user={props.user}
        isOpen={nameDialogOpen}
        setIsOpen={setNameDialogOpen}
      />
    </div>
  );
}
