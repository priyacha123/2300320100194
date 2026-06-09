import { fetchNotifications } from "@/lib/notification";
import { getTopNotifications } from "@/lib/priority";
import { Log } from "../../logging_middleware";

export default async function Home() {
  await Log(
    "frontend", 
    "info",
    "page",
    "Stage 1 notification dashboard loaded"
  );

  const notifications = await fetchNotifications();

  const topNotifications =
    await getTopNotifications(notifications);

  return (
    <pre>
      {JSON.stringify(topNotifications, null, 2)}
    </pre>
  );
}