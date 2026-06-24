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
