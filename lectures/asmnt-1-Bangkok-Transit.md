---
# Frontmatter for Slidev configuration
title: "DSA Assignment: Bangkok Transit Navigator"
transition: slide-left
theme: seriph
layout: cover
background: https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Bangkok_BTS_01.jpg/960px-Bangkok_BTS_01.jpg
---

# DSA Assignment: Bangkok Transit Navigator
## Web App Edition
### {{ $slidev.configs.subject }}
### Semester {{ $slidev.configs.semester }}

---
layout: two-cols
---

## Objectives

* Build a weighted graph from a real-world, imperfectly-structured CSV file.
* Model line-transfer penalties as a graph-modeling problem, not just an algorithm problem.
* Implement Dijkstra's algorithm with **two cost functions** (time vs. interchange count) over the same graph.
* Render the network visually, with line identity (color) as the primary encoding.
* Design a small, usable UI on top of a correct backend algorithm.

:: right ::

<img src="/bangkok-transit-map.jpg" style="width: 400px"/>

<br>

This assignment builds on Lectures 18–19 (Graphs, Shortest Paths). Review the Graph ADT, Dijkstra's algorithm, and priority queues before starting.

---

## Scenario

You will build a small web application, the **Bangkok Transit Navigator**, that lets a rider:

1. Enter an **origin** and **destination** station.
2. Enter either a **departure time** ("leaving at 08:15, when do I arrive?") or a **desired arrival time** ("need to be there by 09:00, when should I leave?").
3. Choose how the route is optimized: **fastest total time**, or **fewest interchanges**.
4. See the resulting itinerary as text (stop-by-stop) and as a **line-colored map** with the chosen route highlighted.

This is a full application with a graph engine and a browser-based UI, reasoning about **time**, not just hop count.

---

## The Data

File: `assignment/bangkok_transit/bangkok_network_graph.csv`

| Column | Meaning |
|---|---|
| `Source/Target_Station_Code` | Unique code for the platform (e.g. `N8`, `BL12`) |
| `Source/Target_Station_Name` | Human-readable name (e.g. `Mo Chit`) |
| `Edge_Type` | `Line Track` (ride) or `Interchange Connection` (walk to change lines) |
| `Line_Context` | Which line the edge belongs to |

**Read the whole file before you start coding** — it has data-quality quirks that drive real design decisions (next slide).

---

## Data Quirks You Must Handle

* **Codes are identity, names are not.** Some interchange stations have *two codes* for one physical place — e.g. Bang Wa is `S12` (BTS) and `BL33` (MRT). Key your graph on **code**.
* **`Line Track` rows are traced in one direction** as the line was recorded, but riders travel either way — decide how you represent that, consistently.
* **MRT Blue Line has a loop and a branch.** `BL01 (Tha Phra)` closes a loop via `BL31`, and also branches toward `BL37 (Lak Song)`. Your representation must support this without special-casing.
* **A minor duplicate:** the `BL01`–`BL32` edge appears twice, tagged differently. Decide whether to de-duplicate, and say so in your report.
* **A self-loop at `CEN` (Siam)** — the single most important modeling decision in this assignment. More on this shortly.

---

## Part 1: Build the Graph

* Parse the CSV into an in-memory graph using the Graph ADT style from Lecture 18 (vertices/edges as objects, adjacency list keyed by vertex).
* Vertices are station **codes**; store display name and line as vertex attributes.

**Justification required:** In your report, justify adjacency list vs. adjacency matrix in terms of the network's sparsity — count the vertices and edges and say so explicitly.

---

## Part 2: Visualize the Network

Render every station and every `Line Track` edge, each line in a **distinct, consistent color**:

| Line | Suggested color |
|---|---|
| BTS Sukhumvit Line | Light green |
| BTS Silom Line | Dark green |
| MRT Blue Line (incl. branch) | Blue |
| MRT Purple Line | Purple |
| Interchange Connection edges | Neutral/grey, drawn differently (dashed, thinner) — "walk here," not "ride here" |

* No real geographic coordinates needed — a clean, readable layout is enough.
* Once Part 4 works, the same view must **highlight a computed route** (bolder stroke, boarding/alighting/interchange markers).
* Rendering libraries (D3.js, Cytoscape.js, vis-network, hand-rolled SVG/Canvas) are fine — the graph and pathfinding code must be your own.

---

## Part 3: Weighting the Graph

Assign a **time cost** to every edge:

* **`Line Track` edges:** no travel-time column is given — choose and justify a constant per segment. A reasonable default is **2.5–3 minutes** between adjacent stations.
* **`Interchange Connection` edges between two different codes** (e.g. `E4` ↔ `BL21`, `S12` ↔ `BL33`): a real walk between platforms/buildings. A reasonable default penalty is **5–7 minutes**.

---
layout: two-cols-header
---

## The Siam Gotcha — Read Before You Code

At `CEN` (Siam), both the Sukhumvit and Silom lines share the **same vertex code**. A naive walk from `N1` to `S1` can pass straight through `CEN` — arriving on one line, leaving on the other — **without ever using the `CEN→CEN` self-loop**, silently costing zero for a real cross-platform transfer.

:: left ::

**You need a strategy that reliably charges the penalty whenever `Line_Context` changes at `CEN`**, and that also counts correctly as an interchange for the fewest-interchanges mode.

:: right ::

Two directions worth considering:

* Search over **`(station_code, current_line)`** pairs — naturally also covers explicit `Interchange Connection` edges elsewhere.
* Or keep bare-station-code search, and add bookkeeping in path reconstruction that detects a `Line_Context` change at `CEN`.

Either is acceptable — silently free transfers through Siam are not. Justify your choice in the report.

---
layout: two-cols
---

## Part 4: The Web App

**Departure mode:** given origin, destination, and departure time, compute the shortest-cost path and report the estimated **arrival time** and full itinerary.

**Arrival mode:** given a desired arrival time, report the **latest departure time** that still meets it (`departure = arrival − total travel time`).

:: right ::

**Optimization mode** — user chooses, over the *same graph*:

* **Fastest route:** minimize total time.
* **Fewest interchanges:** minimize line changes, using time only to break ties.

Implement as two cost functions/comparators feeding the same Dijkstra implementation — not two unrelated algorithms.

---

## Part 4: UI Requirements

* Origin/destination pickers (autocomplete or dropdown over station **names** — remember several names map to more than one code).
* A time input, with a toggle between "Depart at" / "Arrive by."
* A toggle between "Fastest" / "Fewest interchanges."
* Output: a stop-by-stop itinerary, e.g.:

> *"Board BTS Sukhumvit Line at Mo Chit (08:15) → ride to Siam (08:32) → cross platform to BTS Silom Line (08:35) → ride to Sala Daeng (08:44). Total: 29 min, 1 interchange."*

  plus the highlighted map.
* Basic error handling: identical origin/destination, unknown station, malformed time.

---

## Technical Constraints

* **You must implement the graph, Dijkstra's algorithm (or your chosen shortest-path algorithm), and the priority queue yourself.** Do not call a library's built-in shortest-path or routing function — that's what's being assessed.
* Any language/stack is fine (vanilla JS/TS in the browser; a small Node/Express, Java, or Python backend with an HTML/JS frontend). A simple single-page client-side app is entirely sufficient.
* For **rendering only** (map drawing, layout, UI widgets), third-party libraries are fine — that isn't the DSA content of this assignment.

---
layout: two-cols
---

## Deliverables

* **Source code**, organized and readable, with instructions to run it locally (e.g. `README.md`).
* **Report** covering:
    * Your name and Student ID.
    * Graph representation choice and sparsity justification.
    * How you modeled and charged interchange penalties, including your answer to the Siam (`CEN`) gotcha.

:: right ::

* How you adapted Dijkstra for the fewest-interchanges objective.
* The travel-time and interchange-penalty constants you chose, and why.
* Any data-cleaning decisions (e.g. the `BL01`↔`BL32` duplicate).
* **Example runs** (screenshots or text) for the test cases below.

---

## Grading Rubric

| Criterion | Weight |
|---|---|
| Graph correctly built from the CSV (codes vs. names, loop/branch, direction) | 20% |
| Correct time-weighted shortest path, both departure and arrival modes | 20% |
| Correct fewest-interchanges mode, including the Siam case | 20% |
| Visualization: lines colored and distinguishable, route highlighting works | 15% |
| Report: clear justification of design decisions above | 15% |
| UI usability & error handling | 10% |

---

## Example Test Cases

Verify your app against at least these routes (exact times depend on your chosen constants — what's graded is that the logic and interchange count are correct):

1. **Bang Wa (`S12`/`BL33`) → Lat Phrao (`BL14`)** — exercises the BTS↔MRT interchange at Bang Wa and the MRT Blue Line loop/branch.
2. **Lak Song (`BL37`) → Kheha (`E23`)** — a long cross-network trip, traversing most of the Blue Line then most of the Sukhumvit Line.
3. **Ratchathewi (`N1`) → National Stadium (`W1`)** — the Siam gotcha: must reflect a cross-platform interchange cost at `CEN`, not a free pass-through.
4. Any pair of your choosing, once **"fastest"** and once **"fewest interchanges"**, where the two modes give a *different* route.

---

## 🎁 Bonus Challenges (Optional for Extra Credit)

* **Train frequency / headway:** assume each line runs every *N* minutes and add expected wait time when boarding or transferring — makes "plan by arrival" genuinely asymmetric with "plan by departure."
* **First/last train:** model service hours and reject or adjust queries outside them.
* **Station closure:** let the user mark a station "closed for maintenance" and recompute the best detour.
* **Shareable route:** encode a computed trip in the URL so it can be copied and reopened directly to that result.

---

## AI Collaboration & Submission

* You may use an AI assistant to discuss graph-modeling approaches (e.g. "how do I represent a rider's current line as part of a Dijkstra search state?") or to debug.
* You may **not** have it design your whole solution — you must be able to explain, live, any part of your submitted code, including your Siam interchange handling.
* Disclose any significant AI assistance in your report.
* Submit your source code repository link (or archive) and report PDF via the course site by the announced deadline.
