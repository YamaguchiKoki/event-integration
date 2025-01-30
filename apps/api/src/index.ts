import { serve } from "@hono/node-server";
import { handle } from "hono/aws-lambda";
import { bootstrap } from "./application/bootstrap.js";
import { env } from "./env.js";
import { Hono } from "hono";
import { registerEventRoutes } from "./adapters/routes/eventRoutes.js";

const app = bootstrap()
            .route('/events', registerEventRoutes());

// ローカルサーバ
if (env.NODE_ENV === 'local') {
  const port = 8787;
  console.log(`Server running at http://localhost:${port}`);
  serve({ fetch: app.fetch, port });
}

export const handler = handle(app);
export type AppType = typeof app
export { app };
