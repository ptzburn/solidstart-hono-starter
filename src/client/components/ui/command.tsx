import type {
  Component,
  ComponentProps,
  ParentProps,
  VoidProps,
} from "solid-js";
import { splitProps } from "solid-js";

import type { DialogRootProps } from "@kobalte/core/dialog";
import * as CommandPrimitive from "cmdk-solid";

import { cn } from "~/client/lib/utils.ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/client/components/ui/dialog.tsx";
import SearchIcon from "lucide-solid/icons/search";

const Command: Component<ParentProps<CommandPrimitive.CommandRootProps>> = (
  props,
) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <CommandPrimitive.CommandRoot
      class={cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        local.class,
      )}
      {...others}
    />
  );
};

interface CommandDialogProps extends DialogRootProps {
  title?: string;
  description?: string;
  className?: string;
  // deno-lint-ignore no-explicit-any
  children?: any;
}

const CommandDialog: Component<CommandDialogProps> = (props) => {
  const [local, dialogProps] = splitProps(props, [
    "title",
    "description",
    "className",
    "children",
  ]);

  return (
    <Dialog {...dialogProps}>
      <DialogHeader class="sr-only">
        <DialogTitle>{local.title ?? "Command Palette"}</DialogTitle>
        <DialogDescription>
          {local.description ?? "Search for a command to run..."}
        </DialogDescription>
      </DialogHeader>

      <DialogContent
        class={cn("overflow-hidden p-0", local.className)}
      >
        <Command class="&_[cmdk-group-heading]:text-muted-foreground \
                 &[data-slot='command-input-wrapper']:h-12 \
                 &_[cmdk-group-heading]:px-2 \
                 &_[cmdk-group-heading]:font-medium \
                 &_[cmdk-group]:px-2 \
                 &_[cmdk-group]:not([hidden])_~[cmdk-group]:pt-0 \
                 &_[cmdk-input-wrapper]_svg:h-5 \
                 &_[cmdk-input-wrapper]_svg:w-5 \
                 &_[cmdk-input]:h-12 \
                 &_[cmdk-item]:px-2 \
                 &_[cmdk-item]:py-3 \
                 &_[cmdk-item]_svg:h-5 \
                 &_[cmdk-item]_svg:w-5">
          {local.children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput: Component<VoidProps<CommandPrimitive.CommandInputProps>> = (
  props,
) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <div
      class="flex h-9 items-center gap-2 border-b px-3"
      cmdk-input-wrapper=""
    >
      <SearchIcon class="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.CommandInput
        class={cn(
          "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          local.class,
        )}
        {...others}
      />
    </div>
  );
};

const CommandList: Component<ParentProps<CommandPrimitive.CommandListProps>> = (
  props,
) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <CommandPrimitive.CommandList
      class={cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        local.class,
      )}
      {...others}
    />
  );
};

const CommandEmpty: Component<ParentProps<CommandPrimitive.CommandEmptyProps>> =
  (props) => {
    const [local, others] = splitProps(props, ["class"]);

    return (
      <CommandPrimitive.CommandEmpty
        class={cn("py-6 text-center text-sm", local.class)}
        {...others}
      />
    );
  };

const CommandGroup: Component<ParentProps<CommandPrimitive.CommandGroupProps>> =
  (props) => {
    const [local, others] = splitProps(props, ["class"]);

    return (
      <CommandPrimitive.CommandGroup
        class={cn(
          "text-foreground **:[[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium",
          local.class,
        )}
        {...others}
      />
    );
  };

const CommandSeparator: Component<
  VoidProps<CommandPrimitive.CommandSeparatorProps>
> = (props) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <CommandPrimitive.CommandSeparator
      class={cn("bg-border -mx-1 h-px", local.class)}
      {...others}
    />
  );
};

const CommandItem: Component<ParentProps<CommandPrimitive.CommandItemProps>> = (
  props,
) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <CommandPrimitive.CommandItem
      cmdk-item=""
      class={cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        local.class,
      )}
      {...others}
    />
  );
};

const CommandShortcut: Component<ComponentProps<"span">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <span
      class={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        local.class,
      )}
      {...others}
    />
  );
};

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
