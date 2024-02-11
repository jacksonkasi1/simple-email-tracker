import { Hono } from "hono";

// ** import middlewares
import { logger } from "hono/logger";
import { cors } from "hono/cors";


// ** import routes
import { route as v1 } from "./routes/v1";
import { publicRoute } from "./routes/public";

const app = new Hono({ strict: false });

/**
 * Middlewares
 * https://hono.dev/middleware/builtin/cors
 */
app.use("*", logger());
app.use("*", cors());

/**
 * Ping Pong
 */
app.use("/", async (c) => c.text("Hello World"));
app.get("/ping", (c) => c.json({ ping: "pong" }, 200));

/**
 * API Routes v1
 */
app.route("/v1", v1);
app.route("/public", publicRoute);


const port = 8787;

console.log(`Starting server on port http://127.0.0.1:${port} 🚀`);

export default app;
