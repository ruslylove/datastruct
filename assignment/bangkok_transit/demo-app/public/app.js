'use strict';

const LEGEND = [
  { label: 'BTS Sukhumvit Line', color: '#7AC943' },
  { label: 'BTS Silom Line', color: '#00693E' },
  { label: 'MRT Blue Line (incl. branch)', color: '#114B9F' },
  { label: 'MRT Purple Line', color: '#7A3B93' },
  { label: 'Interchange walk', color: '#8A8A8A', dashed: true },
];

const SVG_NS = 'http://www.w3.org/2000/svg';
let networkData = null;

function el(tag, attrs = {}, children = []) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  for (const child of children) node.appendChild(child);
  return node;
}

function renderLegend() {
  const container = document.getElementById('legend');
  container.innerHTML = '';
  for (const item of LEGEND) {
    const span = document.createElement('span');
    const swatch = document.createElement('span');
    swatch.className = 'swatch';
    swatch.style.background = item.color;
    if (item.dashed) swatch.style.backgroundImage =
      `repeating-linear-gradient(90deg, ${item.color} 0 4px, transparent 4px 7px)`;
    span.appendChild(swatch);
    span.appendChild(document.createTextNode(item.label));
    container.appendChild(span);
  }
}

function populateStationSelects(stations) {
  const origin = document.getElementById('origin');
  const destination = document.getElementById('destination');
  origin.innerHTML = '';
  destination.innerHTML = '';
  const sorted = [...stations].sort(
    (a, b) => a.name.localeCompare(b.name) || a.code.localeCompare(b.code)
  );
  for (const s of sorted) {
    const label = `${s.name} (${s.code})${s.lines.length ? ' — ' + s.lines.join(' / ') : ''}`;
    origin.appendChild(new Option(label, s.code));
    destination.appendChild(new Option(label, s.code));
  }
  // Sensible defaults matching the assignment's example test case.
  if (sorted.some((s) => s.code === 'N8')) origin.value = 'N8';
  if (sorted.some((s) => s.code === 'S2')) destination.value = 'S2';
}

function drawMap(data) {
  const svg = document.getElementById('map');
  svg.innerHTML = '';

  const xs = data.stations.map((s) => s.x);
  const ys = data.stations.map((s) => s.y);
  const pad = 40;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const width = Math.max(...xs) - Math.min(...xs) + pad * 2;
  const height = Math.max(...ys) - Math.min(...ys) + pad * 2;
  svg.setAttribute('viewBox', `${minX} ${minY} ${width} ${height}`);

  const trackDegree = new Map();
  const interchangeCodes = new Set();
  for (const e of data.edges) {
    if (e.type === 'track') {
      trackDegree.set(e.from, (trackDegree.get(e.from) || 0) + 1);
      trackDegree.set(e.to, (trackDegree.get(e.to) || 0) + 1);
    } else {
      interchangeCodes.add(e.from);
      interchangeCodes.add(e.to);
    }
  }
  for (const loop of data.selfLoops) interchangeCodes.add(loop.code);

  const edgeLayer = el('g', { id: 'edge-layer' });
  const overlayLayer = el('g', { id: 'overlay-layer' });
  const stationLayer = el('g', { id: 'station-layer' });
  svg.append(edgeLayer, overlayLayer, stationLayer);

  for (const e of data.edges) {
    const line = el('line', {
      x1: e.x1, y1: e.y1, x2: e.x2, y2: e.y2,
      stroke: e.color,
      'stroke-width': e.type === 'track' ? 3 : 1.6,
      'stroke-dasharray': e.type === 'track' ? 'none' : '3,3',
    });
    edgeLayer.appendChild(line);
  }

  for (const loop of data.selfLoops) {
    const arc = el('path', {
      d: `M ${loop.x} ${loop.y - 8} A 8 8 0 1 1 ${loop.x - 0.1} ${loop.y - 8}`,
      fill: 'none',
      stroke: '#8A8A8A',
      'stroke-width': 1.6,
      'stroke-dasharray': '2,2',
    });
    edgeLayer.appendChild(arc);
  }

  for (const s of data.stations) {
    const isInterchange = interchangeCodes.has(s.code);
    const isEndpoint = (trackDegree.get(s.code) || 0) <= 1;
    const dot = el('circle', {
      cx: s.x, cy: s.y, r: isInterchange ? 4.5 : 2.6,
      class: 'station-dot' + (isInterchange ? ' interchange' : ''),
    });
    const title = el('title', {});
    title.textContent = `${s.name} (${s.code})`;
    dot.appendChild(title);
    stationLayer.appendChild(dot);

    if (isInterchange || isEndpoint) {
      // Labels stagger into two vertical tiers (computed server-side from
      // each line's own walk order, in layout.js) so closely spaced
      // stations along the same line don't run their text together, and
      // disambiguate same-named platforms (e.g. two "Tao Poon" codes) by
      // appending the station code for interchanges.
      const tierOffset = s.labelTier === 1 ? -14 : -6;
      const label = el('text', {
        x: s.x + 6, y: s.y + tierOffset, class: 'station-label',
      });
      label.textContent = isInterchange ? `${s.name} (${s.code})` : s.name;
      stationLayer.appendChild(label);
    }
  }
}

function highlightRoute(pathCodes) {
  const overlay = document.getElementById('overlay-layer');
  overlay.innerHTML = '';
  if (!networkData || !pathCodes || pathCodes.length < 2) return;

  const posOf = new Map(networkData.stations.map((s) => [s.code, s]));
  for (let i = 0; i < pathCodes.length - 1; i++) {
    const a = posOf.get(pathCodes[i]);
    const b = posOf.get(pathCodes[i + 1]);
    if (!a || !b) continue;
    overlay.appendChild(el('line', {
      x1: a.x, y1: a.y, x2: b.x, y2: b.y,
      stroke: '#e11d48', 'stroke-width': 5, 'stroke-linecap': 'round', opacity: 0.85,
    }));
  }
  for (const code of [pathCodes[0], pathCodes[pathCodes.length - 1]]) {
    const s = posOf.get(code);
    if (!s) continue;
    overlay.appendChild(el('circle', { cx: s.x, cy: s.y, r: 7, fill: 'none', stroke: '#e11d48', 'stroke-width': 2.5 }));
  }
}

function renderItinerary(result) {
  const container = document.getElementById('itinerary');
  container.innerHTML = '';
  container.classList.remove('itinerary-empty');

  let clockMinutes = timeToMinutes(result.departureTime);
  const lineColors = Object.fromEntries(LEGEND.map((l) => [l.label.replace(' (incl. branch)', ''), l.color]));

  for (const step of result.itinerary) {
    const row = document.createElement('div');
    row.className = 'itin-step';

    const time = document.createElement('div');
    time.className = 'time';
    time.textContent = minutesToTime(clockMinutes);
    row.appendChild(time);

    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.background = step.type === 'ride' ? (lineColors[step.line] || '#888') : '#8A8A8A';
    row.appendChild(bar);

    const text = document.createElement('div');
    if (step.type === 'ride') {
      text.textContent = `Board ${step.line} at ${step.fromName} → ride to ${step.toName} (${step.minutes} min)`;
      clockMinutes += step.minutes;
    } else if (step.type === 'walk') {
      text.textContent = `Walk from ${step.fromName} to ${step.toName} to change lines (${step.minutes} min)`;
      clockMinutes += step.minutes;
    } else if (step.type === 'transfer') {
      text.textContent = `Cross platform at ${step.atName} to change lines (${step.minutes} min)`;
      clockMinutes += step.minutes;
    }
    row.appendChild(text);
    container.appendChild(row);
  }

  const summary = document.createElement('div');
  summary.className = 'itin-summary';
  const modeLabel = result.routeMode === 'depart' ? 'Depart' : 'Arrive';
  summary.textContent =
    `Depart ${result.departureTime} → Arrive ${result.arrivalTime} · ` +
    `Total ${result.totalMinutes} min · ${result.interchanges} interchange(s) ` +
    `(optimized for ${result.optimizeMode === 'fastest' ? 'fastest time' : 'fewest interchanges'}, ${modeLabel.toLowerCase()} mode)`;
  container.appendChild(summary);
}

function timeToMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}
function minutesToTime(total) {
  const m = ((total % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(Math.round(m % 60)).padStart(2, '0')}`;
}

async function loadNetwork() {
  const [stations, network] = await Promise.all([
    fetch('/api/stations').then((r) => r.json()),
    fetch('/api/network').then((r) => r.json()),
  ]);
  networkData = network;
  populateStationSelects(stations);
  renderLegend();
  drawMap(network);
}

function showError(message) {
  const box = document.getElementById('error');
  if (!message) {
    box.hidden = true;
    box.textContent = '';
    return;
  }
  box.hidden = false;
  box.textContent = message;
}

document.getElementById('trip-form').addEventListener('submit', async (evt) => {
  evt.preventDefault();
  showError(null);

  const origin = document.getElementById('origin').value;
  const destination = document.getElementById('destination').value;
  const time = document.getElementById('time').value;
  const mode = document.querySelector('input[name="mode"]:checked').value;
  const optimize = document.querySelector('input[name="optimize"]:checked').value;

  const res = await fetch('/api/route', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ origin, destination, time, mode, optimize }),
  });
  const data = await res.json();

  if (!res.ok) {
    showError(data.error || 'Something went wrong.');
    highlightRoute(null);
    return;
  }

  renderItinerary(data);
  highlightRoute(data.path);
});

loadNetwork().catch((err) => {
  console.error(err);
  showError('Failed to load the network. Is the server running?');
});
