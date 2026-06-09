import { Log } from "../../logging_middleware";
import type { Notification } from "@/types/notification";

const TYPE_WEIGHTS: Record<Notification["Type"], number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export async function getTopNotifications(
  notifications: Notification[],
  limit = 10
): Promise<Notification[]> {
  await Log(
    "frontend",
    "debug",
    "utils",
    `Priority calculation started for ${notifications.length} notifications`
  );

  const result = [...notifications]
    .sort((a, b) => {
      const weightDiff = TYPE_WEIGHTS[b.Type] - TYPE_WEIGHTS[a.Type];

      if (weightDiff !== 0) return weightDiff;

      return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
    })
    .slice(0, limit);

  await Log(
    "frontend",
    "info",
    "utils",
    `Generated top ${result.length} notifications`
  );

  return result;
}
