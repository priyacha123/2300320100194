import type { Stack, Level, FrontendPackage } from "./types";

const LOG_API_URL =
  "http://4.224.186.213/evaluation-service/logs";

const ACCESS_TOKEN = process.env.LOG_ACCESS_TOKEN;

export async function Log(
  stack: Stack,
  level: Level,
  packageName: FrontendPackage,
  message: string
) {
  if (!ACCESS_TOKEN) {
    console.error("LOG_ACCESS_TOKEN is missing");
    return null;
  }

  try {
    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        stack,
        level,
        package: packageName,
        message,
      }),
    });

    let data;

    try {
      data = await response.json();
    } catch {
      data = { message: "No response body" };
    }

    if (!response.ok) {
      console.error("Log API error:", data);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Logging middleware failed:", error);
    return null;
  }
}