# Stage 1

## Priority inbox approach

The frontend fetches the current notification feed from the provided protected API on the server side using `LOG_ACCESS_TOKEN`, so the token never needs to be exposed in the browser. After fetching, the app applies a deterministic ranking function:

1. `Placement` gets weight `3`
2. `Result` gets weight `2`
3. `Event` gets weight `1`
4. If two notifications have the same type, the one with the newer `Timestamp` is ranked higher
5. The top `10` ranked notifications are rendered in the inbox

This keeps the logic simple, auditable, and easy to tune if the business rules change later.

## How to maintain the top 10 as new notifications arrive

For the current stage, the page uses `cache: "no-store"` so every request reads the latest feed and recomputes the ranked top 10 immediately.

If notifications continue to arrive frequently, the same ranking function can be maintained efficiently in either of these ways:

- Poll the API on a fixed interval and rerun the sorter on the latest list
- Push new notifications through SSE or WebSockets and insert them into a bounded top-10 structure

For a streaming version, we would avoid sorting the entire list every time by keeping:

- A min-heap of size `10` keyed by `(weight, timestamp)`
- A lookup set for notification IDs to avoid duplicates if needed

Whenever a new notification arrives:

1. Compute its priority tuple from type weight and timestamp
2. If the heap has fewer than `10` items, insert it
3. Otherwise compare it with the current lowest-priority item in the heap
4. Replace the heap root only if the new notification outranks it

That keeps update cost near `O(log 10)`, which is effectively constant for this inbox size.

## Files updated

- `src/lib/notification.ts` for protected API fetching
- `src/lib/priority.ts` for deterministic ranking
- `src/app/page.tsx` for the inbox UI
- `src/app/layout.tsx` and `src/app/globals.css` for app structure and styling
