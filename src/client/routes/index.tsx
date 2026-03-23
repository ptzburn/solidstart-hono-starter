import { A } from "@solidjs/router";
import { For } from "solid-js";
import ArrowRight from "~icons/lucide/arrow-right";
import Database from "~icons/lucide/database";
import FileCode2 from "~icons/lucide/file-code-2";
import Layers from "~icons/lucide/layers";
import Lock from "~icons/lucide/lock";
import PaintBucket from "~icons/lucide/paint-bucket";
import Server from "~icons/lucide/server";
import { Button } from "~/client/components/ui/button.tsx";
import { Badge } from "~/client/components/ui/badge.tsx";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/client/components/ui/card.tsx";
import { Separator } from "~/client/components/ui/separator.tsx";
import { ThemeToggle } from "~/client/components/theme-toggle.tsx";

const features = [
  {
    icon: FileCode2,
    title: "Deno",
    description:
      "Secure runtime with first-class TypeScript support, built-in tooling, and web-standard APIs.",
  },
  {
    icon: Layers,
    title: "SolidStart",
    description:
      "Fine-grained reactive UI framework with file-based routing, SSR, and streaming.",
  },
  {
    icon: Server,
    title: "Hono",
    description:
      "Ultrafast web framework for the edge with OpenAPI support and type-safe routes.",
  },
  {
    icon: Lock,
    title: "Better Auth",
    description:
      "Full-featured authentication with social logins, passkeys, 2FA, and session management.",
  },
  {
    icon: PaintBucket,
    title: "shadcn/ui",
    description:
      "Beautiful, accessible component library built on Kobalte primitives with Tailwind CSS.",
  },
  {
    icon: Database,
    title: "TanStack Form",
    description:
      "Headless, type-safe form management with built-in validation and framework adapters.",
  },
];

export default function LandingPage() {
  return (
    <div class="flex flex-col flex-1 min-h-0 overflow-y-auto">
      <header class="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div class="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <span class="text-sm font-semibold tracking-tight">
            solid-starter
          </span>
          <div class="flex items-center gap-2">
            <ThemeToggle />
            <Button as={A} href="/auth/sign-in" size="sm">
              Sign in
            </Button>
          </div>
        </div>
      </header>

      <main class="flex flex-1 flex-col">
        <section class="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
          <Badge variant="secondary" round>
            Starter Template
          </Badge>

          <div class="flex max-w-2xl flex-col gap-4">
            <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Ship faster with the{" "}
              <span class="text-primary">modern stack</span>
            </h1>
            <p class="mx-auto max-w-lg text-lg text-muted-foreground">
              A production-ready starter with authentication, API layer, and
              polished UI — so you can focus on what matters.
            </p>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-3">
            <Button as={A} href="/auth/sign-in" size="lg">
              Get started
              <ArrowRight class="size-4" />
            </Button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg">
                View on GitHub
              </Button>
            </a>
          </div>
        </section>

        <Separator />

        <section class="mx-auto w-full max-w-5xl px-6 py-20">
          <div class="mb-12 text-center">
            <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
              Everything you need to get started
            </h2>
            <p class="mt-2 text-muted-foreground">
              Batteries-included with best-in-class tooling.
            </p>
          </div>

          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <For each={features}>
              {(feature) => (
                <Card class="transition-colors hover:border-primary/40">
                  <CardHeader>
                    <div class="mb-2 flex size-10 items-center justify-center rounded-md border bg-muted">
                      <feature.icon class="size-5 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              )}
            </For>
          </div>
        </section>

        <Separator />

        <section class="flex flex-col items-center gap-6 px-6 py-20 text-center">
          <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to build?
          </h2>
          <p class="max-w-md text-muted-foreground">
            Sign in to explore the dashboard and see the full stack in action.
          </p>
          <Button as={A} href="/auth/sign-in" size="lg">
            Sign in
            <ArrowRight class="size-4" />
          </Button>
        </section>

        <footer class="border-t py-6 text-center text-sm text-muted-foreground">
          Built with Deno, SolidStart, Hono, Better Auth, shadcn/ui &amp;
          TanStack Form.
        </footer>
      </main>
    </div>
  );
}
