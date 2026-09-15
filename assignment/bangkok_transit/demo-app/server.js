'use strict';

const { app, network } = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Bangkok Transit Navigator demo running at http://localhost:${PORT}`);
  console.log(`Loaded ${network.stationInfo.size} stations, ${network.graph.numEdges() / 2} undirected edges.`);
  if (!process.env.DEMO_USER || !process.env.DEMO_PASS) {
    console.log('DEMO_USER/DEMO_PASS not set -- running with no access gate.');
  }
});
