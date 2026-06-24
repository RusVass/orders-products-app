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

## Architecture

`client/src` follows a lightweight Feature-Sliced Design: `app` (store, router, composition root) → `pages` (route-level, thin) → `widgets` (`layout` — Sidebar/Header/AppLayout) → `features` (named user actions) → `entities` (`order`, `product` — each owns its own `model/` and, where needed, `ui/`) → `shared` (generic, no domain knowledge). Dependencies only point one direction, app → ... → shared, and layers are held by convention rather than enforced tooling (no barrel files, no lint-boundary plugin) — proportionate for this app's size.

A few decisions worth calling out specifically:

- **Entities never reference each other.** `entities/order` and `entities/product` each own only their own slice/selectors/types. Deleting an order needs to remove its products too, but that cascade isn't a cross-slice `extraReducers` listener — it's `features/delete-order`, which explicitly dispatches both `orderRemoved` and `productsRemovedByOrder`. Cross-entity *reads* (e.g. a product row showing its parent order's title) are resolved the same way: a plain `useMemo`/`.find()` at the page level, not a selector that reaches into another entity's state.
- **Features only exist where there's real orchestration to name.** `delete-order` earns a feature (two actions, two entities) — `delete-product` and the type/specification filters don't (one dispatch, or local component state), so they're inlined directly in their pages rather than abstracted prematurely.
- **The realtime "online" counter is a hook, not a slice.** It's read by exactly one component and has no business logic beyond "show me the number the socket sent" — Redux would be indirection without payoff.
- **The backend's only job is the live counter.** Redux (seeded from typed mock data) is the actual source of truth; there's no database in the running path. `db/schema.sql` is a separate, documentation-only artifact demonstrating the relational design.
- **Docker and deployment account for Vite's build-time env inlining.** `VITE_SOCKET_URL` is a Docker build arg / hosting-platform build-time variable, not a runtime one — which is also why the deploy order matters (backend first, to get a URL to bake into the frontend's build).

## Running locally

Requires Node 20+.

```bash
cd client
npm install
npm run dev
```

Open the URL Vite prints (typically `http://localhost:5173`). The app works on its own — the header's "online" counter just stays at 0 until the backend (below) is running.

To also see the live "active sessions" counter in the header, run the backend in a second terminal:

```bash
cd server
npm install
npm start
```

Neither service requires a `.env` file for local dev — `client/.env.example` and `server/.env.example` document the defaults already baked into the code (`http://localhost:4500` / `http://localhost:5173`). You only need an actual `.env` to override those, or when deploying (see below).

### Running with Docker

Requires only Docker — no Node, npm, or local installs of any kind. Both services are built and run entirely inside containers, from a clean clone:

```bash
docker compose up --build
```

Client on `http://localhost:8080`, backend on `http://localhost:4500`. Stop with `docker compose down`.

If port `4500` or `8080` is already in use by something else on your machine, either free it or edit the host-side port (the part before the colon) in `docker-compose.yml`.

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
