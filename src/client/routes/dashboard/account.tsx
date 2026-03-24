import type { RouteSectionProps } from "@solidjs/router";

import { AccountBottomNav } from "./account/_components/mobile-bottom-nav.tsx";
import { SidebarProvider } from "~/client/components/ui/sidebar.tsx";
import { clientOnly } from "@solidjs/start";

const AccountSidebar = clientOnly(() =>
  import("./account/_components/account-sidebar.tsx")
);

function AccountLayout(props: RouteSectionProps) {
  return (
    <div class="flex flex-row flex-1 min-h-0">
      <SidebarProvider>
        <AccountSidebar />

        <div class="flex-1 flex flex-col min-h-0 overflow-auto pb-14 md:pb-0">
          {props.children}
        </div>
      </SidebarProvider>

      <AccountBottomNav />
    </div>
  );
}

export default AccountLayout;
