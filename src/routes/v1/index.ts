import { Hono } from "hono";

export const route = new Hono();

route.get("/", (c) => {
  return c.json({ success: true, message: "V1 ping" }, 200);
});
