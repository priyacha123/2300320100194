# Stage 1

## Priority Inbox Approach

The application fetches notifications from the provided protected API and displays the most important notifications to the user.

To determine priority, the following order is used:

- Placement notifications have the highest priority (Weight = 3)
- Result notifications have medium priority (Weight = 2)
- Event notifications have the lowest priority (Weight = 1)

After assigning weights, notifications are sorted based on priority. If two notifications belong to the same category, the notification with the latest timestamp is given preference.

Finally, only the top 10 notifications are displayed in the inbox.

## Handling New Notifications

For this stage, the application fetches fresh data on every request using `cache: "no-store"`. This ensures that users always see the latest notifications.

Whenever new notifications are received:

1. Notifications are fetched from the API.
2. Priority weights are assigned based on notification type.
3. Notifications are sorted according to priority and timestamp.
4. The top 10 notifications are displayed.

For larger systems with a high volume of notifications, the ranking process can be optimized by maintaining a fixed-size priority queue (or min-heap) containing only the top 10 notifications. This avoids sorting the entire list every time a new notification arrives and improves overall performance.

## Files Used

* `src/lib/notification.ts` – Fetches notifications from the protected API.
* `src/lib/priority.ts` – Contains the logic for assigning priorities and sorting notifications.
* `src/app/page.tsx` – Displays the notification inbox.
* `src/app/layout.tsx` – Application layout configuration.
* `src/app/globals.css` – Styling for the application.

## Time Complexity

* Sorting notifications: `O(n log n)`
* Selecting top 10 notifications: `O(10)` after sorting

Since the number of notifications is expected to be manageable for this stage, the chosen approach is simple, easy to understand, and efficient enough for the current requirements.