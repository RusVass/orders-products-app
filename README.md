# orders-products-app

Inventory-style Orders & Products manager. React 18 + TypeScript + Redux Toolkit frontend over mock data, with a minimal Express + Socket.io backend for a live "active sessions" counter.

**Scope:** Orders and Products only — matches the original `app.js` mock data shape exactly. The reference mockups in `docs/mockups/` also show Groups and Users sections and extra Product fields (status, group, owner); these are intentionally out of scope for this assignment.

**State:** All data lives in Redux, seeded from a typed mock dataset. Deletions only affect Redux state — there's no real persistence, so a page refresh resets everything back to the seed data. This is expected behavior, not a bug.

## Project structure

- `client/` — React app (Vite)
- `server/` — Express + Socket.io backend (live "active sessions" counter only)
- `db/` — SQL schema and design notes, documentation only — see [db/README.md](db/README.md)
- `docs/mockups/` — reference design mockups
- `docs/source/` — original assignment material, kept verbatim for reference

## Running locally

```bash
cd client
npm install
npm run dev
```

To also see the live "active sessions" counter in the header, run the backend in a second terminal:

```bash
cd server
npm install
npm start
```

## Deployment

**Live demo:** _(not yet deployed — add the links here once both services are live)_

This repo is a monorepo (`client/` and `server/` aren't separate repos), so when connecting it to any host, set that host's **root/base directory** to `client` or `server` accordingly — otherwise the host will try to build from the repo root and fail to find a `package.json`.

`VITE_SOCKET_URL` and `CLIENT_URL` depend on *each other's* deployed URL, so deploy in this order to avoid a chicken-and-egg loop:

1. **Deploy the backend first** (Render or Railway — setup is nearly identical on both):
   - Root directory: `server`
   - Start command: `npm start`
   - Environment variables: `PORT` (most hosts set this automatically — leave it unset unless yours requires it), `CLIENT_URL` (leave as a placeholder for now, e.g. `http://localhost:5173` — you'll come back and update this in step 3)
   - Note the public URL the host gives you (e.g. `https://your-app.onrender.com`).

2. **Deploy the frontend** (Vercel or Netlify — both auto-detect Vite; config files are already in `client/` — `vercel.json` and `netlify.toml`):
   - Root directory: `client`
   - Build command: `npm run build` · Output directory: `dist`
   - Environment variable: `VITE_SOCKET_URL` = the backend URL from step 1 (e.g. `https://your-app.onrender.com`) — this **must** be set before the build runs, since Vite inlines env vars into the bundle at build time, not at runtime.
   - Note the public URL the host gives you (e.g. `https://your-app.vercel.app`).

3. **Go back to the backend's dashboard** and update `CLIENT_URL` to the frontend URL from step 2, then redeploy/restart the backend so CORS picks up the change. Without this step, the live "active sessions" counter will fail silently (CORS blocks the socket connection in the browser console, nothing crashes visibly).

**Free-tier cold start:** if your backend host has a free/sleep tier (e.g. Render's free plan), it spins down after a period of inactivity. The first visitor after idle may briefly see "0 online" while the backend wakes up and the socket reconnects — this is expected, not a bug.
