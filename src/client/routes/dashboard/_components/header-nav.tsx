import { A } from "@solidjs/router";
import { createSignal } from "solid-js";
import Menu from "~icons/lucide/menu";
import { Button } from "~/client/components/ui/button.tsx";
import { ThemeToggle } from "~/client/components/theme-toggle.tsx";
import { NavMain } from "./nav-main.tsx";
import { NavUser } from "./nav-user.tsx";
import { MobileNav } from "./mobile-nav.tsx";

export function HeaderNav() {
  const [mobileNavOpen, setMobileNavOpen] = createSignal(false);
  return (
    <>
      <div class="flex flex-row h-14 md:h-16 items-center justify-between px-4 border-b border-base-foreground">
        <div class="flex items-center gap-2">
          <A
            class="flex items-center gap-2 text-lg md:text-xl font-semibold tracking-tight hover:cursor-pointer"
            style={{ "letter-spacing": "-0.02em" }}
            href="/dashboard"
          >
            Dashboard
          </A>
        </div>

        <div class="hidden md:block">
          <NavMain />
        </div>

        <div class="hidden md:flex items-center gap-2">
          <NavUser />
          <ThemeToggle />
        </div>

        <Button
          variant="ghost"
          size="icon"
          class="md:hidden"
          onClick={() => setMobileNavOpen(true)}
        >
          <Menu class="size-5" />
          <span class="sr-only">Open menu</span>
        </Button>
      </div>

      {/* Mobile navigation sheet */}
      <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
    </>
  );
}
