import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "~/client/components/ui/sheet.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/client/components/ui/avatar.tsx";
import { useSession } from "~/client/contexts/session-context.tsx";
import { getInitials } from "~/client/lib/utils.ts";
import { NavMain } from "./nav-main.tsx";
import { NavUser } from "./nav-user.tsx";
import { ThemeToggle } from "~/client/components/theme-toggle.tsx";
import { Accessor, Setter } from "solid-js";
import { A } from "@solidjs/router";

interface MobileNavProps {
  open: Accessor<boolean>;
  onOpenChange: Setter<boolean>;
}

export function MobileNav(props: MobileNavProps) {
  const session = useSession();

  const handleNavigate = () => {
    props.onOpenChange(false);
  };

  return (
    <Sheet open={props.open()} onOpenChange={props.onOpenChange}>
      <SheetContent position="right" class="w-[280px] sm:w-[320px]">
        <SheetHeader class="pb-4 border-b">
          <SheetTitle class="text-left">TalentSeek</SheetTitle>
        </SheetHeader>

        <A
          class="flex items-center gap-3 py-4 border-b"
          href="/account"
          onClick={handleNavigate}
        >
          <Avatar class="h-10 w-10 rounded-lg">
            <AvatarImage
              src={session.user.image ?? ""}
              alt={session.user.name}
            />
            <AvatarFallback class="rounded-lg">
              {getInitials(session.user.name)}
            </AvatarFallback>
          </Avatar>
          <div class="grid flex-1 text-left text-sm leading-tight">
            <span class="truncate font-medium">
              {session.user.name}
            </span>
            <span class="truncate text-xs text-muted-foreground">
              {session.user.email}
            </span>
          </div>
        </A>

        <nav class="py-4 border-b">
          <NavMain
            orientation="vertical"
            onNavigate={handleNavigate}
          />
        </nav>

        <div class="py-4 border-b">
          <NavUser variant="list" onNavigate={handleNavigate} />
        </div>

        <div class="py-4">
          <ThemeToggle variant="toggle" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
