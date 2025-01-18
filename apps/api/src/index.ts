import { Hono } from "hono"
import { serve } from "@hono/node-server";
import { handle } from "hono/aws-lambda"

const app = new Hono()

app.get("/",  (c)=>{
  return c.text("Hello Hono!")
})

// ローカルサーバ用のコード
if (process.env.NODE_ENV !== 'production') {
  const port = 8787;
  console.log(`Server running at http://localhost:${port}`)
  serve({fetch: app.fetch, port})
}

export const handler=handle(app)
