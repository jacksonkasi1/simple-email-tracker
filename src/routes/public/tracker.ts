import { Hono } from "hono";
import { Buffer } from "buffer";
import { sendEmail } from "@/services/emailService";
import { Env } from "@/types";

// ** import utils
import { getUserIPMetaData } from "@/utils";
import { fetchImageToBuffer } from "@/utils/fetchImageToBuffer";

export const trackerApi = new Hono();

trackerApi.get("/1x1-pixel/:email_id", async (c) => {
  const email_id = c.req.param("email_id");

  const { ipInfoData, appInformation } = await getUserIPMetaData(c);

  const emails = {
    from: c.env!.FROM_EMAIL as string, // your-email@example.com from resend
    to: [c.env!.TO_EMAIL as string], // your-notification-email@example.com
  };

  // Send an email with captured information
  await sendEmail({
    env: c.env as unknown as Env,
    ...emails,
    subject: "Email Opened Notification",
    html: `
      <h1>Email Opened Notification</h1>
      <p>
        Email ID: ${email_id}
      </p>
      <br />
      <hr />
      <p>
        IP Info: ${JSON.stringify(ipInfoData)}
      </p>
      <br />
      <p>
        App Info: ${JSON.stringify(appInformation)}
      </p>
    `,
  });

  // Transparent 1x1 GIF image
  const gif1x1 = Buffer.from(
    "47494638396101000100800100000000ffffff21f90401000000002c00000000010001000002024401003b",
    "hex",
  );

  const imageUrl =
    "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg";

  const imageBuffer = await fetchImageToBuffer(c, imageUrl);

  // Convert Buffer to Uint8Array, since Cloudflare Workers do not support Buffer directly
  const gifArray = new Uint8Array(imageBuffer);

  c.header("Content-Type", "image/jpeg");
  return new Response(gifArray, {
    headers: {
      "Content-Type": "image/jpeg",
    },
  });
});
