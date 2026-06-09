import { Log } from "../../logging_middleware";
import type { Notification } from "@/types/notification";

const API_URL = "http://4.224.186.213/evaluation-service/notifications";

interface NotificationsResponse {
  notifications: Notification[];
}

function getAccessToken() {
  return process.env.LOG_ACCESS_TOKEN;
}

export async function fetchNotifications(): Promise<Notification[]> {
  const accessToken = getAccessToken();

  if (!accessToken) {
    await Log(
      "frontend",
      "error",
      "api",
      "LOG_ACCESS_TOKEN is missing for notification fetch"
    );

    throw new Error("LOG_ACCESS_TOKEN is missing");
  }

  try {
    await Log(
      "frontend",
      "info",
      "api",
      "Started fetching notifications from evaluation API"
    );

    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      await Log(
        "frontend",
        "error",
        "api",
        `Notification API failed with status ${response.status}`
      );

      throw new Error(`Notification API failed with status ${response.status}`);
    }

    const data = (await response.json()) as NotificationsResponse;

    await Log(
      "frontend",
      "info",
      "api",
      `Successfully fetched ${data.notifications.length} notifications`
    );

    return data.notifications;
  } catch (error) {
    await Log("frontend", "error", "api", "Failed to fetch notifications");
    throw error;
  }
}
