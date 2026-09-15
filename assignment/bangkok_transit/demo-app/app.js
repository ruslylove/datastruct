'use strict';

const path = require('path');
const fs = require('fs');
const express = require('express');
const { buildNetwork, planTrip, lineColor } = require('./src/network');
const { computeLayout } = require('./src/layout');
const { basicAuth } = require('./src/basicAuth');

// Prefer the canonical CSV one directory up (present in local dev, where
// this sits inside assignment/bangkok_transit/); fall back to the copy
// bundled in data/ (present in a standalone deployment, e.g. Vercel,
// where only this demo-app directory is uploaded).
const PARENT_CSV = path.join(__dirname, '..', 'bangkok_network_graph.csv');
const LOCAL_CSV = path.join(__dirname, 'data', 'bangkok_network_graph.csv');
const CSV_PATH = fs.existsSync(PARENT_CSV) ? PARENT_CSV : LOCAL_CSV;

const network = buildNetwork(CSV_PATH);
const { positions: layout, labelTier } = computeLayout(network);

const app = express();
app.use(basicAuth);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/stations', (req, res) => {
  const stations = [...network.stationInfo.values()]
    .map((s) => ({ code: s.code, name: s.name, lines: [...s.lines] }))
    .sort((a, b) => a.name.localeCompare(b.name) || a.code.localeCompare(b.code));
  res.json(stations);
});

app.get('/api/network', (req, res) => {
  const stations = [...network.stationInfo.values()].map((s) => {
    const pos = layout.get(s.code) || { x: 0, y: 0 };
    return {
      code: s.code, name: s.name, lines: [...s.lines],
      x: pos.x, y: pos.y, labelTier: labelTier.get(s.code) ?? 0,
    };
  });

  const edgeSeen = new Set();
  const edges = [];
  for (const code of network.graph.vertices()) {
    for (const edge of network.graph.outgoingEdges(code)) {
      const key = [code, edge.to].sort().join('|') + '|' + edge.type + '|' + edge.line;
      if (edgeSeen.has(key)) continue; // de-dupe the two directed copies
      edgeSeen.add(key);
      const from = layout.get(code);
      const to = layout.get(edge.to);
      if (!from || !to) continue;
      edges.push({
        from: code,
        to: edge.to,
        type: edge.type,
        line: edge.line,
        color: edge.type === 'track' ? lineColor(edge.line) : '#8A8A8A',
        x1: from.x, y1: from.y, x2: to.x, y2: to.y,
      });
    }
  }

  const selfLoops = [...network.selfTransfer.keys()]
    .filter((code) => layout.has(code))
    .map((code) => ({ code, ...layout.get(code) }));

  res.json({ stations, edges, selfLoops });
});

app.post('/api/route', (req, res) => {
  const { origin, destination, time, mode, optimize } = req.body || {};
  const result = planTrip(network, {
    originCode: origin,
    destinationCode: destination,
    time,
    mode,
    optimize,
  });
  if (result.error) return res.status(400).json(result);
  res.json(result);
});

module.exports = { app, network };
