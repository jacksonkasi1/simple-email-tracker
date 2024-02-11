# Email Tracker Project

This project utilizes a Cloudflare Worker deployed with Hono.js to implement a simple email open tracking system. It embeds a 1x1 pixel in emails that, when accessed, captures and logs metadata about the device and IP address. This guide will help you set up the project and detail how to embed the tracking pixel in your emails.

## Features

- **Email Open Tracking**: Allows you to know when your emails are being opened.
- **Capture Device and IP Metadata**: Gathers information about the recipient's device and IP address for each email open.
- **Built on Cloudflare Workers**: Uses the scalable and powerful Cloudflare Workers platform.

## Prerequisites

- A Cloudflare account with Workers enabled.
- Node.js installed on your local machine.
- `pnpm` installed for package management.
- A basic understanding of JavaScript or TypeScript.

## Setup Instructions

1. **Clone the Project**: Start by cloning this repository to your local environment.

   ```bash
   git clone https://github.com/jacksonkasi1/simple-email-tracker
   cd email-tracker
   ```

2. **Install Dependencies**: Use `pnpm` to install the required dependencies.

   ```bash
   pnpm install
   ```

3. **Configure Your Project**: Edit the `wrangler.toml` file with your Cloudflare account details and any environment-specific configurations.

4. **Deploy Your Worker**: Deploy your worker to Cloudflare using Wrangler.

   ```bash
   pnpm wrangler publish
   ```

## How to Embed the Tracking Pixel in Emails

To utilize the email tracking functionality, you'll need to embed a 1x1 pixel image in the emails you wish to track.

1. **Generate Pixel URL**: Construct the URL for the tracking pixel, which will look something like this: `https://your-worker.your-subdomain.workers.dev/track/pixel`. Make sure to replace `your-worker.your-subdomain.workers.dev` with the actual URL of your deployed Cloudflare Worker.

2. **Insert the Pixel in Your Emails**: Embed the tracking pixel in the HTML body of your email as follows:

   ```html
   <img src="https://your-worker.your-subdomain.workers.dev/track/pixel" width="1" height="1" style="display:none;" alt="Tracking Pixel">
   ```

   Ensure the pixel is invisible to the email recipient by using `style="display:none;"`.

## Monitoring Email Opens

The access logs and metadata captured by the Cloudflare Worker can be viewed through the Cloudflare dashboard. Optionally, you can set up the worker to forward this data to a server or analytics service for further analysis.

## Security and Privacy

- **Obtain Consent**: Make sure you have consent from your email recipients to track opens, especially in jurisdictions with strict privacy regulations like the GDPR.
- **Handle Data Responsibly**: Implement proper data handling and protection measures for the information you collect.

## Conclusion

This project provides a robust and scalable solution for tracking email opens using Cloudflare Workers. By following these setup instructions, you can gain valuable insights into how your emails are engaged with by recipients.

For further information or to customize the project, refer to the documentation for Hono.js and Cloudflare Workers.