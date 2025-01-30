import { hc } from "hono/client";
import { AppType } from 'api';
import { getBaseURL } from "@/lib/baseUrl";


// export const client = hc<AppType>(`${getBaseURL()}/api`);
export const client = hc<AppType>(`${getBaseURL()}`);


