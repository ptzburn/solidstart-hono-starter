import configureOpenAPI from "~/api/lib/configure-open-api.ts";
import createApp from "~/api/lib/create-app.ts";
import tasks from "~/api/routes/tasks/index.ts";

const app = createApp().basePath("/api");

configureOpenAPI(app);

const routes = [
  tasks,
] as const;

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = typeof routes[number];

export default app;
