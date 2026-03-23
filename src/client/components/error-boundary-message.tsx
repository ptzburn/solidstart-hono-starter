import { useNavigate } from "@solidjs/router";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "./ui/empty.tsx";
import { Button } from "./ui/button.tsx";

import ArrowLeft from "~icons/lucide/arrow-left";

type ErrorBoundaryProps = {
  // deno-lint-ignore no-explicit-any
  error: any;
};

export function ErrorBoundaryMessage(props: ErrorBoundaryProps) {
  const navigate = useNavigate();

  const errorCode = Error.isError(props.error)
    ? (props.error.cause ? (props.error.cause as number) : 500)
    : 500;
  const errorMessage = Error.isError(props.error)
    ? props.error.message
    : "Server Error";
  return (
    <Empty class="h-dvh bg-linear-to-b from-30% from-muted/50 to-background">
      <EmptyHeader>
        <EmptyTitle>{errorCode}</EmptyTitle>
        <EmptyDescription>
          {errorMessage}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
          Go back
        </Button>
      </EmptyContent>
    </Empty>
  );
}
