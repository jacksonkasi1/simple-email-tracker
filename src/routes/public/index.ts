import { Hono } from "hono";

// ** import routes
import { trackerApi } from "./tracker";

export const publicRoute = new Hono();

publicRoute.route("/track", trackerApi);
