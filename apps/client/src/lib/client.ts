import { hc } from "hono/client";
import { AppType } from 'api';
import { getBaseURL } from "@/lib/baseUrl";


// export const client = hc<AppType>(`${getBaseURL()}/api`);
export const client = hc<AppType>(`${getBaseURL()}/api`);
const a = client.events.events.$get({ query: { prefecture: 'tokyo', startDate: '2025-01-01' } });


