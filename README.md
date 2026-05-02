# Campus Notifications Microservice (Stage 1)

This repository contains the deliverables for the Campus Notifications Microservice assessment.

## Project Structure

- `logging_middleware/`: Reusable TypeScript/JavaScript logging package that integrates with the external Evaluation Service telemetry.
- `notification_app_be/`: Backend application containing the priority sorting logic for notifications.
- `notification_app_fe/`: Frontend track project initialization (Next.js/React).
- `notification_system_design.md`: Markdown document detailing the system decisions and algorithmic approaches.

## Stage 1 Highlights
- Executable script `notification_app_be/priority_inbox.ts` retrieves the top 10 notifications utilizing a priority weighting matrix (Placement > Result > Event) and recency (`Timestamp`).
- Complete standalone logging library configured explicitly for Cross-app use.
