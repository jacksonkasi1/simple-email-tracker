import { Resend } from "resend";

import { Env } from "@/types";

interface EmailOptions {
  env: Env;
  from: string;
  to: string[];
  subject: string;
  html: string;
}

export async function sendEmail({
  env,
  from,
  to,
  subject,
  html,
}: EmailOptions): Promise<void> {
  const resend = new Resend(env.RESEND_API_KEY!);
  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    if (error) {
      console.error(`Error sending email: ${JSON.stringify(error)}`);
      return;
    }

    console.log(`Email sent: ${JSON.stringify(data)}`);
  } catch (error) {
    console.error(`Try-catch error sending email: ${JSON.stringify(error)}`);
  }
}
