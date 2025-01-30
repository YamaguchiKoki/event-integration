import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { fetchEventRequestSchema, fetchEventResponseSchema } from '@workspace/contract';
import { AppType } from '../../application/type.js';


export const registerEventRoutes = () => {
  const eventApp = new Hono<AppType>()
  .get('/events',
    zValidator('query', fetchEventRequestSchema, (result, c) => {
      if (!result.success) {
        console.log(result.error.issues)
        return c.text('Bad Request', 400);
      }
    }),
    async (c) => {
      const query = c.req.valid('query');
      const container = c.get('container');
      const events = await container.get('fetchEvents')(query);

      const parsed = fetchEventResponseSchema.safeParse(events);
      if (!parsed.success) {
        return c.text('Invalid', 400);
      }

      return c.json({ events }, 200);
    }
  );
  return eventApp;
};
