# Notification System Design

## Stage 1

### Priority Inbox Implementation Approach

To efficiently determine the top `n` most important unread notifications without making database queries, we follow an in-memory priority sorting approach:

1. **Mapping Priorities to Weights**: We defined a predefined weighting system. As per requirements, the ordering is Placement > Result > Event. Thus, we assigned numerical weights:
   - `Placement` = 3
   - `Result` = 2
   - `Event` = 1

2. **Fetching Data**: Notifications are fetched from the provided `/evaluation-service/notifications` API using a GET request authorized through a Bearer token.

3. **Sorting Logic**: Once the notifications are in memory, they are sorted using a custom comparator function:
   - **Primary Sort (Category/Weight)**: The notifications are sorted based on their mapped weight in descending order.
   - **Secondary Sort (Recency)**: If two notifications share the same priority weight, they are further sorted based on their `Timestamp` in descending order (most recent first).

4. **Extraction**: We use an array slice operation (`Array.slice(0, 10)`) to extract the exact top 10 elements from the sorted array.

### Time & Space Complexity
- **Time Complexity**: `O(N log N)`, where `N` is the number of notifications to sort. The slice takes `O(1)`.
- **Space Complexity**: `O(N)` to store the notification payloads fetched from the API into an array.

