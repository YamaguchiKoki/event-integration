import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { env } from "../env.js";
import { createContainer } from "./container/injection.js";
import { registerMockRoutes } from "../adapters/routes/mockRoutes.js";
import { AppType } from "./type.js";
import { registerEventRoutes } from "../adapters/routes/eventRoutes.js";

export const bootstrap = () => {
  const app = new Hono<AppType>();

  app.use(
    "/*",
    cors({
      origin: env.FRONTEND_URL,
      allowHeaders: [
        "Authorization",
        "X-Custom-Header",
        "Upgrade-Insecure-Requests",
        "Content-Type",
      ],
      allowMethods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
      exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
      maxAge: 600,
      credentials: true,
    }),
  );

  app.use(logger());

  // DI
  const connpassApiURL = env.CONNPASS_API_URL;

  const container = createContainer({ baseURL: connpassApiURL });

  app.use('*', async (c, next) => {
    c.set('container', container);
    await next();
  });

  // connpass APIなどのモック
  if (env.NODE_ENV === 'local') {
    registerMockRoutes(app);
  }

  return app;
};
