# Release Checklist

## Code quality

- [x] `cd client && npm run lint` passes with zero errors
- [x] `cd client && npm run build` (`tsc -b && vite build`) passes with zero errors
- [x] No barrel (`index.ts`) files anywhere in `client/src`
- [x] No cross-entity imports between `entities/order` and `entities/product`
- [x] No `extraReducers` cross-slice coupling anywhere in the store

## Functionality (manual / scripted verification — no browser available in this environment)

- [x] Orders list renders all seed orders with correct computed product counts and price totals
- [x] Deleting an order also removes its products (`features/delete-order` dispatches both `orderRemoved` and `productsRemovedByOrder`)
- [x] Products list renders with correct parent-order lookup per row
- [x] Type/specification filters narrow the products list correctly
- [x] Route transitions and the `/orders` ↔ `/products` ↔ catch-all redirect all resolve
- [x] Realtime "online" counter: verified with real `socket.io-client` connections against a running server — connect increments and broadcasts, disconnect decrements and broadcasts, confirmed with an isolated two-client run showing the exact 1 → 2 → 1 sequence
- [ ] **Visual/manual check in an actual browser** — not done by the agent (no browser tool in this environment). Run `npm run dev` and click through both pages before considering this release-ready.

## Docker

- [x] `docker compose up --build` builds and starts both containers
- [x] Client bundle has the correct `VITE_SOCKET_URL` baked in (verified by inspecting the served JS)
- [x] CORS allows exactly the configured `CLIENT_URL` origin
- [x] Final client image contains only nginx + static assets (multi-stage build, no `node_modules`/source leaked in)
- [x] Re-verified end-to-end after merging all branches into `main`

## Environment variables

- [x] Every env var actually read in code (`VITE_SOCKET_URL`, `PORT`, `CLIENT_URL`) is documented in the matching `.env.example`, with defaults that match the code's fallback values exactly
- [x] No undocumented or stale env vars

## Documentation

- [x] README reviewed via a genuine fresh clone (`git clone` into an isolated temp directory) and the documented steps followed literally — `npm install`, `npm run lint`, `npm run build`, `npm run dev`, and the server's `npm start` all work exactly as written
- [x] README documents both the two-terminal local workflow and the one-command Docker workflow
- [x] README documents that `.env` is optional for local dev (defaults match) and required for deployment
- [x] Deployment section documents the env var sequencing (backend → frontend → back to backend for `CLIENT_URL`), the monorepo root-directory setting each host needs, and the free-tier cold-start caveat
- [ ] **Live demo links** — placeholder in README until actually deployed (the agent cannot create hosting accounts or deploy)

## Before merging/pushing

- [x] All 9 planned branches merged into `main` via fast-forward (linear history, no divergence existed)
- [ ] Push `main` to `origin` (not done — confirm with the project owner before pushing)
- [ ] Actually deploy frontend + backend and fill in the README's live demo links
- [ ] Generate the MySQL Workbench `.mwb` from `db/schema.sql` if a literal `.mwb` deliverable is required (manual GUI step, documented in `db/README.md`)
