# Orders & Products App

An inventory-style manager for orders and products, built as a frontend-focused test assignment. Orders can be expanded to view their related products, and the header shows a live count of active sessions via Socket.io.

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Redux Toolkit, React Router, Framer Motion, Bootstrap
- **Backend:** Node.js, Express, Socket.io
- **Other:** Docker, Docker Compose

## Features

- Orders list with an expandable details panel showing the order's products
- Product catalog with filtering by type and specification
- Delete confirmation modals for orders and products
- Real-time "active sessions" counter via Socket.io
- Fully typed with TypeScript, state managed with Redux Toolkit
- Dockerized frontend and backend

## Live Demo

- Frontend (Vercel): https://orders-products-app-dlpv.vercel.app
- Backend API (Render): https://orders-products-app.onrender.com

The backend free tier may take a few seconds to wake up after inactivity.

## Installation

```bash
git clone https://github.com/RusVass/orders-products-app.git
cd orders-products-app

cd client && npm install
cd ../server && npm install
```

## Running Locally

Requires Node 20+.

Start the client (from `client/`):

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

Start the backend in a second terminal (from `server/`) to enable the live session counter:

```bash
npm start
```

The backend runs at `http://localhost:4500`.

## Docker

Run both services with one command (requires only Docker):

```bash
docker compose up --build
```

- Frontend: `http://localhost:8080`
- Backend: `http://localhost:4500`

## Project Structure

```
client/   React app (Vite + TypeScript, lightweight Feature-Sliced Design)
server/   Express + Socket.io backend
db/       SQL schema (documentation only, not connected to the app)
docs/     Mockups and original assignment material
```

## Notes

- All data is seeded mock data held in Redux — there's no real persistence, so changes reset on refresh.
- Orders and products match the original `app.js` mock data shape; this is intentional scope.
