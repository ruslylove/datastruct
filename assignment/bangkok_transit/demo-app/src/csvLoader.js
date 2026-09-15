'use strict';

const fs = require('fs');

/**
 * Parses bangkok_network_graph.csv. The file has no quoted fields and no
 * commas inside values, so a plain split is sufficient -- no CSV library
 * needed.
 */
function loadEdgeRecords(csvPath) {
  const raw = fs.readFileSync(csvPath, 'utf8');
  const lines = raw.split(/\r?\n/).filter((line) => line.trim().length > 0);
  const [, ...rows] = lines; // drop header

  return rows.map((line) => {
    const [
      sourceCode,
      sourceName,
      targetCode,
      targetName,
      edgeType,
      lineContext,
    ] = line.split(',');
    return { sourceCode, sourceName, targetCode, targetName, edgeType, lineContext };
  });
}

module.exports = { loadEdgeRecords };
