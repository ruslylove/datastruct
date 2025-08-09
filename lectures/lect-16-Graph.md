---
# Frontmatter for Slidev configuration
title: 'Graphs'
transition: slide-left
theme: seriph
layout: cover
background: https://cover.sli.dev
---

# Graphs
## {{ $slidev.configs.subject }}
### Semester {{ $slidev.configs.semester }}
<br>

### Presented by {{ $slidev.configs.presenter }}

---
hideInToc: false
---

## Outline

<toc mode="onlySiblings" minDepth="2" columns="2"/>

---

## What is a Graph?

* A **graph** `G` is a structure composed of two main parts:
    * A set `V` of **vertices** (nodes).
    * A collection `E` of **edges**, where each edge connects a pair of vertices.
* Both vertices and edges can store data elements.
* **Example:** Modeling flight routes - vertices are airports (storing airport codes), edges are flight paths (storing mileage).

(Diagram showing airports connected by flight routes with distances)

---

## Types of Edges

* **Directed Edge:** An ordered pair `(u, v)`, where `u` is the **origin** and `v` is the **destination**. Represents a one-way connection (e.g., a specific flight).
* **Undirected Edge:** An unordered pair `(u, v)`, representing a two-way connection (e.g., a general flight route exists between two cities).
* **Directed Graph (Digraph):** A graph where all edges are directed.
* **Undirected Graph:** A graph where all edges are undirected.

---

## Graph Terminology

* **Endpoints:** The two vertices connected by an edge.
* **Incident:** An edge is incident on its endpoints.
* **Adjacent Vertices:** Two vertices connected by an edge.
* **Degree (Undirected):** The number of edges incident on a vertex `v`, denoted `deg(v)`.
* **Out-degree (Directed):** The number of edges originating *from* vertex `v`, denoted `out_degree(v)`.
* **In-degree (Directed):** The number of edges terminating *at* vertex `v`, denoted `in_degree(v)`.
* **Parallel Edges:** Two or more edges connecting the same pair of vertices.
* **Self-Loop:** An edge connecting a vertex to itself.
* **Simple Graph:** A graph with no parallel edges or self-loops.

(Diagram illustrating endpoints, adjacent vertices, degrees, parallel edges, and a self-loop)

---

## Graph Properties

Let `n` be the number of vertices (`|V|`) and `m` be the number of edges (`|E|`).

* **Property 1 (Sum of Degrees):** `Σ deg(v) = 2m` (for undirected graphs). Each edge contributes to the degree of two vertices.
* **Property 2 (Sum of In/Out-Degrees):** `Σ out_degree(v) = Σ in_degree(v) = m` (for directed graphs). Each edge has one origin and one destination.
* **Property 3 (Edge Bounds - Undirected Simple Graph):** In a simple undirected graph with `n >= 1` vertices, `0 <= m <= n(n-1)/2`. The maximum number of edges occurs when every vertex is connected to every other vertex.
* **Property 4 (Edge Bounds - Directed Simple Graph):** In a simple directed graph with `n >= 1` vertices, `0 <= m <= n(n-1)`. Each pair `(u, v)` can have two directed edges (`(u,v)` and `(v,u)`).

* **Notation:** We typically use `n` for the number of vertices and `m` for the number of edges.

---

## Paths and Cycles

* **Path:** A sequence of alternating vertices and edges `(v₀, e₁, v₁, e₂, ..., eₖ, vₖ)` such that edge `eᵢ` connects vertices `vᵢ₋₁` and `vᵢ`.
* **Simple Path:** A path where all vertices (except possibly the first and last) are distinct.
* **Cycle:** A path where the start and end vertices are the same (`v₀ = vₖ`) and the path is simple otherwise.
* **Directed Path/Cycle:** Follows the direction of edges.

(Diagrams illustrating a path, a simple path, and a cycle in a graph)

---

## Connectivity

* **Connected (Undirected):** An undirected graph is connected if there is a path between any two distinct vertices.
* **Connected Components:** The maximal connected subgraphs of an unconnected graph.
* **Strongly Connected (Directed):** A directed graph is strongly connected if there is a directed path from `u` to `v` AND a directed path from `v` to `u` for every pair of vertices `(u, v)`.
* **Subgraph:** A graph `H` whose vertices and edges are subsets of another graph `G`.
* **Spanning Subgraph:** A subgraph `H` of `G` that includes *all* vertices of `G`.

(Diagrams showing connected components and a strongly connected directed graph)

---

## Vertices and Edges as Objects

* We can model graphs using object-oriented principles.
* Define `Vertex` and `Edge` classes (or interfaces).
* Each `Vertex` object stores its element and potentially references to incident edges.
* Each `Edge` object stores its element and references to its endpoint vertices.

---

## The Graph ADT

Defines core operations for manipulating graph structures:

* **Accessor Methods:**
    * `numVertices()`, `numEdges()`: Return counts.
    * `vertices()`: Return an iterable collection of all vertices.
    * `edges()`: Return an iterable collection of all edges.
* **Edge-Specific Accessors:**
    * `getEdge(u, v)`: Return the edge connecting `u` and `v` (null if none).
    * `endVertices(e)`: Return an array/pair containing the endpoints of edge `e`.
    * `opposite(v, e)`: Given vertex `v` and incident edge `e`, return the *other* endpoint of `e`.
* **Vertex-Specific Accessors:**
    * `outDegree(v)`, `inDegree(v)`: Return degrees (relevant for directed/undirected).
    * `outgoingEdges(v)`, `incomingEdges(v)`: Return iterables of edges incident to `v`.
* **Update Methods:**
    * `insertVertex(element)`: Create and add a new vertex, return it.
    * `insertEdge(u, v, element)`: Create and add a new edge between `u` and `v`, return it.
    * `removeVertex(v)`: Remove vertex `v` and all its incident edges.
    * `removeEdge(e)`: Remove edge `e`.

---

## Graph Implementation: Edge List Structure

* **Concept:** Maintain separate collections (e.g., lists) for vertices and edges.
* **Vertex Object:** Stores its element and potentially its position within the vertex list.
* **Edge Object:** Stores its element, references to its two endpoint `Vertex` objects, and potentially its position within the edge list.
* **Performance:**
    * Finding vertices/edges incident to a vertex requires iterating through the *entire* edge list (O(m) time).
    * `getEdge(u, v)` also takes O(m) time.
    * Vertex/edge insertion/removal is generally fast (O(1) if using lists that support fast end operations).
    * Space: O(n + m).

(Diagram showing separate lists for vertices and edges, with objects referencing each other)

---

## Graph Implementation: Adjacency List Structure

* **Concept:** Augments the edge list by storing, *with each vertex*, a list of its adjacent vertices (or incident edges).
* **Vertex Object:** Stores element, position, and a reference to its adjacency list.
* **Edge Object:** Stores element, endpoints, positions in relevant adjacency lists, position in the main edge list.
* **Performance:**
    * Finding incident edges/adjacent vertices for `v` is efficient: O(degree(v)) time.
    * `getEdge(u, v)` takes O(min(deg(u), deg(v))) time.
    * Vertex/edge insertion/removal is generally O(1) amortized time.
    * Space: O(n + m). (Standard representation for sparse graphs).

(Diagram showing vertex objects pointing to lists of incident edges/adjacent vertices)

---

## Graph Implementation: Adjacency Matrix Structure

* **Concept:** Use a 2D array (matrix) `A` where `A[i][j]` stores information about the edge between vertex `vᵢ` and vertex `vⱼ`.
* Vertices are mapped to indices 0 to n-1.
* `A[i][j]` can store:
    * A boolean (edge exists or not).
    * An integer (e.g., edge weight).
    * A reference to the `Edge` object.
* **Performance:**
    * `getEdge(u, v)` takes O(1) time (direct matrix lookup).
    * Finding incident edges/adjacent vertices for `v` requires scanning a row/column (O(n) time).
    * Vertex/edge insertion/removal is O(1) (matrix update).
    * Space: **O(n²)**. Efficient only for *dense* graphs where `m` is close to `n²`.

(Diagram showing an adjacency matrix representation of a graph)

---

## Performance Trade-offs

| Operation           | Edge List | Adjacency List | Adjacency Matrix |
| :------------------ | :-------- | :------------- | :--------------- |
| Space               | O(n+m)    | O(n+m)         | O(n²)            |
| `numVertices`, `numEdges` | O(1) | O(1) | O(1) |
| `vertices`, `edges` | O(n), O(m)| O(n), O(m) | O(n), O(n²) |
| `getEdge`           | O(m)      | O(min(deg u, deg v)) | O(1) |
| `incidentEdges(v)`  | O(m)      | O(deg v)       | O(n)             |
| `areAdjacent(u,v)`  | O(m)      | O(min(deg u, deg v)) | O(1) |
| `insertVertex`      | O(1)      | O(1)           | O(n²) * |
| `insertEdge`        | O(1)      | O(1)           | O(1)             |
| `removeVertex(v)`   | O(m)      | O(deg v)       | O(n²) * |
| `removeEdge(e)`     | O(1)      | O(1)           | O(1)             |

*\* Adjacency Matrix insertion/removal of vertices is O(n²) because the matrix often needs resizing/rebuilding.*

---

## Graph Traversal: Depth-First Search (DFS)

* **Concept:** Explores the graph by going as deep as possible along a path before backtracking. Similar to preorder traversal of a tree.
* Uses recursion and marks vertices/edges as visited/unvisited.
* **Algorithm `DFS(G, u)`:** (Start at vertex `u`)

```text
Algorithm DFS(G, u):
  Mark u as VISITED
  Perform pre-visit action on u // Optional

  for each edge e incident on u:
    if edge e is UNEXPLORED then
      v = opposite(u, e)
      if vertex v is UNEXPLORED then
        Mark e as DISCOVERY edge
        DFS(G, v) // Recursive call
      else
        Mark e as BACK edge // Edge leads to an already visited vertex

  Perform post-visit action on u // Optional

```

* **Output:** Labels edges as "discovery" (forming a spanning tree) or "back" edges.

(Diagram illustrating DFS traversal steps and the resulting discovery/back edges)

---

## DFS Properties

* `DFS(G, v)` visits all vertices and edges in the connected component of `v`.
* The discovery edges form a **spanning forest** (a spanning tree if the graph is connected).
* Let `Tᵥ` be the DFS tree starting at `v`. An edge `(u, w)` is a back edge if `w` is an ancestor of `u` in `Tᵥ`.
* **Time Complexity:** O(n + m) assuming the graph is represented using an Adjacency List structure (each vertex/edge visited constant number of times).

---

## DFS Applications

* Finding paths between vertices.
* Finding connected components.
* Finding cycles in a graph.
* Computing spanning forests/trees.

---

## Path Finding using DFS

* Adapt DFS to find a path from `u` to `z`.
* Use a stack `S` to keep track of the current path.
* When moving from `v` to `w`, push `w` onto `S`.
* If `w == z`, the path is found (contents of `S`).
* If backtracking from `v`, pop `v` from `S`.

```text
Algorithm pathDFS(G, v, z, S): // S is the stack
  Mark v as VISITED
  Push v onto S
  if v == z then
    return true // Path found

  for each edge e incident on v:
    if edge e is UNEXPLORED then
      w = opposite(v, e)
      if vertex w is UNEXPLORED then
        Mark e as DISCOVERY
        if pathDFS(G, w, z, S) then
          return true // Path found downstream
      // else: Mark e as BACK (optional)

  Pop v from S // Backtracking
  return false // Path not found from v

```

---

## Cycle Finding using DFS

* Adapt DFS to detect cycles.
* A back edge `(v, w)` indicates a cycle involving the path in the DFS tree from `w` to `v` plus the back edge `(v, w)`.
* Modify the path-finding DFS: When a back edge `(v, w)` is encountered, the cycle consists of the elements currently on the stack from `w` up to `v`, plus `w` again.

```text
Algorithm cycleDFS(G, v, S): // S is the stack
  Mark v as VISITED
  Push v onto S

  for each edge e incident on v:
    if edge e is UNEXPLORED then
      w = opposite(v, e)
      if vertex w is UNEXPLORED then
        Mark e as DISCOVERY
        result = cycleDFS(G, w, S)
        if result is not null then return result // Cycle found downstream
      else // Edge e is a BACK edge to visited vertex w
        // Construct cycle from stack S from w to v
        cycle_path = extract_stack_segment(S, w, v)
        return cycle_path

  Pop v from S // Backtracking
  return null // No cycle found involving v

```

---

## Graph Traversal: Breadth-First Search (BFS)

* **Concept:** Explores the graph layer by layer, visiting all neighbors at the current "distance" before moving to the next layer.
* Uses a **queue** to manage vertices to be visited.
* **Algorithm `BFS(G, s)`:** (Start at vertex `s`)

```text
Algorithm BFS(G, s):
  Initialize all vertices/edges as UNEXPLORED
  Create an empty queue Q
  Mark s as VISITED
  Enqueue s into Q

  while Q is not empty:
    u = Q.dequeue()
    Perform visit action on u // Optional

    for each edge e incident on u:
      if edge e is UNEXPLORED then
        v = opposite(u, e)
        if vertex v is UNEXPLORED then
          Mark v as VISITED
          Mark e as DISCOVERY edge
          Enqueue v into Q
        else
          Mark e as CROSS edge // Edge connects vertices already visited but not parent/child

```

* **Output:** Partitions edges into "discovery" and "cross" edges. Also computes distances (shortest path length) from the start vertex `s`.

(Diagram illustrating BFS traversal steps, layers, and discovery/cross edges)

---

## BFS Properties

* `BFS(G, s)` visits all vertices and edges in the connected component of `s`.
* The discovery edges form a **spanning tree** `T<0xE2><0x82><s>` for the connected component of `s`.
* For any edge `(u, v)`, the level (distance from `s`) of `u` and `v` differ by at most 1.
* For every vertex `v` at level `i > 0`, the discovery edge `(u, v)` connects `v` to a vertex `u` at level `i-1`.
* Cross edges connect vertices either at the same level or at adjacent levels.
* **Time Complexity:** O(n + m) assuming the graph is represented using an Adjacency List structure.

---

## BFS Applications

* Finding paths with the minimum number of edges (shortest paths in unweighted graphs).
* Finding connected components.
* Computing spanning forests/trees.
* Testing bipartiteness.

---

## DFS vs. BFS Comparison

| Feature         | DFS                                 | BFS                                     |
| :-------------- | :---------------------------------- | :-------------------------------------- |
| Data Structure  | Stack (implicit via recursion)      | Queue                                   |
| Exploration     | Goes deep first                     | Explores layer by layer                 |
| Spanning Tree   | Typically deep and narrow           | Typically shallow and wide              |
| Shortest Paths  | No (finds *a* path)                 | Yes (finds shortest path in edge count) |
| Memory (Worst)  | O(n) (recursion depth)              | O(n) (queue size, can be large)         |

(Diagrams comparing typical DFS and BFS spanning trees on the same graph)

---

## Digraphs (Directed Graphs)

* All concepts (paths, cycles, traversals) apply, but edge directions must be respected.
* **Reachability:** Can vertex `w` be reached from vertex `v`? Solved by DFS or BFS starting from `v`.
* **Strong Connectivity:** Can `u` reach `v` AND `v` reach `u` for all pairs? Requires more complex algorithms (e.g., running DFS twice or using Kosaraju's/Tarjan's algorithm).

---

## Transitive Closure

* **Concept:** Computes reachability for *all* pairs of vertices.
* **Output:** A graph `G*` where an edge `(u, v)` exists in `G*` if and only if there is a directed path from `u` to `v` in the original graph `G`.
* **Algorithms:**
    1.  Run DFS/BFS starting from *each* vertex `v`. Time: O(n(n+m)).
    2.  **Floyd-Warshall Algorithm:** Dynamic programming approach. Computes reachability iteratively. Time: O(n³). More suitable for dense graphs.

---

## Floyd-Warshall Algorithm

* **Idea:** Number vertices 1 to `n`. Compute graph `Gₖ` where edges represent paths using only intermediate vertices from {1, ..., k}.
* **Iteration:** `G₀ = G`. Compute `Gₖ` from `Gₖ₋₁`. An edge `(i, j)` exists in `Gₖ` if:
    * It exists in `Gₖ₋₁` OR
    * Both edges `(i, k)` and `(k, j)` exist in `Gₖ₋₁`.
* Final result is `Gₙ`.
* Uses boolean adjacency matrices.

```text
Algorithm FloydWarshall(G):
  Initialize G₀ = AdjacencyMatrix(G)
  for k from 1 to n:
    Initialize Gₖ = Gₖ₋₁
    for i from 1 to n (where i != k):
      for j from 1 to n (where j != i, k):
        // Check if path i -> k -> j exists
        if Gₖ₋₁[i][k] AND Gₖ₋₁[k][j] then
          Gₖ[i][j] = true // Add edge (i, j) if path exists

  return Gₙ // The transitive closure matrix

```

* Time complexity: O(n³).
