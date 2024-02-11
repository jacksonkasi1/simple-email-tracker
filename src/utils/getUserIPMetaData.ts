import { Context } from "hono";

import DeviceDetector from "device-detector-js";
import uaParser from "ua-parser-js";

const deviceDetector = new DeviceDetector();

export const getUserIPMetaData = async (c: Context) => {
  try {
    const userAgent: string = c.req.header("User-Agent") || "";
    const ua = uaParser(userAgent);
    const deviceType = userAgent.match(/(iPhone|iPod|iPad|Android)/)?.[0];
    const deviceVersion = userAgent
      .match(/(iPhone OS|Android) ([\d_]+)/)?.[2]
      ?.replace(/_/g, ".");
    const osType = ua.os.name;

    const clientIp = c.req.header("CF-Connecting-IP") || "";
    const ipInfoResponse = await fetch(`http://ip-api.com/json/${clientIp}`);
    const ipInfo = (await ipInfoResponse.json()) as any;

    const ipInfoData = {
      login_ip: clientIp || ipInfo.query,
      login_timezone: ipInfo.timezone,
      login_isp: ipInfo.isp,
      login_device: deviceDetector.parse(userAgent)?.device?.type,
      login_browser: deviceDetector.parse(userAgent)?.client?.name,
      login_os: deviceDetector.parse(userAgent)?.os?.name,
      login_country: ipInfo.country,
      login_region: ipInfo.regionName,
      login_city: ipInfo.city,
      login_zip: ipInfo.zip,
      login_lat: ipInfo.lat ? String(ipInfo.lat) : null,
      login_lon: ipInfo.lon ? String(ipInfo.lon) : null,
    };
    const appInformation = {
      deviceType,
      deviceVersion,
      osType,
    };

    return { ipInfoData, appInformation };
  } catch (error) {
    console.error("Failed to get user IP metadata:", error);
    // Depending on how you want to handle errors, you might throw or return a specific response
    throw error; // Or `return c.text('Error', 500);` to stop further processing and respond
  }
};
