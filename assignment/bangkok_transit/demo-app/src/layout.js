'use strict';

/**
 * Computes a schematic (not geographic) (x, y) for every station, purely
 * from the graph's own structure -- no per-station coordinates are
 * hardcoded. Per the assignment (section 5), real geographic coordinates
 * are not required; a clean, readable layout is enough.
 *
 * Sukhumvit and Silom are simple paths, so we just walk each from one
 * endpoint to the other. The Blue Line is a loop with a branch, so we
 * detect the degree-3 branch vertex and walk its three arms: the two
 * that return to the branch vertex form the loop, the one that ends at a
 * degree-1 vertex is the branch tail.
 */

function buildAdjacency(pairSet) {
  const adj = new Map();
  const add = (a, b) => {
    if (!adj.has(a)) adj.set(a, new Set());
    adj.get(a).add(b);
  };
  for (const pair of pairSet) {
    const [a, b] = pair.split('|');
    add(a, b);
    add(b, a);
  }
  return adj;
}

function walkPath(adjacency) {
  const start = [...adjacency.entries()].find(([, nbrs]) => nbrs.size === 1)?.[0];
  if (start === undefined) return null;
  const order = [start];
  let prev = null;
  let current = start;
  for (;;) {
    const next = [...adjacency.get(current)].find((n) => n !== prev);
    if (next === undefined) break;
    order.push(next);
    prev = current;
    current = next;
  }
  return order;
}

function walkArm(adjacency, start, branchVertex) {
  const path = [start];
  let prev = branchVertex;
  let current = start;
  for (;;) {
    if (current === branchVertex) return { path, closedLoop: true };
    const neighbors = [...adjacency.get(current)];
    const next = neighbors.find((n) => n !== prev);
    if (next === undefined) return { path, closedLoop: false };
    if (next === branchVertex) {
      path.push(next);
      return { path, closedLoop: true };
    }
    path.push(next);
    prev = current;
    current = next;
  }
}

function walkLoopWithBranch(adjacency) {
  const branchVertex = [...adjacency.entries()].find(([, nbrs]) => nbrs.size === 3)?.[0];
  if (branchVertex === undefined) return null;

  const arms = [...adjacency.get(branchVertex)].map((n) => walkArm(adjacency, n, branchVertex));
  const loopArms = arms.filter((a) => a.closedLoop);
  const tailArm = arms.find((a) => !a.closedLoop);
  if (loopArms.length !== 2 || !tailArm) return null;

  // The branch vertex's two "loop" neighbors sit on the *same* single
  // cycle, just walked in opposite directions -- each arm on its own
  // already visits every other station on the cycle before returning to
  // branchVertex. (Combining both, as an earlier version of this function
  // did, double-counts the cycle and folds it back on itself.) So one arm
  // is the whole loop; take the longer one as a small safety margin.
  const loopArm = loopArms[0].path.length >= loopArms[1].path.length ? loopArms[0] : loopArms[1];
  const loopOrder = [branchVertex, ...loopArm.path.slice(0, -1)];
  const branchOrder = [branchVertex, ...tailArm.path];
  return { loopOrder, branchOrder, branchVertex };
}

function computeLayout(network) {
  const { linePairs, graph, stationInfo } = network;
  const positions = new Map(); // code -> { x, y }
  const placed = new Set();

  const labelTier = new Map(); // code -> 0 | 1, alternated along each line's own walk order
                                // so that labels of physically adjacent stations stagger
                                // into two rows instead of running into each other.

  const place = (code, x, y, tier = 0) => {
    if (!placed.has(code)) {
      positions.set(code, { x, y });
      labelTier.set(code, tier);
      placed.add(code);
    }
  };

  // All three lines are laid out as horizontal rows, stacked top to bottom,
  // so the whole map reads as a set of roughly parallel tracks (like a
  // standard transit schematic) instead of lines crossing at arbitrary
  // angles -- interchange connectors between rows stay short and easy to
  // trace instead of fanning out.
  const SPACING = 22;
  const ROW_SUKHUMVIT_Y = 60;
  const ROW_SILOM_Y = 150;
  const ROW_BLUE_TOP_Y = 260;
  const ROW_BLUE_BOTTOM_Y = 400;

  // --- BTS Sukhumvit Line: top row ---
  const sukhumvitAdj = buildAdjacency(linePairs.get('BTS Sukhumvit Line') || new Set());
  const sukhumvitOrder = walkPath(sukhumvitAdj) || [];
  const SUK_START_X = 50;
  sukhumvitOrder.forEach((code, i) => place(code, SUK_START_X + i * SPACING, ROW_SUKHUMVIT_Y, i % 2));

  // --- BTS Silom Line: second row, hanging off Siam (CEN) with a single
  // short connector -- everything else on this line is a clean horizontal
  // run, parallel to the Sukhumvit row above it. ---
  const silomAdj = buildAdjacency(linePairs.get('BTS Silom Line') || new Set());
  const silomOrder = walkPath(silomAdj) || [];
  const cenIndex = silomOrder.findIndex((c) => positions.has(c));
  if (cenIndex >= 0) {
    const cen = positions.get(silomOrder[cenIndex]);
    silomOrder.forEach((code, i) => {
      if (code === silomOrder[cenIndex]) return; // CEN keeps its Sukhumvit-row position
      const delta = i - cenIndex;
      place(code, cen.x + delta * SPACING, ROW_SILOM_Y, i % 2);
    });
  }

  // --- MRT Blue Line: loop flattened into a racetrack (a horizontal top
  // row and a horizontal bottom row, joined at both ends), with the branch
  // continuing the top row further out to one side. ---
  const bluePairs = new Set(linePairs.get('MRT Blue Line') || new Set());
  const blueAdj = buildAdjacency(bluePairs);
  const blueStructure = walkLoopWithBranch(blueAdj);
  if (blueStructure) {
    const { loopOrder, branchOrder } = blueStructure;
    const BLUE_START_X = 90;
    const half = Math.ceil(loopOrder.length / 2);
    const topPart = loopOrder.slice(0, half);
    const bottomPart = loopOrder.slice(half);
    topPart.forEach((code, i) => place(code, BLUE_START_X + i * SPACING, ROW_BLUE_TOP_Y, i % 2));
    bottomPart.forEach((code, j) => {
      const x = BLUE_START_X + (bottomPart.length - 1 - j) * SPACING;
      place(code, x, ROW_BLUE_BOTTOM_Y, j % 2);
    });
    // branchOrder[0] is the branch vertex == topPart[0]; continue leftwards
    // along the same top row so the branch reads as an extension, not a
    // diagonal offshoot.
    branchOrder.forEach((code, i) => {
      if (i === 0) return;
      place(code, BLUE_START_X - i * SPACING, ROW_BLUE_TOP_Y, i % 2);
    });
  }

  // --- Anything left over (e.g. a Purple Line stub with no track edges of
  // its own) is placed just outside its one neighbor via an interchange edge. ---
  for (const code of stationInfo.keys()) {
    if (positions.has(code)) continue;
    const neighborEdge = graph.outgoingEdges(code)[0];
    if (neighborEdge && positions.has(neighborEdge.to)) {
      const anchor = positions.get(neighborEdge.to);
      const neighborTier = labelTier.get(neighborEdge.to) ?? 0;
      place(code, anchor.x - 70, anchor.y + 10, neighborTier === 0 ? 1 : 0);
    } else {
      place(code, 30, 30); // fallback, should not normally happen
    }
  }

  return { positions, labelTier };
}

module.exports = { computeLayout };
