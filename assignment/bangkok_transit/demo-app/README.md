# Bangkok Transit Navigator -- Reference Demo

A working reference implementation of the Assignment 1/2026 web app
(see `../ASSIGNMENT.md`), built with Node.js + Express.

**Instructor use only.** This is a solution to the assignment -- don't
share this folder (or its URL, if deployed) with students before the
deadline.

## What it demonstrates

- `src/graph.js` -- a plain adjacency-list Graph ADT.
- `src/priorityQueue.js` -- a hand-rolled binary min-heap (no library
  priority queue).
- `src/network.js` -- builds the graph from the CSV and runs a
  **state-space Dijkstra** where the state is `(station, current line)`.
  That's what correctly charges the Siam (`CEN`) cross-platform transfer
  described in `ASSIGNMENT.md` section 6.1 -- see the comments there for
  why a plain station-only search gets this wrong.
- `src/layout.js` -- derives each line's station order from the graph
  itself (not hardcoded coordinates) and lays out all three lines as
  stacked parallel rows -- Sukhumvit, then Silom (hanging off a single
  connector at Siam), then the Blue Line loop flattened into a rectangle
  with its branch extending sideways -- so the map reads like a ladder:
  follow one row, drop down a rung at an interchange, follow the next row.
- `app.js` -- the actual Express app (API + static frontend + the access
  gate below); `server.js` runs it locally, `api/index.js` exposes it to
  Vercel as a serverless function.
- `public/` -- a small vanilla-JS/SVG frontend: station pickers,
  depart/arrive toggle, fastest/fewest-interchanges toggle, an SVG map
  colored by line, and route highlighting.

## Run it

```bash
npm install
npm start
```

Then open http://localhost:3000.

By default there's no access gate locally. To test the password gate that
protects the public deployment (see below), run instead:

```bash
DEMO_USER=prof DEMO_PASS=some-password node server.js
```

## Deploying to Vercel (free hosting)

This is a solution to a live assignment, so the deployment is gated with
HTTP Basic Auth (username/password) -- **set `DEMO_USER` and `DEMO_PASS`
as Vercel project environment variables before your first deploy**, or
anyone with the URL can open it.

```bash
cd assignment/bangkok_transit/demo-app
npx vercel login          # opens a browser / sends a login email -- your account, not scriptable
npx vercel                # first deploy: link/create the project, deploy a preview
npx vercel env add DEMO_USER production   # paste a username when prompted
npx vercel env add DEMO_PASS production   # paste a password when prompted
npx vercel --prod         # redeploy so the new env vars take effect
```

`vercel.json` routes every request (API and static frontend alike) through
`api/index.js`, which just re-exports the same Express `app` used
locally, so the auth gate in `app.js` covers the whole site, not just the
API. The CSV the app reads is bundled at `data/bangkok_network_graph.csv`
(a copy of `../bangkok_network_graph.csv`, since Vercel only uploads this
`demo-app/` directory) -- if you edit the canonical CSV, copy it here
again before redeploying.

To take the deployment down later: `npx vercel remove <project-name>`.

## Try the assignment's example test cases

- **Bang Wa (`S12`) -> Lat Phrao (`BL14`)**: exercises the Blue Line
  loop/branch.
- **Lak Song (`BL37`) -> Kheha (`E23`)**: a long cross-network trip.
- **Ratchathewi (`N1`) -> National Stadium (`W1`)**: the Siam gotcha --
  should show a "Cross platform at Siam" step and 1 interchange, not 0.
- **Khu Khot (`N24`) -> Si Lom (`BL25`)**, once with "Fastest time" and
  once with "Fewest interchanges": the two modes return genuinely
  different routes (2 interchanges/84 min vs. 1 interchange/87 min).

## Notes on the implementation choices

- Time constants (`TRACK_MINUTES`, `INTERCHANGE_WALK_MINUTES`,
  `SELF_TRANSFER_MINUTES`) live at the top of `src/network.js` and match
  the assignment's suggested defaults.
- "Fewest interchanges" is implemented as a single Dijkstra with a
  different priority key (`interchanges * BIG + minutes`), not a
  separate algorithm -- matching the assignment's requirement that both
  modes share the same shortest-path implementation.
- The map layout is schematic, not geographic (per the assignment,
  that's explicitly not required); it's computed from the CSV's graph
  structure, not from hand-placed coordinates.
