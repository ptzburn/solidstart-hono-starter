"use server";

import { query, redirect } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";
import { auth } from "~/shared/auth.ts";

export function getServerHeaders() {
  const event = getRequestEvent();
  if (!event) {
    throw new Error("No request event available");
  }
  return event.request.headers;
}

export const getSessionQuery = query(async () => {
  const headers = getServerHeaders();
  const session = await auth.api.getSession({
    headers,
  });

  if (!session) {
    throw redirect("/auth/sign-in");
  }

  return session;
}, "session");
