import { type RouteSectionProps } from "@solidjs/router";

export default function AuthLayout(props: RouteSectionProps) {
  return (
    <div class="grid lg:grid-cols-2 flex-1 min-h-0">
      <div class="flex flex-col gap-4 p-6 md:p-10">
        <div class="flex flex-1 items-center justify-center min-h-0">
          <div class="w-full max-w-xs">
            {props.children}
          </div>
        </div>
      </div>
      <div class="relative hidden lg:flex items-center justify-center p-8 overflow-hidden bg-muted">
      </div>
    </div>
  );
}
