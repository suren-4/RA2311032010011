# Stage 2 - Notification Frontend Application

This repository contains the Next.js React application for the Stage 2 Notification App evaluation.

## Features Implemented
1.  **Responsive Dashboard:** Developed using Next.js (React) and configured strictly with Material UI for styling, layout, and component aesthetics without relying on Tailwind or other CSS libraries.
2.  **All Notifications View (`/`):** Paginated view displaying all events with read/unread highlighting using `localStorage`.
3.  **Priority Notifications View (`/priority`):** Filtered page supporting "limit" (Top N) and "notification_type" parameters strictly querying from `http://20.207.122.201/evaluation-service/notifications`.
4.  **Distinguishing New vs Viewed:** Local state keeps track of viewed notifications; visually highlighting new/unread notifications with custom unread badges and colored borders until they are hovered/clicked.

## Getting Started

### 1. Generate API Token
To fetch data successfully, you need a valid authorization token. 
1. Navigate to the backend folder (`notification_app_be`).
2. Run `npx ts-node register.ts` to register and generate a fresh API token.
3. Copy the token generated in your terminal.

### 2. Run the Application
Install the dependencies in the frontend app folder:

```bash
cd notification_app_fe
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Evaluation Notes
- Built according to specific API constraints and architectural expectations.
- Zero extra CSS libraries used (ShadCN, Tailwind, etc. removed as requested).
- Implements frontend storage to simulate notification visual "read" state without back-end write access.
- Code lives uniquely under this repository to prepare for final Github submission.
