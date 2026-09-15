'use strict';

const { Graph } = require('./graph');
const { MinPriorityQueue } = require('./priorityQueue');
const { loadEdgeRecords } = require('./csvLoader');

// Suggested defaults from the assignment (section 6) -- adjust freely.
const TRACK_MINUTES = 3;              // riding between adjacent stations on one line
const INTERCHANGE_WALK_MINUTES = 6;   // walking between two different platform codes
const SELF_TRANSFER_MINUTES = 3;      // Siam-style cross-platform transfer (same code, different line)

const FEWEST_INTERCHANGE_WEIGHT = 1_000_000; // dominates time so interchange count is primary key

function lineGroup(lineContext) {
  if (lineContext.includes('Sukhumvit')) return 'BTS Sukhumvit Line';
  if (lineContext.includes('Silom')) return 'BTS Silom Line';
  if (lineContext.includes('Blue')) return 'MRT Blue Line';
  if (lineContext.includes('Purple')) return 'MRT Purple Line';
  return lineContext;
}

function lineColor(group) {
  switch (group) {
    case 'BTS Sukhumvit Line': return '#7AC943';
    case 'BTS Silom Line': return '#00693E';
    case 'MRT Blue Line': return '#114B9F';
    case 'MRT Purple Line': return '#7A3B93';
    default: return '#8A8A8A';
  }
}

/**
 * Builds the routable graph plus the auxiliary structures (station info,
 * self-transfer penalties, per-line station sequences for layout) from the
 * assignment's CSV.
 */
function buildNetwork(csvPath) {
  const records = loadEdgeRecords(csvPath);

  const graph = new Graph();
  const stationInfo = new Map(); // code -> { code, name, lines: Set }
  const selfTransfer = new Map(); // code -> minutes
  const linePairs = new Map(); // group -> Set("a|b") deduped undirected pairs, for layout

  const ensureStation = (code, name) => {
    if (!graph.hasVertex(code)) {
      graph.insertVertex(code, { code, name });
      stationInfo.set(code, { code, name, lines: new Set() });
    }
  };

  for (const rec of records) {
    if (rec.sourceCode === rec.targetCode) {
      // Self-loop row: marks a vertex where two lines share the same code
      // (e.g. CEN/Siam) and a cross-platform walk is required to switch.
      ensureStation(rec.sourceCode, rec.sourceName);
      selfTransfer.set(rec.sourceCode, SELF_TRANSFER_MINUTES);
      continue;
    }

    ensureStation(rec.sourceCode, rec.sourceName);
    ensureStation(rec.targetCode, rec.targetName);

    if (rec.edgeType === 'Line Track') {
      const group = lineGroup(rec.lineContext);
      graph.insertEdge(rec.sourceCode, rec.targetCode, TRACK_MINUTES, { type: 'track', line: group });
      graph.insertEdge(rec.targetCode, rec.sourceCode, TRACK_MINUTES, { type: 'track', line: group });
      stationInfo.get(rec.sourceCode).lines.add(group);
      stationInfo.get(rec.targetCode).lines.add(group);

      if (!linePairs.has(group)) linePairs.set(group, new Set());
      const [a, b] = [rec.sourceCode, rec.targetCode].sort();
      linePairs.get(group).add(`${a}|${b}`);
    } else if (rec.edgeType === 'Interchange Connection') {
      // source !== target here (self-loops handled above): a real walk
      // between two distinct platform codes.
      graph.insertEdge(rec.sourceCode, rec.targetCode, INTERCHANGE_WALK_MINUTES, {
        type: 'interchange',
        line: rec.lineContext,
      });
      graph.insertEdge(rec.targetCode, rec.sourceCode, INTERCHANGE_WALK_MINUTES, {
        type: 'interchange',
        line: rec.lineContext,
      });
    }
  }

  return { graph, stationInfo, selfTransfer, linePairs };
}

/**
 * State-space Dijkstra where the state is (station code, current line).
 * Tracking "current line" is what lets us correctly charge a transfer at a
 * shared-code hub like Siam (CEN), where a plain station-only search would
 * pass through for free -- see ASSIGNMENT.md section 6.1 ("the Siam gotcha").
 *
 * optimizeMode:
 *   'fastest' -> minimize total minutes
 *   'fewest'  -> minimize interchange count, ties broken by total minutes
 */
function findRoute(network, originCode, destCode, optimizeMode) {
  const { graph, selfTransfer } = network;
  if (!graph.hasVertex(originCode) || !graph.hasVertex(destCode)) return null;

  const stateKey = (code, line) => `${code}::${line ?? ''}`;

  // best[stateKey] = { minutes, transfers, priority }
  const best = new Map();
  const prev = new Map(); // stateKey -> { fromKey, edge, extraMinutes }

  const startKey = stateKey(originCode, null);
  best.set(startKey, { minutes: 0, transfers: 0 });

  const pq = new MinPriorityQueue();
  pq.insert(0, { code: originCode, line: null });

  const priorityOf = (minutes, transfers) =>
    optimizeMode === 'fewest' ? transfers * FEWEST_INTERCHANGE_WEIGHT + minutes : minutes;

  while (!pq.isEmpty()) {
    const { value: state } = pq.extractMin();
    const key = stateKey(state.code, state.line);
    const known = best.get(key);
    if (!known) continue;
    const currentPriority = priorityOf(known.minutes, known.transfers);

    for (const edge of graph.outgoingEdges(state.code)) {
      let extraMinutes = 0;
      let transferHappened = false;
      let newLine = state.line;

      if (edge.type === 'track') {
        if (state.line !== null && state.line !== edge.line) {
          // Same-code, different-line hop (the Siam case).
          extraMinutes = selfTransfer.get(state.code) ?? 0;
          transferHappened = true;
        }
        newLine = edge.line;
      } else {
        // 'interchange': walking to a different platform code already
        // fully represents the transfer; the line resets until the rider
        // boards the next track edge.
        transferHappened = true;
        newLine = null;
      }

      const newMinutes = known.minutes + edge.weight + extraMinutes;
      const newTransfers = known.transfers + (transferHappened ? 1 : 0);
      const newKey = stateKey(edge.to, newLine);
      const existing = best.get(newKey);
      const newPriority = priorityOf(newMinutes, newTransfers);

      if (!existing || newPriority < priorityOf(existing.minutes, existing.transfers)) {
        best.set(newKey, { minutes: newMinutes, transfers: newTransfers });
        prev.set(newKey, { fromKey: key, edge, extraMinutes });
        pq.insert(newPriority, { code: edge.to, line: newLine });
      }
    }
    void currentPriority; // (kept for clarity/debugging; not otherwise used)
  }

  // The destination may be reached in several states (arrived on
  // different lines) -- take whichever is best under the chosen objective.
  let bestDestKey = null;
  for (const [key, val] of best.entries()) {
    if (!key.startsWith(`${destCode}::`)) continue;
    if (!bestDestKey || priorityOf(val.minutes, val.transfers) < priorityOf(best.get(bestDestKey).minutes, best.get(bestDestKey).transfers)) {
      bestDestKey = key;
    }
  }
  if (!bestDestKey) return null; // unreachable

  // Reconstruct the edge sequence.
  const edgesUsed = [];
  let cursor = bestDestKey;
  while (cursor !== startKey) {
    const step = prev.get(cursor);
    if (!step) break; // origin === destination
    edgesUsed.unshift({ edge: step.edge, extraMinutes: step.extraMinutes });
    cursor = step.fromKey;
  }

  const final = best.get(bestDestKey);
  return {
    totalMinutes: final.minutes,
    interchanges: final.transfers,
    edgesUsed,
  };
}

/** Groups the raw edge sequence into rider-facing "board" / "transfer" steps. */
function buildItinerary(network, originCode, edgesUsed) {
  const { stationInfo } = network;
  const name = (code) => stationInfo.get(code)?.name ?? code;

  const steps = [];
  let cursorCode = originCode;
  let currentLeg = null; // { line, fromCode, toCode, minutes }

  const flushLeg = () => {
    if (currentLeg) {
      steps.push({
        type: 'ride',
        line: currentLeg.line,
        fromCode: currentLeg.fromCode,
        fromName: name(currentLeg.fromCode),
        toCode: currentLeg.toCode,
        toName: name(currentLeg.toCode),
        minutes: currentLeg.minutes,
      });
      currentLeg = null;
    }
  };

  for (const { edge, extraMinutes } of edgesUsed) {
    if (edge.type === 'interchange') {
      flushLeg();
      steps.push({
        type: 'walk',
        fromCode: cursorCode,
        fromName: name(cursorCode),
        toCode: edge.to,
        toName: name(edge.to),
        minutes: edge.weight,
      });
    } else if (extraMinutes > 0) {
      // Same-code line change (the Siam case): close the leg just ridden,
      // record the cross-platform transfer, then start the new leg.
      flushLeg();
      steps.push({
        type: 'transfer',
        atCode: cursorCode,
        atName: name(cursorCode),
        minutes: extraMinutes,
      });
      currentLeg = { line: edge.line, fromCode: cursorCode, toCode: edge.to, minutes: edge.weight };
    } else if (currentLeg && currentLeg.line === edge.line) {
      currentLeg.toCode = edge.to;
      currentLeg.minutes += edge.weight;
    } else {
      flushLeg();
      currentLeg = { line: edge.line, fromCode: cursorCode, toCode: edge.to, minutes: edge.weight };
    }
    cursorCode = edge.to;
  }
  flushLeg();
  return steps;
}

function formatClock(totalMinutesSinceMidnight) {
  const m = ((totalMinutesSinceMidnight % 1440) + 1440) % 1440;
  const hh = String(Math.floor(m / 60)).padStart(2, '0');
  const mm = String(Math.round(m % 60)).padStart(2, '0');
  return `${hh}:${mm}`;
}

function parseClock(hhmm) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(hhmm || '');
  if (!match) return null;
  const hh = Number(match[1]);
  const mm = Number(match[2]);
  if (hh < 0 || hh > 47 || mm < 0 || mm > 59) return null;
  return hh * 60 + mm;
}

/**
 * Plans a trip: 'depart' mode computes arrival from a departure time,
 * 'arrive' mode computes the latest departure that meets a desired
 * arrival time. Both share the same underlying shortest path -- see
 * ASSIGNMENT.md section 7.2 for why "plan by arrival" is intentionally
 * just arithmetic on the same route rather than a separate search.
 */
function planTrip(network, { originCode, destinationCode, time, mode, optimize }) {
  if (originCode === destinationCode) {
    return { error: 'Origin and destination must be different stations.' };
  }
  if (!network.graph.hasVertex(originCode)) return { error: `Unknown origin station: ${originCode}` };
  if (!network.graph.hasVertex(destinationCode)) return { error: `Unknown destination station: ${destinationCode}` };

  const clockMinutes = parseClock(time);
  if (clockMinutes === null) return { error: 'Time must be in HH:MM format.' };

  const optimizeMode = optimize === 'fewest' ? 'fewest' : 'fastest';
  const routeMode = mode === 'arrive' ? 'arrive' : 'depart';

  const result = findRoute(network, originCode, destinationCode, optimizeMode);
  if (!result) return { error: 'No route exists between these stations.' };

  const itinerary = buildItinerary(network, originCode, result.edgesUsed);

  const departureMinutes = routeMode === 'depart' ? clockMinutes : clockMinutes - result.totalMinutes;
  const arrivalMinutes = departureMinutes + result.totalMinutes;

  return {
    originCode,
    destinationCode,
    optimizeMode,
    routeMode,
    totalMinutes: result.totalMinutes,
    interchanges: result.interchanges,
    departureTime: formatClock(departureMinutes),
    arrivalTime: formatClock(arrivalMinutes),
    itinerary,
    path: [originCode, ...result.edgesUsed.map((e) => e.edge.to)],
  };
}

module.exports = {
  buildNetwork,
  findRoute,
  buildItinerary,
  planTrip,
  lineGroup,
  lineColor,
  TRACK_MINUTES,
  INTERCHANGE_WALK_MINUTES,
  SELF_TRANSFER_MINUTES,
};
