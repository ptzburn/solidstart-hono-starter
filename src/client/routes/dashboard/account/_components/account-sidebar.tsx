import { For, Show } from "solid-js";
import { A, useLocation } from "@solidjs/router";
import ChevronLeftIcon from "~icons/lucide/chevron-left";
import ChevronRightIcon from "~icons/lucide/chevron-right";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "~/client/components/ui/sidebar.tsx";
import { NAV_ITEMS } from "./mobile-bottom-nav.tsx";

export default function AccountSidebar() {
  const location = useLocation();
  const sidebar = useSidebar();

  const isActive = (href: string) => {
    const normalizedPath = location.pathname.endsWith("/")
      ? location.pathname.slice(0, -1)
      : location.pathname;
    return normalizedPath === href;
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarMenu>
            <For
              each={NAV_ITEMS}
            >
              {(item) => (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    as={A}
                    href={item.href}
                    isActive={isActive(item.href)}
                    tooltip={item.label}
                    onClick={() => sidebar.setOpenMobile(false)}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </For>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <Show when={!sidebar.isMobile()}>
        <SidebarFooter class="items-end">
          <SidebarTrigger>
            <Show
              when={sidebar.state() === "expanded"}
              fallback={<ChevronRightIcon class="size-4" />}
            >
              <ChevronLeftIcon class="size-4" />
            </Show>
          </SidebarTrigger>
        </SidebarFooter>
      </Show>
      <SidebarRail />
    </Sidebar>
  );
}
