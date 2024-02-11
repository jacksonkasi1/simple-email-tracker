import { Hono } from "hono";

// ** import middlewares
import { logger } from "hono/logger";
import { cors } from "hono/cors";

// ** import routes
import { route as v1 } from "./routes/v1";
import { publicRoute } from "./routes/public";

// ** import services
import { sendEmail } from "./services/emailService";

// ** import types
import { Env } from "./types";

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

app.get("/send-email", async (c) => {
  await sendEmail({
    env: c.env as unknown as Env,
    from: c.env!.FROM_EMAIL as string,
    to: [c.env!.TO_EMAIL as string],
    subject: "Email Tracker TEST",
    html: `
            <h1>Email embedded image</h1>
            <img src={c.env.!TEST_IMG_LINK} width="1" height="1" style="display:none;" alt="Hidden Image" >
            <img src={c.env.!TEST_IMG_LINK} width="100" height="100" style="display:block;" alt="Visible Image" >
            <img src={c.env.!TEST_IMG_LINK} width="1" height="1" style="display:block;" alt="Visible Image" >
            <p>
              Email Tracker TEST
            </p>
          `,
  });

  return c.json({ success: true, message: "Email sent" }, 200);
});

const port = 8787;

console.log(`Starting server on port http://127.0.0.1:${port} 🚀`);

export default app;
